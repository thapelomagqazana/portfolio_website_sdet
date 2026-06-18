import type {
  FooterLink,
  MissionStatus,
  ReleaseStatus,
  StatusCard,
  SystemStatus,
} from "@/data/footer";

/**
 * Resolves a safe user-facing system status label.
 */
export function getSystemStatusLabel(status: SystemStatus | string): string {
  const labels: Record<SystemStatus, string> = {
    operational: "Operational",
    maintenance: "Maintenance",
    degraded: "Degraded",
  };

  return labels[status as SystemStatus] ?? "Unknown";
}

/**
 * Resolves a safe mission status label.
 */
export function getMissionStatusLabel(status: MissionStatus | string): string {
  const labels: Record<MissionStatus, string> = {
    building: "Building",
    researching: "Researching",
    shipping: "Shipping",
  };

  return labels[status as MissionStatus] ?? "Unknown";
}

/**
 * Resolves a safe release status label.
 */
export function getReleaseStatusLabel(status: ReleaseStatus | string): string {
  const labels: Record<ReleaseStatus, string> = {
    approved: "Approved",
    reviewing: "Reviewing",
    development: "Development",
  };

  return labels[status as ReleaseStatus] ?? "Unknown";
}

/**
 * Returns a generic status label for mixed footer status cards.
 */
export function getStatusLabel(status: string): string {
  return getSystemStatusLabel(status) !== "Unknown"
    ? getSystemStatusLabel(status)
    : getMissionStatusLabel(status) !== "Unknown"
      ? getMissionStatusLabel(status)
      : getReleaseStatusLabel(status);
}

/**
 * Formats portfolio version strings consistently.
 */
export function formatPortfolioVersion(version: string): string {
  const trimmed = version.trim();

  if (!trimmed) return "Version unavailable";
  return trimmed.startsWith("v") ? trimmed : `v${trimmed}`;
}

/**
 * Validates status cards before rendering.
 */
export function statusCardIsRenderable(card: StatusCard): boolean {
  return card.id.trim().length > 0 && card.label.trim().length > 0 && card.value.trim().length > 0;
}

/**
 * Determines whether a footer link should open externally.
 */
export function isExternalFooterLink(link: FooterLink): boolean {
  if (link.external) return true;

  try {
    const url = new URL(link.href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Validates footer navigation links.
 */
export function footerLinkIsRenderable(link: FooterLink): boolean {
  if (!link.id.trim() || !link.label.trim() || !link.href.trim()) return false;

  if (link.href.startsWith("#")) return true;
  if (link.href.startsWith("/")) return true;
  if (link.href.startsWith("mailto:")) return true;

  try {
    const url = new URL(link.href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
