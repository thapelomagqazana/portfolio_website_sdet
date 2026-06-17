"use client";

import { useReducedMotion } from "motion/react";
import { confidenceDashboardMetrics, qualityMetricsSectionCopy } from "@/data/quality-metrics";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { clampMetricValue } from "@/lib/metrics-engine";
import type { QualityMetric } from "@/data/quality-metrics";

export type QualityMetricCardProps = {
  readonly metric: QualityMetric;
};

/**
 * QualityMetricCard renders one animated confidence metric.
 *
 * It uses the WBS 6.1 metrics engine so animation logic remains reusable and
 * does not get duplicated inside the section.
 */
export function QualityMetricCard({ metric }: QualityMetricCardProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const clampedValue = clampMetricValue(metric.value, 0, 100);
  const precision = Number.isInteger(metric.value) ? 0 : 1;

  const counter = useAnimatedCounter({
    from: 0,
    to: clampedValue,
    durationMs: 900,
    precision,
    suffix: metric.suffix,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <p className="text-text-muted font-mono text-[11px] tracking-[0.18em] uppercase">
          {metric.label}
        </p>

        <span className="border-accent-green/30 text-accent-green rounded-full border px-2 py-1 font-mono text-[10px] uppercase">
          Signal
        </span>
      </div>

      <p className="font-display text-text-primary mt-5 text-4xl font-black">
        {counter.displayValue}
      </p>

      <p className="text-text-secondary mt-3 text-sm leading-6">{metric.description}</p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          role="progressbar"
          aria-label={`${metric.label}: ${counter.displayValue}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clampedValue}
          className="bg-accent-blue h-full rounded-full transition-[width] duration-700"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </article>
  );
}

/**
 * QualityMetricsSection turns quality signals into a responsive confidence
 * dashboard below the Hero.
 *
 * Purpose:
 * - Show measurable quality thinking.
 * - Reinforce release-risk awareness.
 * - Prepare visitors for deeper BrikByteOS/project evidence.
 */
export function QualityMetricsSection() {
  return (
    <section
      id="quality-metrics"
      aria-labelledby="quality-metrics-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="quality-metrics-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.28em] uppercase">
            {qualityMetricsSectionCopy.eyebrow}
          </p>

          <h2
            id="quality-metrics-heading"
            className="font-display text-text-primary mt-4 text-4xl font-black tracking-tight sm:text-5xl"
          >
            {qualityMetricsSectionCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-lg leading-8">
            {qualityMetricsSectionCopy.description}
          </p>
        </div>

        <div
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          data-testid="quality-metrics-grid"
        >
          {confidenceDashboardMetrics.map((metric) => (
            <QualityMetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <div className="border-accent-green/20 bg-accent-green/10 mt-8 rounded-3xl border p-6">
          <p className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase">
            {qualityMetricsSectionCopy.narrativeTitle}
          </p>

          <p className="text-text-secondary mt-4 max-w-4xl text-sm leading-7 sm:text-base">
            {qualityMetricsSectionCopy.narrative}
          </p>
        </div>
      </div>
    </section>
  );
}
