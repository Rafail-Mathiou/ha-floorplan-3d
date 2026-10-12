// <floorplan-3d-card-view>: content of the Lovelace card (view only). Loads the plan,
// follows saves from other devices and shows the 3D view (or the 2D live map).
// The light-weight <floorplan-3d-card> loader (card-loader.ts) creates it.
import { LitElement, css, html, nothing, type PropertyValues } from "lit";

import { errorMessage, fetchPlan, subscribePlan } from "./api";
import { activeFloor, floorView, sortedFloors } from "./floors";
import { setLanguage, t } from "./i18n";
import type { PlanData } from "./model";
import "./card-editor";
import "./scene/fp-scene";
import { configFloor, cssHeight, type CardConfig } from "./card-config";
import { themeVars } from "./theme";
import type { HomeAssistant } from "./types";

export class FpCardView extends LitElement {
  static override properties = {
    hass: { attribute: false },
    config: { attribute: false },
    _plan: { state: true },
    _error: { state: true },
    _floor: { state: true },
  };

  declare hass?: HomeAssistant;
  declare config: CardConfig;
  declare private _plan?: PlanData;
  declare private _error?: string;
  /** Floor picked in the card's switcher. */
  declare private _floor?: string;
  private _revision = -1;
  private _viewCache?: { plan: PlanData; floor: string | null; view: PlanData };
  private _loading = false;
  private _unsub?: Promise<() => Promise<void>>;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    void this._unsub?.then((unsub) => unsub()).catch(() => undefined);
    this._unsub = undefined;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass")) setLanguage(this.hass);
    if (this.hass && !this._unsub && this.isConnected) {
      // Subscribing also delivers the current revision, which triggers the first load
      this._unsub = subscribePlan(this.hass, (revision) => {
        if (revision !== this._revision) void this._load();
      });
      this._unsub.catch((err) => {
        this._error = errorMessage(err);
        void this._load();
      });
    }
  }

  private async _load(): Promise<void> {
    if (!this.hass || this._loading) return;
    this._loading = true;
    try {
      const doc = await fetchPlan(this.hass);
      this._revision = doc.revision;
      this._plan = { settings: doc.settings, floors: doc.floors, rooms: doc.rooms, openings: doc.openings, items: doc.items, furniture: doc.furniture };
      this._error = undefined;
    } catch (err) {
      this._error = t().loadFailed(errorMessage(err));
    } finally {
      this._loading = false;
    }
  }

  protected override render() {
    const height = cssHeight(this.config?.height);
    if (this._error && !this._plan) return html`<div class="msg" style="height:${height}">${this._error}</div>`;
    if (!this._plan) return html`<div class="msg" style="height:${height}">${t().loading}</div>`;
    const plan = this._plan;
    const fixed = configFloor(plan, this.config?.floor);
    const floor = fixed ?? activeFloor(plan, this._floor);
    const floors = sortedFloors(plan);
    return html`<fp-scene
      style="height:${height}"
      .hass=${this.hass}
      .plan=${this._view(plan, floor)}
      .forceMap=${this.config?.view === "2d"}
      .hideControls=${this.config?.controls === false}
    >
      ${!fixed && floors.length > 1
        ? html`<div slot="floors" class="floors" role="tablist" aria-label=${t().floors}>
            ${floors.map(
              (f) => html`<button role="tab" aria-selected=${f.id === floor} class=${f.id === floor ? "active" : ""} @click=${() => (this._floor = f.id)}>
                ${f.name || t().floorName(f.level)}
              </button>`,
            )}
          </div>`
        : nothing}
    </fp-scene>
    ${plan.rooms.length ? nothing : html`<div class="msg overlay">${t().emptyPlan}</div>`}`;
  }

  private _view(plan: PlanData, floor: string | null): PlanData {
    const c = this._viewCache;
    if (c && c.plan === plan && c.floor === floor) return c.view;
    const view = floorView(plan, floor);
    this._viewCache = { plan, floor, view };
    return view;
  }

  static override styles = [
    themeVars,
    css`
    :host {
      display: block;
      position: relative;
      color: var(--fp-fg);
      font-family: var(--fp-font);
      --fp-bg: var(--ha-card-background, var(--card-background-color, #151a21));
    }
    fp-scene {
      display: block;
      border-radius: inherit;
    }
    .msg {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      color: var(--secondary-text-color);
      text-align: center;
    }
    .floors {
      display: inline-flex;
      max-width: 100%;
      overflow-x: auto;
      padding: 3px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 12px;
      box-shadow: 0 6px 20px rgb(0 0 0 / 25%);
    }
    .floors button {
      flex: none;
      font: inherit;
      font-size: 13px;
      color: var(--fp-dim);
      background: none;
      border: none;
      border-radius: 9px;
      height: 30px;
      padding: 0 11px;
      cursor: pointer;
      white-space: nowrap;
    }
    .floors button.active {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .floors button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
  `,
  ];
}

if (!customElements.get("floorplan-3d-card-view")) {
  customElements.define("floorplan-3d-card-view", FpCardView);
}
