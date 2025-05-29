"use client";

import { useState, useCallback } from "react";
import { logger } from "@/platform/node/logger";
import { runTests, calculateTestStats } from "../helpers/testHelpers";
import type { Exercise, TestResult } from "@/shared/types/exercise";

type TestRunnerState = {
  results: TestResult[];
  isRunning: boolean;
  allPassed: boolean;
  error: string | null;
};

/**
 * Hook for managing test execution and results
 * Uses helper functions to interact with core services
 */
export function useTestRunnerV2(exercise: Exercise) {
  const [state, setState] = useState<TestRunnerState>({
    results: [],
    isRunning: false,
    allPassed: false,
    error: null,
  });

  const executeTests = useCallback(
    async (code: string) => {
      setState((prev) => {
        return { ...prev, isRunning: true, error: null };
      });

      try {
        const { results, success, allPassed } = await runTests(
          exercise.slug,
          code,
        );

        setState({
          results,
          isRunning: false,
          allPassed,
          error: null,
        });

        return { success, allPassed };
      } catch (error) {
        logger.error("Error running tests:", error);
        setState({
          results: [],
          isRunning: false,
          allPassed: false,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error running tests",
        });
        return { success: false, allPassed: false };
      }
    },
    [exercise.slug],
  );

  const resetResults = useCallback(() => {
    setState({
      results: [],
      isRunning: false,
      allPassed: false,
      error: null,
    });
  }, []);

  return {
    results: state.results,
    isRunning: state.isRunning,
    allPassed: state.allPassed,
    error: state.error,
    runTests: executeTests,
    resetResults,
    setTestResults: (results: TestResult[]) => {
      setState((prev) => {
        const { allPassed } = calculateTestStats(results);
        return {
          ...prev,
          results,
          allPassed,
        };
      });
    },
  };
}
