// <floorplan-3d-panel>: the sidebar panel with header, mode switch, editor, load and save, undo history.
import { LitElement, css, html, nothing, type PropertyValues } from "lit";

import { errorCode, errorMessage, fetchPlan, MAX_IMAGE_BYTES, savePlan, subscribePlan, UploadUnavailable, uploadImage } from "./api";
import demoPlan from "../../tests/fixtures/demo.json";
import { roomsBox } from "./editor/geometry";
import { exportPlan, parsePlan } from "./plan-io";
import { activeFloor, addFloor, floorView, importFloors, mergeFloor, removeFloor, sortedFloors, updateFloor } from "./floors";
import "./editor/plan-editor";
import type { FpPlanEditor, Tool } from "./editor/plan-editor";
import { homeFloors, roomsFromAreas } from "./ha";
import { num, setLanguage, t } from "./i18n";
import { icons } from "./icons";
import { themeVars } from "./theme";
import "./inspector/inspector";
import "./card";
import "./scene/fp-scene";
import { polygonArea, selectionKind, totalArea, type Background, type Floor, type PlanData, type Room } from "./model";
import type { HomeAssistant, PanelInfo } from "./types";

type Mode = "view" | "plan";

const HISTORY_LIMIT = 100;
const FLOOR_KEY = "floorplan-3d.floor";

/** Floor shown on this device. */
function loadFloor(): string | null {
  try {
    return localStorage.getItem(FLOOR_KEY);
  } catch {
    return null;
  }
}

/** Natural size of an image, undefined if it does not load. */
function imageSize(url: string): Promise<{ w: number; h: number } | undefined> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth && img.naturalHeight ? { w: img.naturalWidth, h: img.naturalHeight } : undefined);
    img.onerror = () => resolve(undefined);
    img.src = url;
  });
}

/** Unsaved state survives switching between Home Assistant pages. */
let cache: { plan: PlanData; saved: PlanData; revision: number; past: PlanData[]; future: PlanData[] } | undefined;

