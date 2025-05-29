"use client";

import { TestCaseAccordionContainer } from "./TestCaseAccordionContainer";
import type { TestCase, TestResult } from "@/shared/types/exercise";

export type { TestCaseAccordionContainerProps } from "./TestCaseAccordionContainer";

// types
export type TestCaseAccordionProps = {
  test: TestCase;
  index: number;
  result: TestResult | undefined;
};

/**
 * Test case accordion component
 * Delegates to the container component for state management and business logic
 */
export function TestCaseAccordion(props: TestCaseAccordionProps) {
  return <TestCaseAccordionContainer {...props} />;
}

TestCaseAccordion.displayName = "TestCaseAccordion";
