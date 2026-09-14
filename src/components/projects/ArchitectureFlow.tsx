import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';
import { qinisArchitecture } from '@/content/qinis';

/**
 * ArchitectureFlow — vertical pipeline visual.
 *
 * Task P8-03: Development → Testing → Evidence → Quality → Decision.
 *
 * Motion (P22 effect 8):
 *   Each stage carries data-stage and a --stage-index custom
 *   property. When the flow enters the viewport, motion.css
 *   fades the stages in sequence (80ms apart), so the pipeline
 *   visibly executes — Development → Testing → Evidence →
 *   Quality → Decision — as the reader arrives.
 *
 *   Under reduced motion, all stages render immediately at
 *   full opacity.
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
  const ref = useReveal<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      data-flow
      aria-label="QINIS architecture flow"
      className={cn('flex flex-col gap-2', className)}
    >
      {qinisArchitecture.map((stage, index) => (
        <li
          key={stage.label}
          data-stage
          style={{ '--stage-index': index } as CSSProperties}
          className="flex flex-col"
        >
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
