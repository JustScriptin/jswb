"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ExerciseTabsMDX } from "../tabs";
import { CodeEditorPanel } from "../editor";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import type { MobileEditorViewUIProps } from "./MobileEditorView.types";

/**
 * Presentational component for mobile editor view
 * Renders a full-screen editor with slide-in instructions panel
 */
export function MobileEditorViewUI({
  exerciseMetadata,
  mdxContent,
  activeTab,
  onTabChange,
  testResults,
  language,
  onLanguageChange,
  onTestResults,
  editorRef,
  passedTests,
  totalTests,
  hasRun,
  exercise,
  showInstructions,
  lastTestRun,
  onShowInstructions,
  onHideInstructions,
  onTestFeedbackClick,
}: MobileEditorViewUIProps) {
  return (
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
            <Button variant="ghost" size="icon" onClick={onHideInstructions}>
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
        {/* Mobile Header with Navigation */}
        <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Link href="/exercises">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs">Back</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={onShowInstructions}
              className="flex items-center gap-1"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="text-xs">Instructions</span>
            </Button>
          </div>

          {/* Clickable Test Results Badge */}
          {lastTestRun && hasRun && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onTestFeedbackClick}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium h-auto",
                lastTestRun.passed === lastTestRun.total
                  ? "bg-success/20 text-success hover:bg-success/30"
                  : "bg-destructive/20 text-destructive hover:bg-destructive/30",
              )}
            >
              {lastTestRun.passed === lastTestRun.total ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {lastTestRun.passed}/{lastTestRun.total}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  {lastTestRun.passed}/{lastTestRun.total}
                </span>
              )}
            </Button>
          )}
        </div>

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
  );
}

MobileEditorViewUI.displayName = "MobileEditorViewUI";
