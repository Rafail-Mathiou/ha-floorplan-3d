// Geometry helpers for the 2D editor (units: metres, y points down).
import { signedArea, type Point, type Room } from "../model";

export interface Box {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** Round to millimetres so stored values stay clean. */
export const mm = (v: number) => Math.round(v * 1000) / 1000;

export const snapToGrid = (v: number, grid: number) => mm(Math.round(v / grid) * grid);

export function bbox(points: Point[]): Box {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return { minX, minY, maxX, maxY };
}

export function roomsBox(rooms: Room[]): Box | undefined {
  if (!rooms.length) return undefined;
  return bbox(rooms.flatMap((r) => r.points));
}

/** Clockwise rectangle (starting top left). */
export function rectPoints(a: Point, b: Point): Point[] {
  const x1 = Math.min(a[0], b[0]);
  const x2 = Math.max(a[0], b[0]);
  const y1 = Math.min(a[1], b[1]);
  const y2 = Math.max(a[1], b[1]);
  return [
    [x1, y1],
    [x2, y1],
    [x2, y2],
    [x1, y2],
  ];
}

/** Axis-aligned rectangle with 4 points? */
export function isAxisRect(points: Point[]): boolean {
  if (points.length !== 4) return false;
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % 4];
    if (Math.abs(x1 - x2) > 1e-6 && Math.abs(y1 - y2) > 1e-6) return false;
  }
  return true;
}

/** Clockwise polygon (data model); reverses the order otherwise. */
export function clockwise(points: Point[]): Point[] {
  return signedArea(points) < 0 ? [...points].reverse() : points;
}

export function pointInPolygon([px, py]: Point, points: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/** Label position: the centroid if inside, otherwise the middle of the widest row. */
export function labelPoint(points: Point[]): Point {
  const a = signedArea(points);
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    const f = x1 * y2 - x2 * y1;
    cx += (x1 + x2) * f;
    cy += (y1 + y2) * f;
  }
  const c: Point = a ? [cx / (6 * a), cy / (6 * a)] : points[0];
  if (pointInPolygon(c, points)) return c;
  // Horizontal cut at the centroid height; take the longest inside segment.
  const xs: number[] = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    if (y1 > c[1] !== y2 > c[1]) xs.push(x1 + ((c[1] - y1) * (x2 - x1)) / (y2 - y1));
  }
  xs.sort((p, q) => p - q);
  let best: Point = c;
  let bestLen = 0;
  for (let i = 0; i + 1 < xs.length; i += 2) {
    if (xs[i + 1] - xs[i] > bestLen) {
      bestLen = xs[i + 1] - xs[i];
      best = [(xs[i] + xs[i + 1]) / 2, c[1]];
    }
  }
  return best;
}

export function projectOnSegment(p: Point, a: Point, b: Point): { point: Point; t: number; dist: number } {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2));
  const point: Point = [a[0] + t * dx, a[1] + t * dy];
  return { point, t, dist: Math.hypot(p[0] - point[0], p[1] - point[1]) };
}

export function edgeLength(a: Point, b: Point): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

// ---------------------------------------------------------------- Snapping

export interface SnapContext {
  grid: number;
  /** Snap radius in metres (converted from screen pixels). */
  radius: number;
  /** x/y values of other rooms' corners. */
  xs: number[];
  ys: number[];
  enabled: boolean;
}

export interface SnapResult {
  /** Alignment found with other rooms (for guide lines). */
  guideX?: number;
  guideY?: number;
}

export function snapContext(rooms: Room[], exclude: string | undefined, grid: number, radius: number, enabled: boolean): SnapContext {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const room of rooms) {
    if (room.id === exclude) continue;
    for (const [x, y] of room.points) {
      xs.push(x);
      ys.push(y);
    }
  }
  return { grid, radius, xs, ys, enabled };
}

