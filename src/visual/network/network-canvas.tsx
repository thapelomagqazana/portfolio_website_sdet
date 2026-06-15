"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createTelemetryPackets,
  createTelemetryPaths,
  generateNetworkTopology,
  getCanvasSize,
  getResponsiveNetworkConfig,
  getTelemetryPacketRenderState,
  updateTelemetryPackets,
  useNetworkRenderLoop,
} from "@/visual/network";
import type { CanvasSize, NetworkTopology, TelemetryPacket, TelemetryPath } from "@/visual/network";

export type NetworkCanvasProps = {
  readonly className?: string;
};

/**
 * NetworkCanvas wires the Background Engine into a real canvas renderer.
 *
 * Pipeline:
 * viewport size
 * → responsive network config
 * → deterministic topology
 * → telemetry paths
 * → telemetry packets
 * → animation frame updates
 * → canvas drawing
 */
export function NetworkCanvas({ className }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef<CanvasSize | null>(null);
  const topologyRef = useRef<NetworkTopology | null>(null);
  const pathsRef = useRef<readonly TelemetryPath[]>([]);
  const packetsRef = useRef<readonly TelemetryPacket[]>([]);

  const [isReady, setIsReady] = useState(false);

  const resizeAndGenerate = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;

    const rect = parent.getBoundingClientRect();
    const size = getCanvasSize(rect.width, rect.height, globalThis.devicePixelRatio);

    canvas.width = size.pixelWidth;
    canvas.height = size.pixelHeight;
    canvas.style.width = `${size.cssWidth}px`;
    canvas.style.height = `${size.cssHeight}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(size.pixelRatio, 0, 0, size.pixelRatio, 0, 0);

    const config = getResponsiveNetworkConfig("thapelo-sdet-background", {
      width: size.cssWidth,
      height: size.cssHeight,
    });

    const topology = generateNetworkTopology(config);
    const paths = createTelemetryPaths(topology.nodes, topology.edges);
    const packets = createTelemetryPackets(paths, { packetCount: config.signalCount }, config.seed);

    sizeRef.current = size;
    topologyRef.current = topology;
    pathsRef.current = paths;
    packetsRef.current = packets;

    setIsReady(true);
  }, []);

  const drawFrame = useCallback((deltaMs: number) => {
    const canvas = canvasRef.current;
    const size = sizeRef.current;
    const topology = topologyRef.current;

    if (!canvas || !size || !topology) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    packetsRef.current = updateTelemetryPackets(packetsRef.current, deltaMs);

    context.clearRect(0, 0, size.cssWidth, size.cssHeight);

    for (const edge of topology.edges) {
      const source = topology.nodes.find((node) => node.id === edge.sourceId);
      const target = topology.nodes.find((node) => node.id === edge.targetId);

      if (!source || !target) continue;

      context.beginPath();
      context.moveTo(source.x, source.y);
      context.lineTo(target.x, target.y);
      context.strokeStyle = `rgba(0, 212, 255, ${0.08 + edge.strength * 0.08})`;
      context.lineWidth = 1;
      context.stroke();
    }

    for (const node of topology.nodes) {
      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(0, 245, 160, ${0.25 + node.intensity * 0.35})`;
      context.fill();
    }

    const pathsById = new Map(pathsRef.current.map((path) => [path.id, path]));

    for (const packet of packetsRef.current) {
      const path = pathsById.get(packet.pathId);
      if (!path) continue;

      const renderState = getTelemetryPacketRenderState(packet, path);

      context.beginPath();
      context.arc(renderState.point.x, renderState.point.y, renderState.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(123, 97, 255, ${renderState.opacity})`;
      context.fill();
    }
  }, []);

  useEffect(() => {
    resizeAndGenerate();

    globalThis.addEventListener("resize", resizeAndGenerate, { passive: true });

    return () => {
      globalThis.removeEventListener("resize", resizeAndGenerate);
    };
  }, [resizeAndGenerate]);

  useNetworkRenderLoop({
    enabled: isReady,
    targetFps: 60,
    onFrame: (frame) => drawFrame(frame.deltaMs),
  });

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
