import { cn } from '@/lib/cn';

/**
 * SkipLink — visible-on-focus skip navigation.
 *
 * Design System §36 — Accessibility is part of the design system.
 * NFR-002 — WCAG 2.2 AA, keyboard accessibility.
 * WCAG 2.4.1 — Bypass Blocks.
 *
 * Renders off-screen until focused, then appears as a styled
 * button. Keyboard users can Tab once from page load to jump
 * directly to <main id="main">.
 */
export interface SkipLinkProps {
  /** Target element id — must exist in the page. */
  href?: string;
  /** Link text. */
  children?: string;
  className?: string;
}

export function SkipLink({
  href = '#main',
  children = 'Skip to main content',
  className,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only',
        'focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-header',
        'focus:inline-flex focus:items-center focus:gap-2',
        'focus:h-10 focus:px-4 focus:rounded-md',
        'focus:bg-accent focus:text-background',
        'focus:font-medium focus:text-small',
        'focus:outline-2 focus:outline-offset-2 focus:outline-focus',
        className,
      )}
    >
      {children}
    </a>
  );
}
