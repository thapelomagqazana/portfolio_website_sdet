import { MissionTimeline } from "@/components/experience/mission-timeline";
import { experienceTimelineCopy } from "@/data/experience-timeline";

/**
 * Experience section.
 *
 * Presents Thapelo's journey as a mission progression rather than a generic
 * CV list. The section connects education, training, project execution,
 * quality engineering, BrikByteOS, and leadership.
 */
export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="experience-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
              {experienceTimelineCopy.eyebrow}
            </p>

            <h2
              id="experience-heading"
              className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            >
              {experienceTimelineCopy.heading}
            </h2>

            <p className="text-text-secondary mt-5 text-base leading-8">
              {experienceTimelineCopy.description}
            </p>
          </div>

          <aside
            className="border-accent-green/20 bg-accent-green/10 rounded-3xl border p-5"
            data-testid="experience-narrative"
          >
            <p className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase">
              {experienceTimelineCopy.narrativeTitle}
            </p>

            <p className="text-text-secondary mt-3 text-sm leading-7">
              {experienceTimelineCopy.narrative}
            </p>
          </aside>
        </div>

        <div className="mt-10">
          <MissionTimeline />
        </div>
      </div>
    </section>
  );
}
