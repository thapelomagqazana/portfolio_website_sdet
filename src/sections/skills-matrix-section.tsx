import { EngineeringConstellation } from "@/components/skills/engineering-constellation";
import { skillsMatrixCopy } from "@/data/skills-matrix";

/**
 * SkillsMatrixSection renders the interactive engineering constellation.
 */
export function SkillsMatrixSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-matrix-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="skills-matrix-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.28em] uppercase">
            {skillsMatrixCopy.eyebrow}
          </p>

          <h2
            id="skills-matrix-heading"
            className="font-display text-text-primary mt-4 text-4xl font-black tracking-tight sm:text-5xl"
          >
            {skillsMatrixCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-lg leading-8">
            {skillsMatrixCopy.description}
          </p>
        </div>

        <div className="mt-10">
          <EngineeringConstellation />
        </div>
      </div>
    </section>
  );
}
