"use client";

import { TestCaseAccordionDisplay } from "../ui/TestCaseAccordionDisplay";
import type { TestCase, TestResult } from "@/shared/types/exercise";

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
  return (
    <TestCaseAccordionDisplay
      testCase={test}
      index={index}
      testResult={result}
    />
  );
}

TestCaseAccordionContainer.displayName = "TestCaseAccordionContainer";
