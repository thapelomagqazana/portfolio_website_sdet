import { ContactActionCard } from "@/components/contact/contact-action-card";
import { contactActions, contactActionsCopy } from "@/data/contact-actions";
import type { ContactAction } from "@/data/contact-actions";
import { validateContactActions } from "@/lib/contact-actions";

export type ContactActionsProps = {
  readonly actions?: readonly ContactAction[];
};

/**
 * Reusable contact actions grid.
 *
 * This component is safe to reuse in the contact section, communication
 * terminal, footer, navigation drawer, or future command palette.
 */
export function ContactActions({ actions = contactActions }: ContactActionsProps) {
  const validActions = validateContactActions(actions) ? actions : [];

  return (
    <section
      aria-labelledby="contact-actions-heading"
      className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5"
      data-testid="contact-actions"
    >
      <div className="max-w-3xl">
        <p className="text-accent-blue font-mono text-xs tracking-[0.3em] uppercase">
          {contactActionsCopy.eyebrow}
        </p>

        <h2
          id="contact-actions-heading"
          className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight"
        >
          {contactActionsCopy.heading}
        </h2>

        <p className="text-text-secondary mt-4 text-sm leading-7">
          {contactActionsCopy.description}
        </p>
      </div>

      {validActions.length === 0 ? (
        <div
          className="bg-background-deep/50 text-text-secondary mt-6 rounded-2xl border border-white/10 p-4 text-sm"
          data-testid="contact-actions-empty"
        >
          No contact actions are currently available.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="contact-actions-grid">
          {validActions.map((action, index) => (
            <ContactActionCard key={action.id} action={action} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
