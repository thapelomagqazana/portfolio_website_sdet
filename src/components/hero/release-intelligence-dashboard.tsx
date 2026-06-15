"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  clampMetricValue,
  releaseIntelligenceMetrics,
  releaseIntelligenceSummary,
} from "@/data/release-intelligence";

export type AnimatedMetricValueProps = {
  readonly value: number;
  readonly suffix: string;
};

/**
 * AnimatedMetricValue counts from 0 to the target metric value.
 *
 * Reduced-motion users receive the final value immediately.
 */
export function AnimatedMetricValue({ value, suffix }: AnimatedMetricValueProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const targetValue = clampMetricValue(value);

  const [displayValue, setDisplayValue] = useState(() => (prefersReducedMotion ? targetValue : 0));

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const durationMs = 900;
    const startTime = performance.now();
    let frameId: number | null = null;

    const tick = (timestamp: number) => {
      const elapsedMs = timestamp - startTime;
      const progress = Math.min(elapsedMs / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(targetValue * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [prefersReducedMotion, targetValue]);

  return (
    <span>
      {prefersReducedMotion ? targetValue : displayValue}
      {suffix}
    </span>
  );
}

/**
 * ReleaseIntelligenceDashboard renders animated release-readiness metrics.
 *
 * It communicates that release decisions should be based on measurable evidence:
 * confidence, security, automation, and readiness.
 */
export function ReleaseIntelligenceDashboard() {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="release-intelligence-heading"
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(0,212,255,0.12)] backdrop-blur-xl sm:p-6"
      data-testid="release-intelligence-dashboard"
    >
      <div className="border-accent-green/30 bg-accent-green/10 rounded-2xl border p-5">
        <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
          {releaseIntelligenceSummary.eyebrow}
        </p>

        <h2
          id="release-intelligence-heading"
          className="font-display text-text-primary mt-3 text-3xl font-black"
        >
          {releaseIntelligenceSummary.postureLabel}:{" "}
          <span className="text-accent-green">{releaseIntelligenceSummary.postureValue}</span>
        </h2>

        <div className="text-text-secondary mt-4 grid gap-2 font-mono text-xs">
          <p>
            {releaseIntelligenceSummary.evidenceLabel}:{" "}
            <span className="text-accent-green">{releaseIntelligenceSummary.evidenceValue}</span>
          </p>
          <p>
            {releaseIntelligenceSummary.verdictLabel}:{" "}
            <span className="text-accent-green">{releaseIntelligenceSummary.verdictValue}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {releaseIntelligenceMetrics.map((metric, index) => {
          const clampedValue = clampMetricValue(metric.value);

          return (
            <motion.article
              key={metric.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
              className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-text-muted font-mono text-[11px] uppercase">{metric.label}</p>
                <span className="border-accent-green/30 text-accent-green rounded-full border px-2 py-1 font-mono text-[10px]">
                  LIVE
                </span>
              </div>

              <p className="font-display text-text-primary mt-3 text-3xl font-bold">
                <AnimatedMetricValue value={metric.value} suffix={metric.suffix} />
              </p>

              <p className="text-text-secondary mt-2 text-xs">{metric.detail}</p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  aria-label={`${metric.label}: ${clampedValue}${metric.suffix}`}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={clampedValue}
                  className="bg-accent-blue h-full rounded-full"
                  initial={prefersReducedMotion ? false : { width: "0%" }}
                  animate={{ width: `${clampedValue}%` }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="bg-background-deep/50 mt-5 rounded-2xl border border-white/10 p-4">
        <p className="text-text-muted font-mono text-xs uppercase">System Interpretation</p>
        <p className="text-text-secondary mt-3 text-sm leading-6">
          Quality signals indicate a strong release posture: automated checks are healthy, critical
          security blockers are absent, and evidence is ready for decision-making.
        </p>
      </div>
    </section>
  );
}
