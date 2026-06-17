/**
 * Skill categories used by the Engineering Constellation.
 */
export type SkillCategory =
  | "quality"
  | "automation"
  | "backend"
  | "release"
  | "security"
  | "observability"
  | "frontend"
  | "systems";

/**
 * One skill node in the constellation graph.
 */
export type SkillNode = {
  readonly id: string;
  readonly label: string;
  readonly category: SkillCategory;
  readonly x: number;
  readonly y: number;
  readonly level: number;
  readonly summary: string;
};

/**
 * One relationship between two skill nodes.
 */
export type SkillEdge = {
  readonly sourceId: string;
  readonly targetId: string;
};

/**
 * A capability cluster groups related skill nodes into one readable theme.
 *
 * Clusters make the constellation easier to explore because visitors can see
 * how individual capabilities combine into larger engineering strengths.
 */
export type CapabilityCluster = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly nodeIds: readonly string[];
};

/**
 * Centralized section copy.
 */
export const skillsMatrixCopy = {
  eyebrow: "Skills Matrix",
  heading: "Engineering Constellation",
  description:
    "Connected capabilities around one core mission: release confidence through engineering systems.",
} as const;

/**
 * Centralized skill graph nodes.
 *
 * Coordinates are percentages inside the constellation canvas.
 */
export const skillNodes: readonly SkillNode[] = [
  {
    id: "release-confidence",
    label: "Release Confidence",
    category: "systems",
    x: 50,
    y: 50,
    level: 95,
    summary: "The central mission: proving software is ready to ship using evidence.",
  },
  {
    id: "test-automation",
    label: "Test Automation",
    category: "automation",
    x: 22,
    y: 28,
    level: 90,
    summary: "Automated checks that reduce regression risk and manual repetition.",
  },
  {
    id: "quality-gates",
    label: "Quality Gates",
    category: "quality",
    x: 38,
    y: 20,
    level: 88,
    summary: "Decision checkpoints that stop risky releases before production.",
  },
  {
    id: "evidence-reports",
    label: "Evidence Reports",
    category: "quality",
    x: 68,
    y: 22,
    level: 86,
    summary: "Normalized reports that make quality signals reviewable and trustworthy.",
  },
  {
    id: "apis",
    label: "APIs",
    category: "backend",
    x: 18,
    y: 62,
    level: 84,
    summary: "Backend interfaces that connect users, systems, and quality evidence.",
  },
  {
    id: "systems-integration",
    label: "Systems Integration",
    category: "backend",
    x: 31,
    y: 78,
    level: 87,
    summary: "Connecting services, tools, and pipelines into coherent workflows.",
  },
  {
    id: "data-models",
    label: "Data Models",
    category: "backend",
    x: 50,
    y: 84,
    level: 82,
    summary: "Structured information models for evidence, runs, reports, and decisions.",
  },
  {
    id: "ci-cd",
    label: "CI/CD",
    category: "release",
    x: 76,
    y: 64,
    level: 86,
    summary: "Automated delivery pipelines that turn changes into verified releases.",
  },
  {
    id: "deployment-safety",
    label: "Deployment Safety",
    category: "release",
    x: 84,
    y: 42,
    level: 84,
    summary: "Practices that reduce production risk before and during deployment.",
  },
  {
    id: "vulnerability-scanning",
    label: "Vulnerability Scanning",
    category: "security",
    x: 74,
    y: 78,
    level: 78,
    summary: "Security checks that identify critical risks before release.",
  },
  {
    id: "policy-checks",
    label: "Policy Checks",
    category: "security",
    x: 88,
    y: 24,
    level: 80,
    summary: "Rules that enforce release standards and organizational guardrails.",
  },
  {
    id: "logs",
    label: "Logs",
    category: "observability",
    x: 13,
    y: 42,
    level: 78,
    summary: "Runtime and pipeline traces that help explain system behavior.",
  },
  {
    id: "reports",
    label: "Reports",
    category: "observability",
    x: 62,
    y: 68,
    level: 86,
    summary: "Human-readable summaries that transform raw outputs into decisions.",
  },
  {
    id: "metrics",
    label: "Metrics",
    category: "observability",
    x: 44,
    y: 34,
    level: 84,
    summary: "Measurable signals that turn engineering activity into intelligence.",
  },
] as const;

