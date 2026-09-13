import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Link } from '@/components/primitives';
import { aboutCta } from '@/content/about';

/**
 * AboutActions — CTA for the About section.
 *
 * Task P7-02:
 *   - Label: "More about my journey"
 *   - Destination: #career (Career Journey section)
 *   - Trailing arrow icon
 *
 * Design System §21 — Tertiary action (supporting, not primary).
 * Conversion Goals §16 — No dead links; destination must exist.
 */
export interface AboutActionsProps {
  className?: string;
}

export function AboutActions({ className }: AboutActionsProps) {
  return (
    <div className={cn(className)}>
      <Link
        href={aboutCta.destination}
        variant="inline"
        className="inline-flex items-center gap-2 text-body font-medium"
      >
        {aboutCta.label}
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </div>
  );
}
