"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ExerciseHeader } from "../exercise/ExerciseHeader";
import { ExerciseTitle } from "../exercise/ExerciseTitle";
import { ExerciseContentMDX } from "../exercise/ExerciseContentMDX";
import { exerciseAnimations } from "../../helpers/animations";
import { getCategoryObject } from "@/shared/utils/categoryAdapter";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "../CodeEditor";
import type { ExerciseMDXContent } from "@/shared/types/services";

type ExercisePresenterProps = {
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
  onRunTests?: () => Promise<void>;
};

export function ExercisePresenter({
  exerciseMetadata,
  mdxContent,

  isFullscreen,
  activeTab,
  testResults,
  language,

  passedTests,
  totalTests,
  hasRun,

  editorRef,

  onToggleFullscreen,
  onTabChange,
  onLanguageChange,
  onTestResults,
  onRunTests: _onRunTests,
}: ExercisePresenterProps) {
  return (
    <motion.div
      data-component="ExercisePresenter"
      variants={exerciseAnimations.page}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <ExerciseHeader
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />

      <motion.div
        variants={exerciseAnimations.section}
        className={cn(
          "container mx-auto px-4 py-6 md:py-8 lg:py-12",
          isFullscreen && "max-w-none p-0",
        )}
      >
        <ExerciseTitle
          category={getCategoryObject(exerciseMetadata.category)}
          title={exerciseMetadata.title}
        />

        <ExerciseContentMDX
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
        />
      </motion.div>
    </motion.div>
  );
}

ExercisePresenter.displayName = "ExercisePresenter";
