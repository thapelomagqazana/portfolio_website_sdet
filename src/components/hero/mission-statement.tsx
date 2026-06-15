"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  engineeringPrinciples,
  MISSION_PRINCIPLE_ROTATION_MS,
  missionStatement,
} from "@/data/mission";

/**
 * Safely resolves the next principle index.
 *
 * @param currentIndex - Current active principle index.
 * @param totalPrinciples - Total number of available principles.
 * @returns The next principle index, looping back to zero at the end.
 */
export function getNextPrincipleIndex(currentIndex: number, totalPrinciples: number): number {
  if (!Number.isFinite(currentIndex) || !Number.isFinite(totalPrinciples) || totalPrinciples <= 0) {
    return 0;
  }

  return (Math.max(0, Math.floor(currentIndex)) + 1) % Math.floor(totalPrinciples);
}

/**
 * MissionStatement renders the Hero mission module.
 *
 * Design goals:
 * - Communicate quality-engineering philosophy clearly.
 * - Rotate memorable engineering principles.
 * - Respect reduced motion.
 * - Avoid aggressive aria-live announcements.
 * - Keep all copy centralized in data files.
 */
export function MissionStatement() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);

  const activePrinciple = engineeringPrinciples[activePrincipleIndex] ?? engineeringPrinciples[0];

  useEffect(() => {
    if (prefersReducedMotion || engineeringPrinciples.length <= 1) {
      return;
    }

    const intervalId = globalThis.setInterval(() => {
      setActivePrincipleIndex((currentIndex) =>
        getNextPrincipleIndex(currentIndex, engineeringPrinciples.length)
      );
    }, MISSION_PRINCIPLE_ROTATION_MS);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      aria-labelledby="mission-statement-heading"
      className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_40px_rgba(0,212,255,0.08)] backdrop-blur-xl"
      data-testid="mission-statement"
    >
      <p className="text-accent-green font-mono text-[11px] tracking-[0.24em] uppercase">
        {missionStatement.eyebrow}
      </p>

      <h2
        id="mission-statement-heading"
        className="font-display text-text-primary mt-4 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {missionStatement.headline}
      </h2>

      <p className="text-text-secondary mt-4 max-w-2xl text-sm leading-7 sm:text-base">
        {missionStatement.body}
      </p>

      <div className="border-accent-blue/20 bg-accent-blue/10 mt-6 rounded-2xl border p-4">
        <p className="text-text-muted font-mono text-[11px] tracking-[0.2em] uppercase">
          Current Principle
        </p>

        <div className="mt-3 min-h-8 overflow-hidden">
          {prefersReducedMotion ? (
            <p className="text-accent-blue font-mono text-sm">{engineeringPrinciples[0]}</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={activePrinciple}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  textShadow: "0 0 18px rgba(0, 212, 255, 0.22)",
                }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-accent-blue font-mono text-sm"
              >
                {activePrinciple}
              </motion.p>
            </AnimatePresence>
          )}
        </div>

        <ul className="sr-only">
          {engineeringPrinciples.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
