import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';

/**
 * App — Thapelo Magqazana Engineering Portfolio
 *
 * Root component. Wraps every page in the AppShell and
 * renders placeholder content until real sections land
 * in later Phase 5 tasks.
 *
 * Section ids (#about, #work, #experience, #insights, #contact)
 * match src/content/navigation.ts so:
 *   - anchor links resolve
 *   - useActiveSection can highlight the visible link
 *
 * References:
 *   P5-01     — AppShell (Header, Main, Footer)
 *   P5-02     — Navigation (SiteNav, nav items)
 *   P5-04     — Hero section
 *   Design System §6  — Theme
 *   Design System §24 — Hero design
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

      {/* Hero — real content (Content Inventory C-01) */}
      <Section id="about" spacing="xl">
        <p className="text-label mb-6">
          QA ENGINEER · TEST AUTOMATION · SOFTWARE QUALITY
        </p>
        <h1 className="text-display max-w-4xl text-foreground">
          I build, test and automate software for confidence.
        </h1>
        <p className="text-body-lg mt-6 max-w-prose text-foreground-muted">
          QA Engineer focused on API, UI and CI/CD testing, with a
          software-development foundation in Python and Java.
        </p>
      </Section>

      {/* Stub sections — real content arrives in later tasks */}
      <Section id="work" heading="Selected Work" spacing="lg">
        <p className="text-body text-foreground-muted">
          QINIS and BrikByteOS arrive in P5-05.
        </p>
      </Section>

      <Section id="experience" heading="Experience" spacing="lg">
        <p className="text-body text-foreground-muted">
          Experience entries arrive in P5-06.
        </p>
      </Section>

      <Section id="insights" heading="Insights" spacing="lg">
        <p className="text-body text-foreground-muted">
          Engineering Notes arrive in a later phase.
        </p>
      </Section>

      <Section id="contact" heading="Contact" spacing="lg">
        <p className="text-body text-foreground-muted">
          Contact links arrive in P5-03.
        </p>
      </Section>
    </AppShell>
  );
}

export default App;
