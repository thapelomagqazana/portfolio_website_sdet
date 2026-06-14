/**
 * Clamps a telemetry value into an inclusive range.
 */
export function clampTelemetryValue(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;

  return Math.min(Math.max(value, min), max);
}

/**
 * Produces positive modulo results even when the input is negative.
 */
export function positiveModulo(value: number, modulo: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(modulo) || modulo <= 0) return 0;

  return ((Math.trunc(value) % modulo) + modulo) % modulo;
}

/**
 * Converts arbitrary delta time into a safe non-negative number.
 */
export function getSafeDeltaMs(deltaMs: number): number {
  if (!Number.isFinite(deltaMs)) return 0;

  return Math.max(deltaMs, 0);
}

/**
 * Converts arbitrary counts into safe non-negative integers.
 */
export function getSafeCount(value: number): number {
  if (!Number.isFinite(value)) return 0;

  return Math.max(0, Math.floor(value));
}
