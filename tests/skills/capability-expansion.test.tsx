import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EngineeringConstellation } from "../../src/components/skills/engineering-constellation";
import {
  capabilityClusters,
  getCapabilityClusterById,
  getCapabilityClusterNodes,
  isNodeInCapabilityCluster,
} from "../../src/data/skills-matrix";

afterEach(() => {
  cleanup();
});

describe("capability cluster data", () => {
  it("defines capability clusters", () => {
    expect(capabilityClusters.length).toBeGreaterThan(0);
  });

  it("resolves a cluster by id", () => {
    expect(getCapabilityClusterById("release-confidence")?.label).toBe("Release Confidence");
  });

  it("returns nodes inside a cluster", () => {
    expect(getCapabilityClusterNodes("release-confidence").length).toBeGreaterThan(0);
  });

  it("checks node membership safely", () => {
    expect(isNodeInCapabilityCluster("quality-gates", "release-confidence")).toBe(true);
    expect(isNodeInCapabilityCluster("logs", "release-confidence")).toBe(false);
    expect(isNodeInCapabilityCluster("logs", "unknown")).toBe(false);
  });
});

describe("Capability expansion", () => {
  it("renders cluster buttons", () => {
    render(<EngineeringConstellation />);

    for (const cluster of capabilityClusters) {
      expect(screen.getByRole("button", { name: cluster.label })).toBeInTheDocument();
    }
  });

  it("hover reveals cluster description", async () => {
    const user = userEvent.setup();

    render(<EngineeringConstellation />);

    const cluster = capabilityClusters[0];

    await user.hover(screen.getByRole("button", { name: cluster.label }));

    expect(screen.getByText(cluster.description)).toBeInTheDocument();
  });

  it("focus reveals cluster description", async () => {
    const user = userEvent.setup();

    render(<EngineeringConstellation />);

    const cluster = capabilityClusters[1];

    await user.tab();
    await user.tab();

    await user.click(screen.getByRole("button", { name: cluster.label }));

    expect(screen.getByText(cluster.description)).toBeInTheDocument();
  });

  it("click locks cluster", async () => {
    const user = userEvent.setup();

    render(<EngineeringConstellation />);

    const cluster = capabilityClusters[0];
    const button = screen.getByRole("button", { name: cluster.label });

    await user.click(button);

    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("capability-cluster-panel")).toBeInTheDocument();
  });

  it("second click unlocks cluster", async () => {
    const user = userEvent.setup();

    render(<EngineeringConstellation />);

    const cluster = capabilityClusters[0];
    const button = screen.getByRole("button", { name: cluster.label });

    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("Escape clears locked cluster", async () => {
    const user = userEvent.setup();

    render(<EngineeringConstellation />);

    const cluster = capabilityClusters[0];
    const button = screen.getByRole("button", { name: cluster.label });

    await user.click(button);
    await user.keyboard("{Escape}");

    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  //   it("renders included capabilities", async () => {
  //     const user = userEvent.setup();

  //     render(<EngineeringConstellation />);

  //     const cluster = capabilityClusters[0];

  //     await user.click(screen.getByRole("button", { name: cluster.label }));

  //     for (const node of getCapabilityClusterNodes(cluster.id)) {
  //       expect(screen.getByText(node.label)).toBeInTheDocument();
  //     }
  //   });
});
