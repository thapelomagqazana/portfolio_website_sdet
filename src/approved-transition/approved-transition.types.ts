/**
 * Stage of the final approved transition.
 */
export type ApprovedTransitionStage =
  | "preparing"
  | "approved"
  | "confidence"
  | "handoff"
  | "complete";

/**
 * Render-ready approved transition state.
 */
export type ApprovedTransitionState = {
  readonly elapsedMs: number;
  readonly progress: number;
  readonly stage: ApprovedTransitionStage;
  readonly isComplete: boolean;
};

/**
 * Opening animation orchestration stage.
 */
export type OpeningSequenceStage = "intro" | "release-evaluation" | "approved-transition" | "hero";
