/**
 * BrikByteOS architecture data model.
 *
 * This module keeps architecture copy, layer labels, node metadata, and helper
 * functions centralized so the UI remains clean, testable, and future-ready.
 */

export type ArchitectureLayer =
  | "interface"
  | "orchestration"
  | "adapters"
  | "evidence"
  | "decision"
  | "reporting"
  | "storage";

export type ArchitectureNode = {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly layer: ArchitectureLayer;
  readonly summary: string;
  readonly purpose: string;
  readonly moduleCount?: number;
  readonly inputs: readonly string[];
  readonly outputs: readonly string[];
  readonly produces: readonly string[];
  readonly responsibilities: readonly string[];
  readonly children?: readonly ArchitectureNode[];
};

export const architectureLayerLabels: Record<ArchitectureLayer, string> = {
  interface: "Interface",
  orchestration: "Orchestration",
  adapters: "Adapters",
  evidence: "Evidence",
  decision: "Decision",
  reporting: "Reporting",
  storage: "Artifacts",
} as const;

export const brikByteArchitectureCopy = {
  eyebrow: "Architecture Explorer",
  heading: "A real release-confidence system with clear boundaries.",
  description:
    "Follow how BrikByteOS moves from commands to execution, evidence, policy, decisions, reports, and traceable artifacts.",
  flowLabel: "Commands → Execution → Evidence → Policy → Decision → Reports",
  defaultSelectedNodeId: "cli",
} as const;

export const architectureMetrics = [
  { label: "Layers", value: "7" },
  { label: "Modules", value: "13" },
  { label: "Adapters", value: "5" },
  { label: "Report Types", value: "4" },
  { label: "Traceability", value: "100%" },
] as const;

