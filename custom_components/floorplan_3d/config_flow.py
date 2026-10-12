"""Config flow: one-click setup, single instance."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN, PANEL_TITLES


class Floorplan3dConfigFlow(ConfigFlow, domain=DOMAIN):
    """Sets up Floorplan 3D without further input."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show a confirmation, then create the entry."""
        if user_input is not None:
            return self.async_create_entry(title=PANEL_TITLES["en"], data={})
        return self.async_show_form(step_id="user")
