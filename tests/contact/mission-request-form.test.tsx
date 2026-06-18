import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { MissionRequestForm } from "@/components/contact/mission-request-form";
import { missionRequestContent, missionRequestTypeOptions } from "@/data/mission-request";

afterEach(() => cleanup());

describe("MissionRequestForm", () => {
  it("renders form", () => {
    render(<MissionRequestForm />);

    expect(screen.getByTestId("mission-request-form-section")).toHaveAttribute(
      "id",
      "mission-request"
    );

    expect(
      screen.getByRole("heading", {
        name: missionRequestContent.heading,
        level: 3,
      })
    ).toBeInTheDocument();
  });

  it("renders required fields", () => {
    render(<MissionRequestForm />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mission Brief/i)).toBeInTheDocument();
  });

  it("renders request types", () => {
    render(<MissionRequestForm />);

    for (const option of missionRequestTypeOptions) {
      expect(screen.getByRole("option", { name: option.label })).toBeInTheDocument();
    }
  });

  it("shows validation errors for empty submit", async () => {
    const user = userEvent.setup();

    render(<MissionRequestForm />);

    await user.click(screen.getByTestId("mission-request-submit"));

    expect(await screen.findByText("Full name is required.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("updates character counter", async () => {
    const user = userEvent.setup();

    render(<MissionRequestForm />);

    await user.type(screen.getByLabelText(/Mission Brief/i), "Hello mission");

    expect(screen.getByTestId("mission-message-counter")).toHaveTextContent("13 / 5000");
  });

  it("submits valid form and renders success state", async () => {
    const user = userEvent.setup();

    render(<MissionRequestForm />);

    await user.type(screen.getByLabelText(/Full Name/i), "Thapelo Magqazana");
    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Subject/i), "Quality Engineering");
    await user.type(
      screen.getByLabelText(/Mission Brief/i),
      "I need help improving release confidence across a software delivery pipeline."
    );

    await user.click(screen.getByTestId("mission-request-submit"));

    expect(await screen.findByTestId("mission-request-success")).toBeInTheDocument();
  });
});
