/**
 * Engineering philosophy content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §14 — Four principles:
 *   01 Understand
 *   02 Challenge
 *   03 Automate
 *   04 Evidence
 *
 * The closing statement ties the principles to the brand:
 *   "Build. Test. Automate. Ship with confidence."
 *   (Product Brief §12, Design System §12)
 */

export interface Principle {
  /** Two-digit number, kept as a string to preserve leading zero. */
  number: string;
  /** Short principle title. */
  title: string;
  /** One to two sentence explanation. */
  body: string;
}

export const principles: readonly Principle[] = [
  {
    number: '01',
    title: 'Understand',
    body: 'Understand the system before testing the system — its requirements, architecture, data and failure modes.',
  },
  {
    number: '02',
    title: 'Challenge',
    body: 'Do not only test what should happen. Test what could go wrong, at the boundaries and beyond the happy path.',
  },
  {
    number: '03',
    title: 'Automate',
    body: 'Automate repeatable work so humans can focus on thinking. Automation earns its place through speed, repeatability and fast feedback — not through being automated.',
  },
  {
    number: '04',
    title: 'Evidence',
    body: 'A quality decision should be supported by evidence. Test results, defect reports, logs and coverage are the raw material of a defensible release call.',
  },
] as const;

/** Closing statement rendered below the grid. */
export const philosophyClosing = 'Build. Test. Automate. Ship with confidence.';
