// <fp-live-map>: 2D live view for devices without WebGL 2 with room colours, labels with
// symbols, doors/windows and devices with their state. Tap opens the more-info dialog.
// Animations are plain CSS (cheap on old tablets) and can be switched off.
import { LitElement, css, html, nothing, svg } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { labelPoint, pointInPolygon, roomsBox } from "../editor/geometry";
import { furnitureBody, furnitureGlyph, ITEM_GLYPHS } from "../editor/glyphs";
import { reading } from "../ha";
import { num, t } from "../i18n";
import { itemKind, type ColorMode, type Item, type Opening, type PlanData, type Point, type Room } from "../model";
import type { HomeAssistant } from "../types";
import type { RGB } from "./colors";
import { roomColor } from "./room-color";
import { roomLabelStyles } from "./label-styles";
import { LONG_PRESS_MS } from "./prefs";
import { lightRgb } from "./objects";
import { tvCaption, tvInfo } from "./tv-screen";
import { ROOM_ICONS, roomFlags } from "./room-status";

/** Free space around the plan; top and bottom leave room for the legend and hints. */
const PAD = { x: 28, top: 64, bottom: 72 };

const rgb = (c: RGB) => `rgb(${c.map((v) => Math.round(v * 255)).join(",")})`;

/** Maps plan to screen coordinates. Portrait screens show a wide plan rotated by 90°. */
interface Layout {
  k: number;
  rotate: boolean;
  matrix: string;
  toScreen(p: Point): [number, number];
}

export class FpLiveMap extends LitElement {
  static override properties = {
    hass: { attribute: false },
    plan: { attribute: false },
    animations: { type: Boolean },
    colorMode: { attribute: false },
    selected: { attribute: false },
    tapItem: { attribute: false },
    _size: { state: true },
  };

  declare hass?: HomeAssistant;
  declare plan: PlanData;
  declare animations: boolean;
  declare colorMode: ColorMode;
  /** Room whose info card is open (highlighted). */
  declare selected?: string;
  /** Tap on a device (the view decides: dialog or switching); holding opens the dialog. */
  declare tapItem?: (entityId: string) => void;
  private _downAt = 0;
  declare private _size: { w: number; h: number };

