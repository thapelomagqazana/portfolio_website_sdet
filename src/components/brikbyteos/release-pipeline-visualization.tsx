"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  getPipelineStatusLabel,
  getPipelineToneStyle,
  releaseDecision,
  releasePipelineStages,
  releaseQualityGate,
} from "@/data/release-pipeline";
import type { PipelineStage } from "@/data/release-pipeline";

export type ReleasePipelineVisualizationProps = {
  readonly stages?: readonly PipelineStage[];
};

export function ReleasePipelineVisualization({
  stages = releasePipelineStages,
}: ReleasePipelineVisualizationProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  if (stages.length === 0) {
    return (
      <div className="text-text-secondary rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        No release pipeline stages configured.
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6"
      data-testid="release-pipeline-visualization"
    >
      <div className="hidden md:block">
        <div
          className="bg-background-deep/80 relative overflow-hidden rounded-3xl border border-white/10 p-8"
          data-testid="release-pipeline-canvas"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,194,0.12),transparent_45%)]" />

          <div
            aria-hidden="true"
            className="via-accent-blue/50 absolute top-[7.4rem] right-14 left-14 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              className="bg-accent-green absolute top-[7.15rem] h-2 w-2 rounded-full shadow-[0_0_26px_rgba(52,211,153,0.9)]"
              initial={{ left: "6%", opacity: 0 }}
              animate={{ left: ["6%", "94%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          <ol className="relative z-10 grid grid-cols-7 gap-4">
            {stages.map((stage, index) => {
              const style = getPipelineToneStyle(stage.tone);

              return (
                <motion.li
                  key={stage.id}
                  className="relative"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                >
                  <article
                    aria-label={`${stage.label} pipeline stage`}
                    className={[
                      "group bg-background-deep/70 relative rounded-2xl border p-4 text-center backdrop-blur-xl",
                      "min-h-[170px] transition duration-300 hover:-translate-y-1",
                      style.card,
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border text-lg",
                        style.badge,
                      ].join(" ")}
                    >
                      {stage.icon}
                    </div>

                    <p className="text-text-muted mt-4 font-mono text-[8px] tracking-[0.2em] uppercase">
                      {String(index + 1).padStart(2, "0")} / BBOS
                    </p>

                    <h3 className="font-display text-text-primary mt-2 text-sm font-black">
                      {stage.shortLabel}
                    </h3>

                    <p className="text-text-secondary mx-auto mt-2 max-w-[7rem] text-[11px] leading-5">
                      {stage.description}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {stage.tools.slice(0, 2).map((tool) => (
                        <span
                          key={tool}
                          className={[
                            "rounded-full border px-2 py-1 font-mono text-[8px]",
                            style.badge,
                          ].join(" ")}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <span className="border-accent-green/30 bg-accent-green/10 text-accent-green mt-4 inline-flex rounded-full border px-2 py-1 font-mono text-[8px]">
                      {getPipelineStatusLabel(stage.status)}
                    </span>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      <ol className="grid gap-3 md:hidden" data-testid="release-pipeline-mobile">
        {stages.map((stage) => {
          const style = getPipelineToneStyle(stage.tone);

          return (
            <li key={stage.id} className={["rounded-2xl border p-4", style.card].join(" ")}>
              <p className={["font-mono text-xs uppercase", style.text].join(" ")}>{stage.label}</p>

              <p className="text-text-secondary mt-2 text-sm">{stage.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {stage.tools.map((tool) => (
                  <span
                    key={tool}
                    className={[
                      "rounded-full border px-2 py-1 font-mono text-[10px]",
                      style.badge,
                    ].join(" ")}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p className="text-accent-green mt-3 font-mono text-xs">
                {getPipelineStatusLabel(stage.status)}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <article
          className="border-accent-green/20 bg-accent-green/10 rounded-2xl border p-5"
          data-testid="quality-gate-summary"
        >
          <p className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase">
            {releaseQualityGate.product} {releaseQualityGate.label}
          </p>

          <p className="font-display text-text-primary mt-3 text-4xl font-black">
            {releaseQualityGate.verdict}
          </p>

          <p className="text-accent-green mt-2 font-mono text-2xl">
            {releaseQualityGate.confidence}
          </p>

          <p className="text-text-secondary mt-2 text-sm">{releaseQualityGate.detail}</p>
        </article>

        <div aria-hidden="true" className="text-accent-blue/70 hidden font-mono text-3xl lg:block">
          →
        </div>

        <article
          className="rounded-2xl border border-green-400/20 bg-green-400/10 p-5"
          data-testid="release-decision-summary"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-green-200 uppercase">
            {releaseDecision.label}
          </p>

          <p className="font-display text-text-primary mt-3 text-4xl font-black">
            {releaseDecision.verdict}
          </p>

          <p className="text-accent-blue mt-2 font-mono text-lg">{releaseDecision.summary}</p>

          <p className="text-text-secondary mt-2 text-sm">{releaseDecision.detail}</p>
        </article>
      </div>
    </div>
  );
}
