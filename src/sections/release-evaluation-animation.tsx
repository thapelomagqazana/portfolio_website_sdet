"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { useReleaseEvaluation } from "@/release-evaluation";

export type ReleaseEvaluationAnimationProps = {
  readonly onComplete?: () => void;
};

/**
 * Renders the release evaluation animation sequence.
 */
export function ReleaseEvaluationAnimation({ onComplete }: ReleaseEvaluationAnimationProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const evaluation = useReleaseEvaluation({
    reducedMotion: prefersReducedMotion,
    onComplete,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        evaluation.skip();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [evaluation]);

  if (evaluation.isComplete) {
    return null;
  }

  return (
    <section
      aria-label="Release evaluation animation"
      className="z-modal bg-background-deep text-text-primary fixed inset-0 flex min-h-screen items-center justify-center px-6"
    >
      <div className="glass-panel shadow-glow-blue w-full max-w-4xl rounded-2xl p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-mono-sm text-accent-green font-mono">● RELEASE CANDIDATE DETECTED</p>
            <h2 className="text-heading-2 mt-2 font-bold">Evaluating Production Readiness</h2>
          </div>

          <button
            type="button"
            onClick={evaluation.skip}
            className="text-mono-sm text-text-secondary hover:text-text-primary rounded-md border border-white/10 px-3 py-2 font-mono transition"
          >
            SKIP
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {evaluation.phases.map((phase) => (
            <article
              key={phase.id}
              className={[
                "rounded-xl border p-4 transition",
                phase.status === "complete"
                  ? "border-accent-green/40 bg-accent-green/10"
                  : phase.status === "active"
                    ? "border-accent-blue/50 bg-accent-blue/10"
                    : "border-white/10 bg-white/[0.03]",
              ].join(" ")}
            >
              <p className="text-mono-sm text-text-muted font-mono">{phase.label}</p>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className={
                    phase.status === "complete" ? "bg-accent-green h-full" : "bg-accent-blue h-full"
                  }
                  style={{ width: `${phase.progress * 100}%` }}
                />
              </div>

              <p
                className={[
                  "text-body-sm mt-4",
                  phase.status === "complete"
                    ? "text-accent-green"
                    : phase.status === "active"
                      ? "text-accent-blue"
                      : "text-text-muted",
                ].join(" ")}
              >
                {phase.status === "pending" ? "Waiting for signal..." : phase.statusCopy}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-mono-sm text-text-secondary font-mono">QUALITY GATE PROGRESS</p>
            <p className="text-mono-sm text-accent-blue font-mono">
              {Math.round(evaluation.progress * 100)}%
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="bg-accent-blue duration-fast ease-premium h-full transition-[width]"
              style={{ width: `${evaluation.progress * 100}%` }}
            />
          </div>

          {evaluation.activePhaseId === "quality-gate" ? (
            <p className="text-accent-green mt-5 font-mono">VERDICT: APPROVING RELEASE...</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
