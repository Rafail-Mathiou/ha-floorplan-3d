// WebSocket client for floorplan_3d/get, /save and /subscribe.
import type { PlanData, PlanDoc } from "./model";
import type { HomeAssistant } from "./types";

export async function fetchPlan(hass: HomeAssistant): Promise<PlanDoc> {
  const doc = await hass.callWS<PlanDoc>({ type: "floorplan_3d/get" });
  return { ...doc, furniture: doc.furniture ?? [], floors: doc.floors ?? [] };
}

/** Saves the plan and returns the new revision. */
export async function savePlan(
  hass: HomeAssistant,
  plan: PlanData,
  revision: number,
): Promise<number> {
  const result = await hass.callWS<{ revision: number }>({
    type: "floorplan_3d/save",
    revision,
    plan: {
      settings: plan.settings,
      floors: plan.floors ?? [],
      rooms: plan.rooms,
      openings: plan.openings,
      items: plan.items,
      furniture: plan.furniture,
    },
  });
  return result.revision;
}

/** Calls `onRevision` with the current revision and after every save (any device). */
export async function subscribePlan(hass: HomeAssistant, onRevision: (revision: number) => void): Promise<() => Promise<void>> {
  return hass.connection.subscribeMessage<{ revision: number }>((msg) => onRevision(msg.revision), {
    type: "floorplan_3d/subscribe",
  });
}

/** Largest accepted image for the background (bytes). */
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

/** Thrown when Home Assistant has no image upload (integration not loaded). */
export class UploadUnavailable extends Error {}

/**
 * Uploads an image through Home Assistant's image upload integration and returns the
 * path it is served from.
 */
export async function uploadImage(hass: HomeAssistant, file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await hass.fetchWithAuth("/api/image/upload", { method: "POST", body });
  if (res.status === 404 || res.status === 405) throw new UploadUnavailable();
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { id } = (await res.json()) as { id?: unknown };
  if (typeof id !== "string" || !/^[0-9a-f]{8,64}$/i.test(id)) throw new Error("Unexpected answer");
  return `/api/image/serve/${id}/original`;
}

/** Error code of a rejected WS message, e.g. "conflict". */
export function errorCode(err: unknown): string | undefined {
  if (err && typeof err === "object" && "code" in err) {
    return String((err as { code: unknown }).code);
  }
  return undefined;
}

export function errorMessage(err: unknown): string {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
}
