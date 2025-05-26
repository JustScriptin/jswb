import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { ExerciseClient } from "@/features/codingChallenges";
import { EXERCISES } from "@/features/codingChallenges";

jest.mock("@monaco-editor/react", () => () => <div />);
jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));

jest.mock("@/components/ui/markdown", () => ({
  Markdown: ({ content }: { content: string }) => <div>{content}</div>,
}));
let mockResults: Array<{ passed: boolean; message: string; error?: string }>;
const defaultResults = Array(EXERCISES[0]!.testCases.length).fill({
  passed: true,
  message: "",
});

jest.mock("@/features/codingChallenges/components/CodeEditor", () => {
  const React = require("react");
  return {
    CodeEditor: React.forwardRef(function MockEditor(
      props: any,
      ref: React.ForwardedRef<unknown>,
    ) {
      React.useImperativeHandle(ref, () => ({
        runTests: async () => props.onTestResults?.(mockResults),
      }));
      return (
        <div>
          <button onClick={() => props.onTestResults?.(mockResults)}>
            Run Tests
          </button>
          <button
            onClick={() => {
              localStorage.setItem(
                `${props.slug}-language`,
                JSON.stringify("typescript"),
              );
              props.onLanguageChange?.("typescript");
            }}
          >
            Set TypeScript
          </button>
        </div>
      );
    }),
  };
});

beforeEach(() => {
  localStorage.clear();
  mockResults = JSON.parse(JSON.stringify(defaultResults));
});

describe("ExerciseClient", () => {
  it("shows instructions by default", () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    expect(screen.getByText("Problem Description")).toBeInTheDocument();
  });

  it("loads saved language from localStorage", () => {
    localStorage.setItem("reduce-sum-language", JSON.stringify("typescript"));
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("runs tests via button and shows results", async () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    fireEvent.click(screen.getByText("Run Tests"));
    await screen.findByText(
      `${EXERCISES[0]!.testCases.length}/${EXERCISES[0]!.testCases.length}`,
    );
  });

  it("runs tests with Ctrl+Enter", async () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true });
    await screen.findByText(
      `${EXERCISES[0]!.testCases.length}/${EXERCISES[0]!.testCases.length}`,
    );
  });

  it("switches tabs with shortcuts", () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    expect(screen.getByText("Practice Examples")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "1", ctrlKey: true });
    expect(screen.getByText("Problem Description")).toBeInTheDocument();
  });

  it("toggles fullscreen with shortcuts", async () => {
    const { container } = render(<ExerciseClient exercise={EXERCISES[0]!} />);
    const wrapper = container.querySelector(
      '[data-component="ExerciseClient"]',
    );
    const layout = wrapper?.querySelectorAll(".container")[1] as HTMLElement;
    expect(layout).not.toHaveClass("max-w-none");
    fireEvent.keyDown(window, { key: "f", ctrlKey: true });
    await waitFor(() => expect(layout).toHaveClass("max-w-none"));
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(layout).not.toHaveClass("max-w-none"));
  });

  it("opens and closes the shortcuts dialog", async () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    await userEvent.click(screen.getByRole("button", { name: /shortcuts/i }));
    expect(screen.getByText("Keyboard Shortcuts")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByText("Keyboard Shortcuts")).not.toBeInTheDocument(),
    );
  });

  it("shows learn tab when selected", async () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    await userEvent.click(screen.getByRole("tab", { name: /learn/i }));
    expect(
      screen.getByText(EXERCISES[0]!.education.concept),
    ).toBeInTheDocument();
  });

  it("updates language via CodeEditor", async () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    await userEvent.click(screen.getByText("Set TypeScript"));
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(localStorage.getItem("reduce-sum-language")).toBe(
      JSON.stringify("typescript"),
    );
  });
});
