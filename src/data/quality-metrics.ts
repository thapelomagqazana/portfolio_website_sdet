/**
 * One reusable quality metric.
 *
 * This model is intentionally generic so the same metric engine can power:
 * - quality dashboards
 * - hero metrics
 * - BrikByteOS showcase metrics
 * - future report visualizations
 */
export type QualityMetric = {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly description: string;
};

/**
 * Centralized quality metrics.
 */
export const qualityMetrics: readonly QualityMetric[] = [
  {
    id: "release-confidence",
    label: "Release Confidence",
    value: 97.3,
    suffix: "%",
    description: "Evidence-backed release readiness.",
  },
  {
    id: "automation-coverage",
    label: "Automation Coverage",
    value: 85,
    suffix: "%",
    description: "Regression safety supported by automated checks.",
  },
  {
    id: "security-posture",
    label: "Security Posture",
    value: 94,
    suffix: "%",
    description: "Critical security risks monitored before release.",
  },
  {
    id: "quality-gates",
    label: "Quality Gates",
    value: 6,
    suffix: "",
    description: "Decision checkpoints across the release process.",
  },
] as const;
