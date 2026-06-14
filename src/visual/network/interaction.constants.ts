import type { NetworkInteractionConfig } from "./interaction.types";

/**
 * Default network interaction configuration.
 *
 * Values are intentionally conservative:
 * - Radius is large enough to feel responsive.
 * - Attraction is weak enough to avoid sticky movement.
 * - Glow is visible but not noisy.
 */
export const DEFAULT_NETWORK_INTERACTION_CONFIG: NetworkInteractionConfig = {
  interactionRadius: 160,
  attractionStrength: 0.12,
  glowStrength: 0.75,
  maxOffset: 10,
  disabled: false,
};
