"use client";

import { TestCasesTabDisplay } from "../ui/TestCasesTabDisplay";
import type { TestCase, TestResult } from "@/shared/types/exercise";

export type { TestCasesTabContainerProps } from "./TestCasesTabContainer";

type TestCasesTabProps = {
  testCases: TestCase[];
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

/**
 * Test cases tab component
 * Delegates to the container component for state management and business logic
 */
export function TestCasesTab(props: TestCasesTabProps) {
  return <TestCasesTabDisplay {...props} />;
}

TestCasesTab.displayName = "TestCasesTab";
