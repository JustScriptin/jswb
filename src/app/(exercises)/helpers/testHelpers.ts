/**
 * Helper functions for test execution
 * Bridges between UI components and _core services
 */
import {
  runExerciseTests,
  getTestStats,
  formatTestResults,
} from "../_core/services/test/testRunner";
import type { TestResult } from "@/shared/types/exercise";

/**
 * Runs tests for an exercise
 */
export async function runTests(
  slug: string,
  code: string,
): Promise<{
  results: TestResult[];
  success: boolean;
  allPassed: boolean;
}> {
  try {
    const { results, success } = await runExerciseTests(slug, code);
    const { allPassed } = getTestStats(results);

    return {
      results,
      success,
      allPassed,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unknown error running tests",
    );
  }
}

/**
 * Formats test results for display
 */
export function formatResults(results: TestResult[]): string {
  return formatTestResults(results);
}

/**
 * Calculates test statistics
 */
export function calculateTestStats(results: TestResult[]): {
  passed: number;
  total: number;
  allPassed: boolean;
} {
  return getTestStats(results);
}
