"use client";

import { useMemo, useState } from "react";
import { ProjectDetail } from "@/components/projects/project-detail";
import {
  filterProjectCaseFiles,
  getProjectCategoryLabel,
  getSafeProjectHref,
  projectCaseFiles,
  projectCategories,
} from "@/data/projects";
import type { ProjectCaseFile, ProjectCategoryFilter, ProjectLinkKey } from "@/data/projects";

export type EvidenceVaultProps = {
  readonly projects?: readonly ProjectCaseFile[];
};

/**
 * Interactive Project Evidence Vault.
 *
 * Supports:
 * - category filtering
 * - case-file cards
 * - selected project detail panel
 * - accessible open/close interactions
 */
export function EvidenceVault({ projects = projectCaseFiles }: EvidenceVaultProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectCaseFile | undefined>();

  const visibleProjects = useMemo(
    () => filterProjectCaseFiles(projects, selectedCategory),
    [projects, selectedCategory]
  );

  function openProject(project: ProjectCaseFile) {
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(undefined);
  }

  return (
    <div data-testid="evidence-vault">
      <FilterBar
        selectedCategory={selectedCategory}
        onSelect={(category) => {
          setSelectedCategory(category);
          setSelectedProject(undefined);
        }}
      />

      {visibleProjects.length === 0 ? (
        <div
          className="text-text-secondary mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          data-testid="projects-empty-state"
        >
          No project case files found for this category.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.78fr]">
          <div className="grid gap-5 md:grid-cols-2" data-testid="project-case-file-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCaseFileCard
                key={project.id}
                project={project}
                index={index}
                isSelected={selectedProject?.id === project.id}
                onOpen={() => openProject(project)}
              />
            ))}
          </div>

          <div className="xl:sticky xl:top-24 xl:self-start" data-testid="project-detail-region">
            {selectedProject ? (
              <ProjectDetail project={selectedProject} onClose={closeProject} />
            ) : (
              <div className="text-text-secondary rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-text-muted font-mono text-xs tracking-[0.24em] uppercase">
                  Select Case File
                </p>
                <p className="mt-3 text-sm leading-7">
                  Open a project case file to inspect its problem, solution, architecture, lessons,
                  evidence, stack, and quality signals.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type FilterBarProps = {
  readonly selectedCategory: ProjectCategoryFilter;
  readonly onSelect: (category: ProjectCategoryFilter) => void;
};

function FilterBar({ selectedCategory, onSelect }: FilterBarProps) {
  return (
    <div
      className="mt-8 flex flex-wrap gap-3"
      aria-label="Filter project evidence by category"
      data-testid="project-category-filters"
    >
      {projectCategories.map((category) => {
        const isSelected = selectedCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(category.id)}
            className={[
              "rounded-full border px-4 py-2 font-mono text-xs font-semibold tracking-[0.16em] uppercase transition",
              "focus-visible:ring-accent-blue/70 focus:outline-none focus-visible:ring-2",
              isSelected
                ? "border-accent-green/50 bg-accent-green/10 text-accent-green shadow-[0_0_28px_rgba(52,211,153,0.14)]"
                : "text-text-secondary hover:border-accent-blue/30 hover:text-text-primary border-white/10 bg-white/[0.03]",
            ].join(" ")}
            data-testid={`project-filter-${category.id}`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

type ProjectCaseFileCardProps = {
  readonly project: ProjectCaseFile;
  readonly index: number;
  readonly isSelected: boolean;
  readonly onOpen: () => void;
};

function ProjectCaseFileCard({ project, index, isSelected, onOpen }: ProjectCaseFileCardProps) {
  return (
    <article
      className={[
        "group hover:border-accent-blue/30 flex h-full flex-col rounded-3xl border p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]",
        isSelected
          ? "border-accent-green/50 bg-accent-green/10 shadow-[0_0_36px_rgba(52,211,153,0.14)]"
          : "border-white/10 bg-white/[0.04]",
      ].join(" ")}
      aria-labelledby={`${project.id}-title`}
      data-testid="project-case-file-card"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-text-muted font-mono text-[10px] tracking-[0.24em] uppercase">
            Case File {String(index + 1).padStart(2, "0")}
          </p>

          <h3
            id={`${project.id}-title`}
            className="font-display text-text-primary mt-3 text-2xl font-black"
          >
            {project.title}
          </h3>
        </div>

        <span className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
          {getProjectCategoryLabel(project.category)}
        </span>
      </div>

      <p className="text-text-secondary mt-4 text-sm leading-7">{project.summary}</p>

      <TagBlock title="Evidence" items={project.evidence} />
      <TagBlock title="Tech Stack" items={project.stack} />
      <TagBlock title="Quality Signals" items={project.qualitySignals} />

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.title} case file details`}
          className="border-accent-green/30 bg-accent-green/10 text-accent-green hover:border-accent-blue/40 hover:text-accent-blue focus-visible:ring-accent-blue/70 w-full rounded-full border px-4 py-3 text-center font-mono text-xs font-semibold tracking-[0.16em] uppercase transition focus:outline-none focus-visible:ring-2"
          data-testid={`open-project-detail-${project.id}`}
        >
          Open Case File
        </button>

        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

type TagBlockProps = {
  readonly title: string;
  readonly items: readonly string[];
};

function TagBlock({ title, items }: TagBlockProps) {
  return (
    <section className="mt-5">
      <h4 className="text-text-muted font-mono text-[10px] tracking-[0.22em] uppercase">{title}</h4>

      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="bg-background-deep/50 text-text-secondary rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px]"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

type ProjectLinksProps = {
  readonly project: ProjectCaseFile;
};

const projectLinkLabels: Record<ProjectLinkKey, string> = {
  github: "GitHub",
  demo: "Demo",
  docs: "Docs",
} as const;

function ProjectLinks({ project }: ProjectLinksProps) {
  const entries = Object.entries(project.links ?? {}) as [ProjectLinkKey, string][];

  const safeLinks = entries
    .map(([key, href]) => [key, getSafeProjectHref(href)] as const)
    .filter(([, href]) => Boolean(href));

  if (safeLinks.length === 0) return null;

  return (
    <nav className="mt-3" aria-label={`${project.title} project links`}>
      <div className="flex flex-wrap gap-2">
        {safeLinks.map(([key, href]) => {
          const isExternal = href?.startsWith("http");

          return (
            <a
              key={key}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer noopener" : undefined}
              className="border-accent-blue/30 bg-accent-blue/10 text-accent-blue hover:border-accent-green/40 hover:text-accent-green focus-visible:ring-accent-blue/70 rounded-full border px-3 py-2 font-mono text-[10px] font-semibold transition focus:outline-none focus-visible:ring-2"
            >
              {projectLinkLabels[key]}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
