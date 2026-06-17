"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import {
  architectureLayerLabels,
  architectureMetrics,
  brikByteArchitectureCopy,
  brikByteArchitectureNodes,
  getArchitectureNodeById,
  getFlattenedArchitectureNodes,
  nodeHasChildren,
} from "@/data/brikbyteos-architecture";
import type { ArchitectureLayer, ArchitectureNode } from "@/data/brikbyteos-architecture";

export function ArchitectureExplorer() {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    brikByteArchitectureCopy.defaultSelectedNodeId
  );

  const [expandedNodeIds, setExpandedNodeIds] = useState<ReadonlySet<string>>(
    () => new Set(["adapters"])
  );

  const selectedNode =
    getArchitectureNodeById(selectedNodeId) ??
    getArchitectureNodeById(brikByteArchitectureCopy.defaultSelectedNodeId) ??
    brikByteArchitectureNodes[0];

  const visibleNodes = useMemo(
    () => getFlattenedArchitectureNodes(brikByteArchitectureNodes, expandedNodeIds),
    [expandedNodeIds]
  );

  function toggleNodeExpansion(node: ArchitectureNode) {
    if (!nodeHasChildren(node)) return;

    setExpandedNodeIds((current) => {
      const next = new Set(current);
      next.has(node.id) ? next.delete(node.id) : next.add(node.id);
      return next;
    });
  }

  function handleNodeClick(node: ArchitectureNode) {
    setSelectedNodeId(node.id);

    if (nodeHasChildren(node)) {
      toggleNodeExpansion(node);
    }
  }

  return (
    <section
      id="brikbyteos-architecture"
      className="mt-16"
      aria-labelledby="brikbyteos-architecture-heading"
      data-testid="architecture-explorer"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-accent-blue font-mono text-xs tracking-[0.3em] uppercase">
            {brikByteArchitectureCopy.eyebrow}
          </p>

          <h2
            id="brikbyteos-architecture-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {brikByteArchitectureCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-base leading-8">
            {brikByteArchitectureCopy.description}
          </p>
        </div>

        <MetricStrip />

        <p className="border-accent-green/20 bg-accent-green/10 text-accent-green mt-5 rounded-2xl border px-4 py-3 font-mono text-xs tracking-[0.18em] uppercase">
          {brikByteArchitectureCopy.flowLabel}
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.08fr_auto_0.92fr]">
          <ArchitectureFlowMap
            nodes={visibleNodes}
            selectedNodeId={selectedNode.id}
            expandedNodeIds={expandedNodeIds}
            onNodeClick={handleNodeClick}
            prefersReducedMotion={prefersReducedMotion}
          />

          <div
            aria-hidden="true"
            className="text-accent-blue/60 hidden items-center justify-center lg:flex"
          >
            <span className="font-mono text-3xl">→</span>
          </div>

          <NodeDetailPanel node={selectedNode} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}

function MetricStrip() {
  return (
    <div
      className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      data-testid="architecture-metrics"
    >
      {architectureMetrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
        >
          <p className="font-display text-text-primary text-2xl font-black">{metric.value}</p>
          <p className="text-text-muted mt-1 font-mono text-[10px] tracking-[0.2em] uppercase">
            {metric.label}
          </p>
        </article>
      ))}
    </div>
  );
}

type ArchitectureFlowMapProps = {
  readonly nodes: readonly ArchitectureNode[];
  readonly selectedNodeId: string;
  readonly expandedNodeIds: ReadonlySet<string>;
  readonly onNodeClick: (node: ArchitectureNode) => void;
  readonly prefersReducedMotion: boolean;
};

