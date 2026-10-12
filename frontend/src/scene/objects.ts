// Doors, windows and devices in 3D with live state from Home Assistant.
// Every object provides tappable meshes (userData.entityId) and an update()
// function; step() moves doors/windows smoothly into their target state and
// animate() drives ambient effects (heat shimmer, air flow, pulses).
import {
  AdditiveBlending,
  Box3,
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  type Material,
  type BufferGeometry,
  type Object3D,
} from "three";

import { nearestWall, pointInPolygon, RADIATOR_DEPTH, WALL_MOUNT_DIST } from "../editor/geometry";
import { itemKind, radiatorWidth, isTowelRadiator, type Item, type Opening, type PlanData, type Point, type Room } from "../model";
import { airFlow, heatShimmer, pulseRings, type Effect } from "./effects";
import { buildFurniture } from "./furniture";
import { TvScreen, tvInfo } from "./tv-screen";
import type { HassEntityState, HomeAssistant } from "../types";

const DOOR_TOP = 2.05;
const SILL = 0.9;
const WINDOW_TOP = 2.1;
const OPEN_ANGLE = (85 * Math.PI) / 180;
const IDLE_DOOR_ANGLE = (70 * Math.PI) / 180;
const TILT_ANGLE = (14 * Math.PI) / 180;

/** States that count as “device on”. */
const ON_STATES = new Set(["on", "playing", "paused", "idle", "buffering", "home", "open"]);

export interface SceneObject {
  root: Object3D;
  pickables: Object3D[];
  update(hass: HomeAssistant): void;
  /** true while a movement is still running. */
  step(dt: number): boolean;
  /** Ambient animation; true while it needs further frames. */
  animate?(time: number, dt: number, enabled: boolean): boolean;
  /** Mounted high on a wall (centre and normal, x/z): hidden when that wall is cut away. */
  mount?: { center: [number, number]; normal: [number, number] };
}

export interface ObjectSet {
  group: Group;
  /** Doors and windows (lowered together with “low walls”). */
  openings: Group;
  /** Doors and windows with their wall centre and normal (x, z) for the cutaway. */
  cutaway: { root: Object3D; center: [number, number]; normal: [number, number] }[];
  /** Every placed object with its plan position (`edge`: sits on a wall). */
  placed: { root: Object3D; at: Point; edge: boolean; mount?: SceneObject["mount"] }[];
  objects: SceneObject[];
  pickables: Object3D[];
  dispose(): void;
}

// ------------------------------------------------------------ Helpers

const HIT_MATERIAL = new MeshBasicMaterial();

class Bin {
  items: { dispose(): void }[] = [];
  add<T extends BufferGeometry | Material>(x: T): T {
    this.items.push(x);
    return x;
  }
  effect(e: Effect): Effect {
    this.items.push(e);
    return e;
  }
  dispose() {
    this.items.forEach((i) => i.dispose());
  }
}

let glowTexture: CanvasTexture | undefined;
/** Soft light spot (radial gradient) for lamps. */
function glowMap(): CanvasTexture {
  if (glowTexture) return glowTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  glowTexture = new CanvasTexture(c);
  return glowTexture;
}

const isOpen = (s?: HassEntityState) => s?.state === "on";

/** rgb_color of a light, if it reports a valid one. */
export function lightRgb(s?: HassEntityState): [number, number, number] | undefined {
  const rgb = s?.attributes.rgb_color;
  if (!Array.isArray(rgb) || rgb.length < 3 || !rgb.every((v) => typeof v === "number" && v >= 0 && v <= 255)) return undefined;
  return [rgb[0], rgb[1], rgb[2]];
}
const unavailable = (s?: HassEntityState) => !s || s.state === "unavailable" || s.state === "unknown";

/** Moves an angle towards its target (smooth door/window motion). */
function approach(current: number, target: number, dt: number, speed = 3.2): number {
  const d = target - current;
  if (Math.abs(d) < 0.002) return target;
  return current + d * (1 - Math.exp(-dt * speed * 2));
}

const tag = (obj: Object3D, entityId: string | null) => {
  obj.traverse((o) => (o.userData.entityId = entityId));
};

// ------------------------------------------------------------ Doors

