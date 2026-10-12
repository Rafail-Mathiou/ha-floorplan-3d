// Room colour per colour mode (temperature, humidity, CO₂, heating) and the matching
// legend rows. Shared by the 3D view and the 2D live map.
import { reading, type Reading } from "../ha";
import { num, t } from "../i18n";
import { planThresholds, type ColorMode, type PlanData, type Room } from "../model";
import type { HomeAssistant } from "../types";
import { FLOOR, hex, mix, tempColor, type RGB } from "./colors";
import { roomCo2 } from "./room-status";

/** Modes offered in the view (the stored setting also knows "none"). */
export const VIEW_MODES: ColorMode[] = ["temperature", "humidity", "co2", "heating"];

const COOL = hex("#63c6e8");
const OK = hex("#52c98d");
const MILD = hex("#e9c45c");
const WARM = hex("#ff9a4d");
const HOT = hex("#ef6363");
const tint = (c: RGB): RGB => mix(FLOOR.base, c, 0.62);

/** Below this relative humidity a room counts as dry (%). */
const DRY = 35;

function humColor(v: number, warn: number, alert: number): RGB {
  if (v < DRY) return tint(mix(COOL, OK, (v - (DRY - 10)) / 10));
  if (v < warn) return tint(OK);
  if (v < alert) return tint(mix(MILD, WARM, (v - warn) / (alert - warn || 1)));
  return tint(HOT);
}

function co2Color(v: number, warn: number, alert: number): RGB {
  const good = warn * 0.8;
  if (v <= good) return tint(OK);
  if (v < warn) return tint(mix(OK, MILD, (v - good) / (warn - good || 1)));
  if (v < alert) return tint(mix(MILD, WARM, (v - warn) / (alert - warn || 1)));
  return tint(HOT);
}

const HEAT = { heating: tint(WARM), idle: tint(OK), off: tint(COOL) };

type HeatState = keyof typeof HEAT | "none" | "unavailable";

function roomHeating(hass: HomeAssistant, plan: PlanData, room: Room): HeatState {
  const thermostats = plan.items.filter((i) => i.room_id === room.id && i.entity_id.startsWith("climate."));
  if (!thermostats.length) return "none";
  const states = thermostats.map((i) => hass.states[i.entity_id]).filter((s) => s && s.state !== "unavailable");
  if (!states.length) return "unavailable";
  if (states.some((s) => s!.attributes.hvac_action === "heating")) return "heating";
  if (states.some((s) => s!.state !== "off")) return "idle";
  return "off";
}

const fromReading = (r: Reading | undefined, color: (v: number) => RGB): RGB =>
  !r ? FLOOR.none : r.available && r.value !== null ? color(r.value) : FLOOR.unavailable;

export function roomColor(mode: ColorMode, hass: HomeAssistant, plan: PlanData, room: Room): RGB {
  const th = planThresholds(plan);
  switch (mode) {
    case "temperature":
      return fromReading(reading(hass, room.temp_entity), (v) => tempColor(v, plan.settings.temp_scale));
    case "humidity":
      return fromReading(reading(hass, room.humidity_entity), (v) => humColor(v, th.humidity, th.humidity_alert));
    case "co2":
      return fromReading(roomCo2(hass, plan, room), (v) => co2Color(v, th.co2, th.co2_alert));
    case "heating": {
      const h = roomHeating(hass, plan, room);
      return h === "none" ? FLOOR.none : h === "unavailable" ? FLOOR.unavailable : HEAT[h];
    }
    default:
      return FLOOR.base;
  }
}

export interface LegendRow {
  color: RGB;
  name: string;
  text: string;
}

/** Legend rows for a mode (always ending with "no sensor" and "unavailable"). */
export function legendRows(mode: ColorMode, plan: PlanData): LegendRow[] {
  const str = t();
  const s = plan.settings.temp_scale;
  const th = planThresholds(plan);
  const n0 = (v: number) => num(v, 0);
  const n1 = (v: number) => num(v, 1);
  let rows: LegendRow[];
  switch (mode) {
    case "humidity":
      rows = [
        { color: humColor(DRY - 5, th.humidity, th.humidity_alert), name: str.dry, text: str.belowPercent(n0(DRY)) },
        { color: humColor(DRY + 5, th.humidity, th.humidity_alert), name: str.comfortable, text: str.rangePercent(n0(DRY), n0(th.humidity)) },
        { color: humColor((th.humidity + th.humidity_alert) / 2, th.humidity, th.humidity_alert), name: str.humid, text: str.fromPercent(n0(th.humidity)) },
        { color: humColor(th.humidity_alert, th.humidity, th.humidity_alert), name: str.veryHumid, text: str.fromPercent(n0(th.humidity_alert)) },
      ];
      break;
    case "co2":
      rows = [
        { color: co2Color(th.co2 * 0.7, th.co2, th.co2_alert), name: str.airGood, text: str.belowPpm(n0(th.co2)) },
        { color: co2Color((th.co2 + th.co2_alert) / 2, th.co2, th.co2_alert), name: str.airVentilate, text: str.fromPpm(n0(th.co2)) },
        { color: co2Color(th.co2_alert, th.co2, th.co2_alert), name: str.airUrgent, text: str.fromPpm(n0(th.co2_alert)) },
      ];
      break;
    case "heating":
      rows = [
        { color: HEAT.heating, name: str.heatOn, text: str.heatOnDesc },
        { color: HEAT.idle, name: str.heatIdle, text: str.heatIdleDesc },
        { color: HEAT.off, name: str.heatOff, text: str.heatOffDesc },
      ];
      break;
    default:
      rows = [
        { color: tempColor(s.cold - 1, s), name: str.tooCold, text: str.tooColdDesc(n1(s.ok_low), n1(s.cold)) },
        { color: tempColor((s.ok_low + s.ok_high) / 2, s), name: str.comfortable, text: str.rangeDesc(n1(s.ok_low), n1(s.ok_high)) },
        { color: tempColor((s.ok_high + s.hot) / 2, s), name: str.warm, text: str.aboveDesc(n1(s.ok_high)) },
        { color: tempColor(s.hot + 1, s), name: str.tooWarm, text: str.fromDesc(n1(s.hot)) },
      ];
  }
  return [
    ...rows,
    { color: FLOOR.none, name: str.noSensor, text: str.noSensorFor[mode] ?? str.noSensorDesc },
    { color: FLOOR.unavailable, name: str.unavailable, text: str.unavailableDesc },
  ];
}

/** CSS gradient for the compact legend button. */
export const LEGEND_GRADIENT: Record<string, string> = {
  temperature: "linear-gradient(90deg, #3f9fd8, #63c6e8 20%, #52c98d 40%, #52c98d 60%, #e9c45c 72%, #ff9a4d 86%, #ef6363)",
  humidity: "linear-gradient(90deg, #63c6e8, #52c98d 25%, #52c98d 55%, #e9c45c 70%, #ff9a4d 85%, #ef6363)",
  co2: "linear-gradient(90deg, #52c98d, #52c98d 45%, #e9c45c 62%, #ff9a4d 80%, #ef6363)",
  heating: "linear-gradient(90deg, #63c6e8 0 33%, #52c98d 33% 66%, #ff9a4d 66%)",
};
