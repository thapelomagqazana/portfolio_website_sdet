import { createSeededRandom, randomBetween, randomInteger } from "./seeded-random";
import { DEFAULT_TELEMETRY_CONFIG } from "./telemetry.constants";
import { clampTelemetryValue, getSafeCount, getSafeDeltaMs } from "./telemetry-math";
import { getTelemetryPointAtProgress } from "./telemetry-paths";
import type {
  TelemetryConfig,
  TelemetryPacket,
  TelemetryPath,
  TelemetryPoint,
} from "./telemetry.types";

/**
 * Merges partial telemetry config with safe defaults.
 *
 * This prevents broken runtime overrides from producing negative sizes,
 * negative speeds, invalid durations, or impossible packet counts.
 */
export function resolveTelemetryConfig(config: Partial<TelemetryConfig> = {}): TelemetryConfig {
  const merged = {
    ...DEFAULT_TELEMETRY_CONFIG,
    ...config,
  };

  const minPacketSpeed = Math.max(0, merged.minPacketSpeed);
  const maxPacketSpeed = Math.max(minPacketSpeed, merged.maxPacketSpeed);
  const minPacketSize = Math.max(0, merged.minPacketSize);
  const maxPacketSize = Math.max(minPacketSize, merged.maxPacketSize);

  return {
    packetCount: getSafeCount(merged.packetCount),
    minPacketSpeed,
    maxPacketSpeed,
    minPacketSize,
    maxPacketSize,
    pulseDurationMs: Math.max(1, merged.pulseDurationMs),
    pulseMaxRadius: Math.max(0, merged.pulseMaxRadius),
  };
}

/**
 * Creates deterministic telemetry packets attached to existing paths.
 *
 * Design goals:
 * - Pure and renderer-agnostic.
 * - Deterministic for repeatable visual tests.
 * - Safe when no paths exist.
 * - Immutable output.
 *
 * @param paths - Telemetry paths generated from valid network edges.
 * @param config - Optional telemetry config overrides.
 * @param seed - Seed used for deterministic packet generation.
 * @returns A deterministic packet collection attached to existing paths.
 */
export function createTelemetryPackets(
  paths: readonly TelemetryPath[],
  config: Partial<TelemetryConfig> = {},
  seed = "brikbyte-telemetry"
): TelemetryPacket[] {
  if (paths.length === 0) {
    return [];
  }

  const resolvedConfig = resolveTelemetryConfig(config);
  const random = createSeededRandom(seed);

  return Array.from({ length: resolvedConfig.packetCount }, (_, index) => {
    const path = paths[randomInteger(random, 0, paths.length - 1)];

    return {
      id: `telemetry-packet-${index}`,
      pathId: path.id,
      kind: path.kind,
      progress: random(),
      speed: randomBetween(random, resolvedConfig.minPacketSpeed, resolvedConfig.maxPacketSpeed),
      size: randomBetween(random, resolvedConfig.minPacketSize, resolvedConfig.maxPacketSize),
      opacity: randomBetween(random, 0.35, 0.9),
    };
  });
}

/**
 * Updates one telemetry packet by delta time.
 *
 * Progress loops inside [0, 1), allowing packets to continuously travel along
 * the same path without creating new objects beyond the updated immutable copy.
 */
export function updateTelemetryPacket(packet: TelemetryPacket, deltaMs: number): TelemetryPacket {
  const delta = getSafeDeltaMs(deltaMs);
  const speed = Number.isFinite(packet.speed) ? Math.max(packet.speed, 0) : 0;
  const progress = Number.isFinite(packet.progress) ? packet.progress : 0;

  return {
    ...packet,
    progress: (progress + speed * delta) % 1,
  };
}

/**
 * Updates multiple telemetry packets immutably.
 */
export function updateTelemetryPackets(
  packets: readonly TelemetryPacket[],
  deltaMs: number
): TelemetryPacket[] {
  return packets.map((packet) => updateTelemetryPacket(packet, deltaMs));
}

/**
 * Creates render-ready packet state.
 *
 * This function does not draw anything. Canvas, SVG, or WebGL renderers can use
 * this result to render packet position, size, and opacity consistently.
 */
export function getTelemetryPacketRenderState(
  packet: TelemetryPacket,
  path: TelemetryPath
): {
  readonly point: TelemetryPoint;
  readonly size: number;
  readonly opacity: number;
} {
  return {
    point: getTelemetryPointAtProgress(path, packet.progress),
    size: Math.max(packet.size, 0),
    opacity: clampTelemetryValue(packet.opacity, 0, 1),
  };
}
