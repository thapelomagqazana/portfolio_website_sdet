/**
 * Central motion constants for the BrikByte Command portfolio.
 *
 * Motion must feel like a production release system:
 * precise, controlled, fast, accessible, and never distracting.
 */

export const durations = {
  micro: 0.12,
  fast: 0.2,
  standard: 0.35,
  section: 0.5,
  major: 0.8,
} as const;

export const easings = {
  premium: [0.22, 1, 0.36, 1],
  system: [0.16, 1, 0.3, 1],
  linear: "linear",
} as const;

export const delays = {
  none: 0,
  xs: 0.05,
  sm: 0.1,
  md: 0.18,
  lg: 0.28,
} as const;
