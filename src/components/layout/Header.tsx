import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Header — semantic page header landmark.
 *
 * Design System §23 — Navigation remains simple.
 * Design System §36 — Semantic HTML (`<header>`).
 *
 * Layout:
 *   - Sticky by default so navigation stays reachable
 *   - z-index uses the --z-header token (P3-01)
 *   - Border-bottom provides a subtle structural rule (§16)
 *
 * Content (logo, nav links) is provided by the caller.
 */
export interface HeaderProps {
  /** Whether the header sticks to the top on scroll. Default true. */
  sticky?: boolean;
  className?: string;
  children: ReactNode;
}

export function Header({ sticky = true, className, children }: HeaderProps) {
  return (
    <header
      className={cn(
        'w-full border-b border-border bg-background/80 backdrop-blur',
        sticky && 'sticky top-0 z-header',
        className,
      )}
    >
      {children}
    </header>
  );
}
