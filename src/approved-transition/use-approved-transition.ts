"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS,
  APPROVED_TRANSITION_TARGET_DURATION_MS,
} from "./approved-transition.constants";
import { getApprovedTransitionState } from "./approved-transition-engine";
import type { ApprovedTransitionState } from "./approved-transition.types";

export type UseApprovedTransitionOptions = {
  readonly reducedMotion?: boolean;
  readonly onComplete?: () => void;
};

/**
 * Runs the final approved transition timeline.
 *
 * Design goals:
 * - Uses requestAnimationFrame.
 * - Cancels RAF on unmount.
 * - Calls onComplete once.
 * - Supports skip and reduced motion.
 * - Avoids ref writes during render for React Compiler compatibility.
 */
export function useApprovedTransition({
  reducedMotion = false,
  onComplete,
}: UseApprovedTransitionOptions) {
  const durationMs = reducedMotion
    ? APPROVED_TRANSITION_REDUCED_MOTION_DURATION_MS
    : APPROVED_TRANSITION_TARGET_DURATION_MS;

  const [state, setState] = useState<ApprovedTransitionState>(() =>
    getApprovedTransitionState(0, reducedMotion)
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
    setState(getApprovedTransitionState(durationMs, reducedMotion));
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

      const nextState = getApprovedTransitionState(timestamp - startTimeRef.current, reducedMotion);

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
