"""WebSocket commands: floorplan_3d/get, /save and /subscribe."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .data import DATA_STORE
from .store import RevisionConflict


@callback
def async_register(hass: HomeAssistant) -> None:
    """Register the WebSocket commands."""
    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_save)
    websocket_api.async_register_command(hass, ws_subscribe)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get"})
@callback
def ws_get(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Send the current plan."""
    connection.send_result(msg["id"], hass.data[DATA_STORE].as_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/save",
        vol.Required("revision"): vol.Coerce(int),
        vol.Required("plan"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Save the plan (admin only, with revision check)."""
    store = hass.data[DATA_STORE]
    try:
        revision = await store.async_save(msg["plan"], msg["revision"])
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    except RevisionConflict as err:
        connection.send_error(
            msg["id"],
            "conflict",
            f"Plan was changed in the meantime (revision {err.current})",
        )
        return
    connection.send_result(msg["id"], {"revision": revision})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Send the revision now and after every save (live sync between panels)."""
    store = hass.data[DATA_STORE]
    msg_id = msg["id"]

    @callback
    def forward(revision: int) -> None:
        connection.send_message(
            websocket_api.event_message(msg_id, {"revision": revision})
        )

    connection.subscriptions[msg_id] = store.async_add_listener(forward)
    connection.send_result(msg_id)
    forward(store.revision)
