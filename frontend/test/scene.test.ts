import { PerspectiveCamera, Vector3 } from "three";
import { describe, expect, it } from "vitest";

import type { PlanData, Room } from "../src/model";
import { FLOOR } from "../src/scene/colors";
import { CUT_LOW, cutFactor, cutUniforms, updateCut } from "../src/scene/cutaway";
import { roomColor } from "../src/scene/room-color";
import { tvCaption, tvInfo } from "../src/scene/tv-screen";
import type { HassEntityState, HomeAssistant } from "../src/types";

const state = (entity_id: string, s: string, attributes: Record<string, unknown> = {}): HassEntityState => ({ entity_id, state: s, attributes });

describe("cutaway", () => {
  const camera = new PerspectiveCamera();
  camera.position.set(0, 8, 8);
  const u = cutUniforms();
  updateCut(u, camera, new Vector3(0, 0, 0), true);

  it("lowers walls between camera and target", () => {
    expect(cutFactor(u, [0, 3], [0, 1])).toBeCloseTo(CUT_LOW, 5);
  });

  it("keeps walls behind the target", () => {
    expect(cutFactor(u, [0, -3], [0, 1])).toBe(1);
  });

  it("keeps walls parallel to the view direction", () => {
    expect(cutFactor(u, [0, 3], [1, 0])).toBe(1);
  });

  it("does nothing in the top view", () => {
    const top = new PerspectiveCamera();
    top.position.set(0, 10, 0.001);
    const t = cutUniforms();
    updateCut(t, top, new Vector3(0, 0, 0), true);
    expect(cutFactor(t, [0, 3], [0, 1])).toBe(1);
  });
});

describe("room colours", () => {
  const room: Room = {
    id: "r",
    name: "R",
    points: [[0, 0], [1, 0], [1, 1]],
    area_id: null,
    temp_entity: "sensor.t",
    humidity_entity: "sensor.h",
    floor_color: null,
  };
  const plan = {
    settings: { wall_height: 2.5, wall_thickness: 0.12, grid: 0.1, color_mode: "temperature", temp_scale: { cold: 17, ok_low: 19.5, ok_high: 22.5, hot: 25 }, background: null },
    rooms: [room],
    openings: [],
    items: [
      { id: "i1", entity_id: "climate.r", kind: "auto", pos: [0.5, 0.5], rotation: 0, height: 0.2, room_id: "r", label: null },
      { id: "i2", entity_id: "sensor.co2", kind: "auto", pos: [0.5, 0.5], rotation: 0, height: 1, room_id: "r", label: null },
    ],
    furniture: [],
  } as PlanData;
  const hass = (states: HassEntityState[]) => ({ states: Object.fromEntries(states.map((s) => [s.entity_id, s])) }) as unknown as HomeAssistant;

  it("uses neutral colours without or with unavailable sensors", () => {
    expect(roomColor("humidity", hass([]), { ...plan, rooms: [{ ...room, humidity_entity: null }] }, { ...room, humidity_entity: null })).toEqual(FLOOR.none);
    expect(roomColor("temperature", hass([state("sensor.t", "unavailable")]), plan, room)).toEqual(FLOOR.unavailable);
  });

  it("colours by every mode", () => {
    const h = hass([
      state("sensor.t", "21"),
      state("sensor.h", "75"),
      state("sensor.co2", "1500", { unit_of_measurement: "ppm" }),
      state("climate.r", "heat", { hvac_action: "heating" }),
    ]);
    const colours = (["temperature", "humidity", "co2", "heating"] as const).map((m) => roomColor(m, h, plan, room));
    for (const c of colours) {
      expect(c).not.toEqual(FLOOR.none);
      expect(c).not.toEqual(FLOOR.unavailable);
    }
    // Very humid and bad air are reddish (red channel dominates)
    expect(colours[1][0]).toBeGreaterThan(colours[1][2]);
    expect(colours[2][0]).toBeGreaterThan(colours[2][2]);
  });
});

describe("TV info", () => {
  it("reads app, title and picture", () => {
    const info = tvInfo(state("media_player.tv", "playing", { source: "Prime Video", app_id: "amazon", media_title: "Movie", entity_picture: "/api/x" }));
    expect(info).toMatchObject({ on: true, playing: true, app: "Prime Video", title: "Movie", picture: "/api/x", appId: "amazon" });
    expect(tvCaption(info)).toBe("Prime Video · Movie");
  });

  it("shows nothing when off", () => {
    const info = tvInfo(state("media_player.tv", "off"));
    expect(info.on).toBe(false);
    expect(tvCaption(info)).toBe("");
  });
});
