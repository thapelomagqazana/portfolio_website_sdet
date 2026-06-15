"use client";

import { useEffect, useRef } from "react";
import { DEFAULT_TARGET_FPS } from "./render.constants";
import { getFrameDeltaMs, isDocumentVisible, shouldRenderFrame } from "./render-performance";
import type { RenderLoopOptions } from "./render.types";

/**
 * Runs a throttled requestAnimationFrame loop.
 *
 * Rules:
 * - Never updates React state per frame.
 * - Never reads/writes refs during render except initial ref creation.
 * - Keeps the latest onFrame callback synchronized in an effect.
 * - Cancels RAF on cleanup.
 */
export function useNetworkRenderLoop({
  enabled,
  targetFps = DEFAULT_TARGET_FPS,
  onFrame,
}: RenderLoopOptions): void {
  const animationFrameIdRef = useRef<number | null>(null);
  const startTimestampRef = useRef<number | null>(null);
  const lastRenderedTimestampRef = useRef<number | null>(null);
  const latestOnFrameRef = useRef(onFrame);

  useEffect(() => {
    latestOnFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const render = (timestamp: number) => {
      if (!isDocumentVisible(globalThis.document?.visibilityState)) {
        animationFrameIdRef.current = globalThis.requestAnimationFrame(render);
        return;
      }

      if (startTimestampRef.current === null) {
        startTimestampRef.current = timestamp;
      }

      if (shouldRenderFrame(lastRenderedTimestampRef.current, timestamp, targetFps)) {
        const deltaMs = getFrameDeltaMs(lastRenderedTimestampRef.current, timestamp);
        const elapsedMs = timestamp - startTimestampRef.current;

        latestOnFrameRef.current({
          timestamp,
          deltaMs,
          elapsedMs,
        });

        lastRenderedTimestampRef.current = timestamp;
      }

      animationFrameIdRef.current = globalThis.requestAnimationFrame(render);
    };

    animationFrameIdRef.current = globalThis.requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current !== null) {
        globalThis.cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = null;
      startTimestampRef.current = null;
      lastRenderedTimestampRef.current = null;
    };
  }, [enabled, targetFps]);
}
