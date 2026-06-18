import { CommunicationTerminal } from "@/components/contact/communication-terminal";
import { ContactActions } from "@/components/contact/contact-actions";
import { MissionRequestForm } from "@/components/contact/mission-request-form";
import { communicationTerminal } from "@/data/contact";

/**
 * Contact section.
 *
 * Ends the portfolio with a terminal-inspired communication experience,
 * reusable contact action launchers, and a structured mission request intake.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="contact-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
              {communicationTerminal.eyebrow}
            </p>

            <h2
              id="contact-heading"
              className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            >
              {communicationTerminal.heading}
            </h2>

            <p className="text-text-secondary mt-5 text-base leading-8">
              {communicationTerminal.description}
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
                Session Intent
              </p>
              <p className="text-text-secondary mt-3 text-sm leading-7">
                Quality-first engineering conversations, SDET opportunities, BrikByteOS
                collaboration, and practical software delivery discussions.
              </p>
            </div>
          </div>

          <CommunicationTerminal />
        </div>

        <ContactActions />
        <MissionRequestForm />
      </div>
    </section>
  );
}
