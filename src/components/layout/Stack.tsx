import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Stack — directional flow layout.
 *
 * Design System §13 — Spacing system (4/8 based).
 *
 * Replaces scattered `flex flex-col gap-*` with a single,
 * token-driven component.
 */
export type StackDirection = 'vertical' | 'horizontal';
export type StackGap = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';

export interface StackProps {
  as?: ElementType;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  className?: string;
  children: ReactNode;
}

const gapClass: Record<StackGap, string> = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  12: 'gap-12',
  16: 'gap-16',
};

const alignClass: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClass: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export function Stack({
  as: Component = 'div',
  direction = 'vertical',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  className,
  children,
}: StackProps) {
  return (
    <Component
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClass[gap],
        alignClass[align],
        justifyClass[justify],
        className,
      )}
    >
      {children}
    </Component>
  );
}
