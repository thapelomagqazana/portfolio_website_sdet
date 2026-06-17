import { engineerDossier, engineeringPosture, operatorProfileItems } from "@/data/mission-profile";

/**
 * MissionProfileSection renders the professional engineer dossier.
 *
 * Design goals:
 * - Explain who Thapelo is.
 * - Clarify the engineering mission.
 * - Show quality and release-confidence thinking.
 * - Avoid generic "About Me" copy.
 */
export function MissionProfileSection() {
  return (
    <section
      id="about"
      aria-labelledby="mission-profile-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="mission-profile-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" data-testid="mission-profile-grid">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-accent-green font-mono text-xs tracking-[0.28em] uppercase">
              {engineerDossier.eyebrow}
            </p>

            <h2
              id="mission-profile-heading"
              className="font-display text-text-primary mt-5 text-4xl font-black tracking-tight sm:text-5xl"
            >
              {engineerDossier.name}
            </h2>

            <p className="text-accent-blue mt-4 font-mono text-sm tracking-[0.18em] uppercase">
              {engineerDossier.role}
            </p>

            <p className="text-text-muted mt-3 font-mono text-xs tracking-[0.18em] uppercase">
              {engineerDossier.location}
            </p>

            <p className="text-text-secondary mt-6 text-base leading-8">
              {engineerDossier.positioning}
            </p>

            <div className="border-accent-green/20 bg-accent-green/10 mt-8 rounded-2xl border p-5">
              <p className="text-accent-green font-mono text-[11px] tracking-[0.22em] uppercase">
                Mission
              </p>

              <p className="font-display text-text-primary mt-3 text-2xl leading-tight font-bold">
                {engineerDossier.mission}
              </p>
            </div>
          </aside>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
                Operator Profile
              </p>

              <div className="mt-5 grid gap-3">
                {operatorProfileItems.map((item) => (
                  <article
                    key={item.label}
                    className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
                  >
                    <p className="text-accent-blue font-mono text-[11px] tracking-[0.18em] uppercase">
                      {item.label}
                    </p>

                    <p className="text-text-primary mt-2 text-sm leading-6">{item.value}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
                Engineering Posture
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {engineeringPosture.map((statement, index) => (
                  <article
                    key={statement}
                    className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
                  >
                    <p className="text-accent-green font-mono text-[10px] tracking-[0.18em] uppercase">
                      Posture {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="text-text-secondary mt-3 text-sm leading-6">{statement}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
