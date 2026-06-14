import {
  NETWORK_NODE_KINDS,
  NETWORK_SIGNAL_KINDS,
  NODE_RADIUS,
  SIGNAL_SPEED,
} from "./network.constants";
import { clamp, toSafeCount } from "./network-math";
import { createSeededRandom, pickRandom, randomBetween, randomInteger } from "./seeded-random";
import type {
  NetworkConfig,
  NetworkEdge,
  NetworkNode,
  NetworkSignal,
  NetworkTopology,
} from "./network.types";

/**
 * Generates deterministic nodes inside configured bounds.
 */
function generateNodes(config: NetworkConfig): NetworkNode[] {
  const random = createSeededRandom(`${config.seed}:nodes`);
  const nodeCount = toSafeCount(config.nodeCount);

  return Array.from({ length: nodeCount }, (_, index) => {
    const radius = randomBetween(random, NODE_RADIUS.min, NODE_RADIUS.max);
    const maxX = Math.max(radius, config.bounds.width - radius);
    const maxY = Math.max(radius, config.bounds.height - radius);

    return {
      id: `node-${index}`,
      kind: pickRandom(random, NETWORK_NODE_KINDS),
      x: randomBetween(random, radius, maxX),
      y: randomBetween(random, radius, maxY),
      radius,
      intensity: clamp(randomBetween(random, 0.25, 1), 0, 1),
    };
  });
}

/**
 * Generates deterministic, undirected, non-duplicate edges.
 */
function generateEdges(config: NetworkConfig, nodes: readonly NetworkNode[]): NetworkEdge[] {
  if (nodes.length < 2) return [];

  const random = createSeededRandom(`${config.seed}:edges`);
  const edges: NetworkEdge[] = [];
  const edgeKeys = new Set<string>();

  const requestedMaxEdges = Math.floor((nodes.length * toSafeCount(config.maxEdgesPerNode)) / 2);
  const possibleMaxEdges = (nodes.length * (nodes.length - 1)) / 2;
  const targetEdgeCount = Math.min(requestedMaxEdges, possibleMaxEdges);
  const maxAttempts = Math.max(targetEdgeCount * 8, 32);

  let attempts = 0;

  while (edges.length < targetEdgeCount && attempts < maxAttempts) {
    attempts += 1;

    const sourceIndex = randomInteger(random, 0, nodes.length - 1);
    const targetIndex = randomInteger(random, 0, nodes.length - 1);

    if (sourceIndex === targetIndex) continue;

    const [left, right] = [sourceIndex, targetIndex].sort((a, b) => a - b);
    const edgeKey = `${left}:${right}`;

    if (edgeKeys.has(edgeKey)) continue;

    edgeKeys.add(edgeKey);

    edges.push({
      id: `edge-${left}-${right}`,
      sourceId: nodes[left].id,
      targetId: nodes[right].id,
      strength: clamp(randomBetween(random, 0.2, 1), 0, 1),
    });
  }

  return edges;
}

/**
 * Generates deterministic signals attached only to existing edges.
 */
function generateSignals(config: NetworkConfig, edges: readonly NetworkEdge[]): NetworkSignal[] {
  if (edges.length === 0) return [];

  const random = createSeededRandom(`${config.seed}:signals`);
  const signalCount = toSafeCount(config.signalCount);

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
 * Generates renderer-agnostic topology for the command-center background.
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
