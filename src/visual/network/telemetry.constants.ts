import type { TelemetryConfig, TelemetrySignalKind } from "./telemetry.types";

/**
 * Ordered deterministic telemetry signal cycle.
 *
 * Edge index 0 receives "test", index 1 receives "security", and so on.
 */
export const TELEMETRY_SIGNAL_KINDS: readonly TelemetrySignalKind[] = [
  "test",
  "security",
  "performance",
  "evidence",
  "policy",
  "release",
] as const;

/**
 * Default telemetry configuration.
 *
 * Values are intentionally conservative so the background feels alive without
 * becoming visually noisy or expensive to render.
 */
export const DEFAULT_TELEMETRY_CONFIG: TelemetryConfig = {
  packetCount: 32,
  minPacketSpeed: 0.00008,
  maxPacketSpeed: 0.00022,
  minPacketSize: 1.2,
  maxPacketSize: 2.8,
  pulseDurationMs: 1200,
  pulseMaxRadius: 42,
};
