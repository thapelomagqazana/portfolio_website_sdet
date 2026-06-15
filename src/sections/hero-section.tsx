import { MissionStatement } from "@/components/hero/mission-statement";
import { heroContent, heroDashboardStatus, heroMetrics } from "@/data/hero";

/**
 * HeroSection renders the first major content section after the opening sequence.
 *
 * Design goals:
 * - Communicate SDET positioning within 10 seconds.
 * - Present BrikByteOS/release-confidence thinking visually.
 * - Keep content data-driven.
 * - Remain responsive from mobile to large desktop.
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
        className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        data-testid="hero-responsive-grid"
      >
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.28em] uppercase">
            {heroContent.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="font-display text-text-primary mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
          >
            {heroContent.headline}
          </h1>

          <p className="text-text-secondary mt-6 max-w-2xl text-lg leading-8">
            {heroContent.subheadline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Hero role badges">
            {heroContent.badges.map((badge) => (
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
              className="border-accent-blue/50 bg-accent-blue/15 text-accent-blue hover:bg-accent-blue/25 rounded-full border px-6 py-3 text-center font-mono text-sm font-semibold transition"
            >
              {heroContent.primaryCta.label}
            </a>

            <a
              href={heroContent.secondaryCta.href}
              className="text-text-primary rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-center font-mono text-sm font-semibold transition hover:bg-white/[0.07]"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>

          <p className="border-accent-green/50 text-text-secondary mt-8 border-l pl-4 font-mono text-sm">
            {heroContent.proofLine}
          </p>

          <MissionStatement />
        </div>

        <aside
          aria-label="Release confidence dashboard"
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(0,212,255,0.12)] backdrop-blur-xl sm:p-6"
        >
          <div className="border-accent-green/30 bg-accent-green/10 rounded-2xl border p-5">
            <p className="text-accent-green font-mono text-xs tracking-[0.24em] uppercase">
              {heroDashboardStatus.label}
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-accent-green text-4xl font-black">
                  {heroDashboardStatus.verdict}
                </p>
                <p className="text-text-secondary mt-2 text-sm">{heroDashboardStatus.detail}</p>
              </div>

              <div className="border-accent-green/30 text-accent-green rounded-full border px-3 py-2 font-mono text-xs">
                LIVE
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {heroMetrics.map((metric) => (
              <article
                key={metric.label}
                className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
              >
                <p className="text-text-muted font-mono text-[11px] uppercase">{metric.label}</p>
                <p className="font-display text-text-primary mt-3 text-3xl font-bold">
                  {metric.value}
                </p>
                <p className="text-text-secondary mt-2 text-xs">{metric.detail}</p>
              </article>
            ))}
          </div>

          <div className="bg-background-deep/50 mt-5 rounded-2xl border border-white/10 p-4">
            <p className="text-text-muted font-mono text-xs uppercase">Pipeline Status</p>

            <div className="mt-4 grid gap-2">
              {heroDashboardStatus.pipeline.map((stage, index) => (
                <div
                  key={stage}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <span className="text-text-secondary font-mono text-xs">
                    {String(index + 1).padStart(2, "0")} / {stage}
                  </span>
                  <span className="text-accent-green font-mono text-xs">PASS</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
