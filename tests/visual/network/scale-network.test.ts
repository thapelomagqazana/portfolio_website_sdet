import { describe, expect, it } from "vitest";
import {
  getNetworkDensity,
  getResponsiveNetworkConfig,
  getSafeNetworkBounds,
} from "../../../src/visual/network";

describe("responsive network scaling", () => {
  it("clamps unsafe bounds", () => {
    expect(getSafeNetworkBounds({ width: 0, height: 0 })).toEqual({
      width: 320,
      height: 240,
    });
  });

  it("selects low density for mobile", () => {
    expect(getNetworkDensity({ width: 390, height: 800 })).toBe("low");
  });

  it("selects medium density for tablet", () => {
    expect(getNetworkDensity({ width: 800, height: 900 })).toBe("medium");
  });

  it("selects high density for desktop", () => {
    expect(getNetworkDensity({ width: 1280, height: 900 })).toBe("high");
  });

  it("creates richer networks for larger screens", () => {
    const mobile = getResponsiveNetworkConfig("seed", { width: 390, height: 800 });
    const desktop = getResponsiveNetworkConfig("seed", { width: 1440, height: 900 });

    expect(desktop.nodeCount).toBeGreaterThan(mobile.nodeCount);
    expect(desktop.signalCount).toBeGreaterThan(mobile.signalCount);
  });
});
