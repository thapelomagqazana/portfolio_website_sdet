import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import { Hero } from '@/components/hero';

/**
 * App — Thapelo Magqazana Engineering Portfolio
 *
 * Root component. Wraps every page in the AppShell and
 * renders the hero plus placeholder sections until later
 * Phase 6 tasks fill them in.
 *
 * Section ids (#about, #work, #experience, #insights, #contact)
 * match src/content/navigation.ts so:
 *   - anchor links resolve
 *   - useActiveSection can highlight the visible link
 *
 * References:
 *   P5-01     — AppShell (Header, Main, Footer)
 *   P5-02     — Navigation (SiteNav, nav items)
 *   P6-01..03 — Hero, HeroActions, ProofStrip
 */
function App() {
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
      {/* Top anchor — logo links to #top to scroll to the page start */}
      <span id="top" aria-hidden="true" />

      {/* Hero — renders its own <section id="about"> */}
      <Hero />

      {/* Stub sections — real content arrives in later tasks */}
      <Section id="work" heading="Selected Work" spacing="lg">
        <p className="text-body text-foreground-muted">
          QINIS and BrikByteOS arrive in P6-04.
        </p>
      </Section>

      <Section id="experience" heading="Experience" spacing="lg">
        <p className="text-body text-foreground-muted">
          Experience entries arrive in P6-05.
        </p>
      </Section>

      <Section id="insights" heading="Insights" spacing="lg">
        <p className="text-body text-foreground-muted">
          Engineering Notes arrive in a later phase.
        </p>
      </Section>

      <Section id="contact" heading="Contact" spacing="lg">
        <p className="text-body text-foreground-muted">
          Contact links arrive in P6-07.
        </p>
      </Section>
    </AppShell>
  );
}

export default App;
