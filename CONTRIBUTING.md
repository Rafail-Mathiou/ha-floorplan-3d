# Contributing

Bug reports, ideas and pull requests are welcome.

## Issues
- Describe what you expected and what happened. Add your Home Assistant version, the
  browser or device and, if possible, a screenshot.
- For display problems on tablets, mention whether the 2D live map is shown (that
  means the device has no WebGL 2).
- Remove personal data such as entity IDs, names or addresses from plans you attach.

## Pull requests
1. Fork the repository and create a branch, for example `feat/...`, `fix/...` or
   `docs/...`.
2. Follow [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). Type check, tests, ruff and the
   build must pass, and the rebuilt bundle has to be committed.
3. Keep each pull request to one topic. Pull requests are squash-merged, so each one
   becomes a single commit on `main` named after the pull request title. Use a prefix
   such as `feat:`, `fix:` or `docs:` in the title.
4. Put every new UI text into `frontend/src/i18n.ts`, in every language there. If you
   cannot translate a text, use the English one and say so in the pull request.
5. Schema changes need a store migration and an update of
   [docs/DATA_MODEL.md](docs/DATA_MODEL.md).

## Guidelines
- The panel reads states and opens more-info dialogs. It does not control devices.
- Examples and tests use the made-up entity IDs from `tests/fixtures/demo.json`. Never
  commit real entity IDs, host names or floorplans.
- TypeScript in strict mode, Lit without decorators, code comments and docs in English.
- Python follows the Home Assistant conventions: async code and no blocking I/O in the
  event loop.
- Keep the 3D view light for wall tablets: render on demand, merge geometry, no
  shadows and no work in every frame unless something moves.
