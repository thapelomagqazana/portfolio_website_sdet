/**
 * Represents a 2D pointer or node position in local container coordinates.
 *
 * This model is intentionally renderer-agnostic so it can be used by Canvas,
 * SVG, DOM, or future WebGL renderers.
 */
export type PointerPosition = {
  readonly x: number;
  readonly y: number;
};

/**
 * Runtime pointer state for the network background interaction layer.
 */
export type NetworkInteractionState = {
  readonly pointer: PointerPosition | null;
  readonly isPointerActive: boolean;
};

/**
 * Configuration for network pointer interactions.
 *
 * All values should remain subtle. The goal is premium responsiveness,
 * not a distracting game-like effect.
 */
export type NetworkInteractionConfig = {
  readonly interactionRadius: number;
  readonly attractionStrength: number;
  readonly glowStrength: number;
  readonly maxOffset: number;
  readonly disabled: boolean;
};

/**
 * Result of applying pointer interaction logic to one node.
 */
export type NodeInteractionResult = {
  readonly offsetX: number;
  readonly offsetY: number;
  readonly glowIntensity: number;
  readonly interactionStrength: number;
  readonly isWithinRadius: boolean;
};
