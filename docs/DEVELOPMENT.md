# Development

## Requirements
- Node.js 24 and npm
- Python 3.14 for the tests (Home Assistant 2026.10 needs it) and
  [ruff](https://docs.astral.sh/ruff/)
- A Home Assistant instance for trying things out, for example a dev container or a
  test installation

Files use LF line endings (see `.gitattributes`).

## Frontend
```bash
cd frontend
npm ci
npm run dev     # rebuild on every change
npm run build   # minified production build
npm run check   # TypeScript type check
npm test        # unit tests (vitest)
```

The build writes two files into `custom_components/floorplan_3d/frontend/`: the main
bundle `floorplan-3d.js` and the dashboard card loader `floorplan-3d-card.js`. Both are
committed, so HACS can install the integration without a build step. CI fails if the
committed files do not match the sources, so run `npm run build` before you commit.

## Backend
```bash
pip install homeassistant pytest pytest-asyncio ruff
ruff check custom_components tests
ruff format custom_components tests
pytest
```

The tests use an in-memory store and need no running Home Assistant.

## Trying it out
- Copy or link `custom_components/floorplan_3d` into the configuration of your test
  instance and restart Home Assistant.
- `tools/deploy.sh` copies the integration over SSH, keeps a backup in
  `/config/_archive`, runs `ha core check` and can restart Home Assistant. `HA_HOST` and
  `HA_PORT` select the target.
- After a change to the frontend only, reload the integration and the browser.
  Changes to Python files need a restart.
- `tests/fixtures/demo.json` is a complete demo plan with made-up entity IDs. Import it
  in the planner (side panel, **Backup**) and save.

## Translations
UI strings are in `frontend/src/i18n.ts`. To add a language, copy the `de` block,
translate it and register it in `LANGUAGES`. The strings of the config flow are in
`custom_components/floorplan_3d/translations/`.

## Continuous integration
`.github/workflows/ci.yml` runs ruff, the Python tests, the type check, the frontend
tests and the build (the committed bundle must not change), plus hassfest and the HACS
validation.

## Releases
1. Move the entries under **Unreleased** in `CHANGELOG.md` to a new version heading.
2. Set the same version in `custom_components/floorplan_3d/manifest.json`.
3. Merge to `main`, then create and push a tag such as `v0.10.0`.

`.github/workflows/release.yml` checks that the tag matches the manifest, packs
`floorplan_3d.zip` and publishes a GitHub release with the notes from the changelog.
