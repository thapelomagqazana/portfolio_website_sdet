import { Section } from '@/components/layout';
import { useReveal } from '@/hooks/useReveal';
import { contactHeading, contactSupporting } from '@/content/contact';
import { ContactActions } from './ContactActions';

/**
 * Contact — closing section.
 *
 * Task P15-01:
 *   Heading: "Let's build better software."
 *   Supporting: convert interest into a conversation
 *   Actions: Email, Portfolio, LinkedIn, GitHub
 *
 * Content Inventory §15 — The section makes the next action
 * obvious. No contact form for V1 — email and LinkedIn are
 * sufficient.
 *
 * Motion:
 *   The whole section fades up on scroll entry (P22 effect 1).
 *   Heading, supporting text and contact actions reveal
 *   together as one closing statement.
 *
 * Conversion Goals §10 — End of funnel. The visitor who
 * reaches here has seen the evidence; the goal is to remove
 * friction from the next step.
 *
 * Anchored at #contact so nav and CTAs can deep-link here.
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      spacing="xl"
      surface="surface"
    >
      <div ref={ref} data-reveal="false">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + supporting text */}
          <div className="lg:col-span-6">
            <p className="text-label mb-6">CONTACT</p>
            <h2 id="contact-heading" className="text-h1 text-foreground">
              {contactHeading}
            </h2>
            <p className="mt-6 max-w-prose text-body-lg text-foreground-muted">
              {contactSupporting}
            </p>
          </div>

          {/* Right: actions */}
          <div className="lg:col-span-6 lg:self-end">
            <ContactActions />
          </div>
        </div>
      </div>
    </Section>
  );
}
