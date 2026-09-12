import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Main — semantic main content landmark.
 *
 * Design System §36 — Semantic HTML (`<main>`).
 * NFR-002 — Screen-reader navigation.
 *
 * `tabIndex={-1}` allows programmatic focus (skip-link target)
 * without adding the element to the natural tab order.
 */
export interface MainProps {
  /** Element id — referenced by SkipLink. */
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Main({ id = 'main', className, children }: MainProps) {
  return (
    <main id={id} tabIndex={-1} className={cn('outline-none', className)}>
      {children}
    </main>
  );
}
