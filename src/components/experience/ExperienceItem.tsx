import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { RouteLink } from '@/lib/router';
import {
  roleKindLabels,
  type ExperienceEntry,
  type ExperienceEvidence,
} from '@/content/experience';

/**
 * ExperienceItem — one role in the experience timeline.
 *
 * Task P9-02 — Each role exposes:
 *   - Organisation
 *   - Position
 *   - Dates
 *   - Responsibilities (expandable)
 *   - Evidence (links)
 *   - Key metrics (when factual)
 *
 * Uses the native <details>/<summary> element for expansion:
 *   - Keyboard accessible by default (Enter/Space to toggle)
 *   - Works with or without JavaScript
 *   - Screen readers announce "collapsed"/"expanded"
 *   - No custom ARIA needed
 *
 * Design System §16 — Border used for structure.
 * Design System §40 — Progressive disclosure: summary first,
 *   details on demand.
 */
export interface ExperienceItemProps {
  entry: ExperienceEntry;
}

export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <li
      id={`experience-${entry.id}`}
      className="border-t border-border first:border-t-0"
    >
      <details className="group" open={entry.id === 'qinis'}>
        <summary
          className={cn(
            'flex cursor-pointer list-none items-start justify-between gap-4 py-6',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm',
            'marker:hidden [&::-webkit-details-marker]:hidden',
          )}
        >
          {/* Left: identity */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-h3 text-foreground">{entry.organisation}</h3>
              <span className="text-label text-foreground-subtle">
                {roleKindLabels[entry.kind]}
              </span>
            </div>
            <p className="mt-1 text-small text-foreground-muted">
              {entry.position}
            </p>
          </div>

          {/* Right: dates + toggle icon */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-small text-foreground-subtle whitespace-nowrap">
              {entry.dates}
            </span>
            <ChevronDown
              aria-hidden="true"
              size={18}
              className={cn(
                'text-foreground-subtle transition-transform duration-fast',
                'group-open:rotate-180',
              )}
            />
          </div>
        </summary>

        {/* Expanded content */}
        <div className="pb-8 pr-4">
          {/* Summary */}
          <p className="max-w-prose text-body text-foreground-muted">
            {entry.summary}
          </p>

          {/* Location */}
          {entry.location ? (
            <p className="mt-2 text-small text-foreground-subtle">
              {entry.location}
            </p>
          ) : null}

          {/* Metrics */}
          {entry.metrics && entry.metrics.length > 0 ? (
            <dl
              aria-label="Key metrics"
              className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {entry.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-label text-foreground-subtle">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-h3 text-foreground">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {/* Responsibilities */}
          <div className="mt-6">
            <h4 className="text-label mb-3">Responsibilities</h4>
            <ul className="flex flex-col gap-2">
              {entry.responsibilities.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-border pl-4 text-body text-foreground-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence */}
          {entry.evidence && entry.evidence.length > 0 ? (
            <div className="mt-6">
              <h4 className="text-label mb-3">Evidence</h4>
              <ul className="flex flex-col gap-2">
                {entry.evidence.map((ev) => (
                  <li key={ev.url}>
                    <EvidenceLink evidence={ev} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </details>
    </li>
  );
}

interface EvidenceLinkProps {
  evidence: ExperienceEvidence;
}

function EvidenceLink({ evidence }: EvidenceLinkProps) {
  if (evidence.kind === 'internal') {
    return (
      <RouteLink
        to={evidence.url}
        className="inline-flex items-center gap-2 text-body text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
      >
        {evidence.label}
      </RouteLink>
    );
  }

  return (
    <a
      href={evidence.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-body text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
    >
      {evidence.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
