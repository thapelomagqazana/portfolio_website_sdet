import {
  brikByteOsStory,
  problemSignals,
  problemSolutionComparisons,
  solutionSignals,
} from "@/data/brikbyteos-story";

/**
 * Renders the BrikByteOS Problem vs Solution story.
 *
 * Purpose:
 * - explain the pain before BrikByteOS
 * - explain the concrete product value after BrikByteOS
 * - make the value proposition clear within seconds
 *
 * Accessibility:
 * - uses semantic section/article structure
 * - uses h2/h3 hierarchy
 * - uses aria-labelledby for the section
 * - does not rely on color alone
 * - uses real text for every comparison row
 */
export function ProblemSolutionStory() {
  return (
    <section
      className="mt-16"
      aria-labelledby="brikbyteos-problem-solution-heading"
      data-testid="problem-solution-story"
      id="brikbyteos-problem-solution"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
            {brikByteOsStory.eyebrow}
          </p>

          <h2
            id="brikbyteos-problem-solution-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {brikByteOsStory.heading}
          </h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <StoryPanel
            title={brikByteOsStory.problemTitle}
            subtitle={brikByteOsStory.problemSubtitle}
            summary={brikByteOsStory.problemSummary}
            signals={problemSignals}
            tone="problem"
          />

          <StoryPanel
            title={brikByteOsStory.solutionTitle}
            subtitle={brikByteOsStory.solutionSubtitle}
            summary={brikByteOsStory.solutionSummary}
            signals={solutionSignals}
            tone="solution"
          />
        </div>

        <ComparisonTable />

        <ValuePropositionCallout />
      </div>
    </section>
  );
}

type StoryPanelProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly signals: readonly {
    readonly label: string;
    readonly description: string;
  }[];
  readonly tone: "problem" | "solution";
};

/**
 * Reusable story panel used for both the problem and solution side.
 *
 * The tone controls visual treatment only.
 * All visible copy is injected through props from centralized data.
 */
function StoryPanel({ title, subtitle, summary, signals, tone }: StoryPanelProps) {
  const isSolution = tone === "solution";

  return (
    <article
      className={[
        "rounded-3xl border p-6 backdrop-blur-xl",
        isSolution
          ? "border-accent-green/25 bg-accent-green/10 shadow-[0_0_44px_rgba(52,211,153,0.12)]"
          : "border-white/10 bg-white/[0.04]",
      ].join(" ")}
      data-testid={`${tone}-panel`}
    >
      <p
        className={[
          "font-mono text-xs tracking-[0.24em] uppercase",
          isSolution ? "text-accent-green" : "text-text-muted",
        ].join(" ")}
      >
        {subtitle}
      </p>

      <h3 className="font-display text-text-primary mt-3 text-2xl font-black">{title}</h3>

      <p className="text-text-secondary mt-4 text-sm leading-7">{summary}</p>

      <ul className="mt-6 grid gap-3">
        {signals.map((signal) => (
          <li
            key={signal.label}
            className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={[
                  "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                  isSolution ? "bg-accent-green" : "bg-text-muted",
                ].join(" ")}
              />

              <div>
                <p className="font-display text-text-primary text-sm font-bold">{signal.label}</p>
                <p className="text-text-secondary mt-1 text-xs leading-5">{signal.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Responsive comparison layout.
 *
 * Desktop:
 * - two-column comparison table
 *
 * Mobile:
 * - stacked problem/solution rows
 */
function ComparisonTable() {
  return (
    <div
      className="bg-background-deep/60 mt-6 overflow-hidden rounded-3xl border border-white/10"
      data-testid="comparison-table"
    >
      <div className="hidden grid-cols-2 border-b border-white/10 bg-white/[0.03] md:grid">
        <div className="border-r border-white/10 p-4">
          <p className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
            Without BrikByteOS
          </p>
        </div>

        <div className="p-4">
          <p className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase">
            With BrikByteOS
          </p>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {problemSolutionComparisons.map((item) => (
          <div
            key={`${item.problem}-${item.solution}`}
            className="grid gap-0 md:grid-cols-2"
            data-testid="comparison-row"
          >
            <div className="border-white/10 p-4 md:border-r">
              <p className="text-text-muted font-mono text-[10px] tracking-[0.2em] uppercase md:hidden">
                Problem
              </p>
              <p className="text-text-secondary mt-1 text-sm leading-6 md:mt-0">{item.problem}</p>
            </div>

            <div className="bg-accent-green/[0.04] p-4">
              <p className="text-accent-green font-mono text-[10px] tracking-[0.2em] uppercase md:hidden">
                Solution
              </p>
              <p className="text-text-primary mt-1 text-sm leading-6 md:mt-0">{item.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Prominent product promise callout.
 *
 * This should be the sentence visitors remember after leaving the section.
 */
function ValuePropositionCallout() {
  return (
    <aside
      className="border-accent-blue/20 bg-accent-blue/10 mt-6 rounded-3xl border p-6 text-center shadow-[0_0_44px_rgba(56,189,248,0.1)]"
      data-testid="value-proposition-callout"
    >
      <p className="font-display text-text-primary mx-auto max-w-3xl text-xl leading-8 font-black sm:text-2xl">
        {brikByteOsStory.valueProposition}
      </p>
    </aside>
  );
}
