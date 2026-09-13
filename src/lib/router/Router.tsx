import { useRoute } from './useRoute';
import type { RouteProps, RouterProps } from './types';

/**
 * Tiny hash-based router — Thapelo Magqazana Engineering Portfolio
 *
 * Why hash routing:
 *   - Works on any static host with no server config
 *   - Zero dependencies (NFR-010)
 *   - Deep-linkable without a 404 redirect
 *
 * Routes:
 *   #/            → HomePage
 *   #/work/qinis  → QinisPage
 *
 * Not a general-purpose router. If the site grows past ~5 routes
 * or needs nested layouts with data loaders, replace with
 * react-router-dom.
 *
 * This file exports only components. The `useRoute` hook and
 * shared types live in ./useRoute.ts and ./types.ts so Fast
 * Refresh continues to work.
 */

/**
 * Route — declarative marker for a route entry.
 *
 * Currently a passthrough; Router reads the `path` from the
 * routes array directly. Kept as a component so future
 * integrations (nested routes, layouts) can build on it.
 */
export function Route({ children }: RouteProps) {
  return <>{children}</>;
}

export function Router({ routes, fallback }: RouterProps) {
  const path = useRoute();

  const match = routes.find((r) => r.path === path);
  if (match) return <>{match.element}</>;
  if (fallback) return <>{fallback}</>;

  return (
    <div className="grid min-h-dvh place-items-center p-8">
      <div className="text-center">
        <p className="text-label mb-4">404</p>
        <h1 className="text-h2">Page not found</h1>
        <a href="#/" className="text-accent mt-6 inline-block">
          Back to home
        </a>
      </div>
    </div>
  );
}
