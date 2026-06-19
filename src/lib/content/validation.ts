import { contentLengthGuidelines } from "@/data/content-guidelines";

/**
 * Returns true when a string contains visible text.
 */
export function hasContent(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Returns all empty string paths inside a nested object.
 */
export function findEmptyStringPaths(value: unknown, prefix = "root"): string[] {
  const emptyPaths: string[] = [];

  if (typeof value === "string") {
    if (!hasContent(value)) emptyPaths.push(prefix);
    return emptyPaths;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      emptyPaths.push(...findEmptyStringPaths(item, `${prefix}[${index}]`));
    });
    return emptyPaths;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, nestedValue]) => {
      emptyPaths.push(...findEmptyStringPaths(nestedValue, `${prefix}.${key}`));
    });
  }

  return emptyPaths;
}

/**
 * Checks whether a CTA-like object has a label and href.
 */
export function ctaIsComplete(cta: { readonly label?: string; readonly href?: string }): boolean {
  return Boolean(cta.label?.trim()) && Boolean(cta.href?.trim());
}

/**
 * Checks whether a paragraph is within the recommended length.
 */
export function paragraphLengthIsValid(value: string): boolean {
  return value.length <= contentLengthGuidelines.paragraphMax;
}

/**
 * Escapes Markdown-sensitive pipe characters for table-safe usage.
 */
export function escapeMarkdownTableText(value: string): string {
  return value.replace(/\|/g, "\\|");
}

/**
 * Checks for raw script tags in content.
 */
export function containsUnsafeHtml(value: string): boolean {
  return /<\s*script/i.test(value);
}
