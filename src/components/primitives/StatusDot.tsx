import { cn } from '@/lib/cn';

/**
 * StatusDot — small semantic status indicator.
 *
 * Design System §30 — Status must communicate real states.
 * Never use purely decorative status colours.
 */
export type StatusTone = 'neutral' | 'success' | 'warning' | 'error';

export interface StatusDotProps {
  tone?: StatusTone;
  /** Accessible label. Required — status must be readable by screen readers. */
  label: string;
  className?: string;
}

const toneClass: Record<StatusTone, string> = {
  neutral: 'bg-foreground-subtle',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

export function StatusDot({
  tone = 'neutral',
  label,
  className,
}: StatusDotProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block h-2 w-2 rounded-full',
        toneClass[tone],
        className,
      )}
    />
  );
}
