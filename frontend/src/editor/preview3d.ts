// Small 3D preview of a furniture piece for the library. One renderer is shared and
// only created while the library shows a preview; it draws into a 2D canvas.
import { Box3, DirectionalLight, HemisphereLight, PerspectiveCamera, Scene, SRGBColorSpace, Vector3, WebGLRenderer } from "three";

import type { FurnitureType } from "../model";
import { buildFurniture } from "../scene/furniture";

/** undefined: not created yet, null: WebGL 2 is not available. */
let renderer: WebGLRenderer | null | undefined;

/** Draws the piece into `canvas`; false when no 3D is available (show the 2D view only). */
export function renderPreview(canvas: HTMLCanvasElement, type: FurnitureType, size: [number, number]): boolean {
  if (renderer === null) return false;
  if (!renderer) {
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "low-power" });
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
    } catch {
      renderer = null;
      return false;
    }
  }
  const w = canvas.width;
  const h = canvas.height;
  renderer.setPixelRatio(1);
  renderer.setSize(w, h, false);

  const disposables: { dispose(): void }[] = [];
  const bin = {
    add<T extends { dispose(): void }>(x: T): T {
      disposables.push(x);
      return x;
    },
  };
  const scene = new Scene();
  scene.add(new HemisphereLight(0xf2f5ff, 0x30363f, 2.2));
  const sun = new DirectionalLight(0xffffff, 1.6);
  sun.position.set(-3, 6, 4);
  scene.add(sun);
  const object = buildFurniture({ id: "preview", type, pos: [0, 0], size, rotation: 0, label: null }, bin);
  scene.add(object);

  // Front three-quarter view that fits the whole piece
  const box = new Box3().setFromObject(object);
  const center = box.getCenter(new Vector3());
  const radius = Math.max(0.2, box.getSize(new Vector3()).length() / 2);
  const camera = new PerspectiveCamera(30, w / h, 0.01, 100);
  const fov = (camera.fov * Math.PI) / 180;
  const dist = (radius / Math.sin(fov / 2)) * (w / h < 1 ? 1.25 : 1.0);
  camera.position.copy(center).add(new Vector3(0.75, 0.7, 1.25).normalize().multiplyScalar(dist));
  camera.lookAt(center);

  renderer.render(scene, camera);
  const ctx = canvas.getContext("2d");
  ctx?.clearRect(0, 0, w, h);
  ctx?.drawImage(renderer.domElement, 0, 0, w, h);
  disposables.forEach((d) => d.dispose());
  return true;
}

/** Frees the shared renderer (library closed). */
export function disposePreview(): void {
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
  if (renderer !== null) renderer = undefined;
}
