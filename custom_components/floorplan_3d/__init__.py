"""Floorplan 3D: a live 3D floorplan of your home as a sidebar panel."""

from __future__ import annotations

import hashlib
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from . import websocket_api
from .const import (
    BUNDLE_FILE,
    CARD_FILE,
    DOMAIN,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_TITLES,
    PANEL_URL_PATH,
    STATIC_URL,
)
from .data import DATA_STORE
from .store import FloorplanStore

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Load the store and register WebSocket commands and the static path once."""
    store = FloorplanStore(hass)
    await store.async_load()
    hass.data[DATA_STORE] = store

    websocket_api.async_register(hass)
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
    )
    # Lovelace card: a tiny loader on every page; it imports the bundle on demand.
    # The bundle hash in the query makes it load the same module URL as the panel.
    bundle_hash = await hass.async_add_executor_job(_bundle_hash)
    frontend.add_extra_js_url(hass, f"{STATIC_URL}/{CARD_FILE}?v={bundle_hash}")
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Add the panel to the sidebar."""
    bundle_hash = await hass.async_add_executor_job(_bundle_hash)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=PANEL_TITLES.get(
            hass.config.language.split("-")[0], PANEL_TITLES["en"]
        ),
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_URL}/{BUNDLE_FILE}?v={bundle_hash}",
        require_admin=False,
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the panel."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    return True


def _bundle_hash() -> str:
    """Short content hash of bundle and card loader for cache busting."""
    digest = hashlib.sha256()
    for name in (BUNDLE_FILE, CARD_FILE):
        digest.update((FRONTEND_DIR / name).read_bytes())
    return digest.hexdigest()[:12]
