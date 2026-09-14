import type { RouteParams } from './types';

/**
 * matchPath — match a route pattern against a path.
 *
 * Supports one-level dynamic segments: `/insights/:slug`.
 * Returns the extracted params when matched, or null.
 *
 * Segments beginning with `:` capture the corresponding path
 * segment. All other segments must match exactly.
 *
 * Does not support optional segments, wildcards, or nested
 * dynamic segments — those are out of scope for this router.
 */
export function matchPath(pattern: string, path: string): RouteParams | null {
  const patternSegments = pattern.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);

  if (patternSegments.length !== pathSegments.length) return null;

  const params: RouteParams = {};

  for (let i = 0; i < patternSegments.length; i++) {
    const p = patternSegments[i]!;
    const s = pathSegments[i]!;

    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(s);
      continue;
    }

    if (p !== s) return null;
  }

  return params;
}
