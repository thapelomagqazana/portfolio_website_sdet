/**
 * Global motion design tokens.
 *
 * These values are the single source of truth for animation timing, distance,
 * delays, easing, springs, and opacity behavior across the portfolio.
 */

export const motionDuration = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  medium: 0.45,
  slow: 0.7,
  slower: 1.2,
} as const;

export const motionDistance = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 48,
} as const;

export const motionDelay = {
  none: 0,
  xs: 0.03,
  sm: 0.06,
  md: 0.1,
  lg: 0.18,
} as const;

export const motionEase = {
  standard: [0.2, 0.8, 0.2, 1],
  emphasized: [0.16, 1, 0.3, 1],
  entrance: [0.12, 0.8, 0.32, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const motionSpring = {
  soft: {
    stiffness: 180,
    damping: 20,
  },
  medium: {
    stiffness: 240,
    damping: 22,
  },
  snappy: {
    stiffness: 320,
    damping: 28,
  },
} as const;

export const motionOpacity = {
  hidden: 0,
  faint: 0.35,
  visible: 1,
} as const;
