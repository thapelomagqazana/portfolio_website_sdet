import {
  NETWORK_NODE_KINDS,
  NETWORK_SIGNAL_KINDS,
  NODE_RADIUS,
  SIGNAL_SPEED,
} from "./network.constants";
import { createSeededRandom, pickRandom, randomBetween, randomInteger } from "./seeded-random";
import type {
  NetworkConfig,
  NetworkEdge,
  NetworkNode,
  NetworkSignal,
  NetworkTopology,
} from "./network.types";

/**
 * Keeps numeric values inside a safe range.
 */
function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;

  return Math.min(Math.max(value, min), max);
}

/**
 * Creates deterministic nodes inside the configured bounds.
 */
function generateNodes(config: NetworkConfig): NetworkNode[] {
  const random = createSeededRandom(`${config.seed}:nodes`);
  const nodeCount = Math.max(0, Math.floor(config.nodeCount));

  return Array.from({ length: nodeCount }, (_, index) => {
    const radius = randomBetween(random, NODE_RADIUS.min, NODE_RADIUS.max);

    return {
      id: `node-${index}`,
      kind: pickRandom(random, NETWORK_NODE_KINDS),
      x: randomBetween(random, radius, config.bounds.width - radius),
      y: randomBetween(random, radius, config.bounds.height - radius),
      radius,
      intensity: clamp(randomBetween(random, 0.25, 1), 0, 1),
    };
  });
}

/**
 * Creates deterministic valid edges without self-edges or duplicates.
 */
function generateEdges(config: NetworkConfig, nodes: readonly NetworkNode[]): NetworkEdge[] {
  if (nodes.length < 2) return [];

  const random = createSeededRandom(`${config.seed}:edges`);
  const edgeKeys = new Set<string>();
  const edges: NetworkEdge[] = [];
  const maxEdges = Math.floor((nodes.length * Math.max(0, config.maxEdgesPerNode)) / 2);
  const possibleMaxEdges = (nodes.length * (nodes.length - 1)) / 2;
  const targetEdgeCount = Math.min(maxEdges, possibleMaxEdges);
  const maxAttempts = Math.max(targetEdgeCount * 8, 32);

  let attempts = 0;

  while (edges.length < targetEdgeCount && attempts < maxAttempts) {
    attempts += 1;

    const sourceIndex = randomInteger(random, 0, nodes.length - 1);
    const targetIndex = randomInteger(random, 0, nodes.length - 1);

    if (sourceIndex === targetIndex) continue;

    const [a, b] = [sourceIndex, targetIndex].sort((left, right) => left - right);
    const key = `${a}:${b}`;

    if (edgeKeys.has(key)) continue;

    edgeKeys.add(key);

    edges.push({
      id: `edge-${a}-${b}`,
      sourceId: nodes[a].id,
      targetId: nodes[b].id,
      strength: clamp(randomBetween(random, 0.2, 1), 0, 1),
    });
  }

  return edges;
}

/**
 * Creates deterministic signals attached to existing edges.
 */
function generateSignals(config: NetworkConfig, edges: readonly NetworkEdge[]): NetworkSignal[] {
  if (edges.length === 0) return [];

  const random = createSeededRandom(`${config.seed}:signals`);
  const signalCount = Math.max(0, Math.floor(config.signalCount));

  return Array.from({ length: signalCount }, (_, index) => {
    const edge = edges[randomInteger(random, 0, edges.length - 1)];

    return {
      id: `signal-${index}`,
      kind: pickRandom(random, NETWORK_SIGNAL_KINDS),
      edgeId: edge.id,
      progress: clamp(random(), 0, 1),
      speed: randomBetween(random, SIGNAL_SPEED.min, SIGNAL_SPEED.max),
    };
  });
}

/**
 * Generates a deterministic, renderer-agnostic network topology.
 */
export function generateNetworkTopology(config: NetworkConfig): NetworkTopology {
  const nodes = generateNodes(config);
  const edges = generateEdges(config, nodes);
  const signals = generateSignals(config, edges);

  return {
    nodes,
    edges,
    signals,
  };
}
