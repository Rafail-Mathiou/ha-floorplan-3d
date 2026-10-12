import { describe, expect, it } from "vitest";

import demoJson from "../../tests/fixtures/demo.json";
import type { PlanData } from "../src/model";
import { exportPlan, parsePlan } from "../src/plan-io";

const demo = demoJson as unknown as PlanData;

describe("plan export and import", () => {
  it("round-trips the demo plan", () => {
    const back = parsePlan(exportPlan(demo), demo.settings)!;
    expect(back.rooms).toEqual(demo.rooms);
    expect(back.openings.length).toBe(demo.openings.length);
    expect(back.items.length).toBe(demo.items.length);
    expect(back.furniture.length).toBe(demo.furniture.length);
  });

  it("rejects files that are not a plan", () => {
    expect(parsePlan("not json", demo.settings)).toBeUndefined();
    expect(parsePlan('{"rooms": 5}', demo.settings)).toBeUndefined();
    expect(parsePlan("[]", demo.settings)).toBeUndefined();
  });

  it("drops malformed entries and unknown fields", () => {
    const text = JSON.stringify({
      rooms: [
        { id: "ok", name: "Room", points: [[0, 0], [1, 0], [1, 1]], evil: "<script>" },
        { id: "short", points: [[0, 0], [1, 0]] },
        { id: "nan", points: [[0, 0], [1, "x"], [1, 1]] },
      ],
      items: [
        { id: "i1", entity_id: "light.lamp", pos: [1, 1] },
        { id: "i2", entity_id: "javascript:alert(1)", pos: [1, 1] },
      ],
      furniture: [
        { id: "f1", type: "bed", pos: [1, 1], size: [2, 2] },
        { id: "f2", type: "rocket", pos: [1, 1], size: [2, 2] },
      ],
    });
    const plan = parsePlan(text, demo.settings)!;
    expect(plan.rooms.map((r) => r.id)).toEqual(["ok"]);
    expect(Object.keys(plan.rooms[0])).not.toContain("evil");
    expect(plan.items.map((i) => i.id)).toEqual(["i1"]);
    expect(plan.furniture.map((f) => f.id)).toEqual(["f1"]);
  });

  it("keeps the current background image", () => {
    const settings = { ...demo.settings, background: { url: "/local/mine.png", x: 0, y: 0, width: 5, height: 5, opacity: 0.5, visible: true } };
    const text = JSON.stringify({ ...demo, settings: { ...demo.settings, background: { url: "https://other.example/x.png" } } });
    expect(parsePlan(text, settings)!.settings.background?.url).toBe("/local/mine.png");
  });
});
