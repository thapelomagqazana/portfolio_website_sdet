"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  experienceCategoryLabels,
  experienceStatusLabels,
  experienceTimelineEvents,
  getCurrentExperienceEvent,
  getExperienceCategoryLabel,
  getExperienceStatusLabel,
} from "@/data/experience-timeline";
import type { ExperienceTimelineEvent } from "@/data/experience-timeline";

export type MissionTimelineProps = {
  readonly events?: readonly ExperienceTimelineEvent[];
};

/**
 * Animated mission experience timeline.
 *
 * Interaction model:
 * - current event is active by default
 * - hover/focus previews an active milestone
 * - click locks a selected milestone
 * - Escape clears the locked selection and returns to current mission
 *
 * Layout note:
 * The event cards use a horizontal scroll rail instead of fixed six-column cards.
 * This prevents narrow card wrapping and keeps long mission titles readable.
 */
export function MissionTimeline({ events = experienceTimelineEvents }: MissionTimelineProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const currentEvent = getCurrentExperienceEvent(events);

  const [previewEventId, setPreviewEventId] = useState<string | undefined>(currentEvent?.id);
  const [lockedEventId, setLockedEventId] = useState<string | undefined>();

  const activeEventId = lockedEventId ?? previewEventId ?? currentEvent?.id;

  const activeEvent = useMemo(
    () => events.find((event) => event.id === activeEventId) ?? currentEvent,
    [activeEventId, currentEvent, events]
  );

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setLockedEventId(undefined);
      setPreviewEventId(currentEvent?.id);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [currentEvent?.id]);

  if (events.length === 0) {
    return (
      <div
        className="text-text-secondary rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        data-testid="mission-timeline-empty"
      >
        No mission timeline events configured.
      </div>
    );
  }

  return (
    <div data-testid="mission-timeline">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-4">
          <ol
            className="relative grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-5 overflow-x-auto pr-2 pb-4 lg:auto-cols-[minmax(18rem,1fr)]"
            aria-label="Experience mission timeline"
            data-testid="mission-timeline-list"
          >
            {events.map((event, index) => {
              const isActive = event.id === activeEvent?.id;
              const isCurrent = event.status === "current";

              return (
                <motion.li
                  key={event.id}
                  className="relative"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`${event.period}: ${event.title}`}
                    onMouseEnter={() => setPreviewEventId(event.id)}
                    onFocus={() => setPreviewEventId(event.id)}
                    onClick={() => setLockedEventId(event.id)}
                    className={[
                      "relative z-10 flex h-full min-h-[33rem] w-full flex-col rounded-3xl border p-5 text-left backdrop-blur-xl transition",
                      "focus-visible:ring-accent-blue/70 focus:outline-none focus-visible:ring-2",
                      isActive
                        ? "border-accent-green/50 bg-accent-green/10 shadow-[0_0_42px_rgba(52,211,153,0.16)]"
                        : "hover:border-accent-blue/30 border-white/10 bg-white/[0.04] hover:bg-white/[0.06]",
                    ].join(" ")}
                    data-testid={`mission-event-${event.id}`}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs",
                        isCurrent
                          ? "border-accent-green/60 bg-accent-green/20 text-accent-green"
                          : "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
                      ].join(" ")}
                    >
                      {isCurrent ? "◉" : "●"}
                    </span>

                    <p className="text-text-muted font-mono text-[10px] tracking-[0.22em] uppercase">
                      {event.period}
                    </p>

                    <h3 className="font-display text-text-primary mt-3 text-xl leading-tight font-black">
                      {event.title}
                    </h3>

                    <p className="text-text-secondary mt-3 text-sm leading-6">{event.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue rounded-full border px-3 py-1 font-mono text-[10px]">
                        {getExperienceCategoryLabel(event.category)}
                      </span>

                      <span className="border-accent-green/30 bg-accent-green/10 text-accent-green rounded-full border px-3 py-1 font-mono text-[10px]">
                        {getExperienceStatusLabel(event.status)}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.evidence.map((item) => (
                        <span
                          key={item}
                          className="bg-background-deep/50 text-text-secondary rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <ActiveMissionPanel event={activeEvent} />
      </div>
    </div>
  );
}

type ActiveMissionPanelProps = {
  readonly event: ExperienceTimelineEvent | undefined;
};

/**
 * Detail panel for the active timeline milestone.
 */
function ActiveMissionPanel({ event }: ActiveMissionPanelProps) {
  if (!event) return null;

  return (
    <aside
      className="border-accent-blue/20 bg-accent-blue/10 rounded-3xl border p-6 backdrop-blur-xl xl:sticky xl:top-24 xl:self-start"
      aria-labelledby="active-mission-heading"
      data-testid="active-mission-panel"
    >
      <p className="text-accent-blue font-mono text-xs tracking-[0.24em] uppercase">
        Active Mission Log
      </p>

      <h3
        id="active-mission-heading"
        className="font-display text-text-primary mt-3 text-3xl leading-tight font-black"
      >
        {event.title}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue rounded-full border px-3 py-1 font-mono text-[10px]">
          {experienceCategoryLabels[event.category]}
        </span>

        <span className="border-accent-green/30 bg-accent-green/10 text-accent-green rounded-full border px-3 py-1 font-mono text-[10px]">
          {experienceStatusLabels[event.status]}
        </span>
      </div>

      <p className="text-text-secondary mt-5 text-sm leading-7">{event.summary}</p>

      <section className="mt-6">
        <h4 className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
          Evidence Points
        </h4>

        <ul className="mt-3 grid gap-3">
          {event.evidence.map((item) => (
            <li
              key={item}
              className="bg-background-deep/50 text-text-secondary rounded-2xl border border-white/10 p-3 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
