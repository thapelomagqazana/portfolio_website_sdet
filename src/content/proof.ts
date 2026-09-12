/**
 * Proof strip content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §20 Rule 2 — Never invent metrics.
 * Design System §25 — Numbers must be factually supported.
 *
 * Every entry here must be verifiable. If a value changes,
 * update this file, not the components.
 */

export interface ProofItem {
  /** Large value or short label (rendered in mono/uppercase). */
  value: string;
  /** Descriptive label beneath the value. */
  label: string;
}

export const proofItems: readonly ProofItem[] = [
  { value: '2+ Years', label: 'QA Experience' },
  { value: 'ISTQB®', label: 'Certified' },
  { value: 'Azure', label: 'Certified' },
  { value: 'Python', label: 'Automation' },
  { value: 'Java', label: 'Automation' },
] as const;
