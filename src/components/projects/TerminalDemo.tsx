import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';
import { brikbyteTerminal } from '@/content/brikbyteos';
import type { TerminalLine } from '@/content/brikbyteos';

/**
 * TerminalDemo — the BrikByteOS terminal moment.
 *
 * Motion (P22 effect 9):
 *   The reveal ref and the `data-terminal` marker live on the
 *   same element (the <code>). motion.css reads
 *   `[data-terminal][data-revealed='true'] [data-terminal-line]`
 *   to fade the lines in sequence.
 *
 *   Under reduced motion, all lines render immediately.
 */
export interface TerminalDemoProps {
  className?: string;
  'aria-label'?: string;
}

export function TerminalDemo({
  className,
  'aria-label': ariaLabel = 'BrikByteOS terminal output',
}: TerminalDemoProps) {
  // The observer must watch the same element that carries
  // data-terminal. See motion.css for the exact selector.
  const codeRef = useReveal<HTMLElement>();

  return (
    <div
      role="figure"
      aria-label={ariaLabel}
      className={cn(
        'rounded-md border border-border bg-surface overflow-hidden',
        className,
      )}
    >
      {/* Terminal chrome */}
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

      {/* Terminal body — the <code> carries both data-terminal
          and the reveal ref, so the CSS selector matches. */}
      <pre className="overflow-x-auto p-4 font-mono text-mono leading-relaxed">
        <code ref={codeRef} data-terminal>
          {brikbyteTerminal.map((line, i) => (
            <span
              key={`${line.kind}-${i}`}
              data-terminal-line
              style={{ '--line-index': i } as CSSProperties}
              className="block"
            >
              <TerminalRow line={line} />
            </span>
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

  return (
    <span className="mt-2 block">
      <span className="font-semibold text-success">{line.text}</span>
      {'\n'}
    </span>
  );
}
