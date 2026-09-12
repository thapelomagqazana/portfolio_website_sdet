import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Container — horizontal content constraint.
 *
 * Design System §14 — Max content width 1200–1280px.
 * NFR-004 — Responsive 320px → 1440px+.
 *
 * Renders a semantic element (default `<div>`) and centres its
 * children within the max content width with generous side gutters.
 */
export type ContainerSize = 'prose' | 'default' | 'wide';

export interface ContainerProps {
  /** Optional element override — use `<section>`, `<article>`, etc. */
  as?: ElementType;
  /** Constrain further for reading-oriented content. */
  size?: ContainerSize;
  /** Additional class names. */
  className?: string;
  /** Container content. */
  children: ReactNode;
}

const sizeClass: Record<ContainerSize, string> = {
  prose: 'max-w-[65ch]', // For long-form text
  default: 'max-w-[1280px]', // Standard page content
  wide: 'max-w-[1440px]', // Full-bleed media sections
};

export function Container({
  as: Component = 'div',
  size = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-6 sm:px-8 lg:px-12',
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
