/**
 * Navigation content — Thapelo Magqazana Engineering Portfolio
 *
 * Design System §23 — Keep navigation simple (5 items maximum).
 * Conversion Goals §16 — No dead links.
 *
 * `href` values are in-page anchors; `sectionId` matches the
 * id used on the corresponding `<Section>` element so the
 * active-section hook can detect which link to highlight.
 */
export interface NavItem {
  /** Human-readable label. */
  label: string;
  /** Anchor href, e.g. "#work". */
  href: string;
  /** Section id in the page (without "#"). */
  sectionId: string;
}

export const navItems: readonly NavItem[] = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Work', href: '#work', sectionId: 'work' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Insights', href: '#insights', sectionId: 'insights' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
] as const;
