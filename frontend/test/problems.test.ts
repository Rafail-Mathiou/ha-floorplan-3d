import { describe, expect, it } from "vitest";

import demoJson from "../../tests/fixtures/demo.json";
import type { PlanData } from "../src/model";
import { missingEntities } from "../src/problems";
import type { HomeAssistant } from "../src/types";

const demo = demoJson as unknown as PlanData;

function hassWith(ids: string[]): HomeAssistant {
  const states = Object.fromEntries(ids.map((id) => [id, { entity_id: id, state: "on", attributes: {} }]));
  return { states } as unknown as HomeAssistant;
}

function allEntities(plan: PlanData): string[] {
  return [
    ...plan.rooms.flatMap((r) => [r.temp_entity, r.humidity_entity]),
    ...plan.openings.map((o) => o.entity_id),
    ...plan.items.map((i) => i.entity_id),
  ].filter((x): x is string => !!x);
}

describe("missing entities", () => {
  it("reports nothing when every entity exists", () => {
    expect(missingEntities(hassWith(allEntities(demo)), demo)).toEqual([]);
  });

  it("reports nothing before states arrive", () => {
    expect(missingEntities(hassWith([]), demo)).toEqual([]);
  });

  it("lists rooms, openings and devices whose entity is gone", () => {
    const item = demo.items[0];
    const room = demo.rooms.find((r) => r.temp_entity)!;
    const opening = demo.openings.find((o) => o.entity_id)!;
    const gone = new Set([item.entity_id, room.temp_entity, opening.entity_id]);
    const missing = missingEntities(hassWith(allEntities(demo).filter((id) => !gone.has(id))), demo);
    expect(missing.map((m) => [m.kind, m.id, m.entity])).toEqual(
      expect.arrayContaining([
        ["item", item.id, item.entity_id],
        ["room", room.id, room.temp_entity],
        ["opening", opening.id, opening.entity_id],
      ]),
    );
    expect(missing.every((m) => m.floor === null)).toBe(true);
  });
});
