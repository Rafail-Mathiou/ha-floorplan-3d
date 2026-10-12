// <fp-plan-editor>: 2D drawing surface (SVG) with rooms, devices, doors, windows, furniture,
// grid, pan/zoom, tools, snapping and a library with drag & drop.
import { LitElement, css, html, nothing, svg, type PropertyValues } from "lit";

import { DEVICES, entryLabel, FURNITURE, FURNITURE_CATEGORIES, furnitureEntry, OPENINGS, suggestEntity, type CatalogEntry } from "../catalog";
import { num, parseNum, t } from "../i18n";
import { icons } from "../icons";
import {
  itemKind,
  newId,
  newRoom,
  radiatorWidth,
  polygonArea,
  signedArea,
  totalArea,
  type Furniture,
  type FurnitureCategory,
  type Item,
  type Opening,
  type PlanData,
  type Point,
  type Room,
} from "../model";
import {
  bbox,
  dedupe,
  pointInPolygon,
  edgeLength,
  isAxisRect,
  labelPoint,
  mm,
  moveEdge,
  nearestWall,
  RADIATOR_DEPTH,
  WALL_MOUNT_DIST,
  projectOnSegment,
  rectPoints,
  roomsBox,
  snapContext,
  snapOffset,
  snapPoint,
  snapToWalls,
  translate,
  type SnapContext,
} from "./geometry";
import { furnitureBody, furnitureGlyph, ITEM_GLYPHS } from "./glyphs";
import { disposePreview, renderPreview } from "./preview3d";
import type { HomeAssistant } from "../types";

export type Tool = "select" | "room" | "points" | "pan";

interface View {
  /** World coordinate (m) at the top left corner. */
  x: number;
  y: number;
  /** Pixels per metre. */
  scale: number;
}

type Drag =
  | { kind: "pan"; sx: number; sy: number; view: View }
  | { kind: "draw"; start: Point; current: Point }
  | { kind: "move"; roomId: string; start: Point; orig: Point[]; moved: boolean }
  | { kind: "corner"; roomId: string; index: number; orig: Point[] }
  | { kind: "vertex"; roomId: string; index: number; orig: Point[]; changed: boolean }
  | { kind: "edge"; roomId: string; index: number; start: Point; orig: Point[] }
  | { kind: "move-item"; id: string; start: Point; orig: Point; moved: boolean }
  | { kind: "move-furniture"; id: string; start: Point; orig: Point; moved: boolean }
  | { kind: "rotate-furniture"; id: string; center: Point }
  | { kind: "move-opening"; id: string; start: Point; orig: { a: Point; b: Point }; seg: [Point, Point]; moved: boolean }
  | { kind: "opening-end"; id: string; end: "a" | "b"; orig: { a: Point; b: Point }; seg: [Point, Point] };

/** Wall segment under a point (nearest room edge). */
interface WallHit {
  a: Point;
  b: Point;
  t: number;
  point: Point;
  dist: number;
}

interface Pinch {
  dist: number;
  mid: [number, number];
  view: View;
}

const MIN_SCALE = 8;
const MAX_SCALE = 500;
const SNAP_PX = 10;

const de = (v: number, digits = 2) => num(v, digits);

const TOOLS: { tool: Tool; label: () => string; key: string }[] = [
  { tool: "select", label: () => t().toolSelect, key: "V" },
  { tool: "room", label: () => t().toolRoom, key: "R" },
  { tool: "points", label: () => t().toolPoints, key: "P" },
  { tool: "pan", label: () => t().toolPan, key: "H" },
];

export class FpPlanEditor extends LitElement {
  static override properties = {
    hass: { attribute: false },
    plan: { attribute: false },
    selected: { attribute: false },
    tool: { attribute: false },
    _library: { state: true },
    _placing: { state: true },
    _ghost: { state: true },
    _draftPlan: { state: true },
    _notice: { state: true },
    _view: { state: true },
    _size: { state: true },
    _drag: { state: true },
    _draft: { state: true },
    _guides: { state: true },
    _cursor: { state: true },
    _snap: { state: true },
    _vertex: { state: true },
    _hover: { state: true },
    _libQuery: { state: true },
    _libCategory: { state: true },
    _libSelected: { state: true },
    _calib: { state: true },
  };

  declare hass?: HomeAssistant;
  declare plan: PlanData;
  declare selected: string | null;
  /** Library open. */
  declare private _library: boolean;
  /** Library entry being placed (drag or tap). */
  declare private _placing?: CatalogEntry;
  declare private _ghost?: Point;
  /** Plan while dragging devices, furniture or openings. */
  declare private _draftPlan?: PlanData;
  declare private _notice?: string;
  declare tool: Tool;

  declare private _view: View;
  declare private _size: { w: number; h: number };
  declare private _drag?: Drag;
  /** Rooms during a drag (not committed yet). */
  declare private _draft?: Room[];
  declare private _guides: { x?: number; y?: number };
  declare private _cursor?: Point;
  declare private _snap: boolean;
  /** Selected corner (corners tool). */
  declare private _vertex?: number;
  declare private _hover?: string;
  declare private _libQuery: string;
  declare private _libCategory: FurnitureCategory;
  /** Library entry shown in the preview (first tap). */
  declare private _libSelected?: CatalogEntry;
  /** false once the 3D preview turned out to be unavailable. */
  private _preview3d: boolean | undefined;
  /** Scale calibration of the background image: the points clicked so far. */
  declare private _calib?: Point[];

