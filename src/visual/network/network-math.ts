/**
 * Returns true when a value is a finite number.
 */
export function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

/**
 * Clamps a number into a safe inclusive range.
 */
export function clamp(value: number, min: number, max: number): number {
  if (!isFiniteNumber(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a safe integer count.
 *
 * Counts cannot be negative and cannot be fractional.
 */
export function toSafeCount(value: number): number {
  if (!isFiniteNumber(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}
