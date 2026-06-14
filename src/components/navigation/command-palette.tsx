"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  commandPaletteItems,
  filterCommandPaletteItems,
  isEditableEventTarget,
} from "@/data/command-palette";
import type { CommandPaletteItem } from "@/data/command-palette";

/**
 * Executes one command palette action.
 *
 * Security note:
 * This function only supports known action types and known href behaviors.
 * It does not evaluate code or run arbitrary commands.
 */
export function runCommandPaletteItem(item: CommandPaletteItem): void {
  if (item.type === "navigate") {
    window.location.hash = item.href;
    return;
  }

  if (item.type === "external") {
    window.open(item.href, "_blank", "noopener,noreferrer");
    return;
  }

  if (item.type === "download" || item.type === "email") {
    window.location.href = item.href;
  }
}

/**
 * CommandPalette provides keyboard-first navigation and quick actions.
 */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems = useMemo(
    () => filterCommandPaletteItems(commandPaletteItems, query),
    [query]
  );

  const openPalette = () => {
    setIsOpen(true);
  };

  const closePalette = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const runActiveCommand = () => {
    const selectedItem = filteredItems[activeIndex];

    if (!selectedItem) return;

    runCommandPaletteItem(selectedItem);
    closePalette();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isEditableEventTarget(event.target)) {
        event.preventDefault();
        openPalette();
        return;
      }

      if (!isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((currentIndex) =>
          filteredItems.length === 0 ? 0 : (currentIndex + 1) % filteredItems.length
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((currentIndex) =>
          filteredItems.length === 0
            ? 0
            : (currentIndex - 1 + filteredItems.length) % filteredItems.length
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        runActiveCommand();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, filteredItems, activeIndex]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const trigger = (
    <button
      type="button"
      onClick={openPalette}
      className="text-text-secondary hover:text-text-primary hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs transition md:inline-flex"
    >
      Search command deck <kbd className="text-accent-blue ml-2">/</kbd>
    </button>
  );

  if (!isOpen) return trigger;

  return (
    <>
      {trigger}

      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={closePalette}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="bg-background-deep/95 fixed top-24 left-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 p-4 shadow-[0_0_60px_rgba(0,212,255,0.16)] backdrop-blur-xl"
      >
        <label htmlFor="command-palette-search" className="sr-only">
          Search commands
        </label>

        <input
          ref={inputRef}
          id="command-palette-search"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-palette-results"
          aria-activedescendant={filteredItems[activeIndex]?.id}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          placeholder="Search sections, actions, links..."
          className="text-text-primary placeholder:text-text-muted focus:border-accent-blue/60 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm ring-0 outline-none"
        />

        <div
          id="command-palette-results"
          role="listbox"
          className="mt-4 max-h-[420px] overflow-y-auto"
        >
          {filteredItems.length === 0 ? (
            <p className="text-text-muted rounded-xl border border-white/10 px-4 py-6 text-center font-mono text-sm">
              No command found.
            </p>
          ) : (
            <div className="grid gap-2">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  id={item.id}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    runCommandPaletteItem(item);
                    closePalette();
                  }}
                  className={[
                    "rounded-xl border px-4 py-3 text-left transition",
                    index === activeIndex
                      ? "border-accent-blue/60 bg-accent-blue/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  <span className="text-text-primary block font-mono text-sm">{item.label}</span>
                  <span className="text-text-secondary mt-1 block text-xs">{item.description}</span>
                  <span className="text-accent-green mt-2 block font-mono text-[10px] uppercase">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-text-muted mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px]">
          <span>↑ ↓ Navigate</span>
          <span>Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </>
  );
}
