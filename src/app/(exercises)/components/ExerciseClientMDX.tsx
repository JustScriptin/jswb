"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ExerciseHeader } from "./exercise/ExerciseHeader";
import { ExerciseTitle } from "./exercise/ExerciseTitle";
import { ExerciseContentMDX } from "./exercise/ExerciseContentMDX";
import { useExerciseState } from "../hooks/useExerciseState";
import { useTestRunner } from "../hooks/useTestRunner";
// import { useLanguagePreference } from "../hooks/useLanguagePreference";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { exerciseAnimations } from "../helpers/animations";
import type { Exercise } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "./CodeEditor";
import type { ExerciseMDXContent } from "@/shared/types/services";
import { getCategoryObject } from "@/shared/utils/categoryAdapter";

type Props = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
};

export function ExerciseClientMDX({ exerciseMetadata, mdxContent }: Props) {
  const editorRef = useRef<CodeEditorHandle | null>(null);

  // Reconstruct full exercise object for hooks
  const exercise: Exercise = {
    ...exerciseMetadata,
    description: "", // Not needed for state management
    education: {
      concept: mdxContent.educationConcept,
      explanation: "",
      useCases: [],
    },
  };

  // State management via custom hooks
  const {
    code,
    updateCode: _updateCode,
    isCompleted: _isCompleted,
    markCompleted,
    resetExercise: _resetExercise,
    language,
    setLanguage,
  } = useExerciseState(exercise);

  const {
    results: testResults,
    isRunning: _isRunning,
    allPassed: _allPassed,
    error: _testError,
    runTests,
    resetResults: _resetResults,
    setTestResults,
  } = useTestRunner(exercise);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");

  // Event handlers
  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleRunTests = async () => {
    const result = await runTests(editorRef.current?.getCode() ?? code);
    if (result.allPassed) {
      markCompleted();
    }
    setActiveTab("tests");
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "F9",
      action: handleRunTests,
      description: "Run tests",
    },
    {
      key: "F11",
      action: handleToggleFullscreen,
      description: "Toggle fullscreen",
    },
    {
      key: "1",
      ctrlKey: true,
      action: () => {
        setActiveTab("instructions");
      },
      description: "Show instructions",
    },
    {
      key: "2",
      ctrlKey: true,
      action: () => {
        setActiveTab("tests");
      },
      description: "Show tests",
    },
  ]);

  return (
    <motion.div
      data-component="ExerciseClientMDX"
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
          onTabChange={setActiveTab}
          language={language}
          onLanguageChange={setLanguage}
          onTestResults={(results) => {
            setTestResults(results);
          }}
          editorRef={editorRef}
          passedTests={
            testResults.filter((r) => {
              return r.passed;
            }).length
          }
          totalTests={exercise.testCases?.length ?? 0}
          hasRun={testResults.length > 0}
        />
      </motion.div>
    </motion.div>
  );
}

ExerciseClientMDX.displayName = "ExerciseClientMDX";
