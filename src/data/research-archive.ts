// src/data/research-archive.ts

/**
 * Engineering Intelligence research archive data model.
 *
 * This module treats technical writing as structured engineering intelligence,
 * not casual blogging. Each report contains category, status, difficulty,
 * focus, tags, reading context, and a stable destination href.
 */

export type ResearchReportCategory =
  | "release-engineering"
  | "quality-engineering"
  | "test-automation"
  | "architecture"
  | "systems-thinking"
  | "brikbyteos";

export type ResearchReportStatus = "published" | "draft" | "researching";

export type ResearchReportDifficulty = "introductory" | "intermediate" | "advanced";

export type ResearchReportCategoryFilter = ResearchReportCategory | "all";

export type ResearchReport = {
  readonly id: string;
  readonly title: string;
  readonly category: ResearchReportCategory;
  readonly status: ResearchReportStatus;
  readonly difficulty: ResearchReportDifficulty;
  readonly summary: string;
  readonly focus: string;
  readonly tags: readonly string[];
  readonly readingMinutes: number;
  readonly href: string;
};

export const researchArchiveCopy = {
  eyebrow: "Research Archive",
  heading: "Structured engineering intelligence reports.",
  description:
    "Engineering intelligence reports on quality, automation, architecture, release confidence, systems thinking, and BrikByteOS.",
  searchLabel: "Search research reports",
  searchPlaceholder: "Search quality gates, architecture, Playwright, BrikByteOS...",
  emptyState: "No research reports matched the selected category and search query.",
} as const;

export const researchReportCategories: readonly {
  readonly id: ResearchReportCategoryFilter;
  readonly label: string;
}[] = [
  { id: "all", label: "All Reports" },
  { id: "release-engineering", label: "Release Engineering" },
  { id: "quality-engineering", label: "Quality Engineering" },
  { id: "test-automation", label: "Test Automation" },
  { id: "architecture", label: "Architecture" },
  { id: "systems-thinking", label: "Systems Thinking" },
  { id: "brikbyteos", label: "BrikByteOS" },
] as const;

export const researchReportCategoryLabels: Record<ResearchReportCategory, string> = {
  "release-engineering": "Release Engineering",
  "quality-engineering": "Quality Engineering",
  "test-automation": "Test Automation",
  architecture: "Architecture",
  "systems-thinking": "Systems Thinking",
  brikbyteos: "BrikByteOS",
} as const;

export const researchReportStatusLabels: Record<ResearchReportStatus, string> = {
  published: "Published",
  draft: "Draft",
  researching: "Researching",
} as const;

