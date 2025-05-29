/**
 * Utility functions for test execution and result processing
 */
import type { TestCase, TestResult } from "@/shared/types/exercise";

/**
 * Constants for test execution
 */
export const TEST_TIMEOUT_MS = 5000;

export const TEST_RESULT_MESSAGES = {
  PASSED: "Test passed successfully",
  FAILED: "Test failed",
  ERROR: "Error executing test",
  TIMEOUT: "Test execution timed out",
};

/**
 * Formats test results for display
 */
export function formatTestResults(results: TestResult[]): string {
  return results
    .map((result, index) => {
      const status = result.passed ? "✅" : "❌";
      return `${status} Test ${index + 1}: ${result.message}`;
    })
    .join("\n");
}

/**
 * Calculates test statistics
 */
export function getTestStats(results: TestResult[]): {
  passed: number;
  total: number;
  allPassed: boolean;
} {
  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  return {
    passed,
    total,
    allPassed: passed === total && total > 0,
  };
}

/**
 * Validates test case format
 */
export function validateTestCase(testCase: TestCase): boolean {
  return Boolean(
    testCase.id &&
      testCase.name &&
      (testCase.testCode ||
        (testCase.input !== undefined && testCase.expected !== undefined)),
  );
}
