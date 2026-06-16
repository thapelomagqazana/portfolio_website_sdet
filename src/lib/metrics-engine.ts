/**
 * Clamps a metric value into an inclusive range.
 *
 * Rules:
 * - NaN returns min.
 * - Infinity returns max.
 * - -Infinity returns min.
 * - Values below min return min.
 * - Values above max return max.
 */
export function clampMetricValue(value: number, min = 0, max = 100): number {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : safeMin;

  const lower = Math.min(safeMin, safeMax);
  const upper = Math.max(safeMin, safeMax);

  if (Number.isNaN(value)) {
    return lower;
  }

  if (value === Infinity) {
    return upper;
  }

  if (value === -Infinity) {
    return lower;
  }

  if (!Number.isFinite(value)) {
    return lower;
  }

  return Math.min(Math.max(value, lower), upper);
}

/**
 * Calculates eased animation progress.
 *
 * The curve starts quickly and settles smoothly, which works well for metric
 * counters without feeling too playful.
 */
export function easeOutCubic(progress: number): number {
  const safeProgress = clampMetricValue(progress, 0, 1);

  return 1 - Math.pow(1 - safeProgress, 3);
}

/**
 * Interpolates between two metric values.
 *
 * Invalid progress is treated as zero progress.
 */
export function interpolateMetricValue(start: number, end: number, progress: number): number {
  const safeStart = Number.isFinite(start) ? start : 0;
  const safeEnd = Number.isFinite(end) ? end : safeStart;
  const safeProgress = Number.isFinite(progress) ? clampMetricValue(progress, 0, 1) : 0;

  return safeStart + (safeEnd - safeStart) * safeProgress;
}

/**
 * Formats a metric value with precision and suffix.
 *
 * Integer-looking values render cleanly:
 * - 85 + "%" => "85%"
 * - 97.3 + "%" => "97.3%"
 */
export function formatMetricValue(value: number, precision = 0, suffix = ""): string {
  const safePrecision = Math.max(0, Math.min(Math.floor(precision), 6));
  const safeValue = Number.isFinite(value) ? value : 0;

  const formattedValue =
    safePrecision === 0
      ? String(Math.round(safeValue))
      : safeValue.toFixed(safePrecision).replace(/\.?0+$/, "");

  return `${formattedValue}${suffix}`;
}
