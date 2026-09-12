import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SkipLink } from './SkipLink';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

/**
 * AppShell — root layout wrapper.
 *
 * Design System §14 — Layout system (constrained content).
 * Design System §36 — Accessibility (skip link, landmarks).
 * NFR-002 — WCAG 2.2 AA.
 * NFR-004 — Responsive 320px → 1440px+.
 *
 * Structure:
 *
 *   ┌───────────────────────────────────┐
 *   │ SkipLink                          │  ← visible on focus only
 *   ├───────────────────────────────────┤
 *   │ <header>                          │  ← sticky, z-header
 *   ├───────────────────────────────────┤
 *   │ <main id="main">                  │  ← skip-link target
 *   │                                   │
 *   │   …page content…                  │
 *   │                                   │
 *   ├───────────────────────────────────┤
 *   │ <footer>                          │
 *   └───────────────────────────────────┘
 *
 * The shell owns vertical stacking and background colour.
 * It does NOT own header or footer content — those are passed
 * in as props so each page can compose its own navigation.
 */
export interface AppShellProps {
  /** Optional header content. */
  header?: ReactNode;
  /** Footer content. */
  footer: ReactNode;
  /** Page content. */
  children: ReactNode;
  /** Optional class names on the root wrapper. */
  className?: string;
}

export function AppShell({
  header,
  footer,
  children,
  className,
}: AppShellProps) {
  return (
    <div
      className={cn(
        'min-h-dvh flex flex-col bg-background text-foreground',
        className,
      )}
    >
      <SkipLink />
      <Header>{header}</Header>
      <Main className="flex-1">{children}</Main>
      <Footer>{footer}</Footer>
    </div>
  );
}
