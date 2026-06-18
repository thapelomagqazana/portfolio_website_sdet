"use client";

import { useContext } from "react";
import { ScrollNarrativeContext } from "@/components/motion/scroll-narrative-provider";

/**
 * Accesses the global Scroll Narrative Engine.
 */
export function useScrollNarrative() {
  const context = useContext(ScrollNarrativeContext);

  if (!context) {
    throw new Error("useScrollNarrative must be used inside ScrollNarrativeProvider.");
  }

  return context;
}
