import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { qinisArchitecture } from '@/content/qinis';

/**
 * ArchitectureFlow — vertical pipeline visual.
 *
 * Task P8-03: Development → Testing → Evidence → Quality → Decision.
 *
 * Design System §29 — Signal → Evidence → Quality → Confidence
 * is the portfolio's signature visual system. This component
 * renders its concrete form for QINIS.
 * Design System §28 — BrikByteOS uses a terminal moment; QINIS
 * uses a flow diagram. Each project gets its own evidence format.
 *
 * Rendered as an ordered list for screen readers.
 */
export interface ArchitectureFlowProps {
  className?: string;
}

export function ArchitectureFlow({ className }: ArchitectureFlowProps) {
  return (
    <ol
      aria-label="QINIS architecture flow"
      className={cn('flex flex-col gap-2', className)}
    >
      {qinisArchitecture.map((stage, index) => (
        <li key={stage.label} className="flex flex-col">
          <div
            className={cn(
              'flex items-baseline justify-between gap-4',
              'rounded-md border border-border bg-surface px-4 py-3',
            )}
          >
            <span className="font-mono text-mono font-medium text-foreground">
              {stage.label}
            </span>
            <span className="text-small text-foreground-subtle">
              {stage.detail}
            </span>
          </div>

          {index < qinisArchitecture.length - 1 ? (
            <span
              aria-hidden="true"
              className="flex justify-center py-1 text-foreground-subtle"
            >
              <ChevronDown size={16} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
