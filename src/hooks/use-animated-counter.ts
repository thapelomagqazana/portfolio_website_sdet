"use client";

import { useEffect, useMemo, useState } from "react";
import { easeOutCubic, formatMetricValue, interpolateMetricValue } from "@/lib/metrics-engine";

export type UseAnimatedCounterOptions = {
  readonly from: number;
  readonly to: number;
  readonly durationMs?: number;
  readonly precision?: number;
  readonly suffix?: string;
  readonly reducedMotion?: boolean;
};

export type AnimatedCounterState = {
  readonly value: number;
  readonly displayValue: string;
  readonly isComplete: boolean;
};

/**
 * Animates a numeric counter from one value to another.
 *
 * Important React Compiler safety:
 * - Reduced motion is handled through initial state and render output.
 * - The effect does not call setState synchronously just to handle reduced motion.
 * - Animation frame cleanup prevents memory leaks.
 */
export function useAnimatedCounter({
  from,
  to,
  durationMs = 900,
  precision = 0,
  suffix = "",
  reducedMotion = false,
}: UseAnimatedCounterOptions): AnimatedCounterState {
  const safeDurationMs = Number.isFinite(durationMs) && durationMs > 0 ? durationMs : 900;
  const initialValue = reducedMotion ? to : from;

  const [value, setValue] = useState(initialValue);
  const [isComplete, setIsComplete] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const startTime = performance.now();
    let frameId: number | null = null;

    const tick = (timestamp: number) => {
      const elapsedMs = timestamp - startTime;
      const progress = Math.min(elapsedMs / safeDurationMs, 1);
      const easedProgress = easeOutCubic(progress);

      setValue(interpolateMetricValue(from, to, easedProgress));

      if (progress >= 1) {
        setIsComplete(true);
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [from, to, reducedMotion, safeDurationMs]);

  const finalValue = reducedMotion ? to : value;

  const displayValue = useMemo(
    () => formatMetricValue(finalValue, precision, suffix),
    [finalValue, precision, suffix]
  );

  return {
    value: finalValue,
    displayValue,
    isComplete: reducedMotion ? true : isComplete,
  };
}
