// Theme variables (--fp-*) shared by the panel and the Lovelace card.
import { css } from "lit";

export const themeVars = css`
  :host {
      /* Colours follow the Home Assistant theme; --fp-* can be overridden by themes */
      --fp-bg: var(--primary-background-color, #0d1014);
      --fp-surface: var(--card-background-color, #151a21);
      --fp-surface-2: var(--secondary-background-color, #1c232c);
      --fp-line: var(--divider-color, #262e39);
      --fp-line-strong: color-mix(in srgb, var(--fp-line) 60%, var(--fp-dim));
      --fp-fg: var(--primary-text-color, #e8ecf1);
      --fp-dim: var(--secondary-text-color, #8b96a5);
      --fp-accent: var(--floorplan-3d-accent, #ff9a4d);
      --fp-on-accent: #1a1006;
      --fp-alert: var(--error-color, #ef6363);
      --fp-lamp: var(--warning-color, #f6cf68);
      --fp-frost: #63c6e8;
      --fp-font: var(--paper-font-body1_-_font-family, Roboto, "Segoe UI", system-ui, sans-serif);
      /* Drawing canvas */
      --fp-canvas: color-mix(in srgb, var(--fp-bg) 82%, #1d2733);
      --fp-grid-minor: color-mix(in srgb, var(--fp-canvas) 90%, var(--fp-fg));
      --fp-grid-major: color-mix(in srgb, var(--fp-canvas) 80%, var(--fp-fg));
      --fp-floor: color-mix(in srgb, var(--fp-canvas) 78%, #7f93ab);
      --fp-floor-hover: color-mix(in srgb, var(--fp-canvas) 70%, #8fa3bb);
      --fp-floor-sel: color-mix(in srgb, var(--fp-floor) 82%, var(--fp-accent));
      --fp-wall: color-mix(in srgb, var(--fp-fg) 88%, var(--fp-canvas));
      --fp-wall-sel: var(--fp-fg);
      --fp-dim-line: color-mix(in srgb, var(--fp-dim) 75%, var(--fp-canvas));
  }
`;
