# Architecture

Floorplan 3D has two parts. A small Python integration stores the plan and serves the
frontend. A TypeScript frontend draws the planner, the 3D view and the dashboard card.

## Overview

**Integration** (`custom_components/floorplan_3d`)
- Config flow with a single instance.
- Store in `.storage/floorplan_3d` with the plan as JSON.
- WebSocket commands `floorplan_3d/get`, `floorplan_3d/save` and
  `floorplan_3d/subscribe`.
- Static path `/floorplan_3d_static/` for the built frontend files.
- Sidebar panel `/floorplan-3d` and a small loader script for the dashboard card.

**Frontend** (TypeScript, Lit, three.js)
- `<floorplan-3d-panel>`: header, view and plan mode, loading, saving, undo.
- `<fp-scene>`: the 3D view and its legend.
- `<fp-live-map>`: the 2D live view for devices without WebGL 2.
- `<fp-room-info>`: the card of a tapped room, used by both views.
- `<fp-plan-editor>`: the planner (SVG) and the library.
- `<fp-inspector>`: the side panel with the properties of the selection.
- `<floorplan-3d-card>`: the dashboard card. Its loader is a separate small file; the
  card content and its visual editor `<floorplan-3d-card-editor>` (built on Home
  Assistant's `<ha-form>`) come with the main bundle.

## Why an integration and not only a card
- **Storage in Home Assistant**: the plan survives restarts, looks the same on every
  device and is part of backups. A card would have to write into the dashboard
  configuration, which is not possible for YAML dashboards.
- **Own panel**: a full-screen view with its own controls, independent of other
  dashboards.
- **Permissions**: saving requires an administrator, viewing does not.
- **Distribution**: the built bundle ships with the integration, so HACS needs no build
  step.

## Backend
| File | Purpose |
|---|---|
| `manifest.json` | Single config entry, depends on `frontend`, `http`, `panel_custom`, `websocket_api` |
| `__init__.py` | Loads the store, registers the WebSocket commands, the static path, the panel and the card loader |
| `config_flow.py` | Setup with one click |
| `store.py` | `helpers.storage.Store` with schema validation and a revision check |
| `websocket_api.py` | `get`, `save` (administrators, rejected if the revision is outdated) and `subscribe` (current revision and every new one) |
| `const.py` | Domain, URLs, panel titles and limits |
| `brand/` | Icon and logo shown in Home Assistant |
| `frontend/` | Built bundle `floorplan-3d.js` and card loader `floorplan-3d-card.js`, both committed |

The URLs of both frontend files carry a short content hash (`?v=...`), so browsers
load a new version after an update. The card loader imports the main bundle with the
same URL as the panel, so the code is only loaded once.

## Frontend
- **TypeScript and Lit**, as in Home Assistant itself, plus **three.js**. esbuild bundles
  everything into one file. Nothing is loaded from a CDN, so it also works offline on
  wall tablets.
- Entity states come from the `hass` object, areas and the entity registry from
  `hass.areas`, `hass.entities` and `hass.devices`.
- The more-info dialog opens through the `hass-more-info` event.
- Background images are uploaded with Home Assistant's own image upload
  (`/api/image/upload`), so the integration does not store files itself.
- Colours follow the Home Assistant theme. `--floorplan-3d-accent` changes the accent
  colour.
- UI strings live in `src/i18n.ts` in English, German and Greek. The language follows the user
  profile.

```
frontend/src/
  panel.ts            panel shell, modes, load and save, undo history
  card.ts             dashboard card content
  card-loader.ts      dashboard card loader (separate bundle)
  card-config.ts      card options and their mapping to the editor form
  card-editor.ts      visual card editor
  theme.ts            theme variables shared by panel and card
  api.ts              WebSocket client
  plan-io.ts          plan export and import
  floors.ts           floors: view of one floor, merging it back, adding and importing
  model.ts            types and helpers
  i18n.ts             strings and number formatting
  catalog.ts          library entries and entity suggestions
  ha.ts               areas, sensors, readings
  editor/             planner, geometry, snapping, glyphs
  inspector/          side panel
  scene/              3D view: floors and walls, doors, windows, devices, furniture,
                      colours, room symbols, cutaway, effects, TV screen, 2D live map
frontend/test/        unit tests (vitest)
```

## Data flow
1. The panel loads the plan with `floorplan_3d/get`.
2. The planner and the 3D view work on one floor at a time. `floorView` cuts the
   active floor out of the plan and `mergeFloor` puts the edited floor back, so the
   editor itself does not know about floors. The planner changes the plan locally with
   immutable updates and keeps an undo history. **Save** sends `floorplan_3d/save` with the last known revision. If someone
   saved in the meantime, the server answers with `conflict` and the panel offers to
   reload or to save its own version on top.
3. Every panel and card subscribes with `floorplan_3d/subscribe`. After a save on
   another device, a panel without local changes reloads silently. A panel with local
   changes shows a notice instead.
4. The 3D scene only rebuilds its geometry when the plan changes. When states change it
   only updates materials, labels and animations, and only if an entity of the plan is
   affected.

## Performance
The 3D view is designed for low-end wall tablets:
- Walls are merged into one mesh. Materials are simple, there are no shadows and the
  pixel ratio is capped at 1.5.
- Frames are only drawn when something changes: the camera, a running animation or a
  state. Ambient effects run at 30 frames per second at most and at 12 when a frame
  takes longer than 18 ms. With no active effect nothing is drawn.
- Room labels are HTML overlays. They are only repositioned when the camera or the
  scene changed. Labels behind a wall are hidden with a few ray casts against the wall
  mesh.
- The TV picture is a small canvas texture that is only redrawn when its content
  changes.
- Lowering walls towards the camera happens in the vertex shader. Each wall piece
  carries its centre and direction as a vertex attribute, so there is no extra draw
  call and no transparency sorting. "Show only this room" discards wall fragments
  outside the room in the fragment shader.
- Devices without WebGL 2 get the SVG live map.

## Security
- Only administrators can save. The server validates every plan: types, value ranges,
  sizes and string lengths. Unknown fields are dropped.
- Names and states are always rendered as text. Raw SVG is only used for built-in
  icons.
- Imported plan files are checked in the browser before they are shown and validated
  again by the server when they are saved.
- See [SECURITY.md](../SECURITY.md) for reporting problems.
