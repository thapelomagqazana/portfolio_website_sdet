import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Heading — semantic heading with scale-appropriate styling.
 *
 * Design System §11 — Type scale (fluid, clamp-based).
 * Design System §12 — Headings short, strong, specific.
 * NFR-002 — Logical heading hierarchy (no skipped levels).
 *
 * Extends HTMLAttributes<HTMLHeadingElement> so callers can
 * pass data-* attributes (e.g. data-hero-reveal for the motion
 * system), aria-* attributes and standard heading props. All
 * unrecognised props are forwarded to the underlying tag.
 */
export type HeadingLevel = 1 | 2 | 3;
export type HeadingVisual = 'display' | 'h1' | 'h2' | 'h3';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — determines the rendered tag (h1/h2/h3). */
  level: HeadingLevel;
  /** Visual scale. Defaults to match the level. */
  visual?: HeadingVisual;
  /** Anchor id — required if another element references it via aria-labelledby. */
  id?: string;
  className?: string;
  children: ReactNode;
}

const visualClass: Record<HeadingVisual, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
};

const defaultVisual: Record<HeadingLevel, HeadingVisual> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
};

const tagFor: Record<HeadingLevel, 'h1' | 'h2' | 'h3'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
};

export function Heading({
  level,
  visual,
  id,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = tagFor[level];
  const resolvedVisual = visual ?? defaultVisual[level];

  return (
    <Tag
      id={id}
      className={cn(visualClass[resolvedVisual], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
