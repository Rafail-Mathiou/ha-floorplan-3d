// 2D glyphs for devices and furniture, shared by the editor and the 2D live map.
import { svg } from "lit";

import { furnitureEntry } from "../catalog";

import type { FurnitureType, ResolvedKind } from "../model";

export const ITEM_GLYPHS: Record<ResolvedKind, ReturnType<typeof svg>> = {
  radiator: svg`<path d="M-4 -4v8M0 -4v8M4 -4v8" />`,
  light: svg`<circle r="3.2" class="fill" />`,
  tv: svg`<rect x="-5" y="-3.5" width="10" height="7" rx="1" />`,
  sensor: svg`<path d="M-1.5 -4.5v6.2a2.2 2.2 0 103 0v-6.2a1.5 1.5 0 00-3 0z" />`,
  motion: svg`<path d="M-4 0a4 4 0 018 0M-2 0a2 2 0 014 0" />`,
  speaker: svg`<path d="M-4 -2h2l3 -3v10l-3 -3h-2z" />`,
  vacuum: svg`<circle r="4.5" /><path d="M-2.5 -1.5h5" />`,
  generic: svg`<circle r="2" class="fill" />`,
};

/** L outline: arm along the back (top) and the right side, `a` deep. */
export function lPath(w: number, d: number, a: number): string {
  const x0 = -w / 2;
  const y0 = -d / 2;
  return `M${x0} ${y0}H${-x0}V${-y0}H${-x0 - a}V${y0 + a}H${x0}Z`;
}

/** Outline of a furniture piece: rectangle, ellipse for round types, L for corner pieces. */
export function furnitureBody(type: FurnitureType, w: number, d: number) {
  const e = furnitureEntry(type);
  if (e.shape === "L") return svg`<path d=${lPath(w, d, Math.min(e.arm ?? 0.6, w * 0.9, d * 0.9))} class="body" />`;
  return e.round
    ? svg`<ellipse rx=${w / 2} ry=${d / 2} class="body" />`
    : svg`<rect x=${-w / 2} y=${-d / 2} width=${w} height=${d} rx=${Math.min(w, d) * 0.04} class="body" />`;
}