function buildDoor(o: Opening, rooms: Room[], plan: PlanData, bin: Bin): SceneObject {
  const t = plan.settings.wall_thickness;
  const top = Math.min(DOOR_TOP, plan.settings.wall_height - 0.05);
  const [ax, ay] = o.wall.a;
  const [bx, by] = o.wall.b;
  const w = Math.hypot(bx - ax, by - ay);
  const [hx, hy] = o.hinge === "left" ? [ax, ay] : [bx, by];
  const [ox, oy] = o.hinge === "left" ? [bx, by] : [ax, ay];
  const base = Math.atan2(-(oy - hy), ox - hx);

  const root = new Group();
  // Frame (two posts + lintel)
  const frameMat = bin.add(new MeshLambertMaterial({ color: 0xf1f3f6 }));
  const frame = new Group();
  for (const s of [0, w]) {
    const post = new Mesh(bin.add(new BoxGeometry(0.05, top, t + 0.03)), frameMat);
    post.position.set(s, top / 2, 0);
    frame.add(post);
  }
  const head = new Mesh(bin.add(new BoxGeometry(w + 0.05, 0.05, t + 0.03)), frameMat);
  head.position.set(w / 2, top, 0);
  frame.add(head);
  frame.position.set(hx, 0, hy);
  frame.rotation.y = base;
  root.add(frame);

  // Door leaf on its hinge
  const pivot = new Group();
  pivot.position.set(hx, 0, hy);
  pivot.rotation.y = base;
  const leafMat = bin.add(new MeshLambertMaterial({ color: o.exterior ? 0x8d7b68 : 0xc2ab8e }));
  const leafGeo = bin.add(new BoxGeometry(w - 0.04, top - 0.03, 0.04));
  leafGeo.translate((w - 0.04) / 2 + 0.02, (top - 0.03) / 2, 0);
  const leaf = new Mesh(leafGeo, leafMat);
  pivot.add(leaf);
  root.add(pivot);

  // Swing direction: into the first room
  const room = rooms.find((r) => r.id === o.room_ids[0]);
  let sign = 1;
  if (room) {
    // Check the leaf's midpoint at +90°
    const ang = base + Math.PI / 2;
    const mx = hx + Math.cos(ang) * (w / 2);
    const my = hy - Math.sin(ang) * (w / 2);
    sign = pointInPolygon([mx, my], room.points) ? 1 : -1;
  }

  let angle = o.entity_id ? 0 : IDLE_DOOR_ANGLE;
  let target = angle;
  pivot.rotation.y = base + sign * angle;
  tag(root, o.entity_id);

  return {
    root,
    pickables: o.entity_id ? [leaf, frame] : [],
    update(hass) {
      if (!o.entity_id) return;
      const s = hass.states[o.entity_id];
      const open = isOpen(s);
      target = open ? OPEN_ANGLE : 0;
      const warn = open && o.exterior;
      leafMat.color.set(unavailable(s) ? 0x6b6f75 : o.exterior ? 0x8d7b68 : 0xc2ab8e);
      leafMat.emissive.set(warn ? 0x8a1f1f : 0x000000);
    },
    step(dt) {
      if (angle === target) return false;
      angle = approach(angle, target, dt);
      pivot.rotation.y = base + sign * angle;
      return angle !== target;
    },
  };
}

// ------------------------------------------------------------ Windows

