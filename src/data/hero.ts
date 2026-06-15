/**
 * One call-to-action link displayed in the Hero section.
 */
export type HeroCallToAction = {
  readonly label: string;
  readonly href: `#${string}`;
};

/**
 * Centralized Hero copy.
 *
 * Keep this content outside the component so future copy changes do not require
 * layout/component edits.
 */
export const heroContent = {
  eyebrow: "SDET Portfolio v2.0",
  name: "Thapelo Magqazana",
  headline: "Building Confidence Into Every Release",
  subheadline:
    "Software Development Engineer in Test focused on quality engineering, automation, and release confidence systems.",
  brikByteLine: "Creator of BrikByteOS — Release Confidence Infrastructure.",
  proofLine: "Software should not ship by assumption. It should ship by evidence.",
  primaryCta: {
    label: "Explore BrikByteOS",
    href: "#brikbyteos",
  },
  secondaryCta: {
    label: "View Engineering Projects",
    href: "#projects",
  },
  badges: ["SDET", "Quality Engineer", "Test Automation", "Release Engineering"],
} as const;

/**
 * One release-dashboard metric displayed on the Hero right panel.
 */
export type HeroMetric = {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
};

/**
 * Centralized Hero dashboard metrics.
 *
 * These values are intentionally data-driven so WBS 5.x animation work can
 * animate the same data without duplicating metric copy.
 */
export const heroMetrics: readonly HeroMetric[] = [
  {
    label: "Tests Passed",
    value: "98.7%",
    detail: "Automated quality signal",
  },
  {
    label: "Deployment Confidence",
    value: "92%",
    detail: "Release readiness score",
  },
  {
    label: "Security Score",
    value: "A+",
    detail: "No critical blockers",
  },
  {
    label: "Automation Coverage",
    value: "85%",
    detail: "Regression confidence",
  },
] as const;

/**
 * Static Hero dashboard status copy.
 */
export const heroDashboardStatus = {
  label: "QUALITY GATE",
  verdict: "APPROVED",
  detail: "Evidence Bundle Ready",
  pipeline: ["Tests", "Security", "Performance", "Evidence", "Policy"],
} as const;
