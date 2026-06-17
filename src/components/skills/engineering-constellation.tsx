"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  capabilityClusters,
  capabilityRings,
  constellationStars,
  getCapabilityClusterById,
  getCapabilityClusterNodes,
  getRelatedSkillNodes,
  getSkillCategoryStyle,
  getSkillNodeById,
  isCoreSkillNode,
  isNodeInCapabilityCluster,
  skillNodes,
  clampSkillLevel,
} from "@/data/skills-matrix";
import type { CapabilityCluster, SkillNode } from "@/data/skills-matrix";

/**
 * EngineeringConstellation renders an interactive node graph of engineering capabilities.
 */
export function EngineeringConstellation() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [selectedNodeId, setSelectedNodeId] = useState(skillNodes[0]?.id ?? "");
  const [activeClusterId, setActiveClusterId] = useState("");
  const [lockedClusterId, setLockedClusterId] = useState("");

  const selectedNode = getSkillNodeById(selectedNodeId) ?? skillNodes[0];
  const relatedNodes = useMemo(() => getRelatedSkillNodes(selectedNode.id), [selectedNode.id]);

  const visibleClusterId = lockedClusterId || activeClusterId;
  const visibleCluster = visibleClusterId ? getCapabilityClusterById(visibleClusterId) : undefined;
  const visibleClusterNodes = visibleClusterId ? getCapabilityClusterNodes(visibleClusterId) : [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLockedClusterId("");
        setActiveClusterId("");
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClusterHover = (clusterId: string) => {
    setActiveClusterId(clusterId);
  };

  const handleClusterLeave = () => {
    if (!lockedClusterId) {
      setActiveClusterId("");
    }
  };

  const handleClusterToggle = (clusterId: string) => {
    setLockedClusterId((current) => (current === clusterId ? "" : clusterId));
    setActiveClusterId(clusterId);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:block">
        <div
          className="bg-background-deep/60 relative h-[560px] overflow-hidden rounded-2xl border border-white/10"
          data-testid="engineering-constellation-graph"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            data-testid="constellation-stars"
          >
            {constellationStars.map((star) => (
              <span
                key={star.id}
                className="bg-accent-blue/50 absolute rounded-full shadow-[0_0_8px_rgba(0,212,255,0.35)]"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${Math.max(star.size, 1.6)}px`,
                  height: `${Math.max(star.size, 1.6)}px`,
                  opacity: 0.18,
                }}
                data-testid="constellation-star"
              />
            ))}
          </div>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <g aria-hidden="true" data-testid="capability-rings">
              {capabilityRings.map((ring) => (
                <circle
                  key={ring.id}
                  cx="50"
                  cy="50"
                  r={ring.radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.16"
                  className="text-accent-blue"
                  opacity="0.08"
                  data-testid="capability-ring"
                />
              ))}
            </g>
          </svg>

          {skillNodes.map((node, index) => {
            const isSelected = node.id === selectedNode.id;
            const isCoreNode = isCoreSkillNode(node.id);
            const isInVisibleCluster =
              visibleClusterId.length > 0 && isNodeInCapabilityCluster(node.id, visibleClusterId);
            const shouldDim =
              visibleClusterId.length > 0 && !isInVisibleCluster && !isCoreNode && !isSelected;
            const categoryStyle = getSkillCategoryStyle(node.category);

            return (
              <motion.button
                key={node.id}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Select ${node.label}`}
                onClick={() => setSelectedNodeId(node.id)}
                onFocus={() => setSelectedNodeId(node.id)}
                className={[
                  "focus:ring-accent-green/70 focus:ring-offset-background-deep absolute z-20 -translate-x-1/2 -translate-y-1/2 border text-center font-mono transition focus:ring-2 focus:ring-offset-2 focus:outline-none",
                  isCoreNode
                    ? "flex h-24 w-24 items-center justify-center rounded-full px-3 text-[11px] font-bold tracking-[0.12em] uppercase"
                    : "rounded-full px-3 py-2 text-[10px]",
                  isSelected || isInVisibleCluster
                    ? categoryStyle.selectedNodeClassName
                    : categoryStyle.nodeClassName,
                  isCoreNode && !isSelected ? categoryStyle.glowClassName : "",
                  shouldDim ? "opacity-35" : "opacity-100",
                ].join(" ")}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: isCoreNode ? 0.84 : 0.9 }
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: shouldDim ? 0.35 : 1,
                        scale: isInVisibleCluster || isCoreNode ? 1.05 : 1,
                      }
                }
                transition={{ delay: index * 0.03, duration: 0.25 }}
                data-testid={isCoreNode ? "core-skill-node" : "skill-node"}
              >
                <span className={isCoreNode ? "max-w-[4.8rem] leading-tight" : ""}>
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6">
        <CapabilityClusterControls
          activeClusterId={visibleClusterId}
          lockedClusterId={lockedClusterId}
          onHover={handleClusterHover}
          onLeave={handleClusterLeave}
          onToggle={handleClusterToggle}
        />

        {visibleCluster ? (
          <CapabilityClusterPanel cluster={visibleCluster} nodes={visibleClusterNodes} />
        ) : (
          <SkillDetailPanel selectedNode={selectedNode} relatedNodes={relatedNodes} />
        )}
      </div>

      <div className="grid gap-3 md:hidden" data-testid="skills-mobile-fallback">
        {skillNodes.map((node) => {
          const categoryStyle = getSkillCategoryStyle(node.category);

          return (
            <button
              key={node.id}
              type="button"
              aria-pressed={node.id === selectedNode.id}
              onClick={() => setSelectedNodeId(node.id)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left"
            >
              <p className={["font-mono text-xs uppercase", categoryStyle.textClassName].join(" ")}>
                {categoryStyle.label}
              </p>
              <p className="font-display text-text-primary mt-2 text-xl font-bold">{node.label}</p>
              <p className="text-text-secondary mt-2 text-sm">{node.summary}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CapabilityClusterControls({
  activeClusterId,
  lockedClusterId,
  onHover,
  onLeave,
  onToggle,
}: {
  readonly activeClusterId: string;
  readonly lockedClusterId: string;
  readonly onHover: (clusterId: string) => void;
  readonly onLeave: () => void;
  readonly onToggle: (clusterId: string) => void;
}) {
  return (
    <section
      aria-labelledby="capability-clusters-heading"
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
      onMouseLeave={onLeave}
    >
      <p
        id="capability-clusters-heading"
        className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase"
      >
        Capability Clusters
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {capabilityClusters.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            aria-pressed={lockedClusterId === cluster.id}
            onMouseEnter={() => onHover(cluster.id)}
            onFocus={() => onHover(cluster.id)}
            onClick={() => onToggle(cluster.id)}
            className={[
              "focus:ring-accent-green/70 rounded-full border px-3 py-2 font-mono text-xs transition focus:ring-2 focus:outline-none",
              activeClusterId === cluster.id
                ? "border-accent-green bg-accent-green/20 text-accent-green"
                : "bg-background-deep/50 text-text-secondary hover:text-text-primary border-white/10",
            ].join(" ")}
          >
            {cluster.label}
          </button>
        ))}
      </div>

      <p className="text-text-muted mt-4 text-xs leading-6">
        Hover, focus, or click a cluster to reveal grouped capabilities. Press Escape to clear a
        locked cluster.
      </p>
    </section>
  );
}

export function CapabilityClusterPanel({
  cluster,
  nodes,
}: {
  readonly cluster: CapabilityCluster;
  readonly nodes: readonly SkillNode[];
}) {
  return (
    <motion.aside
      aria-label="Capability cluster details"
      className="border-accent-green/20 bg-accent-green/10 rounded-3xl border p-6 backdrop-blur-xl"
      data-testid="capability-cluster-panel"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase">
        Expanded Cluster
      </p>

      <h3 className="font-display text-text-primary mt-4 text-3xl font-black">{cluster.label}</h3>

      <p className="text-text-secondary mt-4 text-sm leading-7">{cluster.description}</p>

      <div className="mt-6">
        <p className="text-text-muted font-mono text-xs uppercase">Included capabilities</p>

        <div className="mt-3 grid gap-2">
          {nodes.map((node) => {
            const categoryStyle = getSkillCategoryStyle(node.category);

            return (
              <article
                key={node.id}
                className="bg-background-deep/60 rounded-2xl border border-white/10 p-3"
              >
                <p className={["font-mono text-xs", categoryStyle.textClassName].join(" ")}>
                  {node.label}
                </p>
                <p className="text-text-secondary mt-1 text-xs">{node.summary}</p>
                <CapabilityStrengthBar level={node.level} />
              </article>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}

export function SkillDetailPanel({
  selectedNode,
  relatedNodes,
}: {
  readonly selectedNode: SkillNode;
  readonly relatedNodes: readonly SkillNode[];
}) {
  const categoryStyle = getSkillCategoryStyle(selectedNode.category);

  return (
    <aside
      aria-label="Selected skill details"
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
      data-testid="skill-detail-panel"
    >
      <p className="text-accent-green font-mono text-xs tracking-[0.22em] uppercase">
        Selected Capability
      </p>

      <h3 className="font-display text-text-primary mt-4 text-3xl font-black">
        {selectedNode.label}
      </h3>

      <p
        className={[
          "mt-3 font-mono text-xs tracking-[0.18em] uppercase",
          categoryStyle.textClassName,
        ].join(" ")}
      >
        {categoryStyle.label} / Level {selectedNode.level}
      </p>

      <p className="text-text-secondary mt-5 text-sm leading-7">{selectedNode.summary}</p>

      <CapabilityStrengthBar level={selectedNode.level} />

      <div className="mt-6">
        <p className="text-text-muted font-mono text-xs uppercase">Related capabilities</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {relatedNodes.length > 0 ? (
            relatedNodes.map((node) => {
              const relatedStyle = getSkillCategoryStyle(node.category);

              return (
                <span
                  key={node.id}
                  className={[
                    "rounded-full border px-3 py-2 font-mono text-xs",
                    relatedStyle.badgeClassName,
                  ].join(" ")}
                >
                  {node.label}
                </span>
              );
            })
          ) : (
            <span className="text-text-muted text-sm">No direct relationships yet.</span>
          )}
        </div>
      </div>
    </aside>
  );
}

/**
 * CapabilityStrengthBar visualizes a skill node's level.
 *
 * The label and number are rendered as real text, while the bar provides quick
 * visual scanning for depth and growth.
 */
export function CapabilityStrengthBar({ level }: { readonly level: number }) {
  const safeLevel = clampSkillLevel(level);

  return (
    <div className="mt-6" data-testid="capability-strength">
      <div className="flex items-center justify-between gap-4">
        <p className="text-text-muted font-mono text-xs uppercase">Capability Strength</p>
        <p className="text-accent-green font-mono text-xs">{safeLevel}/100</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          role="progressbar"
          aria-label={`Capability strength: ${safeLevel} out of 100`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeLevel}
          className="bg-accent-green h-full rounded-full shadow-[0_0_18px_rgba(0,245,160,0.35)]"
          style={{
            width: `${safeLevel}%`,
          }}
        />
      </div>
    </div>
  );
}
