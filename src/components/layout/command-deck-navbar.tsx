"use client";

import { useState } from "react";
import { CommandPalette } from "@/components/navigation/command-palette";
import { navigationCta, navigationItems } from "@/data/navigation";
import { useScrollNarrative } from "@/hooks/use-scroll-narrative";

/**
 * CommandDeckNavbar renders the sticky portfolio navigation shell.
 *
 * Uses the global Scroll Narrative Engine so navigation status reflects the
 * current engineering story stage instead of using a separate scroll tracker.
 */
export function CommandDeckNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, progress, direction } = useScrollNarrative();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="bg-background-deep/70 sticky top-0 z-50 border-b border-white/10 shadow-[0_0_40px_rgba(0,212,255,0.08)] backdrop-blur-xl"
      data-testid="command-deck-navbar"
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <a href="#hero" className="group flex flex-col">
          <span className="font-display text-text-primary text-sm font-bold tracking-wide">
            Thapelo Magqazana
          </span>
          <span className="text-accent-blue font-mono text-xs">SDET • Quality Engineering</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-secondary hover:text-text-primary rounded-full px-3 py-2 font-mono text-xs transition hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <CommandPalette />

          <NarrativeStatus
            activeSection={activeSection}
            progress={progress}
            direction={direction}
          />

          <a
            href={navigationCta.href}
            className="border-accent-blue/40 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 rounded-full border px-4 py-2 font-mono text-xs font-semibold transition"
          >
            {navigationCta.label}
          </a>
        </div>

        <button
          type="button"
          className="text-text-primary rounded-md border border-white/10 px-3 py-2 font-mono text-xs md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          MENU
        </button>
      </nav>

      {isMobileMenuOpen ? (
        <div className="bg-background-deep/95 border-t border-white/10 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="mb-3">
            <CommandPalette />
          </div>

          <div className="mb-3">
            <NarrativeStatus
              activeSection={activeSection}
              progress={progress}
              direction={direction}
            />
          </div>

          <div className="grid gap-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-text-secondary hover:text-text-primary rounded-lg border border-white/10 px-3 py-3 font-mono text-sm transition hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={navigationCta.href}
            onClick={closeMobileMenu}
            className="border-accent-blue/40 bg-accent-blue/10 text-accent-blue mt-4 block rounded-lg border px-4 py-3 text-center font-mono text-sm font-semibold"
          >
            {navigationCta.label}
          </a>
        </div>
      ) : null}
    </header>
  );
}

type NarrativeStatusProps = {
  readonly activeSection: string | undefined;
  readonly progress: number;
  readonly direction: string;
};

function NarrativeStatus({ activeSection, progress, direction }: NarrativeStatusProps) {
  return (
    <div
      className="border-accent-green/30 bg-accent-green/10 text-accent-green rounded-full border px-3 py-2 font-mono text-[10px] tracking-[0.14em] uppercase"
      aria-label={`Narrative progress ${progress} percent. Active section ${activeSection ?? "unknown"}. Scroll direction ${direction}.`}
      data-testid="narrative-status"
    >
      {activeSection ?? "initializing"} · {progress}% · {direction}
    </div>
  );
}
