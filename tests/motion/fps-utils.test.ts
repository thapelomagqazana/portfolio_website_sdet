import { describe, expect, it } from "vitest";
import {
  calculateFramesPerSecond,
  countDroppedFrames,
  getFrameBudgetMs,
} from "@/lib/motion/performance";

describe("FPS utilities", () => {
  it("calculates 60 FPS from frame timestamps", () => {
    const sample = calculateFramesPerSecond([0, 16.67, 33.34, 50.01]);

    expect(sample.fps).toBeGreaterThanOrEqual(59);
    expect(sample.fps).toBeLessThanOrEqual(60);
  });

  it("counts dropped frames", () => {
    expect(countDroppedFrames([16, 17, 30, 10], 16)).toBe(2);
  });

  it("returns fallback sample for insufficient frames", () => {
    expect(calculateFramesPerSecond([0])).toEqual({
      fps: 0,
      averageFrameTimeMs: 0,
      droppedFrames: 0,
      sampleCount: 1,
    });
  });

  it("calculates frame budget", () => {
    expect(getFrameBudgetMs(60)).toBe(17);
  });
});
