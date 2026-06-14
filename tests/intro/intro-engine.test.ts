import { describe, expect, it } from "vitest";
import {
  INTRO_MAX_DURATION_MS,
  INTRO_REDUCED_MOTION_DURATION_MS,
  INTRO_STEPS,
  INTRO_TARGET_DURATION_MS,
  getIntroProgress,
  getIntroState,
  getIntroStepStatus,
} from "../../src/intro";

describe("intro engine", () => {
  it("keeps intro under maximum duration", () => {
    expect(INTRO_TARGET_DURATION_MS).toBeLessThan(INTRO_MAX_DURATION_MS);
  });

  it("contains required intro copy", () => {
    expect(INTRO_STEPS.map((step) => step.label)).toEqual([
      "INITIALIZING QUALITY COMMAND CENTER...",
      "LOADING RELEASE EVIDENCE...",
      "ACTIVATING BRIKBYTEOS...",
      "STATUS: READY",
    ]);
  });

  it("calculates progress", () => {
    expect(getIntroProgress(0, 1000)).toBe(0);
    expect(getIntroProgress(500, 1000)).toBe(0.5);
    expect(getIntroProgress(1000, 1000)).toBe(1);
  });

  it("clamps progress", () => {
    expect(getIntroProgress(-100, 1000)).toBe(0);
    expect(getIntroProgress(2000, 1000)).toBe(1);
  });

  it("handles invalid duration safely", () => {
    expect(getIntroProgress(100, 0)).toBe(1);
  });

  it("resolves step status boundaries", () => {
    expect(getIntroStepStatus(0, 100, 200)).toBe("pending");
    expect(getIntroStepStatus(100, 100, 200)).toBe("active");
    expect(getIntroStepStatus(200, 100, 200)).toBe("complete");
  });

  it("creates active intro state", () => {
    const state = getIntroState(700);

    expect(state.isComplete).toBe(false);
    expect(state.progress).toBeGreaterThan(0);
    expect(state.steps.some((step) => step.status === "active")).toBe(true);
  });

  it("completes intro at target duration", () => {
    const state = getIntroState(INTRO_TARGET_DURATION_MS);

    expect(state.isComplete).toBe(true);
    expect(state.progress).toBe(1);
  });

  it("supports reduced motion", () => {
    const state = getIntroState(INTRO_REDUCED_MOTION_DURATION_MS, true);

    expect(state.isComplete).toBe(true);
    expect(state.steps.every((step) => step.status === "complete")).toBe(true);
  });
});
