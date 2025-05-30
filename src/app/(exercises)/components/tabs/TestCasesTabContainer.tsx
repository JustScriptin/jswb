"use client";

import { TestCasesTabDisplay } from "../ui/TestCasesTabDisplay";
import type { TestCase, TestResult } from "@/shared/types/exercise";

export type TestCasesTabContainerProps = {
  testCases: TestCase[];
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

/**
 * Container component for test cases tab
 * Manages test case data and delegates rendering to UI component
 */
export function TestCasesTabContainer({
  testCases,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: TestCasesTabContainerProps) {
  return (
    <TestCasesTabDisplay
      testCases={testCases}
      testResults={testResults}
      passedTests={passedTests}
      totalTests={totalTests}
      hasRun={hasRun}
    />
  );
}

TestCasesTabContainer.displayName = "TestCasesTabContainer";
