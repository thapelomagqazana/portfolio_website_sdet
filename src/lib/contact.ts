import {
  contactAvailabilityDescriptions,
  contactAvailabilityLabels,
  contactProfile,
  contactResponseTime,
  terminalCommands,
} from "@/data/contact";
import type { ContactAction, ContactAvailability, ContactProfile } from "@/data/contact";

/**
 * Resolves a safe availability label.
 */
export function getAvailabilityLabel(availability: ContactAvailability | string): string {
  return contactAvailabilityLabels[availability as ContactAvailability] ?? "Unknown";
}

/**
 * Resolves user-facing availability copy.
 */
export function getAvailabilityDescription(availability: ContactAvailability | string): string {
  return (
    contactAvailabilityDescriptions[availability as ContactAvailability] ??
    "Availability information is currently unavailable."
  );
}

/**
 * Resolves response-time copy from availability.
 */
export function getResponseTime(availability: ContactAvailability | string): string {
  return contactResponseTime[availability as ContactAvailability] ?? "To be confirmed";
}

/**
 * Finds a terminal command by command string or id.
 */
export function parseTerminalCommand(
  input: string,
  commands: readonly ContactAction[] = terminalCommands
): ContactAction | undefined {
  const normalized = normalizeTerminalInput(input);

  return commands.find(
    (command) =>
      normalizeTerminalInput(command.command) === normalized ||
      normalizeTerminalInput(command.id) === normalized
  );
}

/**
 * Formats profile lines for terminal output.
 */
export function formatContactProfile(profile: ContactProfile = contactProfile): readonly string[] {
  return [
    `name: ${profile.name}`,
    `role: ${profile.title}`,
    `location: ${profile.location}`,
    `timezone: ${profile.timezone}`,
    `availability: ${getAvailabilityLabel(profile.availability)}`,
  ];
}

/**
 * Allows safe links only.
 */
export function getSafeContactHref(href: string): string | undefined {
  if (href.startsWith("mailto:")) return href;
  if (href.startsWith("/")) return href;
  if (href.startsWith("#")) return href;

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? href : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Validates command data before rendering.
 */
export function contactActionIsRenderable(action: ContactAction): boolean {
  return (
    action.id.trim().length > 0 &&
    action.label.trim().length > 0 &&
    action.command.trim().length > 0 &&
    Boolean(getSafeContactHref(action.href))
  );
}

function normalizeTerminalInput(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}
