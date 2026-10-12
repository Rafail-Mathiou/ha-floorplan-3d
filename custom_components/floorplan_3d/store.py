"""Storage and validation of the floorplan (.storage/floorplan_3d)."""

from __future__ import annotations

import asyncio
from collections.abc import Callable
import copy
from typing import Any

import voluptuous as vol

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.storage import Store

from .const import (
    MAX_COORD,
    MAX_FLOORS,
    MAX_FURNITURE,
    MAX_ITEMS,
    MAX_OPENINGS,
    MAX_POLYGON_POINTS,
    MAX_ROOMS,
    MAX_STR,
    STORAGE_KEY,
    STORAGE_MINOR_VERSION,
    STORAGE_VERSION,
)

COLOR_MODES = ["temperature", "humidity", "co2", "heating", "none"]
ROOM_TAP = ["focus", "isolate", "none"]
OPENING_TYPES = ["door", "window", "opening"]
ITEM_KINDS = [
    "auto",
    "radiator",
    "light",
    "tv",
    "sensor",
    "motion",
    "speaker",
    "vacuum",
    "generic",
]

FURNITURE_TYPES = [
    "sofa",
    "sofa_2",
    "sofa_corner",
    "armchair",
    "pouf",
    "coffee_table",
    "side_table",
    "tv_board",
    "sideboard",
    "shelf",
    "bookcase",
    "fireplace",
    "piano",
    "table",
    "table_large",
    "table_round",
    "chair",
    "bench",
    "bar_stool",
    "vitrine",
    "bed",
    "bed_king",
    "bed_single",
    "nightstand",
    "dresser",
    "wardrobe",
    "wardrobe_small",
    "vanity",
    "kitchen",
    "kitchen_corner",
    "kitchen_island",
    "stove",
    "dishwasher",
    "fridge",
    "tall_cabinet",
    "bathtub",
    "shower",
    "toilet",
    "bidet",
    "sink",
    "sink_double",
    "washer",
    "dryer",
    "coat_rack",
    "shoe_cabinet",
    "console",
    "desk",
    "desk_corner",
    "office_chair",
    "filing_cabinet",
    "bed_bunk",
    "crib",
    "toy_box",
    "rug",
    "rug_round",
    "plant",
    "aquarium",
    "lounger",
    "stairs",
    "stairs_down",
    "stairs_spiral",
]

_str = vol.All(cv.string, vol.Length(max=MAX_STR))
_id = vol.All(cv.string, vol.Length(min=1, max=MAX_STR))
_coord = vol.All(vol.Coerce(float), vol.Range(min=-MAX_COORD, max=MAX_COORD))
_point = vol.All(vol.ExactSequence([_coord, _coord]), list)
_entity = vol.Any(None, cv.entity_id)
_temp = vol.All(vol.Coerce(float), vol.Range(min=-30, max=60))
_color = vol.Any(None, vol.Match(r"^#[0-9a-fA-F]{6}$"))


_percent = vol.All(vol.Coerce(float), vol.Range(min=0, max=100))
_ppm = vol.All(vol.Coerce(float), vol.Range(min=300, max=10000))


def _ordered_thresholds(value: dict[str, float]) -> dict[str, float]:
    if (
        value["humidity"] >= value["humidity_alert"]
        or value["co2"] >= value["co2_alert"]
    ):
        raise vol.Invalid("Warning thresholds must be below the red thresholds")
    return value


