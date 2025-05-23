import { useState, useMemo } from "react";
import type { Exercise, TestResult } from "@/features/codingChallenges/types";

export function useExerciseState(exercise: Exercise) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // React 19 Performance: Memoize computed values to prevent unnecessary re-calculations
  const computedValues = useMemo(() => {
    const passedTests = testResults.filter((result) => result.passed).length;
    const totalTests = exercise.testCases.length;
    const hasRun = testResults.length > 0;

    return {
      passedTests,
      totalTests,
      hasRun,
    };
  }, [testResults, exercise.testCases.length]);

  return {
    // State
    testResults,
    setTestResults,
    activeTab,
    setActiveTab,
    isFullscreen,
    setIsFullscreen,

    // Computed (memoized)
    ...computedValues,
  };
}
