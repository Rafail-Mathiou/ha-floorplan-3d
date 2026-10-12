// Floorplan data model (see docs/DATA_MODEL.md).

export type Point = [number, number];

export type ColorMode = "temperature" | "humidity" | "co2" | "heating" | "none";

export interface TempScale {
  cold: number;
  ok_low: number;
  ok_high: number;
  hot: number;
}

/** Limits for the humidity and CO₂ room symbols (warning, red). */
export interface Thresholds {
  humidity: number;
  humidity_alert: number;
  co2: number;
  co2_alert: number;
}

export const DEFAULT_THRESHOLDS: Thresholds = { humidity: 60, humidity_alert: 70, co2: 1000, co2_alert: 1400 };

/** Thresholds of a plan (defaults for plans saved before they existed). */
export const planThresholds = (plan: PlanData): Thresholds => ({ ...DEFAULT_THRESHOLDS, ...plan.settings.thresholds });

/** Background image for tracing; position and size in metres. */
export interface Background {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  visible: boolean;
}

/** What tapping a room floor in the 3D view does. */
export type RoomTap = "focus" | "isolate" | "none";

export interface PlanSettings {
  /** Default “focus”. */
  room_tap?: RoomTap;
  wall_height: number;
  wall_thickness: number;
  grid: number;
  color_mode: ColorMode;
  temp_scale: TempScale;
  thresholds?: Thresholds;
  background: Background | null;
}

/** A storey of the home; objects reference it by `floor`. */
export interface Floor {
  id: string;
  name: string;
  /** Order from bottom to top (0 = ground floor). */
  level: number;
  /** Linked Home Assistant floor. */
  floor_id: string | null;
  /** Tracing image of this floor (planner only). */
  background: Background | null;
}

export interface Room {
  id: string;
  /** Floor ID; null = the first floor. */
  floor?: string | null;
  name: string;
  points: Point[];
  area_id: string | null;
  temp_entity: string | null;
  humidity_entity: string | null;
  floor_color: string | null;
}

export interface Opening {
  id: string;
  floor?: string | null;
  type: "door" | "window" | "opening";
  room_ids: string[];
  wall: { a: Point; b: Point };
  entity_id: string | null;
  exterior: boolean;
  hinge: "left" | "right";
}

export type ItemKind =
  | "auto"
  | "radiator"
  | "light"
  | "tv"
  | "sensor"
  | "motion"
  | "speaker"
  | "vacuum"
  | "generic";

export interface Item {
  id: string;
  floor?: string | null;
  entity_id: string;
  kind: ItemKind;
  pos: Point;
  rotation: number;
  height: number;
  room_id: string | null;
  label: string | null;
  /** Radiators: length along the wall in m (default depends on the type). */
  width?: number | null;
  /** Wall-mounted devices: the wall behind is never lowered (default: TVs). */
  keep_wall?: boolean | null;
}

/** Whether the wall behind a device stays up in the cutaway. */
export const keepsWall = (item: Item, kind: ResolvedKind): boolean => item.keep_wall ?? kind === "tv";

/** Towel radiators: by name (“towel”, “handtuch”) or a mounting height from 0.5 m. */
export const isTowelRadiator = (item: Item): boolean =>
  /towel|handtuch/i.test(`${item.entity_id} ${item.label ?? ""}`) || item.height >= 0.5;

/** Radiator length along the wall (m). */
export const radiatorWidth = (item: Item): number => item.width ?? (isTowelRadiator(item) ? 0.5 : 0.9);

export type FurnitureType =
  | "sofa"
  | "sofa_2"
  | "sofa_corner"
  | "armchair"
  | "pouf"
  | "coffee_table"
  | "side_table"
  | "tv_board"
  | "sideboard"
  | "shelf"
  | "bookcase"
  | "fireplace"
  | "piano"
  | "table"
  | "table_large"
  | "table_round"
  | "chair"
  | "bench"
  | "bar_stool"
  | "vitrine"
  | "bed"
  | "bed_king"
  | "bed_single"
  | "nightstand"
  | "dresser"
  | "wardrobe"
  | "wardrobe_small"
  | "vanity"
  | "kitchen"
  | "kitchen_corner"
  | "kitchen_island"
  | "stove"
  | "dishwasher"
  | "fridge"
  | "tall_cabinet"
  | "bathtub"
  | "shower"
  | "toilet"
  | "bidet"
  | "sink"
  | "sink_double"
  | "washer"
  | "dryer"
  | "coat_rack"
  | "shoe_cabinet"
  | "console"
  | "desk"
  | "desk_corner"
  | "office_chair"
  | "filing_cabinet"
  | "bed_bunk"
  | "crib"
  | "toy_box"
  | "rug"
  | "rug_round"
  | "plant"
  | "aquarium"
  | "lounger"
  | "stairs"
  | "stairs_down"
  | "stairs_spiral";

export type FurnitureCategory =
  | "living"
  | "dining"
  | "bedroom"
  | "kitchen"
  | "bathroom"
  | "hall"
  | "office"
  | "kids"
  | "stairs"
  | "other";

/** Furniture: centre, width × depth in m, rotation in degrees (clockwise). */
export interface Furniture {
  id: string;
  floor?: string | null;
  type: FurnitureType;
  pos: Point;
  size: [number, number];
  rotation: number;
  label: string | null;
}

/** Plan content (without version/revision). */
export interface PlanData {
  settings: PlanSettings;
  /** Empty: a single floor (plans from before floors existed). */
  floors?: Floor[];
  rooms: Room[];
  openings: Opening[];
  items: Item[];
  furniture: Furniture[];
}

export type SelectionKind = "room" | "item" | "opening" | "furniture";

/** Kind of the selected object, determined by its ID. */
export function selectionKind(plan: PlanData, id: string | null): SelectionKind | undefined {
  if (!id) return undefined;
  if (plan.rooms.some((r) => r.id === id)) return "room";
  if (plan.items.some((i) => i.id === id)) return "item";
  if (plan.openings.some((o) => o.id === id)) return "opening";
  if (plan.furniture.some((f) => f.id === id)) return "furniture";
  return undefined;
}

/** Plan as returned by `floorplan_3d/get`. */
export interface PlanDoc extends PlanData {
  version: number;
  revision: number;
}

/** Area of a polygon in m² (shoelace formula). */
export function polygonArea(points: Point[]): number {
  return Math.abs(signedArea(points));
}

/** Signed area; positive = clockwise (y points down). */
export function signedArea(points: Point[]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

export function totalArea(plan: PlanData): number {
  return plan.rooms.reduce((sum, room) => sum + polygonArea(room.points), 0);
}

export function newId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function newRoom(name: string, points: Point[]): Room {
  return {
    id: newId("r"),
    name,
    points,
    area_id: null,
    temp_entity: null,
    humidity_entity: null,
    floor_color: null,
  };
}

export type ResolvedKind = Exclude<ItemKind, "auto">;

/** Kind of an object; `auto` is derived from the entity domain. */
export function itemKind(item: Item, deviceClass?: string): ResolvedKind {
  if (item.kind !== "auto") return item.kind;
  const domain = item.entity_id.split(".")[0];
  switch (domain) {
    case "climate":
      return "radiator";
    case "light":
    case "switch":
      return "light";
    case "media_player":
      return /(^|_)tv(_|$)/.test(item.entity_id) ? "tv" : "speaker";
    case "vacuum":
      return "vacuum";
    case "binary_sensor":
      return deviceClass && ["motion", "occupancy", "presence"].includes(deviceClass) ? "motion" : "generic";
    case "sensor":
      return "sensor";
    default:
      return "generic";
  }
}
