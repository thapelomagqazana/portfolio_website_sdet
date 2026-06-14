import { DENSITY_PRESETS, MIN_NETWORK_HEIGHT, MIN_NETWORK_WIDTH } from "./network.constants";
import type { NetworkBounds, NetworkConfig, NetworkDensity } from "./network.types";

/**
 * Clamps bounds so generation never receives zero or invalid dimensions.
 */
export function getSafeNetworkBounds(bounds: NetworkBounds): NetworkBounds {
  return {
    width: Math.max(Math.round(bounds.width), MIN_NETWORK_WIDTH),
    height: Math.max(Math.round(bounds.height), MIN_NETWORK_HEIGHT),
  };
}

/**
 * Resolves density from viewport width.
 */
export function getNetworkDensity(bounds: NetworkBounds): NetworkDensity {
  const safeBounds = getSafeNetworkBounds(bounds);

  if (safeBounds.width < 640) return "low";
  if (safeBounds.width < 1024) return "medium";

  return "high";
}

/**
 * Creates a responsive deterministic network config.
 */
export function getResponsiveNetworkConfig(seed: string, bounds: NetworkBounds): NetworkConfig {
  const safeBounds = getSafeNetworkBounds(bounds);
  const density = getNetworkDensity(safeBounds);
  const preset = DENSITY_PRESETS[density];
  const area = safeBounds.width * safeBounds.height;
  const nodeCount = Math.max(6, Math.round(area * preset.nodeDensityPerPixel));
  const signalCount = Math.max(3, Math.round(nodeCount * preset.signalMultiplier));

  return {
    seed,
    bounds: safeBounds,
    density,
    nodeCount,
    maxEdgesPerNode: preset.maxEdgesPerNode,
    signalCount,
  };
}
