// Derives walls from room edges: shared edges once, doors/windows cut out.
// Pure geometry (no three.js), units in metres, plan coordinates (x, y).
import type { Opening, Point, Room } from "../model";

/** A wall piece: section [t0, t1] on a line, height [y0, y1]. */
export interface WallPiece {
  /** Start and end point in the plan. */
  a: Point;
  b: Point;
  y0: number;
  y1: number;
}

export interface GlassPane {
  a: Point;
  b: Point;
  y0: number;
  y1: number;
}

export interface WallOptions {
  height: number;
  thickness: number;
  doorHeight?: number;
  sillHeight?: number;
  windowTop?: number;
}

interface Line {
  /** Unit direction u and offset d of the line (p·n = d, n = (-u.y, u.x)). */
  ux: number;
  uy: number;
  d: number;
}

const EPS = 1e-3;

/** Canonical line: direction in [0°, 180°) so opposite edges coincide. */
function lineOf(a: Point, b: Point): { line: Line; t0: number; t1: number } | undefined {
  let ux = b[0] - a[0];
  let uy = b[1] - a[1];
  const len = Math.hypot(ux, uy);
  if (len < EPS) return undefined;
  ux /= len;
  uy /= len;
  if (uy < -EPS || (Math.abs(uy) <= EPS && ux < 0)) {
    ux = -ux;
    uy = -uy;
  }
  const d = -uy * a[0] + ux * a[1];
  const ta = a[0] * ux + a[1] * uy;
  const tb = b[0] * ux + b[1] * uy;
  return { line: { ux, uy, d }, t0: Math.min(ta, tb), t1: Math.max(ta, tb) };
}

const lineKey = (l: Line) => `${l.ux.toFixed(3)}|${l.uy.toFixed(3)}|${l.d.toFixed(3)}`;

const pointAt = (l: Line, t: number): Point => [-l.uy * l.d + l.ux * t, l.ux * l.d + l.uy * t];

/** Merges overlapping/touching intervals. */
function union(intervals: [number, number][]): [number, number][] {
  const sorted = [...intervals].sort((p, q) => p[0] - q[0]);
  const out: [number, number][] = [];
  for (const [s, e] of sorted) {
    const last = out.at(-1);
    if (last && s <= last[1] + EPS) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return out;
}

/** Interval minus gaps. */
function subtract(span: [number, number], gaps: [number, number][]): [number, number][] {
  let parts: [number, number][] = [span];
  for (const [gs, ge] of gaps) {
    parts = parts.flatMap(([s, e]) => {
      if (ge <= s + EPS || gs >= e - EPS) return [[s, e]];
      const res: [number, number][] = [];
      if (gs > s + EPS) res.push([s, gs]);
      if (ge < e - EPS) res.push([ge, e]);
      return res;
    });
  }
  return parts;
}

export function buildWalls(rooms: Room[], openings: Opening[], opts: WallOptions): { pieces: WallPiece[]; glass: GlassPane[] } {
  const H = opts.height;
  const half = opts.thickness / 2;
  const doorTop = Math.min(opts.doorHeight ?? 2.05, H - 0.05);
  const sill = Math.min(opts.sillHeight ?? 0.9, H - 0.2);
  const winTop = Math.min(opts.windowTop ?? 2.1, H - 0.05);

  // 1) Group all room edges by line
  const groups = new Map<string, { line: Line; spans: [number, number][] }>();
  for (const room of rooms) {
    const pts = room.points;
    for (let i = 0; i < pts.length; i++) {
      const l = lineOf(pts[i], pts[(i + 1) % pts.length]);
      if (!l) continue;
      const key = lineKey(l.line);
      const g = groups.get(key) ?? { line: l.line, spans: [] };
      g.spans.push([l.t0, l.t1]);
      groups.set(key, g);
    }
  }

  // 2) Assign openings to lines
  const gapsByLine = new Map<string, { span: [number, number]; type: Opening["type"] }[]>();
  for (const o of openings) {
    const l = lineOf(o.wall.a, o.wall.b);
    if (!l) continue;
    const key = lineKey(l.line);
    const list = gapsByLine.get(key) ?? [];
    list.push({ span: [l.t0, l.t1], type: o.type });
    gapsByLine.set(key, list);
  }

  const pieces: WallPiece[] = [];
  const glass: GlassPane[] = [];
  for (const [key, { line, spans }] of groups) {
    const gaps = gapsByLine.get(key) ?? [];
    for (const [s, e] of union(spans)) {
      // Extend the ends by half the wall thickness so corners are closed
      const span: [number, number] = [s - half, e + half];
      // Split at room corners so every piece belongs to one room edge
      const breaks = [...new Set(spans.flat())].sort((p, q) => p - q);
      for (const [ps, pe] of subtract(span, gaps.map((g) => g.span))) {
        let from = ps;
        for (const t of breaks) {
          // Not at the ends (the corner extension stays part of the end piece)
          if (t <= from + EPS || t <= ps + half + EPS || t >= pe - half - EPS) continue;
          pieces.push({ a: pointAt(line, from), b: pointAt(line, t), y0: 0, y1: H });
          from = t;
        }
        pieces.push({ a: pointAt(line, from), b: pointAt(line, pe), y0: 0, y1: H });
      }
      for (const g of gaps) {
        const gs = Math.max(g.span[0], span[0]);
        const ge = Math.min(g.span[1], span[1]);
        if (ge - gs < EPS) continue;
        const a = pointAt(line, gs);
        const b = pointAt(line, ge);
        if (g.type === "window") {
          pieces.push({ a, b, y0: 0, y1: sill });
          pieces.push({ a, b, y0: winTop, y1: H });
          glass.push({ a, b, y0: sill, y1: winTop });
        } else {
          pieces.push({ a, b, y0: doorTop, y1: H });
        }
      }
    }
  }
  return { pieces: pieces.filter((p) => p.y1 - p.y0 > EPS), glass };
}
