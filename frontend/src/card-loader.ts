// <floorplan-3d-card>: Lovelace card (view only). The integration adds this small file
// to every frontend page; the large 3D bundle is only imported once a card is shown.
// Plain DOM, no dependencies, so the loader stays tiny.

interface CardConfig {
  type: string;
  height?: number | string;
  view?: "auto" | "2d";
  controls?: boolean;
  floor?: string;
}

interface ViewElement extends HTMLElement {
  hass?: unknown;
  config?: CardConfig;
}

/** Same URL (and cache-busting query) as the panel, so the module loads only once. */
const BUNDLE_URL = new URL(`./floorplan-3d.js${new URL(import.meta.url).search}`, import.meta.url).href;

let bundle: Promise<unknown> | undefined;
const loadBundle = () => (bundle ??= import(/* @vite-ignore */ BUNDLE_URL));

class Floorplan3dCard extends HTMLElement {
  private _config?: CardConfig;
  private _hass?: unknown;
  private _view?: ViewElement;

  setConfig(config: CardConfig): void {
    if (config.view && !["auto", "2d"].includes(config.view)) throw new Error('view must be "auto" or "2d"');
    this._config = config;
    if (this._view) this._view.config = config;
  }

  set hass(hass: unknown) {
    this._hass = hass;
    if (this._view) this._view.hass = hass;
    else this._create();
  }

  getCardSize(): number {
    const h = typeof this._config?.height === "number" ? this._config.height : 420;
    return Math.max(3, Math.round(h / 50));
  }

  /** Sections dashboards: full width, about 420 px high. */
  getGridOptions() {
    return { columns: 12, rows: 7, min_columns: 6, min_rows: 4 };
  }

  static getStubConfig(): Partial<CardConfig> {
    return { height: 420 };
  }

  /** Visual editor; it lives in the main bundle. */
  static async getConfigElement(): Promise<HTMLElement> {
    await loadBundle();
    return document.createElement("floorplan-3d-card-editor");
  }

  private _create(): void {
    if (this._view || !this._hass) return;
    if (!this.firstChild) {
      const card = document.createElement("ha-card");
      card.style.overflow = "hidden";
      this.appendChild(card);
    }
    loadBundle().then(
      () => {
        if (this._view) return;
        const view = document.createElement("floorplan-3d-card-view") as ViewElement;
        view.config = this._config;
        view.hass = this._hass;
        this._view = view;
        this.firstElementChild!.appendChild(view);
      },
      (err) => {
        this.firstElementChild!.textContent = `Floorplan 3D: ${String(err)}`;
      },
    );
  }
}

if (!customElements.get("floorplan-3d-card")) {
  customElements.define("floorplan-3d-card", Floorplan3dCard);
  const w = window as unknown as { customCards?: { type: string; name: string; description: string; preview?: boolean }[] };
  w.customCards ??= [];
  // The loader has no i18n module (kept tiny); the card picker text per language
  const lang = document.documentElement.lang.toLowerCase().slice(0, 2);
  const picker: Record<string, [string, string]> = {
    en: ["Floorplan 3D", "Live 3D floorplan of your home (view only). Plan it in the Floorplan 3D panel."],
    de: ["Grundriss 3D", "Live-3D-Grundriss deiner Wohnung (nur Ansicht). Geplant wird im Panel „Grundriss 3D“."],
    el: ["Κάτοψη 3D", "Ζωντανή κάτοψη 3D του σπιτιού σου (μόνο προβολή). Ο σχεδιασμός γίνεται στον πίνακα «Κάτοψη 3D»."],
  };
  const [name, description] = picker[lang] ?? picker.en;
  w.customCards.push({
    type: "floorplan-3d-card",
    name,
    description,
    preview: true,
  });
}
