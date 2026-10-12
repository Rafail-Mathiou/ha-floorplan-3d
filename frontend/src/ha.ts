// Helpers for Home Assistant areas and entities.
import { newRoom, type PlanData, type Room } from "./model";
import { rectPoints, roomsBox } from "./editor/geometry";
import { floorOf, linkedFloor } from "./floors";
import { collator } from "./i18n";
import type { HassFloor, HomeAssistant } from "./types";

export function entityArea(hass: HomeAssistant, entityId: string): string | null {
  const entry = hass.entities?.[entityId];
  if (!entry) return null;
  if (entry.area_id) return entry.area_id;
  return entry.device_id ? (hass.devices?.[entry.device_id]?.area_id ?? null) : null;
}

export function friendlyName(hass: HomeAssistant, entityId: string): string {
  return hass.states[entityId]?.attributes.friendly_name ?? entityId;
}

export interface SensorOption {
  entityId: string;
  name: string;
  inArea: boolean;
}

/** Sensors of a device_class, those in the given area first. */
export function sensorOptions(hass: HomeAssistant, deviceClass: string, areaId: string | null): SensorOption[] {
  return Object.values(hass.states)
    .filter((s) => s.entity_id.startsWith("sensor.") && s.attributes.device_class === deviceClass)
    .filter((s) => !hass.entities?.[s.entity_id]?.hidden)
    .map((s) => ({
      entityId: s.entity_id,
      name: s.attributes.friendly_name ?? s.entity_id,
      inArea: areaId !== null && entityArea(hass, s.entity_id) === areaId,
    }))
    .sort((a, b) => Number(b.inArea) - Number(a.inArea) || a.name.localeCompare(b.name, collator()));
}

export function suggestSensor(hass: HomeAssistant, deviceClass: string, areaId: string): string | null {
  return sensorOptions(hass, deviceClass, areaId).find((o) => o.inArea)?.entityId ?? null;
}

export function homeAreas(hass: HomeAssistant) {
  return Object.values(hass.areas ?? {}).sort((a, b) => a.name.localeCompare(b.name, collator()));
}

/**
 * Creates a 3 × 3 m rectangle for every Home Assistant area without a room and suggests
 * temperature/humidity sensors. With floors, a room goes to the floor linked to its
 * area's floor, else to `floor`; the rectangles are laid out below that floor's rooms.
 */
export function roomsFromAreas(hass: HomeAssistant, plan: PlanData, floor: string | null = null): Room[] {
  const used = new Set(plan.rooms.map((r) => r.area_id).filter(Boolean));
  const areas = homeAreas(hass).filter((a) => !used.has(a.area_id));
  const size = 3;
  const gap = 0.5;
  const perRow = 4;
  const placed = new Map<string | null, number>();
  return areas.map((area) => {
    const target = linkedFloor(plan, area.floor_id) ?? floor;
    const box = roomsBox(plan.rooms.filter((r) => floorOf(plan, r) === target));
    const originY = box ? Math.ceil(box.maxY + 1) : 0;
    const originX = box ? Math.floor(box.minX) : 0;
    const i = placed.get(target) ?? 0;
    placed.set(target, i + 1);
    const x = originX + (i % perRow) * (size + gap);
    const y = originY + Math.floor(i / perRow) * (size + gap);
    const room = newRoom(area.name, rectPoints([x, y], [x + size, y + size]));
    return {
      ...room,
      ...(target ? { floor: target } : {}),
      area_id: area.area_id,
      temp_entity: suggestSensor(hass, "temperature", area.area_id),
      humidity_entity: suggestSensor(hass, "humidity", area.area_id),
    };
  });
}

/** Home Assistant floors, from the bottom to the top. */
export function homeFloors(hass: HomeAssistant): HassFloor[] {
  return Object.values(hass.floors ?? {}).sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
}

export interface Reading {
  value: number | null;
  unit: string;
  available: boolean;
}

/** Value of a sensor, or `current_temperature` of a climate entity. */
export function reading(hass: HomeAssistant, entityId: string | null): Reading | undefined {
  if (!entityId) return undefined;
  const state = hass.states[entityId];
  if (!state) return { value: null, unit: "", available: false };
  if (entityId.startsWith("climate.")) {
    const v = Number(state.attributes.current_temperature);
    return { value: Number.isFinite(v) ? v : null, unit: "°C", available: state.state !== "unavailable" && Number.isFinite(v) };
  }
  const v = Number(state.state);
  const ok = !["unavailable", "unknown"].includes(state.state) && Number.isFinite(v);
  return { value: ok ? v : null, unit: state.attributes.unit_of_measurement ?? "", available: ok };
}
