// Ambient effects for the 3D view: heat shimmer, air flow, pulse rings.
// Effects are cheap (shaders or a handful of uniforms per frame) and fade in/out
// smoothly. `animate()` returns true while an effect still needs frames.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  RingGeometry,
  ShaderMaterial,
  type Material,
  type Object3D,
} from "three";

export interface Effect {
  object: Object3D;
  /** Switches the effect on or off (it fades). */
  setActive(active: boolean): void;
  /** Advances the effect; returns true while it needs further frames. */
  animate(time: number, dt: number, enabled: boolean): boolean;
  dispose(): void;
}

/** Fades `value` towards `target` within about `seconds`. */
function fade(value: number, target: number, dt: number, seconds = 0.6): number {
  const step = dt / seconds;
  return target > value ? Math.min(target, value + step) : Math.max(target, value - step);
}

/** Shared fade logic: strength follows active && enabled; returns the new strength. */
class Fader {
  strength = 0;
  active = false;
  step(dt: number, enabled: boolean): number {
    const target = this.active && enabled ? 1 : 0;
    // Disabling animations hides effects at once instead of fading.
    this.strength = enabled ? fade(this.strength, target, dt) : 0;
    return this.strength;
  }
}

// ------------------------------------------------------------ Heat shimmer

const SHIMMER_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SHIMMER_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uStrength;
  varying vec2 vUv;
  void main() {
    float x = vUv.x;
    float y = vUv.y;
    float wave = sin(y * 11.0 - uTime * 2.4 + sin(x * 9.0 + uTime * 1.3) * 1.6);
    float band = smoothstep(0.35, 1.0, wave);
    float fadeY = smoothstep(0.0, 0.18, y) * (1.0 - smoothstep(0.35, 1.0, y));
    float fadeX = smoothstep(0.0, 0.18, x) * (1.0 - smoothstep(0.82, 1.0, x));
    float a = band * fadeY * fadeX * 0.42 * uStrength;
    // Normal blending: tints light walls too (additive would vanish on white)
    gl_FragColor = vec4(1.0, 0.5, 0.16, a);
  }
`;

/**
 * Rising, wavy warm air above a radiator. Local frame: x along the radiator
 * (centred), y up from `bottom`, plane slightly in front of the radiator.
 */
export function heatShimmer(width: number, bottom: number, height = 0.8, front = 0.08): Effect {
  const material = new ShaderMaterial({
    vertexShader: SHIMMER_VERTEX,
    fragmentShader: SHIMMER_FRAGMENT,
    uniforms: { uTime: { value: 0 }, uStrength: { value: 0 } },
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
  });
  const geometry = new PlaneGeometry(width + 0.2, height);
  const mesh = new Mesh(geometry, material);
  mesh.position.set(0, bottom + height / 2, front);
  mesh.visible = false;
  mesh.renderOrder = 3;
  const f = new Fader();
  return {
    object: mesh,
    setActive: (a) => (f.active = a),
    animate(time, dt, enabled) {
      const s = f.step(dt, enabled);
      mesh.visible = s > 0;
      material.uniforms.uTime.value = time;
      material.uniforms.uStrength.value = s;
      return s > 0;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}

// ------------------------------------------------------------ Air flow

const AIR_VERTEX = /* glsl */ `
  attribute vec3 aSeed;
  uniform float uTime;
  uniform float uStrength;
  uniform vec3 uBox;
  uniform float uScale;
  varying float vAlpha;
  void main() {
    float p = fract(uTime * 0.22 + aSeed.x);
    vec3 pos = vec3(
      aSeed.y * uBox.x,
      aSeed.z * uBox.y + sin(p * 6.2832 + aSeed.x * 12.0) * 0.06,
      p * uBox.z
    );
    vAlpha = sin(p * 3.14159) * uStrength;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uScale / max(0.5, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const AIR_FRAGMENT = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha * 0.75;
    gl_FragColor = vec4(vec3(0.78, 0.93, 1.0) * a, a);
  }
`;

/**
 * Fresh air drifting through an open window into the room. Local frame: x along
 * the window (0..width), y from `bottom` up `height`, z into the room (`inward`).
 */
export function airFlow(width: number, bottom: number, height: number, inward: number, count = 26): Effect {
  const seeds = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    seeds[i * 3] = i / count;
    seeds[i * 3 + 1] = 0.1 + 0.8 * ((i * 0.618) % 1);
    seeds[i * 3 + 2] = 0.1 + 0.8 * ((i * 0.377 + 0.3) % 1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 3));
  const material = new ShaderMaterial({
    vertexShader: AIR_VERTEX,
    fragmentShader: AIR_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uStrength: { value: 0 },
      uBox: { value: [width, height, 1.3 * inward] },
      uScale: { value: 70 * Math.min(window.devicePixelRatio || 1, 1.5) },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geometry, material);
  points.position.y = bottom;
  points.frustumCulled = false;
  points.visible = false;
  points.renderOrder = 3;
  const f = new Fader();
  return {
    object: points,
    setActive: (a) => (f.active = a),
    animate(time, dt, enabled) {
      const s = f.step(dt, enabled);
      points.visible = s > 0;
      material.uniforms.uTime.value = time;
      material.uniforms.uStrength.value = s;
      return s > 0;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}

// ------------------------------------------------------------ Pulse rings

/**
 * Expanding, fading horizontal rings: a motion pulse on the floor or sound waves
 * around a speaker. Local frame: centred at the origin, rings at height `y`.
 */
export function pulseRings(opts: { y: number; from: number; to: number; color: number; rings?: number; speed?: number; opacity?: number }): Effect {
  const { y, from, to, color, rings = 2, speed = 0.7, opacity = 0.55 } = opts;
  const group = new Group();
  group.visible = false;
  const geometry = new RingGeometry(0.88, 1, 48);
  const materials: Material[] = [];
  const meshes: Mesh[] = [];
  for (let i = 0; i < rings; i++) {
    const m = new MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false, blending: AdditiveBlending, side: DoubleSide });
    const mesh = new Mesh(geometry, m);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    mesh.renderOrder = 3;
    materials.push(m);
    meshes.push(mesh);
    group.add(mesh);
  }
  const f = new Fader();
  return {
    object: group,
    setActive: (a) => (f.active = a),
    animate(time, dt, enabled) {
      const s = f.step(dt, enabled);
      group.visible = s > 0;
      if (s > 0) {
        meshes.forEach((mesh, i) => {
          const k = (time * speed + i / rings) % 1;
          const r = from + (to - from) * k;
          mesh.scale.set(r, r, r);
          (mesh.material as MeshBasicMaterial).opacity = (1 - k) * (1 - k) * opacity * s;
        });
      }
      return s > 0;
    },
    dispose() {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
  };
}
