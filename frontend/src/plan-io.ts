// Plan backup: export as JSON file, import with a defensive client-side check. The
// server validates again on save (custom_components/floorplan_3d/store.py).
import { FURNITURE } from "./catalog";
import type { Background, Floor, Furniture, Item, Opening, PlanData, PlanSettings, Point, Room } from "./model";

/** Largest accepted import file (bytes). */
export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;

const FURNITURE_TYPES = new Set<string>(FURNITURE.map((f) => f.type));
const ITEM_KINDS = new Set(["auto", "radiator", "light", "tv", "speaker", "sensor", "motion", "vacuum", "generic"]);
const ENTITY_ID = /^[a-z0-9_]+\.[a-z0-9_]+$/;

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const finite = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const num = (v: unknown): v is number => finite(v) && Math.abs(v) <= 1000;
const str = (v: unknown, max = 100): string | null => (typeof v === "string" ? v.slice(0, max) : null);
const entity = (v: unknown): string | null => (typeof v === "string" && ENTITY_ID.test(v) ? v : null);
const point = (v: unknown): Point | undefined => (Array.isArray(v) && v.length === 2 && num(v[0]) && num(v[1]) ? [v[0], v[1]] : undefined);
const id = (v: unknown): string | undefined => (typeof v === "string" && v.length > 0 && v.length <= 100 ? v : undefined);

/** File content for “Export plan”. */
export function exportPlan(plan: PlanData): string {
  return `${JSON.stringify({ format: "floorplan-3d", version: 1, ...plan }, null, 2)}\n`;
}

/**
 * Turns an imported file into a plan, keeping only well-formed entries. Returns
 * undefined if the content is not a plan at all.
 */
export function parsePlan(text: string, fallback: PlanSettings): PlanData | undefined {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return undefined;
  }
  if (!isObj(raw) || !Array.isArray(raw.rooms)) return undefined;

  // Floors keep their names and levels; their images point to the exporting system
  const floors: Floor[] = (Array.isArray(raw.floors) ? raw.floors : []).slice(0, 10).flatMap((f): Floor[] => {
    if (!isObj(f) || !id(f.id)) return [];
    const level = finite(f.level) ? Math.round(f.level) : 0;
    return [{ id: id(f.id)!, name: str(f.name) ?? "", level: Math.max(-10, Math.min(100, level)), floor_id: str(f.floor_id), background: null as Background | null }];
  });
  const floorIds = new Set(floors.map((f) => f.id));
  const floor = (v: unknown): { floor?: string } => (typeof v === "string" && floorIds.has(v) ? { floor: v } : {});

  const rooms: Room[] = raw.rooms.flatMap((r): Room[] => {
    if (!isObj(r) || !id(r.id) || !Array.isArray(r.points)) return [];
    const points = r.points.map(point);
    if (points.length < 3 || points.length > 32 || points.some((p) => !p)) return [];
    const color = typeof r.floor_color === "string" && /^#[0-9a-fA-F]{6}$/.test(r.floor_color) ? r.floor_color : null;
    return [
      {
        id: id(r.id)!,
        ...floor(r.floor),
        name: str(r.name) ?? "",
        points: points as Point[],
        area_id: str(r.area_id),
        temp_entity: entity(r.temp_entity),
        humidity_entity: entity(r.humidity_entity),
        floor_color: color,
      },
    ];
  });

  const openings: Opening[] = (Array.isArray(raw.openings) ? raw.openings : []).flatMap((o): Opening[] => {
    if (!isObj(o) || !id(o.id) || !isObj(o.wall)) return [];
    const a = point(o.wall.a);
    const b = point(o.wall.b);
    const type = o.type === "door" || o.type === "window" || o.type === "opening" ? o.type : undefined;
    if (!a || !b || !type) return [];
    const roomIds = Array.isArray(o.room_ids) ? o.room_ids.map(id).filter((x): x is string => !!x).slice(0, 2) : [];
    return [{ id: id(o.id)!, ...floor(o.floor), type, room_ids: roomIds, wall: { a, b }, entity_id: entity(o.entity_id), exterior: o.exterior === true, hinge: o.hinge === "right" ? "right" : "left" }];
  });

  const items: Item[] = (Array.isArray(raw.items) ? raw.items : []).flatMap((i): Item[] => {
    if (!isObj(i) || !id(i.id) || !entity(i.entity_id)) return [];
    const pos = point(i.pos);
    if (!pos) return [];
    const item: Item = {
      id: id(i.id)!,
      ...floor(i.floor),
      entity_id: entity(i.entity_id)!,
      kind: typeof i.kind === "string" && ITEM_KINDS.has(i.kind) ? (i.kind as Item["kind"]) : "auto",
      pos,
      rotation: num(i.rotation) ? i.rotation : 0,
      height: num(i.height) && i.height >= 0 && i.height <= 5 ? i.height : 0,
      room_id: id(i.room_id) ?? null,
      label: str(i.label),
    };
    if (num(i.width) && i.width >= 0.2 && i.width <= 4) item.width = i.width;
    if (typeof i.keep_wall === "boolean") item.keep_wall = i.keep_wall;
    return [item];
  });

  const furniture: Furniture[] = (Array.isArray(raw.furniture) ? raw.furniture : []).flatMap((f): Furniture[] => {
    if (!isObj(f) || !id(f.id) || typeof f.type !== "string" || !FURNITURE_TYPES.has(f.type)) return [];
    const pos = point(f.pos);
    const size = point(f.size);
    if (!pos || !size || size[0] < 0.05 || size[1] < 0.05 || size[0] > 20 || size[1] > 20) return [];
    return [{ id: id(f.id)!, ...floor(f.floor), type: f.type as Furniture["type"], pos, size: [size[0], size[1]], rotation: num(f.rotation) ? f.rotation : 0, label: str(f.label) }];
  });

  // Settings: keep known values of the right type, fall back to the current ones
  const s = isObj(raw.settings) ? raw.settings : {};
  const settings: PlanSettings = { ...fallback };
  for (const key of ["wall_height", "wall_thickness", "grid"] as const) if (num(s[key]) && s[key] > 0) settings[key] = s[key];
  if (isObj(s.temp_scale) && ["cold", "ok_low", "ok_high", "hot"].every((k) => num((s.temp_scale as Obj)[k]))) {
    settings.temp_scale = s.temp_scale as unknown as PlanSettings["temp_scale"];
  }
  if (isObj(s.thresholds) && ["humidity", "humidity_alert", "co2", "co2_alert"].every((k) => finite((s.thresholds as Obj)[k]))) {
    const th = s.thresholds as Obj;
    settings.thresholds = { humidity: th.humidity as number, humidity_alert: th.humidity_alert as number, co2: th.co2 as number, co2_alert: th.co2_alert as number };
  }
  if (s.room_tap === "focus" || s.room_tap === "isolate" || s.room_tap === "none") settings.room_tap = s.room_tap;
  if (typeof s.color_mode === "string" && ["temperature", "humidity", "co2", "heating", "none"].includes(s.color_mode)) {
    settings.color_mode = s.color_mode as PlanSettings["color_mode"];
  }
  // The background image points to a file of the exporting system; keep the current one
  settings.background = floors.length ? null : fallback.background;

  return { settings, floors, rooms, openings, items, furniture };
}
