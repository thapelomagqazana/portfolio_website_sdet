import { CommandDeckNavbar } from "@/components/layout/command-deck-navbar";
import { SiteBackground } from "@/components/layout/site-background";
import { OpeningSequence } from "@/sections/opening-sequence";
import { HeroSection } from "@/sections/hero-section";

/**
 * Home page.
 *
 * The opening sequence runs first, then reveals the main portfolio experience.
 */
export default function Home() {
  return (
    <OpeningSequence>
      <SiteBackground />
      <CommandDeckNavbar />

      <main>
        <HeroSection />
      </main>
    </OpeningSequence>
  );
}
