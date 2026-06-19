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
 * This keeps personal positioning, role, mission, and engineering philosophy
 * outside the UI component so copy changes do not require layout changes.
 */
export const engineerDossier = {
  eyebrow: "Mission Profile",
  name: "Thapelo Magqazana",
  role: "Software Development Engineer in Test",
  positioning:
    "Quality engineer focused on automation, release confidence, and evidence-driven delivery.",
  identity:
    "Systems-oriented Software Development Engineer in Test focused on quality engineering, release engineering, test automation, and developer productivity.",
  mission: "I build systems that prove software is ready to ship.",
  location: "South Africa",
  narrative:
    "I believe software quality should be measurable, explainable, and repeatable. Rather than treating testing as the final stage of delivery, I design engineering systems that continuously collect, normalize, and evaluate evidence so teams can release software with confidence.",
  philosophy:
    "Good software engineering does not only build features. It builds the confidence to change, test, release, and improve software without guessing.",
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
    value: "Test automation, release engineering, software testing, and quality gates",
  },
  {
    label: "Flagship System",
    value: "BrikByteOS — Release Confidence Infrastructure",
  },
  {
    label: "Engineering Bias",
    value: "Evidence over assumptions",
  },
  {
    label: "Delivery Focus",
    value: "Continuous integration, measurable quality signals, and developer productivity",
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
  "I believe release confidence should be engineered through evidence, not guessed through meetings.",
] as const;
