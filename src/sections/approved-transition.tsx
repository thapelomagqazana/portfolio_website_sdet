"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { useApprovedTransition } from "@/approved-transition";

export type ApprovedTransitionProps = {
  readonly onComplete?: () => void;
};

/**
 * Renders the final approved verdict before the hero appears.
 */
export function ApprovedTransition({ onComplete }: ApprovedTransitionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const transition = useApprovedTransition({
    reducedMotion: prefersReducedMotion,
    onComplete,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        transition.skip();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [transition]);

  if (transition.isComplete) return null;

  const stageText = {
    preparing: "QUALITY GATE FINALIZING...",
    approved: "APPROVED",
    confidence: "Release Confidence: 97.3%",
    handoff: "Entering Command Center...",
    complete: "",
  }[transition.stage];

  return (
    <section
      aria-label="Approved release transition"
      className="z-modal bg-background-deep text-text-primary fixed inset-0 flex min-h-screen items-center justify-center px-6"
    >
      <div className="glass-panel max-w-reading shadow-glow-green w-full rounded-2xl p-8 text-center">
        <p className="text-mono-sm text-accent-green font-mono">● QUALITY GATE RESULT</p>

        <h2
          className={[
            "font-display mt-5 font-extrabold tracking-tight",
            transition.stage === "approved"
              ? "text-display-lg text-accent-green"
              : "text-heading-2 text-text-primary",
          ].join(" ")}
        >
          {stageText}
        </h2>

        <div className="mx-auto mt-8 h-1 max-w-md overflow-hidden rounded-full bg-white/10">
          <div
            className="bg-accent-green duration-fast ease-premium h-full transition-[width]"
            style={{ width: `${transition.progress * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={transition.skip}
          className="text-mono-sm text-text-secondary hover:text-text-primary mt-8 rounded-md border border-white/10 px-3 py-2 font-mono transition"
        >
          SKIP
        </button>
      </div>
    </section>
  );
}
