import { cn } from '@/lib/cn';

/**
 * Divider — subtle structural rule.
 *
 * Design System §16 — 1px solid border, low contrast.
 */
export interface DividerProps {
  /** Additional class names. */
  className?: string;
  /** Accent rule variant — used sparingly to signal structure. */
  accent?: boolean;
}

export function Divider({ className, accent = false }: DividerProps) {
  return (
    <hr
      role="separator"
      className={cn(
        'border-0 h-px w-full',
        accent ? 'bg-accent' : 'bg-border',
        className,
      )}
    />
  );
}
