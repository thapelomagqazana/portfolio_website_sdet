/**
 * Front-matter parser.
 *
 * Splits the leading `---` block from the body and parses it
 * into key-value pairs. Supports:
 *   - string values: key: value
 *   - number values: key: 42
 *   - array values: key: [a, b, c]
 *   - date values: parsed as ISO strings (not Date objects)
 *
 * Front-matter is intentionally simple — a full YAML parser
 * would be a heavier dependency than the notes system needs
 * (NFR-010).
 */

export interface FrontmatterResult {
  /** Parsed key-value pairs. */
  data: Record<string, unknown>;
  /** Body with front-matter stripped. */
  body: string;
}

export function parseFrontmatter(source: string): FrontmatterResult {
  const normalized = source.replace(/\r\n/g, '\n');

  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized };
  }

  const endIndex = normalized.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return { data: {}, body: normalized };
  }

  const frontmatter = normalized.slice(4, endIndex);
  const body = normalized.slice(endIndex + 5);

  const data: Record<string, unknown> = {};

  for (const rawLine of frontmatter.split('\n')) {
    const line = rawLine.trim();
    if (line === '' || line.startsWith('#')) continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    data[key] = parseValue(rawValue);
  }

  return { data, body };
}

function parseValue(raw: string): unknown {
  // Array: [a, b, c]
  if (raw.startsWith('[') && raw.endsWith(']')) {
    return raw
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter((s) => s.length > 0);
  }

  // Quoted string
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }

  // Number
  const asNumber = Number(raw);
  if (!Number.isNaN(asNumber) && raw !== '') return asNumber;

  // Unquoted string
  return raw;
}
