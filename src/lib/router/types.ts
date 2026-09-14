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
   *   "/"               → home
   *   "/work/qinis"     → QINIS case study
   *   "/insights/:slug" → note detail page (dynamic segment)
   *
   * A single dynamic segment is supported, identified by a
   * leading colon (e.g. `:slug`). Matching is otherwise exact.
   */
  path: string;
  /** Content rendered when the route matches. */
  children: ReactNode;
}

/**
 * RouteMatch — parameters extracted from a dynamic route.
 *
 *   Pattern:  "/insights/:slug"
 *   Path:     "/insights/qinis-lessons"
 *   Params:   { slug: "qinis-lessons" }
 *
 * The router passes this object to each route's `element`
 * render function.
 */
export type RouteParams = Record<string, string>;

/**
 * RouteElement — the render function for a route.
 *
 * Called with the matched params (empty object when the path
 * has no dynamic segments). Returns the React tree to render.
 *
 * Using a function instead of a `ReactNode` allows dynamic
 * routes to receive their params without the router needing
 * to know about React state.
 */
export type RouteElement = (params: RouteParams) => ReactNode;

/**
 * RouterProps — props for the top-level `<Router>`.
 */
export interface RouterProps {
  /**
   * All routes the router can render. Order matters: the
   * first match wins. Place exact paths before dynamic
   * segments that would otherwise swallow them.
   *
   *   ✓ Good order:
   *     "/"
   *     "/work/qinis"
   *     "/work/brikbyteos"
   *     "/insights"
   *     "/insights/:slug"
   *
   *   ✗ Bad order:
   *     "/insights/:slug"   ← would match "/insights"
   *     "/insights"
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
  /**
   * Route path, e.g. "/work/qinis" or "/insights/:slug".
   *
   * Segments beginning with `:` are dynamic and their values
   * are passed to `element` as params.
   */
  path: string;
  /**
   * Render function called when the path matches. Receives
   * the extracted params (empty object for static routes).
   */
  element: RouteElement;
}
