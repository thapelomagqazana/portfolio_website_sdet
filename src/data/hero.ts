/**
 * Hero section content model.
 *
 * This file is the single source of truth for the portfolio hero section.
 * It separates identity, positioning, CTAs, metrics, dashboard copy, social
 * proof, and SEO keywords so the UI can evolve without hardcoding content.
 */

export type HeroCallToAction = Readonly<{
  readonly label: string;
  readonly href: `#${string}`;
  readonly analyticsId: string;
}>;

export type HeroMetric = Readonly<{
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}>;

export const heroIdentity = {
  name: "Thapelo Magqazana",
  role: "Software Development Engineer in Test",
  shortRole: "SDET",
  location: "South Africa",
} as const;

export const heroContent = {
  eyebrow: "SDET Portfolio v2.0",
  headline: "Building Confidence Into Every Release",
  positioning:
    "Software Development Engineer in Test specializing in Quality Engineering, Test Automation, Release Engineering, and Release Confidence Infrastructure.",
  description:
    "I design engineering systems that collect, normalize, and evaluate software quality evidence so teams can release software with measurable confidence.",
  brikByteLine: "Creator of BrikByteOS — Release Confidence Infrastructure.",
  proofLine: "Software should not ship by assumption. It should ship by evidence.",
  engineeringPhilosophy:
    "Quality is not the end of software delivery — it is an architectural capability.",
  evidenceStatement:
    "Engineering decisions should be supported by measurable evidence rather than assumptions.",
  primaryCta: {
    label: "Explore BrikByteOS",
    href: "#brikbyteos",
    analyticsId: "hero-primary-brikbyteos",
  },
  secondaryCta: {
    label: "View Engineering Projects",
    href: "#projects",
    analyticsId: "hero-secondary-projects",
  },
} as const;

export const heroSocialProof = [
  "Quality Engineering",
  "Test Automation",
  "Release Engineering",
  "Developer Productivity",
] as const;

export const heroBadges = [
  "SDET",
  "Quality Engineer",
  "Test Automation",
  "Release Engineering",
] as const;

export const heroSeoKeywords = [
  "Software Development Engineer in Test",
  "Quality Engineering",
  "Test Automation",
  "Release Engineering",
  "Release Confidence",
  "BrikByteOS",
  "Quality Gates",
  "Software Testing",
  "Continuous Integration",
  "Developer Productivity",
  "Engineering Systems",
] as const;

export const heroMetrics: readonly HeroMetric[] = [
  {
    label: "Primary Discipline",
    value: "SDET",
    detail: "Quality Engineering",
  },
  {
    label: "Engineering Focus",
    value: "Release Confidence",
    detail: "Evidence-driven delivery",
  },
  {
    label: "Core Product",
    value: "BrikByteOS",
    detail: "Release Confidence Infrastructure",
  },
  {
    label: "Approach",
    value: "Systems Thinking",
    detail: "Automation-first engineering",
  },
] as const;

export const heroDashboardStatus = {
  label: "ENGINEERING MISSION",
  verdict: "ACTIVE",
  detail: "Building Release Confidence Infrastructure",
  pipeline: ["Testing", "Evidence", "Quality Gates", "Automation", "Release Confidence"],
} as const;
