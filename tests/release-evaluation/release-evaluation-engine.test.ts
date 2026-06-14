import { describe, expect, it } from "vitest";
import {
  RELEASE_EVALUATION_MAX_DURATION_MS,
  RELEASE_EVALUATION_PHASES,
  RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS,
  RELEASE_EVALUATION_TARGET_DURATION_MS,
  getReleaseEvaluationPhaseStatus,
  getReleaseEvaluationPhaseViewModel,
  getReleaseEvaluationProgress,
  getReleaseEvaluationState,
} from "../../src/release-evaluation";

describe("release evaluation engine", () => {
  it("keeps timeline below maximum duration", () => {
    expect(RELEASE_EVALUATION_TARGET_DURATION_MS).toBeLessThanOrEqual(
      RELEASE_EVALUATION_MAX_DURATION_MS
    );
  });

  it("contains all required phases in narrative order", () => {
    expect(RELEASE_EVALUATION_PHASES.map((phase) => phase.id)).toEqual([
      "test",
      "security",
      "performance",
      "evidence",
      "quality-gate",
    ]);
  });

  it("calculates progress", () => {
    expect(getReleaseEvaluationProgress(0, 1000)).toBe(0);
    expect(getReleaseEvaluationProgress(500, 1000)).toBe(0.5);
    expect(getReleaseEvaluationProgress(1000, 1000)).toBe(1);
  });

  it("clamps progress", () => {
    expect(getReleaseEvaluationProgress(-100, 1000)).toBe(0);
    expect(getReleaseEvaluationProgress(2000, 1000)).toBe(1);
  });

  it("handles invalid duration safely", () => {
    expect(getReleaseEvaluationProgress(100, 0)).toBe(1);
  });

  it("resolves phase status boundaries", () => {
    expect(getReleaseEvaluationPhaseStatus(0, 100, 200)).toBe("pending");
    expect(getReleaseEvaluationPhaseStatus(100, 100, 200)).toBe("active");
    expect(getReleaseEvaluationPhaseStatus(200, 100, 200)).toBe("complete");
  });

  it("handles invalid elapsed values safely", () => {
    expect(getReleaseEvaluationPhaseStatus(Number.NaN, 100, 200)).toBe("pending");
  });

  it("creates pending phase view model", () => {
    const phase = RELEASE_EVALUATION_PHASES[1];
    const viewModel = getReleaseEvaluationPhaseViewModel(phase, 0);

    expect(viewModel.status).toBe("pending");
    expect(viewModel.progress).toBe(0);
  });

  it("creates complete phase view model", () => {
    const phase = RELEASE_EVALUATION_PHASES[0];
    const viewModel = getReleaseEvaluationPhaseViewModel(phase, phase.endsAtMs);

    expect(viewModel.status).toBe("complete");
    expect(viewModel.progress).toBe(1);
  });

  it("creates active evaluation state", () => {
    const state = getReleaseEvaluationState(800);

    expect(state.isComplete).toBe(false);
    expect(state.progress).toBeGreaterThan(0);
    expect(state.activePhaseId).not.toBeNull();
  });

  it("completes at target duration", () => {
    const state = getReleaseEvaluationState(RELEASE_EVALUATION_TARGET_DURATION_MS);

    expect(state.isComplete).toBe(true);
    expect(state.progress).toBe(1);
  });

  it("supports reduced motion completion", () => {
    const state = getReleaseEvaluationState(RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS, true);

    expect(state.isComplete).toBe(true);
    expect(state.phases.every((phase) => phase.status === "complete")).toBe(true);
  });
});
