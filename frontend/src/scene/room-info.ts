// <fp-room-info>: everything about one room at a glance, shown after tapping a room in
// the 3D view or the 2D live map. Each line opens the Home Assistant dialog.
import { LitElement, css, html, nothing, svg } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { ITEM_GLYPHS } from "../editor/glyphs";
import { reading } from "../ha";
import { num, t } from "../i18n";
import { icons } from "../icons";
import { itemKind, polygonArea, type PlanData, type Room } from "../model";
import type { HassEntityState, HomeAssistant } from "../types";
import { lightRgb } from "./objects";
import { ROOM_ICONS, roomCo2, roomFlags } from "./room-status";
import { tvCaption, tvInfo } from "./tv-screen";

/** States shown as active (highlighted line). */
const ACTIVE = ["on", "open", "playing", "cleaning", "returning", "heat", "heating"];

/** State in the user's language (Home Assistant formats it when it can). */
function stateText(hass: HomeAssistant, st: HassEntityState | undefined): string {
  if (!st) return t().notAvailable;
  if (st.entity_id.startsWith("climate.")) {
    const cur = Number(st.attributes.current_temperature);
    const target = Number(st.attributes.temperature);
    const parts = [Number.isFinite(cur) ? `${num(cur)} °C` : "", Number.isFinite(target) ? `${num(target)} °C` : ""].filter(Boolean);
    if (parts.length) return parts.join(" → ");
  }
  if (hass.formatEntityState) return hass.formatEntityState(st);
  const unit = st.attributes.unit_of_measurement;
  return unit ? `${st.state} ${unit}` : st.state;
}

export class FpRoomInfo extends LitElement {
  static override properties = {
    hass: { attribute: false },
    plan: { attribute: false },
    room: { attribute: false },
    isolated: { type: Boolean },
  };

  declare hass?: HomeAssistant;
  declare plan: PlanData;
  declare room: Room;
  /** The room is shown alone (offer "show whole home"). */
  declare isolated: boolean;

  constructor() {
    super();
    this.isolated = false;
  }

  private _moreInfo(entityId: string | null | undefined): void {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }

  protected override render() {
    const hass = this.hass;
    const room = this.room;
    if (!hass || !room) return nothing;
    const s = t();
    const temp = reading(hass, room.temp_entity);
    const hum = reading(hass, room.humidity_entity);
    const co2 = roomCo2(hass, this.plan, room);
    const co2Id = this.plan.items.find((i) => i.room_id === room.id && hass.states[i.entity_id]?.attributes.unit_of_measurement === "ppm")?.entity_id;
    const flags = roomFlags(hass, this.plan, room, temp, hum);
    const items = this.plan.items.filter((i) => i.room_id === room.id && i.entity_id !== co2Id);
    const openings = this.plan.openings.filter((o) => o.entity_id && o.room_ids.includes(room.id));
    const value = (r: typeof temp, digits: number, unit: string) => (r?.available && r.value !== null ? `${num(r.value, digits)}${unit}` : "–");

    return html`<section aria-label=${room.name || s.unnamed}>
      <header>
        <div>
          <h2>${room.name || s.unnamed}</h2>
          <span class="area">${num(polygonArea(room.points), 1)} m²</span>
        </div>
        <button class="close" title=${s.close} aria-label=${s.close} @click=${() => this.dispatchEvent(new CustomEvent("close"))}>${icons.close}</button>
      </header>
      ${temp || hum || co2
        ? html`<div class="readings">
            ${temp ? html`<button class="big" @click=${() => this._moreInfo(room.temp_entity)}>${value(temp, 1, "°")}</button>` : nothing}
            ${hum?.available ? html`<button @click=${() => this._moreInfo(room.humidity_entity)}>${value(hum, 0, " %")}</button>` : nothing}
            ${co2?.available ? html`<button @click=${() => this._moreInfo(co2Id)}>${value(co2, 0, " ppm")}</button>` : nothing}
          </div>`
        : nothing}
      ${flags.length
        ? html`<ul class="flags">
            ${flags.map((f) => html`<li class=${f.level}><span class="icon">${unsafeHTML(ROOM_ICONS[f.icon])}</span>${f.text}</li>`)}
          </ul>`
        : nothing}
      ${items.length || openings.length
        ? html`<ul class="devices">
            ${openings.map((o) => {
              const st = hass.states[o.entity_id!];
              const open = st?.state === "on";
              return html`<li>
                <button class=${open ? "on" : ""} @click=${() => this._moreInfo(o.entity_id)}>
                  <span class="icon">${unsafeHTML(ROOM_ICONS[o.type === "door" ? "door" : "window"])}</span>
                  <span class="name">${st?.attributes.friendly_name ?? s.openings[o.type]}</span>
                  <span class="state">${stateText(hass, st)}</span>
                </button>
              </li>`;
            })}
            ${items.map((i) => {
              const st = hass.states[i.entity_id];
              const kind = itemKind(i, st?.attributes.device_class);
              const active = kind === "radiator" ? st?.attributes.hvac_action === "heating" : ACTIVE.includes(st?.state ?? "");
              const rgb = kind === "light" && active ? lightRgb(st) : undefined;
              const caption = kind === "tv" ? tvCaption(tvInfo(st)) : "";
              return html`<li>
                <button class="${active ? "on" : ""} ${kind}" style=${rgb ? `--lamp: rgb(${rgb.join(",")})` : ""} @click=${() => this._moreInfo(i.entity_id)}>
                  <svg class="glyph" viewBox="-8 -8 16 16" aria-hidden="true">${svg`${ITEM_GLYPHS[kind]}`}</svg>
                  <span class="name">${i.label || st?.attributes.friendly_name || i.entity_id}</span>
                  <span class="state">${caption || stateText(hass, st)}</span>
                </button>
              </li>`;
            })}
          </ul>`
        : html`<p class="empty">${s.roomNoDevices}</p>`}
      ${this.isolated
        ? html`<button class="all" @click=${() => this.dispatchEvent(new CustomEvent("show-all"))}>${icons.fit} ${s.showAll}</button>`
        : nothing}
    </section>`;
  }

