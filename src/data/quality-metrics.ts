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

/**
 * Metrics used by the Quality Confidence Dashboard section.
 *
 * These are separated from the generic qualityMetrics list so the section can
 * evolve independently without breaking other consumers of the metrics engine.
 */
export const confidenceDashboardMetrics: readonly QualityMetric[] = [
  {
    id: "quality-confidence",
    label: "Quality Confidence",
    value: 97.3,
    suffix: "%",
    description: "Evidence-backed confidence that the release is safe.",
  },
  {
    id: "automation-coverage",
    label: "Automation Coverage",
    value: 85,
    suffix: "%",
    description: "Regression safety supported by automated checks.",
  },
  {
    id: "security-health",
    label: "Security Health",
    value: 94,
    suffix: "%",
    description: "Critical risks monitored before release decisions.",
  },
  {
    id: "evidence-integrity",
    label: "Evidence Integrity",
    value: 98,
    suffix: "%",
    description: "Trustworthiness of normalized quality evidence.",
  },
] as const;

/**
 * Centralized section copy for the Quality Metrics dashboard.
 */
export const qualityMetricsSectionCopy = {
  eyebrow: "Quality Metrics",
  heading: "Confidence Dashboard",
  description: "Quality signals translated into release intelligence.",
  narrativeTitle: "Evidence-driven delivery",
  narrative:
    "Every score represents a decision signal: tests, automation, security posture, evidence integrity, and release readiness.",
} as const;
