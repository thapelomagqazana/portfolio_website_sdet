export type PipelineStageStatus = "idle" | "running" | "passed" | "warning";

export type PipelineStageTone =
  | "source"
  | "testing"
  | "security"
  | "performance"
  | "evidence"
  | "gate"
  | "release";

export type PipelineStage = {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: string;
  readonly description: string;
  readonly status: PipelineStageStatus;
  readonly tone: PipelineStageTone;
  readonly tools: readonly string[];
  readonly x: number;
  readonly y: number;
};

export const releasePipelineCopy = {
  eyebrow: "BrikByteOS Showcase",
  badge: "Flagship Platform",
  heading: "Release Confidence Infrastructure",
  subtitle: "Engineering Evidence Pipeline",
  description:
    "BrikByteOS transforms scattered engineering signals into normalized evidence, quality gate decisions, and release confidence.",
  productDefinition:
    "Release Confidence Infrastructure that converts engineering evidence into deployment decisions.",
  stats: ["6 Adapters", "18 Quality Signals", "97.3% Release Confidence"],
  statusLabel: "LIVE PIPELINE",
  statusValue: "Evidence Flow Active",
  statusMeta: ["7 Signals Processed", "Quality Gate Approved"],
  primaryCta: {
    label: "Explore Architecture",
    href: "#brikbyteos-architecture",
  },
  secondaryCta: {
    label: "View Problem Solved",
    href: "#brikbyteos-problem-solution",
  },
  tertiaryLinks: [
    { label: "GitHub", href: "https://github.com/BrikByte-Studios" },
    { label: "Documentation", href: "#brikbyteos" },
  ],
} as const;

export const releasePipelineStages: readonly PipelineStage[] = [
  {
    id: "source",
    label: "Source",
    shortLabel: "SOURCE",
    icon: "⌘",
    description: "Version control.",
    status: "passed",
    tone: "source",
    tools: ["Git"],
    x: 10,
    y: 50,
  },
  {
    id: "testing",
    label: "Testing",
    shortLabel: "TEST",
    icon: "✓",
    description: "Automated tests.",
    status: "passed",
    tone: "testing",
    tools: ["Vitest", "Playwright"],
    x: 25,
    y: 50,
  },
  {
    id: "security",
    label: "Security",
    shortLabel: "SECURITY",
    icon: "🛡",
    description: "Vulnerability scan.",
    status: "passed",
    tone: "security",
    tools: ["Trivy"],
    x: 40,
    y: 50,
  },
  {
    id: "performance",
    label: "Performance",
    shortLabel: "PERF",
    icon: "⚡",
    description: "Load validation.",
    status: "passed",
    tone: "performance",
    tools: ["k6"],
    x: 55,
    y: 50,
  },
  {
    id: "evidence",
    label: "Evidence",
    shortLabel: "EVIDENCE",
    icon: "▣",
    description: "Normalize signals.",
    status: "passed",
    tone: "evidence",
    tools: ["JSON"],
    x: 70,
    y: 50,
  },
  {
    id: "quality-gate",
    label: "Quality Gate",
    shortLabel: "GATE",
    icon: "⬢",
    description: "Policy check.",
    status: "passed",
    tone: "gate",
    tools: ["Policy"],
    x: 85,
    y: 50,
  },
  {
    id: "release",
    label: "Release",
    shortLabel: "RELEASE",
    icon: "▲",
    description: "Ship decision.",
    status: "passed",
    tone: "release",
    tools: ["Report"],
    x: 96,
    y: 50,
  },
] as const;

export const releaseQualityGate = {
  product: "BRIKBYTEOS",
  label: "QUALITY GATE",
  verdict: "APPROVED",
  confidence: "97.3%",
  detail: "Evidence Verified",
} as const;

export const releaseDecision = {
  label: "RELEASE",
  verdict: "APPROVED",
  summary: "Safe To Ship",
  detail: "Evidence Complete",
} as const;

export const pipelineToneStyles: Record<
  PipelineStageTone,
  {
    readonly card: string;
    readonly text: string;
    readonly badge: string;
    readonly glow: string;
    readonly packet: string;
    readonly stroke: string;
  }
> = {
  source: {
    card: "border-blue-400/30 bg-blue-400/10",
    text: "text-blue-200",
    badge: "border-blue-400/30 bg-blue-400/10 text-blue-200",
    glow: "shadow-[0_0_28px_rgba(96,165,250,0.18)]",
    packet: "text-blue-300",
    stroke: "text-blue-400",
  },
  testing: {
    card: "border-cyan-400/30 bg-cyan-400/10",
    text: "text-cyan-200",
    badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    glow: "shadow-[0_0_28px_rgba(34,211,238,0.18)]",
    packet: "text-cyan-300",
    stroke: "text-cyan-400",
  },
  security: {
    card: "border-red-400/30 bg-red-400/10",
    text: "text-red-200",
    badge: "border-red-400/30 bg-red-400/10 text-red-200",
    glow: "shadow-[0_0_28px_rgba(248,113,113,0.16)]",
    packet: "text-red-300",
    stroke: "text-red-400",
  },
  performance: {
    card: "border-amber-400/30 bg-amber-400/10",
    text: "text-amber-200",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    glow: "shadow-[0_0_28px_rgba(251,191,36,0.16)]",
    packet: "text-amber-300",
    stroke: "text-amber-400",
  },
  evidence: {
    card: "border-violet-400/30 bg-violet-400/10",
    text: "text-violet-200",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    glow: "shadow-[0_0_28px_rgba(167,139,250,0.18)]",
    packet: "text-violet-300",
    stroke: "text-violet-400",
  },
  gate: {
    card: "border-emerald-400/50 bg-emerald-400/15",
    text: "text-emerald-200",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    glow: "shadow-[0_0_72px_rgba(52,211,153,0.38)]",
    packet: "text-emerald-300",
    stroke: "text-emerald-400",
  },
  release: {
    card: "border-green-400/40 bg-green-400/15",
    text: "text-green-200",
    badge: "border-green-400/30 bg-green-400/10 text-green-200",
    glow: "shadow-[0_0_44px_rgba(74,222,128,0.24)]",
    packet: "text-green-300",
    stroke: "text-green-400",
  },
};

export function clampPipelineCoordinate(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(Math.max(value, 0), 100);
}

export function getPipelineStatusLabel(status: PipelineStageStatus | string): string {
  if (status === "passed") return "PASS";
  if (status === "running") return "RUNNING";
  if (status === "warning") return "WARNING";
  return "IDLE";
}

export function getPipelineToneStyle(tone: PipelineStageTone) {
  return pipelineToneStyles[tone];
}

export function getReleasePipelineStageById(stageId: string): PipelineStage | undefined {
  return releasePipelineStages.find((stage) => stage.id === stageId);
}
