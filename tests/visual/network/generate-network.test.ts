import { describe, expect, it } from "vitest";
import { generateNetworkTopology } from "../../../src/visual/network";
import type { NetworkConfig } from "../../../src/visual/network";

const config: NetworkConfig = {
  seed: "test-seed",
  bounds: { width: 1280, height: 720 },
  density: "high",
  nodeCount: 24,
  maxEdgesPerNode: 3,
  signalCount: 12,
};

describe("generateNetworkTopology", () => {
  it("generates nodes, edges, and signals", () => {
    const topology = generateNetworkTopology(config);

    expect(topology.nodes.length).toBe(24);
    expect(topology.edges.length).toBeGreaterThan(0);
    expect(topology.signals.length).toBe(12);
  });

  it("is deterministic for the same seed and config", () => {
    expect(generateNetworkTopology(config)).toEqual(generateNetworkTopology(config));
  });

  it("changes output for different seeds", () => {
    expect(generateNetworkTopology(config)).not.toEqual(
      generateNetworkTopology({ ...config, seed: "different" })
    );
  });

  it("keeps nodes inside bounds", () => {
    const topology = generateNetworkTopology(config);

    for (const node of topology.nodes) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x).toBeLessThanOrEqual(config.bounds.width);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeLessThanOrEqual(config.bounds.height);
      expect(node.intensity).toBeGreaterThanOrEqual(0);
      expect(node.intensity).toBeLessThanOrEqual(1);
    }
  });

  it("does not create self-referencing or duplicate edges", () => {
    const topology = generateNetworkTopology(config);
    const keys = new Set<string>();

    for (const edge of topology.edges) {
      expect(edge.sourceId).not.toBe(edge.targetId);

      const key = [edge.sourceId, edge.targetId].sort().join(":");
      expect(keys.has(key)).toBe(false);
      keys.add(key);
    }
  });

  it("attaches every signal to a valid edge", () => {
    const topology = generateNetworkTopology(config);
    const edgeIds = new Set(topology.edges.map((edge) => edge.id));

    for (const signal of topology.signals) {
      expect(edgeIds.has(signal.edgeId)).toBe(true);
      expect(signal.progress).toBeGreaterThanOrEqual(0);
      expect(signal.progress).toBeLessThanOrEqual(1);
      expect(signal.speed).toBeGreaterThan(0);
    }
  });

  it("handles zero nodes safely", () => {
    const topology = generateNetworkTopology({ ...config, nodeCount: 0, signalCount: 10 });

    expect(topology.nodes).toEqual([]);
    expect(topology.edges).toEqual([]);
    expect(topology.signals).toEqual([]);
  });

  it("handles one node safely", () => {
    const topology = generateNetworkTopology({ ...config, nodeCount: 1, signalCount: 10 });

    expect(topology.nodes).toHaveLength(1);
    expect(topology.edges).toEqual([]);
    expect(topology.signals).toEqual([]);
  });
});
