// Floors: every room, opening, device and piece of furniture belongs to one floor. A plan
// without floors is a single floor. The planner and the views work on one floor at a
// time: `floorView` cuts it out of the plan and `mergeFloor` puts the edited floor back.
import { pointInPolygon } from "./editor/geometry";
import { newId, type Floor, type PlanData } from "./model";

interface OnFloor {
  floor?: string | null;
}

export const floorsOf = (plan: PlanData): Floor[] => plan.floors ?? [];

/** Floors from the bottom to the top. */
export function sortedFloors(plan: PlanData): Floor[] {
  return [...floorsOf(plan)].sort((a, b) => a.level - b.level);
}

/** Floor of an object; objects without a (known) floor are on the first floor. */
export function floorOf(plan: PlanData, obj: OnFloor): string | null {
  const floors = floorsOf(plan);
  if (!floors.length) return null;
  return obj.floor && floors.some((f) => f.id === obj.floor) ? obj.floor : floors[0].id;
}

/** The wanted floor if it exists, else the ground floor (level 0) or the lowest one. */
export function activeFloor(plan: PlanData, wanted: string | null | undefined): string | null {
  const floors = sortedFloors(plan);
  if (!floors.length) return null;
  if (wanted && floors.some((f) => f.id === wanted)) return wanted;
  return (floors.find((f) => f.level === 0) ?? floors[0]).id;
}

/** One floor of the plan; its background image appears as `settings.background`. */
export function floorView(plan: PlanData, floorId: string | null): PlanData {
  const floor = floorsOf(plan).find((f) => f.id === floorId);
  if (!floor) return plan;
  const on = (x: OnFloor) => floorOf(plan, x) === floor.id;
  return {
    ...plan,
    settings: { ...plan.settings, background: floor.background },
    rooms: plan.rooms.filter(on),
    openings: plan.openings.filter(on),
    items: plan.items.filter(on),
    furniture: plan.furniture.filter(on),
  };
}

/** Puts an edited floor view back into the whole plan. */
export function mergeFloor(plan: PlanData, floorId: string | null, view: PlanData): PlanData {
  const floor = floorsOf(plan).find((f) => f.id === floorId);
  if (!floor || view === plan) return view;
  const off = (x: OnFloor) => floorOf(plan, x) !== floor.id;
  const tag = <T extends OnFloor>(x: T): T => (x.floor === floor.id ? x : { ...x, floor: floor.id });
  return {
    settings: { ...view.settings, background: plan.settings.background },
    floors: floorsOf(plan).map((f) => (f.id === floor.id ? { ...f, background: view.settings.background } : f)),
    rooms: [...plan.rooms.filter(off), ...view.rooms.map(tag)],
    openings: [...plan.openings.filter(off), ...view.openings.map(tag)],
    items: [...plan.items.filter(off), ...view.items.map(tag)],
    furniture: [...plan.furniture.filter(off), ...view.furniture.map(tag)],
  };
}

/** Devices, openings and furniture follow the floor of their room. */
function assignByRooms(plan: PlanData, fallback: string): PlanData {
  const roomFloor = new Map(plan.rooms.map((r) => [r.id, r.floor ?? fallback]));
  const at = (id: string | null | undefined) => (id ? roomFloor.get(id) : undefined) ?? fallback;
  return {
    ...plan,
    items: plan.items.map((i) => ({ ...i, floor: at(i.room_id) })),
    openings: plan.openings.map((o) => ({ ...o, floor: at(o.room_ids[0]) })),
    furniture: plan.furniture.map((f) => ({ ...f, floor: at(plan.rooms.find((r) => pointInPolygon(f.pos, r.points))?.id) })),
  };
}

/**
 * Adds a floor above the highest one. A plan without floors first becomes a plan whose
 * content is the floor `firstName`.
 */
export function addFloor(plan: PlanData, name: string, firstName: string): { plan: PlanData; id: string } {
  let next = plan;
  if (!floorsOf(plan).length) {
    const first: Floor = { id: newId("fl"), name: firstName, level: 0, floor_id: null, background: plan.settings.background };
    next = assignByRooms(
      { ...plan, floors: [first], settings: { ...plan.settings, background: null }, rooms: plan.rooms.map((r) => ({ ...r, floor: first.id })) },
      first.id,
    );
  }
  const floors = floorsOf(next);
  const floor: Floor = { id: newId("fl"), name, level: Math.max(...floors.map((f) => f.level)) + 1, floor_id: null, background: null };
  return { plan: { ...next, floors: [...floors, floor] }, id: floor.id };
}

export function updateFloor(plan: PlanData, id: string, patch: Partial<Omit<Floor, "id">>): PlanData {
  return { ...plan, floors: floorsOf(plan).map((f) => (f.id === id ? { ...f, ...patch } : f)) };
}

/**
 * Removes a floor with everything on it. With one floor left the plan becomes a plan
 * without floors again.
 */
export function removeFloor(plan: PlanData, id: string): PlanData {
  const on = (x: OnFloor) => floorOf(plan, x) !== id;
  const rest = floorsOf(plan).filter((f) => f.id !== id);
  const next: PlanData = {
    ...plan,
    floors: rest,
    rooms: plan.rooms.filter(on),
    openings: plan.openings.filter(on),
    items: plan.items.filter(on),
    furniture: plan.furniture.filter(on),
  };
  if (rest.length !== 1) return next;
  const flat = <T extends OnFloor>(x: T): T => ({ ...x, floor: null });
  return {
    settings: { ...plan.settings, background: rest[0].background },
    floors: [],
    rooms: next.rooms.map(flat),
    openings: next.openings.map(flat),
    items: next.items.map(flat),
    furniture: next.furniture.map(flat),
  };
}

export interface HaFloor {
  floor_id: string;
  name: string;
  level?: number | null;
}

/**
 * Creates a floor for every Home Assistant floor that is not linked yet. In a plan
 * without floors, rooms move to the floor of their area (others to the lowest floor).
 */
export function importFloors(plan: PlanData, haFloors: HaFloor[], areaFloor: (areaId: string) => string | null | undefined): PlanData {
  const linked = new Set(floorsOf(plan).map((f) => f.floor_id).filter(Boolean));
  const missing = haFloors.filter((f) => !linked.has(f.floor_id));
  if (!missing.length) return plan;
  const created: Floor[] = [...missing]
    .sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
    .map((f, i) => ({ id: newId("fl"), name: f.name, level: f.level ?? i, floor_id: f.floor_id, background: null }));
  if (floorsOf(plan).length) return { ...plan, floors: [...floorsOf(plan), ...created] };

  const byHa = new Map(created.map((f) => [f.floor_id, f.id]));
  const base = created.find((f) => f.level === 0) ?? created[0];
  const withBg = created.map((f) => (f === base ? { ...f, background: plan.settings.background } : f));
  const rooms = plan.rooms.map((r) => ({ ...r, floor: (r.area_id && byHa.get(areaFloor(r.area_id) ?? "")) || base.id }));
  return assignByRooms({ ...plan, floors: withBg, settings: { ...plan.settings, background: null }, rooms }, base.id);
}

/** Plan floor linked to a Home Assistant floor. */
export function linkedFloor(plan: PlanData, haFloorId: string | null | undefined): string | undefined {
  return haFloorId ? floorsOf(plan).find((f) => f.floor_id === haFloorId)?.id : undefined;
}