/**
 * Centralized skill relationships.
 */
export const skillEdges: readonly SkillEdge[] = [
  { sourceId: "release-confidence", targetId: "test-automation" },
  { sourceId: "release-confidence", targetId: "quality-gates" },
  { sourceId: "release-confidence", targetId: "ci-cd" },
  { sourceId: "release-confidence", targetId: "reports" },
  { sourceId: "quality-gates", targetId: "evidence-reports" },
  { sourceId: "quality-gates", targetId: "policy-checks" },
  { sourceId: "ci-cd", targetId: "deployment-safety" },
  { sourceId: "ci-cd", targetId: "test-automation" },
  { sourceId: "vulnerability-scanning", targetId: "policy-checks" },
  { sourceId: "reports", targetId: "metrics" },
  { sourceId: "apis", targetId: "systems-integration" },
  { sourceId: "systems-integration", targetId: "data-models" },
  { sourceId: "evidence-reports", targetId: "reports" },
] as const;

/**
 * Centralized capability clusters.
 *
 * These clusters support hover, focus, and click expansion in the Engineering
 * Constellation. They are data-driven so future capabilities can be added
 * without changing component logic.
 */
export const capabilityClusters: readonly CapabilityCluster[] = [
  {
    id: "release-confidence",
    label: "Release Confidence",
    description:
      "Quality gates, evidence reports, CI/CD, and deployment safety working together to prove software is ready to ship.",
    nodeIds: ["quality-gates", "evidence-reports", "ci-cd", "deployment-safety"],
  },
  {
    id: "automation-systems",
    label: "Automation Systems",
    description:
      "Automated tests, pipelines, and repeatable checks that reduce manual release risk.",
    nodeIds: ["test-automation", "ci-cd", "quality-gates"],
  },
  {
    id: "security-quality",
    label: "Security Quality",
    description:
      "Vulnerability scanning and policy checks that protect release confidence before production.",
    nodeIds: ["vulnerability-scanning", "policy-checks"],
  },
] as const;

/**
 * Safely resolves a capability cluster by ID.
 */
export function getCapabilityClusterById(id: string): CapabilityCluster | undefined {
  return capabilityClusters.find((cluster) => cluster.id === id);
}

/**
 * Resolves all skill nodes that belong to a capability cluster.
 */
export function getCapabilityClusterNodes(clusterId: string): SkillNode[] {
  const cluster = getCapabilityClusterById(clusterId);

  if (!cluster) {
    return [];
  }

  const nodeIds = new Set(cluster.nodeIds);

  return skillNodes.filter((node) => nodeIds.has(node.id));
}

/**
 * Returns true when a node belongs to a cluster.
 */
export function isNodeInCapabilityCluster(nodeId: string, clusterId: string): boolean {
  const cluster = getCapabilityClusterById(clusterId);

  if (!cluster) {
    return false;
  }

  return cluster.nodeIds.includes(nodeId);
}

/**
 * Safely resolves a skill node by ID.
 */
export function getSkillNodeById(id: string): SkillNode | undefined {
  return skillNodes.find((node) => node.id === id);
}

/**
 * Gets nodes directly related to the selected node.
 */
export function getRelatedSkillNodes(nodeId: string): SkillNode[] {
  const relatedIds = new Set<string>();

  for (const edge of skillEdges) {
    if (edge.sourceId === nodeId) relatedIds.add(edge.targetId);
    if (edge.targetId === nodeId) relatedIds.add(edge.sourceId);
  }

  return skillNodes.filter((node) => relatedIds.has(node.id));
}

/**
 * Core node ID for the Engineering Constellation.
 *
 * Keeping this in data avoids scattering magic strings across components,
 * tests, and future cluster-expansion logic.
 */
export const CORE_SKILL_NODE_ID = "release-confidence" as const;

/**
 * Returns true when the node represents the central mission of the graph.
 *
 * The core node is intentionally rendered larger and stronger because the
 * constellation should visually communicate that every capability orbits the
 * same mission: release confidence.
 */
export function isCoreSkillNode(nodeId: string): boolean {
  return nodeId === CORE_SKILL_NODE_ID;
}

