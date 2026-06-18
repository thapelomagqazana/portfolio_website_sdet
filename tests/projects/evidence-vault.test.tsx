import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EvidenceVault } from "@/components/projects/evidence-vault";
import { projectCaseFiles } from "@/data/projects";

afterEach(() => {
  cleanup();
});

describe("EvidenceVault", () => {
  it("renders all projects by default", () => {
    render(<EvidenceVault />);

    expect(screen.getAllByTestId("project-case-file-card")).toHaveLength(projectCaseFiles.length);
  });

  it("renders category filters", () => {
    render(<EvidenceVault />);

    expect(screen.getByTestId("project-filter-all")).toBeInTheDocument();
    expect(screen.getByTestId("project-filter-backend")).toBeInTheDocument();
    expect(screen.getByTestId("project-filter-release-confidence")).toBeInTheDocument();
  });

  it("marks All Evidence as selected by default", () => {
    render(<EvidenceVault />);

    expect(screen.getByTestId("project-filter-all")).toHaveAttribute("aria-pressed", "true");
  });

  it("returns to all projects when All Evidence is clicked", async () => {
    const user = userEvent.setup();

    render(<EvidenceVault />);

    await user.click(screen.getByTestId("project-filter-backend"));
    await user.click(screen.getByTestId("project-filter-all"));

    expect(screen.getAllByTestId("project-case-file-card")).toHaveLength(projectCaseFiles.length);
  });

  it("renders the responsive grid classes", () => {
    render(<EvidenceVault />);

    expect(screen.getByTestId("project-case-file-grid")).toHaveClass(
      "grid gap-5",
      "md:grid-cols-2"
    );
  });

  it("handles an empty project list safely", () => {
    render(<EvidenceVault projects={[]} />);

    expect(screen.getByTestId("projects-empty-state")).toBeInTheDocument();
    expect(screen.getByText("No project case files found for this category.")).toBeInTheDocument();
  });
});
