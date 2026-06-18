/**
 * Engineering Intelligence knowledge-base data model.
 *
 * Metadata is centralized and typed so article cards, search, filtering,
 * related articles, and SEO can share one reliable source of truth.
 */

export type ArticleCategory =
  | "release-engineering"
  | "quality-engineering"
  | "testing"
  | "architecture"
  | "automation"
  | "software-design"
  | "systems-thinking"
  | "brikbyteos";

export type Difficulty = "foundation" | "intermediate" | "advanced";

export type KnowledgeArticle = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: ArticleCategory;
  readonly difficulty: Difficulty;
  readonly publishedAt: string;
  readonly readingMinutes: number;
  readonly featured: boolean;
  readonly tags: readonly string[];
};

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  "release-engineering": "Release Engineering",
  "quality-engineering": "Quality Engineering",
  testing: "Testing",
  architecture: "Architecture",
  automation: "Automation",
  "software-design": "Software Design",
  "systems-thinking": "Systems Thinking",
  brikbyteos: "BrikByteOS",
} as const;

export const difficultyLabels: Record<Difficulty, string> = {
  foundation: "Foundation",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

export const engineeringIntelligenceCopy = {
  eyebrow: "Engineering Intelligence",
  heading: "A knowledge base for release confidence, testing, and systems thinking.",
  description:
    "Long-form technical notes on release engineering, quality automation, architecture, BrikByteOS, and disciplined software delivery.",
} as const;

export const knowledgeArticles: readonly KnowledgeArticle[] = [
  {
    slug: "release-confidence",
    title: "Release Confidence: From Feeling to Evidence",
    description:
      "Why software teams need measurable release readiness instead of assumption-based release decisions.",
    category: "release-engineering",
    difficulty: "foundation",
    publishedAt: "2026-06-18",
    readingMinutes: 6,
    featured: true,
    tags: ["release confidence", "quality gates", "evidence", "ci/cd"],
  },
  {
    slug: "quality-gates",
    title: "Quality Gates as Engineering Boundaries",
    description:
      "How quality gates convert normalized evidence into consistent approve, reject, warning, or manual-review decisions.",
    category: "quality-engineering",
    difficulty: "intermediate",
    publishedAt: "2026-06-18",
    readingMinutes: 7,
    featured: false,
    tags: ["quality gates", "policy", "testing", "release engineering"],
  },
  {
    slug: "playwright-best-practices",
    title: "Playwright Best Practices for Reliable UI Testing",
    description:
      "Practical patterns for building stable, readable, maintainable browser automation.",
    category: "testing",
    difficulty: "intermediate",
    publishedAt: "2026-06-18",
    readingMinutes: 8,
    featured: false,
    tags: ["playwright", "ui testing", "automation", "test reliability"],
  },
  {
    slug: "architecture-thinking",
    title: "Architecture Thinking for Growing Software Systems",
    description: "A practical approach to boundaries, flow, responsibility, and maintainability.",
    category: "architecture",
    difficulty: "foundation",
    publishedAt: "2026-06-18",
    readingMinutes: 6,
    featured: false,
    tags: ["architecture", "systems thinking", "software design"],
  },
  {
    slug: "brikbyteos-introduction",
    title: "Introducing BrikByteOS",
    description: "The engineering thinking behind BrikByteOS as Release Confidence Infrastructure.",
    category: "brikbyteos",
    difficulty: "foundation",
    publishedAt: "2026-06-18",
    readingMinutes: 5,
    featured: true,
    tags: ["brikbyteos", "release confidence", "evidence pipeline"],
  },
] as const;
