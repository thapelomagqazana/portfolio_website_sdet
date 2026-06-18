import { FinalVerdict } from "@/components/footer/final-verdict";
import { FooterNavigation } from "@/components/footer/footer-navigation";
import { StatusDeck } from "@/components/footer/status-deck";
import { footerCopy } from "@/data/footer";

/**
 * Footer section.
 *
 * Presents the portfolio footer as an engineering status deck with operational
 * health, mission summary, build metadata, navigation, final verdict, and
 * brand signature.
 */
export function FooterSection() {
  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      className="px-4 pt-20 pb-8 sm:px-6 lg:px-8"
      data-testid="footer-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
            {footerCopy.eyebrow}
          </p>

          <h2
            id="footer-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {footerCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-base leading-8">{footerCopy.summary}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <StatusDeck />
          <FooterNavigation />
        </div>

        <FinalVerdict />

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-text-secondary flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
            <p>{footerCopy.copyright}</p>
            <p>{footerCopy.signature}</p>
            <p>{footerCopy.poweredBy}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
