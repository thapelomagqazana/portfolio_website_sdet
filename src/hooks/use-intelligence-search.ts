"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { intelligenceSearchConfig, intelligenceSearchIndex } from "@/data/intelligence-search";
import type { SearchEntity, SearchResult } from "@/data/intelligence-search";
import { searchEngineeringIntelligence } from "@/lib/intelligence-search";

export type UseIntelligenceSearchOptions = {
  readonly index?: readonly SearchEntity[];
  readonly debounceMs?: number;
  readonly maxResults?: number;
};

export type UseIntelligenceSearchResult = {
  readonly query: string;
  readonly debouncedQuery: string;
  readonly results: readonly SearchResult[];
  readonly loading: boolean;
  readonly selectedIndex: number;
  readonly selectedResult: SearchResult | undefined;
  readonly setQuery: (query: string) => void;
  readonly clearSearch: () => void;
  readonly moveSelection: (direction: "up" | "down") => void;
  readonly selectFirst: () => void;
  readonly selectLast: () => void;
  readonly setSelectedIndex: (index: number) => void;
};

/**
 * Reusable debounced Engineering Intelligence search hook.
 *
 * Loading is derived from query/debouncedQuery instead of stored separately.
 * Selection is reset at input-change time instead of synchronously inside an effect.
 */
export function useIntelligenceSearch({
  index = intelligenceSearchIndex,
  debounceMs = intelligenceSearchConfig.debounceMs,
  maxResults = Number(intelligenceSearchConfig.maxResults),
}: UseIntelligenceSearchOptions = {}): UseIntelligenceSearchResult {
  const [query, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndexState] = useState(0);

  const setQuery = useCallback((nextQuery: string) => {
    setRawQuery(nextQuery);
    setSelectedIndexState(0);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [debounceMs, query]);

  const results = useMemo(
    () => searchEngineeringIntelligence(debouncedQuery, index, maxResults),
    [debouncedQuery, index, maxResults]
  );

  const safeSelectedIndex = results.length === 0 ? 0 : Math.min(selectedIndex, results.length - 1);

  const selectedResult = results[safeSelectedIndex];

  const loading = query.trim().length > 0 && query !== debouncedQuery;

  const clearSearch = useCallback(() => {
    setRawQuery("");
    setDebouncedQuery("");
    setSelectedIndexState(0);
  }, []);

  const moveSelection = useCallback(
    (direction: "up" | "down") => {
      if (results.length === 0) return;

      setSelectedIndexState((current) => {
        const boundedCurrent = Math.min(current, results.length - 1);

        if (direction === "down") {
          return Math.min(boundedCurrent + 1, results.length - 1);
        }

        return Math.max(boundedCurrent - 1, 0);
      });
    },
    [results.length]
  );

  const selectFirst = useCallback(() => {
    setSelectedIndexState(0);
  }, []);

  const selectLast = useCallback(() => {
    setSelectedIndexState(Math.max(results.length - 1, 0));
  }, [results.length]);

  const setSelectedIndex = useCallback(
    (indexValue: number) => {
      setSelectedIndexState(Math.min(Math.max(indexValue, 0), Math.max(results.length - 1, 0)));
    },
    [results.length]
  );

  return {
    query,
    debouncedQuery,
    results,
    loading,
    selectedIndex: safeSelectedIndex,
    selectedResult,
    setQuery,
    clearSearch,
    moveSelection,
    selectFirst,
    selectLast,
    setSelectedIndex,
  };
}
