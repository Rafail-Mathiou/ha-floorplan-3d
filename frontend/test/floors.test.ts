import { describe, expect, it } from "vitest";

import demoJson from "../../tests/fixtures/demo.json";
import { activeFloor, addFloor, floorOf, floorView, importFloors, mergeFloor, removeFloor } from "../src/floors";
import { newRoom, type PlanData } from "../src/model";
import { exportPlan, parsePlan } from "../src/plan-io";

const demo = demoJson as unknown as PlanData;
const bg = { url: "/local/plan.png", x: 0, y: 0, width: 10, height: 8, opacity: 0.5, visible: true };

describe("floors", () => {
  it("leaves plans without floors alone", () => {
    expect(floorView(demo, null)).toBe(demo);
    expect(mergeFloor(demo, null, demo)).toBe(demo);
    expect(activeFloor(demo, "x")).toBeNull();
  });

  it("turns the existing plan into the ground floor when adding a floor", () => {
    const withBg = { ...demo, settings: { ...demo.settings, background: bg } };
    const { plan, id } = addFloor(withBg, "First floor", "Ground floor");
    const [ground, upper] = plan.floors!;
    expect(ground.name).toBe("Ground floor");
    expect(ground.background).toEqual(bg);
    expect(plan.settings.background).toBeNull();
    expect(upper.id).toBe(id);
    expect(upper.level).toBe(1);
    expect(plan.rooms.every((r) => r.floor === ground.id)).toBe(true);
    expect(plan.items.every((i) => i.floor === ground.id)).toBe(true);
    expect(floorView(plan, id).rooms).toEqual([]);
    expect(floorView(plan, ground.id).rooms.length).toBe(demo.rooms.length);
    expect(activeFloor(plan, undefined)).toBe(ground.id);
  });

  it("merges an edited floor back without touching the others", () => {
    const { plan, id } = addFloor(demo, "Upstairs", "Ground floor");
    const ground = plan.floors![0].id;
    const view = floorView(plan, id);
    const room = newRoom("Bedroom", [[0, 0], [3, 0], [3, 3], [0, 3]]);
    const merged = mergeFloor(plan, id, { ...view, rooms: [room], settings: { ...view.settings, background: bg } });
    expect(floorOf(merged, merged.rooms.find((r) => r.id === room.id)!)).toBe(id);
    expect(floorView(merged, ground).rooms.length).toBe(demo.rooms.length);
    expect(merged.floors!.find((f) => f.id === id)!.background).toEqual(bg);
    expect(merged.settings.background).toBeNull();
  });

  it("removes a floor with its content and flattens the last one", () => {
    const { plan, id } = addFloor(demo, "Upstairs", "Ground floor");
    const ground = plan.floors![0].id;
    const flat = removeFloor(plan, ground);
    expect(flat.floors).toEqual([]);
    expect(flat.rooms).toEqual([]);
    const back = removeFloor(plan, id);
    expect(back.floors).toEqual([]);
    expect(back.rooms.length).toBe(demo.rooms.length);
    expect(back.rooms.every((r) => r.floor === null)).toBe(true);
  });

  it("imports Home Assistant floors and sorts rooms by their area", () => {
    const plan: PlanData = {
      ...demo,
      rooms: demo.rooms.map((r, i) => ({ ...r, area_id: i === 0 ? "attic_room" : null })),
    };
    const imported = importFloors(
      plan,
      [
        { floor_id: "ground", name: "Ground", level: 0 },
        { floor_id: "attic", name: "Attic", level: 2 },
      ],
      (area) => (area === "attic_room" ? "attic" : null),
    );
    const attic = imported.floors!.find((f) => f.floor_id === "attic")!.id;
    const ground = imported.floors!.find((f) => f.floor_id === "ground")!.id;
    expect(imported.rooms[0].floor).toBe(attic);
    expect(imported.rooms.slice(1).every((r) => r.floor === ground)).toBe(true);
    expect(importFloors(imported, [{ floor_id: "attic", name: "Attic", level: 2 }], () => null)).toBe(imported);
  });

  it("survives export and import", () => {
    const { plan, id } = addFloor(demo, "Upstairs", "Ground floor");
    const back = parsePlan(exportPlan(plan), demo.settings)!;
    expect(back.floors!.map((f) => f.id)).toEqual(plan.floors!.map((f) => f.id));
    expect(back.rooms.every((r) => r.floor === plan.floors![0].id)).toBe(true);
    expect(floorView(back, id).rooms).toEqual([]);
  });
});
