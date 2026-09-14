/**
 * Experience content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §7, §21 — Separate professional employment
 * from independent engineering work. The types enforce the
 * distinction.
 *
 * Content Integrity (Product Brief §24, NFR-013):
 *   - Never invent employment history
 *   - Never invent client relationships
 *   - Never invent metrics
 *   - QINIS is independent project work, not employment
 *
 * Roles are ordered newest-first for chronological display.
 */

export type RoleKind = 'employment' | 'project';

export interface ExperienceEntry {
  /** Slug for stable anchors and test ids. */
  id: string;
  /** 'employment' | 'project' — drives the visual badge. */
  kind: RoleKind;
  /** Organisation name, or project name. */
  organisation: string;
  /** Position title, or project role. */
  position: string;
  /** Human-readable date range. */
  dates: string;
  /** Location, when the role has one. Omitted for projects. */
  location?: string;
  /** One-sentence summary shown collapsed. */
  summary: string;
  /** Bullet points shown when expanded. */
  responsibilities: readonly string[];
  /** Optional, factual, evidenced metrics. Omit if unknown. */
  metrics?: readonly ExperienceMetric[];
  /** Optional evidence links (internal anchors or external URLs). */
  evidence?: readonly ExperienceEvidence[];
}

export interface ExperienceMetric {
  /** Metric value, e.g. "100+" or "30+". */
  value: string;
  /** What the metric measures. */
  label: string;
}

export interface ExperienceEvidence {
  /** Human-readable description. */
  label: string;
  /** Destination URL. */
  url: string;
  /** 'internal' uses a hash route; 'external' opens in a new tab. */
  kind: 'internal' | 'external';
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: 'qinis',
    kind: 'project',
    organisation: 'QINIS',
    position: 'Independent Project — Design & Engineering',
    dates: '2026 – Present',
    summary:
      'Ongoing engineering project exploring how quality signals become release evidence.',
    responsibilities: [
      'Designed the API-first architecture and normalized result schema.',
      'Built the Python and FastAPI service layer.',
      'Implemented PostgreSQL persistence with an append-only evidence model.',
      'Containerised the application and wired CI/CD delivery.',
      'Documenting the quality model, engineering decisions and lessons learned as the project evolves.',
    ],
    evidence: [
      {
        label: 'View QINIS case study',
        url: '/work/qinis',
        kind: 'internal',
      },
    ],
  },
  {
    id: 'alula',
    kind: 'employment',
    organisation: 'Alula Technologies',
    position: 'Test Analyst Intern',
    dates: 'May 2025 – Apr 2026',
    location: 'Pretoria, South Africa',
    summary:
      'Hands-on QA work across functional, regression, database and usability testing in a real delivery environment.',
    responsibilities: [
      'Created and executed 100+ functional, regression, database and usability test scenarios.',
      'Identified and documented 30+ defects, including high-priority issues with reproducible steps and root-cause analysis.',
      'Validated 50+ business and technical requirements with developers and stakeholders.',
      'Participated in 10+ release cycles and contributed repeatable test scenarios toward automation.',
    ],
    metrics: [
      { value: '100+', label: 'Test scenarios' },
      { value: '30+', label: 'Defects documented' },
      { value: '50+', label: 'Requirements validated' },
      { value: '10+', label: 'Release cycles' },
    ],
  },
  {
    id: 'steinweg',
    kind: 'employment',
    organisation: 'C. Steinweg Bridge',
    position: 'Software Tester',
    dates: 'Mar 2024 – Nov 2024',
    location: 'Johannesburg, South Africa',
    summary:
      'Designed and executed functional test cases across software releases.',
    responsibilities: [
      'Designed and executed 80+ functional test cases.',
      'Identified and documented 20+ defects.',
      'Performed defect retesting and regression validation across software releases.',
      'Collaborated with developers and stakeholders to investigate defects and clarify requirements.',
    ],
    metrics: [
      { value: '80+', label: 'Test cases' },
      { value: '20+', label: 'Defects documented' },
    ],
  },
] as const;

/**
 * Human-readable labels for role kinds.
 * Used by ExperienceItem to render the badge.
 */
export const roleKindLabels: Record<RoleKind, string> = {
  employment: 'EMPLOYMENT',
  project: 'INDEPENDENT PROJECT',
};