function buildWindow(o: Opening, rooms: Room[], plan: PlanData, bin: Bin): SceneObject {
  const t = plan.settings.wall_thickness;
  const H = plan.settings.wall_height;
  const sill = Math.min(SILL, H - 0.2);
  const top = Math.min(WINDOW_TOP, H - 0.05);
  const h = top - sill;
  const [ax, ay] = o.wall.a;
  const [bx, by] = o.wall.b;
  const w = Math.hypot(bx - ax, by - ay);
  const base = Math.atan2(-(by - ay), bx - ax);

  const root = new Group();
  root.position.set(ax, 0, ay);
  root.rotation.y = base;

  const frameMat = bin.add(new MeshLambertMaterial({ color: 0xf1f3f6 }));
  const bar = 0.05;
  const depth = t * 0.6;
  const addBar = (x: number, y: number, bw: number, bh: number) => {
    const m = new Mesh(bin.add(new BoxGeometry(bw, bh, depth)), frameMat);
    m.position.set(x, y, 0);
    root.add(m);
    return m;
  };
  addBar(w / 2, sill + bar / 2, w, bar);
  addBar(w / 2, top - bar / 2, w, bar);
  addBar(bar / 2, sill + h / 2, bar, h);
  addBar(w - bar / 2, sill + h / 2, bar, h);
  // Inner window sill
  const room = rooms.find((r) => r.id === o.room_ids[0]);
  let inward = 1;
  if (room) {
    const mx = ax + (bx - ax) / 2;
    const my = ay + (by - ay) / 2;
    const nx = -(by - ay) / (w || 1);
    const ny = (bx - ax) / (w || 1);
    inward = pointInPolygon([mx + nx * 0.2, my + ny * 0.2], room.points) ? 1 : -1;
  }
  const ledge = new Mesh(bin.add(new BoxGeometry(w + 0.1, 0.03, 0.2)), frameMat);
  ledge.position.set(w / 2, sill - 0.015, inward * (t / 2 + 0.06));
  root.add(ledge);

  // Sash (tilts inwards, hinged at the bottom)
  const sash = new Group();
  sash.position.set(0, sill + bar, 0);
  const glassMat = bin.add(
    new MeshBasicMaterial({ color: 0x8fd8f0, transparent: true, opacity: 0.32, side: DoubleSide, depthWrite: false }),
  );
  const glass = new Mesh(bin.add(new PlaneGeometry(w - bar * 2, h - bar * 2)), glassMat);
  glass.position.set(w / 2, (h - bar * 2) / 2, 0);
  glass.renderOrder = 2;
  sash.add(glass);
  const sashFrame = new Mesh(bin.add(new BoxGeometry(w - bar * 2, 0.03, 0.03)), frameMat);
  sashFrame.position.set(w / 2, h - bar * 2, 0);
  sash.add(sashFrame);
  if (w > 1.3) {
    const mullion = new Mesh(bin.add(new BoxGeometry(0.04, h - bar * 2, 0.04)), frameMat);
    mullion.position.set(w / 2, (h - bar * 2) / 2, 0);
    sash.add(mullion);
  }
  root.add(sash);
  const air = o.entity_id ? bin.effect(airFlow(w, sill + bar, h - bar * 2, inward)) : undefined;
  if (air) root.add(air.object);

  let angle = 0;
  let target = 0;
  tag(root, o.entity_id);

  return {
    root,
    pickables: o.entity_id ? [glass] : [],
    update(hass) {
      if (!o.entity_id) return;
      const s = hass.states[o.entity_id];
      const open = isOpen(s);
      target = open ? TILT_ANGLE : 0;
      air?.setActive(open);
      glassMat.color.set(open ? 0x3fb6f0 : unavailable(s) ? 0x7b8794 : 0x8fd8f0);
      glassMat.opacity = open ? 0.55 : 0.32;
    },
    step(dt) {
      if (angle === target) return false;
      angle = approach(angle, target, dt);
      sash.rotation.x = inward * angle;
      return angle !== target;
    },
    animate: air ? (time, dt, enabled) => air.animate(time, dt, enabled) : undefined,
  };
}

// ------------------------------------------------------------ Devices

