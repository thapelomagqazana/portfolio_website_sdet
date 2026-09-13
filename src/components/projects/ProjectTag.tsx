import { cn } from '@/lib/cn';

/**
 * ProjectTag — inline technical tag for a project's stack.
 *
 * Design System §42 — Real evidence over decoration.
 */
export interface ProjectTagProps {
  className?: string;
  children: string;
}

export function ProjectTag({ className, children }: ProjectTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-1',
        'font-mono text-mono text-foreground-subtle',
        'border border-border',
        className,
      )}
    >
      {children}
    </span>
  );
}
