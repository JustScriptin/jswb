"use client";

import { useCallback, useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Editor, { type EditorProps, type OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Language, TestResult } from "../types";
import { getLocalStorageValue, setLocalStorageValue } from "@/lib/storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export type CodeEditorProps = {
  defaultLanguage?: Language;
  defaultValue?: string;
  className?: string;
  slug: string;
  onTestResults?: (results: TestResult[]) => void;
  onLanguageChange?: (language: Language) => void;
};

export type CodeEditorHandle = {
  runTests: () => Promise<void>;
};


export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(function CodeEditor({
  defaultLanguage = "typescript" as Language,
  defaultValue = "const solve = () => {\n  // Write your solution here\n}",
  className,
  slug,
  onTestResults,
  onLanguageChange,
}, ref) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const isInitialMount = useRef(true);

  // Initialize state from localStorage after mount
  useEffect(() => {
    const savedLanguage = getLocalStorageValue(
      `${slug}-language`,
      defaultLanguage
    ) as Language;
    setLanguage(savedLanguage);

    const savedCode = getLocalStorageValue(`${slug}-code`, null);
    if (savedCode && editorRef.current) {
      editorRef.current.setValue(savedCode);
    }
  }, [slug, defaultLanguage]);

  // Update parent component when language changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (typeof window === "undefined") return;
    setLocalStorageValue(`${slug}-language`, language);
    onLanguageChange?.(language);
  }, [language, onLanguageChange, slug]);

  // Auto-save code changes
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (typeof window === "undefined" || !value) return;
      setLocalStorageValue(`${slug}-code`, value);
    },
    [slug]
  );

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
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Failed to run tests. Server responded with ${response.status}: ${text}`
        );
      }

      const { results: newResults } = await response.json();
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

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

// Load saved code if it exists
if (typeof window !== "undefined") {
  try {
   const savedCode = getLocalStorageValue(`${slug}-code`, null);
    if (savedCode) {
      editor.setValue(savedCode);
    }
  } catch (err) {
    console.error("Failed to load saved code:", err);
  }
}

    // Add custom keybinding for Cmd/Ctrl + Enter
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        handleRunTests();
      }
    );
  }, [handleRunTests, slug]);

  const handleEditorValidation = useCallback((markers: editor.IMarker[]) => {
    // Log validation issues for debugging
    markers.forEach((marker) => {
      console.log("onValidate:", marker.message);
    });
  }, []);

  // Expose the runTests function to parent components
  useImperativeHandle(ref, () => ({
    runTests: handleRunTests
  }), [handleRunTests]);

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
      data-component="CodeEditor"
      className={cn("flex flex-col flex-grow min-h-0 overflow-hidden", className)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Select
            value={language}
            onValueChange={(val) => setLanguage(val as Language)}
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
          onChange={handleEditorChange}
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
});
CodeEditor.displayName = "CodeEditor";
