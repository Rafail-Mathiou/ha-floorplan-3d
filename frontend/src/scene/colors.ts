// Room colour by temperature.
import type { TempScale } from "../model";

export type RGB = [number, number, number];

export const hex = (h: string): RGB => {
  const n = parseInt(h.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export const mix = (a: RGB, b: RGB, t: number): RGB => {
  const k = Math.min(1, Math.max(0, t));
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
};

/** Floor colours: neutral, no sensor, unavailable. */
export const FLOOR = {
  base: hex("#4b5562"),
  none: hex("#454c55"),
  unavailable: hex("#33373d"),
};

const COLD = hex("#3f9fd8");
const COOL = hex("#63c6e8");
const OK = hex("#52c98d");
const MILD = hex("#e9c45c");
const WARM = hex("#ff9a4d");
const HOT = hex("#ef6363");

/** Continuous colour for a temperature, mixed with the neutral floor. */
export function tempColor(t: number, s: TempScale): RGB {
  let c: RGB;
  if (t <= s.cold) c = COLD;
  else if (t < s.ok_low) c = mix(COOL, OK, (t - s.cold) / (s.ok_low - s.cold || 1));
  else if (t <= s.ok_high) c = OK;
  else if (t < s.hot) {
    // Through yellow, because going from green straight to orange looks olive grey
    const k = (t - s.ok_high) / (s.hot - s.ok_high || 1);
    c = k < 0.5 ? mix(OK, MILD, k * 2) : mix(MILD, WARM, (k - 0.5) * 2);
  }
  else c = mix(WARM, HOT, (t - s.hot) / 2);
  return mix(FLOOR.base, c, 0.62);
}
