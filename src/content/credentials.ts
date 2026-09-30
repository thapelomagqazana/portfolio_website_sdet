/**
 * Credentials content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §9  — Certifications.
 * Content Inventory §10 — Education.
 *
 * Content Integrity (NFR-013):
 *   - Never display planned certifications as obtained
 *   - Never invent credential IDs, dates or institutions
 *   - Construction Studies degree is part of the journey,
 *     not something to apologise for
 */

/* ---------- P11-01: Certifications ---------- */

export interface Certification {
  /** Stable id for anchors and test ids. */
  id: string;
  /** Certification name. */
  name: string;
  /** Issuing organisation. */
  issuer: string;
  /** Optional credential identifier. Omit if unknown. */
  credentialId?: string;
  /** Optional verification URL. Omit if unknown. */
  verifyUrl?: string;
}

/* ---------- P11-01: Certifications ---------- */

export interface Certification {
  /** Stable id for anchors and test ids. */
  id: string;
  /** Certification name. */
  name: string;
  /** Issuing organisation. */
  issuer: string;
  /** Optional credential identifier. Omit if unknown. */
  credentialId?: string;
  /** Optional verification URL. Omit if unknown. */
  verifyUrl?: string;
  /**
   * Optional lifecycle status. Omit for fully-issued credentials.
   * Use when a credential is passed but not yet published, or
   * when a credential is in progress (never present those as obtained).
   */
  status?: 'passed-pending-publication';
}

export const certifications: readonly Certification[] = [
  {
    id: 'istqb-ctfl',
    name: 'ISTQB® Certified Tester — Foundation Level',
    issuer: 'ISTQB®',
    // Exam passed; formal letter received. Certificate pending
    // publication on the ISTQB® successful-candidate registry.
    // credentialId and verifyUrl omitted — add when published.
    status: 'passed-pending-publication',
  },
  {
    id: 'azure-az-900',
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    credentialId: '609db8f154ce1e51',
    verifyUrl:
      'https://learn.microsoft.com/en-us/users/thapelomagqazana-7919/credentials/609db8f154ce1e51',
  },
] as const;

/* ---------- P11-02: Education ---------- */

export interface EducationEntry {
  /** Stable id for anchors and test ids. */
  id: string;
  /** Institution name (short form for display). */
  institution: string;
  /** Full programme name. */
  programme: string;
  /** Human-readable date range. */
  dates: string;
  /** Optional location. */
  location?: string;
}

/**
 * Education, ordered newest-first.
 *
 * Note (Content Inventory §10): Construction Studies forms part
 * of the career journey — construction → systems development →
 * software testing → QA engineering. Do not apologise for it
 * or hide it.
 */
export const education: readonly EducationEntry[] = [
  {
    id: 'unisa',
    institution: 'UNISA',
    programme: 'BSc Computer Science & Mathematics',
    dates: '2026 – Present',
  },
  {
    id: 'wethinkcode',
    institution: 'WeThinkCode_',
    programme: 'NQF 5 Systems Development',
    dates: '2022 – 2024',
  },
  {
    id: 'wits',
    institution: 'Wits',
    programme: 'BSc Construction Studies',
    dates: '2017 – 2021',
  },
] as const;
