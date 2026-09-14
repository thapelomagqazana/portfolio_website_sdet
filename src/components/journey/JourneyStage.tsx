import { cn } from '@/lib/cn';
import type { JourneyStage as JourneyStageData } from '@/content/journey';

/**
 * JourneyStage — one entry in the career timeline.
 *
 * Task P13-01 — each stage on the vertical timeline.
 *
 * Design System §29 — Signal → Evidence → Quality →
 * Confidence. Stages are rendered as a numbered vertical flow,
 * the same visual metaphor used by QINIS and BrikByteOS.
 *
 * The connector arrow between stages is drawn by the parent
 * Journey component. Each stage itself is just the node:
 * number, label, description.
 */
export interface JourneyStageProps {
  stage: JourneyStageData;
  className?: string;
}

const statusClass: Record<JourneyStageData['status'], string> = {
  past: 'text-foreground-muted',
  present: 'text-foreground',
  future: 'text-foreground-subtle',
};

const dotClass: Record<JourneyStageData['status'], string> = {
  past: 'bg-foreground-subtle',
  present: 'bg-accent',
  future: 'bg-border-strong',
};

export function JourneyStage({ stage, className }: JourneyStageProps) {
  return (
    <li className={cn('flex gap-4', className)}>
      {/* Timeline rail — dot */}
      <div className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className={cn(
            'mt-2 h-2 w-2 shrink-0 rounded-full',
            dotClass[stage.status],
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h3
          className={cn(
            'text-h3 transition-colors duration-fast',
            statusClass[stage.status],
          )}
        >
          {stage.label}
        </h3>
        <p className="mt-2 max-w-prose text-body text-foreground-muted">
          {stage.description}
        </p>
      </div>
    </li>
  );
}
