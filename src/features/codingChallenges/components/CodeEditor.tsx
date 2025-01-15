"use client";

import { useCallback, useRef, useState } from "react";
import Editor, { type EditorProps, type OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      
      const code = editorRef.current.getValue();
      
      const response = await fetch(`/api/exercises/${slug}/run-tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to run tests");
      }

      const { testResults } = await response.json();
      onTestResults?.(testResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      console.error("Failed to run tests:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [slug, onTestResults]);

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
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative min-h-[400px] border rounded-md overflow-hidden">
        <Editor
          defaultLanguage={defaultLanguage}
          defaultValue={defaultValue}
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
          options={editorOptions}
          theme="vs-dark"
          loading={
            <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
              Loading editor...
            </div>
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <div className="flex justify-end">
          <Button
            onClick={handleRunTests}
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Running..." : "Run Tests"}
          </Button>
        </div>
      </div>
    </div>
  );
} 