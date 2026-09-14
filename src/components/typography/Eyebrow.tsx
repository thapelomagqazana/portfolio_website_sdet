import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Eyebrow — uppercase mono system label above a heading.
 *
 * Design System §12 — Technical text in mono, used sparingly.
 *
 * Extends HTMLAttributes<HTMLSpanElement> so callers can pass
 * data-* attributes (e.g. data-hero-reveal for the motion
 * system), aria-* attributes, and standard HTML span props.
 * All unrecognised props are forwarded to the underlying span.
 */
export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: ReactNode;
}

export function Eyebrow({ className, children, ...rest }: EyebrowProps) {
  return (
    <span className={cn('text-label inline-block', className)} {...rest}>
      {children}
    </span>
  );
}
