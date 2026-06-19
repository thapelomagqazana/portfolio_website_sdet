import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ResearchArchive } from "@/components/articles/research-archive";
import { researchArchiveCopy, researchReports } from "@/data/research-archive";

afterEach(() => {
  cleanup();
});

describe("ResearchArchive", () => {
  it("renders research archive", () => {
    render(<ResearchArchive />);

    expect(screen.getByTestId("research-archive")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: researchArchiveCopy.heading,
        level: 3,
      })
    ).toBeInTheDocument();
  });

  it("renders report cards", () => {
    render(<ResearchArchive />);

    expect(screen.getAllByTestId("research-report-card")).toHaveLength(researchReports.length);
  });

  it("renders report metadata", () => {
    render(<ResearchArchive />);

    const firstCard = screen.getAllByTestId("research-report-card")[0];

    expect(within(firstCard).getByText(/Report 01/i)).toBeInTheDocument();
    expect(within(firstCard).getByText("Published")).toBeInTheDocument();
  });

  it("filters reports by category", async () => {
    const user = userEvent.setup();

    render(<ResearchArchive />);

    await user.click(screen.getByTestId("research-filter-brikbyteos"));

    expect(screen.getByTestId("research-filter-brikbyteos")).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    expect(screen.getByText("Introducing BrikByteOS")).toBeInTheDocument();
    expect(screen.queryByText("Playwright Reliability Notes")).not.toBeInTheDocument();
  });

  it("renders empty state for empty reports", () => {
    render(<ResearchArchive reports={[]} />);

    expect(screen.getByTestId("research-empty-state")).toBeInTheDocument();
  });
});
