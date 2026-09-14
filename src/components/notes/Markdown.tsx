import { parseMarkdown, type BlockNode } from '@/lib/notes';
import { cn } from '@/lib/cn';

/**
 * Markdown — renders parsed blocks as React elements.
 *
 * No HTML is injected. Every node is a real React element, so
 * the article body cannot introduce XSS even if a note is
 * edited by an untrusted source.
 *
 * Inline formatting (**bold**, *italic*, `code`, [links]) is
 * handled by renderInline, which also returns React elements.
 */
export interface MarkdownProps {
  source: string;
  className?: string;
}

export function Markdown({ source, className }: MarkdownProps) {
  const blocks = parseMarkdown(source);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

interface BlockProps {
  block: BlockNode;
}

function Block({ block }: BlockProps) {
  switch (block.kind) {
    case 'heading': {
      const Tag = block.level === 1 ? 'h1' : block.level === 2 ? 'h2' : 'h3';
      const cls =
        block.level === 1
          ? 'text-h2 text-foreground'
          : block.level === 2
            ? 'text-h3 text-foreground mt-8'
            : 'text-h4 text-foreground mt-6';
      return <Tag className={cls}>{renderInline(block.text)}</Tag>;
    }

    case 'paragraph':
      return (
        <p className="text-body text-foreground-muted leading-relaxed">
          {renderInline(block.text)}
        </p>
      );

    case 'unordered-list':
      return (
        <ul className="flex flex-col gap-2 pl-6">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-body text-foreground-muted leading-relaxed list-disc"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );

    case 'ordered-list':
      return (
        <ol className="flex flex-col gap-2 pl-6">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-body text-foreground-muted leading-relaxed list-decimal"
            >
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );

    case 'blockquote':
      return (
        <blockquote className="border-l-2 border-accent pl-6 italic text-foreground-muted">
          {renderInline(block.text)}
        </blockquote>
      );

    case 'code':
      return (
        <pre className="overflow-x-auto rounded-md border border-border bg-surface p-4 font-mono text-mono">
          <code>{block.text}</code>
        </pre>
      );

    case 'divider':
      return <hr className="border-0 h-px w-full bg-border my-4" />;
  }
}

/**
 * Inline formatting.
 *
 * Splits a string into tokens and renders each as a React node.
 * Supported: `code`, **bold**, *italic*, [text](url).
 * Order matters: code first (highest precedence), then links,
 * then bold, then italic.
 *
 * Keys are derived from the token index — deterministic and
 * safe here because the token order is stable for a given
 * input string.
 */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let index = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = /^`([^`]+)`/.exec(remaining);
    if (codeMatch) {
      nodes.push(
        <code
          key={index}
          className="rounded-sm border border-border bg-surface px-1.5 py-0.5 font-mono text-mono text-foreground"
        >
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      index += 1;
      continue;
    }

    // Link
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)/.exec(remaining);
    if (linkMatch) {
      const href = linkMatch[2]!;
      const isExternal = /^https?:\/\//.test(href);
      nodes.push(
        <a
          key={index}
          href={href}
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          {linkMatch[1]}
          {isExternal ? (
            <span className="sr-only"> (opens in a new tab)</span>
          ) : null}
        </a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      index += 1;
      continue;
    }

    // Bold
    const boldMatch = /^\*\*([^*]+)\*\*/.exec(remaining);
    if (boldMatch) {
      nodes.push(
        <strong key={index} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>,
      );
      remaining = remaining.slice(boldMatch[0].length);
      index += 1;
      continue;
    }

    // Italic
    const italicMatch = /^\*([^*]+)\*/.exec(remaining);
    if (italicMatch) {
      nodes.push(<em key={index}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      index += 1;
      continue;
    }

    // Plain text — consume up to the next special character
    const nextSpecial = remaining.search(/[`[*]/);
    if (nextSpecial === -1) {
      nodes.push(<span key={index}>{remaining}</span>);
      break;
    }
    nodes.push(<span key={index}>{remaining.slice(0, nextSpecial)}</span>);
    remaining = remaining.slice(nextSpecial);
    index += 1;
  }

  return nodes;
}
