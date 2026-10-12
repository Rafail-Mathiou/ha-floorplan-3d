// Builds the three.js geometry from the plan: floors per room, walls (one mesh), base.
// Doors, windows and devices: see objects.ts.
import {
  Box3,
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  Shape,
  Vector2,
  Vector3,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

import { projectOnSegment } from "../editor/geometry";
import type { PlanData, Point } from "../model";
import { cutawayMaterial, type CutUniforms } from "./cutaway";
import { buildWalls } from "./walls";

const FLOOR_DEPTH = 0.08;

export interface BuiltPlan {
  group: Group;
  floors: Map<string, Mesh<BufferGeometry, MeshLambertMaterial>>;
  walls?: Mesh;
  /** Wall pieces that are never lowered (wall-mounted devices with keep_wall). */
  kept: [Point, Point][];
  box: Box3;
  dispose(): void;
}

/**
 * `cut`: uniforms for the cutaway walls (see cutaway.ts); `keep`: points on walls
 * whose piece must never be lowered.
 */
export function buildPlan(plan: PlanData, cut?: CutUniforms, keep: Point[] = []): BuiltPlan {
  const group = new Group();
  const floors = new Map<string, Mesh<BufferGeometry, MeshLambertMaterial>>();
  const disposables: { dispose(): void }[] = [];
  const s = plan.settings;

  // Floors: one slab per room, top at y = 0
  for (const room of plan.rooms) {
    const shape = new Shape(room.points.map(([x, y]) => new Vector2(x, -y)));
    const geo = new ExtrudeGeometry(shape, { depth: FLOOR_DEPTH, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -FLOOR_DEPTH, 0);
    const mat = new MeshLambertMaterial({ color: 0x4b5562 });
    const mesh = new Mesh(geo, mat);
    mesh.userData.roomId = room.id;
    floors.set(room.id, mesh);
    group.add(mesh);
    disposables.push(geo, mat);
  }

  // Walls and glass
  const { pieces } = buildWalls(plan.rooms, plan.openings, { height: s.wall_height, thickness: s.wall_thickness });
  const kept: [Point, Point][] = [];
  const wallGeos = pieces.map((p) => {
    const dx = p.b[0] - p.a[0];
    const dz = p.b[1] - p.a[1];
    const len = Math.hypot(dx, dz);
    const g = new BoxGeometry(len, p.y1 - p.y0, s.wall_thickness);
    g.rotateY(Math.atan2(-dz, dx));
    g.translate((p.a[0] + p.b[0]) / 2, (p.y0 + p.y1) / 2, (p.a[1] + p.b[1]) / 2);
    // Piece centre and normal for the cutaway shader
    const wall = [(p.a[0] + p.b[0]) / 2, (p.a[1] + p.b[1]) / 2, -dz / len, dx / len];
    const n = g.getAttribute("position").count;
    g.setAttribute("aWall", new Float32BufferAttribute(Array.from({ length: n }, () => wall).flat(), 4));
    const isKept = keep.some((k) => projectOnSegment(k, p.a, p.b).dist < s.wall_thickness / 2 + 0.1);
    if (isKept) kept.push([p.a, p.b]);
    g.setAttribute("aKeep", new Float32BufferAttribute(new Array(n).fill(isKept ? 1 : 0), 1));
    return g;
  });
  let walls: Mesh | undefined;
  if (wallGeos.length) {
    const geo = mergeGeometries(wallGeos);
    wallGeos.forEach((g) => g.dispose());
    const mat = new MeshLambertMaterial({ color: 0xdfe4ea });
    if (cut) cutawayMaterial(mat, cut);
    walls = new Mesh(geo, mat);
    group.add(walls);
    disposables.push(geo, mat);
  }

  const box = new Box3();
  for (const room of plan.rooms) {
    for (const [x, y] of room.points) box.expandByPoint(new Vector3(x, 0, y));
  }
  if (!box.isEmpty()) {
    box.expandByPoint(new Vector3(box.min.x, s.wall_height, box.min.z));
    // Base slab under the model
    const size = box.getSize(new Vector3());
    const margin = 0.6;
    const geo = new BoxGeometry(size.x + margin * 2, 0.06, size.z + margin * 2);
    geo.translate((box.min.x + box.max.x) / 2, -FLOOR_DEPTH - 0.03, (box.min.z + box.max.z) / 2);
    const mat = new MeshLambertMaterial({ color: 0x232a33 });
    group.add(new Mesh(geo, mat));
    disposables.push(geo, mat);
  }

  return {
    group,
    floors,
    walls,
    kept,
    box,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
