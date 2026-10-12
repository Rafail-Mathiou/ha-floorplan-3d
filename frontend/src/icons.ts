// Own line icons (24 × 24) so the bundle needs no icon library.
import { html, svg, type SVGTemplateResult } from "lit";

// Root as an html template (svg`` is only meant for content inside <svg>).
const icon = (body: SVGTemplateResult) =>
  html`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const icons = {
  select: icon(svg`<path d="M5 3.5l13 7.2-5.6 1.6 3.6 6.2-2.4 1.4-3.6-6.2L6 17.6z"/>`),
  room: icon(svg`<path d="M4 4h16v16H4z" stroke-dasharray="0"/><path d="M4 9h3M17 9h3M9 4v3M9 17v3"/>`),
  points: icon(svg`<path d="M5 5h9v6h5v8H5z"/><circle cx="14" cy="11" r="1.9" fill="currentColor"/><circle cx="5" cy="5" r="1.9" fill="currentColor"/>`),
  pan: icon(svg`<path d="M8 13V6.5a1.5 1.5 0 013 0V12m0-6.5V5a1.5 1.5 0 013 0v7m0-5.5a1.5 1.5 0 013 0V14a6 6 0 01-6 6h-1.2a5 5 0 01-3.9-1.9L4.6 15a1.5 1.5 0 012.3-1.9L8 14.5"/>`),
  undo: icon(svg`<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>`),
  redo: icon(svg`<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 000 12h3"/>`),
  plus: icon(svg`<path d="M12 5v14M5 12h14"/>`),
  minus: icon(svg`<path d="M5 12h14"/>`),
  fit: icon(svg`<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>`),
  magnet: icon(svg`<path d="M6 4v8a6 6 0 0012 0V4h-4v8a2 2 0 01-4 0V4z"/><path d="M6 8h4M14 8h4"/>`),
  trash: icon(svg`<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>`),
  copy: icon(svg`<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/>`),
  download: icon(svg`<path d="M12 15V3M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/>`),
  import: icon(svg`<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/>`),
  image: icon(svg`<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5L6 19.5"/>`),
  home: icon(svg`<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>`),
  ruler: icon(svg`<path d="M3 16.5L16.5 3 21 7.5 7.5 21z"/><path d="M7 12.5l2 2M10 9.5l1.5 1.5M13 6.5l2 2"/>`),
  sparkle: icon(svg`<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>`),
  close: icon(svg`<path d="M6 6l12 12M18 6L6 18"/>`),
  library: icon(svg`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14v7M14 17.5h7"/>`),
  rotate: icon(svg`<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>`),
  cutaway: icon(svg`<path d="M3 20h18M5 20V8h6v12"/><path d="M14 20v-4h6v4"/><path d="M17 4v8M14.5 9.5L17 12l2.5-2.5"/>`),
  walls: icon(svg`<path d="M3 20h18M5 20v-6h5v6M14 20v-9h5v9"/><path d="M5 14V9h5v5" stroke-dasharray="2 2"/>`),
  cube: icon(svg`<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>`),
  plan: icon(svg`<path d="M3 5h18v14H3z"/><path d="M11 5v6h10M8 19v-5h3"/>`),
};
