import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectDetail } from "@/components/projects/project-detail";
import { projectCaseFiles } from "@/data/projects";

afterEach(() => {
  cleanup();
});

const project = projectCaseFiles[0];

describe("ProjectDetail", () => {
  it("renders project title", () => {
    render(<ProjectDetail project={project} />);

    expect(
      screen.getByRole("heading", {
        name: project.title,
        level: 3,
      })
    ).toBeInTheDocument();
  });

  it("renders problem, solution, and architecture", () => {
    render(<ProjectDetail project={project} />);

    expect(screen.getByText(project.detail.problem)).toBeInTheDocument();
    expect(screen.getByText(project.detail.solution)).toBeInTheDocument();
    expect(screen.getByText(project.detail.architecture)).toBeInTheDocument();
  });

  it("renders lessons learned", () => {
    render(<ProjectDetail project={project} />);

    for (const lesson of project.detail.lessons) {
      expect(screen.getByText(lesson)).toBeInTheDocument();
    }
  });

  it("renders evidence summary", () => {
    render(<ProjectDetail project={project} />);

    const evidenceSummary = screen.getByTestId("project-detail-evidence-summary");

    expect(within(evidenceSummary).getByText("Evidence")).toBeInTheDocument();
    expect(within(evidenceSummary).getByText("Quality Signals")).toBeInTheDocument();
    expect(within(evidenceSummary).getByText("Tech Stack")).toBeInTheDocument();
  });

  it("renders evidence, quality signals, and stack", () => {
    render(<ProjectDetail project={project} />);

    expect(screen.getByText(project.evidence[0])).toBeInTheDocument();
    expect(screen.getByText(project.qualitySignals[0])).toBeInTheDocument();
    expect(screen.getByText(project.stack[0])).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ProjectDetail project={project} onClose={onClose} />);

    await user.click(screen.getByTestId("project-detail-close"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
