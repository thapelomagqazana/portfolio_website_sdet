import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { SelectedWork } from '@/components/work';

/**
 * HomePage — the portfolio landing page.
 *
 * Composes every section in the narrative order defined
 * in Content Inventory §22.
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

      {/* Remaining stub sections */}
      <Section id="experience" heading="Experience" spacing="lg">
        <p className="text-body text-foreground-muted">
          Experience entries arrive in P7-04.
        </p>
      </Section>

      <Section id="career" heading="Career Journey" spacing="lg">
        <p className="text-body text-foreground-muted">
          The career timeline arrives in P7-05.
        </p>
      </Section>

      <Section id="insights" heading="Insights" spacing="lg">
        <p className="text-body text-foreground-muted">
          Engineering Notes arrive in a later phase.
        </p>
      </Section>

      <Section id="contact" heading="Contact" spacing="lg">
        <p className="text-body text-foreground-muted">
          Contact links arrive in P7-06.
        </p>
      </Section>
    </AppShell>
  );
}
