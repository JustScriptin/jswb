"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ExerciseTabsMDX } from "../../components/tabs/ExerciseTabsMDX";
import { CodeEditorPanel } from "../../components/editor/CodeEditorPanel";
import { animations } from "@/shared/lib/animations";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "../../components/CodeEditor";
import type { ExerciseMDXContent } from "@/shared/types/services";

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

/**
 * Presentational component for exercise content
 * Renders the exercise tabs and code editor panel
 */
export function ExerciseContentUI({
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
  exercise,
}: ExerciseContentUIProps) {
  return (
    <motion.div
      variants={animations.slideUp}
      className={cn(
        "grid gap-6",
        isFullscreen ? "grid-cols-[1fr_2fr]" : "lg:grid-cols-2",
      )}
    >
      {/* Left Column - Instructions & Tests */}
      <div className="space-y-6">
        <ExerciseTabsMDX
          exerciseMetadata={exerciseMetadata}
          mdxContent={mdxContent}
          activeTab={activeTab}
          onTabChange={onTabChange}
          testResults={testResults}
          passedTests={passedTests}
          totalTests={totalTests}
          hasRun={hasRun}
        />
      </div>

      {/* Right Column - Code Editor */}
      <div className="flex flex-col min-h-[800px]">
        <CodeEditorPanel
          ref={editorRef}
          exercise={exercise}
          language={language}
          onLanguageChange={onLanguageChange}
          onTestResults={onTestResults}
        />
      </div>
    </motion.div>
  );
}

ExerciseContentUI.displayName = "ExerciseContentUI";