export const researchReportDifficultyLabels: Record<ResearchReportDifficulty, string> = {
  introductory: "Introductory",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

export const researchReports: readonly ResearchReport[] = [
  {
    id: "what-makes-releases-fail",
    title: "What Makes Releases Fail?",
    category: "release-engineering",
    status: "published",
    difficulty: "intermediate",
    summary:
      "A field guide on release failure, missing evidence, quality blind spots, and why release confidence matters.",
    focus: "Release failure, incomplete evidence, and deployment confidence",
    tags: ["release engineering", "release confidence", "CI/CD", "quality evidence"],
    readingMinutes: 9,
    href: "/engineering/what-makes-releases-fail",
  },
  {
    id: "quality-gates-explained",
    title: "Quality Gates Explained",
    category: "quality-engineering",
    status: "published",
    difficulty: "introductory",
    summary:
      "A first-principles explanation of quality gates as engineering decision systems, not checklists.",
    focus: "Policy thresholds, quality gates, and engineering evidence",
    tags: ["quality gates", "policy", "automation", "release risk"],
    readingMinutes: 8,
    href: "/engineering/quality-gates-explained",
  },
  {
    id: "building-brikbyteos",
    title: "Building BrikByteOS",
    category: "brikbyteos",
    status: "published",
    difficulty: "intermediate",
    summary:
      "The engineering story behind BrikByteOS, Release Confidence Infrastructure, and evidence-backed deployment decisions.",
    focus: "Evidence normalization, quality gates, and release confidence architecture",
    tags: ["BrikByteOS", "release confidence", "architecture", "evidence normalization"],
    readingMinutes: 10,
    href: "/engineering/building-brikbyteos",
  },
  {
    id: "testing-is-not-quality",
    title: "Testing Is Not Quality",
    category: "quality-engineering",
    status: "published",
    difficulty: "introductory",
    summary:
      "Why testing produces evidence, but quality engineering decides what that evidence means.",
    focus: "Testing, quality engineering, automation, and release confidence",
    tags: ["software testing", "quality engineering", "automation", "observability"],
    readingMinutes: 8,
    href: "/engineering/testing-is-not-quality",
  },
  {
    id: "playwright-vs-cypress",
    title: "Playwright vs Cypress",
    category: "test-automation",
    status: "published",
    difficulty: "intermediate",
    summary:
      "A balanced engineering comparison of Playwright and Cypress for reliable browser automation.",
    focus: "Browser automation, CI/CD reliability, debugging, and enterprise readiness",
    tags: ["Playwright", "Cypress", "test automation", "browser testing"],
    readingMinutes: 9,
    href: "/engineering/playwright-vs-cypress",
  },
  {
    id: "release-confidence-infrastructure",
    title: "Release Confidence Infrastructure",
    category: "release-engineering",
    status: "published",
    difficulty: "advanced",
    summary:
      "A report on why test results alone are not enough to make reliable release decisions.",
    focus: "Evidence-backed deployment decisions",
    tags: ["quality gates", "evidence", "release risk"],
    readingMinutes: 8,
    href: "/engineering/release-confidence",
  },
  {
    id: "quality-gates-first-principles",
    title: "Quality Gates from First Principles",
    category: "quality-engineering",
    status: "published",
    difficulty: "intermediate",
    summary: "Breaking down quality gates as decision systems rather than bureaucratic checklists.",
    focus: "Policy thresholds and engineering evidence",
    tags: ["quality gates", "policy", "automation"],
    readingMinutes: 7,
    href: "/engineering/quality-gates",
  },
  {
    id: "playwright-reliability",
    title: "Playwright Reliability Notes",
    category: "test-automation",
    status: "published",
    difficulty: "intermediate",
    summary:
      "Practical research notes on building reliable UI automation with clear selectors, deterministic waits, and test isolation.",
    focus: "Stable browser automation",
    tags: ["playwright", "ui testing", "test reliability"],
    readingMinutes: 8,
    href: "/engineering/playwright-best-practices",
  },
  {
    id: "architecture-thinking-boundaries",
    title: "Architecture Thinking and Boundaries",
    category: "architecture",
    status: "published",
    difficulty: "introductory",
    summary:
      "A systems-focused report on boundaries, responsibilities, coupling, and maintainability.",
    focus: "Software boundaries and flow",
    tags: ["architecture", "boundaries", "software design"],
    readingMinutes: 6,
    href: "/engineering/architecture-thinking",
  },
  {
    id: "brikbyteos-introduction-report",
    title: "Introducing BrikByteOS",
    category: "brikbyteos",
    status: "published",
    difficulty: "introductory",
    summary:
      "A product-engineering report explaining BrikByteOS as Release Confidence Infrastructure.",
    focus: "BrikByteOS product direction",
    tags: ["BrikByteOS", "release confidence", "evidence pipeline"],
    readingMinutes: 5,
    href: "/engineering/brikbyteos-introduction",
  },
] as const;

/**
 * Filters reports by category.
 */
export function filterResearchReportsByCategory(
  reports: readonly ResearchReport[],
  category: ResearchReportCategoryFilter
): readonly ResearchReport[] {
  if (category === "all") return reports;
  return reports.filter((report) => report.category === category);
}

/**
 * Searches reports by title, summary, focus, category, and tags.
 *
 * The search is case-insensitive and whitespace-tolerant.
 */
export function searchResearchReports(
  reports: readonly ResearchReport[],
  query: string
): readonly ResearchReport[] {
  const normalizedQuery = normalizeResearchSearchValue(query);

  if (!normalizedQuery) return reports;

  return reports.filter((report) => {
    const searchableText = [
      report.title,
      report.summary,
      report.focus,
      report.category,
      ...report.tags,
    ]
      .map(normalizeResearchSearchValue)
      .join(" ");

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Applies category filtering first, then search filtering.
 */
export function filterResearchReports(
  reports: readonly ResearchReport[],
  category: ResearchReportCategoryFilter,
  query: string
): readonly ResearchReport[] {
  return searchResearchReports(filterResearchReportsByCategory(reports, category), query);
}

/**
 * Returns true when report metadata is complete enough to render.
 */
export function researchReportHasValidMetadata(report: ResearchReport): boolean {
  return (
    report.id.trim().length > 0 &&
    report.title.trim().length > 0 &&
    report.summary.trim().length > 0 &&
    report.focus.trim().length > 0 &&
    report.href.trim().length > 0 &&
    report.readingMinutes > 0 &&
    report.tags.some((tag) => tag.trim().length > 0)
  );
}

/**
 * Detects duplicate research report IDs.
 */
export function hasDuplicateResearchReportIds(reports: readonly ResearchReport[]): boolean {
  const seen = new Set<string>();

  for (const report of reports) {
    if (seen.has(report.id)) return true;
    seen.add(report.id);
  }

  return false;
}

/**
 * Detects duplicate research report hrefs.
 */
export function hasDuplicateResearchReportHrefs(reports: readonly ResearchReport[]): boolean {
  const seen = new Set<string>();

  for (const report of reports) {
    if (seen.has(report.href)) return true;
    seen.add(report.href);
  }

  return false;
}

/**
 * Safely resolves a category label.
 */
export function getResearchReportCategoryLabel(category: ResearchReportCategory | string): string {
  return researchReportCategoryLabels[category as ResearchReportCategory] ?? "Unknown";
}

/**
 * Safely resolves a report status label.
 */
export function getResearchReportStatusLabel(status: ResearchReportStatus | string): string {
  return researchReportStatusLabels[status as ResearchReportStatus] ?? "Unknown";
}

/**
 * Safely resolves a difficulty label.
 */
export function getResearchReportDifficultyLabel(
  difficulty: ResearchReportDifficulty | string
): string {
  return researchReportDifficultyLabels[difficulty as ResearchReportDifficulty] ?? "Unknown";
}

function normalizeResearchSearchValue(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}
