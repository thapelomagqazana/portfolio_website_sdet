import { DEFAULT_TELEMETRY_CONFIG } from "./telemetry.constants";
import { clampTelemetryValue, getSafeDeltaMs } from "./telemetry-math";
import type { TelemetryPoint, TelemetryPulse, TelemetrySignalKind } from "./telemetry.types";

/**
 * Creates a pulse event at an origin point.
 *
 * Pulses are useful when a packet reaches an important node, a quality gate
 * is evaluated, or the background needs a subtle life signal.
 */
export function createTelemetryPulse(
  id: string,
  origin: TelemetryPoint,
  kind: TelemetrySignalKind,
  durationMs = DEFAULT_TELEMETRY_CONFIG.pulseDurationMs
): TelemetryPulse {
  const safeDurationMs = Number.isFinite(durationMs) && durationMs > 0 ? durationMs : 1;

  return {
    id,
    origin,
    kind,
    ageMs: 0,
    durationMs: safeDurationMs,
    radius: 0,
    opacity: 1,
  };
}

/**
 * Updates pulse radius and opacity over time.
 *
 * Radius grows linearly and opacity fades out linearly. The math is intentionally
 * simple, predictable, and renderer-agnostic.
 */
export function updateTelemetryPulse(
  pulse: TelemetryPulse,
  deltaMs: number,
  maxRadius = DEFAULT_TELEMETRY_CONFIG.pulseMaxRadius
): TelemetryPulse {
  const nextAgeMs = pulse.ageMs + getSafeDeltaMs(deltaMs);
  const safeDurationMs =
    Number.isFinite(pulse.durationMs) && pulse.durationMs > 0 ? pulse.durationMs : 1;
  const safeMaxRadius = Number.isFinite(maxRadius) && maxRadius > 0 ? maxRadius : 0;
  const progress = clampTelemetryValue(nextAgeMs / safeDurationMs, 0, 1);

  return {
    ...pulse,
    ageMs: nextAgeMs,
    radius: safeMaxRadius * progress,
    opacity: 1 - progress,
  };
}

/**
 * Returns true while a pulse is still active.
 */
export function isTelemetryPulseActive(pulse: TelemetryPulse): boolean {
  return (
    Number.isFinite(pulse.durationMs) && pulse.durationMs > 0 && pulse.ageMs < pulse.durationMs
  );
}

/**
 * Updates pulses and removes expired ones.
 */
export function updateTelemetryPulses(
  pulses: readonly TelemetryPulse[],
  deltaMs: number
): TelemetryPulse[] {
  return pulses.map((pulse) => updateTelemetryPulse(pulse, deltaMs)).filter(isTelemetryPulseActive);
}
