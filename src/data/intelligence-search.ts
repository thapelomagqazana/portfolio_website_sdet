/**
 * Centralized Engineering Intelligence search data.
 *
 * This index intentionally searches across articles, research reports, projects,
 * skills, experience, and BrikByteOS concepts so the search feels like an
 * engineering intelligence database instead of a normal blog search.
 */

export type SearchEntityCategory =
  | "article"
  | "research"
  | "project"
  | "experience"
  | "skill"
  | "brikbyteos";

export type SearchEntity = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: SearchEntityCategory;
  readonly href: string;
  readonly keywords: readonly string[];
};

export type SearchResult = {
  readonly entity: SearchEntity;
  readonly score: number;
  readonly highlights: readonly string[];
};

export const searchCategoryLabels: Record<SearchEntityCategory, string> = {
  article: "Article",
  research: "Research",
  project: "Project",
  experience: "Experience",
  skill: "Skill",
  brikbyteos: "BrikByteOS",
} as const;

export const intelligenceSearchConfig = {
  debounceMs: 150,
  maxResults: 20,
  minQueryLength: 1,
  weights: {
    titleExact: 500,
    titlePartial: 220,
    keyword: 160,
    category: 90,
    description: 60,
  },
} as const;

export const intelligenceSearchIndex: readonly SearchEntity[] = [
  {
    id: "article-release-confidence",
    title: "Release Confidence: From Feeling to Evidence",
    description:
      "Why engineering teams should replace assumption-based release decisions with evidence-backed confidence.",
    category: "article",
    href: "/engineering/release-confidence",
    keywords: ["release", "confidence", "quality gates", "evidence", "ci/cd"],
  },
  {
    id: "article-quality-gates",
    title: "Quality Gates as Engineering Boundaries",
    description:
      "How quality gates convert engineering evidence into consistent release decisions.",
    category: "article",
    href: "/engineering/quality-gates",
    keywords: ["quality gates", "policy", "testing", "release engineering"],
  },
  {
    id: "article-playwright",
    title: "Playwright Best Practices",
    description: "Reliable UI automation patterns for stable browser testing.",
    category: "article",
    href: "/engineering/playwright-best-practices",
    keywords: ["playwright", "ui testing", "automation", "test reliability"],
  },
  {
    id: "article-architecture-thinking",
    title: "Architecture Thinking",
    description:
      "Software architecture through boundaries, flow, responsibility, and maintainability.",
    category: "article",
    href: "/engineering/architecture-thinking",
    keywords: ["architecture", "systems thinking", "software design"],
  },
  {
    id: "article-brikbyteos-introduction",
    title: "Introducing BrikByteOS",
    description: "The engineering philosophy behind Release Confidence Infrastructure.",
    category: "brikbyteos",
    href: "/engineering/brikbyteos-introduction",
    keywords: ["brikbyteos", "release confidence", "evidence pipeline"],
  },
  {
    id: "research-evidence-reports",
    title: "Evidence Reports",
    description: "Research notes on turning raw tool output into reviewable release evidence.",
    category: "research",
    href: "/engineering/release-confidence",
    keywords: ["evidence", "reports", "traceability", "release readiness"],
  },
  {
    id: "research-automation-strategy",
    title: "Automation Strategy",
    description: "Structured thinking on test automation, CI feedback, and confidence-building.",
    category: "research",
    href: "/engineering/playwright-best-practices",
    keywords: ["automation", "ci", "testing", "quality engineering"],
  },
  {
    id: "project-brikbyteos",
    title: "BrikByteOS",
    description:
      "Release Confidence Infrastructure that normalizes engineering evidence and evaluates quality gates.",
    category: "project",
    href: "#brikbyteos",
    keywords: ["bb cli", "go", "quality gates", "release confidence", "evidence"],
  },
  {
    id: "project-portfolio",
    title: "Portfolio SDET v2.0",
    description:
      "A quality-engineering portfolio built around evidence, motion, and engineering storytelling.",
    category: "project",
    href: "#projects",
    keywords: ["next.js", "typescript", "testing", "portfolio", "sdet"],
  },
  {
    id: "project-robot-worlds",
    title: "Robot Worlds",
    description: "Java socket-based backend project with command handling, persistence, and tests.",
    category: "project",
    href: "#projects",
    keywords: ["java", "backend", "sockets", "sqlite", "testing"],
  },
  {
    id: "experience-quality-engineering",
    title: "Quality Engineering Growth",
    description:
      "Progression toward SDET, test automation, release engineering, and quality infrastructure.",
    category: "experience",
    href: "#experience",
    keywords: ["sdet", "quality engineering", "playwright", "k6", "trivy"],
  },
  {
    id: "experience-professional",
    title: "Professional Engineering Experience",
    description: "Professional experience through Steinweg Bridge and Alula Technologies.",
    category: "experience",
    href: "#experience",
    keywords: ["steinweg bridge", "alula technologies", "professional experience"],
  },
  {
    id: "skill-playwright",
    title: "Playwright",
    description: "Browser automation for reliable UI and end-to-end testing.",
    category: "skill",
    href: "#skills",
    keywords: ["ui testing", "automation", "e2e", "selectors"],
  },
  {
    id: "skill-typescript",
    title: "TypeScript",
    description: "Typed frontend and full-stack development for maintainable software systems.",
    category: "skill",
    href: "#skills",
    keywords: ["typescript", "react", "next.js", "type safety"],
  },
  {
    id: "skill-go",
    title: "Go",
    description: "Systems programming language used for BrikByteOS CLI engineering.",
    category: "skill",
    href: "#skills",
    keywords: ["golang", "cli", "brikbyteos", "systems"],
  },
  {
    id: "skill-docker",
    title: "Docker",
    description: "Containerization for repeatable development, testing, and delivery workflows.",
    category: "skill",
    href: "#skills",
    keywords: ["containers", "ci/cd", "devops"],
  },
  {
    id: "skill-testing",
    title: "Testing",
    description: "Unit, integration, API, UI, performance, and security testing strategy.",
    category: "skill",
    href: "#skills",
    keywords: ["vitest", "jest", "playwright", "newman", "k6", "trivy"],
  },
] as const;
