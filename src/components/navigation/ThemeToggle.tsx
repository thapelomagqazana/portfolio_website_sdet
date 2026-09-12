import { Monitor, Moon, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/hooks/useTheme';

/**
 * ThemeToggle — three-state theme switcher.
 *
 * Task P5-03 acceptance:
 *   - Toggle between dark, light and system
 *   - Persist preference (handled by useTheme)
 *   - Accessible via keyboard
 *
 * Design System §35 — Interactive states must be visible.
 * NFR-006 — Keyboard accessible.
 *
 * Visual treatment: a segmented control with three buttons.
 * The active button uses the accent-subtle background and
 * accent foreground. Inactive buttons use muted foreground.
 */
interface Option {
  mode: ThemeMode;
  label: string;
  Icon: LucideIcon;
}

const OPTIONS: readonly Option[] = [
  { mode: 'light', label: 'Light theme', Icon: Sun },
  { mode: 'dark', label: 'Dark theme', Icon: Moon },
  { mode: 'system', label: 'System theme', Icon: Monitor },
] as const;

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-surface p-0.5',
        className,
      )}
    >
      {OPTIONS.map(({ mode: value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            aria-label={label}
            onClick={() => setMode(value)}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-sm',
              'transition-colors duration-fast ease-standard',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
              active
                ? 'bg-accent-subtle text-accent'
                : 'text-foreground-subtle hover:text-foreground',
            )}
          >
            <Icon aria-hidden="true" size={16} />
          </button>
        );
      })}
    </div>
  );
}
