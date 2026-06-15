import { MissionStatement } from "@/components/hero/mission-statement";

/**
 * MissionSection renders the mission statement below the Hero fold.
 *
 * The Hero should answer quickly:
 * - Who are you?
 * - What do you do?
 * - Why should I care?
 *
 * The Mission section then gives visitors a deeper explanation of the
 * engineering philosophy behind the portfolio.
 */
export function MissionSection() {
  return (
    <section id="about" aria-label="Mission profile" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <MissionStatement />
      </div>
    </section>
  );
}
