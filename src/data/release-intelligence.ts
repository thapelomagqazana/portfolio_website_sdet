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
 * Dominant Hero KPI.
 *
 * This is the primary number visitors should notice first.
 */
export const releaseIntelligencePrimaryKpi = {
  label: "Release Confidence",
  value: 97.3,
  suffix: "%",
  verdict: "APPROVED",
  detail: "Evidence-backed safe-to-ship signal",
} as const;

/**
 * Centralized supporting release intelligence metrics.
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
 *
 * Decimals are preserved so dominant KPI values like 97.3 can render correctly.
 */
export function clampMetricValue(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), 100);
}
