"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { finalVerdictCopy, finalVerdictStages } from "@/data/final-verdict";
import type { FinalVerdict as FinalVerdictType } from "@/data/final-verdict";
import {
  finalVerdictStagesAreValid,
  getStageProgressPercent,
  verdictStageIsRenderable,
} from "@/lib/final-verdict";

/**
 * Final portfolio verdict.
 *
 * This is the closing animation of the portfolio. It completes the full
 * engineering story: mission → evidence → quality → confidence → approved.
 */
export function FinalVerdict({
  stages = finalVerdictStages,
}: {
  readonly stages?: readonly FinalVerdictType[];
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const validStages = finalVerdictStagesAreValid(stages)
    ? stages.filter(verdictStageIsRenderable)
    : finalVerdictStages;

  return (
    <section
      aria-labelledby="final-verdict-heading"
      className="border-accent-green/25 bg-accent-green/[0.055] mt-10 rounded-[2rem] border p-6 shadow-[0_0_90px_rgba(52,211,153,0.12)] backdrop-blur-xl"
      data-testid="final-verdict"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
            {finalVerdictCopy.eyebrow}
          </p>

          <h2
            id="final-verdict-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {finalVerdictCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-base leading-8">
            {finalVerdictCopy.narrative}
          </p>
        </div>

        <VerdictTimeline stages={validStages} reducedMotion={prefersReducedMotion} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <FinalQualityGate reducedMotion={prefersReducedMotion} />
          <FinalReleaseVerdict />
        </div>

        <EngineeringSignature />

        <FinalCta />
      </div>
    </section>
  );
}

function VerdictTimeline({
  stages,
  reducedMotion,
}: {
  readonly stages: readonly FinalVerdictType[];
  readonly reducedMotion: boolean;
}) {
  return (
    <ol
      className="mt-10 grid gap-4 md:grid-cols-5"
      aria-label="Final engineering verdict timeline"
      data-testid="final-verdict-timeline"
    >
      {stages.map((stage, index) => (
        <motion.li
          key={stage.stage}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: index * 0.08, duration: 0.28 }}
          className="bg-background-deep/60 relative rounded-3xl border border-white/10 p-4"
          data-testid={`verdict-stage-${stage.stage}`}
        >
          <p className="text-text-muted font-mono text-[10px] tracking-[0.22em] uppercase">
            {String(getStageProgressPercent(index, stages.length)).padStart(3, "0")}%
          </p>

          <h3 className="font-display text-text-primary mt-3 text-lg font-black">{stage.label}</h3>

          <p className="text-text-secondary mt-3 text-xs leading-6">{stage.description}</p>

          {index < stages.length - 1 ? (
            <span
              aria-hidden="true"
              className="text-accent-green absolute -bottom-5 left-6 font-mono md:top-1/2 md:-right-5 md:bottom-auto md:left-auto"
            >
              →
            </span>
          ) : null}
        </motion.li>
      ))}
    </ol>
  );
}

function FinalQualityGate({ reducedMotion }: { readonly reducedMotion: boolean }) {
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35 }}
      className="border-accent-green/40 bg-background-deep/85 relative overflow-hidden rounded-[2rem] border p-6 text-center shadow-[0_0_80px_rgba(52,211,153,0.18)]"
      data-testid="final-quality-gate"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.15),transparent_58%)]" />

      <div className="relative">
        <p className="text-accent-green font-mono text-xs tracking-[0.32em] uppercase">
          {finalVerdictCopy.gateProduct}
        </p>

        <p className="text-text-muted mt-3 font-mono text-xs tracking-[0.24em] uppercase">
          {finalVerdictCopy.gateLabel}
        </p>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.3 }}
          className="font-display text-accent-green mt-6 text-5xl font-black tracking-tight sm:text-6xl"
        >
          {finalVerdictCopy.verdict}
        </motion.p>

        <div className="border-accent-green/25 bg-accent-green/10 mx-auto mt-6 max-w-sm rounded-3xl border p-5">
          <p className="font-display text-text-primary text-4xl font-black">
            {finalVerdictCopy.confidence}
          </p>
          <p className="text-text-muted mt-1 font-mono text-xs tracking-[0.2em] uppercase">
            {finalVerdictCopy.confidenceLabel}
          </p>
          <p className="text-accent-green mt-3 text-sm">{finalVerdictCopy.detail}</p>
        </div>
      </div>
    </motion.article>
  );
}

function FinalReleaseVerdict() {
  return (
    <article
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
      data-testid="final-release-verdict"
    >
      <p className="text-accent-blue font-mono text-xs tracking-[0.24em] uppercase">
        Release Verdict
      </p>

      <h3 className="font-display text-text-primary mt-4 text-4xl font-black">
        {finalVerdictCopy.releaseVerdict}
      </h3>

      <ul className="mt-6 grid gap-3">
        {finalVerdictCopy.releaseChecks.map((check) => (
          <li
            key={check}
            className="bg-background-deep/60 text-text-secondary rounded-2xl border border-white/10 p-3 text-sm"
          >
            <span className="text-accent-green" aria-hidden="true">
              ✓
            </span>{" "}
            {check}
          </li>
        ))}
      </ul>
    </article>
  );
}

function EngineeringSignature() {
  return (
    <div
      className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-center"
      data-testid="engineering-signature"
    >
      <p className="text-text-muted font-mono text-xs tracking-[0.24em] uppercase">
        {finalVerdictCopy.signatureLead}
      </p>

      <p className="font-display text-text-primary mt-3 text-2xl font-black">
        by {finalVerdictCopy.signatureName}
      </p>
    </div>
  );
}

function FinalCta() {
  return (
    <div
      className="bg-background-deep/70 mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 p-5 sm:flex-row sm:items-center"
      data-testid="final-verdict-cta"
    >
      <h3 className="font-display text-text-primary text-2xl font-black">
        {finalVerdictCopy.ctaHeading}
      </h3>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          href={finalVerdictCopy.primaryCta.href}
          className="border-accent-green/40 bg-accent-green/10 text-accent-green hover:border-accent-blue/40 hover:text-accent-blue focus-visible:ring-accent-blue/70 rounded-full border px-5 py-3 text-center font-mono text-sm font-semibold transition focus:outline-none focus-visible:ring-2"
        >
          {finalVerdictCopy.primaryCta.label}
        </Link>

        <Link
          href={finalVerdictCopy.secondaryCta.href}
          className="text-text-primary hover:border-accent-blue/40 focus-visible:ring-accent-blue/70 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-center font-mono text-sm font-semibold transition focus:outline-none focus-visible:ring-2"
        >
          {finalVerdictCopy.secondaryCta.label}
        </Link>
      </div>
    </div>
  );
}
