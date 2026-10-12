// View preferences saved on this device (local storage); defaults when unavailable.
const KEYS = {
  animations: "floorplan-3d.animations",
  autoCut: "floorplan-3d.autoCut",
  tapToggle: "floorplan-3d.tapToggle",
} as const;

export type Pref = keyof typeof KEYS;

export function loadPref(name: Pref, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(KEYS[name]);
    if (v !== null) return v === "1";
  } catch {
    // storage unavailable, use the default
  }
  return fallback;
}

export function savePref(name: Pref, on: boolean): void {
  try {
    localStorage.setItem(KEYS[name], on ? "1" : "0");
  } catch {
    // ignore
  }
}

/** Holding longer than this (ms) always opens the dialog instead of switching. */
export const LONG_PRESS_MS = 500;

/** Domains a tap may switch when the user turned that on. */
export function toggleDomain(entityId: string): string | undefined {
  const domain = entityId.split(".")[0];
  return domain === "light" || domain === "switch" ? domain : undefined;
}
