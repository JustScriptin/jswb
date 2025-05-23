"use client";

import { forwardRef } from "react";
import { Code } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeEditor, type CodeEditorHandle } from "../CodeEditor";
import type { Exercise, TestResult, Language } from "../../types";

type CodeEditorPanelProps = {
  exercise: Exercise;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTestResults: (results: TestResult[]) => void;
};

export const CodeEditorPanel = forwardRef<CodeEditorHandle, CodeEditorPanelProps>(
  function CodeEditorPanel({ exercise, language, onLanguageChange, onTestResults }, ref) {
    return (
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Solution</CardTitle>
            <CardDescription>
              Write your solution and run the tests
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              <Code className="mr-1 h-3 w-3" />
              {language === "javascript" ? "JavaScript" : "TypeScript"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow flex flex-col min-h-0">
          <CodeEditor
            ref={ref}
            defaultLanguage={language}
            defaultValue={exercise.starterCode}
            slug={exercise.slug}
            className="flex-grow min-h-0"
            onTestResults={onTestResults}
            onLanguageChange={onLanguageChange}
          />
        </CardContent>
      </Card>
    );
  }
);

CodeEditorPanel.displayName = "CodeEditorPanel"; 
