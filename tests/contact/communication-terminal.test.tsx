import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CommunicationTerminal } from "@/components/contact/communication-terminal";
import { contactProfile } from "@/data/contact";

afterEach(() => cleanup());

describe("CommunicationTerminal", () => {
  it("renders terminal", () => {
    render(<CommunicationTerminal />);

    expect(screen.getByTestId("communication-terminal")).toBeInTheDocument();
    expect(screen.getByTestId("terminal-output")).toBeInTheDocument();
  });

  it("renders contact profile", () => {
    render(<CommunicationTerminal />);

    expect(screen.getByText(/Thapelo Magqazana/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Development Engineer in Test/i)).toBeInTheDocument();
  });

  it("renders availability", () => {
    render(<CommunicationTerminal />);

    expect(screen.getByTestId("contact-availability")).toHaveTextContent("Available");
  });

  it("renders terminal prompt", () => {
    render(<CommunicationTerminal />);

    expect(screen.getByText(/visitor@portfolio:~\$/i)).toBeInTheDocument();
    expect(screen.getByText(/launch-contact-actions/i)).toBeInTheDocument();
  });

  it("renders focus areas", () => {
    render(<CommunicationTerminal />);

    expect(screen.getByText("Quality Engineering")).toBeInTheDocument();
    expect(screen.getByText("Release Engineering")).toBeInTheDocument();
    expect(screen.getByText("Test Automation")).toBeInTheDocument();
  });

  it("renders boot sequence", () => {
    render(<CommunicationTerminal />);

    expect(screen.getByText(/Engineering profile loaded/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure collaboration channel ready/i)).toBeInTheDocument();
  });

  it("handles long profile content", () => {
    render(
      <CommunicationTerminal
        profile={{
          ...contactProfile,
          name: "A very long engineering name that should still render without breaking layout",
        }}
      />
    );

    expect(screen.getByText(/very long engineering name/i)).toBeInTheDocument();
  });
});
