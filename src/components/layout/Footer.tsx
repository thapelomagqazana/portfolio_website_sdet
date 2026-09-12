import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Footer — semantic page footer landmark.
 *
 * Design System §46 — The footer should be simple.
 * Design System §36 — Semantic HTML (`<footer>`).
 *
 * Kept minimal — the footer is for persistent identity
 * and contact links, not another navigation dashboard.
 */
export interface FooterProps {
  className?: string;
  children: ReactNode;
}

export function Footer({ className, children }: FooterProps) {
  return (
    <footer
      className={cn('w-full border-t border-border bg-surface', className)}
    >
      {children}
    </footer>
  );
}