function ArchitectureFlowMap({
  nodes,
  selectedNodeId,
  expandedNodeIds,
  onNodeClick,
  prefersReducedMotion,
}: ArchitectureFlowMapProps) {
  const groupedNodes = groupNodesByLayer(nodes);

  return (
    <article
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
      aria-labelledby="architecture-map-heading"
      data-testid="architecture-map"
    >
      <h3
        id="architecture-map-heading"
        className="font-display text-text-primary text-xl font-black"
      >
        Architecture Map
      </h3>

      <p className="text-text-secondary mt-2 text-sm leading-6">
        Follow the release-confidence flow from command input to traceable release artifacts.
      </p>

      <div className="mt-5 grid gap-4">
        {Object.entries(groupedNodes).map(([layer, layerNodes]) => (
          <LayerBand
            key={layer}
            layer={layer as ArchitectureLayer}
            nodes={layerNodes}
            selectedNodeId={selectedNodeId}
            expandedNodeIds={expandedNodeIds}
            onNodeClick={onNodeClick}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </article>
  );
}

type LayerBandProps = {
  readonly layer: ArchitectureLayer;
  readonly nodes: readonly ArchitectureNode[];
  readonly selectedNodeId: string;
  readonly expandedNodeIds: ReadonlySet<string>;
  readonly onNodeClick: (node: ArchitectureNode) => void;
  readonly prefersReducedMotion: boolean;
};

function LayerBand({
  layer,
  nodes,
  selectedNodeId,
  expandedNodeIds,
  onNodeClick,
  prefersReducedMotion,
}: LayerBandProps) {
  return (
    <section
      className="bg-background-deep/50 rounded-2xl border border-white/10 p-4"
      aria-label={`${architectureLayerLabels[layer]} layer`}
      data-testid={`architecture-layer-${layer}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-text-muted font-mono text-[10px] tracking-[0.24em] uppercase">
          {architectureLayerLabels[layer]}
        </p>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence initial={false}>
          {nodes.map((node, index) => {
            const hasChildren = nodeHasChildren(node);
            const isExpanded = expandedNodeIds.has(node.id);
            const isSelected = selectedNodeId === node.id;
            const isChild = node.id.includes("-adapter");

            return (
              <motion.div
                key={node.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ delay: index * 0.025, duration: 0.2 }}
                className={isChild ? "sm:col-span-1" : "sm:col-span-2"}
              >
                <button
                  type="button"
                  onClick={() => onNodeClick(node)}
                  aria-pressed={isSelected}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition",
                    "focus-visible:ring-accent-blue/70 focus:outline-none focus-visible:ring-2",
                    isSelected
                      ? "border-accent-green/60 bg-accent-green/10 shadow-[0_0_34px_rgba(52,211,153,0.16)]"
                      : "hover:border-accent-blue/30 border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                  ].join(" ")}
                  data-testid={`architecture-node-${node.id}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg">
                      {node.icon}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-text-primary text-sm font-black">
                          {node.label}
                        </p>

                        <span
                          aria-hidden="true"
                          className={[
                            "text-text-muted font-mono text-xs transition-transform",
                            hasChildren && isExpanded ? "rotate-90" : "",
                          ].join(" ")}
                        >
                          {hasChildren ? "▶" : "→"}
                        </span>
                      </div>

                      <p className="text-text-secondary mt-1 text-xs leading-5">{node.summary}</p>

                      {typeof node.moduleCount === "number" ? (
                        <p className="text-accent-blue mt-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                          {node.moduleCount} {node.moduleCount === 1 ? "Module" : "Modules"}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

type NodeDetailPanelProps = {
  readonly node: ArchitectureNode;
  readonly prefersReducedMotion: boolean;
};

function NodeDetailPanel({ node, prefersReducedMotion }: NodeDetailPanelProps) {
  return (
    <motion.article
      key={node.id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="border-accent-blue/20 bg-accent-blue/10 rounded-3xl border p-6 backdrop-blur-xl"
      aria-labelledby="architecture-detail-heading"
      data-testid="architecture-detail-panel"
    >
      <p className="text-accent-blue font-mono text-xs tracking-[0.24em] uppercase">
        {architectureLayerLabels[node.layer]}
      </p>

      <h3
        id="architecture-detail-heading"
        className="font-display text-text-primary mt-3 flex items-center gap-3 text-3xl font-black"
      >
        <span aria-hidden="true">{node.icon}</span>
        {node.label}
      </h3>

      <DetailBlock title="Purpose" items={[node.purpose]} />
      <DetailBlock title="Inputs" items={node.inputs} />
      <DetailBlock title="Outputs" items={node.outputs} />
      <DetailBlock title="Produces" items={node.produces} />
      <DetailBlock title="Responsibilities" items={node.responsibilities} />

      {nodeHasChildren(node) ? (
        <div className="mt-6" data-testid="architecture-child-modules">
          <h4 className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">
            Child Modules
          </h4>

          <div className="mt-3 flex flex-wrap gap-2">
            {node.children?.map((child) => (
              <span
                key={child.id}
                className="border-accent-green/20 bg-accent-green/10 text-accent-green rounded-full border px-3 py-2 font-mono text-xs"
              >
                {child.icon} {child.label}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </motion.article>
  );
}

type DetailBlockProps = {
  readonly title: string;
  readonly items: readonly string[];
};

function DetailBlock({ title, items }: DetailBlockProps) {
  return (
    <div className="mt-6">
      <h4 className="text-text-muted font-mono text-xs tracking-[0.22em] uppercase">{title}</h4>

      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="bg-background-deep/50 text-text-secondary rounded-2xl border border-white/10 p-3 text-sm leading-6"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function groupNodesByLayer(
  nodes: readonly ArchitectureNode[]
): Record<ArchitectureLayer, readonly ArchitectureNode[]> {
  return {
    interface: nodes.filter((node) => node.layer === "interface"),
    orchestration: nodes.filter((node) => node.layer === "orchestration"),
    adapters: nodes.filter((node) => node.layer === "adapters"),
    evidence: nodes.filter((node) => node.layer === "evidence"),
    decision: nodes.filter((node) => node.layer === "decision"),
    reporting: nodes.filter((node) => node.layer === "reporting"),
    storage: nodes.filter((node) => node.layer === "storage"),
  };
}
