/**
 * One operator profile row in the Mission Profile section.
 */
export type OperatorProfileItem = {
  readonly label: string;
  readonly value: string;
};

/**
 * Centralized engineer dossier identity data.
 *
 * This keeps personal positioning, role, and mission language out of the UI
 * component so copy changes do not require layout changes.
 */
export const engineerDossier = {
  eyebrow: "Mission Profile",
  name: "Thapelo Magqazana",
  role: "Software Development Engineer in Test",
  positioning:
    "Quality engineer focused on automation, release confidence, and evidence-driven delivery.",
  mission: "I build systems that prove software is ready to ship.",
  location: "South Africa",
} as const;

/**
 * Structured operator profile rows.
 *
 * The wording is intentionally specific so the section feels like an engineering
 * dossier rather than a generic about-me profile.
 */
export const operatorProfileItems: readonly OperatorProfileItem[] = [
  {
    label: "Primary Function",
    value: "SDET / Quality Engineer",
  },
  {
    label: "Operating Domain",
    value: "Test automation, release engineering, and quality gates",
  },
  {
    label: "Flagship System",
    value: "BrikByteOS — Release Confidence Infrastructure",
  },
  {
    label: "Engineering Bias",
    value: "Evidence over assumptions",
  },
] as const;

/**
 * Engineering posture statements.
 *
 * These explain how Thapelo thinks about quality, risk, automation,
 * maintainability, and release confidence.
 */
export const engineeringPosture = [
  "I treat quality as an engineering system, not a final checklist.",
  "I prefer measurable evidence over optimistic release opinions.",
  "I build automation that reduces repeat work and improves decision confidence.",
  "I care about developer experience, production safety, and maintainable delivery systems.",
] as const;
