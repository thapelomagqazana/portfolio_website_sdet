"use client";

import { useMemo, useState } from "react";
import type { NetworkInteractionConfig, PointerPosition } from "./interaction.types";
import { resolveInteractionConfig } from "./interaction-engine";

/**
 * Tracks pointer position relative to a container element.
 *
 * Design decisions:
 * - Uses pointer events, not only mouse events.
 * - Does not attach global event listeners.
 * - Does not update state when pointer coordinates are unchanged.
 * - Supports disabled mode for reduced motion, mobile, or performance fallback.
 */
export function useNetworkPointerInteraction(options: Partial<NetworkInteractionConfig> = {}) {
  const interactionConfig = useMemo(() => resolveInteractionConfig(options), [options]);
  const [pointer, setPointer] = useState<PointerPosition | null>(null);

  const isPointerActive = pointer !== null && !interactionConfig.disabled;

  return {
    pointer: interactionConfig.disabled ? null : pointer,
    isPointerActive,
    interactionConfig,
    containerProps: {
      onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
        if (interactionConfig.disabled) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        const nextPointer: PointerPosition = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };

        setPointer((currentPointer) => {
          // Avoid unnecessary React state updates on duplicate coordinates.
          if (
            currentPointer &&
            currentPointer.x === nextPointer.x &&
            currentPointer.y === nextPointer.y
          ) {
            return currentPointer;
          }

          return nextPointer;
        });
      },

      onPointerLeave: () => {
        setPointer(null);
      },
    },
  };
}
