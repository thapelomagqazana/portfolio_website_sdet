import type { Transition } from "motion/react";
import { motionDelay, motionDuration, motionEase, motionSpring } from "@/lib/motion/tokens";

/**
 * Clamps duration values to a safe range.
 */
export function clampMotionDuration(duration: number): number {
  if (!Number.isFinite(duration)) return motionDuration.normal;
  return Math.min(Math.max(duration, 0), motionDuration.slower);
}

/**
 * Builds a safe stagger delay.
 */
export function buildStaggerDelay(index: number, step = motionDelay.sm): number {
  if (!Number.isFinite(index) || index <= 0) return 0;
  return Number((index * step).toFixed(3));
}

/**
 * Returns an instant transition for reduced-motion mode.
 */
export function instantTransition(): Transition {
  return {
    duration: motionDuration.instant,
  };
}

/**
 * Disables motion movement while preserving visibility.
 */
export function disableAnimation<T>(visibleState: T): T {
  return visibleState;
}

/**
 * Creates a standard fade transition.
 */
export function buildFadeTransition(delay = motionDelay.none): Transition {
  return {
    duration: motionDuration.normal,
    delay,
    ease: motionEase.standard,
  };
}

/**
 * Creates a spring transition using a centralized spring token.
 */
export function buildSpringTransition(
  spring: keyof typeof motionSpring = "soft",
  delay = motionDelay.none
): Transition {
  return {
    type: "spring",
    ...motionSpring[spring],
    delay,
  };
}

/**
 * Creates a stagger transition for parent containers.
 */
export function buildStaggerTransition(
  staggerChildren = motionDelay.sm,
  delayChildren = motionDelay.none
): Transition {
  return {
    staggerChildren,
    delayChildren,
  };
}

/**
 * Applies a delay to a transition without mutating the original object.
 */
export function buildDelayedTransition(transition: Transition, delay: number): Transition {
  return {
    ...transition,
    delay,
  };
}

/**
 * Returns a transition that automatically respects reduced motion.
 */
export function withReducedMotionTransition(
  prefersReducedMotion: boolean,
  transition: Transition
): Transition {
  return prefersReducedMotion ? instantTransition() : transition;
}

/**
 * Returns false when animation should be disabled.
 */
export function shouldRunAnimation(prefersReducedMotion: boolean, enabled = true): boolean {
  return enabled && !prefersReducedMotion;
}
