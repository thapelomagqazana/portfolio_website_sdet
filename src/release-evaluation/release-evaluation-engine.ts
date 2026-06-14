import {
  RELEASE_EVALUATION_PHASES,
  RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS,
  RELEASE_EVALUATION_TARGET_DURATION_MS,
} from "./release-evaluation.constants";
import type {
  ReleaseEvaluationPhase,
  ReleaseEvaluationPhaseKind,
  ReleaseEvaluationPhaseStatus,
  ReleaseEvaluationPhaseViewModel,
  ReleaseEvaluationState,
} from "./release-evaluation.types";

/**
 * Clamps a value into an inclusive range.
 */
function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates normalized release evaluation progress.
 */
export function getReleaseEvaluationProgress(elapsedMs: number, durationMs: number): number {
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    return 1;
  }

  return clamp(elapsedMs / durationMs, 0, 1);
}

/**
 * Resolves phase status based on elapsed timeline time.
 */
export function getReleaseEvaluationPhaseStatus(
  elapsedMs: number,
  startsAtMs: number,
  endsAtMs: number
): ReleaseEvaluationPhaseStatus {
  if (!Number.isFinite(elapsedMs)) {
    return "pending";
  }

  if (endsAtMs <= startsAtMs) {
    return elapsedMs >= startsAtMs ? "complete" : "pending";
  }

  if (elapsedMs < startsAtMs) {
    return "pending";
  }

  if (elapsedMs >= endsAtMs) {
    return "complete";
  }

  return "active";
}

/**
 * Converts one static phase into a render-ready phase view model.
 */
export function getReleaseEvaluationPhaseViewModel(
  phase: ReleaseEvaluationPhase,
  elapsedMs: number
): ReleaseEvaluationPhaseViewModel {
  const status = getReleaseEvaluationPhaseStatus(elapsedMs, phase.startsAtMs, phase.endsAtMs);
  const durationMs = phase.endsAtMs - phase.startsAtMs;

  const progress =
    status === "pending"
      ? 0
      : status === "complete"
        ? 1
        : getReleaseEvaluationProgress(elapsedMs - phase.startsAtMs, durationMs);

  return {
    ...phase,
    status,
    progress,
  };
}

/**
 * Returns the currently active phase ID.
 */
function getActivePhaseId(
  phases: readonly ReleaseEvaluationPhaseViewModel[]
): ReleaseEvaluationPhaseKind | null {
  return phases.find((phase) => phase.status === "active")?.id ?? null;
}

/**
 * Builds the complete release evaluation state.
 */
export function getReleaseEvaluationState(
  elapsedMs: number,
  reducedMotion = false
): ReleaseEvaluationState {
  const durationMs = reducedMotion
    ? RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS
    : RELEASE_EVALUATION_TARGET_DURATION_MS;

  const safeElapsedMs = clamp(elapsedMs, 0, durationMs);
  const progress = getReleaseEvaluationProgress(safeElapsedMs, durationMs);

  const phases = RELEASE_EVALUATION_PHASES.map((phase) =>
    getReleaseEvaluationPhaseViewModel(phase, reducedMotion ? phase.endsAtMs : safeElapsedMs)
  );

  return {
    elapsedMs: safeElapsedMs,
    progress,
    isComplete: progress >= 1,
    activePhaseId: getActivePhaseId(phases),
    phases,
  };
}
