/**
 * Centralized contact action metadata.
 *
 * Components must consume this data instead of hardcoding URLs, labels,
 * commands, or status values. This keeps the contact system reusable across
 * the terminal, footer, navigation drawer, and future command palette.
 */

export type ContactActionType = "linkedin" | "github" | "email" | "resume";

export type ContactActionStatus = "available" | "online" | "active";

export type ContactAction = {
  readonly id: ContactActionType;
  readonly title: string;
  readonly description: string;
  readonly command: string;
  readonly href: string;
  readonly external: boolean;
  readonly status: ContactActionStatus;
};

export const contactActionsCopy = {
  eyebrow: "Contact Actions",
  heading: "Launch a communication channel.",
  description:
    "Choose a professional channel to connect, inspect engineering work, or download the latest résumé.",
} as const;

export const contactActionStatusLabels: Record<ContactActionStatus, string> = {
  active: "Active",
  available: "Available",
  online: "Online",
} as const;

export const contactActions: readonly ContactAction[] = [
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Professional profile, engineering updates, and career signal.",
    command: "connect --linkedin",
    href: "https://www.linkedin.com/in/thapelo-magqazana-90632a174/",
    external: true,
    status: "active",
  },
  {
    id: "github",
    title: "GitHub",
    description: "Open-source projects, BrikByteOS work, and engineering evidence.",
    command: "connect --github",
    href: "https://github.com/BrikByte-Studios",
    external: true,
    status: "active",
  },
  {
    id: "email",
    title: "Email",
    description: "Direct engineering communication for focused conversations.",
    command: "connect --email",
    href: "mailto:tapsmcgzee8@gmail.com",
    external: false,
    status: "available",
  },
  {
    id: "resume",
    title: "Resume",
    description: "Download the latest engineering résumé.",
    command: "download --resume",
    href: "/ThapeloMagqazana_resume (1).pdf",
    external: false,
    status: "online",
  },
] as const;
