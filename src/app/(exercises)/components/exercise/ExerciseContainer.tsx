"use client";

import { useRef, useState } from "react";
import { useExerciseState } from "../../hooks/useExerciseState";
import { useTestRunnerV2 } from "../../hooks/useTestRunnerV2";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { ExercisePresenter } from "./ExercisePresenter";
import type { Exercise } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "../CodeEditor.types";
import type { ExerciseContainerProps } from "./ExerciseContainer.types";

export function ExerciseContainer({
  exerciseMetadata,
  mdxContent,
}: ExerciseContainerProps) {
  const editorRef = useRef<CodeEditorHandle | null>(null);

  const exercise: Exercise = {
    ...exerciseMetadata,
    description: "", // Not needed for state management
    education: {
      concept: mdxContent.educationConcept,
      explanation: "",
      useCases: [],
    },
  };

  const {
    code,
    updateCode: _updateCode,
    isCompleted: _isCompleted,
    markCompleted,
    resetExercise: _resetExercise,
    language,
    setLanguage,
  } = useExerciseState(exercise);

  const {
    results: testResults,
    isRunning: _isRunning,
    allPassed: _allPassed,
    error: _testError,
    runTests,
    resetResults: _resetResults,
    setTestResults,
  } = useTestRunnerV2(exercise);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleRunTests = async () => {
    const result = await runTests(editorRef.current?.getCode() ?? code);
    if (result.allPassed) {
      markCompleted();
    }
    setActiveTab("tests");
  };

  useKeyboardShortcuts([
    {
      key: "F9",
      action: handleRunTests,
      description: "Run tests",
    },
    {
      key: "F11",
      action: handleToggleFullscreen,
      description: "Toggle fullscreen",
    },
    {
      key: "1",
      ctrlKey: true,
      action: () => {
        setActiveTab("instructions");
      },
      description: "Show instructions",
    },
    {
      key: "2",
      ctrlKey: true,
      action: () => {
        setActiveTab("tests");
      },
      description: "Show tests",
    },
  ]);

  const passedTests = testResults.filter((r) => r.passed).length;
  const totalTests = exercise.testCases?.length ?? 0;
  const hasRun = testResults.length > 0;

  return (
    <ExercisePresenter
      exerciseMetadata={exerciseMetadata}
      mdxContent={mdxContent}
      isFullscreen={isFullscreen}
      activeTab={activeTab}
      testResults={testResults}
      language={language}
      passedTests={passedTests}
      totalTests={totalTests}
      hasRun={hasRun}
      editorRef={editorRef}
      onToggleFullscreen={handleToggleFullscreen}
      onTabChange={setActiveTab}
      onLanguageChange={setLanguage}
      onTestResults={setTestResults}
      _onRunTests={handleRunTests}
    />
  );
}

ExerciseContainer.displayName = "ExerciseContainer";