def _unique_ids(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    ids = [item["id"] for item in items]
    if len(ids) != len(set(ids)):
        raise vol.Invalid("IDs must be unique")
    return items


BACKGROUND_SCHEMA = vol.Any(
    None,
    vol.Schema(
        {
            vol.Required("url"): vol.All(
                cv.string,
                vol.Length(max=300),
                # Own files or https, no "//host" and no other schemes
                vol.Match(r"^(/(?!/)|https://)[^\s\"'<>]*$"),
            ),
            vol.Required("x"): _coord,
            vol.Required("y"): _coord,
            vol.Required("width"): vol.All(
                vol.Coerce(float), vol.Range(min=0.1, max=200)
            ),
            vol.Required("height"): vol.All(
                vol.Coerce(float), vol.Range(min=0.1, max=200)
            ),
            vol.Optional("opacity", default=0.5): vol.All(
                vol.Coerce(float), vol.Range(min=0, max=1)
            ),
            vol.Optional("visible", default=True): cv.boolean,
        },
        extra=vol.REMOVE_EXTRA,
    ),
)

SETTINGS_SCHEMA = vol.Schema(
    {
        # 3D view: what tapping a room does
        vol.Optional("room_tap", default="focus"): vol.In(ROOM_TAP),
        vol.Optional("wall_height", default=2.5): vol.All(
            vol.Coerce(float), vol.Range(min=1.5, max=5)
        ),
        vol.Optional("wall_thickness", default=0.12): vol.All(
            vol.Coerce(float), vol.Range(min=0.02, max=0.6)
        ),
        vol.Optional("grid", default=0.1): vol.All(
            vol.Coerce(float), vol.Range(min=0.01, max=1)
        ),
        vol.Optional("color_mode", default="temperature"): vol.In(COLOR_MODES),
        vol.Optional(
            "temp_scale",
            default={"cold": 17, "ok_low": 19.5, "ok_high": 22.5, "hot": 25},
        ): vol.Schema(
            {
                vol.Required("cold"): _temp,
                vol.Required("ok_low"): _temp,
                vol.Required("ok_high"): _temp,
                vol.Required("hot"): _temp,
            },
            extra=vol.REMOVE_EXTRA,
        ),
        # Room symbols: humidity (%) and CO2 (ppm), warning and red
        vol.Optional(
            "thresholds",
            default={
                "humidity": 60,
                "humidity_alert": 70,
                "co2": 1000,
                "co2_alert": 1400,
            },
        ): vol.All(
            vol.Schema(
                {
                    vol.Required("humidity"): _percent,
                    vol.Required("humidity_alert"): _percent,
                    vol.Required("co2"): _ppm,
                    vol.Required("co2_alert"): _ppm,
                },
                extra=vol.REMOVE_EXTRA,
            ),
            _ordered_thresholds,
        ),
        # Background image for tracing (position/size in metres)
        vol.Optional("background", default=None): BACKGROUND_SCHEMA,
    },
    extra=vol.REMOVE_EXTRA,
)

ROOM_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _id,
        vol.Optional("floor", default=None): vol.Any(None, _id),
        vol.Optional("name", default=""): _str,
        vol.Required("points"): vol.All(
            [_point], vol.Length(min=3, max=MAX_POLYGON_POINTS)
        ),
        vol.Optional("area_id", default=None): vol.Any(None, _str),
        vol.Optional("temp_entity", default=None): _entity,
        vol.Optional("humidity_entity", default=None): _entity,
        vol.Optional("floor_color", default=None): _color,
    },
    extra=vol.REMOVE_EXTRA,
)

OPENING_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _id,
        vol.Optional("floor", default=None): vol.Any(None, _id),
        vol.Required("type"): vol.In(OPENING_TYPES),
        vol.Optional("room_ids", default=list): vol.All([_id], vol.Length(max=2)),
        vol.Required("wall"): vol.Schema(
            {vol.Required("a"): _point, vol.Required("b"): _point},
            extra=vol.REMOVE_EXTRA,
        ),
        vol.Optional("entity_id", default=None): _entity,
        vol.Optional("exterior", default=False): cv.boolean,
        vol.Optional("hinge", default="left"): vol.In(["left", "right"]),
    },
    extra=vol.REMOVE_EXTRA,
)

ITEM_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _id,
        vol.Optional("floor", default=None): vol.Any(None, _id),
        vol.Required("entity_id"): cv.entity_id,
        vol.Optional("kind", default="auto"): vol.In(ITEM_KINDS),
        vol.Required("pos"): _point,
        vol.Optional("rotation", default=0): vol.All(
            vol.Coerce(float), vol.Range(min=-360, max=360)
        ),
        vol.Optional("height", default=0): vol.All(
            vol.Coerce(float), vol.Range(min=0, max=5)
        ),
        vol.Optional("room_id", default=None): vol.Any(None, _id),
        vol.Optional("label", default=None): vol.Any(None, _str),
        # Radiators: length along the wall in metres
        vol.Optional("width", default=None): vol.Any(
            None, vol.All(vol.Coerce(float), vol.Range(min=0.2, max=4))
        ),
        # Wall-mounted devices: never lower the wall behind (None = by kind)
        vol.Optional("keep_wall", default=None): vol.Any(None, cv.boolean),
    },
    extra=vol.REMOVE_EXTRA,
)

_size = vol.All(vol.Coerce(float), vol.Range(min=0.05, max=20))

FURNITURE_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _id,
        vol.Optional("floor", default=None): vol.Any(None, _id),
        vol.Required("type"): vol.In(FURNITURE_TYPES),
        vol.Required("pos"): _point,
        vol.Required("size"): vol.All(vol.ExactSequence([_size, _size]), list),
        vol.Optional("rotation", default=0): vol.All(
            vol.Coerce(float), vol.Range(min=-360, max=360)
        ),
        vol.Optional("label", default=None): vol.Any(None, _str),
    },
    extra=vol.REMOVE_EXTRA,
)

