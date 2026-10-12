"""Tests for plan validation and the revision-checked store."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

import pytest
import voluptuous as vol

from custom_components.floorplan_3d import store as store_module
from custom_components.floorplan_3d.store import (
    FloorplanStore,
    RevisionConflict,
    empty_plan,
    validate_plan,
)

DEMO = json.loads((Path(__file__).parent / "fixtures" / "demo.json").read_text())


def background(url: str) -> dict[str, Any]:
    """Background image settings with the given URL."""
    return {"url": url, "x": 0, "y": 0, "width": 10, "height": 8}


def demo_plan() -> dict[str, Any]:
    """Demo plan without the exchange-format fields."""
    plan = copy.deepcopy(DEMO)
    plan.pop("version", None)
    plan.pop("revision", None)
    return plan


class MemoryStore:
    """In-memory replacement for homeassistant.helpers.storage.Store."""

    def __init__(self, *_args: Any, **_kwargs: Any) -> None:
        """Start empty."""
        self.data: dict[str, Any] | None = None
        self.saves = 0

    async def async_load(self) -> dict[str, Any] | None:
        """Return the saved data."""
        return self.data

    async def async_save(self, data: dict[str, Any]) -> None:
        """Remember the data."""
        self.data = copy.deepcopy(data)
        self.saves += 1


@pytest.fixture
def memory_store(monkeypatch: pytest.MonkeyPatch) -> FloorplanStore:
    """FloorplanStore backed by MemoryStore."""
    monkeypatch.setattr(store_module, "Store", MemoryStore)
    return FloorplanStore(hass=None)  # type: ignore[arg-type]


def test_empty_plan_has_defaults() -> None:
    """An empty plan gets every default setting."""
    plan = empty_plan()
    assert plan["rooms"] == []
    assert plan["settings"]["wall_height"] == 2.5
    assert plan["settings"]["room_tap"] == "focus"
    assert plan["settings"]["thresholds"]["co2_alert"] == 1400


def test_demo_plan_is_valid() -> None:
    """The demo fixture passes validation unchanged in size."""
    plan = validate_plan(demo_plan())
    assert len(plan["rooms"]) == len(DEMO["rooms"])
    assert len(plan["items"]) == len(DEMO["items"])
    assert len(plan["furniture"]) == len(DEMO["furniture"])


def test_unknown_fields_are_dropped() -> None:
    """Extra keys never reach the storage."""
    plan = demo_plan()
    plan["evil"] = "x"
    plan["rooms"][0]["script"] = "<script>"
    result = validate_plan(plan)
    assert "evil" not in result
    assert "script" not in result["rooms"][0]


@pytest.mark.parametrize(
    "url",
    ["/local/floorplan/bg.png", "https://example.com/plan.png"],
)
def test_background_url_allowed(url: str) -> None:
    """Local paths and https URLs are accepted."""
    plan = demo_plan()
    plan["settings"]["background"] = background(url)
    assert validate_plan(plan)["settings"]["background"]["url"] == url


@pytest.mark.parametrize(
    "url",
    [
        "//evil.example/plan.png",
        "javascript:alert(1)",
        "http://example.com/plan.png",
        'data:image/svg+xml,<svg onload="x">',
        "/local/a b.png",
    ],
)
def test_background_url_rejected(url: str) -> None:
    """Protocol-relative, other schemes and odd characters are rejected."""
    plan = demo_plan()
    plan["settings"]["background"] = background(url)
    with pytest.raises(vol.Invalid):
        validate_plan(plan)


def test_thresholds_must_be_ordered() -> None:
    """A warning threshold above its red threshold is rejected."""
    plan = demo_plan()
    plan["settings"]["thresholds"] = {
        "humidity": 75,
        "humidity_alert": 70,
        "co2": 1000,
        "co2_alert": 1400,
    }
    with pytest.raises(vol.Invalid):
        validate_plan(plan)


def test_invalid_values_are_rejected() -> None:
    """Out-of-range numbers, bad colours and unknown types fail."""
    for mutate in (
        lambda p: p["rooms"][0].update(points=[[0, 0], [1, 1]]),
        lambda p: p["rooms"][0].update(floor_color="red"),
        lambda p: p["furniture"][0].update(type="spaceship"),
        lambda p: p["items"][0].update(entity_id="not an entity"),
        lambda p: p["items"][0].update(width=99),
        lambda p: p["settings"].update(room_tap="explode"),
        lambda p: p["rooms"].append(copy.deepcopy(p["rooms"][0])),  # duplicate id
    ):
        plan = demo_plan()
        mutate(plan)
        with pytest.raises(vol.Invalid):
            validate_plan(plan)


def test_optional_item_fields() -> None:
    """Radiator length and keep_wall survive validation."""
    plan = demo_plan()
    plan["items"][0]["width"] = 1.2
    plan["items"][0]["keep_wall"] = True
    item = validate_plan(plan)["items"][0]
    assert item["width"] == 1.2
    assert item["keep_wall"] is True


def test_floors() -> None:
    """Floors keep their own background; unknown floor references are cleared."""
    plan = demo_plan()
    plan["floors"] = [
        {"id": "fl_ground", "name": "Ground floor", "level": 0},
        {
            "id": "fl_up",
            "name": "Upstairs",
            "level": 1,
            "floor_id": "upstairs",
            "background": background("/local/up.png"),
        },
    ]
    plan["rooms"][0]["floor"] = "fl_up"
    plan["rooms"][1]["floor"] = "fl_gone"
    result = validate_plan(plan)
    assert result["floors"][0]["floor_id"] is None
    assert result["floors"][1]["background"]["url"] == "/local/up.png"
    assert result["rooms"][0]["floor"] == "fl_up"
    assert result["rooms"][1]["floor"] is None
    assert result["items"][0]["floor"] is None


def test_plans_without_floors_stay_valid() -> None:
    """Plans saved before floors existed get an empty floor list."""
    result = validate_plan(demo_plan())
    assert result["floors"] == []
    assert all(room["floor"] is None for room in result["rooms"])


async def test_save_increments_revision(memory_store: FloorplanStore) -> None:
    """Saving with the current revision stores the plan and bumps the revision."""
    await memory_store.async_load()
    assert memory_store.revision == 0
    assert await memory_store.async_save(demo_plan(), 0) == 1
    assert memory_store.as_dict()["revision"] == 1
    assert len(memory_store.as_dict()["rooms"]) == len(DEMO["rooms"])


async def test_stale_revision_conflicts(memory_store: FloorplanStore) -> None:
    """A save based on an old revision is rejected."""
    await memory_store.async_save(demo_plan(), 0)
    with pytest.raises(RevisionConflict) as err:
        await memory_store.async_save(demo_plan(), 0)
    assert err.value.current == 1


async def test_invalid_plan_is_not_stored(memory_store: FloorplanStore) -> None:
    """Validation happens before anything is written."""
    plan = demo_plan()
    plan["rooms"][0]["points"] = "nope"
    with pytest.raises(vol.Invalid):
        await memory_store.async_save(plan, 0)
    assert memory_store.revision == 0


async def test_listeners_get_new_revision(memory_store: FloorplanStore) -> None:
    """Listeners hear about every save until they unsubscribe."""
    seen: list[int] = []
    remove = memory_store.async_add_listener(seen.append)
    await memory_store.async_save(demo_plan(), 0)
    remove()
    await memory_store.async_save(demo_plan(), 1)
    assert seen == [1]


async def test_load_restores_saved_plan(monkeypatch: pytest.MonkeyPatch) -> None:
    """A new store instance loads what the previous one saved."""
    monkeypatch.setattr(store_module, "Store", MemoryStore)
    first = FloorplanStore(hass=None)  # type: ignore[arg-type]
    await first.async_save(demo_plan(), 0)
    second = FloorplanStore(hass=None)  # type: ignore[arg-type]
    second._store.data = first._store.data
    await second.async_load()
    assert second.revision == 1
    assert len(second.as_dict()["rooms"]) == len(DEMO["rooms"])
