/**
 * Centralized mission statement copy.
 *
 * The mission statement should communicate:
 * - Release confidence
 * - Evidence-driven engineering
 * - Quality as a system
 * - BrikByteOS thinking
 */
export const missionStatement = {
  eyebrow: "Mission Statement",

  headline: "I turn release decisions into evidence-based decisions.",

  body: "My work sits at the intersection of software engineering, testing, automation, and release intelligence. I build systems that transform quality signals into actionable evidence, helping teams ship software with confidence rather than assumption.",
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
