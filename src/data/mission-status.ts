/**
 * One mission status shown in the Command Deck Navbar.
 */
export type MissionStatus = {
  readonly sectionId: string;
  readonly label: string;
  readonly detail: string;
};

/**
 * Centralized mapping between page sections and command-deck status.
 */
export const missionStatuses: readonly MissionStatus[] = [
  { sectionId: "hero", label: "Initializing", detail: "Command Center Online" },
  { sectionId: "quality-metrics", label: "Evaluating", detail: "Quality Signals Active" },
  { sectionId: "about", label: "Profiling", detail: "Mission Profile Loaded" },
  { sectionId: "skills", label: "Scanning", detail: "Capability Matrix Active" },
  { sectionId: "brikbyteos", label: "Orchestrating", detail: "Release Engine Active" },
  { sectionId: "projects", label: "Inspecting", detail: "Evidence Review Active" },
  { sectionId: "experience", label: "Tracing", detail: "Mission Logs Active" },
  { sectionId: "blog", label: "Analyzing", detail: "Engineering Notes Active" },
  { sectionId: "contact", label: "Approved", detail: "Ready For Contact" },
] as const;

/**
 * Default mission status used when section lookup fails.
 */
export const defaultMissionStatus = missionStatuses[0];

/**
 * Resolves mission status by section ID.
 *
 * Unknown, empty, or whitespace-only section IDs safely fall back to the
 * default hero status.
 */
export function getMissionStatusBySectionId(sectionId: string): MissionStatus {
  const normalizedSectionId = sectionId.trim();

  if (!normalizedSectionId) {
    return defaultMissionStatus;
  }

  return (
    missionStatuses.find((status) => status.sectionId === normalizedSectionId) ??
    defaultMissionStatus
  );
}

/**
 * Section IDs used by the active-section observer.
 */
export const missionSectionIds = missionStatuses.map((status) => status.sectionId);
