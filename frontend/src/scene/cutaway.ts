// Cutaway: walls between the camera and the point it looks at are lowered, so you
// can look into rooms from any side. Walls do it in the vertex shader (one merged
// mesh, no transparency sorting); doors and windows use the same formula in JS.
// Isolation (“show only this room”) discards wall fragments outside a room outline.
import { Vector2, type MeshLambertMaterial, type PerspectiveCamera, type Vector3 } from "three";

import type { Point } from "../model";

/** Height factor of a fully cut wall (same as “low walls”). */
export const CUT_LOW = 0.36;
/** Room outline points supported by the isolation shader. */
const MAX_ISO_POINTS = 32;

export interface CutUniforms {
  /** Look-at point (x, z). */
  uTarget: { value: Vector2 };
  /** Horizontal unit direction from the target towards the camera. */
  uDir: { value: Vector2 };
  /** 0 = off (top view, low walls), 1 = full cutaway. */
  uStrength: { value: number };
  /** Isolated room outline (uIsoN = 0: no isolation). */
  uIso: { value: Vector2[] };
  uIsoN: { value: number };
  /** Walls within this distance of the outline stay visible (m). */
  uIsoTol: { value: number };
}

export function cutUniforms(): CutUniforms {
  return {
    uTarget: { value: new Vector2() },
    uDir: { value: new Vector2(0, 1) },
    uStrength: { value: 0 },
    uIso: { value: Array.from({ length: MAX_ISO_POINTS }, () => new Vector2()) },
    uIsoN: { value: 0 },
    uIsoTol: { value: 0.1 },
  };
}

/** Shows only the walls of one room (or all walls again with `undefined`). */
export function setIsolation(u: CutUniforms, points: Point[] | undefined, tolerance: number): void {
  const pts = points && points.length <= MAX_ISO_POINTS ? points : undefined;
  u.uIsoN.value = pts?.length ?? 0;
  pts?.forEach(([x, y], i) => u.uIso.value[i].set(x, y));
  u.uIsoTol.value = tolerance;
}

const smoothstep = (a: number, b: number, x: number) => {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

/** Updates the uniforms from the camera; returns true when the cut changed. */
export function updateCut(u: CutUniforms, camera: PerspectiveCamera, target: Vector3, enabled: boolean): boolean {
  const dx = camera.position.x - target.x;
  const dz = camera.position.z - target.z;
  const flat = Math.hypot(dx, dz);
  // Polar angle from straight down: no cut in the top view
  const polar = Math.atan2(flat, Math.max(1e-3, camera.position.y - target.y));
  const strength = enabled ? smoothstep(0.25, 0.55, polar) : 0;
  const changed =
    Math.abs(u.uStrength.value - strength) > 1e-4 ||
    u.uTarget.value.x !== target.x ||
    u.uTarget.value.y !== target.z ||
    (flat > 1e-6 && (Math.abs(u.uDir.value.x - dx / flat) > 1e-5 || Math.abs(u.uDir.value.y - dz / flat) > 1e-5));
  u.uStrength.value = strength;
  u.uTarget.value.set(target.x, target.z);
  if (flat > 1e-6) u.uDir.value.set(dx / flat, dz / flat);
  return changed;
}

/** Height factor for a wall piece with centre `c` and normal `n` (both x, z). */
export function cutFactor(u: CutUniforms, c: [number, number], n: [number, number]): number {
  const t = u.uTarget.value;
  const d = u.uDir.value;
  const s = (c[0] - t.x) * d.x + (c[1] - t.y) * d.y;
  const facing = Math.abs(n[0] * d.x + n[1] * d.y);
  const cut = smoothstep(0.4, 1.2, s) * smoothstep(0.2, 0.5, facing) * u.uStrength.value;
  return 1 + (CUT_LOW - 1) * cut;
}

/**
 * Makes a wall material cut away. The geometry needs a vec4 attribute `aWall`
 * (piece centre x, z and normal x, z) and a float `aKeep` (1 = never lowered).
 */
export function cutawayMaterial(mat: MeshLambertMaterial, u: CutUniforms): void {
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
        attribute vec4 aWall;
        attribute float aKeep;
        uniform vec2 uTarget;
        uniform vec2 uDir;
        uniform float uStrength;
        varying vec2 vFpWorld;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        float cutS = dot(aWall.xy - uTarget, uDir);
        float cutFacing = abs(dot(aWall.zw, uDir));
        float cut = smoothstep(0.4, 1.2, cutS) * smoothstep(0.2, 0.5, cutFacing) * uStrength * (1.0 - aKeep);
        transformed.y *= mix(1.0, ${CUT_LOW.toFixed(2)}, cut);
        vFpWorld = (modelMatrix * vec4(transformed, 1.0)).xz;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform vec2 uIso[${MAX_ISO_POINTS}];
        uniform int uIsoN;
        uniform float uIsoTol;
        varying vec2 vFpWorld;
        bool fpKeep(vec2 p) {
          bool inside = false;
          float d = 1e9;
          for (int i = 0; i < ${MAX_ISO_POINTS}; i++) {
            if (i >= uIsoN) break;
            vec2 a = uIso[i];
            vec2 b = uIso[i == 0 ? uIsoN - 1 : i - 1];
            if ((a.y > p.y) != (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
            vec2 ab = b - a;
            float t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-6), 0.0, 1.0);
            d = min(d, length(p - a - ab * t));
          }
          return inside || d < uIsoTol;
        }`,
      )
      .replace(
        "#include <clipping_planes_fragment>",
        `if (uIsoN > 0 && !fpKeep(vFpWorld)) discard;
        #include <clipping_planes_fragment>`,
      );
  };
  mat.customProgramCacheKey = () => "floorplan-3d-cutaway";
}
