// TV overlay: what a media player shows (app/source, title, status, picture), drawn
// onto the 3D screen as a canvas texture and reused as a caption in the 2D live map.
import { CanvasTexture, SRGBColorSpace } from "three";

import { t } from "../i18n";
import type { HassEntityState } from "../types";

export interface TvInfo {
  /** The TV shows a picture (on, playing, paused, idle, buffering). */
  on: boolean;
  playing: boolean;
  paused: boolean;
  /** App or input source, e.g. "Netflix" or "HDMI 1". */
  app: string;
  title: string;
  /** Series, artist or album below the title. */
  subtitle: string;
  /** Localised state, e.g. "Playing". */
  status: string;
  /** `entity_picture`: app icon or artwork (usually the HA image proxy). */
  picture: string;
  /** App id, if the TV reports one (e.g. "amazon"); helps to pick the app tile. */
  appId: string;
}

const PICTURE_STATES = new Set(["on", "playing", "paused", "idle", "buffering"]);

const text = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export function tvInfo(s?: HassEntityState): TvInfo {
  const state = s?.state ?? "unavailable";
  const a = s?.attributes ?? {};
  const app = text(a.app_name) || text(a.source);
  const title = text(a.media_title);
  const subtitle = [text(a.media_series_title), text(a.media_artist) || text(a.media_album_name)].filter(Boolean).join(", ");
  const statuses = t().tvStates;
  return {
    on: PICTURE_STATES.has(state),
    playing: state === "playing",
    paused: state === "paused",
    app,
    title: title === app ? "" : title,
    subtitle,
    status: statuses[state] ?? "",
    picture: text(a.entity_picture),
    appId: text(a.app_id),
  };
}

/** One-line caption for the 2D map: "Netflix · Title". */
export function tvCaption(info: TvInfo): string {
  if (!info.on) return "";
  return [info.app, info.title].filter(Boolean).join(" · ") || info.status;
}

// ------------------------------------------------------------ App tiles

/**
 * Colour tiles for well-known apps when the TV sends no icon. Only colours and an
 * initial. No trademarked logos are shipped.
 */
const APP_TILES: [RegExp, string, string][] = [
  [/netflix/i, "#e50914", "#ffffff"],
  [/prime|amazon/i, "#00a8e1", "#ffffff"],
  [/disney/i, "#0e3ec1", "#ffffff"],
  [/youtube/i, "#ff0033", "#ffffff"],
  [/spotify/i, "#1db954", "#0b0b0b"],
  [/apple/i, "#1c1c1e", "#ffffff"],
  [/dazn/i, "#f6ff00", "#0c161c"],
  [/magenta|telekom/i, "#e20074", "#ffffff"],
  [/wow|sky/i, "#1f2a6b", "#ffffff"],
  [/joyn/i, "#1c1c1c", "#ffffff"],
  [/rtl/i, "#ef3340", "#ffffff"],
  [/zdf/i, "#fa7d19", "#ffffff"],
  [/ard/i, "#003480", "#ffffff"],
  [/twitch/i, "#9146ff", "#ffffff"],
  [/plex/i, "#e5a00d", "#1f1f1f"],
  [/paramount/i, "#0064ff", "#ffffff"],
  [/hdmi|tv|antenna|live/i, "#2b3440", "#ffffff"],
];

function appTile(app: string, appId: string): { bg: string; fg: string; letter: string } {
  const hit = APP_TILES.find(([re]) => re.test(app) || re.test(appId));
  const letter = (app.replace(/[^\p{L}\p{N}]/gu, "")[0] ?? "▶").toUpperCase();
  return { bg: hit?.[1] ?? "#33475e", fg: hit?.[2] ?? "#ffffff", letter };
}

// ------------------------------------------------------------ Images

/** Loaded pictures by URL (undefined while loading, null on error). */
const images = new Map<string, HTMLImageElement | null | undefined>();

