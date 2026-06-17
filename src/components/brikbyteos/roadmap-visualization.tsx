"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  brikByteRoadmap,
  clampRoadmapCompletion,
  getCurrentRoadmapPhase,
  getRoadmapStatusLabel,
  roadmapCopy,
} from "@/data/brikbyteos-roadmap";
import type { RoadmapPhase } from "@/data/brikbyteos-roadmap";

export type RoadmapVisualizationProps = {
  readonly phases?: readonly RoadmapPhase[];
};

/**
 * Interactive BrikByteOS roadmap visualization.
 *
 * The component communicates:
 * - where BrikByteOS is today
 * - what has already been built
 * - what comes next
 * - the long-term Release Confidence Platform vision
 */
export function RoadmapVisualization({ phases = brikByteRoadmap }: RoadmapVisualizationProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const currentPhase = getCurrentRoadmapPhase(phases);
  const [expandedPhaseIds, setExpandedPhaseIds] = useState<ReadonlySet<string>>(
    () => new Set(currentPhase ? [currentPhase.id] : [])
  );

  function togglePhase(phaseId: string) {
    setExpandedPhaseIds((current) => {
      const next = new Set(current);

      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }

      return next;
    });
  }

  if (phases.length === 0) {
    return (
      <section
        id="roadmap"
        aria-labelledby="brikbyteos-roadmap-heading"
        className="mt-16"
        data-testid="roadmap-visualization"
      >
        <div className="text-text-secondary rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2
            id="brikbyteos-roadmap-heading"
            className="font-display text-text-primary text-2xl font-black"
          >
            {roadmapCopy.heading}
          </h2>
          <p className="mt-3">No roadmap phases configured.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="roadmap"
      aria-labelledby="brikbyteos-roadmap-heading"
      className="mt-16"
      data-testid="roadmap-visualization"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
              {roadmapCopy.eyebrow}
            </p>

            <h2
              id="brikbyteos-roadmap-heading"
              className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            >
              {roadmapCopy.heading}
            </h2>

            <p className="text-text-secondary mt-5 text-base leading-8">
              {roadmapCopy.description}
            </p>
          </div>

          <RoadmapNarrative />
        </div>

        <Timeline phases={phases} />

        <ol className="mt-8 grid gap-5 lg:grid-cols-3" data-testid="roadmap-phase-list">
          {phases.map((phase, index) => {
            const isExpanded = expandedPhaseIds.has(phase.id);
            const isCurrent = phase.status === "current";

            return (
              <motion.li
                key={phase.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
              >
                <PhaseCard
                  phase={phase}
                  isExpanded={isExpanded}
                  isCurrent={isCurrent}
                  prefersReducedMotion={prefersReducedMotion}
                  onToggle={() => togglePhase(phase.id)}
                />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/**
 * Roadmap philosophy panel.
 */
function RoadmapNarrative() {
  return (
    <aside
      className="border-accent-blue/20 bg-accent-blue/10 rounded-3xl border p-5"
      data-testid="roadmap-narrative"
    >
      <p className="text-accent-blue font-mono text-xs tracking-[0.22em] uppercase">
        {roadmapCopy.narrativeTitle}
      </p>
      <p className="text-text-secondary mt-3 text-sm leading-7">{roadmapCopy.narrative}</p>
    </aside>
  );
}

type TimelineProps = {
  readonly phases: readonly RoadmapPhase[];
};

/**
 * Semantic roadmap timeline.
 */
function Timeline({ phases }: TimelineProps) {
  return (
    <ol
      className="mt-8 grid gap-4 md:grid-cols-3"
      aria-label="BrikByteOS roadmap timeline"
      data-testid="roadmap-timeline"
    >
      {phases.map((phase, index) => {
        const isCurrent = phase.status === "current";
        const isCompleted = phase.status === "completed";

        return (
          <li key={phase.id} className="relative">
            <div className="hidden md:block">
              {index < phases.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute top-5 left-1/2 h-px w-full bg-white/10"
                />
              ) : null}
            </div>

            <div className="relative z-10 flex items-center gap-3 md:flex-col md:text-center">
              <span
                aria-hidden="true"
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs",
                  isCurrent
                    ? "border-accent-green/60 bg-accent-green/20 text-accent-green shadow-[0_0_28px_rgba(52,211,153,0.24)]"
                    : isCompleted
                      ? "border-accent-blue/40 bg-accent-blue/10 text-accent-blue"
                      : "text-text-muted border-white/15 bg-white/[0.04]",
                ].join(" ")}
              >
                {isCurrent ? "◉" : isCompleted ? "●" : "○"}
              </span>

              <div>
                <p className="text-text-muted font-mono text-[10px] tracking-[0.22em] uppercase">
                  {phase.version}
                </p>
                <p className="font-display text-text-primary mt-1 text-sm font-black">
                  {phase.title}
                </p>
              </div>
            </div>

            {index < phases.length - 1 ? (
              <div aria-hidden="true" className="mt-3 ml-5 h-6 w-px bg-white/10 md:hidden" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

type PhaseCardProps = {
  readonly phase: RoadmapPhase;
  readonly isExpanded: boolean;
  readonly isCurrent: boolean;
  readonly prefersReducedMotion: boolean;
  readonly onToggle: () => void;
};

/**
 * Interactive roadmap phase card.
 */
function PhaseCard({
  phase,
  isExpanded,
  isCurrent,
  prefersReducedMotion,
  onToggle,
}: PhaseCardProps) {
  const completion = clampRoadmapCompletion(phase.completion);
  const milestonesId = `${phase.id}-milestones`;

  return (
    <article
      className={[
        "h-full rounded-3xl border p-5 backdrop-blur-xl",
        isCurrent
          ? "border-accent-green/40 bg-accent-green/10 shadow-[0_0_54px_rgba(52,211,153,0.16)] lg:scale-[1.02]"
          : "border-white/10 bg-white/[0.04]",
      ].join(" ")}
      data-testid={`roadmap-phase-${phase.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
            {phase.version}
          </p>

          <h3 className="font-display text-text-primary mt-2 text-2xl font-black">{phase.title}</h3>
        </div>

        <span
          className={[
            "rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase",
            isCurrent
              ? "border-accent-green/30 bg-accent-green/10 text-accent-green"
              : phase.status === "completed"
                ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
                : "text-text-muted border-white/10 bg-white/[0.04]",
          ].join(" ")}
        >
          {getRoadmapStatusLabel(phase.status)}
        </span>
      </div>

      <p className="text-text-secondary mt-4 text-sm leading-7">{phase.summary}</p>

      <ProgressBar
        label={`${phase.title} completion`}
        value={completion}
        prefersReducedMotion={prefersReducedMotion}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={milestonesId}
        className="bg-background-deep/50 text-text-primary hover:border-accent-blue/30 focus-visible:ring-accent-blue/70 mt-5 flex w-full items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-left font-mono text-xs tracking-[0.18em] uppercase transition focus:outline-none focus-visible:ring-2"
        data-testid={`roadmap-toggle-${phase.id}`}
      >
        <span>Milestones</span>
        <span
          aria-hidden="true"
          className={["transition-transform", isExpanded ? "rotate-90" : ""].join(" ")}
        >
          ▶
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.ul
            id={milestonesId}
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="mt-4 grid gap-3 overflow-hidden"
            data-testid={`roadmap-milestones-${phase.id}`}
          >
            {phase.milestones.length > 0 ? (
              phase.milestones.map((milestone) => (
                <li
                  key={milestone.id}
                  className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
                >
                  <p className="font-display text-text-primary text-sm font-bold">
                    {milestone.label}
                  </p>
                  <p className="text-text-secondary mt-1 text-xs leading-5">
                    {milestone.description}
                  </p>
                </li>
              ))
            ) : (
              <li className="bg-background-deep/50 text-text-secondary rounded-2xl border border-white/10 p-4 text-sm">
                No milestones configured for this phase.
              </li>
            )}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

type ProgressBarProps = {
  readonly label: string;
  readonly value: number;
  readonly prefersReducedMotion: boolean;
};

/**
 * Accessible animated roadmap progress bar.
 */
function ProgressBar({ label, value, prefersReducedMotion }: ProgressBarProps) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-text-muted font-mono text-[10px] tracking-[0.2em] uppercase">Progress</p>
        <p className="text-accent-green font-mono text-xs">{value}%</p>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-2 overflow-hidden rounded-full bg-white/10"
        data-testid="roadmap-progressbar"
      >
        <motion.div
          className="bg-accent-green h-full rounded-full"
          initial={prefersReducedMotion ? false : { width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
