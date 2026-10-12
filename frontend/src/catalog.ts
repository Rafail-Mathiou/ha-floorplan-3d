// Planner library: devices, openings (doors/windows) and furniture with default sizes.
import { entityArea } from "./ha";
import { t } from "./i18n";
import type { FurnitureCategory, FurnitureType, ItemKind, Opening, PlanData } from "./model";
import type { HomeAssistant } from "./types";

export interface DeviceEntry {
  group: "device";
  kind: Exclude<ItemKind, "auto">;
  height: number;
}

export interface OpeningEntry {
  group: "opening";
  type: Opening["type"];
  width: number;
}

export interface FurnitureEntry {
  group: "furniture";
  type: FurnitureType;
  size: [number, number];
  /** Height in 3D (m). */
  height: number;
  /** Round or oval footprint. */
  round?: boolean;
  /** Does not snap to walls (rugs). */
  free?: boolean;
  category: FurnitureCategory;
  /** L-shaped footprint: arms along the back and the right side, `arm` deep. */
  shape?: "L";
  arm?: number;
}

export const FURNITURE_CATEGORIES: FurnitureCategory[] = ["living", "dining", "bedroom", "kitchen", "bathroom", "hall", "office", "kids", "stairs", "other"];

export type CatalogEntry = DeviceEntry | OpeningEntry | FurnitureEntry;

export const DEVICES: DeviceEntry[] = [
  { group: "device", kind: "radiator", height: 0.2 },
  { group: "device", kind: "light", height: 1.6 },
  { group: "device", kind: "tv", height: 1.0 },
  { group: "device", kind: "speaker", height: 0.8 },
  { group: "device", kind: "sensor", height: 1.0 },
  { group: "device", kind: "motion", height: 2.4 },
  { group: "device", kind: "vacuum", height: 0 },
  { group: "device", kind: "generic", height: 1.2 },
];

export const OPENINGS: OpeningEntry[] = [
  { group: "opening", type: "door", width: 0.9 },
  { group: "opening", type: "window", width: 1.2 },
  { group: "opening", type: "opening", width: 0.9 },
];

export const FURNITURE: FurnitureEntry[] = [
  { group: "furniture", type: "sofa", category: "living", size: [2.2, 0.95], height: 0.85 },
  { group: "furniture", type: "sofa_2", category: "living", size: [1.6, 0.9], height: 0.85 },
  { group: "furniture", type: "sofa_corner", category: "living", size: [2.6, 1.9], height: 0.85, shape: "L", arm: 0.95 },
  { group: "furniture", type: "armchair", category: "living", size: [0.85, 0.85], height: 0.85 },
  { group: "furniture", type: "pouf", category: "living", size: [0.5, 0.5], height: 0.42, round: true },
  { group: "furniture", type: "coffee_table", category: "living", size: [1.1, 0.6], height: 0.45 },
  { group: "furniture", type: "side_table", category: "living", size: [0.5, 0.5], height: 0.55, round: true },
  { group: "furniture", type: "tv_board", category: "living", size: [1.8, 0.45], height: 0.5 },
  { group: "furniture", type: "sideboard", category: "living", size: [1.6, 0.45], height: 0.8 },
  { group: "furniture", type: "shelf", category: "living", size: [1.0, 0.35], height: 1.8 },
  { group: "furniture", type: "bookcase", category: "living", size: [0.8, 0.32], height: 2.0 },
  { group: "furniture", type: "fireplace", category: "living", size: [1.2, 0.4], height: 1.0 },
  { group: "furniture", type: "piano", category: "living", size: [1.5, 0.6], height: 1.25 },
  { group: "furniture", type: "table", category: "dining", size: [1.6, 0.9], height: 0.75 },
  { group: "furniture", type: "table_large", category: "dining", size: [2.2, 1.0], height: 0.75 },
  { group: "furniture", type: "table_round", category: "dining", size: [1.1, 1.1], height: 0.75, round: true },
  { group: "furniture", type: "chair", category: "dining", size: [0.45, 0.5], height: 0.9 },
  { group: "furniture", type: "bench", category: "dining", size: [1.2, 0.4], height: 0.45 },
  { group: "furniture", type: "bar_stool", category: "dining", size: [0.4, 0.4], height: 0.75, round: true },
  { group: "furniture", type: "vitrine", category: "dining", size: [1.0, 0.42], height: 1.9 },
  { group: "furniture", type: "bed", category: "bedroom", size: [1.8, 2.0], height: 0.5 },
  { group: "furniture", type: "bed_king", category: "bedroom", size: [2.0, 2.1], height: 0.5 },
  { group: "furniture", type: "bed_single", category: "bedroom", size: [0.9, 2.0], height: 0.5 },
  { group: "furniture", type: "nightstand", category: "bedroom", size: [0.45, 0.4], height: 0.5 },
  { group: "furniture", type: "dresser", category: "bedroom", size: [1.2, 0.5], height: 0.85 },
  { group: "furniture", type: "wardrobe", category: "bedroom", size: [2.0, 0.6], height: 2.1 },
  { group: "furniture", type: "wardrobe_small", category: "bedroom", size: [1.0, 0.6], height: 2.0 },
  { group: "furniture", type: "vanity", category: "bedroom", size: [1.0, 0.45], height: 0.75 },
  { group: "furniture", type: "kitchen", category: "kitchen", size: [2.4, 0.6], height: 0.9 },
  { group: "furniture", type: "kitchen_corner", category: "kitchen", size: [2.4, 1.8], height: 0.9, shape: "L", arm: 0.6 },
  { group: "furniture", type: "kitchen_island", category: "kitchen", size: [1.8, 0.9], height: 0.9 },
  { group: "furniture", type: "stove", category: "kitchen", size: [0.6, 0.6], height: 0.9 },
  { group: "furniture", type: "dishwasher", category: "kitchen", size: [0.6, 0.6], height: 0.85 },
  { group: "furniture", type: "fridge", category: "kitchen", size: [0.6, 0.65], height: 1.8 },
  { group: "furniture", type: "tall_cabinet", category: "kitchen", size: [0.6, 0.6], height: 2.1 },
  { group: "furniture", type: "bathtub", category: "bathroom", size: [1.7, 0.75], height: 0.55 },
  { group: "furniture", type: "shower", category: "bathroom", size: [0.9, 0.9], height: 2.0 },
  { group: "furniture", type: "toilet", category: "bathroom", size: [0.38, 0.65], height: 0.4 },
  { group: "furniture", type: "bidet", category: "bathroom", size: [0.38, 0.55], height: 0.4 },
  { group: "furniture", type: "sink", category: "bathroom", size: [0.6, 0.45], height: 0.85 },
  { group: "furniture", type: "sink_double", category: "bathroom", size: [1.2, 0.5], height: 0.85 },
  { group: "furniture", type: "washer", category: "bathroom", size: [0.6, 0.6], height: 0.85 },
  { group: "furniture", type: "dryer", category: "bathroom", size: [0.6, 0.6], height: 0.85 },
  { group: "furniture", type: "coat_rack", category: "hall", size: [0.45, 0.45], height: 1.8, round: true },
  { group: "furniture", type: "shoe_cabinet", category: "hall", size: [0.9, 0.3], height: 1.0 },
  { group: "furniture", type: "console", category: "hall", size: [1.0, 0.3], height: 0.8 },
  { group: "furniture", type: "desk", category: "office", size: [1.4, 0.7], height: 0.75 },
  { group: "furniture", type: "desk_corner", category: "office", size: [1.6, 1.6], height: 0.75, shape: "L", arm: 0.7 },
  { group: "furniture", type: "office_chair", category: "office", size: [0.6, 0.6], height: 1.05, round: true },
  { group: "furniture", type: "filing_cabinet", category: "office", size: [0.45, 0.6], height: 0.7 },
  { group: "furniture", type: "bed_bunk", category: "kids", size: [0.9, 2.0], height: 1.6 },
  { group: "furniture", type: "crib", category: "kids", size: [0.7, 1.3], height: 0.9 },
  { group: "furniture", type: "toy_box", category: "kids", size: [0.8, 0.4], height: 0.45 },
  { group: "furniture", type: "rug", category: "other", size: [2.0, 1.4], height: 0.01, free: true },
  { group: "furniture", type: "rug_round", category: "other", size: [1.6, 1.6], height: 0.01, round: true, free: true },
  { group: "furniture", type: "plant", category: "other", size: [0.45, 0.45], height: 1.1 },
  { group: "furniture", type: "aquarium", category: "other", size: [1.0, 0.4], height: 1.3 },
  { group: "furniture", type: "lounger", category: "other", size: [0.7, 1.9], height: 0.4 },
  { group: "furniture", type: "stairs", category: "stairs", size: [1.0, 3.2], height: 2.5 },
  { group: "furniture", type: "stairs_down", category: "stairs", size: [1.0, 3.2], height: 0.01 },
  { group: "furniture", type: "stairs_spiral", category: "stairs", size: [1.6, 1.6], height: 2.5, round: true },
];

