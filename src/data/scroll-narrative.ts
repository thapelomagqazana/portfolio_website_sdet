/**
 * Scroll narrative data.
 *
 * This file defines the portfolio story order. The Scroll Narrative Engine
 * uses this as the single source of truth for active section tracking,
 * progress calculation, and narrative handoff.
 */

export type NarrativeSection =
  | "opening"
  | "hero"
  | "mission"
  | "quality-metrics"
  | "skills"
  | "brikbyteos"
  | "projects"
  | "experience"
  | "engineering-intelligence"
  | "contact"
  | "footer";

export type ScrollDirection = "up" | "down" | "idle";

export type NarrativeStage = {
  readonly id: NarrativeSection;
  readonly order: number;
  readonly title: string;
  readonly description: string;
};

export const narrativeStages: readonly NarrativeStage[] = [
  {
    id: "hero",
    order: 1,
    title: "Identity",
    description: "Who is Thapelo?",
  },
  {
    id: "mission",
    order: 2,
    title: "Mission",
    description: "What is the engineering mission?",
  },
  {
    id: "quality-metrics",
    order: 3,
    title: "Quality Metrics",
    description: "What engineering signals define quality?",
  },
  {
    id: "skills",
    order: 4,
    title: "Capabilities",
    description: "How are the skills connected?",
  },
  {
    id: "brikbyteos",
    order: 5,
    title: "BrikByteOS",
    description: "How does Release Confidence Infrastructure work?",
  },
  {
    id: "projects",
    order: 6,
    title: "Evidence",
    description: "What projects prove engineering capability?",
  },
  {
    id: "experience",
    order: 7,
    title: "Journey",
    description: "How did the engineering mission develop?",
  },
  {
    id: "engineering-intelligence",
    order: 8,
    title: "Research",
    description: "What thinking supports the engineering philosophy?",
  },
  {
    id: "contact",
    order: 9,
    title: "Communication",
    description: "How can a new engineering mission begin?",
  },
  {
    id: "footer",
    order: 10,
    title: "Final Verdict",
    description: "The engineering mission concludes with approval.",
  },
] as const;

export const scrollNarrativeConfig = {
  rootMargin: "-35% 0px -45% 0px",
  threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
  handoffVisibility: 0.8,
  minimumVisibility: 0.1,
} as const;
