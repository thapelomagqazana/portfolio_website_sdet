"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  filterResearchReports,
  getResearchReportCategoryLabel,
  getResearchReportDifficultyLabel,
  getResearchReportStatusLabel,
  researchArchiveCopy,
  researchReportCategories,
  researchReports,
} from "@/data/research-archive";
import type { ResearchReport, ResearchReportCategoryFilter } from "@/data/research-archive";

export type ResearchArchiveProps = {
  readonly reports?: readonly ResearchReport[];
};

/**
 * Research Archive UI.
 *
 * Presents Engineering Intelligence articles as structured research reports
 * with category, status, difficulty, focus, tags, and reading context.
 */
export function ResearchArchive({ reports = researchReports }: ResearchArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<ResearchReportCategoryFilter>("all");
  const [query, setQuery] = useState("");

  const visibleReports = useMemo(
    () => filterResearchReports(reports, selectedCategory, query),
    [reports, selectedCategory, query]
  );

  return (
    <section
      className="mt-16"
      aria-labelledby="research-archive-heading"
      data-testid="research-archive"
    >
      <div className="max-w-3xl">
        <p className="text-accent-blue font-mono text-xs tracking-[0.3em] uppercase">
          {researchArchiveCopy.eyebrow}
        </p>

        <h3
          id="research-archive-heading"
          className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl"
        >
          {researchArchiveCopy.heading}
        </h3>

        <p className="text-text-secondary mt-5 text-base leading-8">
          {researchArchiveCopy.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
        <label className="block">
          <span className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
            {researchArchiveCopy.searchLabel}
          </span>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={researchArchiveCopy.searchPlaceholder}
            className="text-text-primary placeholder:text-text-muted focus:border-accent-blue/50 focus:ring-accent-blue/20 mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition outline-none focus:ring-2"
            data-testid="research-search-input"
          />
        </label>

        <div
          className="flex flex-wrap gap-2"
          aria-label="Research report categories"
          data-testid="research-category-filters"
        >
          {researchReportCategories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category.id)}
                className={[
                  "rounded-full border px-4 py-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition",
                  "focus-visible:ring-accent-blue/70 focus:outline-none focus-visible:ring-2",
                  isSelected
                    ? "border-accent-green/50 bg-accent-green/10 text-accent-green"
                    : "text-text-secondary hover:border-accent-blue/30 hover:text-text-primary border-white/10 bg-white/[0.03]",
                ].join(" ")}
                data-testid={`research-filter-${category.id}`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleReports.length === 0 ? (
        <div
          className="text-text-secondary mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          data-testid="research-empty-state"
        >
          {researchArchiveCopy.emptyState}
        </div>
      ) : (
        <div
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          data-testid="research-report-grid"
        >
          {visibleReports.map((report, index) => (
            <ResearchReportCard key={report.id} report={report} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

type ResearchReportCardProps = {
  readonly report: ResearchReport;
  readonly index: number;
};

/**
 * Report-style research card.
 */
function ResearchReportCard({ report, index }: ResearchReportCardProps) {
  return (
    <article
      className="hover:border-accent-blue/30 flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]"
      aria-labelledby={`${report.id}-title`}
      data-testid="research-report-card"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-text-muted font-mono text-[10px] tracking-[0.24em] uppercase">
          Report {String(index + 1).padStart(2, "0")}
        </p>

        <span className="border-accent-green/30 bg-accent-green/10 text-accent-green rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
          {getResearchReportStatusLabel(report.status)}
        </span>
      </div>

      <p className="text-accent-blue mt-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        {getResearchReportCategoryLabel(report.category)}
      </p>

      <h4
        id={`${report.id}-title`}
        className="font-display text-text-primary mt-3 text-2xl font-black"
      >
        {report.title}
      </h4>

      <p className="text-text-secondary mt-3 text-sm leading-7">{report.summary}</p>

      <section className="mt-5">
        <p className="text-text-muted font-mono text-[10px] tracking-[0.22em] uppercase">Focus</p>
        <p className="bg-background-deep/50 text-text-secondary mt-2 rounded-2xl border border-white/10 p-3 text-xs leading-6">
          {report.focus}
        </p>
      </section>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="bg-background-deep/50 text-text-secondary rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px]">
          {report.readingMinutes} min read
        </span>
        <span className="bg-background-deep/50 text-text-secondary rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px]">
          {getResearchReportDifficultyLabel(report.difficulty)}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {report.tags.map((tag) => (
          <span
            key={tag}
            className="border-accent-blue/20 bg-accent-blue/10 text-accent-blue rounded-full border px-3 py-1.5 font-mono text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Link
          href={report.href}
          className="border-accent-green/30 bg-accent-green/10 text-accent-green hover:border-accent-blue/40 hover:text-accent-blue focus-visible:ring-accent-blue/70 inline-flex rounded-full border px-4 py-2 font-mono text-xs font-semibold transition focus:outline-none focus-visible:ring-2"
        >
          Read report: {report.title} →
        </Link>
      </div>
    </article>
  );
}
