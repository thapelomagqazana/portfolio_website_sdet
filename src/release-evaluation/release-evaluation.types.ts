/**
 * Status of a release evaluation phase.
 */
export type ReleaseEvaluationPhaseStatus = "pending" | "active" | "complete";

/**
 * Supported release evaluation phase identifiers.
 */
export type ReleaseEvaluationPhaseKind =
  | "test"
  | "security"
  | "performance"
  | "evidence"
  | "quality-gate";

/**
 * Static release evaluation phase timeline definition.
 */
export type ReleaseEvaluationPhase = {
  readonly id: ReleaseEvaluationPhaseKind;
  readonly label: string;
  readonly statusCopy: string;
  readonly startsAtMs: number;
  readonly endsAtMs: number;
};

/**
 * Render-ready release evaluation phase model.
 */
export type ReleaseEvaluationPhaseViewModel = ReleaseEvaluationPhase & {
  readonly status: ReleaseEvaluationPhaseStatus;
  readonly progress: number;
};

/**
 * Complete render-ready release evaluation state.
 */
export type ReleaseEvaluationState = {
  readonly elapsedMs: number;
  readonly progress: number;
  readonly isComplete: boolean;
  readonly activePhaseId: ReleaseEvaluationPhaseKind | null;
  readonly phases: readonly ReleaseEvaluationPhaseViewModel[];
};
