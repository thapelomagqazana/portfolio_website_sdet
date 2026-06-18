"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight heartbeat hook.
 *
 * Currently local-only, but structured so it can later be replaced by polling,
 * WebSocket status, GitHub Actions status, uptime monitoring, or BrikByteOS
 * release pipeline telemetry.
 */
export function useStatusHeartbeat(intervalMs = 2000): boolean {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => !current);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return active;
}
