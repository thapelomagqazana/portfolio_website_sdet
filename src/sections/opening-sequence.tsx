"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { OpeningSequenceStage } from "@/approved-transition";
import { ApprovedTransition } from "./approved-transition";
import { OpeningIntro } from "./opening-intro";
import { ReleaseEvaluationAnimation } from "./release-evaluation-animation";

export type OpeningSequenceProps = {
  readonly children: ReactNode;
};

/**
 * Orchestrates the full opening flow:
 * intro → release evaluation → approved transition → hero.
 */
export function OpeningSequence({ children }: OpeningSequenceProps) {
  const [stage, setStage] = useState<OpeningSequenceStage>("intro");

  return (
    <>
      {stage === "intro" ? (
        <OpeningIntro onComplete={() => setStage("release-evaluation")} />
      ) : null}

      {stage === "release-evaluation" ? (
        <ReleaseEvaluationAnimation onComplete={() => setStage("approved-transition")} />
      ) : null}

      {stage === "approved-transition" ? (
        <ApprovedTransition onComplete={() => setStage("hero")} />
      ) : null}

      {stage === "hero" ? children : null}
    </>
  );
}
