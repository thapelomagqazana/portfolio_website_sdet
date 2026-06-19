/**
 * Experience mission timeline data.
 *
 * This module keeps Thapelo's journey centralized, strongly typed, and reusable.
 * The timeline is intentionally written as a mission progression rather than a
 * generic CV list.
 */

export type ExperienceTimelineCategory =
  | "education"
  | "training"
  | "experience"
  | "project"
  | "quality"
  | "leadership"
  | "product";

export type ExperienceTimelineStatus = "completed" | "current" | "ongoing" | "active";

export type ExperienceTimelineEvent = {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly category: ExperienceTimelineCategory;
  readonly summary: string;
  readonly evidence: readonly string[];
  readonly status: ExperienceTimelineStatus;
};

export const experienceTimelineCopy = {
  eyebrow: "Mission Timeline",
  heading: "Experience shaped by systems thinking, quality, and release confidence.",
  description:
    "A progression from technical foundations to software engineering, quality automation, BrikByteOS, and community leadership.",
  narrativeTitle: "Mission Progression",
  narrative:
    "From technical foundations to software engineering, then toward quality automation and release confidence systems. The journey shows a consistent movement toward disciplined engineering, evidence-driven delivery, and leadership.",
} as const;

export const experienceNarrativeContent = {
  eyebrow: "Engineering Experience",
  heading: "A journey from structured problem solving to release confidence systems.",
  narrative:
    "My engineering journey began with a fascination for solving structured problems through mathematics and systems thinking. That curiosity evolved into software engineering, where I discovered that quality is not a final activity — it is an architectural capability.",
  progression:
    "Through professional engineering experience at Steinweg Bridge and Alula Technologies, software training through WeThinkCode_, part-time Computer Science and Mathematics studies at UNISA, and projects spanning backend engineering, systems integration, full-stack development, test automation, CI/CD, performance testing, and developer tooling, I developed an engineering mindset focused on reducing uncertainty.",
  currentFocus:
    "Today I continue building BrikByteOS, an engineering platform that transforms software quality signals into measurable release confidence, while expanding my expertise across quality engineering, release engineering, cloud fundamentals, and developer productivity.",
  leadership:
    "Beyond technical execution, my experience includes youth leadership, facilitation, planning, and community service — strengthening the communication and responsibility required for engineering collaboration.",
  technicalEvolution: [
    "Mathematics and systems thinking",
    "Construction and technical studies",
    "Professional engineering experience",
    "Software engineering training",
    "Computer Science and Mathematics studies",
    "Backend and systems integration",
    "Software testing and automation",
    "Cloud fundamentals",
    "Release engineering",
    "Developer productivity",
    "Release Confidence Infrastructure",
  ],
  communityImpact:
    "Leadership and service have shaped how I communicate, organize, and build with responsibility.",
} as const;

export const experienceCategoryLabels: Record<ExperienceTimelineCategory, string> = {
  education: "Education",
  training: "Training",
  experience: "Professional Experience",
  project: "Projects",
  quality: "Quality Engineering",
  leadership: "Leadership",
  product: "Product",
} as const;

export const experienceStatusLabels: Record<ExperienceTimelineStatus, string> = {
  completed: "Completed",
  current: "Current Mission",
  ongoing: "Ongoing",
  active: "Active",
} as const;

