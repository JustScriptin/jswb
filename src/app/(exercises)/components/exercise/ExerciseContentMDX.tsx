"use client";

import { ExerciseContentContainer } from "./ExerciseContentContainer";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "../CodeEditor.types";
import type { ExerciseMDXContent } from "@/shared/types/services";

export type { ExerciseContentContainerProps } from "./ExerciseContentContainer.types";

type ExerciseContentMDXProps = {
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
 * Exercise content component
 * Delegates to the container component for state management and business logic
 */
export function ExerciseContentMDX(props: ExerciseContentMDXProps) {
  return <ExerciseContentContainer {...props} />;
}

ExerciseContentMDX.displayName = "ExerciseContentMDX";
