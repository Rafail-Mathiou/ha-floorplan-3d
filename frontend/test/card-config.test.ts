import { describe, expect, it } from "vitest";

import { configFloor, configFromForm, cssHeight, formData } from "../src/card-config";
import type { PlanData } from "../src/model";

const base = { type: "custom:floorplan-3d-card" };

describe("dashboard card options", () => {
  it("only accepts safe heights", () => {
    expect(cssHeight(500)).toBe("500px");
    expect(cssHeight("60vh")).toBe("60vh");
    expect(cssHeight("calc(100% - 1px)")).toBe("420px");
    expect(cssHeight("100px;background:url(x)")).toBe("420px");
    expect(cssHeight(20)).toBe("420px");
  });

  it("fills the form with defaults", () => {
    expect(formData(base)).toEqual({ floor: "", view: "auto", height: "420", controls: true });
    expect(formData({ ...base, height: "60vh", view: "2d", controls: false, floor: "fl_a" })).toEqual({
      floor: "fl_a",
      view: "2d",
      height: "60vh",
      controls: false,
    });
  });

  it("writes only values that differ from the defaults", () => {
    const config = { ...base, height: 500, view: "2d" as const, controls: false, floor: "fl_a" };
    const cleared = configFromForm(config, { floor: "", view: "auto", controls: true, height: "" });
    expect(cleared).toEqual(base);
    expect(configFromForm(base, { height: "600" })).toEqual({ ...base, height: 600 });
    expect(configFromForm(base, { height: "70vh" })).toEqual({ ...base, height: "70vh" });
  });

  it("keeps the last valid height while typing", () => {
    expect(configFromForm({ ...base, height: 500 }, { height: "5" })).toEqual({ ...base, height: 500 });
    expect(configFromForm({ ...base, height: 500 }, { height: "60v" })).toEqual({ ...base, height: 500 });
  });

  it("finds a floor by ID or name", () => {
    const plan = { floors: [{ id: "fl_up", name: "Upstairs", level: 1, floor_id: null, background: null }] } as unknown as PlanData;
    expect(configFloor(plan, "fl_up")).toBe("fl_up");
    expect(configFloor(plan, " upstairs ")).toBe("fl_up");
    expect(configFloor(plan, "Cellar")).toBeUndefined();
    expect(configFloor(plan, undefined)).toBeUndefined();
  });
});
