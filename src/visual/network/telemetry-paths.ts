import type { NetworkEdge, NetworkNode } from "./network.types";
import { TELEMETRY_SIGNAL_KINDS } from "./telemetry.constants";
import { clampTelemetryValue, positiveModulo } from "./telemetry-math";
import type { TelemetryPath, TelemetryPoint, TelemetrySignalKind } from "./telemetry.types";

/**
 * Resolves a deterministic telemetry kind from an edge index.
 *
 * @param index - Edge index from the generated topology.
 * @returns A valid telemetry kind.
 */
export function getTelemetryKindForEdgeIndex(index: number): TelemetrySignalKind {
  return TELEMETRY_SIGNAL_KINDS[positiveModulo(index, TELEMETRY_SIGNAL_KINDS.length)];
}

/**
 * Calculates Euclidean distance between two telemetry points.
 *
 * @param start - Start point.
 * @param end - End point.
 * @returns Distance between start and end.
 */
export function getTelemetryPathLength(start: TelemetryPoint, end: TelemetryPoint): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Resolves a point along a path using normalized progress.
 *
 * Progress is clamped to [0, 1], so invalid renderer values cannot produce
 * runaway coordinates.
 */
export function getTelemetryPointAtProgress(path: TelemetryPath, progress: number): TelemetryPoint {
  const safeProgress = clampTelemetryValue(progress, 0, 1);

  return {
    x: path.start.x + (path.end.x - path.start.x) * safeProgress,
    y: path.start.y + (path.end.y - path.start.y) * safeProgress,
  };
}

/**
 * Converts network topology edges into telemetry paths.
 *
 * Invalid edges are skipped instead of throwing. This keeps the renderer
 * resilient during partial generation, future topology changes, and tests.
 */
export function createTelemetryPaths(
  nodes: readonly NetworkNode[],
  edges: readonly NetworkEdge[]
): TelemetryPath[] {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));

  return edges.flatMap((edge, index) => {
    const source = nodesById.get(edge.sourceId);
    const target = nodesById.get(edge.targetId);

    // Invalid edge references are ignored safely.
    if (!source || !target) {
      return [];
    }

    const start: TelemetryPoint = { x: source.x, y: source.y };
    const end: TelemetryPoint = { x: target.x, y: target.y };

    return [
      {
        id: `telemetry-path-${edge.id}`,
        sourceId: edge.sourceId,
        targetId: edge.targetId,
        start,
        end,
        length: getTelemetryPathLength(start, end),
        kind: getTelemetryKindForEdgeIndex(index),
      },
    ];
  });
}
