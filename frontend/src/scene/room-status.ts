// Room symbols: too cold/warm, humidity, CO₂, heating, window/exterior door open.
import { reading, type Reading } from "../ha";
import { num, t } from "../i18n";
import { planThresholds, type PlanData, type Room } from "../model";
import type { HomeAssistant } from "../types";

const svg = (body: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const ROOM_ICONS = {
  snow: svg('<path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M9 3.5l3 2 3-2M9 20.5l3-2 3 2"/>'),
  hot: svg('<path d="M12 3a2 2 0 0 0-2 2v9.3a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z"/><path d="M12 10v7"/><path d="M18 4v4M20 6h-4"/>'),
  drop: svg('<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>'),
  wind: svg('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),
  flame: svg('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.2-3.6 2-4.6.3 1.6 1.2 2.6 2.2 2.6C11 8.6 11 5.6 12 3z"/>'),
  window: svg('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h8"/><path d="M14 9l4-3"/>'),
  door: svg('<path d="M5 21V4a1 1 0 0 1 1-1h8l4 2v16"/><path d="M3 21h18M14 3v18"/><circle cx="11" cy="12" r="1" fill="currentColor"/>'),
};

export type IconName = keyof typeof ROOM_ICONS;

export interface RoomFlag {
  icon: IconName;
  level: "" | "warn" | "alert";
  text: string;
}

/** CO₂ of a room: the first device in the room that reports ppm. */
export function roomCo2(hass: HomeAssistant, plan: PlanData, room: Room): Reading | undefined {
  for (const item of plan.items) {
    if (item.room_id !== room.id) continue;
    if (hass.states[item.entity_id]?.attributes.unit_of_measurement !== "ppm") continue;
    return reading(hass, item.entity_id);
  }
  return undefined;
}

export function roomFlags(hass: HomeAssistant, plan: PlanData, room: Room, temp?: Reading, hum?: Reading): RoomFlag[] {
  const s = plan.settings.temp_scale;
  const th = planThresholds(plan);
  const flags: RoomFlag[] = [];
  const str = t();

  if (temp?.available && temp.value !== null) {
    if (temp.value < s.ok_low) {
      flags.push({ icon: "snow", level: temp.value < s.cold ? "alert" : "", text: str.flagCold(num(temp.value)) });
    } else if (temp.value > s.ok_high) {
      flags.push({ icon: "hot", level: temp.value >= s.hot ? "alert" : "warn", text: str.flagHot(num(temp.value)) });
    }
  }
  if (hum?.available && hum.value !== null && hum.value >= th.humidity) {
    flags.push({
      icon: "drop",
      level: hum.value >= th.humidity_alert ? "alert" : "",
      text: str.flagHumid(num(hum.value, 0)),
    });
  }

  const items = plan.items.filter((i) => i.room_id === room.id);
  // CO₂: sensor in the room reporting ppm
  const co2 = roomCo2(hass, plan, room);
  if (co2?.available && co2.value !== null && co2.value > th.co2) {
    flags.push({ icon: "wind", level: co2.value > th.co2_alert ? "alert" : "warn", text: str.flagCo2(num(co2.value, 0)) });
  }
  // Is a thermostat in the room heating?
  if (items.some((i) => i.entity_id.startsWith("climate.") && hass.states[i.entity_id]?.attributes.hvac_action === "heating")) {
    flags.push({ icon: "flame", level: "warn", text: str.symHeating });
  }
  // Open windows / exterior doors
  const openings = plan.openings.filter((o) => o.room_ids.includes(room.id) && o.entity_id);
  if (openings.some((o) => o.type === "window" && hass.states[o.entity_id!]?.state === "on")) {
    flags.push({ icon: "window", level: "", text: str.symWindow });
  }
  if (openings.some((o) => o.type === "door" && o.exterior && hass.states[o.entity_id!]?.state === "on")) {
    flags.push({ icon: "door", level: "alert", text: str.symDoor });
  }
  return flags;
}
