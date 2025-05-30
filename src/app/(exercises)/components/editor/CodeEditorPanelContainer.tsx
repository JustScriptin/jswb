"use client";

import { forwardRef } from "react";
import { CodeEditorPanelDisplay } from "../ui/CodeEditorPanelDisplay";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";

export type CodeEditorPanelContainerProps = {
  exercise: Exercise;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
};

/**
 * Container component for code editor panel
 * Manages state and logic for the code editor panel
 */
export const CodeEditorPanelContainer = forwardRef<
  HTMLDivElement,
  CodeEditorPanelContainerProps
>(function CodeEditorPanelContainer(
  { exercise, language, onLanguageChange, onTestResults },
  ref,
) {
  return (
    <CodeEditorPanelDisplay
      ref={ref}
      slug={exercise.slug}
      defaultValue={exercise.starterCode}
      testCasesCount={exercise.testCases.length}
      language={language}
      onLanguageChange={onLanguageChange}
      onTestResults={onTestResults}
    />
  );
});

CodeEditorPanelContainer.displayName = "CodeEditorPanelContainer";
