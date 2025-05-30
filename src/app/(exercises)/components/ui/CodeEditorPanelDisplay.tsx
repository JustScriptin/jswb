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
import { CodeEditor } from "../CodeEditor";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import { cn } from "@/shared/lib/utils";

export type CodeEditorPanelDisplayProps = {
  className?: string;
  exercise: Exercise;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onTestResults: (results: TestResult[]) => void;
};

export const CodeEditorPanelDisplay = forwardRef<
  HTMLDivElement,
  CodeEditorPanelDisplayProps
>(function CodeEditorPanelDisplay(
  { className, exercise, language, onLanguageChange, onTestResults },
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
          exercise={exercise}
          language={language}
          onLanguageChange={onLanguageChange}
          onTestResults={onTestResults}
        />
      </CardContent>
    </Card>
  );
});

CodeEditorPanelDisplay.displayName = "CodeEditorPanelDisplay";
