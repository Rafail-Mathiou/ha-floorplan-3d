# Changelog

## 0.13.0
- Stairs: a straight flight up, stairs down (an opening in the floor with a railing)
  and a spiral staircase. They rise by the wall height and show in 3D with treads and
  handrails. Place a flight up and one down on the same spot for stairs to the next
  floor with the cellar stairs below.

## 0.12.0
- **Auto walls** in the 3D view switches the automatic lowering of walls off and on,
  saved per device.
- Optional per device (legend, **On this device**): a tap on a lamp switches it on or
  off, holding it opens the dialog. Off by default.
- Furniture: 58 pieces in nine categories (living room, dining, bedroom, kitchen,
  bathroom, hall, office, kids, more), among them corner sofa, bunk bed, cot, kitchen
  island, corner kitchen, stove, dishwasher, double sink, coat stand, shoe cabinet,
  corner desk, office chair, bookcase, piano and aquarium. Each has its own 3D model.
- Library: search, categories and a preview. The first tap shows the piece in 3D with
  its size, a second tap or **Place** puts it into the plan. Dragging works as before.

## 0.11.0
- Floors: a plan can have several floors, each with its own rooms, devices, furniture
  and background image. Switch floors in the panel header or in the dashboard card
  (option `floor` shows one floor only). Floors can be imported from Home Assistant,
  and imported areas land on the floor of their Home Assistant floor.
- Getting started: an empty plan shows a welcome screen with four ways to begin:
  import your areas, trace a floor plan image, draw by hand or look at a demo home.
- Background images can be uploaded in the planner (stored by Home Assistant's image
  upload) or given as an address. **Set scale** sets the image size by clicking two
  points with a known distance. Position and width can be typed in.
- Visual editor for the dashboard card: floor, view, height and view buttons can be
  set without YAML.
- Missing entities: the planner lists every room, door, window and device whose entity
  was renamed or removed in Home Assistant, marks such devices in the plan and leads to
  the entry to fix it, on any floor.
- Room card: tapping a room in the 3D view or the 2D live map shows its temperature,
  humidity, CO₂, symbols and every device, door and window in it with its state. Each
  line opens the Home Assistant dialog.
- 2D live map: lamps that are on light up their room in their colour, open doors show
  their leaf and the tapped room is outlined.
- Greek translation of the panel, the card and the setup dialog.
- Higher limits per plan: 120 rooms, 240 doors and windows, 500 devices and 400 pieces
  of furniture.

## 0.10.0
- Room labels are hidden while a wall is in front of them.
- Lamps show their real colour in the 2D live map too, and the colour in 3D is
  converted correctly.
- Plan export and import as a JSON file (planner side panel, **Backup**). Imported
  files are checked in the browser and validated again by the server when saved.
- Security: background images only accept a local path or an `https` URL, the card
  height only accepts a number or a CSS length, CI runs with read-only permissions and
  the deploy script only replaces the installed files once the new ones arrived.
- Automated tests for the backend and the frontend, a release workflow and
  Dependabot.
- Walls no longer get tiny extra pieces at outer corners.

## 0.9.0
- Dashboard card `custom:floorplan-3d-card` with the 3D view or the 2D live map, live
  updates and the device dialog on tap. Options: `height`, `view`, `controls`. The
  integration registers a small loader, and the 3D code is only loaded where a card is
  shown.

## 0.8.1
- The TV shows the app icon it reports (`entity_picture`) or artwork as background
  with the title on top. Without a picture, known apps get a tile in their colour with
  the first letter. No trademarked logos are included.

## 0.8.0
- Room colours by temperature, humidity, CO₂ or heating state. Each device chooses the
  mode in the legend. The plan setting `color_mode` is the default. Works in the 2D
  live map as well.
- Room labels no longer cover the legend.

## 0.7.0
- New **Limits** section in the planner: temperature scale and the humidity and CO₂
  values for warnings and red symbols (setting `thresholds`).

## 0.6.0
- Live sync: a save on one device updates every open panel (WebSocket command
  `floorplan_3d/subscribe`). With unsaved changes a notice offers to reload or to keep
  editing. A rejected save can be stored anyway with **Save my version**.
- The wall behind a wall-mounted device can stay up in 3D. This is on by default for
  TVs. Walls are split at room corners, so only the affected room's piece stays up.

## 0.5.0
- New furniture: nightstand, dresser, bench, round side table and round rug.
- Furniture snaps flush against nearby walls while moving. Hold Alt or turn snapping
  off to move freely. Rugs never snap.
- Radiators are drawn in the planner with their real length, slide along the wall
  while dragging and have an adjustable length (`width`).
- Tapping a room in 3D zooms in or shows only that room (planner setting **Tapping a
  room**). Tapping beside the plan returns to the whole home.

## 0.4.0
- Walls, doors and windows between the camera and the point it looks at are lowered
  automatically, except in the top view. High wall-mounted devices on a lowered wall
  are hidden.
- Double tap a room to zoom in, double tap beside the plan for the overview.
- The top view now fits the whole plan.

## 0.3.0
- The TV screen in 3D shows the app or source, the title, series or artist and the
  playback state. The 2D live map shows a caption next to the TV.

## 0.2.0
- Animations in 3D: warm air above heating radiators, fresh air at open windows,
  pulses at motion sensors, sound waves at speakers, a moving TV picture and a driving
  robot vacuum.
- Animations can be switched off per device and start switched off when the system
  asks for reduced motion. The frame rate is capped and drops on slow devices.
- Animations in the 2D live map.
- Towel radiators are detected by name or by a mounting height from 0.5 m.

## 0.1.0
First public release.
- Sidebar panel with 3D view and planner.
- Rooms, doors, windows, passages, devices and furniture.
- Room colours by temperature, room symbols and a legend.
- Live devices, opening doors and windows, device dialog on tap.
- 2D live map for devices without WebGL 2.
- English and German.
