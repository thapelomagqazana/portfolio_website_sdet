"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  animationBudget,
  calculateFramesPerSecond,
  shouldRunAnimation,
} from "@/lib/motion/performance";

export type UseAnimationPerformanceOptions = {
  readonly enabled?: boolean;
  readonly sampleSize?: number;
  readonly isVisible?: boolean;
  readonly reduceCpuWork?: boolean;
};

export type UseAnimationPerformanceResult = {
  readonly prefersReducedMotion: boolean;
  readonly documentHidden: boolean;
  readonly shouldAnimate: boolean;
  readonly fps: number;
  readonly averageFrameTimeMs: number;
  readonly droppedFrames: number;
  readonly frameBudgetMs: number;
};

/**
 * Monitors animation conditions and exposes a single shouldAnimate flag.
 *
 * The hook pauses animation work when:
 * - reduced motion is enabled
 * - the document is hidden
 * - the section is outside the viewport
 * - reduced CPU mode is requested
 */
export function useAnimationPerformance({
  enabled = true,
  sampleSize = 60,
  isVisible = true,
  reduceCpuWork = false,
}: UseAnimationPerformanceOptions = {}): UseAnimationPerformanceResult {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [documentHidden, setDocumentHidden] = useState(false);
  const [fps, setFps] = useState(0);
  const [averageFrameTimeMs, setAverageFrameTimeMs] = useState(0);
  const [droppedFrames, setDroppedFrames] = useState(0);

  const frameTimestampsRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const shouldAnimate = shouldRunAnimation({
    prefersReducedMotion,
    isVisible: enabled && isVisible,
    documentHidden,
    reduceCpuWork,
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const updateVisibility = () => setDocumentHidden(document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const tick = (timestamp: number) => {
      frameTimestampsRef.current = [...frameTimestampsRef.current, timestamp].slice(-sampleSize);

      const sample = calculateFramesPerSecond(frameTimestampsRef.current);

      setFps(sample.fps);
      setAverageFrameTimeMs(sample.averageFrameTimeMs);
      setDroppedFrames(sample.droppedFrames);

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [sampleSize, shouldAnimate]);

  return useMemo(
    () => ({
      prefersReducedMotion,
      documentHidden,
      shouldAnimate,
      fps,
      averageFrameTimeMs,
      droppedFrames,
      frameBudgetMs: animationBudget.maxFrameTimeMs,
    }),
    [prefersReducedMotion, documentHidden, shouldAnimate, fps, averageFrameTimeMs, droppedFrames]
  );
}
