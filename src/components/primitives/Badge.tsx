import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Badge — small non-interactive label.
 *
 * Design System §8 — Semantic colours communicate meaning.
 * Design System §30 — Status indicators.
 */
export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

const toneClass: Record<BadgeTone, string> = {
  neutral: 'bg-surface-elevated text-foreground-muted border border-border',
  accent: 'bg-accent-subtle text-accent border border-accent',
  success: 'bg-transparent text-success border border-success',
  warning: 'bg-transparent text-warning border border-warning',
  error: 'bg-transparent text-error border border-error',
};

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-label font-mono',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
