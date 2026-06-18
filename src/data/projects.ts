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

export type ProjectDetail = {
  readonly problem: string;
  readonly solution: string;
  readonly architecture: string;
  readonly lessons: readonly string[];
};

export type ProjectCaseFile = {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  readonly detail: ProjectDetail;
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
    detail: {
      problem:
        "Quality evidence exists across tests, security scans, performance reports, CI logs, and dashboards, but release confidence is still difficult to measure.",
      solution:
        "BrikByteOS collects engineering signals, normalizes them into evidence, evaluates quality gates, and generates release confidence reports.",
      architecture:
        "The system is structured around a CLI entry point, run orchestration, tool adapters, normalized evidence models, quality gate evaluation, reporting, and persistent run artifacts.",
      lessons: [
        "Quality is more valuable when evidence is normalized and reviewable.",
        "Adapters reduce coupling between third-party tools and the core release decision engine.",
        "Release confidence becomes stronger when decisions are traceable back to source artifacts.",
      ],
    },
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
    detail: {
      problem:
        "Many software ideas fail because architecture, delivery flow, and implementation discipline are not clearly structured.",
      solution:
        "StackCraft demonstrates structured software building through clear components, maintainable code, and project-focused execution.",
      architecture:
        "StackCraft is organized around reusable application modules, clear data flow, separated UI/application concerns, and a maintainable project structure.",
      lessons: [
        "A clear project structure reduces confusion as features grow.",
        "Reusable components are easier to maintain when their boundaries are explicit.",
        "Technical planning improves execution speed and lowers rework.",
      ],
    },
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
      "A full-stack health and nutrition application that uses pre-trained Hugging Face models to help users understand calorie and food-related information.",
    detail: {
      problem:
        "Users often struggle to connect food choices with simple, understandable nutritional insight, especially when nutrition data is presented in a confusing or manual way.",
      solution:
        "CaloriSee combines a full-stack application interface with pre-trained Hugging Face models to help users reason about food data, calorie information, and daily intake patterns more clearly.",
      architecture:
        "The project is structured as a full-stack system with a frontend interface for user input and visualization, backend services for request handling and model integration, and pre-trained Hugging Face models for AI-assisted nutrition interpretation.",
      lessons: [
        "Full-stack applications need clear boundaries between frontend interaction, backend orchestration, and model integration.",
        "Pre-trained models are powerful, but the user experience must explain outputs clearly and responsibly.",
        "AI-assisted applications still need strong validation, readable states, and careful error handling.",
      ],
    },
    evidence: [
      "Full-stack architecture",
      "Hugging Face model integration",
      "Nutrition data presentation",
      "Input-driven feedback",
      "AI-assisted interpretation",
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "Python", "Hugging Face Models"],
    qualitySignals: [
      "Frontend/backend separation",
      "Model integration boundary",
      "Readable UI states",
      "Data presentation",
      "Error handling planning",
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
export function getProjectById(
  projectId: string,
  projects: readonly ProjectCaseFile[] = projectCaseFiles
): ProjectCaseFile | undefined {
  return projects.find((project) => project.id === projectId);
}

/**
 * Backwards-compatible alias for earlier tests/components.
 */
export const getProjectCaseFileById = getProjectById;

/**
 * Validates that a project has complete structured case-file detail.
 */
export function projectHasCompleteDetail(project: ProjectCaseFile): boolean {
  return (
    project.detail.problem.trim().length > 0 &&
    project.detail.solution.trim().length > 0 &&
    project.detail.architecture.trim().length > 0 &&
    project.detail.lessons.some((lesson) => lesson.trim().length > 0)
  );
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
