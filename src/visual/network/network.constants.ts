import type { NetworkDensity, NetworkNodeKind, NetworkSignalKind } from "./network.types";

export const MIN_NETWORK_WIDTH = 320;
export const MIN_NETWORK_HEIGHT = 240;

export const NODE_RADIUS = {
  min: 1.4,
  max: 3.8,
} as const;

export const SIGNAL_SPEED = {
  min: 0.00008,
  max: 0.00024,
} as const;

export const NETWORK_NODE_KINDS: readonly NetworkNodeKind[] = [
  "test",
  "security",
  "performance",
  "evidence",
  "policy",
  "release",
  "system",
] as const;

export const NETWORK_SIGNAL_KINDS: readonly NetworkSignalKind[] = [
  "test-result",
  "security-check",
  "performance-sample",
  "evidence-artifact",
  "policy-decision",
  "release-verdict",
] as const;

export const DENSITY_PRESETS: Record<
  NetworkDensity,
  {
    readonly nodeDensityPerPixel: number;
    readonly maxEdgesPerNode: number;
    readonly signalMultiplier: number;
  }
> = {
  low: {
    nodeDensityPerPixel: 0.000035,
    maxEdgesPerNode: 2,
    signalMultiplier: 0.5,
  },
  medium: {
    nodeDensityPerPixel: 0.000055,
    maxEdgesPerNode: 3,
    signalMultiplier: 0.8,
  },
  high: {
    nodeDensityPerPixel: 0.000075,
    maxEdgesPerNode: 4,
    signalMultiplier: 1,
  },
};
