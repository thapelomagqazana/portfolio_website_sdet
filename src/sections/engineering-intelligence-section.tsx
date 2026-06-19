import { ResearchArchive } from "@/components/articles/research-archive";
import { IntelligenceSearch } from "@/components/search/intelligence-search";
import { engineeringIntelligenceCopy } from "@/data/knowledge-base";

/**
 * Engineering Intelligence section.
 *
 * Presents the portfolio knowledge system as an engineering intelligence hub:
 * - global intelligence search
 * - structured research archive
 * - long-form engineering articles
 */
export function EngineeringIntelligenceSection() {
  return (
    <section
      id="engineering-intelligence"
      aria-labelledby="engineering-intelligence-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="engineering-intelligence-section"
    >
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
            {engineeringIntelligenceCopy.eyebrow}
          </p>

          <h2
            id="engineering-intelligence-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {engineeringIntelligenceCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-base leading-8">
            {engineeringIntelligenceCopy.description}
          </p>
        </header>

        <div className="mt-10">
          <IntelligenceSearch />
        </div>

        <ResearchArchive />
      </div>
    </section>
  );
}
