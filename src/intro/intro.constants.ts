import type { IntroStep } from "./intro.types";

/**
 * Hard upper limit for the opening intro.
 */
export const INTRO_MAX_DURATION_MS = 3000;

/**
 * Target cinematic duration.
 */
export const INTRO_TARGET_DURATION_MS = 2400;

/**
 * Reduced-motion users should not wait for decorative animation.
 */
export const INTRO_REDUCED_MOTION_DURATION_MS = 250;

/**
 * Terminal-style intro timeline.
 */
export const INTRO_STEPS: readonly IntroStep[] = [
  {
    id: "command-center",
    label: "INITIALIZING QUALITY COMMAND CENTER...",
    startsAtMs: 0,
    endsAtMs: 650,
  },
  {
    id: "evidence",
    label: "LOADING RELEASE EVIDENCE...",
    startsAtMs: 520,
    endsAtMs: 1150,
  },
  {
    id: "brikbyteos",
    label: "ACTIVATING BRIKBYTEOS...",
    startsAtMs: 1040,
    endsAtMs: 1700,
  },
  {
    id: "ready",
    label: "STATUS: READY",
    startsAtMs: 1680,
    endsAtMs: 2200,
  },
] as const;
