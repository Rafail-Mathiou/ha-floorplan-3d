// Dashboard card options: types, checks and the mapping to the visual editor's form.
import type { PlanData } from "./model";

export interface CardConfig {
  type: string;
  /** Height of the view: number (px) or CSS length. Default 420 px. */
  height?: number | string;
  /** "auto" (3D, 2D without WebGL 2) or "2d" (always the live map). */
  view?: "auto" | "2d";
  /** Show the view buttons (angled, top, low walls, animations). Default true. */
  controls?: boolean;
  /** Show only this floor (ID or name); without it the card offers a floor switcher. */
  floor?: string;
}

/** Floor ID for the card option `floor` (an ID or a name). */
export function configFloor(plan: PlanData, wanted: string | undefined): string | undefined {
  if (!wanted) return undefined;
  const floors = plan.floors ?? [];
  const key = wanted.trim().toLowerCase();
  return (floors.find((f) => f.id === wanted) ?? floors.find((f) => f.name.trim().toLowerCase() === key))?.id;
}

/** Card height as a safe CSS length: a number (px) or number + unit, else 420 px. */
export function cssHeight(h: unknown): string {
  if (typeof h === "number" && Number.isFinite(h) && h >= 100 && h <= 4000) return `${h}px`;
  if (typeof h === "string" && /^\d{2,4}(\.\d+)?(px|vh|dvh|svh|em|rem)$/.test(h.trim())) return h.trim();
  return "420px";
}

/** Values shown in the form (all fields filled in). */
export interface CardFormData {
  floor: string;
  view: "auto" | "2d";
  height: string;
  controls: boolean;
}

export function formData(config: CardConfig): CardFormData {
  return {
    floor: config.floor ?? "",
    view: config.view === "2d" ? "2d" : "auto",
    height: config.height === undefined ? "420" : String(config.height),
    controls: config.controls !== false,
  };
}

/** Card configuration from the form; default values are left out so the YAML stays short. */
export function configFromForm(config: CardConfig, data: Partial<CardFormData>): CardConfig {
  const next: CardConfig = { ...config };
  const set = <K extends keyof CardConfig>(key: K, value: CardConfig[K] | undefined) => {
    if (value === undefined) delete next[key];
    else next[key] = value;
  };
  if ("floor" in data) set("floor", data.floor || undefined);
  if ("view" in data) set("view", data.view === "2d" ? "2d" : undefined);
  if ("controls" in data) set("controls", data.controls === false ? false : undefined);
  if ("height" in data) {
    // Invalid input (while typing) keeps the last valid height
    const h = (data.height ?? "").trim();
    if (!h) set("height", undefined);
    else if (/^\d+$/.test(h)) {
      if (cssHeight(Number(h)) === `${h}px`) set("height", Number(h));
    } else if (cssHeight(h) === h) set("height", h);
  }
  return next;
}
