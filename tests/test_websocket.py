"""Tests for the WebSocket commands (get, subscribe)."""

from __future__ import annotations

from types import SimpleNamespace
from typing import Any

import pytest

from custom_components.floorplan_3d import store as store_module, websocket_api
from custom_components.floorplan_3d.data import DATA_STORE
from custom_components.floorplan_3d.store import FloorplanStore

from .test_store import MemoryStore, demo_plan


class FakeConnection:
    """Collects what a handler sends."""

    def __init__(self) -> None:
        """Start without messages."""
        self.results: list[tuple[int, Any]] = []
        self.messages: list[dict[str, Any]] = []
        self.subscriptions: dict[int, Any] = {}

    def send_result(self, msg_id: int, result: Any = None) -> None:
        """Record a result."""
        self.results.append((msg_id, result))

    def send_message(self, message: Any) -> None:
        """Record an event message."""
        self.messages.append(message)


@pytest.fixture
def hass(monkeypatch: pytest.MonkeyPatch) -> SimpleNamespace:
    """Minimal hass object with an in-memory store."""
    monkeypatch.setattr(store_module, "Store", MemoryStore)
    return SimpleNamespace(data={DATA_STORE: FloorplanStore(hass=None)})  # type: ignore[arg-type]


def test_get_returns_plan(hass: SimpleNamespace) -> None:
    """Get sends the plan in the exchange format."""
    conn = FakeConnection()
    websocket_api.ws_get(hass, conn, {"id": 1, "type": "floorplan_3d/get"})
    msg_id, result = conn.results[0]
    assert msg_id == 1
    assert result["revision"] == 0
    assert result["rooms"] == []


async def test_subscribe_sends_revisions(hass: SimpleNamespace) -> None:
    """Subscribe confirms, sends the current revision and every new one."""
    conn = FakeConnection()
    websocket_api.ws_subscribe(hass, conn, {"id": 7, "type": "floorplan_3d/subscribe"})
    assert conn.results == [(7, None)]
    assert conn.messages == [{"id": 7, "type": "event", "event": {"revision": 0}}]

    await hass.data[DATA_STORE].async_save(demo_plan(), 0)
    assert len(conn.messages) == 2
    assert conn.messages[-1]["event"] == {"revision": 1}

    # Unsubscribing stops further events
    conn.subscriptions[7]()
    await hass.data[DATA_STORE].async_save(demo_plan(), 1)
    assert len(conn.messages) == 2
