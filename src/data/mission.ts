/**
 * Centralized mission statement copy.
 *
 * Keep this copy outside the component so future content edits do not require
 * layout or animation changes.
 */
export const missionStatement = {
  eyebrow: "Mission Statement",
  headline: "I build software confidence before software release.",
  body: "My work sits at the intersection of testing, automation, development, and release engineering — helping teams move from uncertainty to evidence-based delivery.",
} as const;

/**
 * Engineering principles shown in the Hero mission module.
 *
 * These principles are intentionally short, memorable, and aligned with the
 * BrikByteOS/release-confidence positioning.
 */
export const engineeringPrinciples = [
  "Evidence over assumptions",
  "Automation over repetition",
  "Quality gates over guesswork",
  "Traceability over confusion",
  "Release confidence over release anxiety",
] as const;

/**
 * Principle rotation timing in milliseconds.
 */
export const MISSION_PRINCIPLE_ROTATION_MS = 2200;
