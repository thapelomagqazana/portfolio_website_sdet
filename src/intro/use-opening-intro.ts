"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_REDUCED_MOTION_DURATION_MS, INTRO_TARGET_DURATION_MS } from "./intro.constants";
import { getIntroState } from "./intro-engine";
import type { IntroState } from "./intro.types";

export type UseOpeningIntroOptions = {
  readonly reducedMotion?: boolean;
  readonly onComplete?: () => void;
};

/**
 * Runs the opening intro timeline.
 *
 * Design goals:
 * - Uses requestAnimationFrame.
 * - Cancels RAF on unmount.
 * - Calls onComplete once.
 * - Supports skip.
 * - Avoids ref writes during render.
 */
export function useOpeningIntro({ reducedMotion = false, onComplete }: UseOpeningIntroOptions) {
  const durationMs = reducedMotion ? INTRO_REDUCED_MOTION_DURATION_MS : INTRO_TARGET_DURATION_MS;

  const [state, setState] = useState<IntroState>(() => getIntroState(0, reducedMotion));

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const completeRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const complete = useCallback(() => {
    if (completeRef.current) {
      return;
    }

    completeRef.current = true;
    setState(getIntroState(durationMs, reducedMotion));
    onCompleteRef.current?.();
  }, [durationMs, reducedMotion]);

  const skip = useCallback(() => {
    complete();
  }, [complete]);

  useEffect(() => {
    if (completeRef.current) {
      return;
    }

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsedMs = timestamp - startTimeRef.current;
      const nextState = getIntroState(elapsedMs, reducedMotion);

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
