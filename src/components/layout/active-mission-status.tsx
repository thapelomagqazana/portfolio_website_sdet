"use client";

import { getMissionStatusBySectionId } from "@/data/mission-status";
import { useActiveSection } from "@/hooks/use-active-section";

export type ActiveMissionStatusProps = {
  readonly sectionIds: readonly string[];
};

/**
 * Displays the live mission status based on the active page section.
 */
export function ActiveMissionStatus({ sectionIds }: ActiveMissionStatusProps) {
  const activeSectionId = useActiveSection(sectionIds);
  const status = getMissionStatusBySectionId(activeSectionId);

  return (
    <div
      aria-label="Active mission status"
      className="border-accent-green/30 bg-accent-green/10 rounded-full border px-3 py-2"
    >
      <p className="text-accent-green font-mono text-xs uppercase">● {status.label}</p>
      <p className="text-text-secondary hidden font-mono text-[10px] lg:block">{status.detail}</p>
    </div>
  );
}
