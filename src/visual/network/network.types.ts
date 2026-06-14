/**
 * Supported semantic node types in the quality-command background network.
 */
export type NetworkNodeKind =
  | "test"
  | "security"
  | "performance"
  | "evidence"
  | "policy"
  | "release"
  | "system";

/**
 * Supported moving signal types.
 */
export type NetworkSignalKind =
  | "test-result"
  | "security-check"
  | "performance-sample"
  | "evidence-artifact"
  | "policy-decision"
  | "release-verdict";

/**
 * One node in the generated network topology.
 */
export type NetworkNode = {
  readonly id: string;
  readonly kind: NetworkNodeKind;
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly intensity: number;
};

/**
 * One connection between two valid nodes.
 */
export type NetworkEdge = {
  readonly id: string;
  readonly sourceId: string;
  readonly targetId: string;
  readonly strength: number;
};

/**
 * One signal travelling along an edge.
 */
export type NetworkSignal = {
  readonly id: string;
  readonly kind: NetworkSignalKind;
  readonly edgeId: string;
  readonly progress: number;
  readonly speed: number;
};

/**
 * Network rendering bounds in CSS pixels.
 */
export type NetworkBounds = {
  readonly width: number;
  readonly height: number;
};

export type NetworkDensity = "low" | "medium" | "high";

/**
 * Complete configuration used to generate a deterministic topology.
 */
export type NetworkConfig = {
  readonly seed: string;
  readonly bounds: NetworkBounds;
  readonly density: NetworkDensity;
  readonly nodeCount: number;
  readonly maxEdgesPerNode: number;
  readonly signalCount: number;
};

/**
 * Complete generated topology.
 */
export type NetworkTopology = {
  readonly nodes: readonly NetworkNode[];
  readonly edges: readonly NetworkEdge[];
  readonly signals: readonly NetworkSignal[];
};
