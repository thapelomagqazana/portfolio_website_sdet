/**
 * Semantic category for telemetry signals flowing through the background network.
 *
 * These values intentionally map to quality-engineering concepts so the
 * background feels like a live release-confidence system instead of random
 * decorative particles.
 */
export type TelemetrySignalKind =
  | "test"
  | "security"
  | "performance"
  | "evidence"
  | "policy"
  | "release";

/**
 * A 2D point in network-local coordinates.
 */
export type TelemetryPoint = {
  readonly x: number;
  readonly y: number;
};

/**
 * A drawable telemetry path derived from a valid network edge.
 */
export type TelemetryPath = {
  readonly id: string;
  readonly sourceId: string;
  readonly targetId: string;
  readonly start: TelemetryPoint;
  readonly end: TelemetryPoint;
  readonly length: number;
  readonly kind: TelemetrySignalKind;
};

/**
 * A moving data packet travelling along a telemetry path.
 */
export type TelemetryPacket = {
  readonly id: string;
  readonly pathId: string;
  readonly kind: TelemetrySignalKind;
  readonly progress: number;
  readonly speed: number;
  readonly size: number;
  readonly opacity: number;
};

/**
 * A pulse expanding from a point in the telemetry network.
 */
export type TelemetryPulse = {
  readonly id: string;
  readonly origin: TelemetryPoint;
  readonly kind: TelemetrySignalKind;
  readonly ageMs: number;
  readonly durationMs: number;
  readonly radius: number;
  readonly opacity: number;
};

/**
 * Complete renderer-agnostic telemetry state.
 */
export type TelemetryState = {
  readonly paths: readonly TelemetryPath[];
  readonly packets: readonly TelemetryPacket[];
  readonly pulses: readonly TelemetryPulse[];
};

/**
 * Runtime configuration for telemetry stream generation and animation.
 */
export type TelemetryConfig = {
  readonly packetCount: number;
  readonly minPacketSpeed: number;
  readonly maxPacketSpeed: number;
  readonly minPacketSize: number;
  readonly maxPacketSize: number;
  readonly pulseDurationMs: number;
  readonly pulseMaxRadius: number;
};
