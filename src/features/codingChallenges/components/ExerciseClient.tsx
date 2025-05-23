"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExerciseHeader } from "@/features/codingChallenges/components/exercise/ExerciseHeader";
import { ExerciseTitle } from "@/features/codingChallenges/components/exercise/ExerciseTitle";
import { ExerciseContent } from "@/features/codingChallenges/components/exercise/ExerciseContent";
import { useExerciseState } from "@/features/codingChallenges/hooks/useExerciseState";
import { useTestRunner } from "@/features/codingChallenges/hooks/useTestRunner";
import { useLanguagePreference } from "@/features/codingChallenges/hooks/useLanguagePreference";
import { useKeyboardShortcuts } from "@/features/codingChallenges/hooks/useKeyboardShortcuts";
import { exerciseAnimations } from "@/features/codingChallenges/lib/animations";
import type { Exercise } from "@/features/codingChallenges/types";
import type { CodeEditorHandle } from "@/features/codingChallenges/components/CodeEditor";

type Props = {
  exercise: Exercise;
};

export function ExerciseClient({ exercise }: Props) {
  const editorRef = useRef<CodeEditorHandle | null>(null);

  // State management via custom hooks
  const {
    testResults,
    setTestResults,
    activeTab,
    setActiveTab,
    isFullscreen,
    setIsFullscreen,
    passedTests,
    totalTests,
    hasRun,
  } = useExerciseState(exercise);

  const { language, setLanguage } = useLanguagePreference(exercise.slug);
  const { runTests } = useTestRunner(editorRef);

  // Event handlers
  const handleToggleFullscreen = () => setIsFullscreen((prev) => !prev);

  const handleRunTests = async () => {
    await runTests();
    setActiveTab("tests");
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    runTests: handleRunTests,
    toggleFullscreen: handleToggleFullscreen,
    setActiveTab,
    isFullscreen,
  });

  return (
    <motion.div
      data-component="ExerciseClient"
      variants={exerciseAnimations.page}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <ExerciseHeader
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <motion.div
        variants={exerciseAnimations.section}
        className={cn(
          "container mx-auto px-4 py-6 md:py-8 lg:py-12",
          isFullscreen && "max-w-none p-0",
        )}
      >
        <ExerciseTitle category={exercise.category} title={exercise.title} />

        <ExerciseContent
          exercise={exercise}
          isFullscreen={isFullscreen}
          testResults={testResults}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
          onLanguageChange={setLanguage}
          onTestResults={setTestResults}
          editorRef={editorRef}
          passedTests={passedTests}
          totalTests={totalTests}
          hasRun={hasRun}
        />
      </motion.div>
    </motion.div>
  );
}

ExerciseClient.displayName = "ExerciseClient";