export class Floorplan3dPanel extends LitElement {
  static override properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    panel: { attribute: false },
    _plan: { state: true },
    _mode: { state: true },
    _tool: { state: true },
    _selected: { state: true },
    _saving: { state: true },
    _error: { state: true },
    _conflict: { state: true },
    _notice: { state: true },
    _sheet: { state: true },
    _floor: { state: true },
    _past: { state: true },
    _future: { state: true },
  };

  declare hass?: HomeAssistant;
  declare narrow: boolean;
  declare panel?: PanelInfo;

  declare private _plan?: PlanData;
  declare private _mode: Mode;
  declare private _tool: Tool;
  declare private _selected: string | null;
  declare private _saving: boolean;
  declare private _error?: string;
  /** Short confirmation (e.g. after an import). */
  declare private _notice?: string;
  /** "remote": changed elsewhere while there are local edits; "save": saving was rejected. */
  declare private _conflict: false | "remote" | "save";
  declare private _sheet: boolean;
  /** Floor chosen on this device (may no longer exist, see _activeFloor). */
  declare private _floor: string | null;
  declare private _past: PlanData[];
  declare private _future: PlanData[];

  /** Last saved plan (by reference) and its revision. */
  private _saved?: PlanData;
  private _revision = 0;
  /** Live sync subscription (unsubscribe), newest revision seen during a save. */
  private _unsub?: Promise<() => Promise<void>>;
  private _remoteRevision = 0;
  private _syncFailed = false;
  private _loading = false;
  /** Cached floor view, so the editor and the 3D view only update when it changes. */
  private _viewCache?: { plan: PlanData; floor: string | null; view: PlanData };

  constructor() {
    super();
    this.narrow = false;
    this._mode = "view";
    this._tool = "select";
    this._selected = null;
    this._saving = false;
    this._conflict = false;
    this._sheet = false;
    this._floor = loadFloor();
    this._past = [];
    this._future = [];
    this.addEventListener("keydown", this._onKeyDown);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("beforeunload", this._onBeforeUnload);
    if (cache && !this._plan) {
      this._plan = cache.plan;
      this._saved = cache.saved;
      this._revision = cache.revision;
      this._past = cache.past;
      this._future = cache.future;
    }
  }

  override disconnectedCallback(): void {
    window.removeEventListener("beforeunload", this._onBeforeUnload);
    void this._unsub?.then((unsub) => unsub()).catch(() => undefined);
    this._unsub = undefined;
    if (this._plan && this._saved) {
      cache = { plan: this._plan, saved: this._saved, revision: this._revision, past: this._past, future: this._future };
    }
    super.disconnectedCallback();
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass")) setLanguage(this.hass);
    if (changed.has("hass") && this.hass && !this._plan && !this._loading && !this._error) {
      void this._load();
    }
    if (this.hass && !this._unsub && !this._syncFailed) {
      // The websocket library re-subscribes by itself after a reconnect
      this._unsub = subscribePlan(this.hass, this._onRevision);
      this._unsub.catch(() => {
        this._unsub = undefined;
        this._syncFailed = true;
      });
    }
    if (this._mode === "plan" && this.hass && !this._isAdmin) {
      this._mode = "view";
    }
  }

  private get _isAdmin(): boolean {
    return this.hass?.user?.is_admin ?? false;
  }

  private get _dirty(): boolean {
    return !!this._plan && this._plan !== this._saved;
  }

  private _onBeforeUnload = (ev: BeforeUnloadEvent) => {
    if (this._dirty) ev.preventDefault();
  };

  private _onKeyDown = (ev: KeyboardEvent) => {
    if (!(ev.ctrlKey || ev.metaKey) || this._mode !== "plan") return;
    const target = ev.composedPath()[0];
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) return;
    const key = ev.key.toLowerCase();
    if (key === "z" && !ev.shiftKey) this._undo();
    else if (key === "y" || (key === "z" && ev.shiftKey)) this._redo();
    else if (key === "s") void this._save();
    else return;
    ev.preventDefault();
    ev.stopPropagation();
  };

  // ------------------------------------------------------------ Load / save

  /** Live sync: another panel saved. For our own saves the revision is already known. */
  private _onRevision = (revision: number): void => {
    this._remoteRevision = Math.max(this._remoteRevision, revision);
    if (this._saving || this._loading || !this._plan || revision <= this._revision) return;
    if (this._dirty) {
      // Keep the stronger "save" conflict (its banner offers to overwrite)
      if (this._conflict !== "save") this._conflict = "remote";
    }
    else void this._load(false);
  };

  private async _load(refit: boolean | Event = true): Promise<void> {
    if (!this.hass) return;
    this._loading = true;
    this._error = undefined;
    try {
      const doc = await fetchPlan(this.hass);
      const plan: PlanData = {
        settings: doc.settings,
        floors: doc.floors,
        rooms: doc.rooms,
        openings: doc.openings,
        items: doc.items,
        furniture: doc.furniture,
      };
      this._plan = plan;
      this._saved = plan;
      this._revision = doc.revision;
      this._past = [];
      this._future = [];
      this._conflict = false;
      cache = undefined;
      await this.updateComplete;
      if (refit !== false) this._editor?.fit();
    } catch (err) {
      this._error = t().loadFailed(errorMessage(err));
    } finally {
      this._loading = false;
    }
    // A save from elsewhere arrived while loading
    if (this._remoteRevision > this._revision) this._onRevision(this._remoteRevision);
  }

  private async _save(force = false): Promise<void> {
    if (!this.hass || !this._plan || this._saving || !this._dirty) return;
    const plan = this._plan;
    this._saving = true;
    this._error = undefined;
    try {
      // Overwrite: save on top of the newest revision
      const base = force ? (await fetchPlan(this.hass)).revision : this._revision;
      this._revision = await savePlan(this.hass, plan, base);
      this._saved = plan;
      this._conflict = false;
      cache = undefined;
    } catch (err) {
      if (errorCode(err) === "conflict") {
        this._conflict = "save";
      } else {
        this._error = t().saveFailed(errorMessage(err));
      }
    } finally {
      this._saving = false;
    }
    if (this._remoteRevision > this._revision) this._onRevision(this._remoteRevision);
  }

  // ------------------------------------------------------------ History

  private _apply(plan: PlanData): void {
    if (!this._plan || plan === this._plan) return;
    this._past = [...this._past, this._plan].slice(-HISTORY_LIMIT);
    this._future = [];
    this._plan = plan;
  }

  private _undo(): void {
    const prev = this._past.at(-1);
    if (!prev || !this._plan) return;
    this._future = [this._plan, ...this._future];
    this._past = this._past.slice(0, -1);
    this._plan = prev;
  }

  private _redo(): void {
    const next = this._future[0];
    if (!next || !this._plan) return;
    this._past = [...this._past, this._plan];
    this._future = this._future.slice(1);
    this._plan = next;
  }

  // ------------------------------------------------------------ Floors

  private get _activeFloor(): string | null {
    return this._plan ? activeFloor(this._plan, this._floor) : null;
  }

  /** The active floor of the plan (the whole plan without floors). */
  private _view(plan: PlanData): PlanData {
    const floor = activeFloor(plan, this._floor);
    const c = this._viewCache;
    if (c && c.plan === plan && c.floor === floor) return c.view;
    const view = floorView(plan, floor);
    this._viewCache = { plan, floor, view };
    return view;
  }

  /** A change from the planner or the side panel, made on the active floor. */
  private _applyView(view: PlanData): void {
    if (!this._plan) return;
    this._apply(mergeFloor(this._plan, this._activeFloor, view));
  }

  private async _setFloor(id: string | null): Promise<void> {
    if (!id || id === this._activeFloor) return;
    this._floor = id;
    this._selected = null;
    try {
      localStorage.setItem(FLOOR_KEY, id);
    } catch {
      // ignore
    }
    await this.updateComplete;
    this._editor?.fit();
  }

  private _addFloor = (): void => {
    if (!this._plan) return;
    const s = t();
    const levels = sortedFloors(this._plan).map((f) => f.level);
    const level = levels.length ? Math.max(...levels) + 1 : 1;
    const { plan, id } = addFloor(this._plan, s.floorName(level), s.floorName(0));
    this._apply(plan);
    void this._setFloor(id);
  };

  private _updateFloor(id: string, patch: Partial<Omit<Floor, "id">>): void {
    if (this._plan) this._apply(updateFloor(this._plan, id, patch));
  }

  private _removeFloor(id: string): void {
    if (!this._plan) return;
    this._apply(removeFloor(this._plan, id));
    this._selected = null;
  }

  /** Selects an object, switching to its floor first. */
  private async _selectObject(id: string, floor: string | null): Promise<void> {
    if (floor) await this._setFloor(floor);
    this._selected = id;
    this._sheet = true;
  }

  private _importFloors = (): void => {
    if (!this.hass || !this._plan) return;
    const hass = this.hass;
    this._apply(importFloors(this._plan, homeFloors(hass), (areaId) => hass.areas?.[areaId]?.floor_id));
    void this.updateComplete.then(() => this._editor?.fit());
  };

  // ------------------------------------------------------------ Getting started

  /** Replaces an empty plan with the demo home (undoable, applied when saved). */
  private _loadDemo = async (): Promise<void> => {
    if (!this._plan) return;
    const plan = parsePlan(JSON.stringify(demoPlan), this._plan.settings);
    if (!plan) return;
    this._mode = "plan";
    this._apply(plan);
    this._selected = null;
    this._notice = t().demoLoaded;
    await this.updateComplete;
    this._editor?.fit();
  };

  /** Opens the file picker for a background image (must run inside a click). */
  private _pickBackground = (): void => {
    (this.renderRoot.querySelector("input.bg-file") as HTMLInputElement | null)?.click();
  };

  private _onBackgroundFile = async (e: Event): Promise<void> => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file || !this.hass) return;
    const s = t();
    if (file.size > MAX_IMAGE_BYTES || !file.type.startsWith("image/")) {
      this._error = s.imageTooLarge;
      return;
    }
    this._error = undefined;
    this._notice = s.uploading;
    try {
      await this._setBackground(await uploadImage(this.hass, file));
    } catch (err) {
      this._notice = undefined;
      this._error = err instanceof UploadUnavailable ? s.uploadUnavailable : s.uploadFailed(errorMessage(err));
    }
  };

  /**
   * Puts an image on the active floor, about as wide as the rooms drawn so far (12 m
   * without rooms), and starts setting its scale.
   */
  private _setBackground = async (url: string): Promise<void> => {
    if (!this._plan) return;
    const size = await imageSize(url);
    if (!size) {
      this._notice = undefined;
      this._error = t().imageFailed;
      return;
    }
    const view = this._view(this._plan);
    const box = roomsBox(view.rooms);
    const width = Math.min(200, Math.max(box ? box.maxX - box.minX : 12, 4));
    const height = Math.min(200, Math.max(0.1, (width * size.h) / size.w));
    const background: Background = { url, x: box?.minX ?? 0, y: box?.minY ?? 0, width, height, opacity: 0.5, visible: true };
    this._mode = "plan";
    this._applyView({ ...view, settings: { ...view.settings, background } });
    this._notice = undefined;
    await this.updateComplete;
    this._editor?.fitBackground();
    this._editor?.calibrate();
  };

  private _startDrawing = (): void => {
    this._mode = "plan";
    this._tool = "room";
  };

  private _startAreas = async (): Promise<void> => {
    this._mode = "plan";
    await this.updateComplete;
    await this._importAreas();
  };

  private get _editor(): FpPlanEditor | null {
    return this.renderRoot.querySelector("fp-plan-editor");
  }

  /** Downloads the current (unsaved) plan as a JSON file. */
  private _exportPlan = (): void => {
    if (!this._plan) return;
    const url = URL.createObjectURL(new Blob([exportPlan(this._plan)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `floorplan-3d-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  /** Replaces the plan with an imported file (undoable; applied when saved). */
  private async _importPlan(text: string | null): Promise<void> {
    if (!this._plan) return;
    const plan = text === null ? undefined : parsePlan(text, this._plan.settings);
    if (!plan) {
      this._error = t().importFailed;
      return;
    }
    this._error = undefined;
    this._apply(plan);
    this._selected = null;
    this._notice = t().imported(plan.rooms.length);
    await this.updateComplete;
    this._editor?.fit();
  }

  private async _importAreas(): Promise<void> {
    if (!this.hass || !this._plan) return;
    const rooms = roomsFromAreas(this.hass, this._plan, this._activeFloor);
    if (!rooms.length) return;
    this._apply({ ...this._plan, rooms: [...this._plan.rooms, ...rooms] });
    this._selected = null;
    await this.updateComplete;
    this._editor?.fit();
  }

  // ------------------------------------------------------------ Rendering

  protected override render() {
    const s = t();
    return html`<div class="root">
      <header>
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <h1>${s.title}</h1>
        ${this._isAdmin
          ? html`<div class="modes" role="tablist" aria-label=${s.modes}>
              ${this._modeButton("view", s.modeView, icons.cube)} ${this._modeButton("plan", s.modePlan, icons.plan)}
            </div>`
          : nothing}
        ${this._plan ? this._renderFloors(this._plan) : nothing}
        <div class="spacer"></div>
        ${this._isAdmin && this._mode === "plan" && this._plan ? this._renderSaveBar() : nothing}
      </header>
      ${this._conflict
        ? html`<div class="banner warn" role="alert">
            <span class="text">${this._conflict === "remote" ? s.remoteChanged : s.conflict}</span>
            <button @click=${() => this._load(false)}>${s.reload}</button>
            ${this._conflict === "remote"
              ? html`<button @click=${() => (this._conflict = false)}>${s.keepEditing}</button>`
              : html`<button @click=${() => this._save(true)}>${s.overwrite}</button>`}
          </div>`
        : nothing}
      ${this._notice
        ? html`<div class="banner warn" role="status">
            <span class="text">${this._notice}</span>
            <button @click=${() => (this._notice = undefined)}>${s.ok}</button>
          </div>`
        : nothing}
      ${this._error
        ? html`<div class="banner error" role="alert">
            ${this._error} ${!this._plan ? html`<button @click=${this._load}>${s.retry}</button>` : nothing}
          </div>`
        : nothing}
      ${this._renderBody()}
      <input class="bg-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden @change=${this._onBackgroundFile} />
    </div>`;
  }

  /** First start (empty plan, administrator): ways to begin. */
  private _renderWelcome() {
    const s = t();
    const areas = this.hass ? Object.keys(this.hass.areas ?? {}).length : 0;
    const option = (icon: unknown, title: string, text: string, onClick: () => void, primary = false) =>
      html`<button class="start ${primary ? "primary-start" : ""}" @click=${onClick}>
        <span class="start-icon">${icon}</span>
        <span class="start-text"><b>${title}</b><span>${text}</span></span>
      </button>`;
    return html`<div class="welcome">
      <div class="welcome-card">
        <h2>${s.welcomeTitle}</h2>
        <p>${s.welcomeText}</p>
        <div class="starts">
          ${areas ? option(icons.import, s.startAreas, s.startAreasText(areas), this._startAreas, true) : nothing}
          ${option(icons.image, s.startTrace, s.startTraceText, this._pickBackground, !areas)}
          ${option(icons.room, s.startDraw, s.startDrawText, this._startDrawing)}
          ${option(icons.home, s.startDemo, s.startDemoText, this._loadDemo)}
        </div>
      </div>
    </div>`;
  }

  /** Floor switcher (only with two or more floors). */
  private _renderFloors(plan: PlanData) {
    const floors = sortedFloors(plan);
    if (floors.length < 2) return nothing;
    const active = this._activeFloor;
    const s = t();
    // Up to four floors as tabs; more floors and narrow screens get a drop-down
    const select = html`<select class="floor-select ${floors.length > 4 ? "" : "compact"}" aria-label=${s.floor} @change=${(e: Event) => this._setFloor((e.target as HTMLSelectElement).value)}>
      ${[...floors].reverse().map((f) => html`<option value=${f.id} ?selected=${f.id === active}>${f.name || s.floorName(f.level)}</option>`)}
    </select>`;
    if (floors.length > 4) return select;
    return html`<div class="floors" role="tablist" aria-label=${s.floors}>
        ${floors.map(
          (f) => html`<button role="tab" aria-selected=${f.id === active} class=${f.id === active ? "active" : ""} title=${f.name} @click=${() => this._setFloor(f.id)}>
            ${f.name || s.floorName(f.level)}
          </button>`,
        )}
      </div>
      ${select}`;
  }

  private _renderSaveBar() {
    const s = t();
    return html`
      <div class="history">
        <button title=${s.undoKey} aria-label=${s.undo} ?disabled=${!this._past.length} @click=${this._undo}>${icons.undo}</button>
        <button title=${s.redoKey} aria-label=${s.redo} ?disabled=${!this._future.length} @click=${this._redo}>${icons.redo}</button>
      </div>
      <span class="state ${this._dirty ? "dirty" : ""}">${this._saving ? s.saving : this._dirty ? s.unsaved : s.saved}</span>
      <button class="primary" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()} title=${s.saveKey}>${s.save}</button>
    `;
  }

  private _modeButton(mode: Mode, label: string, icon: unknown) {
    return html`<button
      role="tab"
      aria-selected=${this._mode === mode}
      class=${this._mode === mode ? "active" : ""}
      @click=${() => (this._mode = mode)}
    >
      ${icon}<span>${label}</span>
    </button>`;
  }

  private _renderBody() {
    const full = this._plan;
    if (!full) {
      return this._error ? nothing : html`<div class="center muted">${t().loading}</div>`;
    }
    if (this._mode === "view" && this._isAdmin && !full.rooms.length) return this._renderWelcome();
    if (this._mode === "view") {
      return html`<fp-scene .hass=${this.hass} .plan=${this._view(full)}></fp-scene>`;
    }
    const plan = this._view(full);
    const room = plan.rooms.find((r) => r.id === this._selected);
    return html`<div class="workspace">
      <fp-plan-editor
        .hass=${this.hass}
        .plan=${plan}
        .selected=${this._selected}
        .tool=${this._tool}
        @plan-change=${(e: CustomEvent<{ plan: PlanData }>) => this._applyView(e.detail.plan)}
        @select-room=${(e: CustomEvent<{ id: string | null }>) => {
          this._selected = e.detail.id;
          if (e.detail.id) this._sheet = true;
        }}
        @tool-change=${(e: CustomEvent<{ tool: Tool }>) => (this._tool = e.detail.tool)}
        @import-areas=${this._importAreas}
        @load-demo=${this._loadDemo}
        @pick-background=${this._pickBackground}
      ></fp-plan-editor>
      <aside class=${this._sheet ? "open" : ""}>
        <button class="sheet-handle" @click=${() => (this._sheet = !this._sheet)} aria-expanded=${this._sheet}>
          <span class="grip"></span>
          <span>${this._sheetTitle(plan, room)}</span>
        </button>
        <fp-inspector
          .hass=${this.hass}
          .plan=${plan}
          .full=${full}
          .floor=${this._activeFloor}
          .selected=${this._selected}
          @plan-change=${(e: CustomEvent<{ plan: PlanData }>) => this._applyView(e.detail.plan)}
          @floor-add=${this._addFloor}
          @floor-update=${(e: CustomEvent<{ id: string; patch: Partial<Floor> }>) => this._updateFloor(e.detail.id, e.detail.patch)}
          @floor-remove=${(e: CustomEvent<{ id: string }>) => this._removeFloor(e.detail.id)}
          @floors-import=${this._importFloors}
          @select-object=${(e: CustomEvent<{ id: string; floor: string | null }>) => this._selectObject(e.detail.id, e.detail.floor)}
          @pick-background=${this._pickBackground}
          @background-url=${(e: CustomEvent<{ url: string }>) => this._setBackground(e.detail.url)}
          @calibrate=${() => {
            this._sheet = false;
            this._editor?.fitBackground();
            this._editor?.calibrate();
          }}
          @select-room=${(e: CustomEvent<{ id: string | null }>) => (this._selected = e.detail.id)}
          @import-areas=${this._importAreas}
          @export-plan=${this._exportPlan}
          @import-plan=${(e: CustomEvent<{ text: string | null }>) => this._importPlan(e.detail.text)}
        ></fp-inspector>
      </aside>
    </div>`;
  }

  private _sheetTitle(plan: PlanData, room?: Room): string {
    const s = t();
    if (room) return `${room.name || s.unnamed}, ${num(polygonArea(room.points))} m²`;
    const kind = selectionKind(plan, this._selected);
    if (kind === "item") return s.device;
    if (kind === "opening") return s.doorWindow;
    if (kind === "furniture") return s.furniture;
    return s.homeArea(num(totalArea(plan)));
  }

  static override styles = [
    themeVars,
    css`
    :host {
      display: block;
      background: var(--fp-bg);
      color: var(--fp-fg);
      font-family: var(--fp-font);
      -webkit-font-smoothing: antialiased;
    }
    /* Own panel without the HA toolbar: full window height */
    .root {
      display: flex;
      flex-direction: column;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
    }

    header {
      display: flex;
      align-items: center;
      gap: 10px;
      height: var(--header-height, 56px);
      padding: 0 12px 0 4px;
      background: var(--fp-surface);
      border-bottom: 1px solid var(--fp-line);
      box-sizing: border-box;
      flex-shrink: 0;
    }
    h1 {
      margin: 0 6px 0 0;
      font-size: 19px;
      font-weight: 400;
      white-space: nowrap;
    }
    .spacer {
      flex: 1;
    }

    button {
      font: inherit;
      color: var(--fp-fg);
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    button:disabled {
      opacity: 0.38;
      cursor: default;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    button.primary {
      background: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
      padding: 0 16px;
      height: 36px;
      border-radius: 10px;
    }

    .modes {
      display: inline-flex;
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 11px;
      padding: 3px;
    }
    .modes button {
      color: var(--fp-dim);
      border-radius: 8px;
      height: 30px;
      padding: 0 12px;
    }
    .modes button.active {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .modes svg {
      width: 17px;
      height: 17px;
    }

    .floors {
      display: inline-flex;
      min-width: 0;
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 11px;
      padding: 3px;
    }
    .floors button {
      display: block;
      min-width: 0;
      max-width: 140px;
      height: 30px;
      padding: 0 12px;
      border-radius: 8px;
      color: var(--fp-dim);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .floors button.active {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .floor-select {
      font: inherit;
      font-size: 14px;
      color: var(--fp-fg);
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 10px;
      height: 36px;
      padding: 0 8px;
      max-width: 160px;
      min-width: 0;
    }
    .floor-select.compact {
      display: none;
    }

    .history {
      display: flex;
    }
    .history button {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      justify-content: center;
      color: var(--fp-dim);
    }
    .history button:not(:disabled):hover {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .state {
      font-size: 13px;
      color: var(--fp-dim);
      white-space: nowrap;
    }
    .state.dirty {
      color: var(--fp-lamp);
    }
    .state.dirty::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
      margin-right: 7px;
      vertical-align: 1px;
    }

    .banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 9px 16px;
      font-size: 14px;
      line-height: 1.4;
    }
    .banner .text {
      flex: 1;
    }
    .banner button {
      flex-shrink: 0;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid currentColor;
    }
    .banner.warn {
      background: color-mix(in srgb, var(--fp-lamp) 16%, var(--fp-surface));
    }
    .banner.error {
      background: color-mix(in srgb, var(--fp-alert) 20%, var(--fp-surface));
    }

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
    }
    fp-plan-editor {
      min-height: 0;
    }
    fp-scene {
      flex: 1;
      min-height: 0;
    }
    aside {
      min-height: 0;
      overflow-y: auto;
      background: var(--fp-surface);
      border-left: 1px solid var(--fp-line);
    }
    .sheet-handle {
      display: none;
    }

    .welcome {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      display: grid;
      place-items: center;
      padding: 24px 16px;
      background: var(--fp-canvas);
    }
    .welcome-card {
      width: min(560px, 100%);
    }
    .welcome h2 {
      margin: 0 0 8px;
      font-size: 24px;
      font-weight: 400;
    }
    .welcome p {
      margin: 0 0 22px;
      color: var(--fp-dim);
      line-height: 1.5;
    }
    .starts {
      display: grid;
      gap: 10px;
    }
    button.start {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      width: 100%;
      padding: 14px 16px;
      text-align: left;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
    }
    button.start:hover {
      border-color: var(--fp-accent);
    }
    button.primary-start {
      border-color: color-mix(in srgb, var(--fp-accent) 60%, var(--fp-line));
    }
    .start-icon {
      flex: none;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 11px;
      background: var(--fp-surface-2);
      color: var(--fp-accent);
    }
    .start-text {
      display: flex;
      flex-direction: column;
      gap: 3px;
      line-height: 1.4;
    }
    .start-text b {
      font-weight: 500;
    }
    .start-text span {
      color: var(--fp-dim);
      font-size: 13.5px;
    }

    .center {
      flex: 1;
      display: grid;
      place-items: center;
      padding: 24px;
      text-align: center;
    }
    .muted {
      color: var(--fp-dim);
    }

    @media (max-width: 760px) {
      h1 {
        display: none;
      }
      .modes button span,
      .state {
        display: none;
      }
      .modes button {
        padding: 0 10px;
      }
      .floors {
        display: none;
      }
      .floor-select.compact {
        display: block;
      }
      .workspace {
        grid-template-columns: 1fr;
        grid-template-rows: minmax(0, 1fr) auto;
      }
      aside {
        border-left: none;
        border-top: 1px solid var(--fp-line);
        max-height: 48px;
        overflow: hidden;
        transition: max-height 200ms ease;
      }
      aside.open {
        max-height: 55vh;
        overflow-y: auto;
      }
      .sheet-handle {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        height: 48px;
        justify-content: center;
        font-size: 14px;
        position: sticky;
        top: 0;
        background: var(--fp-surface);
        z-index: 1;
      }
      .grip {
        width: 36px;
        height: 4px;
        border-radius: 2px;
        background: var(--fp-line-strong);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      aside {
        transition: none;
      }
    }
  `,
  ];
}

if (!customElements.get("floorplan-3d-panel")) {
  customElements.define("floorplan-3d-panel", Floorplan3dPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    "floorplan-3d-panel": Floorplan3dPanel;
  }
}
