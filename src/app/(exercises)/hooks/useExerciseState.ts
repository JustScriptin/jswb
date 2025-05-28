"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "@/platform/browser/storage";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";

export function useExerciseState(exercise: Exercise) {
  const [code, setCode] = useState<string>(exercise.starterCode ?? "");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(
    getLocalStorageValue(`${exercise.slug}-completed`, false),
  );
  const [language, setLanguageState] = useState<Language>("javascript");

  useEffect(() => {
    const savedLanguage = getLocalStorageValue<Language>(
      `${exercise.slug}-language`,
      "javascript",
    );
    setLanguageState(savedLanguage);
  }, [exercise.slug]);

  // React 19 Performance: Memoize computed values to prevent unnecessary re-calculations
  const computedValues = useMemo(() => {
    const passedTests = testResults.filter((result) => result.passed).length;
    const totalTests = exercise.testCases?.length ?? 0;
    const hasRun = testResults.length > 0;

    return {
      passedTests,
      totalTests,
      hasRun,
    };
  }, [testResults, exercise.testCases]);

  const updateCode = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const markCompleted = useCallback(() => {
    setIsCompleted(true);
    setLocalStorageValue(`${exercise.slug}-completed`, true);
  }, [exercise.slug]);

  const resetExercise = useCallback(() => {
    setCode(exercise.starterCode ?? "");
    setTestResults([]);
    setIsCompleted(false);
    setLocalStorageValue(`${exercise.slug}-completed`, false);
  }, [exercise.starterCode, exercise.slug]);

  const setLanguage = useCallback(
    (newLanguage: Language) => {
      setLanguageState(newLanguage);
      setLocalStorageValue(`${exercise.slug}-language`, newLanguage);
    },
    [exercise.slug],
  );

  return {
    // State
    code,
    updateCode,
    testResults,
    setTestResults,
    activeTab,
    setActiveTab,
    isFullscreen,
    setIsFullscreen,
    isCompleted,
    markCompleted,
    resetExercise,
    language,
    setLanguage,

    // Computed (memoized)
    ...computedValues,
  };
}
