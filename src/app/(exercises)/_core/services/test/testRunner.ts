/**
 * Test runner service for executing exercise tests
 */
import type { TestResult } from "@/shared/types/exercise";

/**
 * Executes tests for an exercise
 */
export async function runExerciseTests(
  slug: string,
  code: string,
): Promise<{
  results: TestResult[];
  success: boolean;
}> {
  try {
    const response = await fetch(`/api/exercises/${slug}/run-tests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? "Failed to run tests");
    }

    const data = await response.json();
    const allPassed = data.results.every((result: TestResult) => result.passed);

    return {
      results: data.results,
      success: allPassed,
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
