import { describe, expect, it } from "vitest";
import {
  clampMetricValue,
  easeOutCubic,
  formatMetricValue,
  interpolateMetricValue,
} from "../../src/lib/metrics-engine";
import { qualityMetrics } from "../../src/data/quality-metrics";

describe("quality metrics data", () => {
  it("contains centralized metrics", () => {
    expect(qualityMetrics.length).toBeGreaterThan(0);
  });
});

describe("clampMetricValue", () => {
  it("returns valid values unchanged", () => {
    expect(clampMetricValue(50, 0, 100)).toBe(50);
  });

  it("clamps below minimum", () => {
    expect(clampMetricValue(-10, 0, 100)).toBe(0);
  });

  it("clamps above maximum", () => {
    expect(clampMetricValue(120, 0, 100)).toBe(100);
  });

  it("handles invalid values safely", () => {
    expect(clampMetricValue(Number.NaN, 0, 100)).toBe(0);
    expect(clampMetricValue(Infinity, 0, 100)).toBe(100);
    expect(clampMetricValue(-Infinity, 0, 100)).toBe(0);
  });
});

describe("interpolateMetricValue", () => {
  it("returns start at zero progress", () => {
    expect(interpolateMetricValue(0, 100, 0)).toBe(0);
  });

  it("returns end at full progress", () => {
    expect(interpolateMetricValue(0, 100, 1)).toBe(100);
  });

  it("returns midpoint at half progress", () => {
    expect(interpolateMetricValue(0, 100, 0.5)).toBe(50);
  });

  it("handles invalid progress safely", () => {
    expect(interpolateMetricValue(10, 20, Number.NaN)).toBe(10);
  });
});

describe("easeOutCubic", () => {
  it("keeps progress in range", () => {
    expect(easeOutCubic(-1)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(2)).toBe(1);
  });
});

describe("formatMetricValue", () => {
  it("formats integer values cleanly", () => {
    expect(formatMetricValue(85, 0, "%")).toBe("85%");
  });

  it("formats decimal values cleanly", () => {
    expect(formatMetricValue(97.3, 1, "%")).toBe("97.3%");
  });

  it("removes unnecessary trailing zeroes", () => {
    expect(formatMetricValue(97.0, 1, "%")).toBe("97%");
  });

  it("handles invalid values safely", () => {
    expect(formatMetricValue(Number.NaN, 0, "%")).toBe("0%");
  });
});
