"""Shared keys for hass.data."""

from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.util.hass_dict import HassKey

from .const import DOMAIN

if TYPE_CHECKING:
    from .store import FloorplanStore

DATA_STORE: HassKey[FloorplanStore] = HassKey(DOMAIN)
