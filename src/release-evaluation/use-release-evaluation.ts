"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS,
  RELEASE_EVALUATION_TARGET_DURATION_MS,
} from "./release-evaluation.constants";
import { getReleaseEvaluationState } from "./release-evaluation-engine";
import type { ReleaseEvaluationState } from "./release-evaluation.types";

export type UseReleaseEvaluationOptions = {
  readonly reducedMotion?: boolean;
  readonly onComplete?: () => void;
};

/**
 * Runs the release evaluation timeline.
 *
 * Design goals:
 * - Uses requestAnimationFrame.
 * - Cancels RAF on unmount.
 * - Calls onComplete once.
 * - Supports skip and reduced motion.
 * - Avoids ref writes during render for React Compiler compatibility.
 */
export function useReleaseEvaluation({
  reducedMotion = false,
  onComplete,
}: UseReleaseEvaluationOptions) {
  const durationMs = reducedMotion
    ? RELEASE_EVALUATION_REDUCED_MOTION_DURATION_MS
    : RELEASE_EVALUATION_TARGET_DURATION_MS;

  const [state, setState] = useState<ReleaseEvaluationState>(() =>
    getReleaseEvaluationState(0, reducedMotion)
  );

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const completeRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const complete = useCallback(() => {
    if (completeRef.current) return;

    completeRef.current = true;
    setState(getReleaseEvaluationState(durationMs, reducedMotion));
    onCompleteRef.current?.();
  }, [durationMs, reducedMotion]);

  const skip = useCallback(() => {
    complete();
  }, [complete]);

  useEffect(() => {
    if (completeRef.current) return;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsedMs = timestamp - startTimeRef.current;
      const nextState = getReleaseEvaluationState(elapsedMs, reducedMotion);

      setState(nextState);

      if (nextState.isComplete) {
        complete();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = null;
      startTimeRef.current = null;
    };
  }, [complete, reducedMotion]);

  return {
    ...state,
    skip,
  };
}
