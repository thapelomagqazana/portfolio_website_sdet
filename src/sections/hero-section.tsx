import { heroBadges, heroContent, heroIdentity } from "@/data/hero";
import { QualityGateVisualization } from "@/components/hero/quality-gate-visualization";

/**
 * HeroSection renders the first major content section after the opening sequence.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
      data-testid="hero-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(123,97,255,0.18),transparent_34%),linear-gradient(180deg,rgba(7,11,20,0.2),rgba(7,11,20,1))]"
      />

      <div
        className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 xl:grid-cols-[1.25fr_0.75fr]"
        data-testid="hero-responsive-grid"
      >
        <div className="max-w-4xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.28em] uppercase">
            {heroContent.eyebrow}
          </p>

          <p className="text-text-primary mt-4 font-mono text-sm tracking-[0.32em] uppercase sm:text-base">
            {heroIdentity.name}
          </p>

          <h1
            id="hero-heading"
            className="font-display text-text-primary mt-5 max-w-5xl text-5xl font-black tracking-tight sm:text-6xl xl:text-7xl"
          >
            {heroContent.headline}
          </h1>

          <div className="text-text-secondary mt-6 max-w-3xl space-y-3 text-lg leading-8">
            <p>{heroContent.positioning}</p>
            <p>{heroContent.description}</p>
            <p className="text-text-primary font-mono text-sm">{heroContent.brikByteLine}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Hero role badges">
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue rounded-full border px-3 py-2 font-mono text-xs"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={heroContent.primaryCta.href}
              data-analytics-id={heroContent.primaryCta.analyticsId}
              className="border-accent-blue/50 bg-accent-blue/15 text-accent-blue hover:bg-accent-blue/25 rounded-full border px-6 py-3 text-center font-mono text-sm font-semibold transition"
            >
              {heroContent.primaryCta.label}
            </a>

            <a
              href={heroContent.secondaryCta.href}
              data-analytics-id={heroContent.secondaryCta.analyticsId}
              className="text-text-primary rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-center font-mono text-sm font-semibold transition hover:bg-white/[0.07]"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>

          <p className="border-accent-green/50 text-text-secondary mt-8 border-l pl-4 font-mono text-sm">
            {heroContent.proofLine}
          </p>
        </div>

        <aside aria-label="Release confidence dashboard" className="grid gap-5">
          <QualityGateVisualization />
        </aside>
      </div>
    </section>
  );
}
