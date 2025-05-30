"use client";

import { forwardRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { CodeEditor, type CodeEditorHandle } from "../CodeEditor";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import { cn } from "@/shared/lib/utils";

export type CodeEditorPanelDisplayProps = {
  className?: string;
  exercise: Exercise;
  language: Language;
  defaultValue: string;
  testResults: TestResult[];
  isSubmitting: boolean;
  error: string | null;
  onLanguageChange: (language: string) => void;
  onTestResults: (results: TestResult[]) => void;
  editorRef?: React.RefObject<CodeEditorHandle>;
};

export const CodeEditorPanelDisplay = forwardRef<
  HTMLDivElement,
  CodeEditorPanelDisplayProps
>(function CodeEditorPanelDisplay(
  {
    className,
    exercise,
    language,
    defaultValue,
    testResults,
    isSubmitting,
    error,
    onLanguageChange,
    onTestResults,
    editorRef,
  },
  ref,
) {
  return (
    <Card
      ref={ref}
      className={cn("flex flex-col h-full overflow-hidden", className)}
      data-component="CodeEditorPanelDisplay"
    >
      <CardHeader className="px-4 py-3 sm:p-4 space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Code Editor</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            {exercise.testCases.length} Tests
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm">
          Write your solution below and run the tests to check your answer.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <CodeEditor
          language={language}
          defaultValue={defaultValue}
          testResults={testResults}
          isSubmitting={isSubmitting}
          error={error}
          onLanguageChange={onLanguageChange}
          onTestResults={onTestResults}
          ref={editorRef}
        />
      </CardContent>
    </Card>
  );
});

CodeEditorPanelDisplay.displayName = "CodeEditorPanelDisplay";