function loadImage(url: string, done: () => void): HTMLImageElement | null | undefined {
  if (images.has(url)) return images.get(url);
  images.set(url, undefined);
  const img = new Image();
  // External artwork needs CORS, otherwise the canvas could not be used as texture
  if (/^https?:/i.test(url) && !url.startsWith(location.origin)) img.crossOrigin = "anonymous";
  img.decoding = "async";
  img.onload = () => {
    images.set(url, img);
    done();
  };
  img.onerror = () => {
    images.set(url, null);
    done();
  };
  img.src = url;
  return undefined;
}

/** Small, roughly square pictures are app icons; anything else is artwork. */
const isIcon = (img: HTMLImageElement) =>
  Math.max(img.naturalWidth, img.naturalHeight) <= 400 && Math.abs(img.naturalWidth / img.naturalHeight - 1) < 0.25;

// ------------------------------------------------------------ Screen texture

const W = 512;
const H = 296;
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/** Cuts `s` with an ellipsis so it fits into `max` pixels. */
function fit(g: CanvasRenderingContext2D, s: string, max: number): string {
  if (g.measureText(s).width <= max) return s;
  let lo = 0;
  let hi = s.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (g.measureText(`${s.slice(0, mid)}…`).width <= max) lo = mid;
    else hi = mid - 1;
  }
  return `${s.slice(0, lo).trimEnd()}…`;
}

