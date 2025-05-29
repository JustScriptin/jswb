"use client";

import { forwardRef, useImperativeHandle } from "react";
import { useCodeEditor } from "../../hooks/useCodeEditor";
import { CodeEditorUI } from "./CodeEditorUI";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_CODE_TEMPLATE,
} from "@/shared/constants/editor";
import type { Language, TestResult } from "@/shared/types/exercise";
import type { CodeEditorHandle } from "../CodeEditor.types";

export type CodeEditorContainerProps = {
  defaultLanguage?: Language;
  defaultValue?: string;
  className?: string;
  slug: string;
  onTestResults?: (results: TestResult[]) => void;
  onLanguageChange?: (language: Language) => void;
};

export const CodeEditorContainer = forwardRef<
  CodeEditorHandle,
  CodeEditorContainerProps
>(function CodeEditorContainer(
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
  const {
    language,
    isSubmitting,
    error,
    handleEditorDidMount,
    handleEditorChange,
    handleEditorValidation,
    handleLanguageChange,
    handleRunTests,
    getCode,
  } = useCodeEditor({
    slug,
    defaultLanguage,
    _defaultValue: defaultValue,
    onTestResults,
    onLanguageChange,
  });

  const editorOptions = {
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
    folding: true,
    foldingStrategy: "indentation",
    matchBrackets: "always",
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
      alwaysConsumeMouseWheel: false,
    },
    suggest: {
      showKeywords: true,
      showSnippets: true,
    },
    quickSuggestions: {
      other: true,
      comments: false,
      strings: false,
    },
    padding: {
      top: 8,
      bottom: 8,
    },
  };

  useImperativeHandle(
    ref,
    () => ({
      runTests: handleRunTests,
      getCode,
    }),
    [handleRunTests, getCode],
  );

  return (
    <CodeEditorUI
      className={className}
      language={language}
      defaultValue={defaultValue}
      isSubmitting={isSubmitting}
      error={error}
      editorOptions={editorOptions}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      onValidate={handleEditorValidation}
      onLanguageChange={handleLanguageChange}
      onRunTests={handleRunTests}
    />
  );
});

CodeEditorContainer.displayName = "CodeEditorContainer";
