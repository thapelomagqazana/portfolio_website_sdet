import { describe, expect, it } from "vitest";
import {
  createTelemetryPaths,
  getTelemetryKindForEdgeIndex,
  getTelemetryPathLength,
  getTelemetryPointAtProgress,
} from "../../../src/visual/network";
import type { NetworkEdge, NetworkNode } from "../../../src/visual/network";

const nodes: NetworkNode[] = [
  { id: "a", kind: "test", x: 0, y: 0, radius: 2, intensity: 0.5 },
  { id: "b", kind: "security", x: 3, y: 4, radius: 2, intensity: 0.5 },
];

const edges: NetworkEdge[] = [{ id: "edge-a-b", sourceId: "a", targetId: "b", strength: 0.5 }];

describe("telemetry paths", () => {
  it("creates paths from valid edges", () => {
    const paths = createTelemetryPaths(nodes, edges);

    expect(paths).toHaveLength(1);
    expect(paths[0].id).toBe("telemetry-path-edge-a-b");
    expect(paths[0].sourceId).toBe("a");
    expect(paths[0].targetId).toBe("b");
    expect(paths[0].length).toBe(5);
  });

  it("skips invalid edges safely", () => {
    const invalidEdges: NetworkEdge[] = [
      { id: "invalid", sourceId: "missing", targetId: "b", strength: 0.5 },
    ];

    expect(createTelemetryPaths(nodes, invalidEdges)).toEqual([]);
  });

  it("calculates path length using euclidean distance", () => {
    expect(getTelemetryPathLength({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it("supports zero-length paths", () => {
    expect(getTelemetryPathLength({ x: 1, y: 1 }, { x: 1, y: 1 })).toBe(0);
  });

  it("supports negative coordinates", () => {
    expect(getTelemetryPathLength({ x: -3, y: -4 }, { x: 0, y: 0 })).toBe(5);
  });

  it("calculates point at progress", () => {
    const path = createTelemetryPaths(nodes, edges)[0];

    expect(getTelemetryPointAtProgress(path, 0)).toEqual({ x: 0, y: 0 });
    expect(getTelemetryPointAtProgress(path, 0.5)).toEqual({ x: 1.5, y: 2 });
    expect(getTelemetryPointAtProgress(path, 1)).toEqual({ x: 3, y: 4 });
  });

  it("clamps progress below zero and above one", () => {
    const path = createTelemetryPaths(nodes, edges)[0];

    expect(getTelemetryPointAtProgress(path, -1)).toEqual({ x: 0, y: 0 });
    expect(getTelemetryPointAtProgress(path, 2)).toEqual({ x: 3, y: 4 });
  });

  it("maps signal kinds deterministically", () => {
    expect(getTelemetryKindForEdgeIndex(0)).toBe("test");
    expect(getTelemetryKindForEdgeIndex(1)).toBe("security");
    expect(getTelemetryKindForEdgeIndex(2)).toBe("performance");
    expect(getTelemetryKindForEdgeIndex(-1)).toBe("release");
  });
});
