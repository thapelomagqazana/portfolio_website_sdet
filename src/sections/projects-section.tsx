import { EvidenceVault } from "@/components/projects/evidence-vault";
import { projectsCopy } from "@/data/projects";

/**
 * Projects section.
 *
 * Presents projects as proof files that demonstrate engineering judgment,
 * technical execution, testability, and quality thinking.
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="projects-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
            {projectsCopy.eyebrow}
          </p>

          <h2
            id="projects-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {projectsCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-base leading-8">{projectsCopy.description}</p>
        </div>

        <EvidenceVault />
      </div>
    </section>
  );
}
