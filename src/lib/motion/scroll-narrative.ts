import { narrativeStages } from "@/data/scroll-narrative";
import type { NarrativeSection, NarrativeStage, ScrollDirection } from "@/data/scroll-narrative";

/**
 * Sorts stages by narrative order.
 */
export function sortNarrativeStages(
  stages: readonly NarrativeStage[] = narrativeStages
): readonly NarrativeStage[] {
  return [...stages].sort((a, b) => a.order - b.order);
}

/**
 * Validates narrative stages.
 */
export function narrativeStagesAreValid(stages: readonly NarrativeStage[]): boolean {
  const seen = new Set<string>();

  for (const stage of stages) {
    if (!stage.id.trim() || !stage.title.trim() || !stage.description.trim()) return false;
    if (!Number.isFinite(stage.order)) return false;
    if (seen.has(stage.id)) return false;

    seen.add(stage.id);
  }

  return stages.length > 0;
}

/**
 * Returns the active stage from a section id.
 */
export function getActiveNarrativeStage(
  sectionId: NarrativeSection | string | undefined,
  stages: readonly NarrativeStage[] = narrativeStages
): NarrativeStage | undefined {
  if (!sectionId) return undefined;
  return stages.find((stage) => stage.id === sectionId);
}

/**
 * Calculates total narrative progress from active stage order.
 */
export function getNarrativeProgress(
  sectionId: NarrativeSection | string | undefined,
  stages: readonly NarrativeStage[] = narrativeStages
): number {
  const sorted = sortNarrativeStages(stages);
  const activeIndex = sorted.findIndex((stage) => stage.id === sectionId);

  if (activeIndex < 0) return 0;
  if (sorted.length <= 1) return 100;

  return Math.round((activeIndex / (sorted.length - 1)) * 100);
}

/**
 * Calculates element visibility ratio in viewport.
 */
export function calculateSectionVisibility(rect: DOMRect, viewportHeight: number): number {
  if (viewportHeight <= 0 || rect.height <= 0) return 0;

  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(visibleBottom - visibleTop, 0);

  return Math.min(Math.max(visibleHeight / rect.height, 0), 1);
}

/**
 * Calculates scroll direction.
 */
export function calculateScrollDirection(previousY: number, currentY: number): ScrollDirection {
  if (currentY > previousY) return "down";
  if (currentY < previousY) return "up";
  return "idle";
}

/**
 * Converts section visibility into a stable reveal style.
 */
export function getSectionRevealState(visibility: number) {
  const clamped = Math.min(Math.max(visibility, 0), 1);

  return {
    opacity: Math.max(clamped, 0.2),
    y: Math.round((1 - clamped) * 18),
    scale: 0.98 + clamped * 0.02,
  };
}