/**
 * Capability rings create visual structure in the Engineering Constellation.
 *
 * The graph should feel like a solar system:
 * - Release Confidence is the sun.
 * - Related capabilities orbit in faint rings.
 */
export const capabilityRings = [
  {
    id: "inner-ring",
    label: "Core quality capabilities",
    radius: 18,
  },
  {
    id: "middle-ring",
    label: "Release and security capabilities",
    radius: 30,
  },
  {
    id: "outer-ring",
    label: "Observability and integration capabilities",
    radius: 42,
  },
] as const;

/**
 * A static decorative star in the Engineering Constellation background.
 */
export type ConstellationStar = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly size: number;
};

/**
 * Static constellation background stars.
 *
 * These are intentionally not animated. They create atmosphere without
 * distracting from the skill nodes or creating unnecessary render work.
 */
export const constellationStars: readonly ConstellationStar[] = [
  { id: "star-01", x: 8, y: 12, size: 1 },
  { id: "star-02", x: 14, y: 74, size: 1 },
  { id: "star-03", x: 19, y: 18, size: 1.4 },
  { id: "star-04", x: 23, y: 88, size: 1 },
  { id: "star-05", x: 28, y: 46, size: 1 },
  { id: "star-06", x: 34, y: 12, size: 1.2 },
  { id: "star-07", x: 39, y: 91, size: 1 },
  { id: "star-08", x: 44, y: 8, size: 1 },
  { id: "star-09", x: 49, y: 73, size: 1.2 },
  { id: "star-10", x: 54, y: 16, size: 1 },
  { id: "star-11", x: 58, y: 92, size: 1.4 },
  { id: "star-12", x: 63, y: 36, size: 1 },
  { id: "star-13", x: 68, y: 10, size: 1 },
  { id: "star-14", x: 72, y: 84, size: 1.2 },
  { id: "star-15", x: 78, y: 18, size: 1 },
  { id: "star-16", x: 83, y: 64, size: 1 },
  { id: "star-17", x: 88, y: 34, size: 1.4 },
  { id: "star-18", x: 92, y: 78, size: 1 },
  { id: "star-19", x: 6, y: 38, size: 1 },
  { id: "star-20", x: 11, y: 92, size: 1.2 },
  { id: "star-21", x: 17, y: 53, size: 1 },
  { id: "star-22", x: 25, y: 26, size: 1 },
  { id: "star-23", x: 31, y: 67, size: 1.3 },
  { id: "star-24", x: 37, y: 39, size: 1 },
  { id: "star-25", x: 43, y: 58, size: 1 },
  { id: "star-26", x: 47, y: 24, size: 1.2 },
  { id: "star-27", x: 52, y: 88, size: 1 },
  { id: "star-28", x: 57, y: 51, size: 1 },
  { id: "star-29", x: 61, y: 72, size: 1.4 },
  { id: "star-30", x: 66, y: 58, size: 1 },
  { id: "star-31", x: 71, y: 29, size: 1 },
  { id: "star-32", x: 76, y: 94, size: 1.2 },
  { id: "star-33", x: 81, y: 47, size: 1 },
  { id: "star-34", x: 86, y: 12, size: 1 },
  { id: "star-35", x: 91, y: 52, size: 1.3 },
  { id: "star-36", x: 95, y: 21, size: 1 },
] as const;

/**
 * Visual styling tokens for one skill category.
 *
 * These are Tailwind utility strings, centralized so category color treatment
 * stays consistent across graph nodes, mobile cards, and future legends.
 */
export type SkillCategoryStyle = {
  readonly label: string;
  readonly nodeClassName: string;
  readonly selectedNodeClassName: string;
  readonly textClassName: string;
  readonly badgeClassName: string;
  readonly glowClassName: string;
};

/**
 * Category color system for the Engineering Constellation.
 *
 * The colors make capability groups visually obvious:
 * - Quality: cyan
 * - Automation: emerald
 * - Backend: violet
 * - Release: green
 * - Security: red
 * - Observability: amber
 * - Systems: blue
 */
