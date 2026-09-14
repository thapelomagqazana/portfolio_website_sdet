import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';
import { brikbytePipeline } from '@/content/brikbyteos';

/**
 * ArchitecturePipeline — BrikByteOS execution pipeline.
 *
 * Task P8-08:
 *   Command → Execution Engine → Test / Security Signals →
 *   Normalized Results → Evidence Bundle → Policy Gate →
 *   Release Decision
 *
 * Motion (P22 effect 8):
 *   Each stage carries data-stage and a --stage-index custom
 *   property. When the pipeline enters the viewport, motion.css
 *   brightens the stages in sequence (80ms apart), so the
 *   pipeline visibly executes as the reader arrives.
 *
 *   Under reduced motion, all stages render immediately at
 *   full opacity.
 *
 * Design System §29 — Signal → Evidence → Quality → Confidence
 * is the recurring visual system. This component renders the
 * concrete form for BrikByteOS.
 *
 * Rendered as an ordered list for screen readers.
 */
export interface ArchitecturePipelineProps {
  className?: string;
}

export function ArchitecturePipeline({ className }: ArchitecturePipelineProps) {
  const ref = useReveal<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      data-flow
      aria-label="BrikByteOS execution pipeline"
      className={cn('flex flex-col gap-1', className)}
    >
      {brikbytePipeline.map((stage, index) => (
        <li
          key={stage.label}
          data-stage
          style={{ '--stage-index': index } as CSSProperties}
          className="flex flex-col"
        >
          <div
            className={cn(
              'grid gap-1 rounded-md border border-border bg-surface px-4 py-3',
              'sm:grid-cols-[200px_1fr] sm:items-baseline sm:gap-4',
            )}
          >
            <span className="font-mono text-mono font-medium text-foreground">
              {stage.label}
            </span>
            <span className="text-small text-foreground-subtle">
              {stage.detail}
            </span>
          </div>

          {index < brikbytePipeline.length - 1 ? (
            <span
              aria-hidden="true"
              className="flex justify-center py-0.5 text-foreground-subtle"
            >
              <ChevronDown size={14} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
