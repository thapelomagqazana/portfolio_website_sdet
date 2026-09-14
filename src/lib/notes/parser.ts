/**
 * Minimal Markdown parser.
 *
 * Supports the subset used by Engineering Notes:
 *   - # ## ### headings
 *   - paragraphs
 *   - - unordered lists
 *   - 1. ordered lists
 *   - ``` fenced code blocks
 *   - `inline code`
 *   - **bold** and *italic*
 *   - [text](url) links
 *   - > blockquotes
 *   - --- horizontal rules
 *
 * Not a general-purpose CommonMark parser. If a note needs
 * syntax beyond this subset, extend the parser — do not switch
 * to a heavyweight dependency. NFR-010: minimal dependencies.
 *
 * Output is an array of block nodes. Inline content is stored
 * as raw strings and rendered by Markdown.tsx which handles
 * the inline syntax safely (no dangerouslySetInnerHTML).
 */

export type BlockNode =
  | { kind: 'heading'; level: 1 | 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'unordered-list'; items: string[] }
  | { kind: 'ordered-list'; items: string[] }
  | { kind: 'blockquote'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'divider' };

export function parseMarkdown(source: string): BlockNode[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: BlockNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    // Blank line → skip
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i]!.startsWith('```')) {
        codeLines.push(lines[i]!);
        i += 1;
      }
      i += 1; // consume closing fence
      blocks.push({ kind: 'code', text: codeLines.join('\n') });
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      blocks.push({ kind: 'divider' });
      i += 1;
      continue;
    }

    // Headings
    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1]!.length as 1 | 2 | 3;
      blocks.push({ kind: 'heading', level, text: headingMatch[2]!.trim() });
      i += 1;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i]!.startsWith('> ')) {
        quoteLines.push(lines[i]!.slice(2));
        i += 1;
      }
      blocks.push({ kind: 'blockquote', text: quoteLines.join(' ').trim() });
      continue;
    }

    // Unordered list
    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^-\s+/, '').trim());
        i += 1;
      }
      blocks.push({ kind: 'unordered-list', items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\d+\.\s+/, '').trim());
        i += 1;
      }
      blocks.push({ kind: 'ordered-list', items });
      continue;
    }

    // Paragraph — collect consecutive non-blank lines that
    // don't start another block.
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i]!.trim() !== '' &&
      !lines[i]!.startsWith('#') &&
      !lines[i]!.startsWith('> ') &&
      !lines[i]!.startsWith('```') &&
      !/^-\s+/.test(lines[i]!) &&
      !/^\d+\.\s+/.test(lines[i]!) &&
      !/^---+$/.test(lines[i]!.trim())
    ) {
      paragraphLines.push(lines[i]!);
      i += 1;
    }
    if (paragraphLines.length > 0) {
      blocks.push({ kind: 'paragraph', text: paragraphLines.join(' ').trim() });
    }
  }

  return blocks;
}