export const experienceTimelineEvents: readonly ExperienceTimelineEvent[] = [
  {
    id: "technical-foundation",
    period: "Foundation",
    title: "Built technical discipline through construction and technical studies",
    category: "education",
    summary:
      "Developed structured thinking, planning discipline, and problem-solving through mathematics, physics, civil technology, and construction studies.",
    evidence: ["Mathematics", "Physics", "Civil Technology", "Planning discipline"],
    status: "completed",
  },
  {
    id: "wethinkcode",
    period: "Software Training",
    title: "Deepened software engineering through WeThinkCode_",
    category: "training",
    summary:
      "Built practical experience across backend systems, systems integration, testing, project delivery, and real-world software problem solving.",
    evidence: ["Java", "Python", "Django", "Systems Integration", "Testing"],
    status: "completed",
  },
  {
    id: "professional-engineering-experience",
    period: "Industry Experience",
    title:
      "Built professional engineering experience through Steinweg Bridge and Alula Technologies",
    category: "experience",
    summary:
      "Applied software engineering, delivery discipline, collaboration, problem-solving, and technical execution in professional environments while continuing to grow toward backend, systems integration, and quality engineering.",
    evidence: [
      "Steinweg Bridge",
      "Alula Technologies",
      "Professional Delivery",
      "Team Collaboration",
      "Software Engineering Practice",
    ],
    status: "completed",
  },
  {
    id: "unisa-bsc-computer-science",
    period: "Current Studies",
    title: "Pursuing a BSc in Computer Science and Mathematics (Part-time)",
    category: "education",
    summary:
      "Currently studying Computer Science and Mathematics at the University of South Africa (UNISA) while continuing to build production software, engineering systems, and release confidence infrastructure.",
    evidence: [
      "Computer Science",
      "Mathematics",
      "Algorithms",
      "Data Structures",
      "Software Engineering",
      "Part-time Study",
    ],
    status: "active",
  },
  {
    id: "azure-az900",
    period: "Cloud Foundation",
    title: "Earned Microsoft Azure Fundamentals (AZ-900)",
    category: "training",
    summary:
      "Established a foundational understanding of cloud computing, Azure services, security, governance, pricing, and modern cloud architecture.",
    evidence: [
      "Azure Fundamentals",
      "Cloud Computing",
      "Azure Services",
      "Identity & Security",
      "Governance",
    ],
    status: "completed",
  },
  {
    id: "project-building",
    period: "Project Evidence",
    title: "Built practical software projects as engineering proof files",
    category: "project",
    summary:
      "Created projects across backend, frontend, automation, full-stack, and systems integration to demonstrate technical execution.",
    evidence: ["Robot Worlds", "CaloriSee", "StackCraft", "Portfolio v2"],
    status: "ongoing",
  },
  {
    id: "quality-engineering",
    period: "Quality Focus",
    title: "Moved toward SDET and release engineering",
    category: "quality",
    summary:
      "Shifted from building applications only to building confidence in how software is tested, validated, and released.",
    evidence: ["Test Automation", "CI/CD", "Playwright", "k6", "Trivy"],
    status: "active",
  },
  {
    id: "brikbyteos",
    period: "Current Mission",
    title: "Created BrikByteOS Release Confidence Infrastructure",
    category: "product",
    summary:
      "Building a CLI-driven system that normalizes engineering evidence, evaluates quality gates, and produces release confidence reports.",
    evidence: ["bb CLI", "Evidence Reports", "Quality Gates", "Release Confidence"],
    status: "current",
  },
  {
    id: "community-leadership",
    period: "Leadership",
    title: "Served through youth, church, and community leadership",
    category: "leadership",
    summary:
      "Applied communication, planning, facilitation, and service through youth leadership, church programs, and community involvement.",
    evidence: ["Youth leadership", "Service planning", "Facilitation", "Community impact"],
    status: "ongoing",
  },
] as const;

/**
 * Returns the current mission event or safely falls back to the first event.
 */
export function getCurrentExperienceEvent(
  events: readonly ExperienceTimelineEvent[] = experienceTimelineEvents
): ExperienceTimelineEvent | undefined {
  return events.find((event) => event.status === "current") ?? events[0];
}

/**
 * Safely resolves a timeline event by id.
 */
export function getExperienceEventById(
  eventId: string,
  events: readonly ExperienceTimelineEvent[] = experienceTimelineEvents
): ExperienceTimelineEvent | undefined {
  return events.find((event) => event.id === eventId);
}

/**
 * Returns a safe category label.
 */
export function getExperienceCategoryLabel(category: ExperienceTimelineCategory | string): string {
  return experienceCategoryLabels[category as ExperienceTimelineCategory] ?? "Unknown";
}

/**
 * Returns a safe status label.
 */
export function getExperienceStatusLabel(status: ExperienceTimelineStatus | string): string {
  return experienceStatusLabels[status as ExperienceTimelineStatus] ?? "Unknown";
}

/**
 * Validates that an event has enough content to render as a mission log.
 */
export function experienceEventIsComplete(event: ExperienceTimelineEvent): boolean {
  return (
    event.id.trim().length > 0 &&
    event.period.trim().length > 0 &&
    event.title.trim().length > 0 &&
    event.summary.trim().length > 0 &&
    event.evidence.some((item) => item.trim().length > 0)
  );
}
