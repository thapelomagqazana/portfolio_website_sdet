import { AppShell, Container, Section } from '@/components/layout';

/**
 * App — Thapelo Magqazana Engineering Portfolio
 *
 * Root component. Wraps every page in the AppShell and
 * renders placeholder content until real sections land
 * in later Phase 5 tasks.
 *
 * References:
 *   P5-01     — AppShell (Header, Main, Footer)
 *   Design System §6  — Theme
 *   Design System §24 — Hero design (P5-04)
 */
function App() {
  return (
    <AppShell
      header={
        <Container className="flex h-16 items-center justify-between">
          <span className="text-label">THAPELO MAGQAZANA</span>
        </Container>
      }
      footer={
        <Container className="py-12">
          <p className="text-small text-foreground-subtle">
            © 2026 Thapelo Magqazana
          </p>
        </Container>
      }
    >
      <Section id="hero" spacing="xl">
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
    </AppShell>
  );
}

export default App;
