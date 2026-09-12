/**
 * App — Thapelo Magqazana Engineering Portfolio
 *
 * Root component. Currently a placeholder while the design
 * system is being built. Real sections arrive in Phase 4.
 *
 * References:
 *   Design System §6  — Theme
 *   Design System §24 — Hero design (future)
 */
function App() {
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="max-w-prose text-center">
        <p className="text-label">The Engineering Lab</p>
        <h1 className="text-display mt-6 text-foreground">Thapelo Magqazana</h1>
        <p className="text-body-lg mt-6 text-foreground-muted">
          QA Engineer · Test Automation · Software Quality
        </p>
        <p className="text-small mt-4 text-foreground-subtle">
          Design system ready — Phase 4 next.
        </p>
      </div>
    </main>
  );
}

export default App;