export const skillCategoryStyles: Record<SkillCategory, SkillCategoryStyle> = {
  quality: {
    label: "Quality",
    nodeClassName: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20",
    selectedNodeClassName:
      "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,0.28)]",
    textClassName: "text-cyan-200",
    badgeClassName: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    glowClassName: "shadow-[0_0_36px_rgba(34,211,238,0.18)]",
  },
  automation: {
    label: "Automation",
    nodeClassName:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20",
    selectedNodeClassName:
      "border-emerald-300 bg-emerald-400/20 text-emerald-100 shadow-[0_0_34px_rgba(52,211,153,0.28)]",
    textClassName: "text-emerald-200",
    badgeClassName: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    glowClassName: "shadow-[0_0_36px_rgba(52,211,153,0.18)]",
  },
  backend: {
    label: "Backend",
    nodeClassName: "border-violet-400/30 bg-violet-400/10 text-violet-200 hover:bg-violet-400/20",
    selectedNodeClassName:
      "border-violet-300 bg-violet-400/20 text-violet-100 shadow-[0_0_34px_rgba(167,139,250,0.28)]",
    textClassName: "text-violet-200",
    badgeClassName: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    glowClassName: "shadow-[0_0_36px_rgba(167,139,250,0.18)]",
  },
  frontend: {
    label: "Frontend",
    nodeClassName: "border-pink-400/30 bg-pink-400/10 text-pink-200 hover:bg-pink-400/20",
    selectedNodeClassName:
      "border-pink-300 bg-pink-400/20 text-pink-100 shadow-[0_0_34px_rgba(244,114,182,0.28)]",
    textClassName: "text-pink-200",
    badgeClassName: "border-pink-400/30 bg-pink-400/10 text-pink-200",
    glowClassName: "shadow-[0_0_36px_rgba(244,114,182,0.18)]",
  },
  release: {
    label: "Release",
    nodeClassName: "border-green-400/30 bg-green-400/10 text-green-200 hover:bg-green-400/20",
    selectedNodeClassName:
      "border-green-300 bg-green-400/20 text-green-100 shadow-[0_0_34px_rgba(74,222,128,0.28)]",
    textClassName: "text-green-200",
    badgeClassName: "border-green-400/30 bg-green-400/10 text-green-200",
    glowClassName: "shadow-[0_0_36px_rgba(74,222,128,0.18)]",
  },
  security: {
    label: "Security",
    nodeClassName: "border-red-400/30 bg-red-400/10 text-red-200 hover:bg-red-400/20",
    selectedNodeClassName:
      "border-red-300 bg-red-400/20 text-red-100 shadow-[0_0_34px_rgba(248,113,113,0.28)]",
    textClassName: "text-red-200",
    badgeClassName: "border-red-400/30 bg-red-400/10 text-red-200",
    glowClassName: "shadow-[0_0_36px_rgba(248,113,113,0.18)]",
  },
  observability: {
    label: "Observability",
    nodeClassName: "border-amber-400/30 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20",
    selectedNodeClassName:
      "border-amber-300 bg-amber-400/20 text-amber-100 shadow-[0_0_34px_rgba(251,191,36,0.28)]",
    textClassName: "text-amber-200",
    badgeClassName: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    glowClassName: "shadow-[0_0_36px_rgba(251,191,36,0.18)]",
  },
  systems: {
    label: "Systems",
    nodeClassName: "border-blue-400/30 bg-blue-400/10 text-blue-200 hover:bg-blue-400/20",
    selectedNodeClassName:
      "border-blue-300 bg-blue-400/20 text-blue-100 shadow-[0_0_34px_rgba(96,165,250,0.28)]",
    textClassName: "text-blue-200",
    badgeClassName: "border-blue-400/30 bg-blue-400/10 text-blue-200",
    glowClassName: "shadow-[0_0_36px_rgba(96,165,250,0.18)]",
  },
};

/**
 * Resolves the visual style for a skill category.
 */
export function getSkillCategoryStyle(category: SkillCategory): SkillCategoryStyle {
  return skillCategoryStyles[category];
}

/**
 * Clamps a skill level into the safe visual range.
 *
 * Skill levels are rendered as progress bars, so invalid or out-of-range
 * values must not break the UI.
 */
export function clampSkillLevel(level: number): number {
  if (!Number.isFinite(level)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(level), 0), 100);
}
