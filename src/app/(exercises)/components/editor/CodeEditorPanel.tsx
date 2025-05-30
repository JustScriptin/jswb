"use client";

import { forwardRef } from "react";
import { CodeEditorPanelContainer } from "./CodeEditorPanelContainer";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";

export type { CodeEditorPanelContainerProps } from "./CodeEditorPanelContainer";

type CodeEditorPanelProps = {
  exercise: Exercise;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
};

/**
 * Code editor panel component
 * Delegates to the container component for state management and business logic
 */
export const CodeEditorPanel = forwardRef<HTMLDivElement, CodeEditorPanelProps>(
  function CodeEditorPanel(props, ref) {
    return <CodeEditorPanelContainer {...props} ref={ref} />;
  },
);

CodeEditorPanel.displayName = "CodeEditorPanel";