export const furnitureEntry = (type: FurnitureType) => FURNITURE.find((f) => f.type === type) ?? FURNITURE[0];

/** Display name of a library entry in the current language. */
export function entryLabel(entry: CatalogEntry): string {
  if (entry.group === "device") return t().kinds[entry.kind];
  if (entry.group === "opening") return t().openings[entry.type];
  return t().furnitureTypes[entry.type];
}

/** Entities that fit a device kind. */
export function candidates(hass: HomeAssistant, kind: ItemKind): string[] {
  const ids = Object.keys(hass.states);
  const dc = (id: string) => hass.states[id]?.attributes.device_class;
  switch (kind) {
    case "radiator":
      return ids.filter((id) => id.startsWith("climate."));
    case "light":
      return ids.filter((id) => id.startsWith("light.") || id.startsWith("switch."));
    case "tv":
      return ids.filter((id) => id.startsWith("media_player.") && /(^|_)(tv|fernseher|webos)/.test(id));
    case "speaker":
      return ids.filter((id) => id.startsWith("media_player."));
    case "sensor":
      return ids.filter((id) => id.startsWith("sensor.") && !!dc(id));
    case "motion":
      return ids.filter((id) => id.startsWith("binary_sensor.") && ["motion", "occupancy", "presence"].includes(String(dc(id))));
    case "vacuum":
      return ids.filter((id) => id.startsWith("vacuum."));
    default:
      return ids;
  }
}

/** Contact sensors for doors and windows. */
export function contactCandidates(hass: HomeAssistant): string[] {
  return Object.keys(hass.states).filter(
    (id) => id.startsWith("binary_sensor.") && ["door", "window", "opening", "garage_door"].includes(String(hass.states[id].attributes.device_class)),
  );
}

/** Best entity for a newly placed device: in the room's area and not yet in the plan. */
export function suggestEntity(hass: HomeAssistant | undefined, plan: PlanData, kind: ItemKind, areaId: string | null): string | undefined {
  if (!hass) return undefined;
  const used = new Set(plan.items.map((i) => i.entity_id));
  const list = candidates(hass, kind).filter((id) => !hass.entities?.[id]?.hidden);
  const score = (id: string) => (areaId && entityArea(hass, id) === areaId ? 2 : 0) + (used.has(id) ? 0 : 1);
  return [...list].sort((a, b) => score(b) - score(a) || a.localeCompare(b))[0];
}
