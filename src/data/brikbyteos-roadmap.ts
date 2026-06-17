/**
 * BrikByteOS roadmap data model.
 *
 * This file centralizes all roadmap copy and phase metadata so the UI remains
 * data-driven, testable, and easy to evolve as BrikByteOS grows.
 */

export type RoadmapPhaseStatus = "completed" | "current" | "planned";

export type RoadmapMilestone = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
};

export type RoadmapPhase = {
  readonly id: string;
  readonly title: string;
  readonly version: string;
  readonly status: RoadmapPhaseStatus;
  readonly completion: number;
  readonly summary: string;
  readonly milestones: readonly RoadmapMilestone[];
};

export const roadmapStatusLabels: Record<RoadmapPhaseStatus, string> = {
  completed: "Completed",
  current: "Current Focus",
  planned: "Planned",
} as const;

export const roadmapCopy = {
  eyebrow: "Engineering Roadmap",
  heading: "BrikByteOS is being engineered in deliberate release-confidence phases.",
  description:
    "The roadmap shows how BrikByteOS evolves from a CLI MVP into a comprehensive Release Confidence Platform.",
  narrativeTitle: "Built deliberately, not randomly.",
  narrative:
    "Each phase strengthens release confidence through better evidence collection, smarter evaluation, richer engineering intelligence, and more reviewable release decisions.",
} as const;

export const brikByteRoadmap: readonly RoadmapPhase[] = [
  {
    id: "phase-1",
    title: "Release Confidence MVP",
    version: "v0.1",
    status: "completed",
    completion: 100,
    summary: "Initial CLI, adapters, evidence normalization, quality gates, and release reports.",
    milestones: [
      {
        id: "cli-foundation",
        label: "CLI Foundation",
        description: "bb init, bb run, bb doctor, bb gate evaluate, and bb report generate.",
      },
      {
        id: "adapter-foundation",
        label: "Adapter Foundation",
        description: "Vitest, Jest, Playwright, Newman, k6, and Trivy execution support.",
      },
      {
        id: "quality-gate",
        label: "Quality Gate",
        description: "Evidence-based release evaluation using configurable thresholds.",
      },
      {
        id: "reports",
        label: "Release Reports",
        description: "Structured report.json and human-readable release summaries.",
      },
    ],
  },
  {
    id: "phase-2",
    title: "Developer Intelligence",
    version: "v0.2",
    status: "current",
    completion: 70,
    summary:
      "Improved dashboards, HTML reports, release insights, diagnostics, and engineering visibility.",
    milestones: [
      {
        id: "html-dashboard",
        label: "Interactive HTML Reports",
        description: "Cleaner visual reports for reviewing release confidence quickly.",
      },
      {
        id: "release-insights",
        label: "Release Insights",
        description: "Evidence interpretation, failure summaries, and recommended next actions.",
      },
      {
        id: "architecture-story",
        label: "Architecture Story",
        description:
          "Clear product storytelling through pipeline, architecture, and roadmap views.",
      },
      {
        id: "diagnostics",
        label: "Better Diagnostics",
        description:
          "More actionable doctor checks, adapter feedback, and configuration validation.",
      },
    ],
  },
  {
    id: "phase-3",
    title: "Platform Expansion",
    version: "v1.0",
    status: "planned",
    completion: 0,
    summary:
      "Plugin SDK, enterprise integrations, APIs, distributed execution, and hosted platform foundations.",
    milestones: [
      {
        id: "plugin-sdk",
        label: "Plugin SDK",
        description: "Third-party adapter ecosystem for custom tools and internal platforms.",
      },
      {
        id: "enterprise-integrations",
        label: "Enterprise Integrations",
        description: "GitHub, GitLab, CI/CD, artifact storage, and security workflow integrations.",
      },
      {
        id: "cloud-platform",
        label: "Cloud Platform",
        description: "Hosted Release Confidence Platform for teams and organizations.",
      },
      {
        id: "distributed-execution",
        label: "Distributed Execution",
        description: "Scale test, scan, and evidence workflows across larger engineering systems.",
      },
    ],
  },
] as const;

/**
 * Clamps completion values to the valid progressbar range.
 */
export function clampRoadmapCompletion(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 100);
}

/**
 * Returns a safe user-facing label for a phase status.
 */
export function getRoadmapStatusLabel(status: RoadmapPhaseStatus | string): string {
  if (status === "completed") return roadmapStatusLabels.completed;
  if (status === "current") return roadmapStatusLabels.current;
  if (status === "planned") return roadmapStatusLabels.planned;
  return "Unknown";
}

/**
 * Returns the current roadmap phase, falling back safely.
 */
export function getCurrentRoadmapPhase(
  phases: readonly RoadmapPhase[] = brikByteRoadmap
): RoadmapPhase | undefined {
  return phases.find((phase) => phase.status === "current") ?? phases[0];
}

/**
 * Resolves a phase by id without throwing.
 */
export function getRoadmapPhaseById(
  phaseId: string,
  phases: readonly RoadmapPhase[] = brikByteRoadmap
): RoadmapPhase | undefined {
  return phases.find((phase) => phase.id === phaseId);
}