/** Breaks `s` into at most `lines` lines of `max` pixels (last one ellipsised). */
function wrap(g: CanvasRenderingContext2D, s: string, max: number, lines: number): string[] {
  const out: string[] = [];
  let rest = s;
  while (rest && out.length < lines - 1) {
    if (g.measureText(rest).width <= max) break;
    const words = rest.split(" ");
    let line = "";
    while (words.length && g.measureText(line ? `${line} ${words[0]}` : words[0]).width <= max) {
      line = line ? `${line} ${words.shift()}` : words.shift()!;
    }
    if (!line) break; // a single over-long word is shortened below
    out.push(line);
    rest = words.join(" ");
  }
  if (rest) out.push(fit(g, rest, max));
  return out;
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Draws `img` covering the rectangle (centre crop). */
function cover(g: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number): void {
  const k = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / k;
  const sh = h / k;
  g.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
}

/**
 * Canvas texture for the TV screen. `draw()` repaints only when the visible content
 * changed; pictures load in the background and call `onChange` when ready.
 */
export class TvScreen {
  readonly texture: CanvasTexture;
  private _canvas = document.createElement("canvas");
  private _key = "";
  private _info?: TvInfo;

  constructor(private _onChange: () => void = () => undefined) {
    this._canvas.width = W;
    this._canvas.height = H;
    this.texture = new CanvasTexture(this._canvas);
    this.texture.colorSpace = SRGBColorSpace;
    this.texture.anisotropy = 4;
  }

  draw(info: TvInfo): void {
    this._info = info;
    const img = info.picture
      ? loadImage(info.picture, () => {
          if (this._info === info) {
            this._paint(info);
            this._onChange();
          }
        })
      : null;
    const key = JSON.stringify(info) + (img === undefined ? ":loading" : img ? ":img" : "");
    if (key === this._key) return;
    this._key = key;
    this._paint(info);
  }

  private _paint(info: TvInfo): void {
    const g = this._canvas.getContext("2d");
    if (!g) return;
    const img = info.picture ? images.get(info.picture) : null;
    const artwork = img && !isIcon(img) ? img : null;
    const icon = img && isIcon(img) ? img : null;
    this._key = JSON.stringify(info) + (img === undefined ? ":loading" : img ? ":img" : "");

    // Background: artwork (darkened towards the text) or a blue gradient
    if (artwork) {
      try {
        cover(g, artwork, 0, 0, W, H);
      } catch {
        g.fillStyle = "#123a63";
        g.fillRect(0, 0, W, H);
      }
      const shade = g.createLinearGradient(0, 0, 0, H);
      shade.addColorStop(0, "rgba(0,0,0,0.15)");
      shade.addColorStop(0.45, "rgba(0,0,0,0.35)");
      shade.addColorStop(1, "rgba(0,0,0,0.85)");
      g.fillStyle = shade;
      g.fillRect(0, 0, W, H);
    } else {
      const bg = g.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, info.playing ? "#123a63" : "#0f2740");
      bg.addColorStop(1, info.playing ? "#2d6fb3" : "#1d4670");
      g.fillStyle = bg;
      g.fillRect(0, 0, W, H);
    }

    const pad = 30;
    let x = pad;
    let y = 66;
    const max = () => W - x - pad;

    // App icon or colour tile (not with artwork: the picture already tells it)
    if (!artwork && info.app) {
      const size = 96;
      const ty = 30;
      g.save();
      roundRect(g, pad, ty, size, size, 18);
      g.clip();
      if (icon) {
        g.fillStyle = "#ffffff";
        g.fillRect(pad, ty, size, size);
        try {
          cover(g, icon, pad, ty, size, size);
        } catch {
          // tainted or broken image, keep the white tile
        }
      } else {
        const tile = appTile(info.app, info.appId);
        g.fillStyle = tile.bg;
        g.fillRect(pad, ty, size, size);
        g.fillStyle = tile.fg;
        g.font = `700 58px ${FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText(tile.letter, pad + size / 2, ty + size / 2 + 3);
        g.textAlign = "left";
      }
      g.restore();
      x = pad + size + 20;
      y = 30 + 96 / 2 + 13;
    }

    g.textBaseline = "alphabetic";
    if (artwork) {
      // Bottom-up above the status line: subtitle, title (max. 2 lines), app
      let yb = H - 56;
      if (info.subtitle) {
        g.font = `400 22px ${FONT}`;
        g.fillStyle = "rgba(255,255,255,0.75)";
        g.fillText(fit(g, info.subtitle, W - pad * 2), pad, yb);
        yb -= 34;
      }
      if (info.title) {
        g.font = `600 32px ${FONT}`;
        g.fillStyle = "#ffffff";
        const lines = wrap(g, info.title, W - pad * 2, 2);
        lines.forEach((line, i) => g.fillText(line, pad, yb - (lines.length - 1 - i) * 36));
        yb -= lines.length * 36 + 2;
      }
      if (info.app) {
        g.font = `600 22px ${FONT}`;
        g.fillStyle = "rgba(255,255,255,0.8)";
        g.fillText(fit(g, info.app, W - pad * 2), pad, yb);
      }
    } else {
      if (info.app) {
        g.font = `600 36px ${FONT}`;
        g.fillStyle = "#ffffff";
        g.fillText(fit(g, info.app, max()), x, y);
      }
      // Title and subtitle below the tile across the full width
      x = pad;
      y = info.app ? 30 + 96 + 40 : 66;
      if (info.title) {
        g.font = `400 30px ${FONT}`;
        g.fillStyle = "rgba(255,255,255,0.95)";
        for (const line of wrap(g, info.title, max(), 2)) {
          g.fillText(line, x, y);
          y += 34;
        }
      }
      if (info.subtitle) {
        g.font = `400 22px ${FONT}`;
        g.fillStyle = "rgba(255,255,255,0.72)";
        g.fillText(fit(g, info.subtitle, max()), x, y);
      }
    }

    // Status line at the bottom with a play/pause symbol
    const by = H - 22;
    const sx = pad;
    const iconW = info.playing || info.paused ? 26 : 0;
    g.fillStyle = "rgba(255,255,255,0.75)";
    if (info.playing) {
      g.beginPath();
      g.moveTo(sx, by - 16);
      g.lineTo(sx + 14, by - 8);
      g.lineTo(sx, by);
      g.closePath();
      g.fill();
    } else if (info.paused) {
      g.fillRect(sx, by - 16, 5, 16);
      g.fillRect(sx + 9, by - 16, 5, 16);
    }
    g.font = `400 20px ${FONT}`;
    g.fillText(fit(g, info.status, W - pad * 2 - iconW), sx + iconW, by);

    this.texture.needsUpdate = true;
  }

  dispose(): void {
    this.texture.dispose();
  }
}
