// Furniture in 3D: simple low-poly models from boxes and cylinders. Local axes: x along
// the width, z along the depth with the front (room side) at +z, y up.
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
  type BufferGeometry,
  type Material,
  type Object3D,
} from "three";

import { furnitureEntry } from "../catalog";
import type { Furniture } from "../model";

/** Collects geometries and materials for disposal. */
export interface Disposables {
  add<T extends BufferGeometry | Material>(x: T): T;
}

const WOOD = 0xa88b6a;
const LIGHT_WOOD = 0xc9ad88;
const FABRIC = 0x6f7886;
const FABRIC_DARK = 0x656d7a;
const WHITE = 0xeceae6;
const CABINET = 0xd8d2c8;
const KITCHEN = 0xdedcd7;
const COUNTER = 0x4a4f57;
const DARK = 0x3a3f46;
const STEEL = 0xb4bac1;
const GLASS = 0x9fd4ea;

/** `wallHeight`: stairs lead up or down one storey. */
export function buildFurniture(f: Furniture, bin: Disposables, wallHeight = 2.5): Object3D {
  const root = new Group();
  root.position.set(f.pos[0], 0, f.pos[1]);
  root.rotation.y = (-f.rotation * Math.PI) / 180;
  const [w, d] = f.size;
  const entry = furnitureEntry(f.type);
  const h = entry.height;
  const mats = new Map<number, MeshLambertMaterial>();
  const mat = (c: number) => {
    let m = mats.get(c);
    if (!m) mats.set(c, (m = bin.add(new MeshLambertMaterial({ color: c }))));
    return m;
  };
  let glassMat: MeshBasicMaterial | undefined;
  const glass = () =>
    (glassMat ??= bin.add(new MeshBasicMaterial({ color: GLASS, transparent: true, opacity: 0.25, side: DoubleSide, depthWrite: false })));
  /** Box: centre x/z (local), bottom y0, size bw × bh × bd. */
  const box = (x: number, y0: number, z: number, bw: number, bh: number, bd: number, color: number | Material) => {
    const m = new Mesh(
      bin.add(new BoxGeometry(Math.max(0.01, bw), Math.max(0.005, bh), Math.max(0.01, bd))),
      typeof color === "number" ? mat(color) : color,
    );
    m.position.set(x, y0 + bh / 2, z);
    root.add(m);
    return m;
  };
  /** Cylinder (or ellipse with sx/sz): centre x/z, bottom y0, radius r, height ch. */
  const cyl = (x: number, y0: number, z: number, r: number, ch: number, color: number, segments = 20) => {
    const m = new Mesh(bin.add(new CylinderGeometry(r, r, Math.max(0.005, ch), segments)), mat(color));
    m.position.set(x, y0 + ch / 2, z);
    root.add(m);
    return m;
  };
  const legs = (top: number, color: number, inset = 0.05, lw = w, ld = d, cx = 0, cz = 0) => {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(cx + sx * (lw / 2 - inset), 0, cz + sz * (ld / 2 - inset), 0.05, top, 0.05, color);
  };
  /** Drawer or door fronts on the front side. */
  const fronts = (y0: number, fh: number, rows: number, cols: number, color: number) => {
    const cw = (w - 0.04) / cols;
    const rh = fh / rows;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) box(-w / 2 + 0.02 + cw * (c + 0.5), y0 + r * rh + 0.015, d / 2 + 0.005, cw - 0.025, rh - 0.03, 0.01, color);
  };
  const sofa = (sw: number, sd: number, cx: number, cz: number) => {
    box(cx, 0, cz + 0.05, sw, 0.42, sd - 0.1, FABRIC);
    box(cx, 0, cz - sd / 2 + 0.1, sw, 0.8, 0.2, FABRIC);
  };
  const bed = (pillows: number) => {
    box(0, 0, 0, w, 0.28, d, WOOD);
    box(0, 0.28, 0.04, w - 0.06, 0.2, d - 0.12, WHITE);
    const pw = (w - 0.1 * (pillows + 1)) / pillows;
    for (let i = 0; i < pillows; i++) box(-w / 2 + 0.1 + pw / 2 + i * (pw + 0.1), 0.48, -d / 2 + 0.26, pw, 0.1, 0.3, 0xf6f4f0);
    box(0, 0.48, d * 0.14, w - 0.04, 0.05, d * 0.66, 0x8aa2bd);
    box(0, 0, -d / 2 + 0.03, w, 0.9, 0.06, WOOD);
  };
  /** L shape: arm along the back (full width) and along the right side (full depth). */
  const arm = entry.arm ?? 0.6;

  switch (f.type) {
    case "bed":
    case "bed_king":
      bed(2);
      break;
    case "bed_single":
      bed(1);
      break;
    case "bed_bunk": {
      for (const y of [0.25, 1.25]) {
        box(0, y, 0, w, 0.06, d, WOOD);
        box(0, y + 0.06, 0, w - 0.06, 0.15, d - 0.06, WHITE);
        box(0, y + 0.21, d * 0.12, w - 0.08, 0.04, d * 0.66, y < 1 ? 0x8aa2bd : 0x9bb88f);
      }
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(sx * (w / 2 - 0.03), 0, sz * (d / 2 - 0.03), 0.06, h, 0.06, WOOD);
      box(w / 2 - 0.03, 1.31, 0, 0.04, 0.25, d - 0.06, WOOD);
      box(-w / 2 + 0.03, 1.31, 0, 0.04, 0.25, d - 0.06, WOOD);
      // Ladder at the foot end
      for (let i = 0; i < 4; i++) box(w / 2 + 0.02, 0.3 + i * 0.3, d / 2 - 0.25, 0.03, 0.03, 0.35, LIGHT_WOOD);
      break;
    }
    case "crib": {
      box(0, 0.25, 0, w - 0.04, 0.1, d - 0.04, WHITE);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(sx * (w / 2 - 0.025), 0, sz * (d / 2 - 0.025), 0.05, h, 0.05, WHITE);
      for (const sz of [-1, 1]) box(0, 0.35, sz * (d / 2 - 0.02), w - 0.05, h - 0.4, 0.02, 0xf4f2ee);
      for (const sx of [-1, 1]) box(sx * (w / 2 - 0.02), 0.35, 0, 0.02, h - 0.4, d - 0.05, 0xf4f2ee);
      break;
    }
    case "sofa":
    case "sofa_2":
    case "armchair": {
      sofa(w, d, 0, 0);
      box(-w / 2 + 0.09, 0, 0.05, 0.18, 0.6, d - 0.1, FABRIC_DARK);
      box(w / 2 - 0.09, 0, 0.05, 0.18, 0.6, d - 0.1, FABRIC_DARK);
      break;
    }
    case "sofa_corner": {
      // Seat along the back and a chaise on the right
      box(-arm / 2, 0, -d / 2 + arm / 2 + 0.05, w - arm, 0.42, arm - 0.1, FABRIC);
      box(w / 2 - arm / 2, 0, 0.05, arm, 0.42, d - 0.1, FABRIC);
      box(0, 0, -d / 2 + 0.1, w, 0.8, 0.2, FABRIC);
      box(-w / 2 + 0.09, 0, -d / 2 + arm / 2 + 0.05, 0.18, 0.6, arm - 0.1, FABRIC_DARK);
      box(w / 2 - 0.09, 0, 0.05, 0.18, 0.6, d - 0.1, FABRIC_DARK);
      break;
    }
    case "pouf":
      cyl(0, 0, 0, Math.min(w, d) / 2, h, FABRIC, 24).scale.set(w / Math.min(w, d), 1, d / Math.min(w, d));
      break;
    case "lounger": {
      box(0, 0, 0, w, 0.12, d, LIGHT_WOOD);
      box(0, 0.12, 0.25, w - 0.06, 0.08, d - 0.6, 0xe9e1cf);
      const back = box(0, 0.12, -d / 2 + 0.35, w - 0.06, 0.08, 0.7, 0xe9e1cf);
      back.rotation.x = 0.7;
      back.position.y += 0.25;
      break;
    }
    case "table":
    case "table_large":
    case "coffee_table":
    case "desk":
    case "console": {
      const top = f.type === "desk" ? 0xd9d6d0 : WOOD;
      box(0, h - 0.04, 0, w, 0.04, d, top);
      legs(h - 0.04, DARK, f.type === "console" ? 0.04 : 0.05);
      break;
    }
    case "desk_corner": {
      box(-arm / 2, h - 0.04, -d / 2 + arm / 2, w - arm, 0.04, arm, 0xd9d6d0);
      box(w / 2 - arm / 2, h - 0.04, 0, arm, 0.04, d, 0xd9d6d0);
      for (const [x, z] of [
        [-w / 2 + 0.05, -d / 2 + 0.05],
        [-w / 2 + 0.05, -d / 2 + arm - 0.05],
        [w / 2 - 0.05, -d / 2 + 0.05],
        [w / 2 - 0.05, d / 2 - 0.05],
        [w / 2 - arm + 0.05, d / 2 - 0.05],
      ])
        box(x, 0, z, 0.05, h - 0.04, 0.05, DARK);
      break;
    }
    case "vanity": {
      box(0, h - 0.04, 0, w, 0.04, d, WHITE);
      legs(h - 0.04, WHITE, 0.04);
      box(0, h, -d / 2 + 0.02, w * 0.7, 0.6, 0.02, 0xcfe3ea);
      box(0, h - 0.18, 0.02, w - 0.1, 0.12, d - 0.08, CABINET);
      break;
    }
    case "table_round":
    case "side_table": {
      const top = cyl(0, h - 0.03, 0, 0.5, 0.03, WOOD, 32);
      top.scale.set(w, 1, d);
      cyl(0, 0.02, 0, 0.03, h - 0.05, DARK, 10);
      cyl(0, 0, 0, Math.min(w, d) * 0.28, 0.02, DARK);
      break;
    }
    case "bar_stool": {
      cyl(0, h - 0.05, 0, Math.min(w, d) / 2, 0.05, FABRIC_DARK);
      cyl(0, 0.02, 0, 0.025, h - 0.07, STEEL, 10);
      cyl(0, 0, 0, Math.min(w, d) * 0.4, 0.02, STEEL);
      cyl(0, 0.28, 0, Math.min(w, d) * 0.36, 0.015, STEEL, 16);
      break;
    }
    case "chair": {
      box(0, 0.42, 0.03, w, 0.05, d - 0.06, WOOD);
      box(0, 0.42, -d / 2 + 0.03, w, 0.48, 0.04, WOOD);
      legs(0.42, DARK);
      break;
    }
    case "office_chair": {
      const r = Math.min(w, d) / 2;
      for (let i = 0; i < 5; i++) {
        const leg = box(0, 0.03, 0, 0.04, 0.03, r * 0.95, DARK);
        leg.rotation.y = (i * 2 * Math.PI) / 5;
        leg.position.set(Math.sin(leg.rotation.y) * r * 0.45, 0.045, Math.cos(leg.rotation.y) * r * 0.45);
      }
      cyl(0, 0.06, 0, 0.03, 0.36, STEEL, 10);
      box(0, 0.42, 0.02, w * 0.85, 0.08, d * 0.8, FABRIC_DARK);
      box(0, 0.5, -d / 2 + 0.08, w * 0.8, 0.55, 0.06, FABRIC_DARK);
      break;
    }
    case "bench": {
      box(0, 0.4, 0, w, 0.05, d, WOOD);
      for (const sx of [-1, 1]) box(sx * (w / 2 - 0.06), 0, 0, 0.05, 0.4, d - 0.04, DARK);
      break;
    }
    case "nightstand":
    case "dresser": {
      box(0, 0.06, 0, w, h - 0.06, d, f.type === "dresser" ? CABINET : WOOD);
      legs(0.06, DARK);
      fronts(0.08, h - 0.1, f.type === "dresser" ? 3 : 2, 1, 0xefebe4);
      break;
    }
    case "filing_cabinet":
      box(0, 0, 0, w, h, d, 0x9aa0a8);
      fronts(0.02, h - 0.04, 3, 1, 0xb1b6bd);
      break;
    case "shoe_cabinet":
      box(0, 0, 0, w, h, d, CABINET);
      fronts(0.02, h - 0.04, 2, 2, 0xefebe4);
      break;
    case "toy_box":
      box(0, 0, 0, w, h - 0.04, d, 0xd98c5f);
      box(0, h - 0.04, 0, w + 0.02, 0.04, d + 0.02, 0xe8b04f);
      break;
    case "wardrobe":
    case "wardrobe_small":
      box(0, 0, 0, w, h, d, CABINET);
      fronts(0.03, h - 0.06, 1, Math.max(1, Math.round(w / 0.5)), 0xe2ddd4);
      break;
    case "tall_cabinet":
      box(0, 0, 0, w, h, d, KITCHEN);
      fronts(0.1, h - 0.12, 2, 1, 0xe9e7e2);
      break;
    case "bookcase":
    case "shelf": {
      const t = 0.025;
      box(0, 0, -d / 2 + 0.01, w, h, 0.02, WOOD);
      for (const sx of [-1, 1]) box(sx * (w / 2 - t / 2), 0, 0, t, h, d, WOOD);
      const n = Math.max(2, Math.round(h / 0.38));
      const colors = [0x8e5a4f, 0x4f6f8e, 0xc5a35a, 0x5f8a62, 0x7a6a8e];
      for (let i = 0; i <= n; i++) {
        const y = (i * (h - t)) / n;
        box(0, y, 0, w - 2 * t, t, d, WOOD);
        if (i < n && f.type === "bookcase") {
          // A few books per shelf
          let x = -w / 2 + t + 0.03;
          for (let k = 0; x < w / 2 - t - 0.1; k++) {
            const bw = 0.03 + ((k * 7) % 4) * 0.008;
            const bh = Math.min((h - t) / n - 0.06, 0.22 + ((k * 5) % 3) * 0.03);
            box(x + bw / 2, y + t, 0.02, bw, bh, d * 0.7, colors[(i + k) % colors.length]);
            x += bw + 0.006 + (k % 5 === 4 ? 0.08 : 0);
          }
        }
      }
      break;
    }
    case "vitrine": {
      box(0, 0, 0, w, 0.5, d, WOOD);
      box(0, 0.5, -d / 2 + 0.01, w, h - 0.55, 0.02, WOOD);
      for (const sx of [-1, 1]) box(sx * (w / 2 - 0.015), 0.5, 0, 0.03, h - 0.55, d, WOOD);
      box(0, h - 0.05, 0, w, 0.05, d, WOOD);
      box(0, 0.5, d / 2 - 0.01, w - 0.06, h - 0.55, 0.01, glass());
      for (const y of [0.9, 1.3]) box(0, y, 0, w - 0.06, 0.015, d - 0.04, 0xcfe3ea);
      break;
    }
    case "sideboard":
    case "tv_board":
      box(0, 0.08, 0, w, h - 0.08, d, f.type === "tv_board" ? DARK : WOOD);
      legs(0.08, DARK);
      fronts(0.1, h - 0.12, 1, Math.max(2, Math.round(w / 0.6)), f.type === "tv_board" ? 0x4a5058 : 0xbfa27f);
      break;
    case "fireplace": {
      box(0, 0, 0, w, h, d, 0xcfc9c0);
      box(0, 0.12, d / 2 - 0.08, w * 0.55, h * 0.5, 0.17, 0x26282b);
      box(0, h, 0, w + 0.08, 0.06, d + 0.06, WOOD);
      break;
    }
    case "piano": {
      box(0, 0, -d / 2 + d * 0.3, w, h, d * 0.6, 0x1d1f22);
      box(0, 0.7, d * 0.25, w, 0.06, d * 0.5, 0x1d1f22);
      box(0, 0.76, d * 0.28, w - 0.12, 0.015, d * 0.3, 0xf2f2f2);
      for (const sx of [-1, 1]) box(sx * (w / 2 - 0.04), 0, d / 2 - 0.06, 0.06, 0.7, 0.06, 0x1d1f22);
      break;
    }
    case "kitchen":
    case "kitchen_island": {
      box(0, 0, 0, w, h - 0.04, d, KITCHEN);
      box(0, h - 0.04, 0, w + (f.type === "kitchen_island" ? 0.06 : 0), 0.04, d + (f.type === "kitchen_island" ? 0.1 : 0), COUNTER);
      if (f.type === "kitchen") box(-w / 2 + 0.4, h, 0, 0.5, 0.005, 0.4, 0x9aa3ad);
      fronts(0.1, h - 0.16, 1, Math.max(2, Math.round(w / 0.6)), 0xe9e7e2);
      break;
    }
    case "kitchen_corner": {
      box(-arm / 2, 0, -d / 2 + arm / 2, w - arm, h - 0.04, arm, KITCHEN);
      box(w / 2 - arm / 2, 0, 0, arm, h - 0.04, d, KITCHEN);
      box(-arm / 2, h - 0.04, -d / 2 + arm / 2, w - arm, 0.04, arm, COUNTER);
      box(w / 2 - arm / 2, h - 0.04, 0, arm, 0.04, d, COUNTER);
      box(-w / 2 + 0.45, h, -d / 2 + arm / 2, 0.5, 0.005, 0.4, 0x9aa3ad);
      for (const [dx, dz] of [
        [-0.12, -0.12],
        [0.12, -0.12],
        [-0.12, 0.12],
        [0.12, 0.12],
      ])
        cyl(w / 2 - arm / 2 + dx, h, d / 2 - 0.45 + dz, 0.08, 0.008, 0x1c1e21);
      break;
    }
    case "stove": {
      box(0, 0, 0, w, h - 0.03, d, WHITE);
      box(0, h - 0.03, 0, w, 0.03, d, 0x1c1e21);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) cyl(sx * w * 0.22, h, sz * d * 0.22, Math.min(w, d) * 0.12, 0.006, 0x50555c);
      box(0, 0.12, d / 2 + 0.005, w - 0.08, h * 0.5, 0.01, 0x2a2d31);
      break;
    }
    case "dishwasher":
      box(0, 0, 0, w, h, d, 0xd9dce0);
      box(0, h - 0.12, d / 2 + 0.01, w * 0.6, 0.03, 0.02, STEEL);
      break;
    case "fridge":
      box(0, 0, 0, w, h, d, 0xe4e6e9);
      box(w / 2 - 0.06, h * 0.45, d / 2 + 0.015, 0.03, 0.4, 0.03, STEEL);
      break;
    case "washer":
    case "dryer": {
      box(0, 0, 0, w, h, d, WHITE);
      const door = cyl(0, 0, 0, Math.min(w, d) * 0.3, 0.03, f.type === "dryer" ? 0x9aa3ad : 0x7f8a96, 24);
      door.rotation.x = Math.PI / 2;
      door.position.set(0, h * 0.45, d / 2 + 0.01);
      break;
    }
    case "bathtub": {
      box(0, 0, 0, w, h, d, WHITE);
      box(0, h, 0, w - 0.16, 0.005, d - 0.16, 0xb9d3e3);
      break;
    }
    case "shower": {
      box(0, 0, 0, w, 0.05, d, WHITE);
      for (const [x, z, rw, rd] of [
        [0, d / 2, w, 0.01],
        [w / 2, 0, 0.01, d],
      ] as const)
        box(x, 0.05, z, rw, 1.95, rd, glass());
      break;
    }
    case "toilet":
    case "bidet": {
      box(0, 0, 0.06, w * 0.9, 0.4, d - 0.18, WHITE);
      if (f.type === "toilet") box(0, 0, -d / 2 + 0.09, w, 0.8, 0.18, WHITE);
      else box(0, 0, -d / 2 + 0.05, w * 0.8, 0.42, 0.1, WHITE);
      break;
    }
    case "sink":
    case "sink_double": {
      box(0, 0, 0, w, h - 0.12, d, WOOD);
      box(0, h - 0.12, 0, w, 0.12, d, WHITE);
      const n = f.type === "sink_double" ? 2 : 1;
      for (let i = 0; i < n; i++) box(-w / 2 + (w / n) * (i + 0.5), h, 0.03, Math.min(0.42, w / n - 0.12), 0.005, d - 0.16, 0xc9d9e3);
      break;
    }
    case "coat_rack": {
      cyl(0, 0, 0, Math.min(w, d) * 0.4, 0.03, DARK);
      cyl(0, 0.03, 0, 0.02, h - 0.03, WOOD, 10);
      for (let i = 0; i < 4; i++) {
        const hook = box(0, h - 0.18, 0, 0.02, 0.02, Math.min(w, d) * 0.5, WOOD);
        hook.rotation.y = (i * Math.PI) / 2;
        hook.rotation.x = 0.5;
      }
      break;
    }
    case "aquarium": {
      box(0, 0, 0, w, 0.7, d, WOOD);
      box(0, 0.7, 0, w - 0.02, h - 0.75, d - 0.02, glass());
      box(0, 0.7, 0, w - 0.06, (h - 0.75) * 0.75, d - 0.06, bin.add(new MeshBasicMaterial({ color: 0x3f8fb5, transparent: true, opacity: 0.35, depthWrite: false })));
      box(0, h - 0.05, 0, w, 0.05, d, DARK);
      break;
    }
    case "stairs": {
      // Open flight rising from the front (+z) to the back
      const n = Math.max(3, Math.round(wallHeight / 0.18));
      const rise = wallHeight / n;
      const run = d / n;
      for (let i = 0; i < n; i++) box(0, rise * (i + 1) - 0.04, d / 2 - run * (i + 0.5), w - 0.08, 0.04, run + 0.03, LIGHT_WOOD);
      const len = Math.hypot(d, wallHeight);
      const slope = Math.atan2(wallHeight, d);
      const incline = (x: number, y: number, bw: number, bh: number, color: number) => {
        const m = box(x, 0, 0, bw, bh, len, color);
        m.rotation.x = slope;
        m.position.y = y;
        return m;
      };
      for (const sx of [-1, 1]) incline(sx * (w / 2 - 0.025), wallHeight / 2 - 0.05, 0.05, 0.24, WOOD);
      incline(w / 2 - 0.02, wallHeight / 2 + 0.9, 0.04, 0.04, DARK);
      box(w / 2 - 0.02, 0, d / 2 - 0.05, 0.04, 0.95, 0.04, DARK);
      box(w / 2 - 0.02, wallHeight, -d / 2 + 0.05, 0.04, 0.9, 0.04, DARK);
      break;
    }
    case "stairs_down": {
      // Opening in the floor with steps going down towards the back
      const n = Math.max(3, Math.round(wallHeight / 0.18));
      const run = d / n;
      box(0, 0.001, 0, w, 0.004, d, 0x1b1e22);
      for (let i = 0; i < n; i++) {
        const k = 1 - i / n;
        const shade = Math.round(0x22 + 0x60 * k);
        box(0, 0.005, d / 2 - run * (i + 0.5), w - 0.1, 0.003, run * 0.62, (shade << 16) | (shade << 8) | (shade + 8));
      }
      // Guard rail along both long sides and the back
      for (const sx of [-1, 1]) {
        box(sx * (w / 2 - 0.02), 0.9, 0, 0.04, 0.04, d, DARK);
        for (const z of [-d / 2 + 0.04, 0, d / 2 - 0.04]) box(sx * (w / 2 - 0.02), 0, z, 0.03, 0.9, 0.03, DARK);
      }
      box(0, 0.9, -d / 2 + 0.02, w, 0.04, 0.04, DARK);
      break;
    }
    case "stairs_spiral": {
      const radius = Math.min(w, d) / 2;
      const n = Math.max(6, Math.round(wallHeight / 0.2));
      const rise = wallHeight / n;
      cyl(0, 0, 0, 0.05, wallHeight + 0.9, STEEL, 12);
      const railAt = (i: number): [number, number, number] => {
        const a = i * 0.42 + 0.1;
        return [Math.cos(a) * (radius - 0.04), rise * (i + 1) + 0.9, Math.sin(a) * (radius - 0.04)];
      };
      for (let i = 0; i < n; i++) {
        const a = i * 0.42;
        const tread = box(0, rise * (i + 1) - 0.04, 0, radius - 0.05, 0.04, radius * 0.5, LIGHT_WOOD);
        tread.rotation.y = -a;
        tread.position.x = Math.cos(a) * (radius / 2);
        tread.position.z = Math.sin(a) * (radius / 2);
        // Baluster and a handrail piece to the next step
        const [px, py, pz] = railAt(i);
        box(px, py - 0.9, pz, 0.02, 0.9, 0.02, DARK);
        if (i < n - 1) {
          const [qx, qy, qz] = railAt(i + 1);
          const [dx, dy, dz] = [qx - px, qy - py, qz - pz];
          const rail = new Mesh(bin.add(new BoxGeometry(0.035, 0.035, Math.hypot(dx, dy, dz))), mat(DARK));
          rail.position.set((px + qx) / 2, (py + qy) / 2, (pz + qz) / 2);
          rail.rotation.order = "YXZ";
          rail.rotation.y = Math.atan2(dx, dz);
          rail.rotation.x = -Math.atan2(dy, Math.hypot(dx, dz));
          root.add(rail);
        }
      }
      break;
    }
    case "rug":
      box(0, 0, 0, w, 0.012, d, 0x7d879a);
      break;
    case "rug_round": {
      const rug = cyl(0, 0, 0, 0.5, 0.012, 0x8a7d9a, 32);
      rug.scale.set(w, 1, d);
      break;
    }
    case "plant": {
      cyl(0, 0, 0, w * 0.3, 0.35, 0x9b6b4a, 16);
      const leaves = new Mesh(bin.add(new SphereGeometry(Math.min(w, d) * 0.5, 14, 10)), mat(0x5f9a62));
      leaves.position.y = 0.35 + Math.min(w, d) * 0.45;
      leaves.scale.y = (h - 0.35) / Math.min(w, d);
      root.add(leaves);
      break;
    }
    default:
      box(0, 0, 0, w, h, d, WOOD);
  }
  return root;
}
