// <fp-inspector>: properties of the selected object or of the whole plan.
import { LitElement, css, html, nothing } from "lit";

import { candidates, contactCandidates, FURNITURE, FURNITURE_CATEGORIES, furnitureEntry } from "../catalog";
import { bbox, edgeLength, isAxisRect, mm, moveTo, pointInPolygon, resizeTo, translate } from "../editor/geometry";
import { floorsOf, sortedFloors } from "../floors";
import { missingEntities } from "../problems";
import { friendlyName, homeAreas, homeFloors, roomsFromAreas, sensorOptions } from "../ha";
import { collator, num, parseNum, t } from "../i18n";
import { icons } from "../icons";
import {
  itemKind,
  keepsWall,
  planThresholds,
  newId,
  polygonArea,
  radiatorWidth,
  totalArea,
  type Background,
  type Furniture,
  type FurnitureType,
  type Item,
  type ItemKind,
  type Opening,
  type PlanData,
  type PlanSettings,
  type Room,
  type RoomTap,
} from "../model";
import { MAX_IMPORT_BYTES } from "../plan-io";

const ROOM_TAP_OPTIONS: RoomTap[] = ["focus", "isolate", "none"];
import type { HomeAssistant } from "../types";

const de = (v: number, digits = 2) => num(v, digits);

