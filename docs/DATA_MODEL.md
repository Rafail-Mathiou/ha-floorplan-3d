# Data model

The plan is stored in `.storage/floorplan_3d` as JSON. Lengths are in metres and angles
in degrees. The origin is in the top left corner, x points right and y points down. In
3D, the plan's y becomes z and the height becomes y. A complete example is
[`tests/fixtures/demo.json`](../tests/fixtures/demo.json).

## Schema (version 1)

```json
{
  "version": 1,
  "revision": 12,
  "settings": {
    "wall_height": 2.5,
    "wall_thickness": 0.12,
    "grid": 0.1,
    "color_mode": "temperature",
    "temp_scale": { "cold": 17, "ok_low": 19.5, "ok_high": 22.5, "hot": 25 },
    "thresholds": { "humidity": 60, "humidity_alert": 70, "co2": 1000, "co2_alert": 1400 },
    "room_tap": "focus",
    "background": null
  },
  "floors": [],
  "rooms": [
    {
      "id": "r_living",
      "floor": null,
      "name": "Living room",
      "points": [[0, 0], [6.2, 0], [6.2, 5.0], [0, 5.0]],
      "area_id": "living_room",
      "temp_entity": "sensor.living_room_temperature",
      "humidity_entity": "sensor.living_room_humidity",
      "floor_color": null
    }
  ],
  "openings": [
    {
      "id": "o_window",
      "type": "window",
      "room_ids": ["r_living"],
      "wall": { "a": [0, 1.0], "b": [0, 2.6] },
      "entity_id": "binary_sensor.living_room_window",
      "exterior": true,
      "hinge": "left"
    }
  ],
  "items": [
    {
      "id": "i_radiator",
      "entity_id": "climate.living_room",
      "kind": "auto",
      "pos": [0.15, 1.8],
      "rotation": 0,
      "height": 0.2,
      "room_id": "r_living",
      "label": null,
      "width": null,
      "keep_wall": null
    }
  ],
  "furniture": [
    {
      "id": "f_sofa",
      "type": "sofa",
      "pos": [2.9, 2.5],
      "size": [2.4, 0.95],
      "rotation": -90,
      "label": null
    }
  ]
}
```

## Fields

### settings
- `wall_height`, `wall_thickness` and `grid` in metres.
- `color_mode`: default room colouring, one of `temperature`, `humidity`, `co2`,
  `heating` or `none`. Each device can choose its own mode in the legend.
- `temp_scale`: limits for the temperature colours.
- `thresholds`: limits for the humidity symbols in percent (`humidity`,
  `humidity_alert`) and the CO₂ symbols in ppm (`co2`, `co2_alert`). Each warning value
  must be below its red value.
- `room_tap`: what tapping a room in the 3D view does. `focus` zooms in (default),
  `isolate` shows only that room and `none` does nothing.
- `background`: optional image for tracing, only shown in the planner. `url` is a path
  in Home Assistant such as `/local/plan.png`, an uploaded image
  (`/api/image/serve/<id>/original`) or an `https` URL. `x`, `y`, `width` and
  `height` are in metres, `opacity` and `visible` control the display. In a plan with
  floors, each floor has its own image and this one stays `null`.

### floors
- Empty for a home on one level. Otherwise every floor has an `id` (prefix `fl_`), a
  `name`, a `level` (0 is the ground floor, negative levels are basements), an optional
  `floor_id` that links it to a Home Assistant floor, and its own `background`.
- Rooms, openings, items and furniture name their floor in `floor`. `null` or an
  unknown ID means the first floor in the list.
- All floors share the settings (wall height, limits and so on).

### rooms
- `points`: the outline, at least 3 points. Rectangles have 4.
- The area in m² is not stored. It is always calculated from the outline.
- `area_id`: optional link to a Home Assistant area, used for the import and for entity
  suggestions.
- `temp_entity`: source of the temperature colour. A `climate` entity uses its current
  temperature. Empty means a neutral colour.
