/**
 * Hard maximum duration for the approved transition.
 */
export const APPROVED_TRANSITION_MAX_DURATION_MS = 1800;

/**
 * Preferred cinematic transition duration.
 */
export const APPROVED_TRANSITION_TARGET_DURATION_MS = 1500;

/**
 * Reduced-motion users should not wait for decorative animation.
 */
export const APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS = 180;

/**
 * Stage boundary timings.
 */
export const APPROVED_TRANSITION_STAGE_MS = {
  preparingEnd: 300,
  approvedEnd: 750,
  confidenceEnd: 1150,
  handoffEnd: APPROVED_TRANSITION_TARGET_DURATION_MS,
} as const;
