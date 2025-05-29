"use client";

import { forwardRef } from "react";
import { Code } from "lucide-react";
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

export type CodeEditorPanelUIProps = {
  exercise: Exercise;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
};

/**
 * Presentational component for code editor panel
 * Renders the code editor UI with header and content
 */
export const CodeEditorPanelUI = forwardRef<
  CodeEditorHandle,
  CodeEditorPanelUIProps
>(function CodeEditorPanelUI(
  { exercise, language, onLanguageChange, onTestResults },
  ref,
) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2 px-3 sm:py-3 sm:px-4">
        <div className="space-y-0.5 sm:space-y-1">
          <CardTitle className="text-base sm:text-lg">Solution</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Write your solution and run the tests
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs h-6 px-2">
            <Code className="mr-1 h-3 w-3" />
            {language === "javascript" ? "JavaScript" : "TypeScript"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 grow flex flex-col min-h-0">
        <CodeEditor
          ref={ref}
          defaultLanguage={language}
          defaultValue={exercise.starterCode ?? ""}
          slug={exercise.slug}
          className="grow min-h-0"
          onTestResults={onTestResults}
          onLanguageChange={onLanguageChange}
        />
      </CardContent>
    </Card>
  );
});

CodeEditorPanelUI.displayName = "CodeEditorPanelUI";
