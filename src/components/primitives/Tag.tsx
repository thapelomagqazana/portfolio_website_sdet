import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Tag — inline technical label.
 *
 * Design System §42 — Real evidence over decoration.
 */
export interface TagProps {
  className?: string;
  children: ReactNode;
}

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm',
        'px-2 py-1',
        'font-mono text-mono text-foreground-subtle',
        'border border-border',
        className,
      )}
    >
      {children}
    </span>
  );
}
