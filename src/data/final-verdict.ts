/**
 * Final verdict data.
 *
 * This module centralizes the final portfolio conclusion. The copy is written
 * as an engineering release pipeline: mission, evidence, quality, confidence,
 * and final approval.
 */

export type VerdictStage = "mission" | "evidence" | "quality" | "confidence" | "approved";

export type FinalVerdict = {
  readonly stage: VerdictStage;
  readonly label: string;
  readonly description: string;
};

export const finalVerdictCopy = {
  eyebrow: "Final Verdict",
  heading: "Engineering evidence complete. Release confidence approved.",
  narrative:
    "From source code to release decisions, every engineering signal has been transformed into measurable confidence. This is Release Confidence Infrastructure.",
  gateProduct: "BRIKBYTEOS",
  gateLabel: "FINAL QUALITY GATE",
  verdict: "APPROVED",
  confidence: "97.3%",
  confidenceLabel: "Release Confidence",
  detail: "Evidence Verified",
  releaseVerdict: "SAFE TO SHIP",
  releaseChecks: [
    "Engineering Evidence Complete",
    "Quality Gates Passed",
    "Automation Verified",
    "Security Verified",
    "Performance Verified",
  ],
  signatureLead: "Designed. Engineered. Tested. Released.",
  signatureName: "Thapelo Magqazana",
  ctaHeading: "Ready to build your next release with confidence?",
  primaryCta: {
    label: "Start a Mission",
    href: "#mission-request",
  },
  secondaryCta: {
    label: "View BrikByteOS",
    href: "#brikbyteos",
  },
} as const;

export const finalVerdictStages: readonly FinalVerdict[] = [
  {
    stage: "mission",
    label: "Engineering Mission",
    description: "Every software journey begins with a clearly defined engineering objective.",
  },
  {
    stage: "evidence",
    label: "Evidence Collected",
    description: "Testing, security, performance, and observability produce trustworthy signals.",
  },
  {
    stage: "quality",
    label: "Quality Evaluated",
    description: "Scattered engineering evidence becomes measurable release confidence.",
  },
  {
    stage: "confidence",
    label: "Release Confidence",
    description: "Engineering decisions become repeatable, measurable, and explainable.",
  },
  {
    stage: "approved",
    label: "APPROVED",
    description: "Evidence supports a safe release decision.",
  },
] as const;
