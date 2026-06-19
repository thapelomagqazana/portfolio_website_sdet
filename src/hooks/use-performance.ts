"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type IdleDeadlineLike = {
  readonly didTimeout: boolean;
  readonly timeRemaining: () => number;
};

type WindowWithIdleCallback = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: (deadline: IdleDeadlineLike) => void) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export type NetworkConnectionInfo = {
  readonly saveData: boolean;
  readonly effectiveType: string;
};

export type UsePerformanceResult = {
  readonly isIdle: boolean;
  readonly shouldReduceCpuWork: boolean;
  readonly connection: NetworkConnectionInfo;
  readonly runWhenIdle: (callback: () => void) => void;
};

/**
 * Browser-safe performance hook.
 */
export function usePerformance(): UsePerformanceResult {
  const [isIdle, setIsIdle] = useState(false);

  const connection = useMemo<NetworkConnectionInfo>(() => {
    if (typeof navigator === "undefined") {
      return { saveData: false, effectiveType: "unknown" };
    }

    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };

    return {
      saveData: Boolean(nav.connection?.saveData),
      effectiveType: nav.connection?.effectiveType ?? "unknown",
    };
  }, []);

  const shouldReduceCpuWork =
    connection.saveData ||
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g";

  const runWhenIdle = useCallback((callback: () => void) => {
    if (typeof window === "undefined") return;

    const browserWindow = globalThis.window as WindowWithIdleCallback;

    if (typeof browserWindow.requestIdleCallback === "function") {
      browserWindow.requestIdleCallback(() => callback());
      return;
    }

    globalThis.setTimeout(callback, 1);
  }, []);

  useEffect(() => {
    runWhenIdle(() => setIsIdle(true));
  }, [runWhenIdle]);

  return {
    isIdle,
    shouldReduceCpuWork,
    connection,
    runWhenIdle,
  };
}
