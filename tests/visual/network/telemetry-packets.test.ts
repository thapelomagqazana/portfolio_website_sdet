import { describe, expect, it } from "vitest";
import {
  createTelemetryPackets,
  createTelemetryPaths,
  getTelemetryPacketRenderState,
  resolveTelemetryConfig,
  updateTelemetryPacket,
  updateTelemetryPackets,
} from "../../../src/visual/network";
import type { NetworkEdge, NetworkNode } from "../../../src/visual/network";

const nodes: NetworkNode[] = [
  { id: "a", kind: "test", x: 0, y: 0, radius: 2, intensity: 0.5 },
  { id: "b", kind: "security", x: 100, y: 0, radius: 2, intensity: 0.5 },
];

const edges: NetworkEdge[] = [{ id: "edge-a-b", sourceId: "a", targetId: "b", strength: 0.5 }];

const paths = createTelemetryPaths(nodes, edges);

describe("telemetry packets", () => {
  it("creates deterministic packets for the same seed", () => {
    const first = createTelemetryPackets(paths, { packetCount: 4 }, "same");
    const second = createTelemetryPackets(paths, { packetCount: 4 }, "same");

    expect(first).toEqual(second);
  });

  it("creates different packets for different seeds", () => {
    const first = createTelemetryPackets(paths, { packetCount: 4 }, "a");
    const second = createTelemetryPackets(paths, { packetCount: 4 }, "b");

    expect(first).not.toEqual(second);
  });

  it("returns empty packets when no paths exist", () => {
    expect(createTelemetryPackets([], { packetCount: 4 }, "seed")).toEqual([]);
  });

  it("attaches packets only to existing paths", () => {
    const packets = createTelemetryPackets(paths, { packetCount: 4 }, "seed");

    expect(packets).toHaveLength(4);
    expect(packets.every((packet) => packet.pathId === paths[0].id)).toBe(true);
  });

  it("resolves unsafe config safely", () => {
    const config = resolveTelemetryConfig({
      packetCount: -1,
      minPacketSpeed: -1,
      maxPacketSpeed: -2,
      minPacketSize: -1,
      maxPacketSize: -2,
      pulseDurationMs: -1,
      pulseMaxRadius: -1,
    });

    expect(config.packetCount).toBe(0);
    expect(config.minPacketSpeed).toBe(0);
    expect(config.maxPacketSpeed).toBeGreaterThanOrEqual(config.minPacketSpeed);
    expect(config.minPacketSize).toBe(0);
    expect(config.maxPacketSize).toBeGreaterThanOrEqual(config.minPacketSize);
    expect(config.pulseDurationMs).toBe(1);
    expect(config.pulseMaxRadius).toBe(0);
  });

  it("updates packet progress", () => {
    const packet = createTelemetryPackets(paths, { packetCount: 1 }, "seed")[0];
    const updated = updateTelemetryPacket({ ...packet, progress: 0, speed: 0.001 }, 100);

    expect(updated.progress).toBe(0.1);
  });

  it("loops packet progress after one", () => {
    const packet = createTelemetryPackets(paths, { packetCount: 1 }, "seed")[0];
    const updated = updateTelemetryPacket({ ...packet, progress: 0.95, speed: 0.001 }, 100);

    expect(updated.progress).toBeCloseTo(0.05);
  });

  it("ignores negative delta", () => {
    const packet = createTelemetryPackets(paths, { packetCount: 1 }, "seed")[0];
    const updated = updateTelemetryPacket({ ...packet, progress: 0.4 }, -100);

    expect(updated.progress).toBe(0.4);
  });

  it("handles invalid speed safely", () => {
    const packet = createTelemetryPackets(paths, { packetCount: 1 }, "seed")[0];
    const updated = updateTelemetryPacket({ ...packet, progress: 0.4, speed: Number.NaN }, 100);

    expect(updated.progress).toBe(0.4);
  });

  it("updates packet batches immutably", () => {
    const packets = createTelemetryPackets(paths, { packetCount: 2 }, "seed");
    const updated = updateTelemetryPackets(packets, 16);

    expect(updated).not.toBe(packets);
    expect(updated).toHaveLength(2);
  });

  it("returns render state with clamped opacity", () => {
    const packet = createTelemetryPackets(paths, { packetCount: 1 }, "seed")[0];
    const state = getTelemetryPacketRenderState(
      { ...packet, progress: 0.5, size: 2, opacity: 2 },
      paths[0]
    );

    expect(state.point).toEqual({ x: 50, y: 0 });
    expect(state.size).toBe(2);
    expect(state.opacity).toBe(1);
  });

  it("returns non-negative render size", () => {
    const packet = createTelemetryPackets(paths, { packetCount: 1 }, "seed")[0];
    const state = getTelemetryPacketRenderState(
      { ...packet, progress: 0.5, size: -2, opacity: 0.5 },
      paths[0]
    );

    expect(state.size).toBe(0);
  });
});
