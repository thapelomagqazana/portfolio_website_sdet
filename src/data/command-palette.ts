/**
 * Supported command action types.
 *
 * These are intentionally explicit so the command palette never executes
 * arbitrary user-provided behavior.
 */
export type CommandPaletteActionType = "navigate" | "external" | "download" | "email";

/**
 * One searchable command.
 */
export type CommandPaletteItem = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly type: CommandPaletteActionType;
  readonly href: string;
};

/**
 * Centralized command palette items.
 *
 * Keep commands outside the component so search behavior, tests, navbar triggers,
 * and future analytics can share one source of truth.
 */
export const commandPaletteItems: readonly CommandPaletteItem[] = [
  {
    id: "go-hero",
    label: "Go to Hero",
    description: "Open the main portfolio command center.",
    keywords: ["home", "hero", "intro"],
    type: "navigate",
    href: "#hero",
  },
  {
    id: "go-quality-metrics",
    label: "Go to Quality Metrics",
    description: "View quality signals and release confidence metrics.",
    keywords: ["metrics", "quality", "dashboard"],
    type: "navigate",
    href: "#quality-metrics",
  },
  {
    id: "go-about",
    label: "Go to About",
    description: "View the mission profile.",
    keywords: ["about", "mission", "profile"],
    type: "navigate",
    href: "#about",
  },
  {
    id: "go-skills",
    label: "Go to Skills",
    description: "Open the engineering capability matrix.",
    keywords: ["skills", "tools", "stack"],
    type: "navigate",
    href: "#skills",
  },
  {
    id: "go-brikbyteos",
    label: "Go to BrikByteOS",
    description: "View the flagship release confidence platform.",
    keywords: ["brikbyteos", "bb", "release", "quality gate"],
    type: "navigate",
    href: "#brikbyteos",
  },
  {
    id: "go-projects",
    label: "Go to Projects",
    description: "Review portfolio project evidence.",
    keywords: ["projects", "portfolio", "proof"],
    type: "navigate",
    href: "#projects",
  },
  {
    id: "go-experience",
    label: "Go to Experience",
    description: "Open professional mission logs.",
    keywords: ["experience", "work", "career"],
    type: "navigate",
    href: "#experience",
  },
  {
    id: "go-blog",
    label: "Go to Blog",
    description: "Open engineering notes.",
    keywords: ["blog", "notes", "articles"],
    type: "navigate",
    href: "#blog",
  },
  {
    id: "go-contact",
    label: "Go to Contact",
    description: "Open the contact section.",
    keywords: ["contact", "hire", "email"],
    type: "navigate",
    href: "#contact",
  },
  {
    id: "open-github",
    label: "Open GitHub",
    description: "Open Thapelo's GitHub profile.",
    keywords: ["github", "code", "repos"],
    type: "external",
    href: "https://github.com/thapelomagqazana",
  },
  {
    id: "open-linkedin",
    label: "Open LinkedIn",
    description: "Open Thapelo's LinkedIn profile.",
    keywords: ["linkedin", "profile", "career"],
    type: "external",
    href: "https://www.linkedin.com/in/thapelo-magqazana90632a174",
  },
  {
    id: "send-email",
    label: "Send Email",
    description: "Start an email to Thapelo.",
    keywords: ["email", "message", "contact"],
    type: "email",
    href: "mailto:tapsmcgzee8@gmail.com",
  },
  {
    id: "download-resume",
    label: "Download Resume",
    description: "Open the latest SDET resume.",
    keywords: ["resume", "cv", "download"],
    type: "download",
    href: "/Thapelo-Magqazana-SDET-Resume.pdf",
  },
] as const;

/**
 * Filters command palette items by label, description, keywords, type, and href.
 *
 * Rules:
 * - Empty query returns all items.
 * - Matching is case-insensitive.
 * - Whitespace is ignored at query boundaries.
 */
export function filterCommandPaletteItems(
  items: readonly CommandPaletteItem[],
  query: string
): CommandPaletteItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [...items];
  }

  return items.filter((item) => {
    const searchableText = [item.label, item.description, item.type, item.href, ...item.keywords]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Returns true when a keyboard event target accepts text input.
 *
 * This prevents the "/" shortcut from opening the palette while the user is
 * typing inside an input, textarea, select, or contenteditable element.
 */
export function isEditableEventTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}
