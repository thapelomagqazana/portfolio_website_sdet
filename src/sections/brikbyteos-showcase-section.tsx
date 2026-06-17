import { ProblemSolutionStory } from "@/components/brikbyteos/problem-solution-story";
import { ReleasePipelineVisualization } from "@/components/brikbyteos/release-pipeline-visualization";
import { ArchitectureExplorer } from "@/components/brikbyteos/architecture-explorer";
import { RoadmapVisualization } from "@/components/brikbyteos/roadmap-visualization";
import { releasePipelineCopy } from "@/data/release-pipeline";

export function BrikByteOSShowcaseSection() {
  return (
    <section
      id="brikbyteos"
      aria-labelledby="brikbyteos-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="brikbyteos-showcase-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-accent-green font-mono text-xs tracking-[0.28em] uppercase">
              {releasePipelineCopy.eyebrow}
            </p>

            <p className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue mt-5 inline-flex rounded-full border px-3 py-2 font-mono text-xs tracking-[0.18em] uppercase">
              {releasePipelineCopy.badge}
            </p>

            <h2
              id="brikbyteos-heading"
              className="font-display text-text-primary mt-5 text-4xl font-black tracking-tight sm:text-5xl"
            >
              {releasePipelineCopy.heading}
            </h2>

            <div className="text-text-secondary mt-5 space-y-4 text-lg leading-8">
              <p>{releasePipelineCopy.description}</p>
              <p className="text-text-primary font-mono text-sm">
                {releasePipelineCopy.productDefinition}
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-text-muted font-mono text-xs uppercase">
                {releasePipelineCopy.statusLabel}
              </p>
              <p className="font-display text-accent-green mt-2 text-2xl font-bold">
                {releasePipelineCopy.statusValue}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={releasePipelineCopy.primaryCta.href}
                className="border-accent-blue/40 bg-accent-blue/10 text-accent-blue rounded-full border px-5 py-3 text-center font-mono text-sm font-semibold"
              >
                {releasePipelineCopy.primaryCta.label}
              </a>

              <a
                href={releasePipelineCopy.secondaryCta.href}
                className="text-text-primary rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center font-mono text-sm font-semibold"
              >
                {releasePipelineCopy.secondaryCta.label}
              </a>
            </div>
          </div>

          <ReleasePipelineVisualization />
        </div>

        <ProblemSolutionStory />
        <ArchitectureExplorer />
        <RoadmapVisualization />
      </div>
    </section>
  );
}
