"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { ExerciseTabsMDX } from "../tabs";
import { CodeEditorPanel } from "../editor";
import { animations } from "@/shared/lib/animations";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
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
  const [showInstructions, setShowInstructions] = useState(false);
  const [showMobileTestResult, setShowMobileTestResult] = useState(false);
  const [lastTestRun, setLastTestRun] = useState<{
    passed: number;
    total: number;
  } | null>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (isMobile && hasRun) {
      setLastTestRun({ passed: passedTests, total: totalTests });
      setShowMobileTestResult(true);

      const timer = setTimeout(() => {
        setShowMobileTestResult(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMobile, hasRun, passedTests, totalTests]);

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
      {/* Mobile: Full-screen editor with slide-in instructions */}
      {isMobile ? (
        <>
          {/* Instructions Panel - slides in from left on mobile */}
          <div
            className={cn(
              "fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out",
              showInstructions ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Instructions</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowInstructions(false);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
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
            </div>
          </div>

          {/* Editor Panel - full screen on mobile */}
          <div className="flex flex-col h-[100vh] w-full fixed inset-0 top-0 left-0 z-40 bg-background">
            {/* Mobile Header with Instructions Toggle */}
            <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowInstructions(true);
                }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="text-sm">Instructions</span>
              </Button>
            </div>

            {/* Mobile Test Result Notification */}
            <AnimatePresence mode="wait">
              {showMobileTestResult && lastTestRun && (
                <motion.div
                  variants={animations.testResult}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cn(
                    "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg",
                    lastTestRun.passed === lastTestRun.total
                      ? "bg-success/90 text-success-foreground"
                      : "bg-destructive/90 text-destructive-foreground",
                  )}
                >
                  {lastTestRun.passed === lastTestRun.total ? (
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      All Tests Passed ({lastTestRun.passed}/{lastTestRun.total}
                      )
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <XCircle className="h-4 w-4" />
                      {lastTestRun.total - lastTestRun.passed} Failed (
                      {lastTestRun.passed}/{lastTestRun.total})
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Editor takes full remaining height */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <CodeEditorPanel
                ref={editorRef}
                exercise={exercise}
                language={language}
                onLanguageChange={onLanguageChange}
                onTestResults={onTestResults}
              />
            </div>
          </div>
        </>
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
