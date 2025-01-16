"use client";

import { useCallback, useRef, useState } from "react";
import Editor, { type EditorProps, type OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TestResult = {
  passed: boolean;
  message: string;
  error?: string;
};

export type CodeEditorProps = {
  defaultLanguage?: "typescript" | "javascript";
  defaultValue?: string;
  className?: string;
  slug: string;
  onTestResults?: (results: TestResult[]) => void;
};

export function CodeEditor({
  defaultLanguage = "typescript",
  defaultValue = "const solve = () => {\n  // Write your solution here\n}",
  className,
  slug,
  onTestResults,
}: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [language, setLanguage] = useState<"typescript" | "javascript">(defaultLanguage);

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  const handleEditorValidation = useCallback((markers: any[]) => {
    // Log validation issues for debugging
    markers.forEach((marker) => {
      console.log("onValidate:", marker.message);
    });
  }, []);

  const handleRunTests = useCallback(async () => {
    if (!editorRef.current) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setTestResults([]);

      const code = editorRef.current.getValue();

      const response = await fetch(`/api/exercises/${slug}/run-tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Failed to run tests. Server responded with ${response.status}: ${text}`
        );
      }

      const { results: newResults } = await response.json();
      setTestResults(newResults);
      onTestResults?.(newResults);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Failed to run tests:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [slug, onTestResults, language]);

  const editorOptions: EditorProps["options"] = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: isSubmitting,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: "on",
    "semanticHighlighting.enabled": true,
    renderValidationDecorations: "on",
  };

  return (
    <Card
      className={cn("flex flex-col flex-grow min-h-0 overflow-hidden", className)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Select
            value={language}
            onValueChange={(val) => setLanguage(val as "typescript" | "javascript")}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleRunTests}
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Running..." : "Run Tests"}
          </Button>
        </div>
        {isSubmitting && (
          <Badge variant="secondary" className="animate-pulse">
            Running tests...
          </Badge>
        )}
      </div>

      <Separator />

      <div className="flex-grow relative min-h-0">
        <Editor
          height="100%"
          width="100%"
          language={language}
          defaultValue={defaultValue}
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
          options={editorOptions}
          theme="vs-dark"
          loading={
            <div className="flex items-center justify-center w-full h-full bg-muted/50">
              <div className="flex flex-col items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">
                  Loading editor...
                </span>
              </div>
            </div>
          }
        />
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2 px-4 pb-4">
        {error && (
          <Badge variant="destructive" className="self-start">
            {error}
          </Badge>
        )}
      </div>
    </Card>
  );
}
