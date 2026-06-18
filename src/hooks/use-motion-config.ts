"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { instantTransition, withReducedMotionTransition } from "@/lib/motion/utils";
import type { MotionConfig } from "@/types/motion";

/**
 * Shared motion configuration hook.
 *
 * Use this hook in animated components to keep reduced-motion behavior,
 * transition scaling, and animation enablement consistent across the portfolio.
 */
export function useMotionConfig(enabled = true): MotionConfig {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const shouldAnimate = enabled && !prefersReducedMotion;

  return useMemo(
    () => ({
      prefersReducedMotion,
      shouldAnimate,
      durationScale: prefersReducedMotion ? 0 : 1,
      transitionFactory: (transition?: Transition) =>
        withReducedMotionTransition(prefersReducedMotion, transition ?? instantTransition()),
    }),
    [prefersReducedMotion, shouldAnimate]
  );
}