  private _fitted = false;
  private _placeDrag?: { sx: number; sy: number; moved: boolean };
  private _noticeTimer?: number;
  private _space = false;
  private _pointers = new Map<number, [number, number]>();
  private _pinch?: Pinch;
  private _resize = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    this._size = { w: width, h: height };
  });

  constructor() {
    super();
    this.selected = null;
    this.tool = "select";
    this._view = { x: -1, y: -1, scale: 60 };
    this._size = { w: 0, h: 0 };
    this._guides = {};
    this._snap = true;
    this._library = false;
    this._libQuery = "";
    this._libCategory = "living";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keyup", this._onKeyUp);
    window.addEventListener("blur", this._onBlur);
  }

  override disconnectedCallback(): void {
    window.removeEventListener("keyup", this._onKeyUp);
    window.removeEventListener("blur", this._onBlur);
    this._resize.disconnect();
    disposePreview();
    super.disconnectedCallback();
  }

  protected override firstUpdated(): void {
    this._resize.observe(this.renderRoot.querySelector(".stage")!);
  }

  protected override updated(changed: PropertyValues): void {
    const entry = this._libSelected;
    if ((changed.has("_libSelected") || changed.has("_library")) && entry?.group === "furniture" && this._preview3d !== false) {
      const canvas = this.renderRoot.querySelector("canvas.preview3d") as HTMLCanvasElement | null;
      if (canvas && !renderPreview(canvas, entry.type, entry.size)) this._preview3d = false;
      if (this._preview3d === false) this.requestUpdate();
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (!this._fitted && this._size.w > 0 && this.plan) {
      this._fitted = true;
      this.fit();
    }
    if (changed.has("selected") || changed.has("tool")) {
      this._vertex = undefined;
    }
  }

  /** Fits the view so that all rooms are visible. */
  fit(): void {
    const { w, h } = this._size;
    if (!w || !h) return;
    if (!this.plan?.rooms.length && this.plan?.settings.background) return this.fitBackground();
    const box = roomsBox(this.plan?.rooms ?? []) ?? { minX: 0, minY: 0, maxX: 10, maxY: 8 };
    const pad = 72;
    const bw = Math.max(box.maxX - box.minX, 1);
    const bh = Math.max(box.maxY - box.minY, 1);
    const scale = clamp(Math.min((w - 2 * pad) / bw, (h - 2 * pad) / bh), MIN_SCALE, MAX_SCALE);
    this._view = {
      scale,
      x: (box.minX + box.maxX) / 2 - w / 2 / scale,
      y: (box.minY + box.maxY) / 2 - h / 2 / scale,
    };
  }

  /** Starts setting the scale of the background image with two clicked points. */
  calibrate(): void {
    if (!this.plan?.settings.background) return;
    this._calib = [];
    this._placing = undefined;
    this._library = false;
    this._select(null);
    (this.renderRoot.querySelector(".stage") as HTMLElement | null)?.focus({ preventScroll: true });
  }

  /** Scales the image around the first point so that the two points are `real` metres apart. */
  private _applyCalib(real: number): void {
    const bg = this.plan.settings.background;
    const [a, b] = this._calib ?? [];
    this._calib = undefined;
    if (!bg || !a || !b) return;
    const measured = edgeLength(a, b);
    if (measured < 1e-6) return;
    const f = clamp(real / measured, 0.1 / Math.min(bg.width, bg.height), 200 / Math.max(bg.width, bg.height));
    const background = {
      ...bg,
      x: mm(a[0] + (bg.x - a[0]) * f),
      y: mm(a[1] + (bg.y - a[1]) * f),
      width: mm(bg.width * f),
      height: mm(bg.height * f),
    };
    this._commitPlan({ ...this.plan, settings: { ...this.plan.settings, background } });
    this._say(t().calibDone);
    void this.updateComplete.then(() => this.fitBackground());
  }

  /** Fits the view to the background image (and the rooms). */
  fitBackground(): void {
    const bg = this.plan?.settings.background;
    const { w, h } = this._size;
    if (!bg || !w || !h) return;
    const rooms = roomsBox(this.plan.rooms);
    const box = {
      minX: Math.min(bg.x, rooms?.minX ?? Infinity),
      minY: Math.min(bg.y, rooms?.minY ?? Infinity),
      maxX: Math.max(bg.x + bg.width, rooms?.maxX ?? -Infinity),
      maxY: Math.max(bg.y + bg.height, rooms?.maxY ?? -Infinity),
    };
    const pad = 48;
    const scale = clamp(Math.min((w - 2 * pad) / (box.maxX - box.minX), (h - 2 * pad) / (box.maxY - box.minY)), MIN_SCALE, MAX_SCALE);
    this._view = { scale, x: (box.minX + box.maxX) / 2 - w / 2 / scale, y: (box.minY + box.maxY) / 2 - h / 2 / scale };
  }

  // ------------------------------------------------------------ Helpers

  private get _rooms(): Room[] {
    return this._draft ?? this.plan?.rooms ?? [];
  }

  private _toScreen([x, y]: Point): [number, number] {
    const v = this._view;
    return [(x - v.x) * v.scale, (y - v.y) * v.scale];
  }

  private _toWorld(sx: number, sy: number): Point {
    const v = this._view;
    return [sx / v.scale + v.x, sy / v.scale + v.y];
  }

  private _local(ev: PointerEvent | WheelEvent): [number, number] {
    const rect = (this.renderRoot.querySelector(".stage") as HTMLElement).getBoundingClientRect();
    return [ev.clientX - rect.left, ev.clientY - rect.top];
  }

  private _ctx(excludeRoom?: string, extra: Point[] = [], alt = false): SnapContext {
    const ctx = snapContext(this.plan.rooms, excludeRoom, this.plan.settings.grid, SNAP_PX / this._view.scale, this._snap && !alt);
    for (const [x, y] of extra) {
      ctx.xs.push(x);
      ctx.ys.push(y);
    }
    return ctx;
  }

  private _zoomAt(sx: number, sy: number, factor: number): void {
    const v = this._view;
    const scale = clamp(v.scale * factor, MIN_SCALE, MAX_SCALE);
    const [wx, wy] = this._toWorld(sx, sy);
    this._view = { scale, x: wx - sx / scale, y: wy - sy / scale };
  }

  private _emit(name: string, detail: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _commit(rooms: Room[]): void {
    this._emit("plan-change", { plan: { ...this.plan, rooms } });
  }

  private _commitPlan(plan: PlanData): void {
    this._emit("plan-change", { plan });
  }

  /** Plan including the change in progress (for rendering). */
  private get _shown(): PlanData {
    if (this._draftPlan) return this._draftPlan;
    return this._draft ? { ...this.plan, rooms: this._draft } : this.plan;
  }

  private _say(text: string): void {
    this._notice = text;
    window.clearTimeout(this._noticeTimer);
    this._noticeTimer = window.setTimeout(() => (this._notice = undefined), 3500);
  }

  private _roomAt(p: Point): Room | undefined {
    return this.plan.rooms.find((r) => pointInPolygon(p, r.points));
  }

  /** Nearest room edge to a point (for doors and windows). */
  private _wallAt(p: Point, maxDist: number): WallHit | undefined {
    let best: WallHit | undefined;
    for (const room of this.plan.rooms) {
      const pts = room.points;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const pr = projectOnSegment(p, a, b);
        if (pr.dist <= maxDist && (!best || pr.dist < best.dist)) best = { a, b, t: pr.t, point: pr.point, dist: pr.dist };
      }
    }
    return best;
  }

  /** Places an opening on a wall: centred at `center`, width limited to the edge. */
  private _openingOnWall(wall: WallHit, width: number, center: Point): { a: Point; b: Point } {
    const len = edgeLength(wall.a, wall.b);
    const w = Math.min(width, Math.max(0.3, len - 0.1));
    const ux = (wall.b[0] - wall.a[0]) / len;
    const uy = (wall.b[1] - wall.a[1]) / len;
    let t = (center[0] - wall.a[0]) * ux + (center[1] - wall.a[1]) * uy;
    if (this._snap) t = Math.round(t / this.plan.settings.grid) * this.plan.settings.grid;
    t = clamp(t, w / 2 + 0.05, len - w / 2 - 0.05);
    const a: Point = [mm(wall.a[0] + ux * (t - w / 2)), mm(wall.a[1] + uy * (t - w / 2))];
    const b: Point = [mm(wall.a[0] + ux * (t + w / 2)), mm(wall.a[1] + uy * (t + w / 2))];
    return { a, b };
  }

  /** Rooms whose outline contains the opening; the room at the drop point first. */
  private _openingRooms(a: Point, b: Point, near: Point): string[] {
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const ids = this.plan.rooms
      .filter((r) => r.points.some((p, i) => projectOnSegment(mid, p, r.points[(i + 1) % r.points.length]).dist < 0.03))
      .map((r) => r.id);
    const inside = this._roomAt(near)?.id;
    if (inside && ids.includes(inside)) ids.sort((x) => (x === inside ? -1 : 1));
    return ids.slice(0, 2);
  }

  /** Places a library entry at world point `p`. */
  private _place(entry: CatalogEntry, p: Point): void {
    const grid = this.plan.settings.grid;
    const snapped: Point = this._snap ? [Math.round(p[0] / grid) * grid, Math.round(p[1] / grid) * grid].map(mm) as Point : [mm(p[0]), mm(p[1])];
    if (entry.group === "device") {
      const room = this._roomAt(p);
      const entityId = suggestEntity(this.hass, this.plan, entry.kind, room?.area_id ?? null);
      if (!entityId) {
        this._say(t().noEntity(entryLabel(entry)));
        return;
      }
      const item: Item = {
        id: newId("i"),
        entity_id: entityId,
        kind: entry.kind,
        pos: snapped,
        rotation: 0,
        height: entry.height,
        room_id: room?.id ?? null,
        label: null,
      };
      this._commitPlan({ ...this.plan, items: [...this.plan.items, item] });
      this._select(item.id);
    } else if (entry.group === "opening") {
      const wall = this._wallAt(p, 0.8);
      if (!wall) {
        this._say(t().dropOnWall);
        return;
      }
      const { a, b } = this._openingOnWall(wall, entry.width, wall.point);
      const roomIds = this._openingRooms(a, b, p);
      const opening: Opening = {
        id: newId("o"),
        type: entry.type,
        room_ids: roomIds,
        wall: { a, b },
        entity_id: null,
        exterior: roomIds.length < 2,
        hinge: "left",
      };
      this._commitPlan({ ...this.plan, openings: [...this.plan.openings, opening] });
      this._select(opening.id);
    } else {
      const f: Furniture = { id: newId("f"), type: entry.type, pos: snapped, size: [...entry.size], rotation: 0, label: null };
      this._commitPlan({ ...this.plan, furniture: [...this.plan.furniture, f] });
      this._select(f.id);
    }
    this._setTool("select");
  }

  // ------------------------------------------------------------ Library (drag)

  private _startPlacing(entry: CatalogEntry, ev: PointerEvent): void {
    ev.preventDefault();
    this._placing = entry;
    this._placeDrag = { sx: ev.clientX, sy: ev.clientY, moved: false };
    window.addEventListener("pointermove", this._onPlaceMove);
    window.addEventListener("pointerup", this._onPlaceUp, { once: true });
    window.addEventListener("pointercancel", this._onPlaceUp, { once: true });
  }

  private _stageWorld(clientX: number, clientY: number): Point | undefined {
    const rect = (this.renderRoot.querySelector(".stage") as HTMLElement).getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return undefined;
    return this._toWorld(x, y);
  }

  private _onPlaceMove = (ev: PointerEvent) => {
    const d = this._placeDrag;
    if (!d) return;
    if (!d.moved && Math.hypot(ev.clientX - d.sx, ev.clientY - d.sy) > 6) {
      d.moved = true;
      if (window.matchMedia("(max-width: 760px)").matches) this._library = false;
    }
    if (d.moved) this._ghost = this._stageWorld(ev.clientX, ev.clientY);
  };

  private _onPlaceUp = (ev: PointerEvent) => {
    window.removeEventListener("pointermove", this._onPlaceMove);
    const d = this._placeDrag;
    this._placeDrag = undefined;
    const entry = this._placing;
    if (!d || !entry) return;
    if (!d.moved) {
      // First tap selects and shows the preview, a second tap arms the entry
      if (this._libSelected === entry) this._armPlacing(entry);
      else {
        this._placing = undefined;
        this._libSelected = entry;
      }
      return;
    }
    const p = this._stageWorld(ev.clientX, ev.clientY);
    this._placing = undefined;
    this._ghost = undefined;
    if (p) this._place(entry, p);
  };

  private _select(id: string | null): void {
    if (id !== this.selected) this._emit("select-room", { id });
  }

  private _setTool(tool: Tool): void {
    this._emit("tool-change", { tool });
  }

  private _replaceRoom(id: string, points: Point[]): Room[] {
    return this.plan.rooms.map((r) => (r.id === id ? { ...r, points } : r));
  }

  // ------------------------------------------------------------ Pointer

  private _onPointerDown(ev: PointerEvent): void {
    (this.renderRoot.querySelector(".stage") as HTMLElement).focus({ preventScroll: true });
    const local = this._local(ev);
    this._pointers.set(ev.pointerId, local);
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);

    if (this._pointers.size === 2) {
      // Second finger: cancel the current action and start pinch zoom.
      this._drag = undefined;
      this._draft = undefined;
      this._guides = {};
      const [a, b] = [...this._pointers.values()];
      this._pinch = { dist: Math.hypot(a[0] - b[0], a[1] - b[1]), mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], view: this._view };
      return;
    }
    if (this._pointers.size > 2) return;

    const [sx, sy] = local;
    const world = this._toWorld(sx, sy);
    const panRequested = ev.button === 1 || this.tool === "pan" || this._space;
    if (panRequested) {
      this._drag = { kind: "pan", sx, sy, view: this._view };
      return;
    }
    if (ev.button !== 0) return;

    if (this._calib) {
      if (this._calib.length < 2) this._calib = [...this._calib, world];
      if (this._calib.length === 2) {
        // After the click has focused the stage
        window.setTimeout(() => (this.renderRoot.querySelector(".calib input") as HTMLInputElement | null)?.focus(), 0);
      }
      return;
    }

    const target = (ev.target as Element).closest<SVGElement>("[data-hit]");
    const hit = target?.dataset.hit;
    const roomId = target?.dataset.room;
    const index = Number(target?.dataset.index ?? -1);
    const room = roomId ? this.plan.rooms.find((r) => r.id === roomId) : undefined;

    // Armed library entry: drop it here
    if (this._placing && !this._placeDrag) {
      const entry = this._placing;
      this._placing = undefined;
      this._ghost = undefined;
      this._notice = undefined;
      this._place(entry, world);
      return;
    }

    if (this.tool !== "room") {
      const id = target?.dataset.id;
      if (hit === "item" && id) {
        const item = this.plan.items.find((i) => i.id === id)!;
        this._select(id);
        this._drag = { kind: "move-item", id, start: world, orig: item.pos, moved: false };
        return;
      }
      if (hit === "furniture" && id) {
        const f = this.plan.furniture.find((x) => x.id === id)!;
        this._select(id);
        this._drag = { kind: "move-furniture", id, start: world, orig: f.pos, moved: false };
        return;
      }
      if (hit === "furniture-rotate" && id) {
        const f = this.plan.furniture.find((x) => x.id === id)!;
        this._drag = { kind: "rotate-furniture", id, center: f.pos };
        return;
      }
      if ((hit === "opening" || hit === "opening-end") && id) {
        const o = this.plan.openings.find((x) => x.id === id)!;
        const mid: Point = [(o.wall.a[0] + o.wall.b[0]) / 2, (o.wall.a[1] + o.wall.b[1]) / 2];
        const wall = this._wallAt(mid, 0.05);
        const seg: [Point, Point] = wall ? [wall.a, wall.b] : [o.wall.a, o.wall.b];
        this._select(id);
        this._drag =
          hit === "opening"
            ? { kind: "move-opening", id, start: world, orig: o.wall, seg, moved: false }
            : { kind: "opening-end", id, end: target!.dataset.end === "b" ? "b" : "a", orig: o.wall, seg };
        return;
      }
    }

    if (this.tool === "room") {
      const start = snapPoint(world, this._ctx(undefined, [], ev.altKey));
      this._drag = { kind: "draw", start: start.point, current: start.point };
      this._guides = { x: start.guideX, y: start.guideY };
      return;
    }

    if (room && hit === "vertex") {
      this._vertex = index;
      const rect = this.tool === "select" && isAxisRect(room.points);
      this._drag = rect
        ? { kind: "corner", roomId: room.id, index, orig: room.points }
        : { kind: "vertex", roomId: room.id, index, orig: room.points, changed: false };
      return;
    }
    if (room && hit === "edge") {
      this._drag = { kind: "edge", roomId: room.id, index, start: world, orig: room.points };
      return;
    }
    if (room && hit === "edge-insert") {
      const a = room.points[index];
      const b = room.points[(index + 1) % room.points.length];
      const snapped = snapPoint(world, this._ctx(room.id, room.points, ev.altKey)).point;
      const p = projectOnSegment(snapped, a, b).point;
      const points = [...room.points];
      points.splice(index + 1, 0, [mm(p[0]), mm(p[1])]);
      this._draft = this._replaceRoom(room.id, points);
      this._vertex = index + 1;
      this._drag = { kind: "vertex", roomId: room.id, index: index + 1, orig: points, changed: true };
      return;
    }
    if (room && hit === "room") {
      this._select(room.id);
      if (this.tool === "select") {
        this._drag = { kind: "move", roomId: room.id, start: world, orig: room.points, moved: false };
      }
      return;
    }
    // Empty space: clear the selection and pan.
    this._select(null);
    this._drag = { kind: "pan", sx, sy, view: this._view };
  }

  private _onPointerMove(ev: PointerEvent): void {
    const local = this._local(ev);
    if (this._pointers.has(ev.pointerId)) this._pointers.set(ev.pointerId, local);
    const [sx, sy] = local;
    const world = this._toWorld(sx, sy);
    this._cursor = world;

    if (this._pinch && this._pointers.size === 2) {
      const [a, b] = [...this._pointers.values()];
      const dist = Math.hypot(a[0] - b[0], a[1] - b[1]);
      const mid: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const p = this._pinch;
      const scale = clamp((p.view.scale * dist) / (p.dist || 1), MIN_SCALE, MAX_SCALE);
      const wx = p.mid[0] / p.view.scale + p.view.x;
      const wy = p.mid[1] / p.view.scale + p.view.y;
      this._view = { scale, x: wx - mid[0] / scale, y: wy - mid[1] / scale };
      return;
    }

    if (this._placing && !this._placeDrag) this._ghost = world;

    const drag = this._drag;
    if (!drag) return;
    const alt = ev.altKey;
    const grid = this.plan.settings.grid;
    const snapG = (v: number) => (this._snap && !alt ? mm(Math.round(v / grid) * grid) : mm(v));
    switch (drag.kind) {
      case "move-item":
      case "move-furniture": {
        const dx = world[0] - drag.start[0];
        const dy = world[1] - drag.start[1];
        if (!drag.moved && Math.hypot(dx, dy) * this._view.scale < 4) return;
        let pos: Point = [snapG(drag.orig[0] + dx), snapG(drag.orig[1] + dy)];
        this._drag = { ...drag, moved: true };
        if (drag.kind === "move-item" && this._snap && !alt) {
          // Radiators slide along the nearest wall
          const item = this.plan.items.find((i) => i.id === drag.id)!;
          const wall = this._isRadiator(item) && !item.rotation ? nearestWall(this.plan.rooms, pos) : undefined;
          if (wall && wall.dist <= WALL_MOUNT_DIST) {
            const off = this.plan.settings.wall_thickness / 2 + RADIATOR_DEPTH / 2 + 0.01;
            pos = [mm(wall.foot[0] + wall.nx * off), mm(wall.foot[1] + wall.ny * off)];
          }
        }
        if (drag.kind === "move-furniture") {
          // Furniture rests flush against nearby walls (not rugs; Alt or snapping off disables it)
          const f = this.plan.furniture.find((x) => x.id === drag.id)!;
          if (this._snap && !alt && !furnitureEntry(f.type).free) {
            const tolerance = Math.max(0.12, 14 / this._view.scale);
            pos = snapToWalls(pos, f.size, f.rotation, this.plan.rooms, this.plan.settings.wall_thickness, tolerance);
          }
        }
        this._draftPlan =
          drag.kind === "move-item"
            ? { ...this.plan, items: this.plan.items.map((i) => (i.id === drag.id ? { ...i, pos } : i)) }
            : { ...this.plan, furniture: this.plan.furniture.map((f) => (f.id === drag.id ? { ...f, pos } : f)) };
        return;
      }
      case "rotate-furniture": {
        let deg = (Math.atan2(world[1] - drag.center[1], world[0] - drag.center[0]) * 180) / Math.PI + 90;
        if (!alt) deg = Math.round(deg / 15) * 15;
        deg = ((deg % 360) + 360) % 360;
        if (deg > 180) deg -= 360;
        this._draftPlan = { ...this.plan, furniture: this.plan.furniture.map((f) => (f.id === drag.id ? { ...f, rotation: deg } : f)) };
        return;
      }
      case "move-opening":
      case "opening-end": {
        const [sa, sb] = drag.seg;
        const len = edgeLength(sa, sb) || 1;
        const ux = (sb[0] - sa[0]) / len;
        const uy = (sb[1] - sa[1]) / len;
        const tOf = (q: Point) => (q[0] - sa[0]) * ux + (q[1] - sa[1]) * uy;
        const at = (t: number): Point => [mm(sa[0] + ux * t), mm(sa[1] + uy * t)];
        let ta = tOf(drag.orig.a);
        let tb = tOf(drag.orig.b);
        if (drag.kind === "move-opening") {
          const d = tOf(world) - tOf(drag.start);
          if (!drag.moved && Math.abs(d) * this._view.scale < 4) return;
          this._drag = { ...drag, moved: true };
          const w = tb - ta;
          const lo = Math.min(ta, tb);
          let start = snapG(lo + d);
          start = clamp(start, 0.05, len - Math.abs(w) - 0.05);
          [ta, tb] = w >= 0 ? [start, start + w] : [start - w, start];
        } else {
          const t = clamp(snapG(tOf(world)), 0.05, len - 0.05);
          if (drag.end === "a") ta = Math.abs(tb - t) < 0.3 ? tb + Math.sign(t - tb || -1) * 0.3 : t;
          else tb = Math.abs(t - ta) < 0.3 ? ta + Math.sign(t - ta || 1) * 0.3 : t;
        }
        const wall = { a: at(ta), b: at(tb) };
        this._draftPlan = { ...this.plan, openings: this.plan.openings.map((o) => (o.id === drag.id ? { ...o, wall } : o)) };
        return;
      }
      case "pan": {
        const v = drag.view;
        this._view = { ...v, x: v.x - (sx - drag.sx) / v.scale, y: v.y - (sy - drag.sy) / v.scale };
        break;
      }
      case "draw": {
        const s = snapPoint(world, this._ctx(undefined, [], alt));
        this._drag = { ...drag, current: s.point };
        this._guides = { x: s.guideX, y: s.guideY };
        break;
      }
      case "move": {
        const dx = world[0] - drag.start[0];
        const dy = world[1] - drag.start[1];
        if (!drag.moved && Math.hypot(dx, dy) * this._view.scale < 4) return;
        const s = snapOffset(drag.orig, dx, dy, this._ctx(drag.roomId, [], alt));
        this._drag = { ...drag, moved: true };
        this._draft = this._replaceRoom(drag.roomId, translate(drag.orig, s.dx, s.dy));
        this._guides = { x: s.guideX, y: s.guideY };
        break;
      }
      case "corner": {
        const opposite = drag.orig[(drag.index + 2) % 4];
        const s = snapPoint(world, this._ctx(drag.roomId, [], alt));
        const min = this.plan.settings.grid;
        const p: Point = [
          Math.abs(s.point[0] - opposite[0]) < min ? opposite[0] + Math.sign(s.point[0] - opposite[0] || 1) * min : s.point[0],
          Math.abs(s.point[1] - opposite[1]) < min ? opposite[1] + Math.sign(s.point[1] - opposite[1] || 1) * min : s.point[1],
        ];
        this._draft = this._replaceRoom(drag.roomId, rectPoints(opposite, [mm(p[0]), mm(p[1])]));
        this._guides = { x: s.guideX, y: s.guideY };
        break;
      }
      case "vertex": {
        const others = drag.orig.filter((_, i) => i !== drag.index);
        const s = snapPoint(world, this._ctx(drag.roomId, others, alt));
        const points = drag.orig.map((p, i) => (i === drag.index ? s.point : p));
        this._drag = { ...drag, changed: true };
        this._draft = this._replaceRoom(drag.roomId, points);
        this._guides = { x: s.guideX, y: s.guideY };
        break;
      }
      case "edge": {
        const j = (drag.index + 1) % drag.orig.length;
        const others = drag.orig.filter((_, i) => i !== drag.index && i !== j);
        const s = moveEdge(drag.orig, drag.index, world, drag.start, this._ctx(drag.roomId, others, alt));
        this._draft = this._replaceRoom(drag.roomId, s.points);
        this._guides = { x: s.guideX, y: s.guideY };
        break;
      }
    }
  }

  private _onPointerUp(ev: PointerEvent): void {
    this._pointers.delete(ev.pointerId);
    if (this._pinch) {
      if (this._pointers.size < 2) this._pinch = undefined;
      return;
    }
    const drag = this._drag;
    this._drag = undefined;
    this._guides = {};
    if (!drag) return;

    if (drag.kind === "draw") {
      const points = rectPoints(drag.start, drag.current);
      const box = bbox(points);
      if (box.maxX - box.minX >= 0.3 && box.maxY - box.minY >= 0.3) {
        const room = newRoom(t().roomN(this.plan.rooms.length + 1), points);
        this._commit([...this.plan.rooms, room]);
        this._select(room.id);
        this._setTool("select");
      }
      return;
    }

    if (
      drag.kind === "move-item" ||
      drag.kind === "move-furniture" ||
      drag.kind === "rotate-furniture" ||
      drag.kind === "move-opening" ||
      drag.kind === "opening-end"
    ) {
      let plan = this._draftPlan;
      this._draftPlan = undefined;
      if (!plan) return;
      if (drag.kind === "move-item") {
        // Keep the device's room in sync
        plan = { ...plan, items: plan.items.map((i) => (i.id === drag.id ? { ...i, room_id: this._roomAt(i.pos)?.id ?? null } : i)) };
      }
      this._commitPlan(plan);
      return;
    }

    const draft = this._draft;
    this._draft = undefined;
    if (!draft || drag.kind === "pan") return;
    if (drag.kind === "move" && !drag.moved) return;
    // Remove duplicate points (e.g. a corner dragged onto its neighbour).
    const rooms = draft.map((r) => {
      if (r.id !== drag.roomId) return r;
      const points = dedupe(r.points);
      return points.length >= 3 ? { ...r, points } : this.plan.rooms.find((o) => o.id === r.id)!;
    });
    if (JSON.stringify(rooms) !== JSON.stringify(this.plan.rooms)) this._commit(rooms);
  }

  private _onWheel(ev: WheelEvent): void {
    ev.preventDefault();
    const [sx, sy] = this._local(ev);
    const delta = ev.deltaMode === 1 ? ev.deltaY * 16 : ev.deltaY;
    this._zoomAt(sx, sy, Math.exp(-delta * 0.0018));
  }

  // ------------------------------------------------------------ Keyboard

  private _onKeyDown(ev: KeyboardEvent): void {
    if (ev.ctrlKey || ev.metaKey) return; // Undo/save is handled by the panel.
    const key = ev.key.toLowerCase();
    const tools: Record<string, Tool> = { v: "select", r: "room", p: "points", h: "pan" };
    let handled = true;
    if (tools[key] && !ev.altKey) {
      this._setTool(tools[key]);
    } else if (key === " ") {
      this._space = true;
    } else if (key === "escape" && this._calib) {
      this._calib = undefined;
    } else if (key === "escape" && this._placing) {
      this._placing = undefined;
      this._ghost = undefined;
      this._notice = undefined;
    } else if (key === "b") {
      if (this._library) this._closeLibrary();
      else this._library = true;
    } else if (key === "escape") {
      if (this._drag) {
        this._drag = undefined;
        this._draft = undefined;
        this._guides = {};
      } else {
        this._select(null);
      }
    } else if (key === "delete" || key === "backspace") {
      this._deleteSelection();
    } else if (key.startsWith("arrow") && this.selected) {
      const step = this.plan.settings.grid * (ev.shiftKey ? 10 : 1);
      const d: Record<string, Point> = { arrowleft: [-step, 0], arrowright: [step, 0], arrowup: [0, -step], arrowdown: [0, step] };
      const room = this.plan.rooms.find((r) => r.id === this.selected);
      const off = d[key];
      if (room && off) this._commit(this._replaceRoom(room.id, translate(room.points, off[0], off[1])));
      const move = (p: Point): Point => [mm(p[0] + off[0]), mm(p[1] + off[1])];
      if (off && this.plan.items.some((i) => i.id === this.selected)) {
        this._commitPlan({ ...this.plan, items: this.plan.items.map((i) => (i.id === this.selected ? { ...i, pos: move(i.pos) } : i)) });
      }
      if (off && this.plan.furniture.some((f) => f.id === this.selected)) {
        this._commitPlan({ ...this.plan, furniture: this.plan.furniture.map((f) => (f.id === this.selected ? { ...f, pos: move(f.pos) } : f)) });
      }
    } else {
      handled = false;
    }
    if (handled) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _onKeyUp = (ev: KeyboardEvent) => {
    if (ev.key === " ") this._space = false;
  };

  private _onBlur = () => {
    this._space = false;
  };

  private _deleteSelection(): void {
    const id = this.selected;
    if (id && this.plan.items.some((i) => i.id === id)) {
      this._commitPlan({ ...this.plan, items: this.plan.items.filter((i) => i.id !== id) });
      this._select(null);
      return;
    }
    if (id && this.plan.openings.some((o) => o.id === id)) {
      this._commitPlan({ ...this.plan, openings: this.plan.openings.filter((o) => o.id !== id) });
      this._select(null);
      return;
    }
    if (id && this.plan.furniture.some((f) => f.id === id)) {
      this._commitPlan({ ...this.plan, furniture: this.plan.furniture.filter((f) => f.id !== id) });
      this._select(null);
      return;
    }
    const room = this.plan.rooms.find((r) => r.id === this.selected);
    if (!room) return;
    if (this.tool === "points" && this._vertex !== undefined) {
      if (room.points.length <= 3) return;
      const points = room.points.filter((_, i) => i !== this._vertex);
      this._vertex = undefined;
      this._commit(this._replaceRoom(room.id, points));
      return;
    }
    this._commit(this.plan.rooms.filter((r) => r.id !== room.id));
    this._select(null);
  }

  // ------------------------------------------------------------ Rendering

  protected override render() {
    const { w, h } = this._size;
    const v = this._view;
    const shown = this._shown;
    const rooms = shown?.rooms ?? [];
    const selected = rooms.find((r) => r.id === this.selected);
    const thickness = this.plan?.settings.wall_thickness ?? 0.12;
    const bg = this.plan?.settings.background;
    const panning = this._drag?.kind === "pan" || this.tool === "pan";
    const cursor = this.tool === "room" || this._placing || this._calib ? "crosshair" : panning ? (this._drag ? "grabbing" : "grab") : "default";

    return html`
      <div class="stage" tabindex="0" @keydown=${this._onKeyDown}>
        <svg
          class="canvas ${bg?.visible ? "has-bg" : ""}"
          width=${w}
          height=${h}
          style="cursor:${cursor}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
          @pointerleave=${() => (this._cursor = undefined)}
          @wheel=${this._onWheel}
        >
          ${this._renderGrid()}
          <g transform="matrix(${v.scale} 0 0 ${v.scale} ${-v.x * v.scale} ${-v.y * v.scale})">
            ${bg?.visible
              ? svg`<image class="backdrop" href=${bg.url} x=${bg.x} y=${bg.y} width=${bg.width} height=${bg.height}
                  opacity=${bg.opacity} preserveAspectRatio="none" />`
              : nothing}
            ${rooms.map(
              (r) => svg`<polygon
                class="floor ${r.id === this.selected ? "sel" : ""} ${r.id === this._hover ? "hover" : ""}"
                points=${r.points.map((p) => p.join(",")).join(" ")}
                data-hit="room" data-room=${r.id}
                @pointerenter=${() => (this._hover = r.id)}
                @pointerleave=${() => (this._hover = undefined)}
              />`,
            )}
            ${(shown?.furniture ?? []).map((f) => this._renderFurniture(f))}
            ${(shown?.items ?? []).map((i) => this._renderRadiatorBar(i, rooms, thickness))}
            ${rooms.map(
              (r) => svg`<polygon class="wall ${r.id === this.selected ? "sel" : ""}"
                points=${r.points.map((p) => p.join(",")).join(" ")}
                stroke-width=${thickness} data-hit="room" data-room=${r.id} />`,
            )}
            ${(shown?.openings ?? []).map((o) => this._renderOpening(o, rooms, thickness))}
          </g>
          ${rooms.map((r) => this._renderLabel(r))} ${(shown?.items ?? []).map((i) => this._renderItem(i))}
          ${selected ? this._renderSelection(selected) : nothing} ${shown ? this._renderObjectSelection(shown) : nothing}
          ${this._renderDrawing()} ${this._renderGhost()} ${this._renderGuides()} ${this._renderCalibMarks()}
        </svg>
        ${this._renderToolbar()} ${this._library ? this._renderLibrary() : nothing}
        ${this.plan?.rooms.length && !this._library
          ? html`<button class="add" @click=${() => (this._library = true)}>
              ${icons.plus} ${t().addButton}
            </button>`
          : nothing}
        ${this.plan && !this.plan.rooms.length && !this._drag && !this._library && !this._calib ? this._renderEmpty() : nothing}
        ${this._calib ? this._renderCalib() : this._notice ? html`<div class="notice" role="status">${this._notice}</div>` : nothing}
      </div>
      ${this._renderStatus()}
    `;
  }

  /** Door/window on its wall. */
  private _renderOpening(o: Opening, rooms: Room[], thickness: number) {
    const [ax, ay] = o.wall.a;
    const [bx, by] = o.wall.b;
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 0.05) return nothing;
    const ux = (bx - ax) / len;
    const uy = (by - ay) / len;
    // Normal pointing into the (first) room
    let nx = -uy;
    let ny = ux;
    const room = rooms.find((r) => r.id === o.room_ids[0]);
    const mid: Point = [(ax + bx) / 2, (ay + by) / 2];
    if (room && !pointInPolygon([mid[0] + nx * 0.2, mid[1] + ny * 0.2], room.points)) {
      nx = -nx;
      ny = -ny;
    }
    const sel = o.id === this.selected ? "sel" : "";
    const gap = svg`<line class="gap" x1=${ax} y1=${ay} x2=${bx} y2=${by} stroke-width=${thickness * 1.15} />
      <line class="opening-hit" x1=${ax} y1=${ay} x2=${bx} y2=${by} data-hit="opening" data-id=${o.id} />`;
    if (o.type === "window") {
      return svg`<g class="opening window ${o.exterior ? "ext" : ""} ${sel}">${gap}
        <line class="pane" x1=${ax} y1=${ay} x2=${bx} y2=${by} stroke-width=${thickness * 0.5} />
      </g>`;
    }
    if (o.type === "opening") return svg`<g class="opening ${sel}">${gap}</g>`;
    const [hx, hy] = o.hinge === "left" ? [ax, ay] : [bx, by];
    const [ox, oy] = o.hinge === "left" ? [bx, by] : [ax, ay];
    const start = Math.atan2(ny, nx);
    let end = Math.atan2(oy - hy, ox - hx);
    let delta = end - start;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    end = start + delta;
    let arc = "";
    for (let i = 0; i <= 12; i++) {
      const a = start + ((end - start) * i) / 12;
      arc += `${i ? "L" : "M"}${hx + Math.cos(a) * len} ${hy + Math.sin(a) * len}`;
    }
    return svg`<g class="opening door ${o.exterior ? "ext" : ""} ${sel}">${gap}
      <path class="swing" d=${arc} />
      <line class="leaf" x1=${hx} y1=${hy} x2=${hx + nx * len} y2=${hy + ny * len} />
    </g>`;
  }

  /** Placed device as a marker (tap = select, drag = move). */
  private _renderItem(item: Item) {
    const [x, y] = this._toScreen(item.pos);
    const kind = itemKind(item, this.hass?.states[item.entity_id]?.attributes.device_class);
    const name = item.label || this.hass?.states[item.entity_id]?.attributes.friendly_name || item.entity_id;
    const missing = !!this.hass && !this.hass.states[item.entity_id] && Object.keys(this.hass.states).length > 0;
    return svg`<g class="item ${kind} ${item.id === this.selected ? "sel" : ""} ${missing ? "missing" : ""}" transform="translate(${x} ${y})"
      data-hit="item" data-id=${item.id}>
      <title>${name}</title>
      <circle r="15" class="hitpad" />
      <circle r="9" class="disc" />${ITEM_GLYPHS[kind]}
    </g>`;
  }

  private _isRadiator(item: Item): boolean {
    return itemKind(item, this.hass?.states[item.entity_id]?.attributes.device_class) === "radiator";
  }

  /** Radiator on a wall: its real length as a bar (world coordinates), draggable. */
  private _renderRadiatorBar(item: Item, rooms: Room[], thickness: number) {
    if (!this._isRadiator(item) || item.rotation) return nothing;
    const wall = nearestWall(rooms, item.pos);
    if (!wall || wall.dist > WALL_MOUNT_DIST) return nothing;
    const w = radiatorWidth(item);
    const d = RADIATOR_DEPTH;
    const off = thickness / 2 + d / 2 + 0.01;
    const cx = wall.foot[0] + wall.nx * off;
    const cy = wall.foot[1] + wall.ny * off;
    const deg = (Math.atan2(wall.nx, -wall.ny) * 180) / Math.PI;
    return svg`<rect class="radiator-bar ${item.id === this.selected ? "sel" : ""}" x=${-w / 2} y=${-d / 2} width=${w} height=${d}
      transform="translate(${cx} ${cy}) rotate(${deg})" data-hit="item" data-id=${item.id} />`;
  }

  /** Furniture (world coordinates): outline plus a simple top view per type. */
  private _renderFurniture(f: Furniture) {
    const [w, d] = f.size;
    return svg`<g class="furniture ${f.type} ${f.id === this.selected ? "sel" : ""}"
      transform="translate(${f.pos[0]} ${f.pos[1]}) rotate(${f.rotation})" data-hit="furniture" data-id=${f.id}>
      ${furnitureBody(f.type, w, d)}
      ${furnitureGlyph(f.type, w, d)}
    </g>`;
  }

  /** Selection handles for a device, furniture or opening. */
  private _renderObjectSelection(plan: PlanData) {
    const id = this.selected;
    if (!id) return nothing;
    const item = plan.items.find((i) => i.id === id);
    if (item) {
      const [x, y] = this._toScreen(item.pos);
      return svg`<circle class="sel-ring" cx=${x} cy=${y} r="15" />`;
    }
    const f = plan.furniture.find((x) => x.id === id);
    if (f) {
      const [w, d] = f.size;
      const rad = (f.rotation * Math.PI) / 180;
      const corners = ([[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]] as Point[]).map(([lx, ly]) =>
        this._toScreen([f.pos[0] + lx * Math.cos(rad) - ly * Math.sin(rad), f.pos[1] + lx * Math.sin(rad) + ly * Math.cos(rad)]),
      );
      const [cx, cy] = this._toScreen(f.pos);
      const topMid = this._toScreen([f.pos[0] + (d / 2) * Math.sin(rad), f.pos[1] - (d / 2) * Math.cos(rad)]);
      const ux = topMid[0] - cx;
      const uy = topMid[1] - cy;
      const ul = Math.hypot(ux, uy) || 1;
      const hx = topMid[0] + (ux / ul) * 26;
      const hy = topMid[1] + (uy / ul) * 26;
      const label = `${de(w)} × ${de(d)} m`;
      return svg`
        <polygon class="sel-outline" points=${corners.map((c) => c.join(",")).join(" ")} />
        <line class="sel-stem" x1=${topMid[0]} y1=${topMid[1]} x2=${hx} y2=${hy} />
        <g class="rotate-handle" transform="translate(${hx} ${hy})" data-hit="furniture-rotate" data-id=${f.id}>
          <title>${t().rotate}</title>
          <circle r="14" class="hitpad" /><circle r="7" />
        </g>
        <g class="draw-label" transform="translate(${cx - label.length * 3.5 - 10} ${Math.max(...corners.map((c) => c[1])) + 10})">
          <rect width=${label.length * 7 + 20} height="24" rx="12" /><text x="10" y="16">${label}</text>
        </g>`;
    }
    const o = plan.openings.find((x) => x.id === id);
    if (o) {
      const a = this._toScreen(o.wall.a);
      const b = this._toScreen(o.wall.b);
      const label = `${de(edgeLength(o.wall.a, o.wall.b))} m`;
      return svg`
        <line class="sel-opening" x1=${a[0]} y1=${a[1]} x2=${b[0]} y2=${b[1]} />
        ${(["a", "b"] as const).map((end) => {
          const [x, y] = end === "a" ? a : b;
          return svg`<g class="vertex" transform="translate(${x} ${y})" data-hit="opening-end" data-id=${o.id} data-end=${end}>
            <circle r="14" class="hitpad" /><circle r="5.5" />
          </g>`;
        })}
        <g class="draw-label" transform="translate(${(a[0] + b[0]) / 2 - label.length * 3.5 - 10} ${(a[1] + b[1]) / 2 + 14})">
          <rect width=${label.length * 7 + 20} height="24" rx="12" /><text x="10" y="16">${label}</text>
        </g>`;
    }
    return nothing;
  }

  /** Preview while placing from the library. */
  private _renderGhost() {
    const entry = this._placing;
    const p = this._ghost;
    if (!entry || !p) return nothing;
    if (entry.group === "furniture") {
      const s = this._view.scale;
      const [x, y] = this._toScreen(p);
      const [w, d] = entry.size;
      return svg`<rect class="ghost" x=${x - (w * s) / 2} y=${y - (d * s) / 2} width=${w * s} height=${d * s} rx="3" />`;
    }
    if (entry.group === "opening") {
      const wall = this._wallAt(p, 0.8);
      if (!wall) {
        const [x, y] = this._toScreen(p);
        return svg`<circle class="ghost bad" cx=${x} cy=${y} r="8" />`;
      }
      const { a, b } = this._openingOnWall(wall, entry.width, wall.point);
      const sa = this._toScreen(a);
      const sb = this._toScreen(b);
      return svg`<line class="ghost-line" x1=${sa[0]} y1=${sa[1]} x2=${sb[0]} y2=${sb[1]} />`;
    }
    const [x, y] = this._toScreen(p);
    return svg`<g class="item ghost-item ${entry.kind}" transform="translate(${x} ${y})"><circle r="9" class="disc" />${ITEM_GLYPHS[entry.kind]}</g>`;
  }

  /** Library entries matching the search (all groups), or undefined without a search. */
  private _libMatches(): CatalogEntry[] | undefined {
    const q = this._libQuery.trim().toLowerCase();
    if (!q) return undefined;
    return [...DEVICES, ...OPENINGS, ...FURNITURE].filter((e) => entryLabel(e).toLowerCase().includes(q));
  }

  private _libIcon(entry: CatalogEntry, px = 30) {
    const box = (content: unknown) => svg`<svg viewBox="-12 -12 24 24" width=${px} height=${px}>${content}</svg>`;
    if (entry.group === "device") {
      return html`<svg viewBox="-12 -12 24 24" width=${px} height=${px} class="lib-item ${entry.kind}"><circle r="9" class="disc" />${ITEM_GLYPHS[entry.kind]}</svg>`;
    }
    if (entry.group === "opening") {
      const type = entry.type;
      return box(
        type === "window"
          ? svg`<path d="M-10 0H10" class="lib-wall" /><path d="M-6 0H6" class="lib-pane" />`
          : type === "door"
            ? svg`<path d="M-10 4H-6M6 4H10" class="lib-wall" /><path d="M-6 4V-8" class="lib-leaf" /><path d="M-6 -8A12 12 0 0 1 6 4" class="lib-swing" />`
            : svg`<path d="M-10 0H-6M6 0H10" class="lib-wall" />`,
      );
    }
    const k = 18 / Math.max(entry.size[0], entry.size[1]);
    return box(svg`<g transform="scale(${k})" class="furniture lib">
      ${furnitureBody(entry.type, entry.size[0], entry.size[1])}
      ${furnitureGlyph(entry.type, entry.size[0], entry.size[1])}</g>`);
  }

  private _renderLibrary() {
    const s = t();
    const selected = this._libSelected;
    const tile = (entry: CatalogEntry) => html`<button
      class="tile ${entry === selected ? "selected" : ""}"
      title=${t().libraryTile}
      aria-pressed=${entry === selected}
      @pointerdown=${(e: PointerEvent) => this._startPlacing(entry, e)}
    >
      <span class="tile-icon">${this._libIcon(entry)}</span><span>${entryLabel(entry)}</span>
    </button>`;
    const matches = this._libMatches();
    const category = this._libCategory;
    return html`<aside class="library" aria-label=${s.library}>
      <header>
        <h2>${s.library}</h2>
        <button class="close" aria-label=${s.close} @click=${this._closeLibrary}>${icons.close}</button>
      </header>
      <input
        class="lib-search"
        type="search"
        .value=${this._libQuery}
        placeholder=${s.librarySearch}
        aria-label=${s.librarySearch}
        @input=${(e: Event) => (this._libQuery = (e.target as HTMLInputElement).value)}
        @keydown=${(e: KeyboardEvent) => e.stopPropagation()}
      />
      <p class="lib-hint">${s.libraryHint}</p>
      ${matches
        ? matches.length
          ? html`<div class="tiles">${matches.map(tile)}</div>`
          : html`<p class="lib-hint">${s.libraryNothing}</p>`
        : html`
            <h3>${s.devices}</h3>
            <div class="tiles">${DEVICES.map(tile)}</div>
            <h3>${s.doorsWindows}</h3>
            <div class="tiles">${OPENINGS.map(tile)}</div>
            <h3>${s.furniture}</h3>
            <div class="cats" role="tablist" aria-label=${s.furniture}>
              ${FURNITURE_CATEGORIES.map(
                (c) => html`<button role="tab" aria-selected=${c === category} class=${c === category ? "on" : ""} @click=${() => (this._libCategory = c)}>
                  ${s.furnitureCategories[c]}
                </button>`,
              )}
            </div>
            <div class="tiles">${FURNITURE.filter((e) => e.category === category).map(tile)}</div>
          `}
      ${selected ? this._renderPreview(selected) : nothing}
    </aside>`;
  }

  /** Selected library entry: 3D view (furniture), 2D view, size and a place button. */
  private _renderPreview(entry: CatalogEntry) {
    const s = t();
    const furniture = entry.group === "furniture";
    const size = furniture
      ? `${de(entry.size[0])} × ${de(entry.size[1])} × ${de(entry.height)} m`
      : entry.group === "opening"
        ? `${de(entry.width)} m`
        : "";
    return html`<section class="preview" aria-label=${entryLabel(entry)}>
      <div class="preview-views">
        ${furniture && this._preview3d !== false ? html`<canvas class="preview3d" width="480" height="300"></canvas>` : nothing}
        <span class="preview2d">${this._libIcon(entry, furniture && this._preview3d !== false ? 56 : 72)}</span>
      </div>
      <div class="preview-text">
        <b>${entryLabel(entry)}</b>
        ${size ? html`<span>${size}</span>` : nothing}
      </div>
      <button class="primary" @click=${() => this._armPlacing(entry)}>${icons.plus} ${s.placeInPlan}</button>
    </section>`;
  }

  private _closeLibrary = (): void => {
    this._library = false;
    this._libSelected = undefined;
    disposePreview();
  };

  /** The next tap into the plan places this entry. */
  private _armPlacing(entry: CatalogEntry): void {
    this._placing = entry;
    this._closeLibrary();
    this._say(t().tapToPlace(entryLabel(entry)));
  }

  private _renderGrid() {
    const { w, h } = this._size;
    const v = this._view;
    const grid = this.plan?.settings.grid ?? 0.1;
    const lines = (step: number) => {
      if (step * v.scale < 9) return "";
      let d = "";
      const x0 = Math.ceil(v.x / step) * step;
      for (let x = x0; (x - v.x) * v.scale <= w; x += step) {
        const sx = Math.round((x - v.x) * v.scale) + 0.5;
        d += `M${sx} 0V${h}`;
      }
      const y0 = Math.ceil(v.y / step) * step;
      for (let y = y0; (y - v.y) * v.scale <= h; y += step) {
        const sy = Math.round((y - v.y) * v.scale) + 0.5;
        d += `M0 ${sy}H${w}`;
      }
      return d;
    };
    const minor = grid * v.scale >= 9 ? grid : 0.5;
    return svg`
      <rect class="bg" width=${w} height=${h} />
      <path class="grid-minor" d=${lines(minor)} />
      <path class="grid-major" d=${lines(1)} />
    `;
  }

  private _renderLabel(room: Room) {
    const box = bbox(room.points);
    const widthPx = (box.maxX - box.minX) * this._view.scale;
    const heightPx = (box.maxY - box.minY) * this._view.scale;
    if (widthPx < 56 || heightPx < 34) return nothing;
    const [x, y] = this._toScreen(labelPoint(room.points));
    const big = widthPx > 120 && heightPx > 70;
    // Fit the name to the room width (≈ 7 px per character at 13 px).
    const maxChars = Math.max(3, Math.floor((widthPx - 14) / 7));
    const raw = room.name || t().unnamed;
    const name = raw.length > maxChars ? `${raw.slice(0, maxChars - 1)}…` : raw;
    return svg`<g class="label ${room.id === this.selected ? "sel" : ""}" transform="translate(${x} ${y})">
      <title>${raw}</title>
      <text class="name" y=${big ? -6 : -2}>${name}</text>
      <text class="area ${big ? "big" : ""}" y=${big ? 18 : 13}>${de(polygonArea(room.points), 1)} m²</text>
    </g>`;
  }

  /** Dimension lines (architect ticks) and handles of the selected room. */
  private _renderSelection(room: Room) {
    const pts = room.points;
    const s = pts.map((p) => this._toScreen(p));
    const outward = signedArea(pts) >= 0 ? 1 : -1;
    const thicknessPx = (this.plan.settings.wall_thickness * this._view.scale) / 2;
    const off = thicknessPx + 22;
    const dims = [];
    const handles = [];
    const edges = [];
    const rect = isAxisRect(pts);

    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      const [ax, ay] = s[i];
      const [bx, by] = s[j];
      const len = Math.hypot(bx - ax, by - ay);
      if (len < 1) continue;
      const ux = (bx - ax) / len;
      const uy = (by - ay) / len;
      const nx = uy * outward;
      const ny = -ux * outward;

      if (len >= 34) {
        const a2 = [ax + nx * off, ay + ny * off];
        const b2 = [bx + nx * off, by + ny * off];
        const t = 5;
        const tx = (ux + nx) * t * Math.SQRT1_2;
        const ty = (uy + ny) * t * Math.SQRT1_2;
        let angle = (Math.atan2(uy, ux) * 180) / Math.PI;
        if (angle > 90 || angle <= -90) angle += 180;
        const mx = (a2[0] + b2[0]) / 2;
        const my = (a2[1] + b2[1]) / 2;
        const text = de(edgeLength(pts[i], pts[j]));
        dims.push(svg`<g class="dim">
          <path d="M${ax + nx * (thicknessPx + 4)} ${ay + ny * (thicknessPx + 4)}L${a2[0] + nx * 5} ${a2[1] + ny * 5}
                   M${bx + nx * (thicknessPx + 4)} ${by + ny * (thicknessPx + 4)}L${b2[0] + nx * 5} ${b2[1] + ny * 5}" class="ext"/>
          <path d="M${a2[0]} ${a2[1]}L${b2[0]} ${b2[1]}" />
          <path d="M${a2[0] - tx} ${a2[1] - ty}L${a2[0] + tx} ${a2[1] + ty}M${b2[0] - tx} ${b2[1] - ty}L${b2[0] + tx} ${b2[1] + ty}" class="tick"/>
          ${len >= 60
            ? svg`<g transform="translate(${mx} ${my}) rotate(${angle})">
                <rect x=${-text.length * 3.6 - 6} y="-9" width=${text.length * 7.2 + 12} height="18" rx="9" />
                <text y="4">${text}</text>
              </g>`
            : nothing}
        </g>`);
      }

      if (this.tool === "select" && len >= 40) {
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        const angle = (Math.atan2(uy, ux) * 180) / Math.PI;
        handles.push(svg`<g transform="translate(${mx} ${my}) rotate(${angle})" class="edge-handle" data-hit="edge" data-room=${room.id} data-index=${i}>
          <rect x="-14" y="-12" width="28" height="24" class="hitpad" />
          <rect x="-9" y="-3.5" width="18" height="7" rx="3.5" />
        </g>`);
      }
      if (this.tool === "points") {
        edges.push(svg`<line class="edge-insert" x1=${ax} y1=${ay} x2=${bx} y2=${by}
          data-hit="edge-insert" data-room=${room.id} data-index=${i} />`);
      }
    }

    const vertices = s.map(
      ([x, y], i) => svg`<g class="vertex ${this._vertex === i ? "active" : ""} ${rect && this.tool === "select" ? "corner" : ""}"
        transform="translate(${x} ${y})" data-hit="vertex" data-room=${room.id} data-index=${i}>
        <circle r="14" class="hitpad" /><circle r="5.5" />
      </g>`,
    );

    return svg`${dims}${edges}${handles}${vertices}`;
  }

  private _renderCalibMarks() {
    const pts = this._calib;
    if (!pts?.length) return nothing;
    const end = pts[1] ?? this._cursor;
    const [ax, ay] = this._toScreen(pts[0]);
    const b = end ? this._toScreen(end) : undefined;
    return svg`<g class="calib-marks">
      ${b ? svg`<line x1=${ax} y1=${ay} x2=${b[0]} y2=${b[1]} />` : nothing}
      ${pts.map((p) => {
        const [x, y] = this._toScreen(p);
        return svg`<circle cx=${x} cy=${y} r="6" />`;
      })}
    </g>`;
  }

  private _renderCalib() {
    const pts = this._calib ?? [];
    const s = t();
    const submit = (e: Event) => {
      e.preventDefault();
      const v = parseNum((this.renderRoot.querySelector(".calib input") as HTMLInputElement).value);
      if (Number.isFinite(v) && v > 0 && v <= 200) this._applyCalib(v);
    };
    return html`<form class="calib" @submit=${submit}>
      <span>${pts.length < 2 ? s.calibPick(pts.length + 1) : s.calibDistance(de(edgeLength(pts[0], pts[1])))}</span>
      ${pts.length === 2
        ? html`<label class="calib-value"><input inputmode="decimal" aria-label=${s.calibReal} required /><span>m</span></label>
            <button class="primary" type="submit">${s.apply}</button>`
        : nothing}
      <button type="button" @click=${() => (this._calib = undefined)}>${s.cancel}</button>
    </form>`;
  }

  private _renderDrawing() {
    const drag = this._drag;
    if (drag?.kind !== "draw") return nothing;
    const points = rectPoints(drag.start, drag.current);
    const box = bbox(points);
    const s = points.map((p) => this._toScreen(p));
    const w = box.maxX - box.minX;
    const h = box.maxY - box.minY;
    const [px, py] = this._toScreen([box.maxX, box.maxY]);
    const text = `${de(w)} × ${de(h)} m   ${de(w * h, 1)} m²`;
    return svg`
      <polygon class="drawing" points=${s.map((p) => p.join(",")).join(" ")} />
      <g class="draw-label" transform="translate(${px + 12} ${py + 12})">
        <rect width=${text.length * 7 + 20} height="26" rx="13" />
        <text x="10" y="17">${text}</text>
      </g>
    `;
  }

  private _renderGuides() {
    const { x, y } = this._guides;
    const { w, h } = this._size;
    return svg`
      ${x !== undefined ? svg`<line class="guide" x1=${this._toScreen([x, 0])[0]} x2=${this._toScreen([x, 0])[0]} y1="0" y2=${h} />` : nothing}
      ${y !== undefined ? svg`<line class="guide" y1=${this._toScreen([0, y])[1]} y2=${this._toScreen([0, y])[1]} x1="0" x2=${w} />` : nothing}
    `;
  }

  private _renderToolbar() {
    return html`<nav class="tools" aria-label=${t().tools}>
      ${TOOLS.map(
        (x) => html`<button
          class=${this.tool === x.tool ? "active" : ""}
          title="${x.label()} (${x.key})"
          aria-label=${x.label()}
          aria-pressed=${this.tool === x.tool}
          @click=${() => this._setTool(x.tool)}
        >
          ${icons[x.tool]}
        </button>`,
      )}
      <span class="tool-sep"></span>
      <button
        class=${this._library ? "active" : ""}
        title=${t().libraryTitle}
        aria-label=${t().library}
        aria-pressed=${this._library}
        @click=${() => (this._library ? this._closeLibrary() : (this._library = true))}
      >
        ${icons.library}
      </button>
    </nav>`;
  }

  private _renderEmpty() {
    const s = t();
    // With a background image the card moves to the bottom so the image stays visible
    return html`<div class="empty ${this.plan.settings.background?.visible ? "low" : ""}">
      <div class="empty-card">
        <h2>${s.emptyTitle}</h2>
        <p>${s.emptyText}</p>
        <div class="empty-actions">
          <button class="primary" @click=${() => this._setTool("room")}>${icons.room} ${s.drawRoom}</button>
          <button @click=${() => this._emit("import-areas", {})}>${icons.import} ${s.importAreas}</button>
          <button @click=${() => this._emit("pick-background", {})}>${icons.image} ${s.traceImage}</button>
          <button @click=${() => this._emit("load-demo", {})}>${icons.home} ${s.loadDemo}</button>
        </div>
      </div>
    </div>`;
  }

  private _renderStatus() {
    const rooms = this._rooms;
    const plan = this.plan ? { ...this.plan, rooms } : undefined;
    const c = this._cursor;
    const s = t();
    return html`<footer class="status">
      <span><strong>${rooms.length}</strong> ${s.roomCount(rooms.length)}</span>
      <span><strong>${plan ? de(totalArea(plan), 1) : "0"}</strong> ${s.areaTotal}</span>
      <span class="coords">${c ? html`x ${de(c[0])}&ensp;y ${de(c[1])} m` : nothing}</span>
      <span class="spacer"></span>
      <button
        class="snap ${this._snap ? "on" : ""}"
        title=${s.snapTitle}
        aria-pressed=${this._snap}
        @click=${() => (this._snap = !this._snap)}
      >
        ${icons.magnet}<span>${s.snap}</span>
      </button>
      <div class="zoom">
        <button title=${s.zoomOut} aria-label=${s.zoomOut} @click=${() => this._zoomAt(this._size.w / 2, this._size.h / 2, 1 / 1.25)}>${icons.minus}</button>
        <span>${Math.round(this._view.scale)} px/m</span>
        <button title=${s.zoomIn} aria-label=${s.zoomIn} @click=${() => this._zoomAt(this._size.w / 2, this._size.h / 2, 1.25)}>${icons.plus}</button>
        <button title=${s.fitAll} aria-label=${s.fitAll} @click=${() => this.fit()}>${icons.fit}</button>
      </div>
    </footer>`;
  }

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
      position: relative;
      --canvas: var(--fp-canvas);
    }
    .stage {
      flex: 1;
      position: relative;
      min-height: 0;
      overflow: hidden;
      outline: none;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.canvas {
      position: absolute;
      inset: 0;
      display: block;
      touch-action: none;
    }
    .bg {
      fill: var(--fp-canvas);
    }
    .grid-minor {
      stroke: var(--fp-grid-minor);
      stroke-width: 1;
    }
    .grid-major {
      stroke: var(--fp-grid-major);
      stroke-width: 1;
    }

    .floor {
      fill: var(--fp-floor);
      transition: fill 120ms;
    }
    .has-bg .floor {
      fill-opacity: 0.35;
    }
    .backdrop {
      pointer-events: none;
    }
    .opening {
      fill: none;
    }
    .opening .gap,
    .opening .pane,
    .opening .leaf,
    .opening .swing {
      pointer-events: none;
    }
    .opening .gap {
      stroke: var(--fp-canvas);
    }
    .window .pane {
      stroke: var(--fp-frost);
    }
    .door .leaf {
      stroke: var(--fp-fg);
      stroke-width: 2px;
      vector-effect: non-scaling-stroke;
    }
    .door .swing {
      stroke: var(--fp-dim);
      stroke-width: 1px;
      stroke-dasharray: 3 3;
      vector-effect: non-scaling-stroke;
    }
    .door.ext .leaf {
      stroke: var(--fp-accent);
    }
    .item {
      cursor: move;
    }
    .item .disc {
      fill: var(--fp-surface);
      stroke: var(--fp-dim);
      stroke-width: 1.2;
    }
    .item path,
    .item rect,
    .item circle:not(.disc):not(.hitpad) {
      fill: none;
      stroke: var(--fp-fg);
      stroke-width: 1.3;
      stroke-linecap: round;
    }
    .item .fill:not(.disc):not(.hitpad) {
      fill: currentColor;
      stroke: none;
    }
    .item.missing .disc {
      stroke: var(--fp-alert);
      stroke-dasharray: 3 2;
    }
    .item.radiator .disc {
      stroke: var(--fp-accent);
    }
    .item.light {
      color: var(--fp-lamp);
    }
    .item.light .disc {
      stroke: var(--fp-lamp);
    }
    .item.sensor .disc,
    .item.motion .disc {
      stroke: var(--fp-frost);
    }
    .item.sel .disc {
      fill: var(--fp-surface-2);
    }
    .sel-ring {
      fill: none;
      stroke: var(--fp-accent);
      stroke-width: 2;
      pointer-events: none;
    }

    .radiator-bar {
      fill: color-mix(in srgb, var(--fp-accent) 30%, transparent);
      stroke: var(--fp-accent);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
      cursor: grab;
    }
    .radiator-bar.sel {
      fill: color-mix(in srgb, var(--fp-accent) 60%, transparent);
    }

    .furniture .body {
      fill: color-mix(in srgb, var(--fp-surface-2) 85%, var(--fp-fg));
      stroke: color-mix(in srgb, var(--fp-dim) 80%, transparent);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }
    .has-bg .furniture .body {
      fill-opacity: 0.6;
    }
    .furniture .g {
      fill: none;
      stroke: color-mix(in srgb, var(--fp-dim) 85%, transparent);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }
    .furniture .g.dashed {
      stroke-dasharray: 4 3;
    }
    .furniture.rug .body {
      fill: color-mix(in srgb, var(--fp-surface-2) 60%, transparent);
    }
    .furniture {
      cursor: move;
    }
    .furniture.sel .body {
      stroke: var(--fp-accent);
    }
    .sel-outline {
      fill: none;
      stroke: var(--fp-accent);
      stroke-width: 1.5;
      stroke-dasharray: 5 4;
      pointer-events: none;
    }
    .sel-stem {
      stroke: var(--fp-accent);
      stroke-width: 1.2;
      pointer-events: none;
    }
    .rotate-handle {
      cursor: grab;
    }
    .rotate-handle circle:not(.hitpad) {
      fill: var(--fp-canvas);
      stroke: var(--fp-accent);
      stroke-width: 2;
    }
    .rotate-handle:hover circle:not(.hitpad) {
      fill: var(--fp-accent);
    }
    .opening-hit {
      stroke: transparent;
      stroke-width: 16px;
      vector-effect: non-scaling-stroke;
      pointer-events: stroke;
      cursor: move;
    }
    .opening.sel .gap {
      stroke: color-mix(in srgb, var(--fp-accent) 35%, var(--fp-canvas));
    }
    .sel-opening {
      stroke: var(--fp-accent);
      stroke-width: 3;
      pointer-events: none;
    }
    .ghost {
      fill: color-mix(in srgb, var(--fp-accent) 18%, transparent);
      stroke: var(--fp-accent);
      stroke-width: 1.5;
      stroke-dasharray: 5 4;
      pointer-events: none;
    }
    .ghost.bad {
      stroke: var(--fp-alert);
      fill: color-mix(in srgb, var(--fp-alert) 20%, transparent);
    }
    .ghost-line {
      stroke: var(--fp-accent);
      stroke-width: 6;
      stroke-linecap: round;
      pointer-events: none;
    }
    .ghost-item {
      pointer-events: none;
      opacity: 0.85;
    }
    .floor.hover {
      fill: var(--fp-floor-hover);
    }
    .floor.sel {
      fill: var(--fp-floor-sel);
    }
    .wall {
      fill: none;
      stroke: var(--fp-wall);
      stroke-linejoin: miter;
    }
    .wall.sel {
      stroke: var(--fp-wall-sel);
    }

    .label {
      pointer-events: none;
      text-anchor: middle;
    }
    .label .name {
      fill: var(--fp-fg);
      font-size: 13px;
      font-weight: 500;
    }
    .label .area {
      fill: var(--fp-dim);
      font-size: 11.5px;
      font-variant-numeric: tabular-nums;
    }
    .label .area.big {
      font-size: 19px;
      font-weight: 300;
      fill: var(--fp-fg);
      opacity: 0.82;
    }
    .label.sel .name {
      fill: var(--fp-accent);
    }

    .dim {
      pointer-events: none;
      stroke: var(--fp-dim-line);
      stroke-width: 1;
      fill: none;
    }
    .dim .ext {
      stroke-dasharray: 2 3;
      opacity: 0.7;
    }
    .dim .tick {
      stroke-width: 1.6;
      stroke: var(--fp-accent);
    }
    .dim rect {
      fill: var(--fp-canvas);
      stroke: var(--fp-dim-line);
    }
    .dim text {
      fill: var(--fp-fg);
      stroke: none;
      font-size: 11.5px;
      text-anchor: middle;
      font-variant-numeric: tabular-nums;
    }

    .hitpad {
      fill: transparent;
      stroke: none;
    }
    .vertex circle:not(.hitpad) {
      fill: var(--fp-canvas);
      stroke: var(--fp-accent);
      stroke-width: 2;
    }
    .vertex {
      cursor: move;
    }
    .vertex.corner {
      cursor: nwse-resize;
    }
    .vertex.active circle:not(.hitpad),
    .vertex:hover circle:not(.hitpad) {
      fill: var(--fp-accent);
    }
    .edge-handle {
      cursor: move;
    }
    .edge-handle rect:not(.hitpad) {
      fill: var(--fp-accent);
      stroke: var(--fp-canvas);
      stroke-width: 1.5;
    }
    .edge-insert {
      stroke: transparent;
      stroke-width: 16;
      cursor: copy;
    }
    .edge-insert:hover {
      stroke: color-mix(in srgb, var(--fp-accent) 30%, transparent);
    }

    .drawing {
      fill: color-mix(in srgb, var(--fp-accent) 12%, transparent);
      stroke: var(--fp-accent);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
    }
    .draw-label rect {
      fill: var(--fp-accent);
    }
    .draw-label text {
      fill: var(--fp-on-accent);
      font-size: 12.5px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      white-space: pre;
    }
    .guide {
      stroke: var(--fp-accent);
      stroke-width: 1;
      stroke-dasharray: 3 4;
      opacity: 0.8;
      pointer-events: none;
    }

    button {
      font: inherit;
      color: var(--fp-fg);
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }

    .tools {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 5px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }
    .tools button {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      color: var(--fp-dim);
    }
    .tools button:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .tools button.active {
      color: var(--fp-on-accent);
      background: var(--fp-accent);
    }

    .tool-sep {
      height: 1px;
      margin: 3px 6px;
      background: var(--fp-line);
    }

    .library {
      position: absolute;
      left: 72px;
      top: 14px;
      bottom: 14px;
      width: 268px;
      overflow-y: auto;
      padding: 12px 12px 16px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      box-sizing: border-box;
      touch-action: pan-y;
    }
    .library header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .library h2 {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
    }
    .library .close {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .lib-hint {
      margin: 4px 0 10px;
      font-size: 12px;
      color: var(--fp-dim);
      line-height: 1.4;
    }
    .library h3 {
      margin: 12px 0 6px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--fp-dim);
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .tile {
      flex-direction: column;
      gap: 4px;
      padding: 8px 4px 7px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid transparent;
      font-size: 11.5px;
      line-height: 1.2;
      text-align: center;
      overflow-wrap: anywhere;
      hyphens: auto;
      touch-action: none;
      cursor: grab;
      user-select: none;
    }
    .tile:hover {
      border-color: var(--fp-accent);
    }
    .tile.selected {
      border-color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 16%, var(--fp-surface-2));
    }
    .lib-search {
      width: 100%;
      box-sizing: border-box;
      margin: 8px 0 2px;
      padding: 8px 10px;
      font: inherit;
      font-size: 13.5px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
    }
    .lib-search:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .cats {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin: 0 0 8px;
    }
    .cats button {
      padding: 4px 9px;
      font-size: 12px;
      color: var(--fp-dim);
      border: 1px solid var(--fp-line);
      border-radius: 999px;
    }
    .cats button.on {
      color: var(--fp-fg);
      border-color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 18%, transparent);
    }
    .preview {
      position: sticky;
      bottom: -16px;
      margin: 12px -12px -16px;
      padding: 12px;
      display: grid;
      gap: 8px;
      background: var(--fp-surface);
      border-top: 1px solid var(--fp-line);
      box-shadow: 0 -10px 24px rgb(0 0 0 / 30%);
    }
    .preview-views {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 72px;
      border-radius: 10px;
      background: var(--fp-canvas, var(--fp-bg));
    }
    .preview3d {
      flex: 1;
      min-width: 0;
      width: 100%;
      aspect-ratio: 8 / 5;
    }
    .preview2d {
      flex: none;
      display: grid;
      place-items: center;
      padding: 6px;
    }
    .preview-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 13px;
    }
    .preview-text b {
      font-weight: 500;
    }
    .preview-text span {
      color: var(--fp-dim);
      font-variant-numeric: tabular-nums;
    }
    .preview .primary {
      justify-content: center;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
    }
    .tile-icon {
      display: grid;
      place-items: center;
      height: 30px;
    }
    .tile-icon svg {
      overflow: visible;
    }
    .lib-wall {
      stroke: var(--fp-wall);
      stroke-width: 3;
    }
    .lib-pane {
      stroke: var(--fp-frost);
      stroke-width: 2;
    }
    .lib-leaf {
      stroke: var(--fp-fg);
      stroke-width: 1.6;
    }
    .lib-swing {
      fill: none;
      stroke: var(--fp-dim);
      stroke-dasharray: 2 2;
    }
    .lib-item .disc {
      fill: var(--fp-surface);
      stroke: var(--fp-dim);
      stroke-width: 1.2;
    }
    .lib-item path,
    .lib-item rect,
    .lib-item circle:not(.disc) {
      fill: none;
      stroke: var(--fp-fg);
      stroke-width: 1.3;
      stroke-linecap: round;
    }
    .lib-item.light {
      color: var(--fp-lamp);
    }
    .lib-item .fill {
      fill: currentColor;
      stroke: none;
    }

    .add {
      position: absolute;
      left: 14px;
      top: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      padding: 0 16px 0 12px;
      border-radius: 12px;
      font: inherit;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--fp-on-accent);
      background: var(--fp-accent);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      cursor: pointer;
    }
    .add svg {
      width: 18px;
      height: 18px;
    }

    .notice {
      position: absolute;
      left: 50%;
      top: 14px;
      transform: translateX(-50%);
      max-width: calc(100% - 32px);
      padding: 9px 14px;
      border-radius: 10px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-accent);
      font-size: 13.5px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }

    .empty {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
      padding: 16px;
    }
    .empty.low {
      place-items: end center;
      padding-bottom: 56px;
    }
    .empty.low .empty-card p {
      display: none;
    }
    .empty-card {
      pointer-events: auto;
      max-width: 400px;
      padding: 22px 24px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    }
    .empty-card h2 {
      margin: 0 0 6px;
      font-size: 18px;
      font-weight: 500;
    }
    .empty-card p {
      margin: 0 0 18px;
      color: var(--fp-dim);
      line-height: 1.45;
    }
    .empty-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .empty-actions button {
      padding: 9px 14px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .empty-actions button.primary {
      background: var(--fp-accent);
      border-color: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
    }

    .calib {
      position: absolute;
      left: 16px;
      right: 16px;
      top: 14px;
      width: fit-content;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 10px;
      padding: 8px 8px 8px 14px;
      border-radius: 12px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-accent);
      font-size: 13.5px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    .calib button {
      padding: 7px 12px;
      border-radius: 9px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .calib button.primary {
      background: var(--fp-accent);
      border-color: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
    }
    .calib-value {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--fp-dim);
    }
    .calib-value input {
      width: 72px;
      font: inherit;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 7px 9px;
    }
    .calib-value input:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .calib-marks line {
      stroke: var(--fp-accent);
      stroke-width: 2;
      stroke-dasharray: 6 4;
    }
    .calib-marks circle {
      fill: var(--fp-accent);
      stroke: var(--fp-surface);
      stroke-width: 2;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 18px;
      height: 40px;
      padding: 0 8px 0 16px;
      font-size: 13px;
      color: var(--fp-dim);
      background: var(--fp-surface);
      border-top: 1px solid var(--fp-line);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .status strong {
      color: var(--fp-fg);
      font-weight: 500;
    }
    .status .spacer {
      flex: 1;
    }
    .status .snap {
      color: var(--fp-dim);
      padding: 5px 10px;
      border-radius: 8px;
    }
    .status .snap.on {
      color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 12%, transparent);
    }
    .zoom {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .zoom span {
      min-width: 64px;
      text-align: center;
    }
    .zoom button {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .zoom button:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }

    @media (max-width: 760px) {
      .tools {
        left: 50%;
        top: auto;
        bottom: 12px;
        transform: translateX(-50%);
        flex-direction: row;
      }
      .tool-sep {
        width: 1px;
        height: auto;
        margin: 6px 3px;
      }
      .library {
        left: 8px;
        right: 8px;
        top: 8px;
        bottom: 72px;
        width: auto;
      }
      .tiles {
        grid-template-columns: repeat(4, 1fr);
      }
      .add {
        left: 8px;
        top: 8px;
      }
      .coords,
      .zoom span,
      .snap span {
        display: none;
      }
      .status {
        gap: 12px;
      }
    }
  `;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

if (!customElements.get("fp-plan-editor")) {
  customElements.define("fp-plan-editor", FpPlanEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-plan-editor": FpPlanEditor;
  }
}
