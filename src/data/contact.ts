/**
 * Contact data model.
 *
 * All contact copy, profile details, terminal commands, availability, and
 * destination links live here so the UI remains data-driven and maintainable.
 */

export type ContactAvailability = "available" | "busy" | "limited";

export type ContactAction = {
  readonly id: string;
  readonly label: string;
  readonly command: string;
  readonly href: string;
};

export type ContactProfile = {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly timezone: string;
  readonly availability: ContactAvailability;
};

export const communicationTerminal = {
  eyebrow: "Communication Terminal",
  heading: "Open an engineering communication session.",
  description:
    "Whether you're discussing quality engineering, release automation, BrikByteOS, or software architecture, let's build something reliable together.",
} as const;

export const contactProfile: ContactProfile = {
  name: "Thapelo Magqazana",
  title: "Software Development Engineer in Test",
  location: "South Africa",
  timezone: "SAST (UTC+2)",
  availability: "available",
} as const;

export const contactAvailabilityLabels: Record<ContactAvailability, string> = {
  available: "Available",
  busy: "Busy",
  limited: "Limited Availability",
} as const;

export const contactAvailabilityDescriptions: Record<ContactAvailability, string> = {
  available: "Open to engineering conversations, collaboration, and quality-focused opportunities.",
  busy: "Currently focused, but still reachable for serious engineering opportunities.",
  limited: "Available for selected conversations and carefully scoped opportunities.",
} as const;

export const contactResponseTime: Record<ContactAvailability, string> = {
  available: "Within 24 hours",
  busy: "Within 2–3 days",
  limited: "When capacity allows",
} as const;

export const terminalCommands: readonly ContactAction[] = [
  {
    id: "email",
    label: "Email",
    command: "connect --email",
    href: "mailto:tapsmcgzee8@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    command: "connect --linkedin",
    href: "https://www.linkedin.com/in/thapelo-magqazana-90632a174/",
  },
  {
    id: "github",
    label: "GitHub",
    command: "connect --github",
    href: "https://github.com/BrikByte-Studios",
  },
  {
    id: "resume",
    label: "Resume",
    command: "download --resume",
    href: "/Thapelo-Magqazana-Resume.pdf",
  },
] as const;

export const terminalFocusAreas = [
  "Quality Engineering",
  "Release Engineering",
  "Test Automation",
  "BrikByteOS",
  "Software Architecture",
] as const;

export const terminalSystemLines = [
  "Initializing communication session...",
  "Engineering profile loaded.",
  "Secure collaboration channel ready.",
] as const;