function buildItem(
  item: Item,
  rooms: Room[],
  plan: PlanData,
  hass: HomeAssistant | undefined,
  bin: Bin,
  onChange: () => void,
): SceneObject {
  const kind = itemKind(item, hass?.states[item.entity_id]?.attributes.device_class);
  const t = plan.settings.wall_thickness;
  const root = new Group();
  const wall = nearestWall(rooms, item.pos);
  let mount: SceneObject["mount"];
  const againstWall = (depth: number, maxDist = WALL_MOUNT_DIST, high = false) => {
    if (item.rotation || !wall || wall.dist > maxDist) {
      root.position.set(item.pos[0], 0, item.pos[1]);
      root.rotation.y = (-item.rotation * Math.PI) / 180;
      return;
    }
    if (high) mount = { center: wall.foot, normal: [wall.nx, wall.ny] };
    const off = t / 2 + depth / 2 + 0.01;
    root.position.set(wall.foot[0] + wall.nx * off, 0, wall.foot[1] + wall.ny * off);
    root.rotation.y = wall.angle;
    // local +z axis should point into the room
    const fx = Math.sin(wall.angle);
    const fz = Math.cos(wall.angle);
    if (fx * wall.nx + fz * wall.ny < 0) root.rotation.y += Math.PI;
  };
  const lambert = (color: number) => bin.add(new MeshLambertMaterial({ color }));
  const pick: Object3D[] = [];
  let update: (hass: HomeAssistant) => void = () => undefined;
  let animate: SceneObject["animate"];

  switch (kind) {
    case "radiator": {
      const towel = isTowelRadiator(item);
      const w = radiatorWidth(item);
      const h = towel ? 1.1 : 0.55;
      const d = RADIATOR_DEPTH;
      againstWall(d);
      const mat = lambert(0xc9c2b8);
      const body = new Group();
      const fins = towel ? 9 : 10;
      for (let i = 0; i < fins; i++) {
        if (towel) {
          const bar = new Mesh(bin.add(new BoxGeometry(w, 0.035, d * 0.6)), mat);
          bar.position.set(0, (i + 0.5) * (h / fins), 0);
          body.add(bar);
        } else {
          const fin = new Mesh(bin.add(new BoxGeometry(w / fins - 0.012, h, d)), mat);
          fin.position.set(-w / 2 + (i + 0.5) * (w / fins), h / 2, 0);
          body.add(fin);
        }
      }
      if (towel) {
        for (const x of [-w / 2, w / 2]) {
          const rail = new Mesh(bin.add(new BoxGeometry(0.035, h, 0.035)), mat);
          rail.position.set(x, h / 2, 0);
          body.add(rail);
        }
      }
      body.position.y = towel ? item.height : Math.max(0.1, item.height - 0.05);
      root.add(body);
      pick.push(body);
      const shimmer = bin.effect(heatShimmer(w, body.position.y + h, towel ? 0.6 : 0.8, d / 2 + 0.06));
      root.add(shimmer.object);
      animate = (time, dt, enabled) => shimmer.animate(time, dt, enabled);
      update = (hass) => {
        const s = hass.states[item.entity_id];
        const action = s?.attributes.hvac_action;
        shimmer.setActive(action === "heating");
        if (unavailable(s)) mat.color.set(0x5d6168);
        else if (action === "heating") mat.color.set(0xff8a3d);
        else if (s?.state === "off") mat.color.set(0x9aa6b4);
        else mat.color.set(0xd8cfc3);
        mat.emissive.set(action === "heating" ? 0x9a3a00 : 0x000000);
      };
      break;
    }
    case "tv": {
      const w = 1.72;
      const h = 0.99;
      againstWall(0.06, 0.7, true);
      const frame = new Mesh(bin.add(new BoxGeometry(w, h, 0.05)), lambert(0x15171a));
      const y = Math.max(0.55, item.height) + h / 2 - 0.4;
      frame.position.set(0, y, 0);
      // Overlay: app, title and status drawn onto the screen while the TV is on
      const tv = new TvScreen(onChange);
      bin.items.push(tv);
      const screenMat = bin.add(new MeshBasicMaterial({ color: 0x050607 }));
      const screen = new Mesh(bin.add(new PlaneGeometry(w - 0.04, h - 0.04)), screenMat);
      screen.position.set(0, y, 0.027);
      root.add(frame, screen);
      pick.push(frame, screen);
      let playing = false;
      const dim = new Color(0.86, 0.86, 0.86);
      const white = new Color(1, 1, 1);
      update = (hass) => {
        const info = tvInfo(hass.states[item.entity_id]);
        playing = info.playing;
        if (info.on) {
          tv.draw(info);
          screenMat.map = tv.texture;
          screenMat.color.copy(white);
        } else {
          screenMat.map = null;
          screenMat.color.set(0x050607);
        }
        screenMat.needsUpdate = true;
      };
      // Playing: the picture flickers gently like moving images
      animate = (time, _dt, enabled) => {
        if (!playing || !enabled) {
          if (playing) screenMat.color.copy(white);
          return false;
        }
        const k = 0.5 + 0.5 * Math.sin(time * 1.9) * Math.sin(time * 0.71 + 1.3);
        screenMat.color.copy(dim).lerp(white, k);
        return true;
      };
      break;
    }
    case "light": {
      const backlight = item.entity_id.includes("backlight");
      const shadeMat = lambert(0xe9e4da);
      const glowMat = bin.add(
        new MeshBasicMaterial({ map: glowMap(), color: 0xffd27a, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false }),
      );
      if (backlight) {
        againstWall(0.02, 0.7, true);
        const halo = new Mesh(bin.add(new PlaneGeometry(2.6, 1.7)), glowMat);
        halo.position.set(0, Math.max(0.55, item.height) + 0.1, 0.005);
        root.add(halo);
        pick.push(halo);
      } else {
        root.position.set(item.pos[0], 0, item.pos[1]);
        const h = Math.max(0.3, item.height);
        if (h > 1) {
          const pole = new Mesh(bin.add(new CylinderGeometry(0.015, 0.015, h, 8)), lambert(0x30343a));
          pole.position.y = h / 2;
          const foot = new Mesh(bin.add(new CylinderGeometry(0.14, 0.14, 0.03, 16)), lambert(0x30343a));
          foot.position.y = 0.015;
          root.add(pole, foot);
          pick.push(pole);
        }
        const shade = new Mesh(bin.add(new CylinderGeometry(0.11, 0.18, 0.24, 20, 1, true)), shadeMat);
        shadeMat.side = DoubleSide;
        shade.position.y = h;
        const bulb = new Mesh(bin.add(new SphereGeometry(0.06, 12, 8)), shadeMat);
        bulb.position.y = h - 0.05;
        const pool = new Mesh(bin.add(new CircleGeometry(1.6, 32)), glowMat);
        pool.rotation.x = -Math.PI / 2;
        pool.position.y = 0.012;
        root.add(shade, bulb, pool);
        pick.push(shade, bulb);
      }
      update = (hass) => {
        const s = hass.states[item.entity_id];
        const on = s?.state === "on";
        // Real light colour (HA reports rgb_color for every colour mode, also colour temperature)
        const rgb = lightRgb(s);
        const color = rgb ? new Color().setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, SRGBColorSpace) : new Color(0xffd27a);
        const bright = typeof s?.attributes.brightness === "number" ? (s.attributes.brightness as number) / 255 : 1;
        glowMat.color.copy(color);
        glowMat.opacity = on ? 0.35 + 0.45 * bright : 0;
        shadeMat.emissive.copy(on ? color.clone().multiplyScalar(0.6) : new Color(0));
      };
      break;
    }
    case "vacuum": {
      root.position.set(item.pos[0], 0, item.pos[1]);
      const robot = new Mesh(bin.add(new CylinderGeometry(0.175, 0.175, 0.09, 24)), lambert(0xe8eaee));
      robot.position.y = 0.045;
      const ringMat = bin.add(new MeshBasicMaterial({ color: 0x52c98d }));
      const ring = new Mesh(bin.add(new CylinderGeometry(0.05, 0.05, 0.095, 16)), ringMat);
      ring.position.set(0, 0.05, 0.06);
      root.add(robot, ring);
      pick.push(robot, ring);
      // Cleaning: the robot drives small circles around its spot
      let cleaning = false;
      const [px, pz] = item.pos;
      animate = (time, _dt, enabled) => {
        if (!cleaning || !enabled) {
          root.position.set(px, 0, pz);
          return false;
        }
        const a = time * 0.55;
        root.position.set(px + Math.cos(a) * 0.35, 0, pz + Math.sin(a) * 0.35);
        root.rotation.y = -a;
        return true;
      };
      update = (hass) => {
        const s = hass.states[item.entity_id];
        const st = s?.state ?? "unavailable";
        cleaning = st === "cleaning";
        ringMat.color.set(st === "cleaning" || st === "returning" ? 0x63c6e8 : st === "error" ? 0xef6363 : unavailable(s) ? 0x5d6168 : 0x52c98d);
      };
      break;
    }
    case "speaker": {
      root.position.set(item.pos[0], 0, item.pos[1]);
      const body = new Mesh(bin.add(new CylinderGeometry(0.05, 0.05, 0.09, 20)), lambert(0x2b2f35));
      body.position.y = item.height + 0.045;
      const ringMat = bin.add(new MeshBasicMaterial({ color: 0x1b1d20 }));
      const ring = new Mesh(bin.add(new CylinderGeometry(0.052, 0.052, 0.012, 20)), ringMat);
      ring.position.y = item.height + 0.09;
      root.add(body, ring);
      pick.push(body, ring);
      const waves = bin.effect(pulseRings({ y: item.height + 0.06, from: 0.08, to: 0.85, color: 0x34c6f4, rings: 3, speed: 0.9, opacity: 0.6 }));
      root.add(waves.object);
      animate = (time, dt, enabled) => waves.animate(time, dt, enabled);
      update = (hass) => {
        const s = hass.states[item.entity_id];
        ringMat.color.set(s?.state === "playing" ? 0x34c6f4 : 0x1b1d20);
        waves.setActive(s?.state === "playing");
      };
      break;
    }
    case "sensor":
    case "motion":
    case "generic": {
      const tablet = item.entity_id.startsWith("media_player.");
      if (tablet) againstWall(0.02, 0.7, true);
      else root.position.set(item.pos[0], 0, item.pos[1]);
      const size: [number, number, number] = tablet ? [0.26, 0.17, 0.015] : kind === "motion" ? [0.1, 0.03, 0.1] : [0.14, 0.14, 0.06];
      const y = kind === "motion" ? plan.settings.wall_height - 0.02 : item.height + size[1] / 2;
      const body = new Mesh(bin.add(new BoxGeometry(...size)), lambert(tablet ? 0x15171a : 0xf3f4f6));
      body.position.y = y;
      const ledMat = bin.add(new MeshBasicMaterial({ color: 0x52c98d }));
      const led = new Mesh(
        tablet ? bin.add(new PlaneGeometry(size[0] - 0.02, size[1] - 0.02)) : bin.add(new SphereGeometry(0.018, 8, 6)),
        ledMat,
      );
      led.position.set(0, y + (tablet ? 0 : size[1] / 2), tablet ? 0.009 : 0);
      root.add(body, led);
      pick.push(body, led);
      const pulse = kind === "motion" ? bin.effect(pulseRings({ y: 0.02, from: 0.2, to: 1.7, color: 0xff9a4d, rings: 2, speed: 0.6 })) : undefined;
      if (pulse) {
        root.add(pulse.object);
        animate = (time, dt, enabled) => pulse.animate(time, dt, enabled);
      }
      update = (hass) => {
        const s = hass.states[item.entity_id];
        pulse?.setActive(s?.state === "on");
        if (unavailable(s)) return void ledMat.color.set(0x5d6168);
        if (tablet) return void ledMat.color.set(ON_STATES.has(s!.state) ? 0x2a5a8a : 0x050607);
        const v = Number(s!.state);
        const ppm = s!.attributes.unit_of_measurement === "ppm";
        if (ppm) ledMat.color.set(v > 1400 ? 0xef6363 : v > 1000 ? 0xf6cf68 : 0x52c98d);
        else if (kind === "motion") ledMat.color.set(s!.state === "on" ? 0xff9a4d : 0x52c98d);
        else ledMat.color.set(0x52c98d);
      };
      break;
    }
  }
  // Invisible, slightly larger hit box (easier to tap, also on touch screens)
  const pos = root.position.clone();
  const rot = root.rotation.y;
  root.position.set(0, 0, 0);
  root.rotation.y = 0;
  root.updateMatrixWorld(true);
  const box = new Box3().setFromObject(root);
  root.position.copy(pos);
  root.rotation.y = rot;
  if (!box.isEmpty()) {
    const size = box.getSize(new Vector3()).addScalar(0.16);
    const hit = new Mesh(bin.add(new BoxGeometry(size.x, size.y, size.z)), HIT_MATERIAL);
    hit.position.copy(box.getCenter(new Vector3()));
    hit.visible = false;
    root.add(hit);
    pick.push(hit);
  }
  tag(root, item.entity_id);
  return { root, pickables: pick, update, step: () => false, animate, mount };
}

