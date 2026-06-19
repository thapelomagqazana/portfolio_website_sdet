/**
 * Portfolio content guidelines.
 *
 * These guidelines define the engineering voice across the portfolio.
 */

export const engineeringVoiceGuidelines = {
  tone: ["Calm", "Technical", "Confident", "Evidence-based", "Precise"],
  avoid: [
    "Buzzwords",
    "Marketing hype",
    "Empty superlatives",
    "Generic résumé language",
    "Unclear claims",
  ],
  standards: [
    "Every content block answers one clear question.",
    "Paragraphs should be concise.",
    "Copy should use active voice.",
    "Technical claims should support the portfolio narrative.",
    "CTA labels should describe the action clearly.",
  ],
} as const;

export const contentLengthGuidelines = {
  shortLabelMax: 80,
  headingMax: 120,
  paragraphMax: 700,
  ctaLabelMax: 40,
} as const;
