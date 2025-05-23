import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as React from "react";
import { ExerciseClient } from "@/features/codingChallenges";
import { EXERCISES } from "@/features/codingChallenges";

jest.mock("@monaco-editor/react", () => () => <div />);
jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));
jest.mock("react-markdown", () => (props: { children: React.ReactNode }) => (
  <div>{props.children}</div>
));
jest.mock("@/components/ui/markdown", () => ({
  Markdown: ({ content }: { content: string }) => <div>{content}</div>,
}));
jest.mock("@/features/codingChallenges/components/CodeEditor", () => {
  const React = require("react");
  type MockCodeEditorProps = {
    onTestResults?: (
      results: Array<{ passed: boolean; message: string }>,
    ) => void;
  };

  return {
    CodeEditor: React.forwardRef(function MockEditor(
      props: MockCodeEditorProps,
      ref: React.ForwardedRef<unknown>,
    ) {
      const results = Array(EXERCISES[0]!.testCases.length).fill({
        passed: true,
        message: "",
      });

      React.useImperativeHandle(ref, () => ({
        runTests: async () => props.onTestResults?.(results),
      }));

      return (
        <button onClick={() => props.onTestResults?.(results)}>
          Run Tests
        </button>
      );
    }),
  };
});

describe("exercise integration", () => {
  it("runs tests and shows results", async () => {
    render(<ExerciseClient exercise={EXERCISES[0]!} />);
    fireEvent.click(screen.getByText("Run Tests"));
    await screen.findByText(
      `${EXERCISES[0]!.testCases.length}/${EXERCISES[0]!.testCases.length}`,
    );
  });
});
