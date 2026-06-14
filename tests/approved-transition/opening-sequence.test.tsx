import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OpeningSequence } from "../../src/sections/opening-sequence";

afterEach(() => {
  cleanup();
});

describe("OpeningSequence", () => {
  it("starts with the opening intro stage", () => {
    render(
      <OpeningSequence>
        <main>Hero Ready</main>
      </OpeningSequence>
    );

    expect(screen.getByLabelText("Opening portfolio initialization sequence")).toBeInTheDocument();
    expect(screen.queryByText("Hero Ready")).not.toBeInTheDocument();
  });
});
