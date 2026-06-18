"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ContactAction } from "@/data/contact-actions";
import { contactActionStatusLabels } from "@/data/contact-actions";
import { getExternalLinkLabel, isResumeAction, normalizeContactLink } from "@/lib/contact-actions";

export type ContactActionCardProps = {
  readonly action: ContactAction;
  readonly index?: number;
};

/**
 * Reusable engineering contact action card.
 *
 * It renders one command-channel card with secure link behavior, accessible
 * naming, status metadata, and reduced-motion friendly interaction.
 */
export function ContactActionCard({ action, index = 0 }: ContactActionCardProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const href = normalizeContactLink(action.href);

  const isExternal = action.external;
  const shouldDownload = isResumeAction(action);

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      data-testid="contact-action-card"
    >
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        download={shouldDownload ? true : undefined}
        aria-label={getExternalLinkLabel(action)}
        className={[
          "group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition",
          "hover:border-accent-green/40 hover:bg-accent-green/10 hover:-translate-y-1",
          "focus-visible:ring-accent-blue/70 focus:outline-none focus-visible:ring-2",
        ].join(" ")}
        data-testid={`contact-action-${action.id}`}
      >
        <div className="flex items-start justify-between gap-4">
          <ContactActionIcon id={action.id} />

          <StatusBadge status={action.status} />
        </div>

        <h3 className="font-display text-text-primary mt-5 text-2xl font-black">{action.title}</h3>

        <p className="text-text-secondary mt-3 text-sm leading-7">{action.description}</p>

        <div className="bg-background-deep/60 mt-5 rounded-2xl border border-white/10 p-3">
          <p className="text-accent-green font-mono text-xs">$ {action.command}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-text-muted font-mono text-xs">
            {isExternal ? "External channel" : shouldDownload ? "Download asset" : "Direct channel"}
          </span>

          <span
            aria-hidden="true"
            className="text-accent-blue font-mono transition group-hover:translate-x-1"
          >
            {isExternal ? "↗" : "→"}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function ContactActionIcon({ id }: { readonly id: ContactAction["id"] }) {
  const iconMap: Record<ContactAction["id"], string> = {
    linkedin: "in",
    github: "⌘",
    email: "@",
    resume: "CV",
  };

  return (
    <span
      aria-hidden="true"
      className="border-accent-blue/25 bg-accent-blue/10 text-accent-blue flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-sm font-black transition group-hover:scale-105"
    >
      {iconMap[id]}
    </span>
  );
}

function StatusBadge({ status }: { readonly status: ContactAction["status"] }) {
  return (
    <span className="border-accent-green/30 bg-accent-green/10 text-accent-green inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
      <span aria-hidden="true">●</span>
      {contactActionStatusLabels[status]}
    </span>
  );
}
