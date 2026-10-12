# Security

## Reporting a vulnerability
Please report security problems privately through GitHub: open the repository's
**Security** tab and choose **Report a vulnerability**. Do not open a public issue.
You will get an answer within a few days.

## Scope
Floorplan 3D runs inside Home Assistant. It

- stores one floorplan in `.storage/floorplan_3d`,
- lets every logged-in user read the plan, and only administrators save it
  (WebSocket commands `floorplan_3d/get`, `/subscribe`, `/save`),
- validates every saved plan on the server (types, value ranges, sizes),
- reads entity states and opens Home Assistant's more-info dialog. The only service
  call is `light.toggle` or `switch.toggle` when a user turned on "a tap on a lamp
  switches it" on their own device; it runs with that user's permissions.

The frontend does not load anything from third parties. Pictures shown on the TV
come from the media player's `entity_picture`, usually through Home Assistant's own
image proxy.
