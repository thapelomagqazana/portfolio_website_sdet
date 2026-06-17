/**
 * Project Evidence Vault data model.
 *
 * Projects are presented as engineering evidence, not generic portfolio cards.
 * This keeps all copy, categories, filters, evidence tags, quality signals, and
 * links centralized so the UI stays maintainable and testable.
 */

export type ProjectCategory =
  | "release-confidence"
  | "quality-engineering"
  | "backend"
  | "systems-integration"
  | "frontend"
  | "automation"
  | "full-stack";

export type ProjectCategoryFilter = ProjectCategory | "all";

export type ProjectLinkKey = "github" | "demo" | "docs";

export type ProjectCaseFile = {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly evidence: readonly string[];
  readonly stack: readonly string[];
  readonly qualitySignals: readonly string[];
  readonly links?: Partial<Record<ProjectLinkKey, string>>;
};

export const projectsCopy = {
  eyebrow: "Project Evidence Vault",
  heading: "Case files that prove engineering capability.",
  description:
    "A categorized archive of projects showing release confidence, automation, backend systems, systems integration, frontend delivery, and quality engineering.",
} as const;

export const projectCategories: readonly {
  readonly id: ProjectCategoryFilter;
  readonly label: string;
}[] = [
  { id: "all", label: "All Evidence" },
  { id: "release-confidence", label: "Release Confidence" },
  { id: "quality-engineering", label: "Quality Engineering" },
  { id: "backend", label: "Backend" },
  { id: "systems-integration", label: "Systems Integration" },
  { id: "frontend", label: "Frontend" },
  { id: "automation", label: "Automation" },
  { id: "full-stack", label: "Full Stack" },
] as const;

