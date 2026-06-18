"use client";

import { motion, useReducedMotion } from "motion/react";
import { engineeringStatus, footerMetadata } from "@/data/footer";
import type { StatusCard as StatusCardType } from "@/data/footer";
import { useStatusHeartbeat } from "@/hooks/use-status-heartbeat";
import { formatPortfolioVersion, getStatusLabel, statusCardIsRenderable } from "@/lib/footer";

/**
 * Engineering status deck.
 *
 * Displays portfolio operational health, mission status, release status, and
 * build metadata as a control-room footer panel.
 */
export function StatusDeck() {
  const cards = Object.values(engineeringStatus).filter(statusCardIsRenderable);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const heartbeat = useStatusHeartbeat();

  return (
    <section
      aria-labelledby="status-deck-heading"
      className="border-accent-blue/20 bg-background-deep/80 rounded-3xl border p-5 shadow-[0_0_70px_rgba(56,189,248,0.10)] backdrop-blur-xl"
      data-testid="status-deck"
    >
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-accent-blue font-mono text-xs tracking-[0.3em] uppercase">
            Status Deck
          </p>

          <h2
            id="status-deck-heading"
            className="font-display text-text-primary mt-3 text-2xl font-black"
          >
            Engineering operations console.
          </h2>
        </div>

        <HeartbeatIndicator active={heartbeat} reducedMotion={prefersReducedMotion} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <StatusCard
            key={card.id}
            card={card}
            index={index}
            reducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      <BuildInformation />
    </section>
  );
}

function StatusCard({
  card,
  index,
  reducedMotion,
}: {
  readonly card: StatusCardType;
  readonly index: number;
  readonly reducedMotion: boolean;
}) {
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
      data-testid={`status-card-${card.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-text-muted font-mono text-[10px] tracking-[0.22em] uppercase">
          {card.label}
        </p>

        <span className="border-accent-green/30 bg-accent-green/10 text-accent-green inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
          <span aria-hidden="true">●</span>
          {getStatusLabel(card.status)}
        </span>
      </div>

      <p className="text-text-secondary mt-4 text-sm leading-7">{card.value}</p>
    </motion.article>
  );
}

function HeartbeatIndicator({
  active,
  reducedMotion,
}: {
  readonly active: boolean;
  readonly reducedMotion: boolean;
}) {
  return (
    <div className="border-accent-green/30 bg-accent-green/10 text-accent-green inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase">
      {reducedMotion ? (
        <span aria-hidden="true">●</span>
      ) : (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.85 }}
          transition={{ duration: 0.35 }}
        >
          ●
        </motion.span>
      )}
      <span>Live</span>
    </div>
  );
}

function BuildInformation() {
  const metadata = [
    ["Product", footerMetadata.product],
    ["Portfolio Version", formatPortfolioVersion(footerMetadata.portfolioVersion)],
    ["Environment", footerMetadata.buildEnvironment],
    ["Current Focus", footerMetadata.currentFocus],
    ["Location", footerMetadata.location],
  ] as const;

  return (
    <div
      className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
      data-testid="build-information"
    >
      <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
        Build Information
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {metadata.map(([label, value]) => (
          <div key={label}>
            <dt className="text-text-muted font-mono text-[10px] tracking-[0.18em] uppercase">
              {label}
            </dt>
            <dd className="text-text-primary mt-1 text-sm font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
