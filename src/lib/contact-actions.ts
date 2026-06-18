import type { ContactAction, ContactActionStatus, ContactActionType } from "@/data/contact-actions";
import { contactActionStatusLabels } from "@/data/contact-actions";

/**
 * Returns true when a contact link should open as an external destination.
 */
export function isExternalContactLink(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Returns true when an href is a valid mailto link.
 */
export function isValidMailtoLink(href: string): boolean {
  return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(href.trim());
}

/**
 * Returns true when an href is a safe internal path.
 */
export function isInternalContactLink(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

/**
 * Normalizes safe contact links.
 */
export function normalizeContactLink(href: string): string {
  return href.trim();
}

/**
 * Validates that a contact action has a supported status.
 */
export function isContactActionStatus(value: string): value is ContactActionStatus {
  return Boolean(contactActionStatusLabels[value as ContactActionStatus]);
}

/**
 * Validates a single contact action.
 */
export function validateContactAction(action: ContactAction): boolean {
  const href = normalizeContactLink(action.href);

  if (!action.id.trim()) return false;
  if (!action.title.trim()) return false;
  if (!action.description.trim()) return false;
  if (!action.command.trim()) return false;
  if (!href) return false;
  if (!isContactActionStatus(action.status)) return false;

  if (href.startsWith("mailto:")) return isValidMailtoLink(href);
  if (isInternalContactLink(href)) return true;
  if (isExternalContactLink(href)) return true;

  return false;
}

/**
 * Validates a contact action list and rejects duplicate IDs.
 */
export function validateContactActions(actions: readonly ContactAction[]): boolean {
  const seen = new Set<ContactActionType>();

  for (const action of actions) {
    if (seen.has(action.id)) return false;
    if (!validateContactAction(action)) return false;
    seen.add(action.id);
  }

  return true;
}

/**
 * Returns true when the action should receive a download attribute.
 */
export function isResumeAction(action: ContactAction): boolean {
  return action.id === "resume";
}

/**
 * Returns an accessible external-link suffix.
 */
export function getExternalLinkLabel(action: ContactAction): string {
  if (!action.external) return action.title;
  return `${action.title} opens in a new tab`;
}
