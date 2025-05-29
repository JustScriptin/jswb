"use client";

import { forwardRef } from "react";
import { CodeEditorPanelUI } from "./CodeEditorPanelUI";
import type { CodeEditorHandle } from "../CodeEditor";
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
  CodeEditorHandle,
  CodeEditorPanelContainerProps
>(function CodeEditorPanelContainer(
  { exercise, language, onLanguageChange, onTestResults },
  ref,
) {
  return (
    <CodeEditorPanelUI
      ref={ref}
      exercise={exercise}
      language={language}
      onLanguageChange={onLanguageChange}
      onTestResults={onTestResults}
    />
  );
});

CodeEditorPanelContainer.displayName = "CodeEditorPanelContainer";
