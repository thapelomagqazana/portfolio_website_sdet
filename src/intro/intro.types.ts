/**
 * Status of one intro loading step.
 */
export type IntroStepStatus = "pending" | "active" | "complete";

/**
 * Timeline definition for a single intro line.
 */
export type IntroStep = {
  readonly id: string;
  readonly label: string;
  readonly startsAtMs: number;
  readonly endsAtMs: number;
};

/**
 * Render-ready intro step state.
 */
export type IntroStepViewModel = IntroStep & {
  readonly status: IntroStepStatus;
  readonly visibleText: string;
};

/**
 * Complete render-ready intro state.
 */
export type IntroState = {
  readonly elapsedMs: number;
  readonly progress: number;
  readonly isComplete: boolean;
  readonly steps: readonly IntroStepViewModel[];
};
