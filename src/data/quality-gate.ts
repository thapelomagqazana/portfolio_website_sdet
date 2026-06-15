/**
 * Centralized quality gate status copy.
 */
export const qualityGateStatus = {
  label: "BRIKBYTEOS QUALITY GATE",
  verdict: "APPROVED",
  confidence: "97.3%",
  detail: "Evidence bundle verified",
} as const;

/**
 * Signal labels shown around the quality gate visualization.
 */
export const qualityGateSignals = [
  "Tests",
  "Security",
  "Performance",
  "Evidence",
  "Policy",
] as const;

/**
 * Safe signal count for rendering staggered particles.
 */
export const qualityGateSignalCount = qualityGateSignals.length;