  static override styles = css`
    :host {
      display: block;
      width: 300px;
      max-width: 100%;
      font-family: var(--fp-font);
      color: var(--fp-fg);
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: var(--fp-info-max-height, 60vh);
      overflow-y: auto;
      padding: 12px 12px 12px 14px;
      box-sizing: border-box;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 12px 32px rgb(0 0 0 / 35%);
    }
    header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    header > div {
      flex: 1;
      min-width: 0;
    }
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .area {
      font-size: 12.5px;
      color: var(--fp-dim);
    }
    button {
      font: inherit;
      color: inherit;
      background: none;
      border: none;
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .close {
      flex: none;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      margin: -4px -4px 0 0;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .close:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .close svg {
      width: 18px;
      height: 18px;
    }
    .readings {
      display: flex;
      align-items: baseline;
      gap: 14px;
      font-variant-numeric: tabular-nums;
    }
    .readings button {
      padding: 0;
      font-size: 15px;
      color: var(--fp-dim);
    }
    .readings button.big {
      font-size: 28px;
      font-weight: 300;
      color: var(--fp-fg);
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .flags {
      display: grid;
      gap: 4px;
      font-size: 13px;
    }
    .flags li {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .flags li.warn {
      color: var(--fp-lamp);
    }
    .flags li.alert {
      color: var(--fp-alert);
    }
    .icon {
      flex: none;
      display: grid;
      place-items: center;
      width: 18px;
      height: 18px;
    }
    .icon svg {
      width: 16px;
      height: 16px;
    }
    .devices {
      display: grid;
      gap: 2px;
      border-top: 1px solid var(--fp-line);
      padding-top: 8px;
    }
    .devices button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 6px 4px;
      border-radius: 8px;
      text-align: left;
      font-size: 13.5px;
    }
    .devices button:hover {
      background: var(--fp-surface-2);
    }
    .devices .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .devices .state {
      flex: none;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--fp-dim);
      font-variant-numeric: tabular-nums;
    }
    .devices .on .state {
      color: var(--fp-fg);
    }
    .glyph {
      flex: none;
      width: 18px;
      height: 18px;
      fill: none;
      stroke: var(--fp-dim);
      stroke-width: 1.4;
    }
    .glyph .fill {
      fill: var(--fp-dim);
      stroke: none;
    }
    .on .glyph {
      stroke: var(--fp-frost);
    }
    .on.light .glyph .fill {
      fill: var(--lamp, var(--fp-lamp));
    }
    .on.radiator .glyph {
      stroke: var(--fp-accent);
    }
    .devices .icon {
      color: var(--fp-dim);
    }
    .devices .on .icon {
      color: var(--fp-frost);
    }
    .empty {
      margin: 0;
      font-size: 13px;
      color: var(--fp-dim);
    }
    .all {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      font-size: 13px;
    }
    .all svg {
      width: 16px;
      height: 16px;
      color: var(--fp-accent);
    }
  `;
}

if (!customElements.get("fp-room-info")) {
  customElements.define("fp-room-info", FpRoomInfo);
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-room-info": FpRoomInfo;
  }
}
