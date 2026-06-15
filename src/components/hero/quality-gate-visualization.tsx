"use client";

import { motion, useReducedMotion } from "motion/react";
import { qualityGateSignalCount, qualityGateSignals, qualityGateStatus } from "@/data/quality-gate";

/**
 * Position in percentage coordinates inside the visualization container.
 */
export type SignalPosition = {
  readonly x: number;
  readonly y: number;
};

/**
 * Resolves a signal position around a circular gate.
 *
 * @param index - Signal index.
 * @param total - Total signal count.
 * @param radius - Circle radius percentage.
 * @returns CSS-positionable x/y percentages.
 */
export function getSignalPosition(index: number, total: number, radius = 42): SignalPosition {
  if (!Number.isFinite(index) || !Number.isFinite(total) || total <= 0) {
    return { x: 50, y: 50 };
  }

  const safeIndex = Math.max(0, Math.floor(index));
  const angle = (safeIndex / total) * Math.PI * 2 - Math.PI / 2;

  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

/**
 * Resolves the center release gate position.
 */
export function getGateCenterPosition(): SignalPosition {
  return { x: 50, y: 50 };
}

/**
 * Converts two points into a CSS translate vector.
 *
 * This is used by moving telemetry packets so each packet visibly travels
 * from a quality signal node toward the approved release gate.
 */
export function getSignalToGateVector(start: SignalPosition, end: SignalPosition): SignalPosition {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}

/**
 * QualityGateVisualization renders a BrikByteOS-style approval visual.
 *
 * Narrative:
 * - Signals begin at Tests/Security/Performance/Evidence/Policy.
 * - Telemetry packets flow inward.
 * - The center gate evaluates the evidence.
 * - The release is approved.
 */
export function QualityGateVisualization() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const gateCenter = getGateCenterPosition();

  return (
    <section
      aria-label={`${qualityGateStatus.label}: ${qualityGateStatus.verdict}, ${qualityGateStatus.confidence}, ${qualityGateStatus.detail}`}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(0,245,160,0.12)] backdrop-blur-xl"
      data-testid="quality-gate-visualization"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
          {qualityGateStatus.label}
        </p>

        <span className="border-accent-green/30 bg-accent-green/10 text-accent-green rounded-full border px-3 py-1 font-mono text-[10px] uppercase">
          Signals Evaluating
        </span>
      </div>

      <div className="relative mx-auto mt-8 aspect-square max-w-[360px]">
        <div aria-hidden="true" className="absolute inset-0 rounded-full border border-white/10" />

        <motion.div
          aria-hidden="true"
          className="border-accent-blue/25 border-t-accent-blue absolute inset-4 rounded-full border"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          aria-hidden="true"
          className="border-accent-purple/25 border-b-accent-purple absolute inset-10 rounded-full border"
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          aria-hidden="true"
          className="border-accent-green/25 border-l-accent-green absolute inset-16 rounded-full border"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {qualityGateSignals.map((signal, index) => {
          const position = getSignalPosition(index, qualityGateSignalCount);
          const vector = getSignalToGateVector(position, gateCenter);

          return (
            <div key={signal}>
              <div
                aria-hidden="true"
                className="from-accent-blue/40 absolute h-px origin-left bg-gradient-to-r to-transparent"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  width: `${Math.hypot(vector.x, vector.y)}%`,
                  transform: `rotate(${Math.atan2(vector.y, vector.x)}rad)`,
                }}
              />

              <motion.span
                aria-hidden="true"
                className="bg-accent-blue absolute block h-2 w-2 rounded-full shadow-[0_0_18px_rgba(0,212,255,0.75)]"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: [`0%`, `${vector.x}%`],
                        y: [`0%`, `${vector.y}%`],
                        scale: [0.8, 1.15, 0.75],
                        opacity: [0, 1, 0],
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.28,
                  ease: "easeInOut",
                }}
              />

              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
              >
                <motion.span
                  aria-hidden="true"
                  className="bg-accent-green mx-auto block h-2 w-2 rounded-full shadow-[0_0_18px_rgba(0,245,160,0.75)]"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: [0.9, 1.25, 0.9],
                          opacity: [0.45, 1, 0.45],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: index * 0.18,
                    ease: "easeInOut",
                  }}
                />

                <span className="bg-background-deep/80 text-text-secondary mt-2 block rounded-full border border-white/10 px-2 py-1 font-mono text-[10px]">
                  {signal}
                </span>
              </div>
            </div>
          );
        })}

        <div className="border-accent-green/30 bg-background-deep/90 absolute top-1/2 left-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border p-6 text-center shadow-[0_0_50px_rgba(0,245,160,0.16)]">
          <p className="text-text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
            Evaluating
          </p>

          <p className="font-display text-accent-green mt-2 text-3xl font-black">
            {qualityGateStatus.verdict}
          </p>

          <p className="text-text-primary mt-2 font-mono text-sm">{qualityGateStatus.confidence}</p>

          <p className="text-text-secondary mt-2 text-xs">{qualityGateStatus.detail}</p>
        </div>
      </div>

      <p className="text-text-muted mt-5 text-center font-mono text-[11px] tracking-[0.18em] uppercase">
        Signals flowing into release gate
      </p>

      <ul className="sr-only">
        {qualityGateSignals.map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>
    </section>
  );
}
