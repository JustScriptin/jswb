/**
 * Type definitions for ExerciseContentContainer component
 */
import type { TestResult, Language, Exercise } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";
import type { CodeEditorHandle } from "../CodeEditor.types";

/**
 * Props for the ExerciseContentContainer component
 */
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
