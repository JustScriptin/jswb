"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ExerciseTabsMDX } from "../tabs";
import { CodeEditorPanel } from "../editor";
import { animations } from "@/shared/lib/animations";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { MobileEditorView } from "./MobileEditorView";
import type { ExerciseContentUIProps } from "./ExerciseContentUI.types";

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
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <motion.div
      variants={animations.slideUp}
      className={cn(
        "grid gap-3 sm:gap-4 md:gap-6",
        isMobile
          ? "grid-cols-1 h-[100vh]"
          : isFullscreen
            ? "grid-cols-[1fr_2fr]"
            : "grid-cols-1 lg:grid-cols-2",
      )}
    >
      {isMobile ? (
        <MobileEditorView
          exerciseMetadata={exerciseMetadata}
          mdxContent={mdxContent}
          activeTab={activeTab}
          onTabChange={onTabChange}
          testResults={testResults}
          language={language}
          onLanguageChange={onLanguageChange}
          onTestResults={onTestResults}
          editorRef={editorRef}
          passedTests={passedTests}
          totalTests={totalTests}
          hasRun={hasRun}
          exercise={exercise}
        />
      ) : (
        <>
          {/* Desktop: Original side-by-side layout */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
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

          <div className="flex flex-col h-[calc(100vh-20rem)] min-h-[350px] sm:min-h-[450px] md:min-h-[550px]">
            <CodeEditorPanel
              ref={editorRef}
              exercise={exercise}
              language={language}
              onLanguageChange={onLanguageChange}
              onTestResults={onTestResults}
            />
          </div>
        </>
      )}
    </motion.div>
  );
}

ExerciseContentUI.displayName = "ExerciseContentUI";
