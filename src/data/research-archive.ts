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
  {
    id: "brikbyteos-adapter-architecture",
    title: "BrikByteOS Adapter Architecture",
    category: "brikbyteos",
    status: "researching",
    difficulty: "advanced",
    summary:
      "An architecture note on how adapters normalize external quality tools into one evidence model.",
    focus: "Tool adapters and normalized evidence",
    tags: ["BrikByteOS", "adapters", "architecture"],
    readingMinutes: 10,
    href: "/engineering/brikbyteos-adapter-architecture",
  },
  {
    id: "systems-thinking-for-release-risk",
    title: "Systems Thinking for Release Risk",
    category: "systems-thinking",
    status: "draft",
    difficulty: "advanced",
    summary:
      "A research draft on viewing release failures as system failures rather than isolated test failures.",
    focus: "Risk, feedback loops, and engineering systems",
    tags: ["systems thinking", "release risk", "feedback loops"],
    readingMinutes: 9,
    href: "/engineering/systems-thinking-for-release-risk",
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
  return value.trim().toLowerCase();
}
