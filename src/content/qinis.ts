/**
 * QINIS content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §11 — QINIS positioning and case study.
 * Product Brief §13 — QINIS is proof of engineering capability,
 *   not the primary brand.
 *
 * Content Rule (Content Inventory §11):
 *   Never imply QINIS has users, revenue, customers, production
 *   adoption or business outcomes unless true and documented.
 *
 * The 8 case-study sections map to P8-05:
 *   Overview, Problem, Architecture, Engineering Decisions,
 *   Quality Model, Implementation, Current Status, Lessons,
 *   Repository
 */

/* ---------- P8-01: Summary ---------- */

export const qinis = {
  id: 'qinis',
  name: 'QINIS',
  tagline:
    'Engineering intelligence for software quality and release confidence.',
  status: 'ongoing' as const,
} as const;

/* ---------- P8-02: Problem ---------- */

export const qinisProblem = {
  heading: 'The problem',
  body: 'Engineering teams generate many development and testing signals but need better ways to turn them into useful evidence and decisions. Test results, coverage, static analysis, security scans and CI output rarely converge into a single, actionable view. Quality decisions become reactive — driven by the last failing build rather than by trends across the release cycle.',
} as const;

/* ---------- P8-03: Architecture (visual) ---------- */

export interface ArchitectureStage {
  /** Stage name shown in the flow. */
  label: string;
  /** One-line description under the label. */
  detail: string;
}

export const qinisArchitecture: readonly ArchitectureStage[] = [
  { label: 'Development', detail: 'Commits, branches, pull requests' },
  { label: 'Testing', detail: 'Unit, integration, E2E, manual' },
  { label: 'Evidence', detail: 'Structured, comparable results' },
  { label: 'Quality', detail: 'Trends, thresholds, gates' },
  { label: 'Decision', detail: 'Release, hold, investigate' },
] as const;

/* ---------- P8-04: Technology ---------- */

export const qinisTech: readonly string[] = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'PostgreSQL',
  'Docker',
  'CI/CD',
] as const;

/* ---------- P8-05: Case study sections ---------- */

export interface CaseStudySection {
  id: string;
  title: string;
  body: string;
  /** Optional bullet points under the body. */
  bullets?: readonly string[];
}

export const qinisCaseStudy: readonly CaseStudySection[] = [
  {
    id: 'overview',
    title: 'Overview',
    body: 'QINIS is an ongoing engineering project exploring how quality signals across the delivery pipeline can be structured into evidence that supports release decisions. It is a personal research-and-build effort, not a commercial product.',
  },
  {
    id: 'problem',
    title: 'Problem',
    body: qinisProblem.body,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    body: 'QINIS follows an API-first architecture: a Python service exposes structured endpoints over a normalized data model, a React and TypeScript client renders the evidence view, and PostgreSQL stores the historical record. Docker and CI/CD handle build and delivery.',
  },
  {
    id: 'engineering-decisions',
    title: 'Engineering Decisions',
    body: 'A few decisions shaped the shape of the system more than others:',
    bullets: [
      'Normalize first, render later — signals are converted into a shared schema before any UI touches them.',
      'Evidence is append-only — a result once recorded is never overwritten, only superseded.',
      'Deterministic inputs over inferred heuristics — where possible, the system reads explicit signals rather than guessing.',
      'API-first — the front end is a consumer of the same API that any future integration would use.',
    ],
  },
  {
    id: 'quality-model',
    title: 'Quality Model',
    body: 'The quality model treats a release as a set of claims — each claim is a statement about the software (e.g., "covered", "passing", "secure") that can be backed by evidence or left unsupported. Release decisions become a matter of inspecting which claims hold.',
  },
  {
    id: 'implementation',
    title: 'Implementation',
    body: 'The implementation is written in Python with FastAPI, tested at the unit and integration level, containerized with Docker, and deployed through a CI pipeline that runs the same quality checks the product is designed to reason about.',
  },
  {
    id: 'current-status',
    title: 'Current Status',
    body: 'QINIS is under active development. The core API, data model and evidence pipeline are in place. The front-end evidence view and the release decision surface are being iterated on. No production users; no external adoption claimed.',
  },
  {
    id: 'lessons',
    title: 'Lessons',
    body: 'Building QINIS has sharpened how I think about the boundaries between signals and evidence, and between evidence and decisions. It has also reinforced that the hardest part of quality engineering is not gathering data but agreeing on what the data means — which is a design problem as much as a technical one.',
  },
  {
    id: 'repository',
    title: 'Repository',
    body: 'Source code, architecture notes and CI configuration are available on GitHub. The repository link is intentionally omitted here until the public release is confirmed — the Content Rule for QINIS forbids linking to empty or placeholder repositories.',
  },
] as const;
