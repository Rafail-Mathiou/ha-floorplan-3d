#!/usr/bin/env bash
# =============================================================
# Development deploy: copies custom_components/floorplan_3d to Home Assistant (/config)
# over SSH (e.g. the "Advanced SSH & Web Terminal" app or HA OS debug SSH).
#
#   tools/deploy.sh             build, back up, copy, check config
#   tools/deploy.sh --no-build  skip the frontend build
#   tools/deploy.sh --restart   restart Home Assistant afterwards
#                               (Python changes, first install)
#
#   HA_HOST=root@homeassistant.local HA_PORT=22222 tools/deploy.sh
#
# Frontend-only change: the bundle URL contains a content hash computed at
# setup. Reload the integration (Settings, Devices & services, Floorplan 3D,
# Reload) and then the browser.
# =============================================================
set -euo pipefail

HOST="${HA_HOST:-root@homeassistant.local}"
PORT="${HA_PORT:-22222}"
SSH=(ssh -o BatchMode=yes -p "$PORT" "$HOST")
BUILD=1; RESTART=0
for a in "$@"; do
  case "$a" in
    --no-build) BUILD=0 ;;
    --restart) RESTART=1 ;;
    *) echo "Unknown option: $a" >&2; exit 2 ;;
  esac
done

cd "$(dirname "$0")/.."

if [ $BUILD -eq 1 ]; then
  (cd frontend && npm run build)
fi

TS=$(date +%Y%m%d-%H%M%S)
"${SSH[@]}" "mkdir -p /config/_archive && if [ -d /config/custom_components/floorplan_3d ]; then \
  tar cf /config/_archive/floorplan_3d-$TS.tar -C /config/custom_components floorplan_3d && \
  echo 'Backup: /config/_archive/floorplan_3d-$TS.tar'; fi"

# Unpack into a temporary folder first; the old version is only replaced once the
# new one arrived completely.
tar cf - --exclude=__pycache__ -C custom_components floorplan_3d \
  | "${SSH[@]}" "set -e; mkdir -p /config/custom_components /config/_archive; tmp=\$(mktemp -d /config/_archive/upload.XXXXXX); \
      tar xf - -C \"\$tmp\"; rm -rf /config/custom_components/floorplan_3d; \
      mv \"\$tmp/floorplan_3d\" /config/custom_components/floorplan_3d; rmdir \"\$tmp\""
echo "Copied."

"${SSH[@]}" "ha core check"
echo "Configuration valid."

if [ $RESTART -eq 1 ]; then
  "${SSH[@]}" "ha core restart"
  echo "Home Assistant is restarting."
fi
