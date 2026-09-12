import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Eyebrow — uppercase mono system label above a heading.
 *
 * Design System §12 — Technical text in mono, used sparingly.
 */
export interface EyebrowProps {
  className?: string;
  children: ReactNode;
}

export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <span className={cn('text-label inline-block', className)}>{children}</span>
  );
}
