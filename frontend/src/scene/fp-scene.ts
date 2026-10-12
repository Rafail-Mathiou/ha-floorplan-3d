// <fp-scene>: the 3D view (three.js) with rooms, walls, room colours and labels.
// Renders on demand only (camera moved, state changed, transition running).
// Walls towards the camera are cut away; tapping a room zooms in or shows only that
// room (plan setting `room_tap`), tapping beside the plan returns to the overview.
// Without WebGL 2 it falls back to the 2D live map.
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import {
  DirectionalLight,
  HemisphereLight,
  PerspectiveCamera,
  Raycaster,
  SRGBColorSpace,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { labelPoint, nearestWall, pointInPolygon, projectOnSegment, WALL_MOUNT_DIST } from "../editor/geometry";
import { reading } from "../ha";
import { num, t } from "../i18n";
import { icons } from "../icons";
import { itemKind, keepsWall, planThresholds, type ColorMode, type PlanData, type Point, type Room } from "../model";
import type { HomeAssistant } from "../types";
import { buildPlan, type BuiltPlan } from "./builder";
import { FLOOR, mix, type RGB } from "./colors";
import { LEGEND_GRADIENT, legendRows, roomColor, VIEW_MODES } from "./room-color";
import { cutFactor, cutUniforms, setIsolation, updateCut } from "./cutaway";
import { roomLabelStyles } from "./label-styles";
import "./live-map";
import "./room-info";
import { buildObjects, type ObjectSet } from "./objects";
import { ROOM_ICONS, roomFlags, type RoomFlag } from "./room-status";
import { loadPref, LONG_PRESS_MS, savePref, toggleDomain } from "./prefs";

type Preset = "oblique" | "top";

interface RoomView {
  room: Room;
  label: CSS2DObject;
  el: { root: HTMLDivElement; temp: HTMLSpanElement; hum: HTMLSpanElement; icons: HTMLSpanElement };
  flags: string;
  color: RGB;
  target: RGB;
}

interface Tween {
  start: number;
  duration: number;
  fromPos: Vector3;
  toPos: Vector3;
  fromTarget: Vector3;
  toTarget: Vector3;
}

const MAX_PIXEL_RATIO = 1.5;
/** Two taps within this time (ms) and distance (px) count as a double-tap. */
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_PX = 24;
/** Frame interval for ambient animations; slower when rendering is expensive. */
const AMBIENT_MS = 1000 / 30;
const AMBIENT_SLOW_MS = 1000 / 12;
const SLOW_RENDER_MS = 18;
const COLOR_MODE_KEY = "floorplan-3d.colorMode";

/** Per-device colour mode; undefined = the plan's default. */
function loadColorMode(): ColorMode | undefined {
  try {
    const v = localStorage.getItem(COLOR_MODE_KEY) as ColorMode | null;
    return v && VIEW_MODES.includes(v) ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Off by default when the system asks for reduced motion. */
const loadAnimations = () => loadPref("animations", !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

const de = (v: number, digits = 1) => num(v, digits);

/** three.js needs WebGL 2; older tablets and WebViews often lack it. */
function supportsWebGL2(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export class FpScene extends LitElement {
  static override properties = {
    hass: { attribute: false },
    plan: { attribute: false },
    forceMap: { type: Boolean },
    hideControls: { type: Boolean },
    _preset: { state: true },
    _lowWalls: { state: true },
    _legend: { state: true },
    _fallback: { state: true },
    _hint: { state: true },
    _animations: { state: true },
    _isolated: { state: true },
    _focused: { state: true },
    _colorMode: { state: true },
    _autoCut: { state: true },
    _tapToggle: { state: true },
  };

  declare hass?: HomeAssistant;
  declare plan: PlanData;
  /** Always show the 2D live map (Lovelace card option). */
  declare forceMap: boolean;
  /** Hide the view buttons (Lovelace card option). */
  declare hideControls: boolean;
  declare private _preset: Preset;
  declare private _lowWalls: boolean;
  declare private _legend: boolean;
  /** 2D live map instead of 3D (no WebGL 2). */
  declare private _fallback: boolean;
  declare private _hint: boolean;
  declare private _animations: boolean;
  /** Lower the walls towards the camera automatically (per device). */
  declare private _autoCut: boolean;
  /** A tap on a lamp switches it instead of opening its dialog (per device, off by default). */
  declare private _tapToggle: boolean;
  /** Colour mode chosen on this device (undefined: plan setting). */
  declare private _colorMode?: ColorMode;
  /** Room shown alone ("show only this room"). */
  declare private _isolated?: string;

  private _renderer?: WebGLRenderer;
  private _labels?: CSS2DRenderer;
  private _scene = new Scene();
  private _camera = new PerspectiveCamera(40, 1, 0.1, 400);
  private _controls?: OrbitControls;
  private _built?: BuiltPlan;
  private _objects?: ObjectSet;
  private _down?: [number, number, number];
  private _lastTap?: { x: number; y: number; time: number };
  private _cut = cutUniforms();
  private _occlusionRay = new Raycaster();
  /** Room tapped last: the camera zoomed to it and its info card is open. */
  declare private _focused?: string;
  /** Object/label visibility needs to be recomputed (isolation changed). */
  private _visibilityDirty = true;
  private _rooms = new Map<string, RoomView>();
  private _frame?: number;
  private _last = 0;
  private _ambientTimer?: number;
  /** Moving average of the render time (ms) to throttle ambient animations. */
  private _renderCost = 0;
  /** Labels only need re-positioning when something other than effects changed. */
  private _labelsDirty = true;
  private _tween?: Tween;
  private _resize?: ResizeObserver;

  constructor() {
    super();
    this._preset = "oblique";
    this._lowWalls = false;
    this._legend = false;
    this._fallback = false;
    this._hint = true;
    this._animations = loadAnimations();
    this._autoCut = loadPref("autoCut", true);
    this._tapToggle = loadPref("tapToggle", false);
    this.forceMap = false;
    this.hideControls = false;
    this._colorMode = loadColorMode();
  }

  // ------------------------------------------------------------ Lifecycle

  protected override firstUpdated(): void {
    const host = this.renderRoot.querySelector(".viewport") as HTMLElement;
    if (this.forceMap || !supportsWebGL2()) {
      this._fallback = true;
      return;
    }
    try {
      this._renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      this._fallback = true;
      return;
    }
    const r = this._renderer;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    r.outputColorSpace = SRGBColorSpace;
    host.appendChild(r.domElement);

    this._labels = new CSS2DRenderer();
    this._labels.domElement.className = "labels";
    host.appendChild(this._labels.domElement);

    // The background comes from CSS (--fp-canvas); the canvas is transparent.
    r.setClearColor(0x000000, 0);
    this._scene.add(new HemisphereLight(0xf2f5ff, 0x30363f, 2.2));
    const sun = new DirectionalLight(0xffffff, 1.6);
    sun.position.set(-6, 14, 9);
    this._scene.add(sun);

    const controls = new OrbitControls(this._camera, this._labels.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minDistance = 2;
    controls.maxDistance = 80;
    controls.screenSpacePanning = true;
    controls.addEventListener("change", this._requestRender);
    controls.addEventListener("start", () => (this._tween = undefined));
    this._controls = controls;

    // Tapping devices/doors/windows opens more-info (only without dragging)
    const el = this._labels.domElement;
    el.addEventListener("pointerdown", (e) => (this._down = [e.clientX, e.clientY, e.timeStamp]));
    el.addEventListener("pointerup", (e) => {
      const d = this._down;
      this._down = undefined;
      if (!d || Math.hypot(e.clientX - d[0], e.clientY - d[1]) >= 6) return;
      const last = this._lastTap;
      if (last && e.timeStamp - last.time < DOUBLE_TAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < DOUBLE_TAP_PX) {
        this._lastTap = undefined;
        this._focusAt(e.clientX, e.clientY);
        return;
      }
      this._lastTap = { x: e.clientX, y: e.clientY, time: e.timeStamp };
      if (this._pick(e.clientX, e.clientY, e.timeStamp - d[2] >= LONG_PRESS_MS)) return;
      this._tapRoom(e.clientX, e.clientY);
    });

    this._resize = new ResizeObserver(() => this._onResize());
    this._resize.observe(host);
    this._onResize();
    this._rebuild();
    this._fit(this._preset, false);
  }

  protected override updated(changed: PropertyValues): void {
    // Phones: the room card takes the place of the legend
    this.toggleAttribute("info-open", !!(this._isolated ?? this._focused));
    if (!this._renderer) return;
    const previous = changed.get("plan") as PlanData | undefined;
    if (changed.has("plan") && previous !== undefined) {
      this._rebuild();
      // Another floor (or a new plan): show all of it
      const before = new Set(previous.rooms.map((r) => r.id));
      if (!this.plan.rooms.some((r) => before.has(r.id))) {
        this._isolate(undefined);
        this._fit(this._preset, false);
      }
    }
    if (changed.has("plan") || (changed.has("hass") && this._relevantChanged(changed.get("hass") as HomeAssistant | undefined))) {
      this._applyStates();
    }
    if (changed.has("_lowWalls")) this._applyWallHeight();
    if (changed.has("_animations") || changed.has("_autoCut")) this._requestRender();
    if (changed.has("_colorMode")) this._applyStates();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._frame) cancelAnimationFrame(this._frame);
    this._frame = undefined;
    window.clearTimeout(this._ambientTimer);
    this._ambientTimer = undefined;
    this._resize?.disconnect();
    this._controls?.dispose();
    this._clearPlan();
    this._renderer?.dispose();
    this._renderer?.forceContextLoss();
    this._renderer?.domElement.remove();
    this._labels?.domElement.remove();
    this._renderer = undefined;
  }

  // ------------------------------------------------------------ Building

  private _clearPlan(): void {
    if (this._built) {
      this._scene.remove(this._built.group);
      this._built.dispose();
      this._built = undefined;
    }
    if (this._objects) {
      this._scene.remove(this._objects.group);
      this._objects.dispose();
      this._objects = undefined;
    }
    for (const v of this._rooms.values()) v.label.removeFromParent();
    this._rooms.clear();
  }

  private _rebuild(): void {
    const previous = new Map([...this._rooms].map(([id, v]) => [id, v.color]));
    this._clearPlan();
    if (!this.plan) return;
    const built = buildPlan(this.plan, this._cut, this._keepPoints());
    this._cut.uStrength.value = -1; // force the openings to pick up the cut
    if (this._isolated && !this.plan.rooms.some((r) => r.id === this._isolated)) this._isolated = undefined;
    const iso = this.plan.rooms.find((r) => r.id === this._isolated);
    setIsolation(this._cut, iso?.points, this.plan.settings.wall_thickness / 2 + 0.02);
    this._visibilityDirty = true;
    this._built = built;
    this._scene.add(built.group);
    this._objects = buildObjects(this.plan, this.hass, this._requestRender);
    this._scene.add(this._objects.group);

    for (const room of this.plan.rooms) {
      const root = document.createElement("div");
      root.className = "room-label";
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = room.name || t().unnamed;
      const temp = document.createElement("span");
      temp.className = "temp";
      const hum = document.createElement("span");
      hum.className = "hum";
      const iconRow = document.createElement("span");
      iconRow.className = "icons";
      root.append(name, temp, hum, iconRow);
      // The camera controls would capture the pointer, so handle label clicks here
      root.addEventListener("pointerdown", (e) => {
        if (room.temp_entity ?? room.humidity_entity) e.stopPropagation();
      });
      root.addEventListener("click", () => this._moreInfo(room.temp_entity ?? room.humidity_entity));

      const label = new CSS2DObject(root);
      const [x, y] = labelPoint(room.points);
      label.position.set(x, 0.15, y);
      built.group.add(label);

      const color = previous.get(room.id) ?? FLOOR.none;
      this._rooms.set(room.id, { room, label, el: { root, temp, hum, icons: iconRow }, color, target: color, flags: "" });
      built.floors.get(room.id)?.material.color.setRGB(...color, SRGBColorSpace);
    }
    this._applyWallHeight();
    this._applyStates();
    this._requestRender();
  }

  /** Room colours and labels from the current states. */
  private _applyStates(): void {
    const hass = this.hass;
    if (!hass || !this.plan) return;
    const mode = this._mode;
    let changed = false;
    for (const v of this._rooms.values()) {
      const t = reading(hass, v.room.temp_entity);
      const h = reading(hass, v.room.humidity_entity);
      const target = roomColor(mode, hass, this.plan, v.room);
      if (target.some((c, i) => Math.abs(c - v.target[i]) > 1e-3)) {
        v.target = target;
        changed = true;
      }
      const tempText = t ? (t.available && t.value !== null ? `${de(t.value)}°` : "–") : "";
      const humText = h?.available && h.value !== null ? `${de(h.value, 0)} %` : "";
      if (v.el.temp.textContent !== tempText) v.el.temp.textContent = tempText;
      if (v.el.hum.textContent !== humText) v.el.hum.textContent = humText;
      v.el.root.classList.toggle("clickable", !!(v.room.temp_entity ?? v.room.humidity_entity));
      v.el.root.classList.toggle("unavailable", !!t && !t.available);

      const flags = roomFlags(hass, this.plan, v.room, t, h);
      const key = flags.map((f) => `${f.icon}:${f.level}`).join(",");
      if (key !== v.flags) {
        v.flags = key;
        this._renderIcons(v.el.icons, flags);
        v.el.root.classList.toggle("alert", flags.some((f) => f.level === "alert"));
      }
    }
    for (const obj of this._objects?.objects ?? []) obj.update(hass);
    if (changed || this._objects) this._requestRender();
  }

  private _applyWallHeight(): void {
    const scale = this._lowWalls ? 0.36 : 1;
    if (this._built?.walls) this._built.walls.scale.y = scale;
    if (this._objects) this._objects.openings.scale.y = scale;
    this._requestRender();
  }

  /** Only redraw when an entity used in the plan changed. */
  private _relevantChanged(old?: HomeAssistant): boolean {
    if (!old || !this.hass || !this.plan) return true;
    const ids = new Set<string>();
    for (const r of this.plan.rooms) {
      if (r.temp_entity) ids.add(r.temp_entity);
      if (r.humidity_entity) ids.add(r.humidity_entity);
    }
    for (const o of this.plan.openings) if (o.entity_id) ids.add(o.entity_id);
    for (const i of this.plan.items) ids.add(i.entity_id);
    for (const id of ids) if (old.states[id] !== this.hass.states[id]) return true;
    return false;
  }

  private _renderIcons(container: HTMLElement, flags: RoomFlag[]): void {
    container.replaceChildren(
      ...flags.map((f) => {
        const span = document.createElement("span");
        span.className = `icon ${f.level}`;
        span.title = f.text;
        span.innerHTML = ROOM_ICONS[f.icon]; // static SVG, no user data
        return span;
      }),
    );
  }

  private _ray(clientX: number, clientY: number): Raycaster {
    const rect = this._renderer!.domElement.getBoundingClientRect();
    const ndc = new Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new Raycaster();
    ray.setFromCamera(ndc, this._camera);
    return ray;
  }

  /**
   * A tapped device, door or window: opens its dialog, or switches a lamp when the user
   * chose that (holding always opens the dialog). False if nothing was hit.
   */
  private _pick(clientX: number, clientY: number, long = false): boolean {
    if (!this._objects || !this._renderer) return false;
    const hit = this._ray(clientX, clientY).intersectObjects(this._objects.pickables, true)[0];
    const entityId = hit?.object.userData.entityId as string | undefined;
    if (!entityId) return false;
    if (!long) this._tapItem(entityId);
    else this._moreInfo(entityId);
    return true;
  }

  private _tapItem = (entityId: string): void => {
    const domain = toggleDomain(entityId);
    const item = this.plan.items.find((i) => i.entity_id === entityId);
    const kind = item && itemKind(item, this.hass?.states[entityId]?.attributes.device_class);
    if (this._tapToggle && domain && kind === "light" && this.hass) {
      void this.hass.callService(domain, "toggle", { entity_id: entityId });
    } else {
      this._moreInfo(entityId);
    }
  };

  private _roomAt(clientX: number, clientY: number): Room | undefined {
    if (!this._built || !this._renderer) return undefined;
    const floors = [...this._built.floors.values()].filter((f) => f.visible);
    const hit = this._ray(clientX, clientY).intersectObjects(floors, false)[0];
    return this.plan.rooms.find((r) => r.id === hit?.object.userData.roomId);
  }

  /** Single tap: room action from the plan settings; beside the plan back to the overview. */
  private _tapRoom(clientX: number, clientY: number): void {
    const mode = this.plan?.settings.room_tap ?? "focus";
    if (mode === "none") return;
    const room = this._roomAt(clientX, clientY);
    if (!room) {
      if (this._isolated || this._focused) this._showAll();
      return;
    }
    if (mode === "isolate") this._isolate(room.id);
    this._focusRoom(room);
  }

  private _moreInfo(entityId: string | null): void {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }

  // ------------------------------------------------------------ Camera

  /** Double-tap: zoom to the room under the pointer, or back to the overview. */
  private _focusAt(clientX: number, clientY: number): void {
    const room = this._roomAt(clientX, clientY);
    if (room) this._focusRoom(room);
    else this._showAll();
  }

  /** Leaves a focused or isolated room. */
  private _showAll = (): void => {
    this._isolate(undefined);
    this._fit(this._preset);
  };

  private _isolate(roomId: string | undefined): void {
    if (this._isolated === roomId) return;
    this._isolated = roomId;
    const room = this.plan?.rooms.find((r) => r.id === roomId);
    setIsolation(this._cut, room?.points, (this.plan?.settings.wall_thickness ?? 0.12) / 2 + 0.02);
    this._visibilityDirty = true;
    this._requestRender();
  }

  private _focusRoom(room: Room): void {
    this._focused = room.id;
    const xs = room.points.map((p) => p[0]);
    const zs = room.points.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const d = Math.max(...zs) - Math.min(...zs);
    const [cx, cz] = labelPoint(room.points);
    const target = new Vector3(cx, 0, cz);
    // Keep the current viewing side, at the oblique angle
    const pos = this._camera.position;
    let hx = pos.x - this._controls!.target.x;
    let hz = pos.z - this._controls!.target.z;
    const flat = Math.hypot(hx, hz);
    if (flat < 0.05) [hx, hz] = [0.18, 0.78];
    else [hx, hz] = [(hx / flat) * 0.8, (hz / flat) * 0.8];
    const fov = (this._camera.fov * Math.PI) / 180;
    const span = Math.max(w / (this._camera.aspect || 1), d) * 0.5 + 0.8;
    const dist = Math.max(this._controls!.minDistance, (span / Math.tan(fov / 2)) * 1.25);
    this._camera.up.set(0, 1, 0);
    this._tween = {
      start: performance.now(),
      duration: 650,
      fromPos: pos.clone(),
      toPos: target.clone().add(new Vector3(hx, 1, hz).normalize().multiplyScalar(dist)),
      fromTarget: this._controls!.target.clone(),
      toTarget: target,
    };
    this._requestRender();
  }

  private _fit(preset: Preset, animate = true): void {
    this._preset = preset;
    this._focused = undefined;
    const box = this._built?.box;
    if (!box || box.isEmpty()) return;
    const center = box.getCenter(new Vector3());
    center.y = 0;
    const size = box.getSize(new Vector3());
    const aspect = this._camera.aspect || 1;
    const fov = (this._camera.fov * Math.PI) / 180;
    // Portrait screen + wide plan: look from the side so the long axis runs vertically
    const rotate = aspect < 0.9 && size.x > size.z;
    const sx = rotate ? size.z : size.x;
    const sz = rotate ? size.x : size.z;
    const span = Math.max(sx / aspect, sz) * 0.5 + 0.6;
    // Top view: the wall tops are closer to the camera than the floor
    const dist = (span / Math.tan(fov / 2)) * (preset === "top" ? 1.04 : 1.32) + (preset === "top" ? size.y : 0);
    let dir: Vector3;
    if (preset === "top") dir = rotate ? new Vector3(0.001, 1, 0) : new Vector3(0, 1, 0.001);
    else dir = rotate ? new Vector3(0.78, 1, -0.18) : new Vector3(0.18, 1, 0.78);
    if (preset === "top" && rotate) this._camera.up.set(-1, 0, 0);
    else this._camera.up.set(0, 1, 0);
    const pos = center.clone().add(dir.normalize().multiplyScalar(dist));
    if (!animate) {
      this._camera.position.copy(pos);
      this._controls!.target.copy(center);
      this._controls!.update();
      this._requestRender();
      return;
    }
    this._tween = {
      start: performance.now(),
      duration: 650,
      fromPos: this._camera.position.clone(),
      toPos: pos,
      fromTarget: this._controls!.target.clone(),
      toTarget: center,
    };
    this._requestRender();
  }

  private _onResize(): void {
    const host = this.renderRoot.querySelector(".viewport") as HTMLElement;
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h || !this._renderer) return;
    this._renderer.setSize(w, h);
    this._labels?.setSize(w, h);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
    this._requestRender();
  }

  // ------------------------------------------------------------ Render loop

  private _requestRender = () => {
    this._labelsDirty = true;
    this._requestFrame();
  };

  private _requestFrame(): void {
    if (this._frame === undefined && this._renderer) {
      this._frame = requestAnimationFrame(this._renderFrame);
    }
  }

  private _renderFrame = (now: number) => {
    this._frame = undefined;
    if (!this._renderer) return;
    const dt = Math.min(0.1, this._last ? (now - this._last) / 1000 : 0.016);
    this._last = now;
    let again = false;

    // Camera transition
    const tw = this._tween;
    if (tw) {
      const k = Math.min(1, (now - tw.start) / tw.duration);
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      this._camera.position.lerpVectors(tw.fromPos, tw.toPos, e);
      this._controls!.target.lerpVectors(tw.fromTarget, tw.toTarget, e);
      if (k >= 1) this._tween = undefined;
      else again = true;
    }

    // Animate doors/windows
    for (const obj of this._objects?.objects ?? []) {
      if (obj.step(dt)) again = true;
    }
    if (again) this._labelsDirty = true;

    // Ambient effects (heat shimmer, air, pulses) at a reduced frame rate
    let ambient = false;
    const time = now / 1000;
    for (const obj of this._objects?.objects ?? []) {
      if (obj.animate?.(time, dt, this._animations)) ambient = true;
    }

    // Smooth colour transition (≈ 1 s)
    const f = 1 - Math.exp(-dt / 0.25);
    for (const v of this._rooms.values()) {
      const d = Math.abs(v.color[0] - v.target[0]) + Math.abs(v.color[1] - v.target[1]) + Math.abs(v.color[2] - v.target[2]);
      if (d < 0.002) {
        if (d > 0) v.color = v.target;
      } else {
        v.color = mix(v.color, v.target, f);
        again = true;
      }
      this._built?.floors.get(v.room.id)?.material.color.setRGB(...v.color, SRGBColorSpace);
    }

    this._controls?.update(); // with damping this fires further "change" events
    this._applyCut();
    const start = performance.now();
    this._renderer.render(this._scene, this._camera);
    if (this._labelsDirty || again) {
      this._updateOcclusion();
      this._labels?.render(this._scene, this._camera);
      this._labelsDirty = false;
    }
    this._renderCost = this._renderCost * 0.9 + (performance.now() - start) * 0.1;

    if (again) this._requestRender();
    else if (ambient) this._scheduleAmbient(now);
    else this._last = 0;
  };

  /**
   * Hides room labels behind a wall that is actually drawn (not lowered by the
   * cutaway, not discarded by the isolation). Runs only when the camera moved.
   */
  private _updateOcclusion(): void {
    const walls = this._built?.walls;
    if (!walls || !this.plan) return;
    const geo = walls.geometry;
    const aWall = geo.getAttribute("aWall");
    const aKeep = geo.getAttribute("aKeep");
    const top = this.plan.settings.wall_height * walls.scale.y;
    const iso = this.plan.rooms.find((r) => r.id === this._isolated)?.points;
    const tol = this.plan.settings.wall_thickness / 2 + 0.02;
    const onIsolated = (x: number, z: number) =>
      !iso || pointInPolygon([x, z], iso) || iso.some((a, i) => projectOnSegment([x, z], a, iso[(i + 1) % iso.length]).dist < tol);
    const cam = this._camera.position;
    const ray = this._occlusionRay;
    for (const v of this._rooms.values()) {
      if (!v.label.visible) continue;
      const target = v.label.position;
      const dir = target.clone().sub(cam);
      const dist = dir.length();
      ray.set(cam, dir.normalize());
      // Ignore walls right next to the label (it sits on the floor of its own room)
      ray.far = Math.max(0, dist - 0.25);
      const hidden = ray.intersectObject(walls, false).some((h) => {
        const i = h.face?.a ?? 0;
        const keep = aKeep.getX(i) > 0.5;
        const f = keep ? 1 : cutFactor(this._cut, [aWall.getX(i), aWall.getY(i)], [aWall.getZ(i), aWall.getW(i)]);
        return h.point.y <= top * f + 0.01 && onIsolated(h.point.x, h.point.z);
      });
      v.el.root.classList.toggle("occluded", hidden);
    }
  }

  /** Wall points behind devices whose wall must stay up (e.g. the TV wall). */
  private _keepPoints(): Point[] {
    const pts: Point[] = [];
    for (const item of this.plan.items) {
      if (item.rotation) continue;
      if (!keepsWall(item, itemKind(item, this.hass?.states[item.entity_id]?.attributes.device_class))) continue;
      const wall = nearestWall(this.plan.rooms, item.pos);
      if (wall && wall.dist <= WALL_MOUNT_DIST) pts.push(wall.foot);
    }
    return pts;
  }

  /** True when a point lies on a wall piece that is never lowered. */
  private _onKeptWall(p: Point): boolean {
    return (this._built?.kept ?? []).some(([a, b]) => projectOnSegment(p, a, b).dist < 0.1);
  }

  /** Effective colour mode: this device's choice, else the plan setting. */
  private get _mode(): ColorMode {
    const m = this._colorMode ?? this.plan?.settings.color_mode ?? "temperature";
    return VIEW_MODES.includes(m) ? m : "temperature";
  }

  private _setColorMode(mode: ColorMode): void {
    this._colorMode = mode;
    try {
      localStorage.setItem(COLOR_MODE_KEY, mode);
    } catch {
      // ignore
    }
  }

  /** Lowers walls, doors and windows between the camera and its target. */
  private _applyCut(): void {
    if (!this._controls) return;
    const cutChanged = updateCut(this._cut, this._camera, this._controls.target, this._autoCut && !this._lowWalls);
    if (!cutChanged && !this._visibilityDirty) return;
    this._visibilityDirty = false;
    for (const c of this._objects?.cutaway ?? []) {
      c.root.scale.y = this._onKeptWall(c.center) ? 1 : cutFactor(this._cut, c.center, c.normal);
    }

    // Isolation: only the room itself, its furniture, devices, doors and windows
    const room = this.plan?.rooms.find((r) => r.id === this._isolated);
    const inRoom = (at: [number, number], edge: boolean): boolean => {
      if (!room) return true;
      if (!edge && pointInPolygon(at, room.points)) return true;
      const pts = room.points;
      const tol = edge ? 0.15 : 0.3;
      return pts.some((a, i) => projectOnSegment(at, a, pts[(i + 1) % pts.length]).dist < tol);
    };
    for (const p of this._objects?.placed ?? []) {
      const mounted = !p.mount || this._onKeptWall(p.mount.center) || cutFactor(this._cut, p.mount.center, p.mount.normal) > 0.75;
      p.root.visible = mounted && inRoom(p.at, p.edge);
    }
    for (const v of this._rooms.values()) {
      const show = !room || v.room.id === room.id;
      v.label.visible = show;
      const floor = this._built?.floors.get(v.room.id);
      if (floor) floor.visible = show;
    }
    this._labelsDirty = true;
  }

  /** Next ambient frame after a pause, so effects never run at full frame rate. */
  private _scheduleAmbient(frameStart: number): void {
    if (this._ambientTimer !== undefined) return;
    const interval = this._renderCost > SLOW_RENDER_MS ? AMBIENT_SLOW_MS : AMBIENT_MS;
    const wait = Math.max(0, interval - (performance.now() - frameStart));
    this._ambientTimer = window.setTimeout(() => {
      this._ambientTimer = undefined;
      this._requestFrame();
    }, wait);
  }

  private _toggleAnimations(): void {
    this._animations = !this._animations;
    savePref("animations", this._animations);
  }

  private _toggleAutoCut(): void {
    this._autoCut = !this._autoCut;
    savePref("autoCut", this._autoCut);
  }

  // ------------------------------------------------------------ Rendering

  protected override render() {
    const s = this.plan?.settings.temp_scale;
    const empty = this.plan && !this.plan.rooms.length;
    const str = t();
    return html`
      <div class="viewport">
        ${this._fallback && this.plan
          ? html`<fp-live-map
              .hass=${this.hass}
              .plan=${this.plan}
              .animations=${this._animations}
              .colorMode=${this._mode}
              .selected=${this._focused}
              .tapItem=${this._tapItem}
              @room-tap=${(e: CustomEvent<{ id: string | null }>) => (this._focused = e.detail.id ?? undefined)}
            ></fp-live-map>`
          : nothing}
      </div>
      ${empty ? html`<div class="message">${str.emptyPlan}</div>` : nothing}
      <div class="top-left">
        <slot name="floors"></slot>
        ${this._renderRoomInfo()}
      </div>
      ${this._fallback && this._hint && !empty && !this.forceMap
        ? html`<div class="hint" role="status">
            <span>${str.noWebgl}</span>
            <button aria-label=${str.dismiss} @click=${() => (this._hint = false)}>${icons.close}</button>
          </div>`
        : nothing}
      ${this.hideControls
        ? nothing
        : this._fallback
        ? html`<nav class="controls" aria-label=${str.viewControls}>${this._animationsButton()}</nav>`
        : html`<nav class="controls" aria-label=${str.viewControls}>
            <button class=${this._preset === "oblique" ? "active" : ""} @click=${() => this._fit("oblique")}>
              ${icons.cube}<span>${str.angled}</span>
            </button>
            <button class=${this._preset === "top" ? "active" : ""} @click=${() => this._fit("top")}>
              ${icons.plan}<span>${str.top}</span>
            </button>
            <span class="sep"></span>
            <button
              class=${this._lowWalls ? "active" : ""}
              aria-pressed=${this._lowWalls}
              title=${str.lowWallsTitle}
              @click=${() => (this._lowWalls = !this._lowWalls)}
            >
              ${icons.walls}<span>${str.lowWalls}</span>
            </button>
            <button
              class=${this._autoCut ? "active" : ""}
              aria-pressed=${this._autoCut}
              title=${str.autoWallsTitle}
              @click=${this._toggleAutoCut}
            >
              ${icons.cutaway}<span>${str.autoWalls}</span>
            </button>
            ${this._animationsButton()}
          </nav>`}
      ${s
        ? html`<button class="legend" aria-expanded=${this._legend} @click=${() => (this._legend = !this._legend)}>
            ${this._mode === "temperature"
              ? html`<span>${de(s.cold, 0)}°</span><i style="background: ${LEGEND_GRADIENT.temperature}"></i><span>${de(s.hot, 0)}°</span>`
              : html`<span>${str.colorModes[this._mode]}</span><i style="background: ${LEGEND_GRADIENT[this._mode]}"></i>`}
            <span class="more">${this._legend ? str.close : str.legendOpen}</span>
          </button>`
        : nothing}
      ${s && this._legend ? this._renderLegend() : nothing}
    `;
  }

  /** Info card of the tapped room (with "show whole home" while it is shown alone). */
  private _renderRoomInfo() {
    const room = this.plan?.rooms.find((r) => r.id === (this._isolated ?? this._focused));
    if (!room) return nothing;
    return html`<fp-room-info
      .hass=${this.hass}
      .plan=${this.plan}
      .room=${room}
      .isolated=${!!this._isolated}
      @close=${this._showAll}
      @show-all=${this._showAll}
    ></fp-room-info>`;
  }

  private _animationsButton() {
    const str = t();
    return html`<button
      class=${this._animations ? "active" : ""}
      aria-pressed=${this._animations}
      title=${str.animationsTitle}
      @click=${this._toggleAnimations}
    >
      ${icons.sparkle}<span>${str.animations}</span>
    </button>`;
  }

  private _renderLegend() {
    const s = this.plan.settings.temp_scale;
    const th = planThresholds(this.plan);
    const swatch = (c: RGB) => `background: rgb(${c.map((v) => Math.round(v * 255)).join(",")})`;
    const str = t();
    const rows = legendRows(this._mode, this.plan).map((r): [string, string, string] => [swatch(r.color), r.name, r.text]);
    const symbols: [keyof typeof ROOM_ICONS, string, string][] = [
      ["snow", "", str.symCold(de(s.ok_low))],
      ["hot", "warn", str.symHot(de(s.ok_high))],
      ["drop", "", str.symHumid(th.humidity, th.humidity_alert)],
      ["wind", "warn", str.symCo2(th.co2, th.co2_alert)],
      ["flame", "warn", str.symHeating],
      ["window", "", str.symWindow],
      ["door", "alert", str.symDoor],
    ];
    return html`<aside class="legend-card" aria-label=${str.legend}>
      <h3>${str.legendColors}</h3>
      <div class="modes" role="radiogroup" aria-label=${str.legendColors}>
        ${VIEW_MODES.map(
          (m) => html`<button role="radio" aria-checked=${m === this._mode} class=${m === this._mode ? "active" : ""} @click=${() => this._setColorMode(m)}>
            ${str.colorModes[m]}
          </button>`,
        )}
      </div>
      <ul>
        ${rows.map(([style, name, text]) => html`<li><i style=${style}></i><b>${name}</b><span>${text}</span></li>`)}
      </ul>
      <h3>${str.legendSymbols}</h3>
      <ul>
        ${symbols.map(
          ([icon, level, text]) =>
            html`<li><span class="icon ${level}" .innerHTML=${ROOM_ICONS[icon]}></span><span>${text}</span></li>`,
        )}
      </ul>
      <h3>${str.legendDevices}</h3>
      <p>${str.legendDevicesText}</p>
      <h3>${str.thisDevice}</h3>
      <label class="check">
        <input
          type="checkbox"
          .checked=${this._tapToggle}
          @change=${(e: Event) => {
            this._tapToggle = (e.target as HTMLInputElement).checked;
            savePref("tapToggle", this._tapToggle);
          }}
        />
        <span>${str.tapToggle}</span>
      </label>
    </aside>`;
  }

  static override styles = [
    roomLabelStyles,
    css`
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      background: var(--fp-canvas);
    }
    .viewport {
      position: absolute;
      inset: 0;
      /* CSS2D labels set their own z-index; keep them below legend, chip and controls */
      isolation: isolate;
    }
    .viewport canvas {
      display: block;
    }
    .labels {
      position: absolute;
      inset: 0;
      touch-action: none;
    }
    .controls {
      position: absolute;
      left: 50%;
      bottom: 16px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 5px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }
    .controls button {
      font: inherit;
      font-size: 13.5px;
      color: var(--fp-dim);
      background: none;
      border: none;
      border-radius: 10px;
      height: 38px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      white-space: nowrap;
    }
    .controls button:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .controls button.active {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .controls button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .controls .sep {
      width: 1px;
      height: 22px;
      background: var(--fp-line);
      margin: 0 4px;
    }

    .top-left {
      position: absolute;
      left: 16px;
      top: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      max-width: calc(100% - 32px);
    }
    fp-room-info {
      --fp-info-max-height: calc(100vh - 220px);
    }
    .legend {
      position: absolute;
      right: 16px;
      top: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      font: inherit;
      font-size: 12px;
      cursor: pointer;
      color: var(--fp-dim);
      background: color-mix(in srgb, var(--fp-surface) 80%, transparent);
      border: 1px solid var(--fp-line);
      border-radius: 10px;
      font-variant-numeric: tabular-nums;
    }
    .legend .more {
      color: var(--fp-fg);
      margin-left: 4px;
    }
    .legend-card {
      position: absolute;
      right: 16px;
      top: 58px;
      width: min(340px, calc(100% - 32px));
      max-height: calc(100% - 140px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 14px 16px 4px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      font-size: 13px;
      color: var(--fp-fg);
    }
    .legend-card h3 {
      margin: 0 0 8px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--fp-dim);
    }
    .legend-card ul {
      list-style: none;
      margin: 0 0 14px;
      padding: 0;
      display: grid;
      gap: 7px;
    }
    .legend-card li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.35;
    }
    .legend-card li > i {
      flex: none;
      width: 14px;
      height: 14px;
      border-radius: 4px;
      margin-top: 2px;
    }
    .legend-card li b {
      font-weight: 500;
      white-space: nowrap;
    }
    .legend-card li > span:last-child {
      color: var(--fp-dim);
    }
    .legend-card li .icon {
      flex: none;
    }
    .legend-card p {
      margin: 0 0 12px;
      color: var(--fp-dim);
      line-height: 1.45;
    }
    .legend-card .check {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      margin: 0 0 12px;
      line-height: 1.4;
      color: var(--fp-dim);
      cursor: pointer;
    }
    .legend-card .check input {
      flex: none;
      width: 16px;
      height: 16px;
      margin: 1px 0 0;
      accent-color: var(--fp-accent);
    }
    .legend-card .modes {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 0 0 10px;
    }
    .legend-card .modes button {
      padding: 5px 10px;
      font: inherit;
      font-size: 12px;
      color: var(--fp-dim);
      background: transparent;
      border: 1px solid var(--fp-line);
      border-radius: 999px;
      cursor: pointer;
    }
    .legend-card .modes button.active {
      color: var(--fp-fg);
      border-color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 18%, transparent);
    }
    .legend i {
      width: 96px;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(90deg, #3f9fd8, #63c6e8 20%, #52c98d 40%, #52c98d 60%, #e9c45c 72%, #ff9a4d 86%, #ef6363);
    }

    .message {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      text-align: center;
      color: var(--fp-dim);
      pointer-events: none;
    }

    .hint {
      position: absolute;
      left: 16px;
      bottom: 16px;
      max-width: min(420px, calc(100% - 32px));
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 8px 8px 14px;
      font-size: 13px;
      line-height: 1.4;
      color: var(--fp-dim);
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 12px;
    }
    .hint button {
      flex: none;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 8px;
      background: none;
      color: var(--fp-dim);
      cursor: pointer;
    }

    @media (max-width: 760px) {
      .hint {
        bottom: 72px;
      }
      .controls span:not(.sep) {
        display: none;
      }
      .controls button {
        padding: 0 11px;
      }
      .legend {
        right: 10px;
        top: 10px;
      }
      .top-left {
        left: 10px;
        top: 10px;
        right: 10px;
        max-width: none;
      }
      fp-room-info {
        width: 100%;
        --fp-info-max-height: 46vh;
      }
      :host([info-open]) .legend,
      :host([info-open]) .legend-card {
        display: none;
      }
    }
  `,
  ];
}

if (!customElements.get("fp-scene")) {
  customElements.define("fp-scene", FpScene);
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-scene": FpScene;
  }
}
