"use client";

import { useReducedMotion } from "motion/react";

/**
 * Returns whether the user prefers reduced motion.
 *
 * Use this hook before running complex animations such as particles,
 * parallax, large transforms, or continuous quality-gate effects.
 */
export function useReducedMotionSafe(): boolean {
  return Boolean(useReducedMotion());
}
