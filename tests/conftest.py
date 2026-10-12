"""Test setup.

Home Assistant replaces the ``voluptuous`` module with ``probatio`` when it is
imported. Import it first so tests and integration see the same error classes,
as they do at runtime.
"""

import homeassistant  # noqa: F401