FLOOR_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _id,
        vol.Optional("name", default=""): _str,
        vol.Optional("level", default=0): vol.All(
            vol.Coerce(int), vol.Range(min=-10, max=100)
        ),
        # Linked Home Assistant floor
        vol.Optional("floor_id", default=None): vol.Any(None, _str),
        vol.Optional("background", default=None): BACKGROUND_SCHEMA,
    },
    extra=vol.REMOVE_EXTRA,
)


def _floor_refs(plan: dict[str, Any]) -> dict[str, Any]:
    """Objects on an unknown floor go to the first floor (None)."""
    floors = {floor["id"] for floor in plan["floors"]}
    for key in ("rooms", "openings", "items", "furniture"):
        for obj in plan[key]:
            if obj["floor"] not in floors:
                obj["floor"] = None
    return plan


PLAN_SCHEMA = vol.All(
    vol.Schema(
        {
            vol.Optional("settings", default=dict): SETTINGS_SCHEMA,
            vol.Optional("floors", default=list): vol.All(
                [FLOOR_SCHEMA], vol.Length(max=MAX_FLOORS), _unique_ids
            ),
            vol.Optional("rooms", default=list): vol.All(
                [ROOM_SCHEMA], vol.Length(max=MAX_ROOMS), _unique_ids
            ),
            vol.Optional("openings", default=list): vol.All(
                [OPENING_SCHEMA], vol.Length(max=MAX_OPENINGS), _unique_ids
            ),
            vol.Optional("items", default=list): vol.All(
                [ITEM_SCHEMA], vol.Length(max=MAX_ITEMS), _unique_ids
            ),
            vol.Optional("furniture", default=list): vol.All(
                [FURNITURE_SCHEMA], vol.Length(max=MAX_FURNITURE), _unique_ids
            ),
        },
        extra=vol.REMOVE_EXTRA,
    ),
    _floor_refs,
)


def validate_plan(plan: dict[str, Any]) -> dict[str, Any]:
    """Validate and normalise a plan (unknown fields are dropped)."""
    return PLAN_SCHEMA(plan)


def empty_plan() -> dict[str, Any]:
    """Empty plan with default settings."""
    return validate_plan({})


class RevisionConflict(Exception):
    """The plan was saved by someone else in the meantime."""

    def __init__(self, current: int) -> None:
        """Remember the current revision."""
        super().__init__(f"Aktuelle Revision ist {current}")
        self.current = current


class FloorplanStore:
    """Keeps the plan in memory and writes it to .storage."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Create the store (not loaded yet)."""
        self._store: Store[dict[str, Any]] = Store(
            hass,
            STORAGE_VERSION,
            STORAGE_KEY,
            minor_version=STORAGE_MINOR_VERSION,
        )
        self._lock = asyncio.Lock()
        self._revision = 0
        self._plan: dict[str, Any] = empty_plan()
        self._listeners: list[Callable[[int], None]] = []

    async def async_load(self) -> None:
        """Load the saved plan; without data the empty plan is kept."""
        data = await self._store.async_load()
        if not data:
            return
        self._revision = int(data.get("revision", 0))
        self._plan = validate_plan(data.get("plan", {}))

    @callback
    def async_add_listener(self, listener: Callable[[int], None]) -> CALLBACK_TYPE:
        """Call `listener(revision)` after every save; returns the unsubscribe."""
        self._listeners.append(listener)

        @callback
        def remove() -> None:
            self._listeners.remove(listener)

        return remove

    @property
    def revision(self) -> int:
        """Current revision."""
        return self._revision

    def as_dict(self) -> dict[str, Any]:
        """Plan in the exchange format (see docs/DATA_MODEL.md)."""
        return {
            "version": STORAGE_VERSION,
            "revision": self._revision,
            **copy.deepcopy(self._plan),
        }

    async def async_save(self, plan: dict[str, Any], revision: int) -> int:
        """Save the plan if `revision` is current. Returns the new revision."""
        validated = validate_plan(plan)
        async with self._lock:
            if revision != self._revision:
                raise RevisionConflict(self._revision)
            new_revision = self._revision + 1
            await self._store.async_save({"revision": new_revision, "plan": validated})
            self._revision = new_revision
            self._plan = validated
        for listener in list(self._listeners):
            listener(new_revision)
        return new_revision
