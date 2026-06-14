import type { Transition, Variants } from "motion/react";
import { durations, easings } from "./motion.constants";

/**
 * Shared premium transition.
 */
export const premiumTransition: Transition = {
  duration: durations.standard,
  ease: easings.premium,
};

/**
 * Fade content without moving it.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: premiumTransition,
  },
};

/**
 * Standard section reveal.
 */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.section,
      ease: easings.system,
    },
  },
};

/**
 * Subtle scale reveal for command panels.
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: premiumTransition,
  },
};

/**
 * Reusable hover preset.
 *
 * Keep hover movement small to avoid a gaming-dashboard feel.
 */
export const cardHover = {
  y: -4,
  scale: 1.01,
  transition: {
    duration: durations.fast,
    ease: easings.premium,
  },
} as const;

/**
 * Dashboard panel reveal.
 */
export const panelReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.section,
      ease: easings.system,
    },
  },
};

/**
 * Staggers child animations.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Quality gate pulse.
 *
 * Use only for meaningful approval/status moments.
 */
export const qualityGatePulse = {
  scale: [1, 1.04, 1],
  opacity: [0.85, 1, 0.85],
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: easings.system,
  },
} as const;