/** Simple top view per furniture type (local metres, centred on 0/0). */
export function furnitureGlyph(type: FurnitureType, w: number, d: number) {
  const x0 = -w / 2;
  const y0 = -d / 2;
  switch (type) {
    case "bed":
    case "bed_king":
    case "bed_single":
    case "bed_bunk": {
      const n = type === "bed_single" || type === "bed_bunk" ? 1 : 2;
      const pw = (w - 0.1 * (n + 1)) / n;
      return svg`${Array.from({ length: n }, (_, i) => svg`<rect x=${x0 + 0.1 + i * (pw + 0.1)} y=${y0 + 0.08} width=${pw} height="0.32" rx="0.06" class="g" />`)}
        <path d="M${x0} ${y0 + 0.55}H${-x0}" class="g" />`;
    }
    case "stairs":
    case "stairs_down": {
      // One line per step and an arrow pointing up the flight (towards the back)
      const n = Math.max(3, Math.round(d / 0.26));
      const cls = type === "stairs" ? "g" : "g dashed";
      return svg`${Array.from({ length: n - 1 }, (_, i) => svg`<path d="M${x0} ${y0 + ((i + 1) * d) / n}H${-x0}" class=${cls} />`)}
        <path d="M0 ${-y0 - 0.12}V${y0 + 0.2}M${-Math.min(0.18, w * 0.2)} ${y0 + 0.42}L0 ${y0 + 0.2}L${Math.min(0.18, w * 0.2)} ${y0 + 0.42}" class="g arrow" />`;
    }
    case "stairs_spiral": {
      const r = Math.min(w, d) / 2;
      return svg`<circle r="0.06" class="g" />${Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return svg`<path d="M${Math.cos(a) * 0.06} ${Math.sin(a) * 0.06}L${Math.cos(a) * r} ${Math.sin(a) * r}" class="g" />`;
      })}`;
    }
    case "sofa_corner": {
      const a = Math.min(furnitureEntry(type).arm ?? 0.95, w * 0.9, d * 0.9);
      return svg`<path d="M${x0} ${y0 + 0.22}H${-x0 - 0.22}V${-y0}" class="g" /><path d="M${x0} ${y0 + a}H${-x0 - a}" class="g dashed" />`;
    }
    case "kitchen_corner":
    case "desk_corner": {
      const a = Math.min(furnitureEntry(type).arm ?? 0.6, w * 0.9, d * 0.9);
      return svg`<path d="M${x0} ${y0 + a - 0.05}H${-x0 - a + 0.05}V${-y0}" class="g" />`;
    }
    case "crib":
      return svg`<rect x=${x0 + 0.05} y=${y0 + 0.05} width=${w - 0.1} height=${d - 0.1} class="g" />`;
    case "pouf":
    case "bar_stool":
    case "office_chair":
    case "coat_rack":
      return svg`<circle r=${Math.min(w, d) * 0.22} class="g" />`;
    case "table_round":
      return svg`<circle r=${Math.min(w, d) * 0.12} class="g" />`;
    case "stove":
      return svg`${[-1, 1].flatMap((i) => [-1, 1].map((j) => svg`<circle cx=${i * w * 0.22} cy=${j * d * 0.22} r=${Math.min(w, d) * 0.12} class="g" />`))}`;
    case "dishwasher":
    case "dryer":
      return svg`<path d="M${x0} ${-y0 - 0.08}H${-x0}" class="g" /><circle r=${Math.min(w, d) * 0.22} class="g" />`;
    case "sink_double":
      return svg`<ellipse cx=${-w / 4} cy="0.04" rx=${w * 0.17} ry=${d * 0.3} class="g" /><ellipse cx=${w / 4} cy="0.04" rx=${w * 0.17} ry=${d * 0.3} class="g" />`;
    case "bidet":
      return svg`<ellipse cx="0" cy=${0.04} rx=${w * 0.36} ry=${d * 0.36} class="g" />`;
    case "bookcase":
    case "vitrine":
    case "shoe_cabinet":
      return svg`<path d="M${x0} ${-y0 - 0.05}H${-x0}" class="g" />`;
    case "fireplace":
      return svg`<rect x=${-w * 0.27} y=${-y0 - 0.18} width=${w * 0.54} height="0.18" class="g" />`;
    case "piano":
      return svg`<rect x=${x0 + 0.06} y=${-y0 - 0.22} width=${w - 0.12} height="0.14" class="g" />`;
    case "kitchen_island":
    case "tall_cabinet":
    case "filing_cabinet":
    case "toy_box":
      return svg`<path d="M${x0} ${-y0 - 0.06}H${-x0}" class="g" />`;
    case "aquarium":
      return svg`<path d="M${x0 + 0.08} 0q${w * 0.1} -0.08 ${w * 0.2} 0t${w * 0.2} 0t${w * 0.2} 0t${w * 0.2} 0" class="g" />`;
    case "lounger":
      return svg`<path d="M${x0} ${y0 + 0.6}H${-x0}" class="g" />`;
    case "vanity":
      return svg`<path d="M${-w * 0.35} ${y0 + 0.04}H${w * 0.35}" class="g" />`;
    case "sofa":
    case "sofa_2":
    case "armchair":
      return svg`<path d="M${x0} ${y0 + 0.22}H${-x0}M${x0 + 0.18} ${y0 + 0.22}V${-y0}M${-x0 - 0.18} ${y0 + 0.22}V${-y0}" class="g" />`;
    case "chair":
      return svg`<path d="M${x0} ${y0 + 0.08}H${-x0}" class="g" />`;
    case "wardrobe":
      return svg`<path d="M${x0} ${y0}L${-x0} ${-y0}M${-x0} ${y0}L${x0} ${-y0}" class="g" />`;
    case "nightstand":
      return svg`<path d="M${x0} ${-y0 - 0.1}H${-x0}" class="g" /><circle cx="0" cy=${-y0 - 0.05} r="0.02" class="g" />`;
    case "dresser":
      return svg`<path d="M${x0} ${-y0 - 0.1}H${-x0}M0 ${y0}V${-y0 - 0.1}" class="g" />`;
    case "bench":
      return svg`<path d="M${x0 + 0.05} 0H${-x0 - 0.05}" class="g" />`;
    case "side_table":
      return svg`<circle r=${Math.min(w, d) * 0.12} class="g" />`;
    case "rug_round":
      return svg`<ellipse rx=${w / 2 - 0.08} ry=${d / 2 - 0.08} class="g dashed" />`;
    case "shelf":
    case "sideboard":
    case "tv_board":
      return svg`<path d="M${x0} 0H${-x0}" class="g" />`;
    case "desk":
      return svg`<path d="M${x0 + 0.05} ${-y0 - 0.12}H${-x0 - 0.05}" class="g" />`;
    case "kitchen": {
      const r = Math.min(0.09, d * 0.15);
      return svg`<rect x=${x0 + 0.15} y=${-0.2} width="0.5" height="0.4" rx="0.06" class="g" />
        ${[0, 1].flatMap((i) => [0, 1].map((j) => svg`<circle cx=${-x0 - 0.5 + i * 0.28} cy=${-0.12 + j * 0.24} r=${r} class="g" />`))}`;
    }
    case "fridge":
      return svg`<path d="M${x0} ${-y0 - 0.08}H${-x0}" class="g" />`;
    case "bathtub":
      return svg`<rect x=${x0 + 0.08} y=${y0 + 0.08} width=${w - 0.16} height=${d - 0.16} rx="0.2" class="g" /><circle cx=${x0 + 0.25} cy="0" r="0.03" class="g" />`;
    case "shower":
      return svg`<path d="M${x0} ${y0}L${-x0} ${-y0}M${-x0} ${y0}L${x0} ${-y0}" class="g" /><circle r="0.05" class="g" />`;
    case "toilet":
      return svg`<rect x=${x0} y=${y0} width=${w} height="0.18" class="g" /><ellipse cx="0" cy=${y0 + 0.42} rx=${w * 0.38} ry="0.22" class="g" />`;
    case "sink":
      return svg`<ellipse cx="0" cy="0.04" rx=${w * 0.32} ry=${d * 0.3} class="g" />`;
    case "washer":
      return svg`<circle r=${Math.min(w, d) * 0.32} class="g" />`;
    case "rug":
      return svg`<rect x=${x0 + 0.08} y=${y0 + 0.08} width=${w - 0.16} height=${d - 0.16} class="g dashed" />`;
    case "plant":
      return svg`<circle r=${Math.min(w, d) * 0.3} class="g" /><circle r=${Math.min(w, d) * 0.12} class="g" />`;
    case "table":
    case "table_large":
    case "coffee_table":
    case "console":
    default:
      return svg`<rect x=${x0 + 0.06} y=${y0 + 0.06} width=${Math.max(0.01, w - 0.12)} height=${Math.max(0.01, d - 0.12)} class="g" />`;
  }
}