function nearest(values: number[], v: number, radius: number): number | undefined {
  let best: number | undefined;
  let bestD = radius;
  for (const c of values) {
    const d = Math.abs(c - v);
    if (d <= bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

/** Snaps a single value: to other rooms' corners first, otherwise to the grid. */
export function snapScalar(v: number, axis: "x" | "y", ctx: SnapContext): { value: number; guide?: number } {
  if (!ctx.enabled) return { value: mm(v) };
  const hit = nearest(axis === "x" ? ctx.xs : ctx.ys, v, ctx.radius);
  if (hit !== undefined) return { value: hit, guide: hit };
  return { value: snapToGrid(v, ctx.grid) };
}

export function snapPoint(p: Point, ctx: SnapContext): { point: Point } & SnapResult {
  const x = snapScalar(p[0], "x", ctx);
  const y = snapScalar(p[1], "y", ctx);
  return { point: [x.value, y.value], guideX: x.guide, guideY: y.guide };
}

/**
 * Snaps the translation of a point set: each axis aligns with the nearest corner
 * of another room, otherwise the first point snaps to the grid.
 */
export function snapOffset(points: Point[], dx: number, dy: number, ctx: SnapContext): { dx: number; dy: number } & SnapResult {
  if (!ctx.enabled) return { dx: mm(dx), dy: mm(dy) };
  const axis = (delta: number, idx: 0 | 1, values: number[]) => {
    let best: { delta: number; guide: number } | undefined;
    let bestD = ctx.radius;
    for (const p of points) {
      const moved = p[idx] + delta;
      const hit = nearest(values, moved, bestD);
      if (hit !== undefined) {
        bestD = Math.abs(hit - moved);
        best = { delta: hit - p[idx], guide: hit };
      }
    }
    if (best) return best;
    const anchor = points[0][idx];
    return { delta: snapToGrid(anchor + delta, ctx.grid) - anchor, guide: undefined };
  };
  const x = axis(dx, 0, ctx.xs);
  const y = axis(dy, 1, ctx.ys);
  return { dx: mm(x.delta), dy: mm(y.delta), guideX: x.guide, guideY: y.guide };
}

export function translate(points: Point[], dx: number, dy: number): Point[] {
  return points.map(([x, y]) => [mm(x + dx), mm(y + dy)]);
}

/**
 * Moves edge i (from point i to i+1) in parallel. Axis-aligned edges snap the new
 * value; slanted edges follow their normal.
 */
export function moveEdge(points: Point[], i: number, pointer: Point, start: Point, ctx: SnapContext): { points: Point[] } & SnapResult {
  const j = (i + 1) % points.length;
  const a = points[i];
  const b = points[j];
  const out = points.map((p) => [...p] as Point);
  if (Math.abs(a[1] - b[1]) < 1e-6) {
    const s = snapScalar(a[1] + (pointer[1] - start[1]), "y", ctx);
    out[i][1] = s.value;
    out[j][1] = s.value;
    return { points: out, guideY: s.guide };
  }
  if (Math.abs(a[0] - b[0]) < 1e-6) {
    const s = snapScalar(a[0] + (pointer[0] - start[0]), "x", ctx);
    out[i][0] = s.value;
    out[j][0] = s.value;
    return { points: out, guideX: s.guide };
  }
  const len = edgeLength(a, b) || 1;
  const nx = -(b[1] - a[1]) / len;
  const ny = (b[0] - a[0]) / len;
  let d = (pointer[0] - start[0]) * nx + (pointer[1] - start[1]) * ny;
  if (ctx.enabled) d = snapToGrid(d, ctx.grid);
  out[i] = [mm(a[0] + nx * d), mm(a[1] + ny * d)];
  out[j] = [mm(b[0] + nx * d), mm(b[1] + ny * d)];
  return { points: out };
}

/** Scales the bounding box to a new width/height (top left stays fixed). */
export function resizeTo(points: Point[], width: number, height: number): Point[] {
  const box = bbox(points);
  const w = box.maxX - box.minX || 1;
  const h = box.maxY - box.minY || 1;
  return points.map(([x, y]) => [mm(box.minX + ((x - box.minX) * width) / w), mm(box.minY + ((y - box.minY) * height) / h)]);
}

/** Moves the bounding box to a new top left position. */
export function moveTo(points: Point[], x: number, y: number): Point[] {
  const box = bbox(points);
  return translate(points, x - box.minX, y - box.minY);
}

/** Removes consecutive duplicate points. */
export function dedupe(points: Point[]): Point[] {
  return points.filter((p, i) => {
    const q = points[(i + 1) % points.length];
    return Math.abs(p[0] - q[0]) > 1e-6 || Math.abs(p[1] - q[1]) > 1e-6;
  });
}

// ---------------------------------------------------------------- Furniture

/** Corners of a furniture footprint (rotation in degrees, clockwise as in SVG). */
export function footprint(pos: Point, size: [number, number], rotation: number): Point[] {
  const r = (rotation * Math.PI) / 180;
  const c = Math.cos(r);
  const s = Math.sin(r);
  const [hw, hd] = [size[0] / 2, size[1] / 2];
  return [
    [-hw, -hd],
    [hw, -hd],
    [hw, hd],
    [-hw, hd],
  ].map(([x, y]) => [pos[0] + x * c - y * s, pos[1] + x * s + y * c] as Point);
}

/**
 * Pushes furniture flush against nearby walls (inner wall face). Snaps to at most
 * two walls with different directions, e.g. into a corner.
 */
export function snapToWalls(pos: Point, size: [number, number], rotation: number, rooms: Room[], thickness: number, tolerance: number): Point {
  const half = thickness / 2;
  let p: Point = [pos[0], pos[1]];
  const used: [number, number][] = [];
  for (let pass = 0; pass < 2; pass++) {
    const corners = footprint(p, size, rotation);
    let best: { shift: number; nx: number; ny: number } | undefined;
    for (const room of rooms) {
      const pts = room.points;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (len < 0.05) continue;
        const ux = (b[0] - a[0]) / len;
        const uy = (b[1] - a[1]) / len;
        let nx = -uy;
        let ny = ux;
        if (used.some(([x, y]) => Math.abs(x * nx + y * ny) > 0.9)) continue;
        // Normal towards the furniture centre
        const side = (p[0] - a[0]) * nx + (p[1] - a[1]) * ny;
        if (side < 0) [nx, ny] = [-nx, -ny];
        // Footprint must overlap the wall along its direction
        const ts = corners.map((q) => (q[0] - a[0]) * ux + (q[1] - a[1]) * uy);
        if (Math.max(...ts) < 0.05 || Math.min(...ts) > len - 0.05) continue;
        const gap = Math.min(...corners.map((q) => (q[0] - a[0]) * nx + (q[1] - a[1]) * ny));
        const shift = half - gap;
        if (Math.abs(shift) <= tolerance && (!best || Math.abs(shift) < Math.abs(best.shift))) best = { shift, nx, ny };
      }
    }
    if (!best) break;
    p = [mm(p[0] + best.nx * best.shift), mm(p[1] + best.ny * best.shift)];
    used.push([best.nx, best.ny]);
  }
  return p;
}

// ---------------------------------------------------------------- Walls

/** Devices within this distance (m) of a wall are mounted on it (rotation 0). */
export const WALL_MOUNT_DIST = 0.7;
/** Radiator depth (m). */
export const RADIATOR_DEPTH = 0.09;

/** Nearest wall (room edge) to a point: direction, foot point, normal towards the point. */
export function nearestWall(rooms: Room[], p: Point): { angle: number; foot: Point; nx: number; ny: number; dist: number } | undefined {
  let best: { angle: number; foot: Point; nx: number; ny: number; dist: number } | undefined;
  for (const room of rooms) {
    const pts = room.points;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      const pr = projectOnSegment(p, a, b);
      if (!best || pr.dist < best.dist) {
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const ux = (b[0] - a[0]) / len;
        const uy = (b[1] - a[1]) / len;
        let nx = -uy;
        let ny = ux;
        if ((p[0] - pr.point[0]) * nx + (p[1] - pr.point[1]) * ny < 0) {
          nx = -nx;
          ny = -ny;
        }
        best = { angle: Math.atan2(-uy, ux), foot: pr.point, nx, ny, dist: pr.dist };
      }
    }
  }
  return best;
}
