import { DEFAULT_NETWORK_INTERACTION_CONFIG } from "./interaction.constants";
import type {
  NetworkInteractionConfig,
  NodeInteractionResult,
  PointerPosition,
} from "./interaction.types";

/**
 * Clamps a numeric value into an inclusive range.
 */
function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Resolves user-provided interaction config with safe defaults.
 *
 * Defensive rules:
 * - Radius cannot be negative.
 * - Strength cannot be negative.
 * - Max offset cannot be negative.
 * - Glow strength cannot be negative.
 */
export function resolveInteractionConfig(
  config: Partial<NetworkInteractionConfig> = {}
): NetworkInteractionConfig {
  const merged = {
    ...DEFAULT_NETWORK_INTERACTION_CONFIG,
    ...config,
  };

  return {
    interactionRadius: Math.max(0, merged.interactionRadius),
    attractionStrength: Math.max(0, merged.attractionStrength),
    glowStrength: Math.max(0, merged.glowStrength),
    maxOffset: Math.max(0, merged.maxOffset),
    disabled: Boolean(merged.disabled),
  };
}

/**
 * Calculates Euclidean distance between two points.
 *
 * @param a - First point.
 * @param b - Second point.
 * @returns Distance between the two points.
 */
export function getDistanceBetweenPoints(a: PointerPosition, b: PointerPosition): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks whether a pointer is within a node's interaction radius.
 *
 * Null pointer means no active interaction.
 */
export function isPointWithinRadius(
  pointer: PointerPosition | null,
  node: PointerPosition,
  radius: number
): boolean {
  if (!pointer || radius <= 0 || !Number.isFinite(radius)) {
    return false;
  }

  return getDistanceBetweenPoints(node, pointer) <= radius;
}

/**
 * Converts distance into interaction strength from 0 to 1.
 *
 * Formula:
 * - 1 when pointer is directly on the node.
 * - 0 when pointer is outside the radius.
 * - Linear falloff inside the radius.
 */
export function getInteractionStrength(distance: number, radius: number): number {
  if (!Number.isFinite(distance) || !Number.isFinite(radius)) {
    return 0;
  }

  if (radius <= 0 || distance < 0 || distance >= radius) {
    return 0;
  }

  return clamp(1 - distance / radius, 0, 1);
}

/**
 * Calculates a subtle attraction offset that pulls a node toward the pointer.
 *
 * The result is clamped by maxOffset so nodes never jump too far.
 */
export function getNodeAttractionOffset(
  node: PointerPosition,
  pointer: PointerPosition | null,
  config: NetworkInteractionConfig
): { readonly offsetX: number; readonly offsetY: number } {
  const resolvedConfig = resolveInteractionConfig(config);

  if (
    resolvedConfig.disabled ||
    !pointer ||
    resolvedConfig.interactionRadius <= 0 ||
    resolvedConfig.maxOffset <= 0
  ) {
    return { offsetX: 0, offsetY: 0 };
  }

  const distance = getDistanceBetweenPoints(node, pointer);
  const strength = getInteractionStrength(distance, resolvedConfig.interactionRadius);

  // If the pointer is directly on the node, direction cannot be normalized.
  if (distance === 0 || strength === 0) {
    return { offsetX: 0, offsetY: 0 };
  }

  const directionX = (pointer.x - node.x) / distance;
  const directionY = (pointer.y - node.y) / distance;

  const offsetMagnitude = clamp(
    strength * resolvedConfig.attractionStrength * resolvedConfig.maxOffset,
    0,
    resolvedConfig.maxOffset
  );

  return {
    offsetX: directionX * offsetMagnitude,
    offsetY: directionY * offsetMagnitude,
  };
}

/**
 * Calculates glow intensity based on pointer proximity.
 *
 * Glow is strongest near the pointer and fades to zero at the radius boundary.
 */
export function getNodeGlowIntensity(
  node: PointerPosition,
  pointer: PointerPosition | null,
  config: NetworkInteractionConfig
): number {
  const resolvedConfig = resolveInteractionConfig(config);

  if (
    resolvedConfig.disabled ||
    !pointer ||
    resolvedConfig.interactionRadius <= 0 ||
    resolvedConfig.glowStrength <= 0
  ) {
    return 0;
  }

  const distance = getDistanceBetweenPoints(node, pointer);
  const strength = getInteractionStrength(distance, resolvedConfig.interactionRadius);

  return clamp(strength * resolvedConfig.glowStrength, 0, resolvedConfig.glowStrength);
}

/**
 * Calculates all pointer interaction effects for a single node.
 *
 * This is the main function renderers should consume.
 */
export function getNodeInteraction(
  node: PointerPosition,
  pointer: PointerPosition | null,
  config: Partial<NetworkInteractionConfig> = {}
): NodeInteractionResult {
  const resolvedConfig = resolveInteractionConfig(config);
  const distance = pointer ? getDistanceBetweenPoints(node, pointer) : Number.POSITIVE_INFINITY;

  const interactionStrength =
    pointer && !resolvedConfig.disabled
      ? getInteractionStrength(distance, resolvedConfig.interactionRadius)
      : 0;

  const { offsetX, offsetY } = getNodeAttractionOffset(node, pointer, resolvedConfig);
  const glowIntensity = getNodeGlowIntensity(node, pointer, resolvedConfig);

  return {
    offsetX,
    offsetY,
    glowIntensity,
    interactionStrength,
    isWithinRadius: interactionStrength > 0,
  };
}
