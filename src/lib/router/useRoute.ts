import { useSyncExternalStore } from 'react';

/**
 * useRoute — current normalized route path.
 *
 * Only hashes that begin with "#/" are treated as routes.
 * Plain anchors like "#career" or "#about" are in-page
 * navigation — they leave the current route mounted while the
 * browser handles scroll-to-element natively.
 *
 * Route examples:
 *   "#/"             →  "/"
 *   "#/work/qinis"   →  "/work/qinis"
 *
 * Non-route examples (in-page anchors):
 *   "#career"        →  "/"   (router stays on home)
 *   "#top"           →  "/"   (router stays on home)
 *   ""               →  "/"   (initial load)
 *
 * Subscribes via useSyncExternalStore so React re-renders on
 * hashchange without manual effect wiring.
 *
 * Separated from Router.tsx so Router.tsx can export only
 * components (react-refresh/only-export-components).
 */

/**
 * Normalize the current hash to a leading-slash path.
 *
 * Rules:
 *   - Empty hash                     → "/"
 *   - Hash starts with "/"           → the hash itself
 *   - Hash does NOT start with "/"   → "/"  (in-page anchor)
 */
export function getRouteSnapshot(): string {
  if (typeof window === 'undefined') return '/';

  const hash = window.location.hash.replace(/^#/, '');

  // Only "#/..." is a route. "#anchor" is an in-page scroll
  // handled by the browser — the router must not react to it.
  if (hash === '' || !hash.startsWith('/')) return '/';

  return hash;
}

function subscribe(listener: () => void): () => void {
  window.addEventListener('hashchange', listener);
  return () => window.removeEventListener('hashchange', listener);
}

/** Server-render snapshot — always "/". */
function getServerSnapshot(): string {
  return '/';
}

export function useRoute(): string {
  return useSyncExternalStore(subscribe, getRouteSnapshot, getServerSnapshot);
}
