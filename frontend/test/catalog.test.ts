import { describe, expect, it } from "vitest";

import { FURNITURE, FURNITURE_CATEGORIES } from "../src/catalog";
import { setLanguage, t } from "../src/i18n";
import type { HomeAssistant } from "../src/types";
import storePy from "../../custom_components/floorplan_3d/store.py?raw";

const serverTypes = [...storePy.slice(storePy.indexOf("FURNITURE_TYPES = [")).split("]")[0].matchAll(/"(\w+)"/g)].map((m) => m[1]);

describe("furniture catalog", () => {
  it("matches the types the server accepts", () => {
    expect(FURNITURE.map((f) => f.type).sort()).toEqual([...serverTypes].sort());
  });

  it("has unique types, a valid category and sensible sizes", () => {
    expect(new Set(FURNITURE.map((f) => f.type)).size).toBe(FURNITURE.length);
    for (const f of FURNITURE) {
      expect(FURNITURE_CATEGORIES).toContain(f.category);
      expect(f.size[0]).toBeGreaterThan(0.05);
      expect(f.size[1]).toBeGreaterThan(0.05);
      if (f.shape === "L") expect(f.arm).toBeLessThan(Math.min(...f.size));
    }
    for (const c of FURNITURE_CATEGORIES) expect(FURNITURE.some((f) => f.category === c)).toBe(true);
  });

  it("names every piece and category in every language", () => {
    for (const language of ["en", "de", "el"]) {
      setLanguage({ language } as HomeAssistant);
      for (const f of FURNITURE) expect(t().furnitureTypes[f.type], `${language} ${f.type}`).toBeTruthy();
      for (const c of FURNITURE_CATEGORIES) expect(t().furnitureCategories[c], `${language} ${c}`).toBeTruthy();
    }
  });
});
