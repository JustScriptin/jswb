/**
 * Type definitions for ExercisePresenter component
 */
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";
import type { CodeEditorHandle } from "../CodeEditor.types";

/**
 * Props for the ExercisePresenter component
 */
export type ExercisePresenterProps = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;

  isFullscreen: boolean;
  activeTab: string;
  testResults: TestResult[];
  language: Language;

  passedTests: number;
  totalTests: number;
  hasRun: boolean;

  editorRef: React.RefObject<CodeEditorHandle | null>;

  onToggleFullscreen: () => void;
  onTabChange: (tab: string) => void;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
  _onRunTests?: () => Promise<void>;
};
