// Room label and symbol styles, shared by the 3D view and the 2D live map.
import { css } from "lit";

export const roomLabelStyles = css`
  .room-label.occluded {
    opacity: 0;
    pointer-events: none;
  }
  .room-label {
    transition: opacity 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    padding: 4px 9px 5px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--fp-surface) 78%, transparent);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    color: var(--fp-fg);
    font-family: var(--fp-font);
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }
  .room-label.clickable {
    pointer-events: auto;
    cursor: pointer;
  }
  .room-label .name {
    font-size: 12px;
    font-weight: 500;
    color: var(--fp-dim);
  }
  .room-label .temp {
    font-size: 17px;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
  }
  .room-label .temp:empty,
  .room-label .hum:empty {
    display: none;
  }
  .room-label .hum {
    font-size: 11.5px;
    color: var(--fp-dim);
    font-variant-numeric: tabular-nums;
  }
  .room-label.unavailable .temp {
    color: var(--fp-dim);
  }
  .room-label.alert {
    box-shadow: 0 0 0 1.5px var(--fp-alert);
  }
  .room-label .icons {
    display: flex;
    gap: 3px;
    margin-top: 3px;
  }
  .room-label .icons:empty {
    display: none;
  }
  .icon {
    display: inline-grid;
    place-items: center;
    width: 19px;
    height: 19px;
    border-radius: 6px;
    color: var(--fp-frost);
    background: color-mix(in srgb, currentColor 20%, transparent);
  }
  .icon.warn {
    color: var(--fp-accent);
  }
  .icon.alert {
    color: var(--fp-alert);
  }
  .icon svg {
    width: 13px;
    height: 13px;
  }

  @media (max-width: 760px) {
    .room-label {
      padding: 2px 6px 3px;
      border-radius: 7px;
    }
    .room-label .name {
      font-size: 10.5px;
    }
    .room-label .temp {
      font-size: 13.5px;
    }
    .room-label .hum {
      display: none;
    }
  }
`;
