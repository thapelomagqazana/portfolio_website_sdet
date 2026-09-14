import { cn } from '@/lib/cn';
import type { SkillGroup as SkillGroupData } from '@/content/skills';

/**
 * SkillGroup — one capability group (Test, Automate, Build, Deliver).
 *
 * Task P10-01:
 *   - Group label + purpose
 *   - List of capabilities
 *   - No skill bars, no percentages
 *
 * Design System §48 — Skill bars and percentage ratings are
 * explicitly excluded.
 * Design System §41 — Icons support meaning; they are marked
 * aria-hidden so screen readers announce only the label.
 *
 * Rendered as a semantic <section> with aria-labelledby
 * pointing at the group heading. This exposes the group as
 * a named region for screen readers and role-based queries.
 */
export interface SkillGroupProps {
  group: SkillGroupData;
  className?: string;
}

export function SkillGroup({ group, className }: SkillGroupProps) {
  const headingId = `skill-group-${group.id}-heading`;
  const { Icon } = group;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'flex flex-col rounded-md border border-border bg-surface p-6',
        className,
      )}
    >
      {/* Header: icon + label + purpose */}
      <header>
        <div className="flex items-center gap-3">
          <Icon aria-hidden="true" size={18} className="text-accent shrink-0" />
          <h3 id={headingId} className="text-h3 text-foreground">
            {group.label}
          </h3>
        </div>
        <p className="mt-3 text-small text-foreground-muted">{group.purpose}</p>
      </header>

      {/* Capabilities — rendered as factual labels, not interactive */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className={cn(
              'inline-flex items-center rounded-sm',
              'border border-border px-2 py-1',
              'font-mono text-mono text-foreground-subtle',
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
