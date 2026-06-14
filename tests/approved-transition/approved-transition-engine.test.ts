import { describe, expect, it } from "vitest";
import {
  APPROVED_TRANSITION_MAX_DURATION_MS,
  APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS,
  APPROVED_TRANSITION_TARGET_DURATION_MS,
  getApprovedTransitionProgress,
  getApprovedTransitionStage,
  getApprovedTransitionState,
} from "../../src/approved-transition";

describe("approved transition engine", () => {
  it("keeps transition under hard maximum", () => {
    expect(APPROVED_TRANSITION_TARGET_DURATION_MS).toBeLessThanOrEqual(
      APPROVED_TRANSITION_MAX_DURATION_MS
    );
  });

  it("calculates progress", () => {
    expect(getApprovedTransitionProgress(0, 1000)).toBe(0);
    expect(getApprovedTransitionProgress(500, 1000)).toBe(0.5);
    expect(getApprovedTransitionProgress(1000, 1000)).toBe(1);
  });

  it("clamps progress", () => {
    expect(getApprovedTransitionProgress(-100, 1000)).toBe(0);
    expect(getApprovedTransitionProgress(2000, 1000)).toBe(1);
  });

  it("handles invalid duration safely", () => {
    expect(getApprovedTransitionProgress(100, 0)).toBe(1);
  });

  it("resolves stages in correct order", () => {
    expect(getApprovedTransitionStage(0)).toBe("preparing");
    expect(getApprovedTransitionStage(300)).toBe("approved");
    expect(getApprovedTransitionStage(750)).toBe("confidence");
    expect(getApprovedTransitionStage(1150)).toBe("handoff");
    expect(getApprovedTransitionStage(1500)).toBe("complete");
  });

  it("handles invalid elapsed safely", () => {
    expect(getApprovedTransitionStage(Number.NaN)).toBe("preparing");
    expect(getApprovedTransitionStage(-1)).toBe("preparing");
  });

  it("builds active state", () => {
    const state = getApprovedTransitionState(500);

    expect(state.stage).toBe("approved");
    expect(state.isComplete).toBe(false);
  });

  it("completes at target duration", () => {
    const state = getApprovedTransitionState(APPROVED_TRANSITION_TARGET_DURATION_MS);

    expect(state.isComplete).toBe(true);
    expect(state.stage).toBe("complete");
  });

  it("supports reduced motion completion", () => {
    const state = getApprovedTransitionState(APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS, true);

    expect(state.isComplete).toBe(true);
  });
});
