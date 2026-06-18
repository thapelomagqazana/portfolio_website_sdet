/**
 * Engineering footer status data.
 *
 * The footer is treated as an operations status deck, not a static copyright
 * block. All status, metadata, navigation, and branding copy lives here.
 */

export type SystemStatus = "operational" | "maintenance" | "degraded";
export type MissionStatus = "building" | "researching" | "shipping";
export type ReleaseStatus = "approved" | "reviewing" | "development";

export type StatusCard = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly status: SystemStatus | MissionStatus | ReleaseStatus;
};

export type FooterLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
};

export const engineeringStatus = {
  system: {
    id: "system",
    label: "System Status",
    value: "Operational",
    status: "operational",
  },
  mission: {
    id: "mission",
    label: "Mission Status",
    value: "Building Release Confidence Infrastructure",
    status: "building",
  },
  release: {
    id: "release",
    label: "Release Status",
    value: "Approved",
    status: "approved",
  },
} as const satisfies Record<string, StatusCard>;

export const footerMetadata = {
  product: "BrikByteOS",
  portfolioVersion: "v2.0",
  buildEnvironment: "Production",
  currentFocus: "Quality Engineering & Release Confidence",
  location: "South Africa",
} as const;

export const footerCopy = {
  eyebrow: "Engineering Status Deck",
  heading: "Mission ongoing. System operational.",
  summary:
    "This portfolio is designed as an actively engineered system: quality-focused, evidence-driven, and built around release confidence thinking.",
  copyright: "© 2026 Thapelo Magqazana",
  signature: "Designed and engineered in South Africa.",
  poweredBy: "Powered by BrikByteOS thinking.",
} as const;

export const footerNavigationLinks: readonly FooterLink[] = [
  { id: "hero", label: "Hero", href: "#hero" },
  { id: "mission", label: "Mission", href: "#mission" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "brikbyteos", label: "BrikByteOS", href: "#brikbyteos" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "research", label: "Research", href: "#engineering-intelligence" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const footerExternalLinks: readonly FooterLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/BrikByte-Studios",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:tapsmcgzee8@gmail.com",
  },
] as const;
