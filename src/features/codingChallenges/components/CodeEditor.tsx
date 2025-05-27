"use client";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import MonacoEditor, {
  type EditorProps,
  type OnMount,
  loader,
} from "@monaco-editor/react";

import type { editor } from "monaco-editor";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  DEFAULT_CODE_TEMPLATE,
  MONACO_CDN_URL,
} from "@/features/codingChallenges/constants";
import type { Language, TestResult } from "@/features/codingChallenges/types";
import { logger } from "@/lib/logger";
import { getLocalStorageValue, setLocalStorageValue } from "@/lib/storage";
import { cn } from "@/lib/utils";

// Monaco Editor Performance: Configure loader for optimal performance
// Only run this configuration once on the client side
if (typeof window !== "undefined") {
  loader.config({
    paths: {
      vs: MONACO_CDN_URL,
    },
  });
}

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

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  function CodeEditor(
    {
      defaultLanguage = DEFAULT_LANGUAGE,
      defaultValue = DEFAULT_CODE_TEMPLATE,
      className,
      slug,
      onTestResults,
      onLanguageChange,
    },
    ref,
  ) {
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<Language>(defaultLanguage);
    const isInitialMount = useRef(true);

    // Initialize state from localStorage after mount
    useEffect(() => {
      const savedLanguage = getLocalStorageValue(
        `${slug}-language`,
        defaultLanguage,
      );
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

    const handleEditorChange = (value: string | undefined) => {
      if (typeof window === "undefined" || !value) return;
      setLocalStorageValue(`${slug}-code`, value);
    };

    const handleRunTests = async () => {
      if (!editorRef.current) {
        logger.warn("Editor ref is not available");
        return;
      }

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
            `Failed to run tests. Server responded with ${response.status}: ${text}`,
          );
        }

        const { results: newResults } = await response.json();
        onTestResults?.(newResults);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setError(errorMessage);
        logger.error("Failed to run tests:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    // Monaco Editor: Proper onMount handler with cleanup considerations
    const handleEditorDidMount: OnMount = (editor, monaco) => {
      editorRef.current = editor;

      // Load saved code if it exists (Next.js SSR safe)
      if (typeof window !== "undefined") {
        try {
          const savedCode = getLocalStorageValue(`${slug}-code`, null);
          if (savedCode) {
            editor.setValue(savedCode);
          }
        } catch (error) {
          logger.error("Failed to load saved code:", error);
        }
      }

      // Add custom keybinding for Cmd/Ctrl + Enter
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        void handleRunTests();
      });
    };

    // Monaco Editor: Validation handler
    const handleEditorValidation = (markers: editor.IMarker[]) => {
      // Log validation issues for debugging
      markers.forEach((marker) => {
        logger.info("onValidate:", marker.message);
      });
    };

    useImperativeHandle(
      ref,
      () => ({
        runTests: handleRunTests,
      }),
      [handleRunTests],
    );

    // Editor options - React Compiler will optimize this automatically
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
      // Monaco Editor Performance: Additional optimizations
      suggest: {
        showKeywords: true,
        showSnippets: true,
      },
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false,
      },
    };

    const handleLanguageChange = (selectedLanguage: string) => {
      setLanguage(selectedLanguage as Language);
    };

    return (
      <Card
        data-component="CodeEditor"
        className={cn("flex flex-col grow min-h-0 overflow-hidden", className)}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_LANGUAGES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
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

        <div className="grow relative min-h-0">
          <MonacoEditor
            height="100%"
            width="100%"
            language={language}
            defaultValue={defaultValue}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
            options={editorOptions}
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
  },
);

CodeEditor.displayName = "CodeEditor";
