"use client";

import { motion, useReducedMotion } from "motion/react";
import { contactProfile, terminalFocusAreas, terminalSystemLines } from "@/data/contact";
import type { ContactProfile } from "@/data/contact";
import {
  formatContactProfile,
  getAvailabilityDescription,
  getAvailabilityLabel,
  getResponseTime,
} from "@/lib/contact";

export type CommunicationTerminalProps = {
  readonly profile?: ContactProfile;
};

/**
 * Terminal-inspired contact status component.
 *
 * This component is intentionally focused on session status and engineering
 * identity. Actual communication links live in ContactActions to avoid
 * duplicated contact systems.
 */
export function CommunicationTerminal({ profile = contactProfile }: CommunicationTerminalProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <div
      className="border-accent-blue/20 bg-background-deep/80 overflow-hidden rounded-3xl border shadow-[0_0_70px_rgba(56,189,248,0.10)] backdrop-blur-xl"
      data-testid="communication-terminal"
    >
      <TerminalHeader />

      <TerminalOutput profile={profile} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}

function TerminalHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="bg-accent-green/70 h-3 w-3 rounded-full" />
      </div>

      <p className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
        terminal://contact/session
      </p>
    </div>
  );
}

function TerminalOutput({
  profile,
  prefersReducedMotion,
}: {
  readonly profile: ContactProfile;
  readonly prefersReducedMotion: boolean;
}) {
  return (
    <div className="p-5 font-mono text-sm" data-testid="terminal-output">
      <TerminalLine command="system status" />
      <TerminalResponse>
        <AvailabilityBadge availability={profile.availability} />

        <p className="text-text-secondary mt-3">
          {getAvailabilityDescription(profile.availability)}
        </p>

        <p className="text-text-muted mt-2">
          Response time:{" "}
          <span className="text-text-primary">{getResponseTime(profile.availability)}</span>
        </p>
      </TerminalResponse>

      <TerminalLine command="whoami" />
      <TerminalResponse>
        <ul className="grid gap-2">
          {formatContactProfile(profile).map((line) => (
            <li key={line} className="text-text-secondary">
              {line}
            </li>
          ))}
        </ul>
      </TerminalResponse>

      <TerminalLine command="focus --areas" />
      <TerminalResponse>
        <div className="flex flex-wrap gap-2">
          {terminalFocusAreas.map((area) => (
            <span
              key={area}
              className="border-accent-blue/20 bg-accent-blue/10 text-accent-blue rounded-full border px-3 py-1.5 text-xs"
            >
              {area}
            </span>
          ))}
        </div>
      </TerminalResponse>

      <TerminalLine command="boot --communication" />
      <TerminalResponse>
        <ul className="grid gap-2">
          {terminalSystemLines.map((line, index) => (
            <motion.li
              key={line}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.25 }}
              className="text-accent-green"
            >
              ✓ {line}
            </motion.li>
          ))}
        </ul>
      </TerminalResponse>

      <div className="text-text-primary mt-6 flex items-center gap-2">
        <span className="text-accent-green">visitor@portfolio:~$</span>
        <span>launch-contact-actions</span>
        <TerminalCursor prefersReducedMotion={prefersReducedMotion} />
      </div>
    </div>
  );
}

function TerminalLine({ command }: { readonly command: string }) {
  return (
    <p className="text-text-primary mt-5 first:mt-0">
      <span className="text-accent-green">$</span> {command}
    </p>
  );
}

function TerminalResponse({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">{children}</div>
  );
}

function AvailabilityBadge({
  availability,
}: {
  readonly availability: ContactProfile["availability"];
}) {
  return (
    <span
      className="border-accent-green/30 bg-accent-green/10 text-accent-green inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs tracking-[0.16em] uppercase"
      data-testid="contact-availability"
    >
      <span aria-hidden="true">●</span>
      {getAvailabilityLabel(availability)}
    </span>
  );
}

function TerminalCursor({ prefersReducedMotion }: { readonly prefersReducedMotion: boolean }) {
  if (prefersReducedMotion) {
    return (
      <span aria-hidden="true" className="text-accent-green">
        █
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
      className="text-accent-green"
    >
      █
    </motion.span>
  );
}
