/**
 * cn — conditional className composition.
 *
 * Accepts any mix of strings, falsy values and objects where
 * keys are class names and values are booleans.
 *
 * @example
 *   cn('btn', isPrimary && 'btn-primary')          // "btn btn-primary"
 *   cn('btn', { 'btn-active': isActive })          // "btn btn-active" | "btn"
 *
 * Design System §54 — Visual, Responsive, Keyboard, Focus,
 * Reduced Motion, Semantic, Content, Performance.
 */

/** A record of class names to boolean conditions. */
export type ClassNameMap = { readonly [key: string]: boolean };

/** Any value cn can accept. */
export type ClassValue =
  string | number | boolean | null | undefined | ClassNameMap;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      out.push(String(input));
      continue;
    }

    if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) out.push(key);
      }
    }
  }

  return out.join(' ');
}
