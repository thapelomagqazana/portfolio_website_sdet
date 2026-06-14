import type { ReleaseEvaluationPhase } from "./release-evaluation.types";

/**
 * Hard maximum duration for the release evaluation sequence.
 */
export const RELEASE_EVALUATION_MAX_DURATION_MS = 3500;

/**
 * Target cinematic duration.
 */
export const RELEASE_EVALUATION_TARGET_DURATION_MS = 3000;

/**
 * Reduced-motion users should not wait for decorative animation.
 */
export const RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS = 250;

/**
 * Ordered release evaluation timeline.
 */
export const RELEASE_EVALUATION_PHASES: readonly ReleaseEvaluationPhase[] = [
  {
    id: "test",
    label: "TEST EXECUTION",
    statusCopy: "Automated checks passed",
    startsAtMs: 0,
    endsAtMs: 620,
  },
  {
    id: "security",
    label: "SECURITY SCAN",
    statusCopy: "No critical release blockers",
    startsAtMs: 560,
    endsAtMs: 1180,
  },
  {
    id: "performance",
    label: "PERFORMANCE BUDGET",
    statusCopy: "Performance within threshold",
    startsAtMs: 1120,
    endsAtMs: 1740,
  },
  {
    id: "evidence",
    label: "EVIDENCE NORMALIZATION",
    statusCopy: "Release evidence verified",
    startsAtMs: 1680,
    endsAtMs: 2340,
  },
  {
    id: "quality-gate",
    label: "QUALITY GATE",
    statusCopy: "Release candidate approved",
    startsAtMs: 2280,
    endsAtMs: 3000,
  },
] as const;
