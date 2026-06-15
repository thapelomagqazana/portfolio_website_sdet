"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  clampMetricValue,
  releaseIntelligenceMetrics,
  releaseIntelligenceSummary,
  releaseIntelligencePrimaryKpi,
} from "@/data/release-intelligence";

export type AnimatedMetricValueProps = {
  readonly value: number;
  readonly suffix: string;
  readonly precision?: number;
};

/**
 * AnimatedMetricValue counts from 0 to the target metric value.
 *
 * Reduced-motion users receive the final value immediately.
 */
export function AnimatedMetricValue({ value, suffix, precision = 0 }: AnimatedMetricValueProps) {
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

      setDisplayValue(Number((targetValue * easedProgress).toFixed(precision)));

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
  }, [prefersReducedMotion, precision, targetValue]);

  const finalValue = prefersReducedMotion ? targetValue : displayValue;

  return (
    <span>
      {finalValue.toFixed(precision)}
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
      <div className="border-accent-green/30 bg-accent-green/10 rounded-3xl border p-6 text-center shadow-[0_0_50px_rgba(0,245,160,0.14)]">
        <p className="text-text-muted font-mono text-xs tracking-[0.24em] uppercase">
          {releaseIntelligencePrimaryKpi.verdict}
        </p>

        <p className="font-display text-accent-green mt-4 text-6xl font-black tracking-tight sm:text-7xl">
          <AnimatedMetricValue
            value={releaseIntelligencePrimaryKpi.value}
            suffix={releaseIntelligencePrimaryKpi.suffix}
            precision={1}
          />
        </p>

        <h2
          id="release-intelligence-heading"
          className="text-text-primary mt-3 font-mono text-sm tracking-[0.2em] uppercase"
        >
          {releaseIntelligencePrimaryKpi.label}
        </h2>

        <p className="text-text-secondary mx-auto mt-3 max-w-sm text-sm">
          {releaseIntelligencePrimaryKpi.detail}
        </p>
      </div>

      <div className="border-accent-green/30 bg-accent-green/10 mt-5 rounded-2xl border p-5">
        <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
          {releaseIntelligenceSummary.eyebrow}
        </p>

        <div className="text-text-secondary mt-4 grid gap-2 font-mono text-xs">
          <p>
            {releaseIntelligenceSummary.postureLabel}:{" "}
            <span className="text-accent-green">{releaseIntelligenceSummary.postureValue}</span>
          </p>
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

              <p className="font-display text-text-primary mt-3 text-2xl font-bold">
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
