// Entities the plan refers to that Home Assistant no longer knows (renamed or removed).
import { floorOf } from "./floors";
import type { PlanData } from "./model";
import type { HomeAssistant } from "./types";

export interface MissingEntity {
  /** Object that refers to the entity (room, opening or item). */
  id: string;
  kind: "room" | "opening" | "item";
  entity: string;
  floor: string | null;
}

export function missingEntities(hass: HomeAssistant, plan: PlanData): MissingEntity[] {
  // Without any states the connection is not ready yet; report nothing
  if (!Object.keys(hass.states).length) return [];
  const missing: MissingEntity[] = [];
  const check = (id: string, kind: MissingEntity["kind"], entity: string | null, floor: string | null) => {
    if (entity && !hass.states[entity]) missing.push({ id, kind, entity, floor });
  };
  for (const r of plan.rooms) {
    check(r.id, "room", r.temp_entity, floorOf(plan, r));
    check(r.id, "room", r.humidity_entity, floorOf(plan, r));
  }
  for (const o of plan.openings) check(o.id, "opening", o.entity_id, floorOf(plan, o));
  for (const i of plan.items) check(i.id, "item", i.entity_id, floorOf(plan, i));
  return missing;
}
