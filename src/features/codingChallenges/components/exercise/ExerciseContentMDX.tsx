"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExerciseTabsMDX } from "@/features/codingChallenges/components/tabs/ExerciseTabsMDX";
import { CodeEditorPanel } from "@/features/codingChallenges/components/editor/CodeEditorPanel";
import { exerciseAnimations } from "@/features/codingChallenges/lib/animations";
import type {
  Exercise,
  TestResult,
  Language,
} from "@/features/codingChallenges/types";
import type { CodeEditorHandle } from "@/features/codingChallenges/components/CodeEditor";
import type { ExerciseMDXContent } from "@/features/codingChallenges/services/exerciseContentService";

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

export function ExerciseContentMDX({
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
}: ExerciseContentMDXProps) {
  // Create a full exercise object for the CodeEditorPanel
  const exercise: Exercise = {
    ...exerciseMetadata,
    description: "", // Not needed for code editor
    education: {
      concept: mdxContent.educationConcept,
      explanation: "",
      useCases: [],
    },
  };

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

ExerciseContentMDX.displayName = "ExerciseContentMDX";
