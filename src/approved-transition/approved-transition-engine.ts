import {
  APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS,
  APPROVED_TRANSITION_STAGE_MS,
  APPROVED_TRANSITION_TARGET_DURATION_MS,
} from "./approved-transition.constants";
import type { ApprovedTransitionStage, ApprovedTransitionState } from "./approved-transition.types";

/**
 * Clamps a value into a safe inclusive range.
 */
function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;

  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates normalized approved transition progress.
 */
export function getApprovedTransitionProgress(elapsedMs: number, durationMs: number): number {
  if (!Number.isFinite(durationMs) || durationMs <= 0) return 1;

  return clamp(elapsedMs / durationMs, 0, 1);
}

/**
 * Resolves the current approved transition stage.
 */
export function getApprovedTransitionStage(elapsedMs: number): ApprovedTransitionStage {
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0) return "preparing";
  if (elapsedMs < APPROVED_TRANSITION_STAGE_MS.preparingEnd) return "preparing";
  if (elapsedMs < APPROVED_TRANSITION_STAGE_MS.approvedEnd) return "approved";
  if (elapsedMs < APPROVED_TRANSITION_STAGE_MS.confidenceEnd) return "confidence";
  if (elapsedMs < APPROVED_TRANSITION_STAGE_MS.handoffEnd) return "handoff";

  return "complete";
}

/**
 * Builds complete render-ready approved transition state.
 */
export function getApprovedTransitionState(
  elapsedMs: number,
  reducedMotion = false
): ApprovedTransitionState {
  const durationMs = reducedMotion
    ? APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS
    : APPROVED_TRANSITION_TARGET_DURATION_MS;

  const safeElapsedMs = clamp(elapsedMs, 0, durationMs);
  const progress = getApprovedTransitionProgress(safeElapsedMs, durationMs);

  return {
    elapsedMs: safeElapsedMs,
    progress,
    stage: reducedMotion && progress >= 1 ? "complete" : getApprovedTransitionStage(safeElapsedMs),
    isComplete: progress >= 1,
  };
}
