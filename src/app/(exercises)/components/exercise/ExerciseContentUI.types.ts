/**
 * Type definitions for ExerciseContentUI component
 */
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";
import type { CodeEditorHandle } from "../CodeEditor.types";

/**
 * Props for the ExerciseContentUI component
 */
export type ExerciseContentUIProps = {
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
  exercise: Exercise;
};