  private _resize = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    this._size = { w: width, h: height };
  });

  constructor() {
    super();
    this._size = { w: 0, h: 0 };
    this.animations = true;
    this.colorMode = "temperature";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._resize.observe(this);
  }

  override disconnectedCallback(): void {
    this._resize.disconnect();
    super.disconnectedCallback();
  }

  private _layout(): Layout | undefined {
    const box = roomsBox(this.plan?.rooms ?? []);
    const { w, h } = this._size;
    if (!box || !w || !h) return undefined;
    const bw = Math.max(box.maxX - box.minX, 1);
    const bh = Math.max(box.maxY - box.minY, 1);
    const rotate = h > w * 1.1 && bw > bh;
    const [sw, sh] = rotate ? [bh, bw] : [bw, bh];
    const k = Math.min((w - 2 * PAD.x) / sw, (h - PAD.top - PAD.bottom) / sh);
    const ox = (w - sw * k) / 2;
    const oy = PAD.top + (h - PAD.top - PAD.bottom - sh * k) / 2;
    if (rotate) {
      // x points down, y points left
      const e = ox + box.maxY * k;
      const f = oy - box.minX * k;
      return { k, rotate, matrix: `matrix(0 ${k} ${-k} 0 ${e} ${f})`, toScreen: ([x, y]) => [-k * y + e, k * x + f] };
    }
    const e = ox - box.minX * k;
    const f = oy - box.minY * k;
    return { k, rotate, matrix: `matrix(${k} 0 0 ${k} ${e} ${f})`, toScreen: ([x, y]) => [k * x + e, k * y + f] };
  }

  /** Tap on a room (or beside the plan: null). */
  private _tap(id: string | null, ev?: Event): void {
    ev?.stopPropagation();
    this.dispatchEvent(new CustomEvent("room-tap", { detail: { id: id === this.selected ? null : id } }));
  }

  private _moreInfo(entityId: string | null | undefined, ev?: Event): void {
    ev?.stopPropagation();
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }

  protected override render() {
    const layout = this._layout();
    if (!layout || !this.hass) return nothing;
    const plan = this.plan;
    const thickness = plan.settings.wall_thickness;
    const pts = (r: Room) => r.points.map((p) => p.join(",")).join(" ");
    return html`
      <svg class="map ${this.animations ? "anim" : ""}" width=${this._size.w} height=${this._size.h} @click=${() => this.selected && this._tap(null)}>
        <defs>${this._glowGradients()}</defs>
        <g transform=${layout.matrix}>
          ${plan.rooms.map(
            (r) => svg`<polygon class="floor ${r.id === this.selected ? "sel" : ""}" points=${pts(r)} style="fill:${rgb(this._floor(r))}"
              @click=${(e: Event) => this._tap(r.id, e)} />`,
          )}
          ${this._glows()}
          ${plan.furniture.map(
            (f) => svg`<g class="furniture" transform="translate(${f.pos[0]} ${f.pos[1]}) rotate(${f.rotation})">
              ${furnitureBody(f.type, f.size[0], f.size[1])}
              ${furnitureGlyph(f.type, f.size[0], f.size[1])}
            </g>`,
          )}
          ${plan.rooms.map((r) => svg`<polygon class="wall" points=${pts(r)} stroke-width=${thickness} />`)}
          ${plan.rooms
            .filter((r) => r.id === this.selected)
            .map((r) => svg`<polygon class="sel-outline" points=${pts(r)} stroke-width=${thickness * 0.6} />`)}
          ${plan.openings.map((o) => this._opening(o, thickness))}
        </g>
        ${plan.items.map((i) => this._item(i, layout))}
      </svg>
      ${plan.rooms.map((r) => this._label(r, layout))}
    `;
  }

  /** Lamps that are on: a soft pool of light in their colour. */
  private _lamps() {
    const hass = this.hass!;
    return this.plan.items.flatMap((item) => {
      const st = hass.states[item.entity_id];
      if (st?.state !== "on" || itemKind(item, st.attributes.device_class) !== "light") return [];
      return [{ item, color: `rgb(${(lightRgb(st) ?? [255, 209, 140]).join(",")})` }];
    });
  }

  private _glowGradients() {
    // The light stays inside its room
    const rooms = new Set(this._lamps().map(({ item }) => item.room_id));
    const clips = this.plan.rooms
      .filter((r) => rooms.has(r.id))
      .map((r) => svg`<clipPath id=${`room-${r.id}`}><polygon points=${r.points.map((p) => p.join(",")).join(" ")} /></clipPath>`);
    return [...clips, ...this._lamps().map(
      ({ item, color }) => svg`<radialGradient id=${`glow-${item.id}`}>
        <stop offset="0" stop-color=${color} stop-opacity="0.32" />
        <stop offset="1" stop-color=${color} stop-opacity="0" />
      </radialGradient>`,
    )];
  }

  private _glows() {
    return this._lamps().map(
      ({ item }) => svg`<circle class="glow" cx=${item.pos[0]} cy=${item.pos[1]} r="1.4" fill=${`url(#glow-${item.id})`}
        clip-path=${item.room_id ? `url(#room-${item.room_id})` : nothing} />`,
    );
  }

  private _floor(room: Room): RGB {
    return roomColor(this.colorMode, this.hass!, this.plan, room);
  }


  private _opening(o: Opening, thickness: number) {
    const [ax, ay] = o.wall.a;
    const [bx, by] = o.wall.b;
    const open = !!o.entity_id && this.hass!.states[o.entity_id]?.state === "on";
    const cls = `opening ${o.type} ${open ? "open" : ""} ${o.exterior ? "ext" : ""} ${o.entity_id ? "clickable" : ""}`;
    return svg`<g class=${cls} @click=${(e: Event) => (o.entity_id ? this._moreInfo(o.entity_id, e) : undefined)}>
      <line class="gap" x1=${ax} y1=${ay} x2=${bx} y2=${by} stroke-width=${thickness * 1.15} />
      ${o.type === "opening" || (o.type === "door" && open) ? nothing : svg`<line class="mark" x1=${ax} y1=${ay} x2=${bx} y2=${by} stroke-width=${thickness * 0.55} />`}
      ${o.type === "door" && open ? this._doorLeaf(o) : nothing}
      <line class="hit" x1=${ax} y1=${ay} x2=${bx} y2=${by} />
    </g>`;
  }

  /** Open door: the leaf swung into its room. */
  private _doorLeaf(o: Opening) {
    const [ax, ay] = o.wall.a;
    const [bx, by] = o.wall.b;
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 0.05) return nothing;
    let nx = -(by - ay) / len;
    let ny = (bx - ax) / len;
    const room = this.plan.rooms.find((r) => r.id === o.room_ids[0]);
    const mid: Point = [(ax + bx) / 2, (ay + by) / 2];
    if (room && !pointInPolygon([mid[0] + nx * 0.2, mid[1] + ny * 0.2], room.points)) {
      nx = -nx;
      ny = -ny;
    }
    const [hx, hy] = o.hinge === "left" ? [ax, ay] : [bx, by];
    return svg`<line class="leaf" x1=${hx} y1=${hy} x2=${hx + nx * len * 0.92} y2=${hy + ny * len * 0.92} />`;
  }

  private _item(item: Item, layout: Layout) {
    const st = this.hass!.states[item.entity_id];
    const kind = itemKind(item, st?.attributes.device_class);
    const active =
      kind === "radiator"
        ? st?.attributes.hvac_action === "heating"
        : ["on", "playing", "cleaning", "returning", "open"].includes(st?.state ?? "");
    const off = !st || st.state === "unavailable";
    const [x, y] = layout.toScreen(item.pos);
    const name = item.label || st?.attributes.friendly_name || item.entity_id;
    const caption = kind === "tv" ? tvCaption(tvInfo(st)) : "";
    const rgb = kind === "light" && active ? lightRgb(st) : undefined;
    return svg`<g class="item ${kind} ${active ? "active" : ""} ${off ? "off" : ""}" transform="translate(${x} ${y})"
      style=${rgb ? `--lamp: rgb(${rgb.join(",")})` : ""}
      @pointerdown=${() => (this._downAt = performance.now())}
      @click=${(e: Event) => {
        e.stopPropagation();
        if (this.tapItem && performance.now() - this._downAt < LONG_PRESS_MS) this.tapItem(item.entity_id);
        else this._moreInfo(item.entity_id);
      }}>
      <title>${name}</title>
      <circle r="16" class="hitpad" />
      ${active && (kind === "motion" || kind === "speaker") ? svg`<circle r="10" class="ping" /><circle r="10" class="ping late" />` : nothing}
      <circle r="10" class="disc" /><g class="glyph">${ITEM_GLYPHS[kind]}</g>
      ${caption ? svg`<text class="caption" y="26">${caption.length > 26 ? `${caption.slice(0, 25)}…` : caption}</text>` : nothing}
    </g>`;
  }

  private _label(room: Room, layout: Layout) {
    const hass = this.hass!;
    const temp = reading(hass, room.temp_entity);
    const hum = reading(hass, room.humidity_entity);
    const [x, y] = layout.toScreen(labelPoint(room.points));
    const flags = roomFlags(hass, this.plan, room, temp, hum);
    const tempText = temp ? (temp.available && temp.value !== null ? `${num(temp.value)}°` : "–") : "";
    const humText = hum?.available && hum.value !== null ? `${num(hum.value, 0)} %` : "";
    const cls = [
      "room-label",
      "clickable",
      temp && !temp.available ? "unavailable" : "",
      flags.some((f) => f.level === "alert") ? "alert" : "",
    ].join(" ");
    return html`<div class=${cls} style="left:${x}px;top:${y}px" @click=${(e: Event) => this._tap(room.id, e)}>
      <span class="name">${room.name || t().unnamed}</span>
      <span class="temp">${tempText}</span>
      <span class="hum">${humText}</span>
      <span class="icons">${flags.map((f) => html`<span class="icon ${f.level}" title=${f.text}>${unsafeHTML(ROOM_ICONS[f.icon])}</span>`)}</span>
    </div>`;
  }

  static override styles = [
    roomLabelStyles,
    css`
      :host {
        position: absolute;
        inset: 0;
        display: block;
        overflow: hidden;
      }
      svg.map {
        position: absolute;
        inset: 0;
      }
      .floor {
        stroke: none;
        transition: fill 1s ease;
        cursor: pointer;
      }
      .sel-outline {
        fill: none;
        stroke: var(--fp-accent);
        stroke-linejoin: miter;
        pointer-events: none;
      }
      .glow {
        pointer-events: none;
      }
      .opening .leaf {
        stroke: var(--fp-accent);
        stroke-width: 0.06;
        stroke-linecap: round;
      }
      .opening.ext .leaf {
        stroke: var(--fp-alert);
      }
      .wall {
        fill: none;
        stroke: var(--fp-wall, #d9dee5);
        stroke-linejoin: miter;
      }
      .furniture .body {
        fill: color-mix(in srgb, var(--fp-fg) 9%, transparent);
        stroke: color-mix(in srgb, var(--fp-fg) 22%, transparent);
        stroke-width: 0.02;
      }
      .furniture .g {
        fill: none;
        stroke: color-mix(in srgb, var(--fp-fg) 18%, transparent);
        stroke-width: 0.02;
      }
      .opening .gap {
        stroke: var(--fp-canvas);
      }
      .opening .mark {
        stroke: color-mix(in srgb, var(--fp-fg) 45%, var(--fp-canvas));
      }
      .opening.window .mark {
        stroke: color-mix(in srgb, var(--fp-frost) 60%, var(--fp-canvas));
      }
      .opening.open .mark {
        stroke: var(--fp-frost);
      }
      .opening.door.open .mark {
        stroke: var(--fp-accent);
      }
      .opening.door.open.ext .mark {
        stroke: var(--fp-alert);
      }
      .opening .hit {
        stroke: transparent;
        stroke-width: 0.5;
      }
      .opening.clickable {
        cursor: pointer;
      }
      .item {
        cursor: pointer;
      }
      .item .hitpad {
        fill: transparent;
      }
      .item .disc {
        fill: var(--fp-surface);
        stroke: color-mix(in srgb, var(--fp-fg) 35%, transparent);
        stroke-width: 1.5;
      }
      .item path,
      .item rect,
      .item circle:not(.disc):not(.hitpad) {
        fill: none;
        stroke: var(--fp-dim);
        stroke-width: 1.4;
      }
      .item .fill {
        fill: var(--fp-dim);
        stroke: none;
      }
      .item.active .disc {
        stroke: var(--fp-frost);
      }
      .item.active path,
      .item.active rect,
      .item.active circle:not(.disc):not(.hitpad) {
        stroke: var(--fp-frost);
      }
      .item.light.active .disc,
      .item.light.active .fill {
        fill: var(--lamp, var(--fp-lamp));
        stroke: var(--lamp, var(--fp-lamp));
      }
      .item.radiator.active .disc {
        fill: color-mix(in srgb, var(--fp-accent) 30%, var(--fp-surface));
        stroke: var(--fp-accent);
      }
      .item.radiator.active path {
        stroke: var(--fp-accent);
      }
      .item.off {
        opacity: 0.45;
      }
      .item .caption {
        font: 600 11px/1 var(--ha-font-family-body, system-ui, sans-serif);
        text-anchor: middle;
        fill: var(--fp-fg);
        stroke: var(--fp-surface);
        stroke-width: 3px;
        paint-order: stroke;
      }
      .room-label {
        position: absolute;
        transform: translate(-50%, -50%);
      }

      /* Animations */
      .ping {
        display: none;
        fill: none;
        stroke-width: 1.5;
        transform-box: fill-box;
        transform-origin: center;
      }
      .item.active.motion circle.ping {
        stroke: var(--fp-accent);
      }
      .item.active.speaker circle.ping {
        stroke: var(--fp-frost);
      }
      .anim .ping {
        display: block;
        animation: ping 1.8s ease-out infinite;
      }
      .anim .ping.late {
        animation-delay: 0.9s;
      }
      .anim .item.radiator.active .disc {
        animation: heat 2.4s ease-in-out infinite;
      }
      .anim .item.vacuum.active .glyph {
        transform-box: fill-box;
        transform-origin: center;
        animation: spin 3s linear infinite;
      }
      .anim .opening.window.open .mark {
        stroke-dasharray: 0.12 0.1;
        animation: air 1.4s linear infinite;
      }
      @keyframes ping {
        from {
          transform: scale(1);
          opacity: 0.8;
        }
        to {
          transform: scale(2.8);
          opacity: 0;
        }
      }
      @keyframes heat {
        50% {
          fill: color-mix(in srgb, var(--fp-accent) 55%, var(--fp-surface));
        }
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes air {
        to {
          stroke-dashoffset: -0.44;
        }
      }
    `,
  ];
}

if (!customElements.get("fp-live-map")) {
  customElements.define("fp-live-map", FpLiveMap);
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-live-map": FpLiveMap;
  }
}
