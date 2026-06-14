/**
 * Scroll viewport presets.
 *
 * These defaults prevent repeated unnecessary animations and keep the site
 * feeling stable, not noisy.
 */

export const viewportOnce = {
  once: true,
  amount: 0.25,
} as const;

export const viewportFrequent = {
  once: false,
  amount: 0.35,
} as const;

export const sectionRevealProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOnce,
} as const;
