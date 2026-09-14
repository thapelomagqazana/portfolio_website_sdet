import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import { RouteLink } from '@/lib/router';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { SelectedWork } from '@/components/work';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Certifications, Education } from '@/components/certifications';
import { Philosophy } from '@/components/philosophy';
import { Journey } from '@/components/journey';
import { Contact } from '@/components/contact';

/**
 * HomePage — the portfolio landing page.
 *
 * Composes every section in the narrative order defined
 * in Content Inventory §22.
 *
 * Sections wired:
 *   Hero             (P6-01..03)
 *   About            (P7-01..02)
 *   Selected Work    (P8-01..09)
 *   Experience       (P9-01..02)
 *   Skills           (P10-01)
 *   Certifications   (P11-01)
 *   Education        (P11-02)
 *   Philosophy       (P12-01)
 *   Journey          (P13-01..02)
 *   Insights link    (P14-03 — dedicated page at /insights)
 *
 * Remaining stub: Contact (P7-06).
 */
export function HomePage() {
  return (
    <AppShell
      header={<SiteNav />}
      footer={
        <Container className="py-12">
          <p className="text-small text-foreground-subtle">
            © 2026 Thapelo Magqazana
          </p>
        </Container>
      }
    >
      <span id="top" aria-hidden="true" />

      <Hero />
      <About />
      <SelectedWork />
      <Experience />
      <Skills />
      <Certifications />
      <Education />
      <Philosophy />
      <Journey />

      {/* Insights — link to the dedicated /insights index */}
      <Section id="insights" aria-labelledby="insights-heading" spacing="lg">
        <header className="mb-8 max-w-2xl">
          <p className="text-label mb-4">ENGINEERING NOTES</p>
          <h2 id="insights-heading" className="text-h2">
            Notes on quality, automation and engineering discipline.
          </h2>
        </header>
        <RouteLink
          to="/insights"
          className="inline-flex items-center gap-2 text-body font-medium text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          Read the notes
        </RouteLink>
      </Section>

      <Contact />
    </AppShell>
  );
}
