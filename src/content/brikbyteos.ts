/**
 * BrikByteOS content — Thapelo Magqazana Engineering Portfolio
 *
 * Product Brief §14 — BrikByteOS is a flagship engineering project.
 * Positioning: an open-source Release Confidence CLI that brings
 * testing, security, quality signals and evidence-based quality
 * gates into software delivery.
 *
 * Content Rule (Content Inventory §20 Rule 2):
 *   Never invent users, downloads, stars or adoption.
 *   The GitHub link is only included once the repo is public.
 *
 * Note on 'Technology':
 *   The Technology section is NOT in this array. It is rendered
 *   separately by BrikBytePage.tsx as a tag block (matching the
 *   QINIS case study pattern). Keeping it here would produce two
 *   "Technology" headings on the same page.
 */

/* ---------- P8-06: Summary ---------- */

export const brikbyteos = {
  id: 'brikbyteos',
  name: 'BrikByteOS',
  shortName: 'BrikByteOS',
  commandName: 'bb',
  tagline: 'Release confidence from the command line.',
  status: 'ongoing' as const,
} as const;

/* ---------- P8-07: Terminal demonstration ---------- */

export interface TerminalLine {
  kind: 'command' | 'success' | 'decision';
  text: string;
}

export const brikbyteTerminal: readonly TerminalLine[] = [
  { kind: 'command', text: 'bb run' },
  { kind: 'success', text: 'Tests' },
  { kind: 'success', text: 'Security' },
  { kind: 'success', text: 'Quality' },
  { kind: 'success', text: 'Evidence' },
  { kind: 'decision', text: 'RELEASE: PASS' },
] as const;

/* ---------- P8-08: Architecture ---------- */

export interface PipelineStage {
  label: string;
  detail: string;
}

export const brikbytePipeline: readonly PipelineStage[] = [
  { label: 'Command', detail: 'bb run invoked by a developer or CI job' },
  {
    label: 'Execution Engine',
    detail: 'Deterministic orchestration of the pipeline',
  },
  {
    label: 'Test / Security Signals',
    detail: 'Test runners, scanners, quality tools',
  },
  {
    label: 'Normalized Results',
    detail: 'Unified result schema across all sources',
  },
  {
    label: 'Evidence Bundle',
    detail: 'Structured artifact of what ran and what happened',
  },
  { label: 'Policy Gate', detail: 'Declarative rules that decide pass/fail' },
  {
    label: 'Release Decision',
    detail: 'A defensible, evidence-backed outcome',
  },
] as const;

/* ---------- P8-09: Case study sections ---------- */

export interface CaseStudySection {
  id: string;
  title: string;
  body: string;
  bullets?: readonly string[];
}

/**
 * Case-study sections rendered as prose in BrikBytePage.
 *
 * Excludes 'technology' — that section is rendered by the page
 * as a tag block, not as prose.
 */
export const brikbyteCaseStudy: readonly CaseStudySection[] = [
  {
    id: 'problem',
    title: 'Problem',
    body: 'Release decisions are often made on partial information. Test results live in one tool, security findings in another, and quality thresholds in a wiki page. Teams make go/no-go calls based on the loudest signal rather than the whole picture.',
  },
  {
    id: 'solution',
    title: 'Solution',
    body: 'BrikByteOS provides a single command that orchestrates tests, security scans and quality checks, normalizes their output into a common shape, and applies an explicit policy gate to produce a release decision with an evidence bundle attached.',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    body: 'The pipeline is intentionally linear and inspectable. Every stage emits a normalized result; nothing is hidden behind a plugin interface that changes the semantics of the output.',
    bullets: [
      'Deterministic execution — the same inputs produce the same result schema',
      'No silent skips — a missing tool is reported, not ignored',
      'Policy gates are declarative and version-controlled',
      'The evidence bundle is the unit of trust, not the exit code',
    ],
  },
  {
    id: 'cli',
    title: 'CLI',
    body: 'The CLI is designed to be scriptable. Human-friendly output by default; JSON on demand. Every command has a stable exit code that reflects the policy outcome, not just whether the process ran.',
  },
  {
    id: 'evidence',
    title: 'Evidence',
    body: 'An evidence bundle is a structured artifact describing what ran, what the outputs were, what policies were applied, and what decision was reached. It is designed to be archived, diffed, and attached to a release.',
  },
  {
    id: 'quality-gates',
    title: 'Quality Gates',
    body: 'Gates are declarative policies, not hardcoded checks. They express the conditions under which a release is permitted — e.g., minimum coverage, zero critical findings, all mandatory suites passing — and they can evolve with the project without changing the CLI.',
  },
  {
    id: 'ci-cd',
    title: 'CI/CD',
    body: 'BrikByteOS is designed to run both locally and in CI. The same command that a developer runs before pushing is the command the pipeline runs, so the local and CI experience converge.',
  },
  // 'technology' intentionally omitted — rendered as a tag block
  {
    id: 'lessons',
    title: 'Lessons',
    body: 'Designing BrikByteOS reinforced that a good quality tool is judged not by how many checks it runs, but by how clearly it communicates what happened and why. The hardest part is not running the tools; it is deciding what their output means.',
  },
  {
    id: 'github',
    title: 'GitHub',
    body: 'The repository will be published when the initial public release is ready. It is intentionally not linked here yet — placeholder links break the evidence-first principle of this portfolio.',
  },
] as const;
