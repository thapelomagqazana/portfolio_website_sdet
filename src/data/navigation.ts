/**
 * One navigation item shown in the Command Deck Navbar.
 */
export type NavigationItem = {
  readonly label: string;
  readonly href: `#${string}`;
};

/**
 * Centralized portfolio section navigation.
 *
 * Keep all navbar links here so desktop nav, mobile nav, tests,
 * and command palette can share the same source of truth.
 */
export const navigationItems: readonly NavigationItem[] = [
  { label: "Mission", href: "#about" },
  { label: "Metrics", href: "#quality-metrics" },
  { label: "BrikByteOS", href: "#brikbyteos" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Notes", href: "#engineering-intelligence" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Primary navbar CTA.
 */
export const navigationCta = {
  label: "Contact",
  href: "#contact",
} as const;
