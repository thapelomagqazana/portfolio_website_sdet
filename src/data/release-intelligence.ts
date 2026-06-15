/**
 * One release intelligence metric shown in the Hero dashboard.
 */
export type ReleaseIntelligenceMetric = {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly detail: string;
};

/**
 * Centralized release intelligence metrics.
 */
export const releaseIntelligenceMetrics: readonly ReleaseIntelligenceMetric[] = [
  {
    id: "confidence",
    label: "Confidence Score",
    value: 97,
    suffix: "%",
    detail: "Release signal strength",
  },
  {
    id: "security",
    label: "Security Score",
    value: 94,
    suffix: "%",
    detail: "No critical blockers",
  },
  {
    id: "automation",
    label: "Automation Coverage",
    value: 85,
    suffix: "%",
    detail: "Regression safety net",
  },
  {
    id: "readiness",
    label: "Release Readiness",
    value: 92,
    suffix: "%",
    detail: "Safe-to-ship estimate",
  },
] as const;

/**
 * Release intelligence summary copy.
 */
export const releaseIntelligenceSummary = {
  eyebrow: "Release Intelligence",
  postureLabel: "Safe-to-ship posture",
  postureValue: "Strong",
  evidenceLabel: "Evidence quality",
  evidenceValue: "Verified",
  verdictLabel: "Gate verdict",
  verdictValue: "Approved",
} as const;

/**
 * Clamps metric values to the visual progress range.
 */
export function clampMetricValue(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(value), 0), 100);
}
