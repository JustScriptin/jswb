"use client";

import { useMemo } from "react";
import { ExerciseContentDisplay } from "../ui/ExerciseContentDisplay";
import type { ExerciseContentContainerProps } from "./ExerciseContentContainer.types";

/**
 * Container component for exercise content
 * Handles data preparation and delegates rendering to UI component
 */
export function ExerciseContentContainer({
  exerciseMetadata,
  mdxContent,
  isFullscreen,
  testResults,
  activeTab,
  onTabChange,
  language,
  onLanguageChange,
  onTestResults,
  editorRef,
  passedTests,
  totalTests,
  hasRun,
}: ExerciseContentContainerProps) {
  const exercise = useMemo(
    () => ({
      ...exerciseMetadata,
      description: "", // Not needed for code editor
      education: {
        concept: mdxContent.educationConcept,
        explanation: "",
        useCases: [],
      },
    }),
    [exerciseMetadata, mdxContent.educationConcept],
  );

  return (
    <ExerciseContentDisplay
      exerciseMetadata={exercise}
      mdxContent={mdxContent}
      isFullscreen={isFullscreen}
      testResults={testResults}
      activeTab={activeTab}
      onTabChange={onTabChange}
      language={language}
      onLanguageChange={onLanguageChange}
      onTestResults={onTestResults}
      editorRef={editorRef}
      passedTests={passedTests}
      totalTests={totalTests}
      hasRun={hasRun}
    />
  );
}

ExerciseContentContainer.displayName = "ExerciseContentContainer";
