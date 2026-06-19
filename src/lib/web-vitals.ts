/**
 * Web Vitals utilities.
 *
 * This module keeps reporting decoupled from analytics providers so future
 * integrations with Plausible, Vercel Analytics, or BrikByteOS telemetry do
 * not require changing application code.
 */

export type WebVitalName = "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";

export type WebVitalMetric = {
  readonly id: string;
  readonly name: WebVitalName;
  readonly value: number;
  readonly rating?: "good" | "needs-improvement" | "poor";
};

export type WebVitalReporter = (metric: WebVitalMetric) => void;

export function reportWebVital(metric: WebVitalMetric, reporter?: WebVitalReporter): void {
  if (!metric.id || !metric.name || !Number.isFinite(metric.value)) return;

  if (reporter) {
    reporter(metric);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[web-vital]", metric);
  }
}

export function getLighthouseRating(metric: WebVitalName, value: number): WebVitalMetric["rating"] {
  if (metric === "LCP") {
    if (value <= 2500) return "good";
    if (value <= 4000) return "needs-improvement";
    return "poor";
  }

  if (metric === "INP") {
    if (value <= 200) return "good";
    if (value <= 500) return "needs-improvement";
    return "poor";
  }

  if (metric === "CLS") {
    if (value <= 0.1) return "good";
    if (value <= 0.25) return "needs-improvement";
    return "poor";
  }

  return "good";
}

/**
 * Lightweight development-only PerformanceObserver registration.
 */
export function observePerformanceEntries(): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "development") return;
  if (!("PerformanceObserver" in window)) return;

  const observer = new PerformanceObserver((entries) => {
    for (const entry of entries.getEntries()) {
      console.debug("[performance-entry]", entry.name, entry.entryType, entry.startTime);
    }
  });

  observer.observe({ entryTypes: ["navigation", "paint", "largest-contentful-paint"] });
}
