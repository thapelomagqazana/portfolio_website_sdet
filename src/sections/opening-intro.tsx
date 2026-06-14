"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { useOpeningIntro } from "@/intro";

export type OpeningIntroProps = {
  readonly onComplete?: () => void;
};

/**
 * Terminal-style opening intro.
 */
export function OpeningIntro({ onComplete }: OpeningIntroProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const intro = useOpeningIntro({
    reducedMotion: prefersReducedMotion,
    onComplete,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        intro.skip();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [intro]);

  if (intro.isComplete) {
    return null;
  }

  return (
    <section
      aria-label="Opening portfolio initialization sequence"
      className="z-modal bg-background-deep text-text-primary fixed inset-0 flex min-h-screen items-center justify-center px-6"
    >
      <div className="glass-panel max-w-reading shadow-glow-blue w-full rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-mono-sm text-accent-green font-mono">● BBOS INTRO SEQUENCE</p>

          <button
            type="button"
            onClick={intro.skip}
            className="text-mono-sm text-text-secondary hover:text-text-primary rounded-md border border-white/10 px-3 py-2 font-mono transition"
          >
            SKIP
          </button>
        </div>

        <div className="text-body-sm space-y-3 font-mono">
          {intro.steps.map((step) => (
            <p
              key={step.id}
              className={
                step.status === "complete"
                  ? "text-accent-green"
                  : step.status === "active"
                    ? "text-accent-blue"
                    : "text-text-muted"
              }
            >
              {step.visibleText}
              {step.status === "active" ? <span aria-hidden="true">▌</span> : null}
            </p>
          ))}
        </div>

        <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="bg-accent-blue duration-fast ease-premium h-full transition-[width]"
            style={{ width: `${intro.progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