export const projectCaseFiles: readonly ProjectCaseFile[] = [
  {
    id: "brikbyteos",
    title: "BrikByteOS",
    category: "release-confidence",
    summary:
      "Release Confidence Infrastructure that turns scattered engineering signals into normalized evidence, quality gates, and reviewable release reports.",
    problem:
      "Quality evidence exists across tests, security scans, performance reports, CI logs, and dashboards, but release confidence is still difficult to measure.",
    solution:
      "BrikByteOS collects engineering signals, normalizes them into evidence, evaluates quality gates, and generates release confidence reports.",
    evidence: [
      "bb CLI",
      "Tool adapters",
      "Evidence model",
      "Quality gate engine",
      "Report generation",
    ],
    stack: ["Go", "CLI", "JSON", "Trivy", "k6", "Playwright", "Newman"],
    qualitySignals: [
      "Evidence normalization",
      "Gate evaluation",
      "Report traceability",
      "Adapter orchestration",
    ],
    links: {
      github: "https://github.com/BrikByte-Studios/bb-cli",
      docs: "#brikbyteos",
    },
  },
  {
    id: "stackcraft",
    title: "StackCraft",
    category: "backend",
    summary:
      "A software project focused on structured technical execution, reusable architecture, and practical product delivery.",
    problem:
      "Many software ideas fail because architecture, delivery flow, and implementation discipline are not clearly structured.",
    solution:
      "StackCraft demonstrates structured software building through clear components, maintainable code, and project-focused execution.",
    evidence: [
      "Project architecture",
      "Reusable components",
      "Structured implementation",
      "Technical planning",
    ],
    stack: ["TypeScript", "React", "Node.js", "TailwindCSS"],
    qualitySignals: [
      "Maintainable structure",
      "Component separation",
      "Scalable project layout",
      "Clear engineering intent",
    ],
  },
  {
    id: "calorisee",
    title: "CaloriSee",
    category: "full-stack",
    summary:
      "A health and nutrition-focused application concept for tracking, visualizing, and understanding calorie-related information.",
    problem:
      "Users often struggle to connect food choices with simple, understandable nutritional insight.",
    solution:
      "CaloriSee presents calorie information in a clearer interface, helping users reason about food data and daily intake patterns.",
    evidence: [
      "User-focused interface",
      "Nutrition data presentation",
      "Input-driven feedback",
      "Visual tracking concept",
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "HuggingFace AI Models"],
    qualitySignals: [
      "User-centered design",
      "Readable UI states",
      "Data presentation",
      "Accessible interface planning",
    ],
  },
  //   {
  //     id: "pipboy-web-app-frontend",
  //     title: "Pipboy Web App Frontend",
  //     category: "frontend",
  //     summary:
  //       "A retro-inspired Pip-Boy web application designed to emulate Fallout's iconic interface with interactive frontend features.",
  //     problem:
  //       "Static portfolio projects often fail to demonstrate creativity, interaction design, and strong visual execution.",
  //     solution:
  //       "Built a themed interactive frontend that recreates the Pip-Boy experience through HTML, CSS, JavaScript, and immersive UI styling.",
  //     evidence: [
  //       "Retro interface",
  //       "Interactive UI",
  //       "Themed layout",
  //       "Frontend animation",
  //       "Responsive styling",
  //     ],
  //     stack: ["HTML", "CSS", "JavaScript"],
  //     qualitySignals: [
  //       "DOM interaction",
  //       "Visual design execution",
  //       "Frontend state handling",
  //       "Responsive UI behavior",
  //     ],
  //   },
  //   {
  //     id: "guess-the-number-game",
  //     title: "Guess The Number Game",
  //     category: "frontend",
  //     summary:
  //       "A browser-based number guessing game where the player guesses a random number between 1 and 20.",
  //     problem:
  //       "Beginner frontend projects need to show more than markup; they should prove DOM logic, state updates, and user feedback handling.",
  //     solution:
  //       "Implemented a guessing game that generates a random number, gives high/low feedback, tracks score, and stores the highest score.",
  //     evidence: [
  //       "Random number generation",
  //       "Score tracking",
  //       "High score storage",
  //       "User feedback",
  //       "DOM updates",
  //     ],
  //     stack: ["HTML", "CSS", "JavaScript"],
  //     qualitySignals: [
  //       "Game state handling",
  //       "Conditional feedback",
  //       "Input validation",
  //       "Local high-score persistence",
  //     ],
  //   },
  //   {
  //     id: "portfolio-v2",
  //     title: "Portfolio SDET v2.0",
  //     category: "frontend",
  //     summary:
  //       "Next.js portfolio built as a quality-engineering product story with animation, testing, and evidence-led sections.",
  //     problem:
  //       "A normal portfolio often shows visuals but does not prove engineering judgment, quality thinking, or delivery discipline.",
  //     solution:
  //       "Designed a portfolio around release confidence, evidence, testability, motion systems, and structured engineering storytelling.",
  //     evidence: [
  //       "Next.js App Router",
  //       "Reusable sections",
  //       "Motion components",
  //       "Design tokens",
  //       "Component tests",
  //     ],
  //     stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vitest", "Testing Library"],
  //     qualitySignals: [
  //       "Type-safe data models",
  //       "Accessible components",
  //       "Responsive layouts",
  //       "Automated component tests",
  //     ],
  //   },
] as const;

/**
 * Returns true when a value is a known project category filter.
 */
export function isProjectCategoryFilter(value: string): value is ProjectCategoryFilter {
  return projectCategories.some((category) => category.id === value);
}

/**
 * Returns the display label for a category.
 */
export function getProjectCategoryLabel(categoryId: ProjectCategoryFilter | string): string {
  return projectCategories.find((category) => category.id === categoryId)?.label ?? "Unknown";
}

/**
 * Filters project case files by category.
 */
export function filterProjectCaseFiles(
  projects: readonly ProjectCaseFile[],
  selectedCategory: ProjectCategoryFilter
): readonly ProjectCaseFile[] {
  if (selectedCategory === "all") return projects;
  return projects.filter((project) => project.category === selectedCategory);
}

/**
 * Safely resolves a project case file by id.
 */
export function getProjectCaseFileById(
  projectId: string,
  projects: readonly ProjectCaseFile[] = projectCaseFiles
): ProjectCaseFile | undefined {
  return projects.find((project) => project.id === projectId);
}

/**
 * Allows only safe href values for rendered project links.
 */
export function getSafeProjectHref(href: string | undefined): string | undefined {
  if (!href) return undefined;
  if (href.startsWith("#")) return href;

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? href : undefined;
  } catch {
    return undefined;
  }
}
