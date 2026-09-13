import type { ReactNode } from 'react';

/**
 * Router types — Thapelo Magqazana Engineering Portfolio
 *
 * Shared props for the hash-based router primitives.
 *
 * Separated from Router.tsx so Router.tsx can export only
 * components (react-refresh/only-export-components). Types
 * are erased at compile time and don't count as runtime
 * exports, but keeping them in a dedicated file makes the
 * split between "components" and "everything else" explicit.
 */

/**
 * RouteProps — props for the `<Route>` marker component.
 *
 * `<Route>` is currently a passthrough; the router reads the
 * `path` from the routes array passed to `<Router>`. This
 * component exists so future versions can support nested
 * routes, layouts, and route-level metadata without a
 * breaking API change.
 */
export interface RouteProps {
  /**
   * Path this entry matches, normalized with a leading slash.
   *
   *   "/"             → home
   *   "/work/qinis"   → QINIS case study
   *
   * Matching is exact (no partial prefix matching). Add
   * wildcard support in the router if that becomes necessary.
   */
  path: string;
  /** Content rendered when the route matches. */
  children: ReactNode;
}

/**
 * RouterProps — props for the top-level `<Router>`.
 */
export interface RouterProps {
  /**
   * All routes the router can render. Order matters for any
   * future prefix-matching behaviour; today, exact matches
   * are the only supported case.
   */
  routes: RouteEntry[];
  /**
   * Element rendered when no route matches. When omitted,
   * the router falls back to a built-in 404 view.
   */
  fallback?: ReactNode;
}

/**
 * RouteEntry — a single route definition.
 *
 * Kept as a named type (not inlined into RouterProps) so it
 * can be reused by future helpers — e.g., a `routesFrom`
 * factory, or a type-level test that verifies every entry has
 * a unique path.
 */
export interface RouteEntry {
  /** Route path, e.g. "/work/qinis". */
  path: string;
  /** Element rendered when the path matches. */
  element: ReactNode;
}
