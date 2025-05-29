"use client";

import { useMemo } from "react";
import { ExerciseContentUI } from "./ExerciseContentUI";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "../../components/CodeEditor";
import type { ExerciseMDXContent } from "@/shared/types/services";

export type ExerciseContentContainerProps = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
  isFullscreen: boolean;
  testResults: TestResult[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
  editorRef: React.RefObject<CodeEditorHandle | null>;
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

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
    <ExerciseContentUI
      exerciseMetadata={exerciseMetadata}
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
      exercise={exercise}
    />
  );
}

ExerciseContentContainer.displayName = "ExerciseContentContainer";
