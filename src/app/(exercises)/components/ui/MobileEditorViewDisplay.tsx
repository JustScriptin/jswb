"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ExerciseTabsDisplay } from "./ExerciseTabsDisplay";
import { CodeEditorPanelDisplay } from "./CodeEditorPanelDisplay";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import type { TestResult, Language, Exercise } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";
import type { CodeEditorHandle } from "../CodeEditor.types";

export type MobileEditorViewDisplayProps = {
  exerciseMetadata: Exercise;
  mdxContent: ExerciseMDXContent;
  activeTab: string;
  onTabChange: (tab: string) => void;
  testResults: TestResult[];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
  _editorRef: React.RefObject<CodeEditorHandle>;
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
  showInstructions: boolean;
  lastTestRun: {
    passed: number;
    total: number;
  } | null;
  onShowInstructions: () => void;
  onHideInstructions: () => void;
  onTestFeedbackClick: () => void;
};

/**
 * Mobile editor view display component
 * Renders a full-screen editor with slide-in instructions panel
 */
export function MobileEditorViewDisplay({
  exerciseMetadata,
  mdxContent,
  activeTab,
  onTabChange,
  testResults,
  language,
  onLanguageChange,
  onTestResults,
  _editorRef,
  passedTests,
  totalTests,
  hasRun,
  showInstructions,
  lastTestRun,
  onShowInstructions,
  onHideInstructions,
  onTestFeedbackClick,
}: MobileEditorViewDisplayProps) {
  return (
    <>
      {/* Instructions Panel - slides in from left on mobile */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out",
          showInstructions ? "translate-x-0" : "-translate-x-full",
        )}
        data-component="MobileEditorViewDisplay-Instructions"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 border-b">
            <Link href="/exercises">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-muted-foreground/30 hover:bg-muted/80"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs font-medium">Exercises List</span>
              </Button>
            </Link>
            <h2 className="text-lg font-semibold flex-1 text-center">
              Exercise
            </h2>
            <Button variant="ghost" size="icon" onClick={onHideInstructions}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to code editor</span>
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ExerciseTabsDisplay
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
      <div
        className="flex flex-col h-[100vh] w-full fixed inset-0 top-0 left-0 z-40 bg-background"
        data-component="MobileEditorViewDisplay-Editor"
      >
        {/* Mobile Header with Navigation */}
        <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
          <div
            onClick={onShowInstructions}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted/80 cursor-pointer transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="text-xs font-medium">Exercise</span>
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
          <CodeEditorPanelDisplay
            slug={exerciseMetadata.slug}
            defaultValue={exerciseMetadata.starterCode ?? ""}
            testCasesCount={exerciseMetadata.testCases.length}
            _language={language}
            onLanguageChange={onLanguageChange}
            onTestResults={onTestResults}
          />
        </div>
      </div>
    </>
  );
}

MobileEditorViewDisplay.displayName = "MobileEditorViewDisplay";
