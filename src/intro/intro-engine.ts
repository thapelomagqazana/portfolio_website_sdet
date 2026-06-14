import {
  INTRO_REDUCED_MOTION_DURATION_MS,
  INTRO_STEPS,
  INTRO_TARGET_DURATION_MS,
} from "./intro.constants";
import type { IntroState, IntroStep, IntroStepStatus, IntroStepViewModel } from "./intro.types";
import { getTypewriterText } from "./typewriter";

/**
 * Clamps a numeric value between a minimum and maximum.
 */
function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates normalized intro progress.
 */
export function getIntroProgress(elapsedMs: number, durationMs: number): number {
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    return 1;
  }

  return clamp(elapsedMs / durationMs, 0, 1);
}

/**
 * Resolves the status of a single intro step.
 */
export function getIntroStepStatus(
  elapsedMs: number,
  startsAtMs: number,
  endsAtMs: number
): IntroStepStatus {
  if (!Number.isFinite(elapsedMs)) {
    return "pending";
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
 * Converts one timeline step into a render-ready view model.
 */
export function getIntroStepViewModel(step: IntroStep, elapsedMs: number): IntroStepViewModel {
  const status = getIntroStepStatus(elapsedMs, step.startsAtMs, step.endsAtMs);
  const stepDuration = step.endsAtMs - step.startsAtMs;

  const stepProgress =
    status === "complete" ? 1 : getIntroProgress(elapsedMs - step.startsAtMs, stepDuration);

  return {
    ...step,
    status,
    visibleText: status === "pending" ? "" : getTypewriterText(step.label, stepProgress),
  };
}

/**
 * Produces the complete intro state for a given elapsed time.
 */
export function getIntroState(elapsedMs: number, reducedMotion = false): IntroState {
  const durationMs = reducedMotion ? INTRO_REDUCED_MOTION_DURATION_MS : INTRO_TARGET_DURATION_MS;
  const safeElapsedMs = clamp(elapsedMs, 0, durationMs);
  const progress = getIntroProgress(safeElapsedMs, durationMs);

  return {
    elapsedMs: safeElapsedMs,
    progress,
    isComplete: progress >= 1,
    steps: INTRO_STEPS.map((step) =>
      getIntroStepViewModel(step, reducedMotion ? step.endsAtMs : safeElapsedMs)
    ),
  };
}
