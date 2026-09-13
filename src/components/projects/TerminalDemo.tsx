import { cn } from '@/lib/cn';
import { brikbyteTerminal } from '@/content/brikbyteos';
import type { TerminalLine } from '@/content/brikbyteos';

/**
 * TerminalDemo — the BrikByteOS terminal moment.
 *
 * Task P8-07:
 *   $ bb run
 *   ✓ Tests
 *   ✓ Security
 *   ✓ Quality
 *   ✓ Evidence
 *   RELEASE: PASS
 *
 * Design System §28 — BrikByteOS uses a terminal moment.
 * Design System §32 — Motion is progressive enhancement.
 * Design System §34 — Respect prefers-reduced-motion.
 *
 * The terminal is fully readable with no animation. Every
 * line is present in the DOM at first paint; a future
 * enhancement could type them in, but the static version
 * is the baseline, not a fallback.
 */
export interface TerminalDemoProps {
  className?: string;
  /** Optional aria-label override. */
  'aria-label'?: string;
}

export function TerminalDemo({
  className,
  'aria-label': ariaLabel = 'BrikByteOS terminal output',
}: TerminalDemoProps) {
  return (
    <div
      role="figure"
      aria-label={ariaLabel}
      className={cn(
        'rounded-md border border-border bg-surface overflow-hidden',
        className,
      )}
    >
      {/* Terminal chrome — window dots + title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 rounded-full bg-error/70"
        />
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 rounded-full bg-warning/70"
        />
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 rounded-full bg-success/70"
        />
        <span className="ml-3 font-mono text-mono text-foreground-subtle">
          brikbyteos
        </span>
      </div>

      {/* Terminal body */}
      <pre className="overflow-x-auto p-4 font-mono text-mono leading-relaxed">
        <code>
          {brikbyteTerminal.map((line, i) => (
            <TerminalRow key={`${line.kind}-${i}`} line={line} />
          ))}
        </code>
      </pre>
    </div>
  );
}

interface TerminalRowProps {
  line: TerminalLine;
}

function TerminalRow({ line }: TerminalRowProps) {
  if (line.kind === 'command') {
    return (
      <span className="block">
        <span aria-hidden="true" className="text-foreground-subtle select-none">
          ${' '}
        </span>
        <span className="text-foreground">{line.text}</span>
        {'\n'}
      </span>
    );
  }

  if (line.kind === 'success') {
    return (
      <span className="block">
        <span aria-hidden="true" className="text-success select-none">
          ✓{' '}
        </span>
        <span className="text-foreground-muted">{line.text}</span>
        {'\n'}
      </span>
    );
  }

  // decision
  return (
    <span className="mt-2 block">
      <span className="font-semibold text-success">{line.text}</span>
      {'\n'}
    </span>
  );
}
