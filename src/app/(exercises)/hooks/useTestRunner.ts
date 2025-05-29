"use client";

import { useState, useCallback } from "react";
import { browserLogger as logger } from "@/platform";
import type { Exercise, TestResult } from "@/shared/types/exercise";

type TestRunnerState = {
  results: TestResult[];
  isRunning: boolean;
  allPassed: boolean;
  error: string | null;
};

export function useTestRunner(exercise: Exercise) {
  const [state, setState] = useState<TestRunnerState>({
    results: [],
    isRunning: false,
    allPassed: false,
    error: null,
  });

  const runTests = useCallback(
    async (code: string) => {
      setState((prev) => {
        return { ...prev, isRunning: true, error: null };
      });

      try {
        const response = await fetch(
          `/api/exercises/${exercise.slug}/run-tests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error ?? "Failed to run tests");
        }

        const data = await response.json();
        const allPassed = data.results.every(
          (result: TestResult) => result.passed,
        );

        setState({
          results: data.results,
          isRunning: false,
          allPassed,
          error: null,
        });

        return { success: true, allPassed };
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
    runTests,
    resetResults,
    setTestResults: (results: TestResult[]) => {
      setState((prev) => {
        return {
          ...prev,
          results,
          allPassed: results.every((r) => {
            return r.passed;
          }),
        };
      });
    },
  };
}
