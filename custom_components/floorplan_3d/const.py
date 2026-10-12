"""Constants for Floorplan 3D."""

from __future__ import annotations

DOMAIN = "floorplan_3d"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
STORAGE_MINOR_VERSION = 1

STATIC_URL = "/floorplan_3d_static"
BUNDLE_FILE = "floorplan-3d.js"
CARD_FILE = "floorplan-3d-card.js"

PANEL_URL_PATH = "floorplan-3d"
PANEL_COMPONENT = "floorplan-3d-panel"
PANEL_TITLES = {"en": "Floorplan 3D", "de": "Grundriss 3D", "el": "Κάτοψη 3D"}
PANEL_ICON = "mdi:floor-plan"

# Limits for stored plans (see docs/DATA_MODEL.md)
MAX_FLOORS = 10
MAX_ROOMS = 120
MAX_OPENINGS = 240
MAX_ITEMS = 500
MAX_FURNITURE = 400
MAX_POLYGON_POINTS = 32
MAX_COORD = 100.0
MAX_STR = 100
