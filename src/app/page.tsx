import { OpeningSequence } from "@/sections/opening-sequence";
import { CommandDeckNavbar } from "@/components/layout/command-deck-navbar";
// import { MotionTestSection } from "@/sections/motion-test-section";

/**
 * Home page wired to PHASE 3 Opening Animation.
 */
export default function Home() {
  return (
    <OpeningSequence>
      <CommandDeckNavbar />
      {/* <MotionTestSection /> */}
    </OpeningSequence>
  );
}
