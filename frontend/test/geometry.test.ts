import { describe, expect, it } from "vitest";

import { footprint, nearestWall, snapToWalls } from "../src/editor/geometry";
import type { Room } from "../src/model";
import { buildWalls } from "../src/scene/walls";

const square = (id: string, x: number, y: number, w: number, h: number): Room => ({
  id,
  name: id,
  points: [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ],
  area_id: null,
  temp_entity: null,
  humidity_entity: null,
  floor_color: null,
});

const room = square("r1", 0, 0, 4, 3);

describe("footprint", () => {
  it("rotates the corners around the centre", () => {
    const pts = footprint([2, 2], [2, 1], 90);
    const xs = pts.map((p) => Math.round(p[0] * 100) / 100);
    const ys = pts.map((p) => Math.round(p[1] * 100) / 100);
    expect(Math.min(...xs)).toBe(1.5);
    expect(Math.max(...xs)).toBe(2.5);
    expect(Math.min(...ys)).toBe(1);
    expect(Math.max(...ys)).toBe(3);
  });
});

describe("snapToWalls", () => {
  it("pushes furniture flush against a nearby wall", () => {
    // 2 m wide, 1 m deep, 10 cm away from the top wall (y = 0, half thickness 0.06)
    const pos = snapToWalls([2, 0.66], [2, 1], 0, [room], 0.12, 0.2);
    expect(pos[1]).toBeCloseTo(0.56, 3);
    expect(pos[0]).toBe(2);
  });

  it("snaps into a corner", () => {
    const pos = snapToWalls([0.65, 0.65], [1, 1], 0, [room], 0.12, 0.2);
    expect(pos[0]).toBeCloseTo(0.56, 3);
    expect(pos[1]).toBeCloseTo(0.56, 3);
  });

  it("leaves furniture far from walls alone", () => {
    expect(snapToWalls([2, 1.5], [1, 1], 0, [room], 0.12, 0.2)).toEqual([2, 1.5]);
  });
});

describe("nearestWall", () => {
  it("finds the closest edge with a normal pointing to the point", () => {
    const wall = nearestWall([room], [1, 2.8])!;
    expect(wall.dist).toBeCloseTo(0.2, 5);
    expect(wall.foot).toEqual([1, 3]);
    expect(wall.ny).toBeCloseTo(-1, 5);
  });
});

describe("buildWalls", () => {
  const opts = { height: 2.5, thickness: 0.12 };

  it("draws a shared edge only once", () => {
    const a = square("a", 0, 0, 3, 3);
    const b = square("b", 3, 0, 3, 3);
    const { pieces } = buildWalls([a, b], [], opts);
    const onShared = pieces.filter((p) => Math.abs(p.a[0] - 3) < 1e-6 && Math.abs(p.b[0] - 3) < 1e-6);
    // One wall (3 m plus half the thickness at both ends), not two overlapping ones
    const length = onShared.reduce((sum, p) => sum + Math.abs(p.b[1] - p.a[1]), 0);
    expect(length).toBeCloseTo(3.12, 5);
  });

  it("splits long walls at room corners", () => {
    const a = square("a", 0, 0, 3, 3);
    const b = square("b", 3, 0, 2, 3);
    const top = buildWalls([a, b], [], opts).pieces.filter((p) => Math.abs(p.a[1]) < 1e-6 && Math.abs(p.b[1]) < 1e-6);
    expect(top.length).toBe(2);
  });

  it("cuts a door and keeps the lintel", () => {
    const door = {
      id: "o1",
      type: "door" as const,
      room_ids: ["r1"],
      wall: { a: [1, 0] as [number, number], b: [1.9, 0] as [number, number] },
      entity_id: null,
      exterior: false,
      hinge: "left" as const,
    };
    const { pieces } = buildWalls([room], [door], opts);
    const lintel = pieces.find((p) => p.y0 > 1.9 && Math.abs(p.a[1]) < 1e-6);
    expect(lintel).toBeDefined();
    const full = pieces.filter((p) => p.y0 === 0 && Math.abs(p.a[1]) < 1e-6 && Math.abs(p.b[1]) < 1e-6);
    // Nothing full-height inside the door opening
    expect(full.every((p) => Math.max(p.a[0], p.b[0]) <= 1 + 1e-6 || Math.min(p.a[0], p.b[0]) >= 1.9 - 1e-6)).toBe(true);
  });

  it("adds glass for windows", () => {
    const win = {
      id: "o2",
      type: "window" as const,
      room_ids: ["r1"],
      wall: { a: [1, 3] as [number, number], b: [2.2, 3] as [number, number] },
      entity_id: null,
      exterior: true,
      hinge: "left" as const,
    };
    expect(buildWalls([room], [win], opts).glass.length).toBe(1);
  });
});
