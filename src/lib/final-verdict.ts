import type { FinalVerdict, VerdictStage } from "@/data/final-verdict";

export function getVerdictStageLabel(stage: VerdictStage | string): string {
  const labels: Record<VerdictStage, string> = {
    mission: "Mission",
    evidence: "Evidence",
    quality: "Quality",
    confidence: "Confidence",
    approved: "Approved",
  };

  return labels[stage as VerdictStage] ?? "Unknown";
}

export function verdictStageIsRenderable(stage: FinalVerdict): boolean {
  return (
    stage.stage.trim().length > 0 &&
    stage.label.trim().length > 0 &&
    stage.description.trim().length > 0
  );
}

export function getStageProgressPercent(index: number, total: number): number {
  if (total <= 1) return 100;

  const safeIndex = Math.min(Math.max(index, 0), total - 1);
  return Math.round((safeIndex / (total - 1)) * 100);
}

export function finalVerdictStagesAreValid(stages: readonly FinalVerdict[]): boolean {
  const seen = new Set<string>();

  for (const stage of stages) {
    if (!verdictStageIsRenderable(stage)) return false;
    if (seen.has(stage.stage)) return false;

    seen.add(stage.stage);
  }

  return stages.length > 0;
}
