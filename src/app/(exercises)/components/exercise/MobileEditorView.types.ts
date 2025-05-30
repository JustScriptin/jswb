import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";
import type { CodeEditorHandle } from "../CodeEditor.types";

/**
 * Props for the MobileEditorViewContainer component
 */
export type MobileEditorViewContainerProps = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
  activeTab: string;
  onTabChange: (tab: string) => void;
  testResults: TestResult[];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
  editorRef: React.RefObject<CodeEditorHandle | null>;
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
  exercise: Exercise;
};

/**
 * Props for the MobileEditorViewUI component
 */
export type MobileEditorViewUIProps = MobileEditorViewContainerProps & {
  showInstructions: boolean;
  isInCodeView: boolean;
  lastTestRun: {
    passed: number;
    total: number;
  } | null;
  onShowInstructions: () => void;
  onHideInstructions: () => void;
  onTestFeedbackClick: () => void;
};