const GRID_OPTIONS = [0.05, 0.1, 0.25, 0.5];
const MISSING_SHOWN = 6;
/** Same rule as the server: a path in Home Assistant or an https URL. */
const IMAGE_URL = /^(\/(?!\/)|https:\/\/)[^\s"'<>]+$/;

export class FpInspector extends LitElement {
  static override properties = {
    hass: { attribute: false },
    plan: { attribute: false },
    full: { attribute: false },
    floor: { attribute: false },
    selected: { attribute: false },
    _allMissing: { state: true },
  };

  declare hass?: HomeAssistant;
  /** The active floor (the whole plan without floors). */
  declare plan: PlanData;
  /** The whole plan with every floor. */
  declare full?: PlanData;
  /** Active floor ID (null without floors). */
  declare floor?: string | null;
  declare selected: string | null;
  /** Show the whole list of missing entities. */
  declare private _allMissing: boolean;

  constructor() {
    super();
    this._allMissing = false;
  }

  private _emit(name: string, detail: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _commit(plan: PlanData): void {
    this._emit("plan-change", { plan });
  }

  private _updateRoom(id: string, patch: Partial<Room>): void {
    this._commit({ ...this.plan, rooms: this.plan.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  }

  private _updateSettings(patch: Partial<PlanSettings>): void {
    this._commit({ ...this.plan, settings: { ...this.plan.settings, ...patch } });
  }

  protected override render() {
    if (!this.plan) return nothing;
    const id = this.selected;
    const room = this.plan.rooms.find((r) => r.id === id);
    if (room) return this._renderRoom(room);
    const item = this.plan.items.find((i) => i.id === id);
    if (item) return this._renderItem(item);
    const opening = this.plan.openings.find((o) => o.id === id);
    if (opening) return this._renderOpening(opening);
    const furniture = this.plan.furniture.find((f) => f.id === id);
    if (furniture) return this._renderFurniture(furniture);
    return this._renderPlan();
  }

  private _back() {
    return html`<button class="back" title=${t().back} aria-label=${t().back} @click=${() => this._emit("select-room", { id: null })}>
      ${icons.close}
    </button>`;
  }

  private _actions(onDuplicate: (() => void) | undefined, onDelete: () => void) {
    return html`<div class="actions">
      ${onDuplicate ? html`<button @click=${onDuplicate}>${icons.copy} ${t().duplicate}</button>` : nothing}
      <button class="danger" @click=${onDelete}>${icons.trash} ${t().delete}</button>
    </div>`;
  }

  /** Text field with entity suggestions; only existing entity IDs are accepted. */
  private _entityField(label: string, value: string | null, options: string[], onChange: (v: string | null) => void, allowEmpty: boolean) {
    const hass = this.hass;
    const listId = `dl-${label.replace(/\W/g, "")}`;
    const state = value && hass ? hass.states[value] : undefined;
    return html`<label class="field">
      <span>${label}${state ? html`<em>${state.state === "on" ? t().stateOn : state.state === "off" ? t().stateOff : state.state}</em>` : nothing}</span>
      <input
        class="entity"
        list=${listId}
        .value=${value ?? ""}
        placeholder=${allowEmpty ? t().none : t().chooseEntity}
        spellcheck="false"
        @focus=${(e: Event) => (e.target as HTMLInputElement).select()}
        @keydown=${blurOnEnter}
        @change=${(e: Event) => {
          const input = e.target as HTMLInputElement;
          const v = input.value.trim();
          if (!v && allowEmpty) return onChange(null);
          if (hass?.states[v]) return onChange(v);
          input.value = value ?? "";
        }}
      />
      <datalist id=${listId}>
        ${options.slice(0, 400).map((id) => html`<option value=${id}>${hass ? friendlyName(hass, id) : id}</option>`)}
      </datalist>
      ${value && hass && !hass.states[value] && Object.keys(hass.states).length
        ? html`<small class="warn">${t().entityMissing}</small>`
        : value && hass
          ? html`<small>${friendlyName(hass, value)}</small>`
          : nothing}
    </label>`;
  }

  // ------------------------------------------------------------ Device

  private _updateItem(id: string, patch: Partial<Item>): void {
    this._commit({ ...this.plan, items: this.plan.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) });
  }

  private _renderItem(item: Item) {
    const hass = this.hass;
    const kind = itemKind(item, hass?.states[item.entity_id]?.attributes.device_class);
    const room = this.plan.rooms.find((r) => r.id === item.room_id);
    const kinds: ItemKind[] = ["auto", "radiator", "light", "tv", "speaker", "sensor", "motion", "vacuum", "generic"];
    const s = t();
    return html`
      <div class="head">
        <input
          class="title"
          .value=${item.label ?? ""}
          placeholder=${hass ? friendlyName(hass, item.entity_id) : s.kinds[kind]}
          aria-label=${s.label}
          maxlength="100"
          @change=${(e: Event) => this._updateItem(item.id, { label: (e.target as HTMLInputElement).value.trim() || null })}
          @keydown=${blurOnEnter}
        />
        ${this._back()}
      </div>
      <p class="sub">${s.kinds[kind] ?? s.device}${room ? `, ${room.name}` : ""}</p>
      <section>
        ${this._entityField(s.entity, item.entity_id, hass ? candidates(hass, item.kind === "auto" ? kind : item.kind) : [], (v) => v && this._updateItem(item.id, { entity_id: v }), false)}
        <label class="field">
          <span>${s.appearance}</span>
          <select @change=${(e: Event) => this._updateItem(item.id, { kind: (e.target as HTMLSelectElement).value as ItemKind })}>
            ${kinds.map((k) => html`<option value=${k} ?selected=${k === item.kind}>${k === "auto" ? s.automatic(s.kinds[kind]) : s.kinds[k]}</option>`)}
          </select>
        </label>
      </section>
      <section>
        <h3>${s.placement}</h3>
        <div class="grid2">
          ${this._number(s.posX, item.pos[0], "m", -100, 100, (v) => this._moveItem(item, [v, item.pos[1]]))}
          ${this._number(s.posY, item.pos[1], "m", -100, 100, (v) => this._moveItem(item, [item.pos[0], v]))}
          ${this._number(s.height, item.height, "m", 0, 5, (v) => this._updateItem(item.id, { height: v }))}
          ${this._number(s.rotation, item.rotation, "°", -360, 360, (v) => this._updateItem(item.id, { rotation: v }), 0)}
          ${kind === "radiator"
            ? this._number(s.radiatorLength, radiatorWidth(item), "m", 0.2, 4, (v) => this._updateItem(item.id, { width: v }))
            : nothing}
        </div>
        <p class="hint">${s.rotationHint}</p>
        <label class="check">
          <input
            type="checkbox"
            .checked=${keepsWall(item, kind)}
            @change=${(e: Event) => this._updateItem(item.id, { keep_wall: (e.target as HTMLInputElement).checked })}
          />
          <span>${s.keepWall}</span>
        </label>
      </section>
      ${this._actions(
        () => {
          const copy: Item = { ...item, id: newId("i"), pos: [mm(item.pos[0] + 0.4), mm(item.pos[1] + 0.4)] };
          this._commit({ ...this.plan, items: [...this.plan.items, copy] });
          this._emit("select-room", { id: copy.id });
        },
        () => {
          this._commit({ ...this.plan, items: this.plan.items.filter((i) => i.id !== item.id) });
          this._emit("select-room", { id: null });
        },
      )}
    `;
  }

  private _moveItem(item: Item, pos: [number, number]): void {
    const room = this.plan.rooms.find((r) => pointInPolygon(pos, r.points));
    this._updateItem(item.id, { pos, room_id: room?.id ?? null });
  }

  // ------------------------------------------------------------ Door / window

  private _updateOpening(id: string, patch: Partial<Opening>): void {
    this._commit({ ...this.plan, openings: this.plan.openings.map((o) => (o.id === id ? { ...o, ...patch } : o)) });
  }

  private _renderOpening(o: Opening) {
    const hass = this.hass;
    const width = edgeLength(o.wall.a, o.wall.b);
    const names = o.room_ids.map((id) => this.plan.rooms.find((r) => r.id === id)?.name ?? "?");
    const s = t();
    const typeLabel = s.openings[o.type];
    const setWidth = (w: number) => {
      const cx = (o.wall.a[0] + o.wall.b[0]) / 2;
      const cy = (o.wall.a[1] + o.wall.b[1]) / 2;
      const ux = (o.wall.b[0] - o.wall.a[0]) / (width || 1);
      const uy = (o.wall.b[1] - o.wall.a[1]) / (width || 1);
      this._updateOpening(o.id, {
        wall: { a: [mm(cx - (ux * w) / 2), mm(cy - (uy * w) / 2)], b: [mm(cx + (ux * w) / 2), mm(cy + (uy * w) / 2)] },
      });
    };
    return html`
      <div class="head"><h2>${typeLabel}</h2>${this._back()}</div>
      <p class="sub">${names.length ? names.join(" ↔ ") : s.noRoom}</p>
      <section>
        <div class="segmented" role="radiogroup" aria-label=${s.type}>
          ${(["door", "window", "opening"] as const).map(
            (type) => html`<button
              role="radio"
              aria-checked=${o.type === type}
              class=${o.type === type ? "on" : ""}
              @click=${() => this._updateOpening(o.id, { type })}
            >
              ${s.openings[type]}
            </button>`,
          )}
        </div>
        <div class="grid2">${this._number(s.width, width, "m", 0.3, 6, setWidth)}</div>
        ${o.type !== "opening"
          ? this._entityField(s.contact, o.entity_id, hass ? contactCandidates(hass) : [], (v) => this._updateOpening(o.id, { entity_id: v }), true)
          : nothing}
        <label class="check">
          <input type="checkbox" .checked=${o.exterior} @change=${(e: Event) => this._updateOpening(o.id, { exterior: (e.target as HTMLInputElement).checked })} />
          <span>${s.exterior}</span>
        </label>
        ${o.type === "door"
          ? html`<div class="row-buttons">
              <button @click=${() => this._updateOpening(o.id, { hinge: o.hinge === "left" ? "right" : "left" })}>
                ${icons.rotate} ${s.flipHinge}
              </button>
              ${o.room_ids.length === 2
                ? html`<button @click=${() => this._updateOpening(o.id, { room_ids: [o.room_ids[1], o.room_ids[0]] })}>
                    ${s.opensInto(names[0])}
                  </button>`
                : nothing}
            </div>`
          : nothing}
        <p class="hint">${s.openingHint}</p>
      </section>
      ${this._actions(undefined, () => {
        this._commit({ ...this.plan, openings: this.plan.openings.filter((x) => x.id !== o.id) });
        this._emit("select-room", { id: null });
      })}
    `;
  }

  // ------------------------------------------------------------ Furniture

  private _updateFurniture(id: string, patch: Partial<Furniture>): void {
    this._commit({ ...this.plan, furniture: this.plan.furniture.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  }

  private _renderFurniture(f: Furniture) {
    const s = t();
    const typeLabel = s.furnitureTypes[furnitureEntry(f.type).type];
    return html`
      <div class="head">
        <input
          class="title"
          .value=${f.label ?? ""}
          placeholder=${typeLabel}
          aria-label=${s.label}
          maxlength="100"
          @change=${(e: Event) => this._updateFurniture(f.id, { label: (e.target as HTMLInputElement).value.trim() || null })}
          @keydown=${blurOnEnter}
        />
        ${this._back()}
      </div>
      <p class="sub">${s.furnitureOf(typeLabel)}</p>
      <section>
        <label class="field">
          <span>${s.type}</span>
          <select
            @change=${(e: Event) => {
              const type = (e.target as HTMLSelectElement).value as FurnitureType;
              this._updateFurniture(f.id, { type, size: [...furnitureEntry(type).size] });
            }}
          >
            ${FURNITURE_CATEGORIES.map(
              (c) => html`<optgroup label=${s.furnitureCategories[c]}>
                ${FURNITURE.filter((x) => x.category === c).map(
                  (x) => html`<option value=${x.type} ?selected=${x.type === f.type}>${s.furnitureTypes[x.type]}</option>`,
                )}
              </optgroup>`,
            )}
          </select>
        </label>
        <div class="grid2">
          ${this._number(s.width, f.size[0], "m", 0.05, 20, (v) => this._updateFurniture(f.id, { size: [v, f.size[1]] }))}
          ${this._number(s.depth, f.size[1], "m", 0.05, 20, (v) => this._updateFurniture(f.id, { size: [f.size[0], v] }))}
          ${this._number(s.posX, f.pos[0], "m", -100, 100, (v) => this._updateFurniture(f.id, { pos: [v, f.pos[1]] }))}
          ${this._number(s.posY, f.pos[1], "m", -100, 100, (v) => this._updateFurniture(f.id, { pos: [f.pos[0], v] }))}
          ${this._number(s.rotation, f.rotation, "°", -360, 360, (v) => this._updateFurniture(f.id, { rotation: v }), 0)}
        </div>
        <div class="row-buttons">
          <button @click=${() => this._updateFurniture(f.id, { rotation: norm(f.rotation - 90) })}>↺ 90°</button>
          <button @click=${() => this._updateFurniture(f.id, { rotation: norm(f.rotation + 90) })}>↻ 90°</button>
        </div>
        <p class="hint">${s.furnitureHint}</p>
      </section>
      ${this._actions(
        () => {
          const copy: Furniture = { ...f, id: newId("f"), pos: [mm(f.pos[0] + 0.4), mm(f.pos[1] + 0.4)] };
          this._commit({ ...this.plan, furniture: [...this.plan.furniture, copy] });
          this._emit("select-room", { id: copy.id });
        },
        () => {
          this._commit({ ...this.plan, furniture: this.plan.furniture.filter((x) => x.id !== f.id) });
          this._emit("select-room", { id: null });
        },
      )}
    `;
  }

  // ------------------------------------------------------------ Room

  private _renderRoom(room: Room) {
    const box = bbox(room.points);
    const width = box.maxX - box.minX;
    const depth = box.maxY - box.minY;
    const rect = isAxisRect(room.points);
    const perimeter = room.points.reduce((sum, p, i) => sum + edgeLength(p, room.points[(i + 1) % room.points.length]), 0);
    const s = t();

    return html`
      <div class="head">
        <button class="back" title=${s.backRooms} aria-label=${s.backRooms} @click=${() => this._emit("select-room", { id: null })}>
          ${icons.close}
        </button>
        <input
          class="title"
          .value=${room.name}
          maxlength="100"
          aria-label=${s.roomName}
          placeholder=${s.roomName}
          @change=${(e: Event) => this._updateRoom(room.id, { name: (e.target as HTMLInputElement).value.trim() })}
          @keydown=${blurOnEnter}
        />
      </div>

      <div class="hero">
        <span class="value">${de(polygonArea(room.points), 1)}</span><span class="unit">m²</span>
      </div>
      <p class="sub">
        ${rect ? s.rectangle : s.corners(room.points.length)}, ${s.perimeter(de(perimeter))}
      </p>

      <section>
        <h3>${rect ? s.size : s.outerSize}</h3>
        <div class="grid2">
          ${this._number(s.width, width, "m", 0.3, 100, (v) => this._updateRoom(room.id, { points: resizeTo(room.points, v, depth) }))}
          ${this._number(s.length, depth, "m", 0.3, 100, (v) => this._updateRoom(room.id, { points: resizeTo(room.points, width, v) }))}
          ${this._number(s.posX, box.minX, "m", -100, 100, (v) => this._updateRoom(room.id, { points: moveTo(room.points, v, box.minY) }))}
          ${this._number(s.posY, box.minY, "m", -100, 100, (v) => this._updateRoom(room.id, { points: moveTo(room.points, box.minX, v) }))}
        </div>
      </section>

      ${this.hass ? this._renderHa(room) : nothing}

      <div class="actions">
        <button @click=${() => this._duplicate(room)}>${icons.copy} ${s.duplicate}</button>
        <button class="danger" @click=${() => this._delete(room)}>${icons.trash} ${s.delete}</button>
      </div>
    `;
  }

  private _renderHa(room: Room) {
    const hass = this.hass!;
    const areas = homeAreas(hass);
    const s = t();
    return html`
      <section>
        <h3>Home Assistant</h3>
        <label class="field">
          <span>${s.area}</span>
          <select
            @change=${(e: Event) => this._updateRoom(room.id, { area_id: (e.target as HTMLSelectElement).value || null })}
          >
            <option value="" ?selected=${!room.area_id}>${s.noArea}</option>
            ${areas.map((a) => html`<option value=${a.area_id} ?selected=${a.area_id === room.area_id}>${a.name}</option>`)}
          </select>
        </label>
        ${this._sensorSelect(s.temperature, "temperature", room, "temp_entity")}
        ${this._sensorSelect(s.humidity, "humidity", room, "humidity_entity")}
      </section>
    `;
  }

  private _sensorSelect(label: string, deviceClass: string, room: Room, key: "temp_entity" | "humidity_entity") {
    const hass = this.hass!;
    const options = sensorOptions(hass, deviceClass, room.area_id);
    const current = room[key];
    const inArea = options.filter((o) => o.inArea);
    const other = options.filter((o) => !o.inArea);
    const state = current ? hass.states[current] : undefined;
    const value = state && !["unknown", "unavailable"].includes(state.state)
      ? `${de(Number(state.state), 1)} ${state.attributes.unit_of_measurement ?? ""}`
      : state
        ? t().notAvailable
        : "";
    return html`<label class="field">
      <span>${label}${value ? html`<em>${value}</em>` : nothing}</span>
      <select @change=${(e: Event) => this._updateRoom(room.id, { [key]: (e.target as HTMLSelectElement).value || null })}>
        <option value="" ?selected=${!current}>${t().noSensorOption}</option>
        ${current && !options.some((o) => o.entityId === current)
          ? html`<option value=${current} selected>${current}</option>`
          : nothing}
        ${inArea.length
          ? html`<optgroup label=${t().inThisArea}>
              ${inArea.map((o) => html`<option value=${o.entityId} ?selected=${o.entityId === current}>${o.name}</option>`)}
            </optgroup>`
          : nothing}
        <optgroup label=${inArea.length ? t().more : t().allSensors}>
          ${other.map((o) => html`<option value=${o.entityId} ?selected=${o.entityId === current}>${o.name}</option>`)}
        </optgroup>
      </select>
      ${current && !state && Object.keys(hass.states).length ? html`<small class="warn">${t().entityMissing}</small>` : nothing}
    </label>`;
  }

  private _duplicate(room: Room): void {
    const copy: Room = { ...room, id: newId("r"), name: `${room.name} ${t().copySuffix}`, area_id: null, points: translate(room.points, 0.5, 0.5) };
    this._commit({ ...this.plan, rooms: [...this.plan.rooms, copy] });
    this._emit("select-room", { id: copy.id });
  }

  private _delete(room: Room): void {
    this._commit({ ...this.plan, rooms: this.plan.rooms.filter((r) => r.id !== room.id) });
    this._emit("select-room", { id: null });
  }

  // ------------------------------------------------------------ Plan

  private _renderPlan() {
    const plan = this.plan;
    const s = plan.settings;
    const pending = this.hass ? roomsFromAreas(this.hass, this.full ?? plan, this.floor ?? null).length : 0;
    const str = t();
    return html`
      <div class="head"><h2>${str.home}</h2></div>
      <div class="hero">
        <span class="value">${de(totalArea(plan), 1)}</span><span class="unit">m²</span>
      </div>
      <p class="sub">${plan.rooms.length} ${str.roomCount(plan.rooms.length)}</p>

      ${this._renderMissing()}

      <section>
        <h3>${str.roomsHeading}</h3>
        ${plan.rooms.length
          ? html`<ul class="rooms">
              ${[...plan.rooms]
                .sort((a, b) => a.name.localeCompare(b.name, collator()))
                .map(
                  (r) => html`<li>
                    <button @click=${() => this._emit("select-room", { id: r.id })}>
                      <span>${r.name || str.unnamed}</span><span class="m2">${de(polygonArea(r.points), 1)} m²</span>
                    </button>
                  </li>`,
                )}
            </ul>`
          : html`<p class="hint">${str.noRooms}</p>`}
        ${pending
          ? html`<button class="wide" @click=${() => this._emit("import-areas", {})}>
              ${icons.import} ${str.importN(pending)}
            </button>`
          : nothing}
      </section>

      ${this._renderFloors()}

      <section>
        <h3>${str.construction}</h3>
        <div class="grid2">
          ${this._number(str.wallHeight, s.wall_height, "m", 1.5, 5, (v) => this._updateSettings({ wall_height: v }))}
          ${this._number(str.wallThickness, s.wall_thickness * 100, "cm", 2, 60, (v) => this._updateSettings({ wall_thickness: mm(v / 100) }), 0)}
        </div>
        <label class="field">
          <span>${str.grid}</span>
          <select @change=${(e: Event) => this._updateSettings({ grid: Number((e.target as HTMLSelectElement).value) })}>
            ${GRID_OPTIONS.map((g) => html`<option value=${g} ?selected=${Math.abs(g - s.grid) < 1e-6}>${g * 100} cm</option>`)}
            ${GRID_OPTIONS.some((g) => Math.abs(g - s.grid) < 1e-6) ? nothing : html`<option value=${s.grid} selected>${s.grid * 100} cm</option>`}
          </select>
        </label>
      </section>

      ${this._renderLimits()}

      <section>
        <h3>${str.backup}</h3>
        <p class="hint">${str.backupHint}</p>
        <div class="grid2">
          <button class="wide" @click=${() => this._emit("export-plan", {})}>${icons.download} ${str.exportPlan}</button>
          <button class="wide" @click=${() => (this.renderRoot.querySelector("input.import") as HTMLInputElement | null)?.click()}>
            ${icons.import} ${str.importPlan}
          </button>
        </div>
        <input class="import" type="file" accept=".json,application/json" hidden @change=${this._onImportFile} />
      </section>

      <section>
        <h3>${str.view3d}</h3>
        <label class="field">
          <span>${str.roomTap}</span>
          <select @change=${(e: Event) => this._updateSettings({ room_tap: (e.target as HTMLSelectElement).value as RoomTap })}>
            ${ROOM_TAP_OPTIONS.map((o) => html`<option value=${o} ?selected=${o === (s.room_tap ?? "focus")}>${str.roomTapOptions[o]}</option>`)}
          </select>
        </label>
      </section>

      ${this._renderBackground(s.background)}

      <section>
        <h3>${str.contents}</h3>
        <p class="hint">${str.contentsText(plan.items.length, plan.openings.length, plan.furniture.length)}</p>
      </section>

      <section class="keys">
        <h3>${str.shortcuts}</h3>
        <dl>${str.keys.map(([k, d]) => html`<dt>${k}</dt><dd>${d}</dd>`)}</dl>
      </section>
    `;
  }

  /** Entities of the whole plan that Home Assistant no longer knows. */
  private _renderMissing() {
    if (!this.hass) return nothing;
    const full = this.full ?? this.plan;
    const missing = missingEntities(this.hass, full);
    if (!missing.length) return nothing;
    const str = t();
    const floors = floorsOf(full);
    const floorName = (id: string | null) => {
      const f = floors.find((x) => x.id === id);
      return f ? f.name || str.floorName(f.level) : "";
    };
    const name = (m: (typeof missing)[number]) => {
      if (m.kind === "room") return full.rooms.find((r) => r.id === m.id)?.name || str.unnamed;
      if (m.kind === "opening") {
        const o = full.openings.find((x) => x.id === m.id)!;
        const room = full.rooms.find((r) => r.id === o.room_ids[0])?.name;
        return room ? `${str.openings[o.type]}, ${room}` : str.openings[o.type];
      }
      const item = full.items.find((i) => i.id === m.id)!;
      return item.label || str.device;
    };
    return html`<section class="missing">
      <h3>${str.missingTitle(missing.length)}</h3>
      <p class="hint">${str.missingHint}</p>
      <ul>
        ${(this._allMissing ? missing : missing.slice(0, MISSING_SHOWN)).map(
          (m) => html`<li>
            <button @click=${() => this._emit("select-object", { id: m.id, floor: m.floor })}>
              <span>${name(m)}${floors.length > 1 ? html` <em>${floorName(m.floor)}</em>` : nothing}</span>
              <code>${m.entity}</code>
            </button>
          </li>`,
        )}
      </ul>
      ${!this._allMissing && missing.length > MISSING_SHOWN
        ? html`<button class="link more" @click=${() => (this._allMissing = true)}>${str.showMore(missing.length - MISSING_SHOWN)}</button>`
        : nothing}
    </section>`;
  }

  private _renderFloors() {
    const full = this.full ?? this.plan;
    const floors = sortedFloors(full).reverse();
    const str = t();
    const linked = new Set(floors.map((f) => f.floor_id));
    const missing = this.hass ? homeFloors(this.hass).filter((f) => !linked.has(f.floor_id)).length : 0;
    return html`<section>
      <h3>${str.floors}</h3>
      <p class="hint">${floors.length ? str.floorsHint : str.floorsSingle}</p>
      ${floors.length
        ? html`<ul class="floor-list">
            ${floors.map(
              (f) => html`<li class=${f.id === this.floor ? "current" : ""}>
                <input
                  .value=${f.name}
                  maxlength="100"
                  aria-label=${str.floorName(f.level)}
                  placeholder=${str.floorName(f.level)}
                  @keydown=${blurOnEnter}
                  @change=${(e: Event) => this._emit("floor-update", { id: f.id, patch: { name: (e.target as HTMLInputElement).value.trim() } })}
                />
                <input
                  class="level"
                  inputmode="numeric"
                  title=${str.floorLevel}
                  aria-label=${str.floorLevel}
                  .value=${String(f.level)}
                  @keydown=${blurOnEnter}
                  @change=${(e: Event) => {
                    const input = e.target as HTMLInputElement;
                    const v = Math.round(parseNum(input.value));
                    if (Number.isFinite(v) && v >= -10 && v <= 100) this._emit("floor-update", { id: f.id, patch: { level: v } });
                    else input.value = String(f.level);
                  }}
                />
                <button
                  class="icon"
                  title=${str.deleteFloor(f.name || str.floorName(f.level))}
                  aria-label=${str.deleteFloor(f.name || str.floorName(f.level))}
                  @click=${() => this._emit("floor-remove", { id: f.id })}
                >
                  ${icons.trash}
                </button>
              </li>`,
            )}
          </ul>`
        : nothing}
      <button class="wide" @click=${() => this._emit("floor-add", {})}>${icons.plus} ${str.addFloor}</button>
      ${missing ? html`<button class="wide" @click=${() => this._emit("floors-import", {})}>${icons.import} ${str.importFloors(missing)}</button>` : nothing}
    </section>`;
  }

  private _renderBackground(bg: Background | null) {
    const s = t();
    if (!bg) {
      const useUrl = (e: Event) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).querySelector("input")!;
        const url = input.value.trim();
        if (IMAGE_URL.test(url)) this._emit("background-url", { url });
        else input.setCustomValidity(s.imageUrlInvalid);
        input.reportValidity();
      };
      return html`<section>
        <h3>${s.background}</h3>
        <p class="hint">${s.backgroundHint}</p>
        <button class="wide" @click=${() => this._emit("pick-background", {})}>${icons.image} ${s.uploadImage}</button>
        <form class="url" @submit=${useUrl}>
          <input
            class="entity"
            placeholder="/local/plan.png"
            aria-label=${s.imageUrl}
            spellcheck="false"
            maxlength="300"
            @input=${(e: Event) => (e.target as HTMLInputElement).setCustomValidity("")}
          />
          <button type="submit">${s.useUrl}</button>
        </form>
        <p class="hint small">${s.imageUrlHint}</p>
      </section>`;
    }
    const set = (patch: Partial<Background>) => this._updateSettings({ background: { ...bg, ...patch } });
    const ratio = bg.height / bg.width;
    return html`<section>
      <h3>${s.background}</h3>
      <button class="wide" @click=${() => this._emit("calibrate", {})}>${icons.ruler} ${s.calibrate}</button>
      <p class="hint small">${s.calibrateHint}</p>
      <div class="grid2">
        ${this._number(s.posX, bg.x, "m", -100, 100, (v) => set({ x: v }))}
        ${this._number(s.posY, bg.y, "m", -100, 100, (v) => set({ y: v }))}
        ${this._number(s.width, bg.width, "m", 0.1, 200, (v) => set({ width: v, height: mm(Math.max(0.1, Math.min(200, v * ratio))) }))}
      </div>
      <label class="check">
        <input type="checkbox" .checked=${bg.visible} @change=${(e: Event) => set({ visible: (e.target as HTMLInputElement).checked })} />
        <span>${s.showInEditor}</span>
      </label>
      <label class="field">
        <span>${s.opacity}<em>${Math.round(bg.opacity * 100)} %</em></span>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          .value=${String(bg.opacity)}
          ?disabled=${!bg.visible}
          @change=${(e: Event) => set({ opacity: Number((e.target as HTMLInputElement).value) })}
        />
      </label>
      <div class="row-buttons">
        <button @click=${() => this._emit("pick-background", {})}>${icons.image} ${s.replaceImage}</button>
        <button class="link" @click=${() => this._updateSettings({ background: null })}>${icons.trash} ${s.removeImage}</button>
      </div>
    </section>`;
  }

  // ------------------------------------------------------------ Fields

  private _onImportFile = async (e: Event): Promise<void> => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) {
      this._emit("import-plan", { text: null });
      return;
    }
    this._emit("import-plan", { text: await file.text() });
  };

  /** Temperature scale and humidity/CO₂ limits; each value stays between its neighbours. */
  private _renderLimits() {
    const str = t();
    const ts = this.plan.settings.temp_scale;
    const th = planThresholds(this.plan);
    const temp = (key: keyof typeof ts) => (v: number) => this._updateSettings({ temp_scale: { ...ts, [key]: v } });
    const lim = (key: keyof typeof th) => (v: number) => this._updateSettings({ thresholds: { ...th, [key]: v } });
    return html`<section>
      <h3>${str.limits}</h3>
      <p class="hint">${str.limitsHint}</p>
      <div class="grid2">
        ${this._number(str.limCold, ts.cold, "°C", -10, ts.ok_low - 0.1, temp("cold"), 1)}
        ${this._number(str.limOkLow, ts.ok_low, "°C", ts.cold + 0.1, ts.ok_high - 0.1, temp("ok_low"), 1)}
        ${this._number(str.limOkHigh, ts.ok_high, "°C", ts.ok_low + 0.1, ts.hot - 0.1, temp("ok_high"), 1)}
        ${this._number(str.limHot, ts.hot, "°C", ts.ok_high + 0.1, 45, temp("hot"), 1)}
        ${this._number(str.limHumid, th.humidity, "%", 20, th.humidity_alert - 1, lim("humidity"), 0)}
        ${this._number(str.limHumidAlert, th.humidity_alert, "%", th.humidity + 1, 100, lim("humidity_alert"), 0)}
        ${this._number(str.limCo2, th.co2, "ppm", 400, th.co2_alert - 50, lim("co2"), 0)}
        ${this._number(str.limCo2Alert, th.co2_alert, "ppm", th.co2 + 50, 5000, lim("co2_alert"), 0)}
      </div>
    </section>`;
  }

  private _number(label: string, value: number, unit: string, min: number, max: number, onChange: (v: number) => void, digits = 2) {
    return html`<label class="field num">
      <span>${label}</span>
      <div class="input">
        <input
          inputmode="decimal"
          .value=${de(value, digits)}
          @focus=${(e: Event) => (e.target as HTMLInputElement).select()}
          @keydown=${blurOnEnter}
          @change=${(e: Event) => {
            const input = e.target as HTMLInputElement;
            const v = parseNum(input.value);
            if (Number.isFinite(v) && v >= min && v <= max) {
              if (Math.abs(v - value) > 1e-9) onChange(mm(v));
              else input.value = de(value, digits);
            } else {
              input.value = de(value, digits);
            }
          }}
        />
        <span class="unit">${unit}</span>
      </div>
    </label>`;
  }

  static override styles = css`
    :host {
      display: block;
      padding: 18px 18px 28px;
      color: var(--fp-fg);
      font-size: 14px;
    }
    .head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 14px;
    }
    .head h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
    .title {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 17px;
      font-weight: 500;
      color: var(--fp-fg);
      background: transparent;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 6px 8px;
      margin-left: -8px;
    }
    .title:hover {
      border-color: var(--fp-line);
    }
    .title:focus {
      outline: none;
      border-color: var(--fp-accent);
      background: var(--fp-surface-2);
    }
    .back {
      order: 2;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .back:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }

    .hero {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .hero .value {
      font-size: 44px;
      font-weight: 200;
      line-height: 1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    .hero .unit {
      font-size: 17px;
      color: var(--fp-dim);
    }
    .sub {
      margin: 6px 0 4px;
      color: var(--fp-dim);
      font-size: 13px;
    }

    section {
      margin-top: 22px;
    }
    h3 {
      margin: 0 0 10px;
      font-size: 13px;
      font-weight: 500;
      color: var(--fp-dim);
    }
    .grid2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 10px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;
      font-size: 12.5px;
      color: var(--fp-dim);
    }
    .grid2 .field {
      margin-bottom: 0;
    }
    .field > span {
      display: flex;
      justify-content: space-between;
    }
    .field em {
      font-style: normal;
      color: var(--fp-fg);
      font-variant-numeric: tabular-nums;
    }
    .input {
      min-width: 0;
      display: flex;
      align-items: center;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding-right: 10px;
    }
    .input:focus-within,
    select:focus {
      border-color: var(--fp-accent);
      outline: none;
    }
    .input input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 15px;
      color: var(--fp-fg);
      background: none;
      border: none;
      outline: none;
      padding: 8px 10px;
      font-variant-numeric: tabular-nums;
    }
    .input .unit {
      color: var(--fp-dim);
      font-size: 13px;
    }
    select {
      font: inherit;
      font-size: 14px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 8px 10px;
      width: 100%;
    }

    button {
      font: inherit;
      color: var(--fp-fg);
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .rooms {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
    }
    .rooms button {
      width: 100%;
      justify-content: space-between;
      padding: 9px 10px;
      border-radius: 9px;
      text-align: left;
    }
    .rooms button:hover {
      background: var(--fp-surface-2);
    }
    .rooms .m2 {
      color: var(--fp-dim);
      font-variant-numeric: tabular-nums;
    }
    .wide {
      width: 100%;
      justify-content: center;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px dashed var(--fp-line-strong);
      color: var(--fp-fg);
    }
    .wide:hover {
      border-color: var(--fp-accent);
      color: var(--fp-accent);
    }
    .hint {
      color: var(--fp-dim);
      line-height: 1.45;
      margin: 0 0 10px;
    }
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 24px;
    }
    .actions button {
      flex: 1;
      justify-content: center;
      padding: 9px 10px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .actions .danger:hover {
      color: var(--fp-alert);
      border-color: var(--fp-alert);
    }
    .check {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .check input,
    input[type="range"] {
      accent-color: var(--fp-accent);
    }
    .check input {
      width: 18px;
      height: 18px;
      margin: 0;
    }
    input[type="range"] {
      width: 100%;
      margin: 4px 0 0;
    }
    .link {
      color: var(--fp-dim);
      font-size: 13px;
      padding: 4px 0;
    }
    .link:hover {
      color: var(--fp-alert);
    }
    .field small {
      color: var(--fp-dim);
      font-size: 12px;
    }
    input.entity {
      font: inherit;
      font-size: 13.5px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 8px 10px;
      width: 100%;
      box-sizing: border-box;
    }
    input.entity:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .segmented {
      display: flex;
      gap: 2px;
      padding: 3px;
      margin-bottom: 12px;
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 10px;
    }
    .segmented button {
      flex: 1;
      justify-content: center;
      padding: 6px 4px;
      border-radius: 7px;
      color: var(--fp-dim);
      font-size: 13px;
    }
    .segmented button.on {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .row-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 4px 0 8px;
    }
    .row-buttons button {
      padding: 7px 10px;
      border-radius: 9px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      font-size: 13px;
    }
    .row-buttons button:hover {
      border-color: var(--fp-accent);
    }
    .head .back {
      margin-left: auto;
    }
    .warn,
    .field small.warn,
    .missing h3 {
      color: var(--fp-alert);
    }
    .link.more {
      margin-top: 6px;
    }
    .link.more:hover {
      color: var(--fp-fg);
    }
    .missing ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 4px;
    }
    .missing button {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 8px 10px;
      border-radius: 9px;
      text-align: left;
      border: 1px solid color-mix(in srgb, var(--fp-alert) 45%, var(--fp-line));
    }
    .missing button:hover {
      background: var(--fp-surface-2);
    }
    .missing em {
      font-style: normal;
      color: var(--fp-dim);
    }
    .missing code {
      font-size: 12px;
      color: var(--fp-alert);
      word-break: break-all;
    }
    form.url {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    form.url button {
      flex: none;
      padding: 0 14px;
      border-radius: 9px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .hint.small {
      font-size: 12.5px;
      margin-top: 6px;
    }
    .floor-list {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
      display: grid;
      gap: 6px;
    }
    .floor-list li {
      display: flex;
      gap: 6px;
      align-items: center;
      border-radius: 10px;
    }
    .floor-list input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 14px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 7px 10px;
    }
    .floor-list input.level {
      flex: none;
      width: 46px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
    .floor-list li.current input:first-child {
      border-color: var(--fp-accent);
    }
    .floor-list input:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .floor-list .icon {
      flex: none;
      width: 34px;
      height: 34px;
      justify-content: center;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .floor-list .icon:hover {
      color: var(--fp-alert);
      background: var(--fp-surface-2);
    }
    .wide + .wide {
      margin-top: 8px;
    }
    .keys dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 6px 12px;
      margin: 0;
      font-size: 12.5px;
    }
    .keys dt {
      color: var(--fp-fg);
      white-space: nowrap;
    }
    .keys dd {
      margin: 0;
      color: var(--fp-dim);
    }
    @media (pointer: coarse) {
      .keys {
        display: none;
      }
    }
  `;
}

function norm(deg: number): number {
  let d = ((deg % 360) + 360) % 360;
  if (d > 180) d -= 360;
  return d;
}

function blurOnEnter(e: KeyboardEvent): void {
  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
}

if (!customElements.get("fp-inspector")) {
  customElements.define("fp-inspector", FpInspector);
}

declare global {
  interface HTMLElementTagNameMap {
    "fp-inspector": FpInspector;
  }
}