export const brikByteArchitectureNodes: readonly ArchitectureNode[] = [
  {
    id: "cli",
    label: "bb CLI",
    icon: "⌨",
    layer: "interface",
    summary: "Command interface for running checks, gates, reports, and diagnostics.",
    purpose: "Provides the developer-facing entry point into BrikByteOS workflows.",
    moduleCount: 1,
    inputs: ["CLI arguments", "bb-config.yml"],
    outputs: ["Execution request"],
    produces: ["Run Orchestrator"],
    responsibilities: [
      "Accept commands such as bb run, bb doctor, bb gate evaluate, and bb report generate.",
      "Translate user intent into orchestrated workflows.",
      "Keep release-confidence workflows scriptable and CI-friendly.",
    ],
  },
  {
    id: "runner",
    label: "Run Orchestrator",
    icon: "⚙",
    layer: "orchestration",
    summary: "Coordinates configured tools and records execution context.",
    purpose: "Owns the execution lifecycle for a BrikByteOS run.",
    moduleCount: 1,
    inputs: ["Execution request", "Project configuration"],
    outputs: ["Run manifest", "Adapter execution plan"],
    produces: ["Tool Adapters"],
    responsibilities: [
      "Select adapters based on configuration.",
      "Create run folders and execution manifests.",
      "Coordinate tool execution safely and deterministically.",
    ],
  },
  {
    id: "adapters",
    label: "Tool Adapters",
    icon: "🔌",
    layer: "adapters",
    summary: "Adapters normalize external tool outputs into consistent evidence.",
    purpose: "Isolates third-party tool behavior from the BrikByteOS core.",
    moduleCount: 5,
    inputs: ["Adapter execution plan", "Tool configuration"],
    outputs: ["Raw outputs", "Normalized evidence"],
    produces: ["Evidence Model"],
    responsibilities: [
      "Run supported tools such as Jest, Playwright, Newman, k6, and Trivy.",
      "Capture raw outputs without losing traceability.",
      "Normalize tool-specific results into consistent evidence.",
    ],
    children: [
      {
        id: "unit-adapter",
        label: "Unit Adapter",
        icon: "✓",
        layer: "adapters",
        summary: "Normalizes unit test output.",
        purpose: "Captures unit test health as release evidence.",
        inputs: ["Jest output", "Vitest output"],
        outputs: ["Unit evidence"],
        produces: ["Evidence Model"],
        responsibilities: ["Capture test totals, pass rate, and failure summaries."],
      },
      {
        id: "api-adapter",
        label: "API Adapter",
        icon: "↔",
        layer: "adapters",
        summary: "Normalizes API collection test output.",
        purpose: "Captures API contract and endpoint health.",
        inputs: ["Newman output"],
        outputs: ["API evidence"],
        produces: ["Evidence Model"],
        responsibilities: ["Capture request assertions, failed checks, and metadata."],
      },
      {
        id: "security-adapter",
        label: "Security Adapter",
        icon: "🛡",
        layer: "adapters",
        summary: "Normalizes vulnerability scan output.",
        purpose: "Captures dependency and container risk signals.",
        inputs: ["Trivy output"],
        outputs: ["Security evidence"],
        produces: ["Evidence Model"],
        responsibilities: ["Capture critical/high findings and scan metadata."],
      },
    ],
  },
  {
    id: "evidence",
    label: "Evidence Model",
    icon: "📄",
    layer: "evidence",
    summary: "Shared schema for normalized quality signals.",
    purpose: "Provides one consistent representation of release readiness evidence.",
    moduleCount: 1,
    inputs: ["Adapter evidence", "Artifact references"],
    outputs: ["Normalized quality signals"],
    produces: ["Quality Gate Engine"],
    responsibilities: [
      "Represent tool results consistently.",
      "Preserve source artifact references.",
      "Enable downstream gate evaluation.",
    ],
  },
  {
    id: "gate",
    label: "Quality Gate Engine",
    icon: "🛡",
    layer: "decision",
    summary: "Evaluates release rules against normalized evidence.",
    purpose: "Turns evidence into a release decision.",
    moduleCount: 1,
    inputs: ["Normalized evidence", "Gate policy"],
    outputs: ["Approved", "Rejected", "Warning", "Manual review"],
    produces: ["Report Generator"],
    responsibilities: [
      "Apply policy thresholds.",
      "Evaluate release readiness consistently.",
      "Separate decision logic from presentation.",
    ],
  },
  {
    id: "reporting",
    label: "Report Generator",
    icon: "📊",
    layer: "reporting",
    summary: "Creates human-readable and machine-readable release reports.",
    purpose: "Makes release confidence reviewable by engineers and stakeholders.",
    moduleCount: 4,
    inputs: ["Gate result", "Evidence summaries", "Run manifest"],
    outputs: ["report.json", "report.html", "summaries", "next actions"],
    produces: ["Run Artifacts"],
    responsibilities: [
      "Generate report.json and report.html.",
      "Summarize gate results and evidence health.",
      "Make decisions understandable after the run completes.",
    ],
  },
  {
    id: "artifacts",
    label: "Run Artifacts",
    icon: "🗂",
    layer: "storage",
    summary: "Stores raw outputs, normalized evidence, manifests, and reports.",
    purpose: "Preserves traceability from release decision back to source evidence.",
    moduleCount: 1,
    inputs: ["Raw outputs", "Evidence", "Reports", "Gate results"],
    outputs: [".bb/runs/<run-id>"],
    produces: ["Reviewable release history"],
    responsibilities: [
      "Keep every release run reviewable.",
      "Support traceability from verdict back to source evidence.",
      "Make release history easier to compare across runs.",
    ],
  },
] as const;

export function nodeHasChildren(node: ArchitectureNode): boolean {
  return Array.isArray(node.children) && node.children.length > 0;
}

export function getArchitectureNodeById(
  id: string,
  nodes: readonly ArchitectureNode[] = brikByteArchitectureNodes
): ArchitectureNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;

    const child = node.children?.find((candidate) => candidate.id === id);
    if (child) return child;
  }

  return undefined;
}

export function getFlattenedArchitectureNodes(
  nodes: readonly ArchitectureNode[],
  expandedNodeIds: ReadonlySet<string>
): readonly ArchitectureNode[] {
  return nodes.flatMap((node) => {
    if (!nodeHasChildren(node) || !expandedNodeIds.has(node.id)) {
      return [node];
    }

    return [node, ...(node.children ?? [])];
  });
}
