"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExerciseTabs } from "../tabs/ExerciseTabs";
import { CodeEditorPanel } from "../editor/CodeEditorPanel";
import { exerciseAnimations } from "../../lib/animations";
import type { Exercise, TestResult, Language } from "../../types";
import type { CodeEditorHandle } from "../CodeEditor";

type ExerciseContentProps = {
  exercise: Exercise;
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

export function ExerciseContent({
  exercise,
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
}: ExerciseContentProps) {
  return (
    <motion.div
      variants={exerciseAnimations.section}
      className={cn(
        "grid gap-6",
        isFullscreen ? "grid-cols-[1fr_2fr]" : "lg:grid-cols-2",
      )}
    >
      {/* Left Column - Instructions & Tests */}
      <div className="space-y-6">
        <ExerciseTabs
          exercise={exercise}
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

ExerciseContent.displayName = "ExerciseContent"; 
