// Bundles src/panel.ts (panel + card view, with three.js) and src/card-loader.ts (tiny
// Lovelace card loader) into ES modules for the integration.
import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const builds = [
  ["src/panel.ts", "../custom_components/floorplan_3d/frontend/floorplan-3d.js"],
  ["src/card-loader.ts", "../custom_components/floorplan_3d/frontend/floorplan-3d-card.js"],
];

const common = {
  bundle: true,
  format: "esm",
  target: "es2020",
  minify: !watch,
  sourcemap: watch ? "inline" : false,
  legalComments: "eof",
  // Module scripts are always read as UTF-8; keeps non-Latin UI strings small
  charset: "utf8",
  logLevel: "info",
};

for (const [entry, outfile] of builds) {
  const options = { ...common, entryPoints: [entry], outfile };
  if (watch) await (await esbuild.context(options)).watch();
  else await esbuild.build(options);
}
