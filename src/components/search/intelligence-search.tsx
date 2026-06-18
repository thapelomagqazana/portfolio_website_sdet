"use client";

import Link from "next/link";
import { useId } from "react";
import { searchCategoryLabels } from "@/data/intelligence-search";
import { useIntelligenceSearch } from "@/hooks/use-intelligence-search";
import { getHighlightedSegments } from "@/lib/intelligence-search";
import type { SearchResult } from "@/data/intelligence-search";

/**
 * Accessible Engineering Intelligence search UI.
 *
 * Supports:
 * - instant client-side search
 * - debounced ranking
 * - arrow-key navigation
 * - Enter to open selected result
 * - Escape to clear
 * - listbox/option semantics
 */
export function IntelligenceSearch() {
  const listboxId = useId();

  const {
    query,
    results,
    loading,
    selectedIndex,
    selectedResult,
    setQuery,
    clearSearch,
    moveSelection,
    selectFirst,
    selectLast,
    setSelectedIndex,
  } = useIntelligenceSearch();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSelection("down");
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection("up");
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectFirst();
    }

    if (event.key === "End") {
      event.preventDefault();
      selectLast();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      clearSearch();
    }

    if (event.key === "Enter" && selectedResult) {
      window.location.href = selectedResult.entity.href;
    }
  }

  const hasQuery = query.trim().length > 0;
  const activeOptionId = selectedResult ? `${listboxId}-${selectedResult.entity.id}` : undefined;

  return (
    <section
      role="search"
      aria-labelledby="intelligence-search-heading"
      className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
      data-testid="intelligence-search"
    >
      <div>
        <p className="text-accent-blue font-mono text-xs tracking-[0.24em] uppercase">
          Intelligence Search
        </p>

        <h3
          id="intelligence-search-heading"
          className="font-display text-text-primary mt-3 text-2xl font-black"
        >
          Search engineering knowledge.
        </h3>

        <p className="text-text-secondary mt-2 text-sm leading-6">
          Query articles, research reports, projects, skills, experience, and BrikByteOS notes.
        </p>
      </div>

      <label className="mt-5 block">
        <span className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
          Search engineering intelligence
        </span>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={hasQuery}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          aria-autocomplete="list"
          placeholder="Try release, quality, automation, BrikByteOS..."
          className="bg-background-deep/60 text-text-primary placeholder:text-text-muted focus:border-accent-blue/50 focus:ring-accent-blue/20 mt-2 w-full rounded-2xl border border-white/10 px-4 py-3 outline-none focus:ring-2"
          data-testid="intelligence-search-input"
        />
      </label>

      <SearchStats query={query} loading={loading} results={results} />

      {hasQuery ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Engineering intelligence search results"
          className="mt-5 grid gap-3"
          data-testid="intelligence-search-results"
        >
          {loading ? (
            <div className="bg-background-deep/50 text-text-secondary rounded-2xl border border-white/10 p-4 text-sm">
              Searching engineering intelligence...
            </div>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <SearchResultItem
                key={result.entity.id}
                result={result}
                query={query}
                optionId={`${listboxId}-${result.entity.id}`}
                selected={index === selectedIndex}
                onMouseEnter={() => setSelectedIndex(index)}
              />
            ))
          ) : (
            <SearchEmptyState />
          )}
        </div>
      ) : null}
    </section>
  );
}

function SearchStats({
  query,
  loading,
  results,
}: {
  readonly query: string;
  readonly loading: boolean;
  readonly results: readonly SearchResult[];
}) {
  if (!query.trim()) return null;

  return (
    <p className="text-text-muted mt-3 font-mono text-xs" data-testid="intelligence-search-stats">
      {loading
        ? "Searching..."
        : `${results.length} result${results.length === 1 ? "" : "s"} found`}
    </p>
  );
}

function SearchResultItem({
  result,
  query,
  optionId,
  selected,
  onMouseEnter,
}: {
  readonly result: SearchResult;
  readonly query: string;
  readonly optionId: string;
  readonly selected: boolean;
  readonly onMouseEnter: () => void;
}) {
  return (
    <Link
      id={optionId}
      href={result.entity.href}
      role="option"
      aria-selected={selected}
      onMouseEnter={onMouseEnter}
      className={[
        "focus-visible:ring-accent-blue/70 rounded-2xl border p-4 transition focus:outline-none focus-visible:ring-2",
        selected
          ? "border-accent-green/50 bg-accent-green/10"
          : "bg-background-deep/50 hover:border-accent-blue/30 border-white/10",
      ].join(" ")}
      data-testid="intelligence-search-result"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-accent-blue font-mono text-[10px] tracking-[0.2em] uppercase">
            {searchCategoryLabels[result.entity.category]}
          </p>

          <h4 className="font-display text-text-primary mt-2 text-lg font-black">
            <HighlightedText text={result.entity.title} query={query} />
          </h4>
        </div>

        <span aria-hidden="true" className="text-text-muted font-mono">
          →
        </span>
      </div>

      <p className="text-text-secondary mt-2 text-sm leading-6">
        <HighlightedText text={result.entity.description} query={query} />
      </p>

      {result.highlights.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {result.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="text-text-muted rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px]"
            >
              <HighlightedText text={highlight} query={query} />
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}

function HighlightedText({ text, query }: { readonly text: string; readonly query: string }) {
  return (
    <>
      {getHighlightedSegments(text, query).map((segment, index) =>
        segment.match ? (
          <mark
            key={`${segment.text}-${index}`}
            className="bg-accent-green/20 text-accent-green rounded px-1"
          >
            {segment.text}
          </mark>
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        )
      )}
    </>
  );
}

function SearchEmptyState() {
  return (
    <div
      className="bg-background-deep/50 text-text-secondary rounded-2xl border border-white/10 p-5"
      data-testid="intelligence-search-empty"
    >
      <p className="font-display text-text-primary text-lg font-black">
        No engineering intelligence found.
      </p>
      <p className="mt-2 text-sm">Try searching: release, quality, automation, or BrikByteOS.</p>
    </div>
  );
}
