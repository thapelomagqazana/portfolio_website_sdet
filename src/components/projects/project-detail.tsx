import { getProjectCategoryLabel, getSafeProjectHref } from "@/data/projects";
import type { ProjectCaseFile, ProjectLinkKey } from "@/data/projects";

export type ProjectDetailProps = {
  readonly project: ProjectCaseFile;
  readonly onClose?: () => void;
};

/**
 * Structured project detail component.
 *
 * Every project detail follows the same engineering case-file layout:
 * - header
 * - problem
 * - solution
 * - architecture
 * - lessons learned
 * - evidence summary
 *
 * This prevents the portfolio from becoming a random gallery of cards.
 */
export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <article
      className="border-accent-blue/20 bg-accent-blue/10 rounded-3xl border p-6 backdrop-blur-xl"
      aria-labelledby={`${project.id}-detail-heading`}
      data-testid="project-detail"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-accent-blue font-mono text-xs tracking-[0.24em] uppercase">
            Case File Details
          </p>

          <h3
            id={`${project.id}-detail-heading`}
            className="font-display text-text-primary mt-3 text-3xl font-black"
          >
            {project.title}
          </h3>

          <p className="text-text-muted mt-2 font-mono text-xs tracking-[0.18em] uppercase">
            {getProjectCategoryLabel(project.category)}
          </p>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${project.title} case file details`}
            className="text-text-secondary hover:border-accent-blue/30 hover:text-text-primary focus-visible:ring-accent-blue/70 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs transition focus:outline-none focus-visible:ring-2"
            data-testid="project-detail-close"
          >
            Close
          </button>
        ) : null}
      </div>

      <p className="text-text-secondary mt-5 text-sm leading-7">{project.summary}</p>

      <DetailTextSection title="Problem" body={project.detail.problem} />
      <DetailTextSection title="Solution" body={project.detail.solution} />
      <DetailTextSection title="Architecture" body={project.detail.architecture} />

      <section className="mt-6">
        <h4 className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
          Lessons Learned
        </h4>

        <ul className="mt-3 grid gap-3">
          {project.detail.lessons.map((lesson) => (
            <li
              key={lesson}
              className="bg-background-deep/50 text-text-secondary rounded-2xl border border-white/10 p-4 text-sm leading-6"
            >
              {lesson}
            </li>
          ))}
        </ul>
      </section>

      <EvidenceSummary project={project} />

      <ProjectDetailLinks project={project} />
    </article>
  );
}

type DetailTextSectionProps = {
  readonly title: string;
  readonly body: string;
};

/**
 * Shared text section for detail fields.
 */
function DetailTextSection({ title, body }: DetailTextSectionProps) {
  return (
    <section className="mt-6">
      <h4 className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">{title}</h4>

      <p className="bg-background-deep/50 text-text-secondary mt-3 rounded-2xl border border-white/10 p-4 text-sm leading-7">
        {body}
      </p>
    </section>
  );
}

type EvidenceSummaryProps = {
  readonly project: ProjectCaseFile;
};

/**
 * Connects the project story to proof metadata.
 */
function EvidenceSummary({ project }: EvidenceSummaryProps) {
  return (
    <section className="mt-6" data-testid="project-detail-evidence-summary">
      <h4 className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
        Evidence Summary
      </h4>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <TagGroup title="Evidence" items={project.evidence} />
        <TagGroup title="Quality Signals" items={project.qualitySignals} />
        <TagGroup title="Tech Stack" items={project.stack} />
      </div>
    </section>
  );
}

type TagGroupProps = {
  readonly title: string;
  readonly items: readonly string[];
};

/**
 * Reusable tag group for detail metadata.
 */
function TagGroup({ title, items }: TagGroupProps) {
  return (
    <div className="bg-background-deep/50 rounded-2xl border border-white/10 p-4">
      <p className="text-accent-green font-mono text-[10px] tracking-[0.22em] uppercase">{title}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-text-secondary rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const projectLinkLabels: Record<ProjectLinkKey, string> = {
  github: "GitHub",
  demo: "Demo",
  docs: "Docs",
} as const;

/**
 * Renders safe links for the selected project.
 */
function ProjectDetailLinks({ project }: { readonly project: ProjectCaseFile }) {
  const entries = Object.entries(project.links ?? {}) as [ProjectLinkKey, string][];

  const safeLinks = entries
    .map(([key, href]) => [key, getSafeProjectHref(href)] as const)
    .filter(([, href]) => Boolean(href));

  if (safeLinks.length === 0) return null;

  return (
    <nav className="mt-6" aria-label={`${project.title} detail links`}>
      <div className="flex flex-wrap gap-3">
        {safeLinks.map(([key, href]) => {
          const isExternal = href?.startsWith("http");

          return (
            <a
              key={key}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer noopener" : undefined}
              className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue hover:border-accent-green/40 hover:text-accent-green focus-visible:ring-accent-blue/70 rounded-full border px-4 py-2 font-mono text-xs font-semibold transition focus:outline-none focus-visible:ring-2"
            >
              {projectLinkLabels[key]}: {project.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