- Walls are not stored. They are derived from the room outlines, and an edge shared by
  two rooms becomes one interior wall.

### openings (doors, windows, passages)
- They sit on a room edge from `wall.a` to `wall.b` and cut the wall.
- `type`: `door`, `window` or `opening` (a passage without a door).
- `room_ids`: one room for exterior openings, two rooms otherwise. A door swings into
  `room_ids[0]`.
- `entity_id`: optional contact sensor that opens and closes the door or window in 3D.
- `exterior`: an open exterior door is shown as a warning.
- `hinge`: `left` puts the hinge at `wall.a`, `right` at `wall.b`.

### items (placed entities)
- `kind`: `auto` derives the look from the domain and device class. Otherwise one of
  `radiator`, `light`, `tv`, `speaker`, `sensor`, `motion`, `vacuum` or `generic`.
- `pos`: position in the plan. `height`: mounting height in metres. `rotation` 0
  aligns the device with the nearest wall.
- `room_id`: set automatically when the item is placed or moved.
- `width` (optional): length of a radiator along the wall in metres. The default is
  0.9, or 0.5 for towel radiators.
- `keep_wall` (optional): the wall behind a wall-mounted device is never lowered in
  3D. `null` uses the default, which is on for TVs.

### furniture
- `type`: `sofa`, `sofa_2`, `sofa_corner`, `armchair`, `pouf`, `coffee_table`,
  `side_table`, `tv_board`, `sideboard`, `shelf`, `bookcase`, `fireplace`, `piano`,
  `table`, `table_large`, `table_round`, `chair`, `bench`, `bar_stool`, `vitrine`,
  `bed`, `bed_king`, `bed_single`, `nightstand`, `dresser`, `wardrobe`,
  `wardrobe_small`, `vanity`, `kitchen`, `kitchen_corner`, `kitchen_island`, `stove`,
  `dishwasher`, `fridge`, `tall_cabinet`, `bathtub`, `shower`, `toilet`, `bidet`,
  `sink`, `sink_double`, `washer`, `dryer`, `coat_rack`, `shoe_cabinet`, `console`,
  `desk`, `desk_corner`, `office_chair`, `filing_cabinet`, `bed_bunk`, `crib`,
  `toy_box`, `rug`, `rug_round`, `plant`, `aquarium`, `lounger`, `stairs`,
  `stairs_down` or `stairs_spiral`.
- `pos` is the centre, `size` is width and depth in metres and `rotation` is in degrees
  clockwise. The height in 3D depends on the type (see `frontend/src/catalog.ts`).
- Corner pieces (`sofa_corner`, `kitchen_corner`, `desk_corner`) are L-shaped inside
  their size: one arm runs along the back, the other along the right side. Rotate them
  for other corners.
- Stairs rise from the front edge to the back edge (`stairs`), lead down the same way
  (`stairs_down`) or wind around a centre post (`stairs_spiral`). Their height is the
  wall height.

### IDs
IDs start with a prefix per kind: `fl_` for floors, `r_` for rooms, `o_` for openings,
`i_` for items and `f_` for furniture.

## Validation on the server
- `save` with an outdated `revision` fails with `conflict`.
- `subscribe` sends `{"revision": n}` right away and after every save.
- Limits: 10 floors, 120 rooms, 240 openings, 500 items, 400 pieces of furniture, 32
  points per outline, coordinates between -100 and 100 m and texts up to 100
  characters.
- References to floors that do not exist are reset to `null`.
- Unknown fields are dropped.

## Export file
**Export** in the planner writes the plan in this format with two extra fields,
`"format": "floorplan-3d"` and `"version": 1`. **Import** accepts the same file. Background images
are not taken over, because image paths differ between installations: a plan without
floors keeps the current image, floors start without one.

## Migrations
The store has a `version` and a `minor_version`. Every schema change raises the version
and adds a migration.
