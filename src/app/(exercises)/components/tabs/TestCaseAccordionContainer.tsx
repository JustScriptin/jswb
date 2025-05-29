"use client";

import { useState } from "react";
import { TestCaseAccordionUI } from "./TestCaseAccordionUI";
import type { TestCase, TestResult } from "@/shared/types/exercise";

function extractInputFromTestCode(testCode: string): string {
  const regex = /solve\((.*?)\)/;
  const match = regex.exec(testCode);
  if (match?.[1]) {
    return match[1];
  }
  return "Input not available";
}

function formatExpectedOutput(expectedOutput: string | undefined): string {
  if (!expectedOutput) {
    return "Expected output not available";
  }
  return expectedOutput;
}

export type TestCaseAccordionContainerProps = {
  test: TestCase;
  index: number;
  result: TestResult | undefined;
};

/**
 * Container component for test case accordion
 * Manages state and logic for the accordion
 */
export function TestCaseAccordionContainer({
  test,
  index,
  result,
}: TestCaseAccordionContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isPassed = result?.passed;
  const hasRun = result !== undefined;

  const inputContent = test.input
    ? JSON.stringify(test.input, null, 2)
    : extractInputFromTestCode(test.testCode);

  const expectedContent = test.expected
    ? JSON.stringify(test.expected, null, 2)
    : formatExpectedOutput(test.expectedOutput);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TestCaseAccordionUI
      test={test}
      index={index}
      result={result}
      isOpen={isOpen}
      onToggle={handleToggle}
      isPassed={isPassed}
      hasRun={hasRun}
      inputContent={inputContent}
      expectedContent={expectedContent}
    />
  );
}

TestCaseAccordionContainer.displayName = "TestCaseAccordionContainer";
