// <floorplan-3d-card-editor>: visual editor of the dashboard card. Uses Home Assistant's
// own <ha-form>, so it looks like the editors of the built-in cards.
import { LitElement, css, html, nothing, type PropertyValues } from "lit";

import { fetchPlan } from "./api";
import { configFromForm, formData, type CardConfig, type CardFormData } from "./card-config";
import { sortedFloors } from "./floors";
import { setLanguage, t } from "./i18n";
import type { Floor } from "./model";
import type { HomeAssistant } from "./types";

/** Makes sure <ha-form> is defined: it is loaded lazily by Home Assistant's own editors. */
async function ensureHaForm(): Promise<void> {
  if (customElements.get("ha-form")) return;
  const w = window as unknown as { loadCardHelpers?: () => Promise<{ createCardElement(c: unknown): HTMLElement }> };
  try {
    const helpers = await w.loadCardHelpers?.();
    const card = helpers?.createCardElement({ type: "entities", entities: [] });
    const ctor = card?.constructor as { getConfigElement?: () => Promise<unknown> } | undefined;
    await ctor?.getConfigElement?.();
  } catch {
    // The form then stays empty; YAML still works
  }
}

export class FpCardEditor extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _floors: { state: true },
    _ready: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: CardConfig;
  declare private _floors: Floor[];
  declare private _ready: boolean;
  private _loaded = false;

  constructor() {
    super();
    this._floors = [];
    this._ready = !!customElements.get("ha-form");
    if (!this._ready) void ensureHaForm().then(() => (this._ready = true));
  }

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass")) setLanguage(this.hass);
    if (this.hass && !this._loaded) {
      this._loaded = true;
      fetchPlan(this.hass).then(
        (doc) => (this._floors = sortedFloors(doc).reverse()),
        () => undefined,
      );
    }
  }

  private get _schema() {
    const s = t();
    return [
      ...(this._floors.length > 1
        ? [
            {
              name: "floor",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [{ value: "", label: s.cardAllFloors }, ...this._floors.map((f) => ({ value: f.id, label: f.name || s.floorName(f.level) }))],
                },
              },
            },
          ]
        : []),
      {
        name: "view",
        selector: { select: { mode: "list", options: [{ value: "auto", label: s.cardViewAuto }, { value: "2d", label: s.cardView2d }] } },
      },
      { name: "height", selector: { text: {} } },
      { name: "controls", selector: { boolean: {} } },
    ];
  }

  protected override render() {
    if (!this.hass || !this._config) return nothing;
    if (!this._ready) return html`<p class="muted">${t().loading}</p>`;
    const s = t();
    const labels: Record<string, string> = { floor: s.floor, view: s.cardView, height: s.cardHeight, controls: s.cardControls };
    const helpers: Record<string, string> = { height: s.cardHeightHelp, floor: s.cardFloorHelp };
    return html`<ha-form
      .hass=${this.hass}
      .data=${formData(this._config)}
      .schema=${this._schema}
      .computeLabel=${(f: { name: string }) => labels[f.name] ?? f.name}
      .computeHelper=${(f: { name: string }) => helpers[f.name]}
      @value-changed=${this._changed}
    ></ha-form>`;
  }

  private _changed(ev: CustomEvent<{ value: Partial<CardFormData> }>): void {
    ev.stopPropagation();
    if (!this._config) return;
    const config = configFromForm(this._config, ev.detail.value);
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  static override styles = css`
    .muted {
      color: var(--secondary-text-color);
    }
  `;
}

if (!customElements.get("floorplan-3d-card-editor")) {
  customElements.define("floorplan-3d-card-editor", FpCardEditor);
}
