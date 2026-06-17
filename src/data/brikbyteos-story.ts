/**
 * Centralized BrikByteOS story copy.
 *
 * This module keeps all Problem vs Solution messaging outside React components.
 * Benefits:
 * - components stay presentational
 * - copy can be tested directly
 * - future CMS/API migration becomes easier
 * - no duplicate hardcoded messaging across the UI
 */

export type ProblemSolutionComparison = {
  readonly problem: string;
  readonly solution: string;
};

export type StorySignal = {
  readonly label: string;
  readonly description: string;
};

export const brikByteOsStory = {
  eyebrow: "Problem vs Solution",
  heading: "From scattered evidence to release confidence.",
  problemTitle: "Before BrikByteOS",
  problemSubtitle: "Scattered quality evidence",
  problemSummary:
    "Teams already generate quality evidence, but it is often scattered across test reports, CI logs, dashboards, security scans, and performance tools.",
  solutionTitle: "With BrikByteOS",
  solutionSubtitle: "Measurable release confidence",
  solutionSummary:
    "BrikByteOS collects quality signals, normalizes them into evidence, evaluates release gates, and helps teams make safer release decisions.",
  valueProposition:
    "BrikByteOS turns release readiness from a feeling into an evidence-backed decision.",
} as const;

export const problemSignals: readonly StorySignal[] = [
  {
    label: "Scattered signals",
    description: "Evidence lives across reports, logs, tools, and dashboards.",
  },
  {
    label: "Manual confidence",
    description: "Release readiness depends on meetings, memory, and assumptions.",
  },
  {
    label: "Fragmented reporting",
    description: "Teams struggle to compare quality results across runs.",
  },
  {
    label: "Release uncertainty",
    description: "The final ship decision is harder to explain and defend.",
  },
] as const;

export const solutionSignals: readonly StorySignal[] = [
  {
    label: "Normalized evidence",
    description: "Signals are converted into a consistent release evidence model.",
  },
  {
    label: "Quality gates",
    description: "Policy checks evaluate release readiness consistently.",
  },
  {
    label: "Release confidence score",
    description: "Confidence becomes visible, measurable, and reviewable.",
  },
  {
    label: "Reviewable reports",
    description: "Each run produces structured artifacts for engineering review.",
  },
] as const;

export const problemSolutionComparisons: readonly ProblemSolutionComparison[] = [
  {
    problem: "Test results live in separate tools.",
    solution: "Evidence is normalized into one release view.",
  },
  {
    problem: "Security, performance, and test signals are reviewed manually.",
    solution: "Quality gates evaluate signals consistently.",
  },
  {
    problem: "Release confidence depends on meetings and assumptions.",
    solution: "Release confidence is calculated from measurable evidence.",
  },
  {
    problem: "Reports are difficult to compare across runs.",
    solution: "Each run produces structured, reviewable artifacts.",
  },
] as const;
