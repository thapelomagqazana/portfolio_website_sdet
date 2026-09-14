import { cn } from '@/lib/cn';
import type { Principle as PrincipleData } from '@/content/philosophy';

/**
 * Principle — one engineering principle.
 *
 * Task P12-01:
 *   - number (01–04)
 *   - title
 *   - 1–2 sentence explanation
 *
 * Design System §29 — The numbered system is the recurring
 * visual metaphor for the portfolio: signal → evidence →
 * quality → confidence.
 *
 * Rendered as a <li> containing a <dt>/<dd> pair so the
 * list reads as a definition list to assistive tech.
 */
export interface PrincipleProps {
  principle: PrincipleData;
  className?: string;
}

export function Principle({ principle, className }: PrincipleProps) {
  return (
    <li className={cn('flex flex-col border-t border-border pt-6', className)}>
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-mono text-small text-foreground-subtle"
        >
          {principle.number}
        </span>
        <h3 className="text-h3 text-foreground">{principle.title}</h3>
      </div>
      <p className="mt-4 text-body text-foreground-muted">{principle.body}</p>
    </li>
  );
}