// ------------------------------------------------------------ All objects

/** `onChange`: something changed outside a state update (e.g. a TV picture loaded). */
export function buildObjects(plan: PlanData, hass: HomeAssistant | undefined, onChange: () => void = () => undefined): ObjectSet {
  const bin = new Bin();
  const group = new Group();
  const openings = new Group();
  group.add(openings);
  const objects: SceneObject[] = [];
  const cutaway: ObjectSet["cutaway"] = [];
  const placed: ObjectSet["placed"] = [];
  for (const o of plan.openings) {
    const obj =
      o.type === "door" ? buildDoor(o, plan.rooms, plan, bin) : o.type === "window" ? buildWindow(o, plan.rooms, plan, bin) : undefined;
    if (!obj) continue;
    objects.push(obj);
    openings.add(obj.root);
    const [[ax, ay], [bx, by]] = [o.wall.a, o.wall.b];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    cutaway.push({ root: obj.root, center: [(ax + bx) / 2, (ay + by) / 2], normal: [-(by - ay) / len, (bx - ax) / len] });
    placed.push({ root: obj.root, at: [(ax + bx) / 2, (ay + by) / 2], edge: true });
  }
  for (const f of plan.furniture ?? []) {
    const root = buildFurniture(f, bin, plan.settings.wall_height);
    group.add(root);
    placed.push({ root, at: f.pos, edge: false });
  }
  for (const item of plan.items) {
    const obj = buildItem(item, plan.rooms, plan, hass, bin, onChange);
    objects.push(obj);
    group.add(obj.root);
    placed.push({ root: obj.root, at: item.pos, edge: false, mount: obj.mount });
  }
  return {
    group,
    openings,
    cutaway,
    placed,
    objects,
    pickables: objects.flatMap((o) => o.pickables),
    dispose: () => bin.dispose(),
  };
}
