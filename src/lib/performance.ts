/**
 * Central performance configuration.
 *
 * This file defines portfolio-wide performance budgets, loading priorities,
 * image rules, and resource strategy constants.
 */

export type ResourcePriority = "critical" | "high" | "normal" | "deferred";

export type PerformanceBudget = {
  readonly initialJsKbGzip: number;
  readonly initialCssKb: number;
  readonly heroImageKb: number;
  readonly largestImageKb: number;
  readonly initialRequests: number;
  readonly lcpMs: number;
  readonly inpMs: number;
  readonly cls: number;
};

export const performanceBudget: PerformanceBudget = {
  initialJsKbGzip: 170,
  initialCssKb: 40,
  heroImageKb: 180,
  largestImageKb: 300,
  initialRequests: 25,
  lcpMs: 2500,
  inpMs: 200,
  cls: 0.1,
} as const;

export const criticalSectionIds = ["hero", "mission"] as const;

export const deferredSectionIds = [
  "skills",
  "brikbyteos",
  "projects",
  "experience",
  "engineering-intelligence",
  "contact",
  "footer",
] as const;

export const imageSizes = {
  hero: "(max-width: 768px) 100vw, 50vw",
  card: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  full: "100vw",
} as const;

/**
 * Returns true when a section should be loaded immediately.
 */
export function isCriticalSection(sectionId: string): boolean {
  return criticalSectionIds.includes(sectionId as (typeof criticalSectionIds)[number]);
}

/**
 * Returns true when a section should be lazily loaded.
 */
export function isDeferredSection(sectionId: string): boolean {
  return deferredSectionIds.includes(sectionId as (typeof deferredSectionIds)[number]);
}

/**
 * Resolves the correct loading strategy for images.
 */
export function getImagePriority(sectionId: string): {
  readonly priority: boolean;
  readonly loading: "eager" | "lazy";
} {
  if (isCriticalSection(sectionId)) {
    return { priority: true, loading: "eager" };
  }

  return { priority: false, loading: "lazy" };
}

/**
 * Guards against invalid image dimensions.
 */
export function imageHasValidDimensions(width: number, height: number): boolean {
  return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0;
}
