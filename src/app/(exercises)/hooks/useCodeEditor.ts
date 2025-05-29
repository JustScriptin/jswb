"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { browserLogger as logger } from "@/platform";
import type { editor } from "monaco-editor";
import type { OnMount } from "@monaco-editor/react";
import type { Language, TestResult } from "@/shared/types/exercise";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "@/platform/browser/storage";

type UseCodeEditorProps = {
  slug: string;
  defaultLanguage: Language;
  _defaultValue: string;
  onTestResults: ((results: TestResult[]) => void) | undefined;
  onLanguageChange: ((language: Language) => void) | undefined;
};

type UseCodeEditorReturn = {
  _editorRef: React.RefObject<Parameters<OnMount>[0] | null>;
  language: Language;
  isSubmitting: boolean;
  error: string | null;
  handleEditorDidMount: OnMount;
  handleEditorChange: (value: string | undefined) => void;
  handleEditorValidation: (markers: editor.IMarker[]) => void;
  handleLanguageChange: (selectedLanguage: string) => void;
  handleRunTests: () => Promise<void>;
  getCode: () => string;
};

/**
 * Hook for managing code editor state and functionality
 */
export function useCodeEditor({
  slug,
  defaultLanguage,
  _defaultValue,
  onTestResults,
  onLanguageChange,
}: UseCodeEditorProps): UseCodeEditorReturn {
  const _editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const savedLanguage = getLocalStorageValue(
      `${slug}-language`,
      defaultLanguage,
    );
    setLanguage(savedLanguage);

    const savedCode = getLocalStorageValue(`${slug}-code`, null);
    if (savedCode && _editorRef.current) {
      _editorRef.current.setValue(savedCode);
    }
  }, [slug, defaultLanguage]);

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

  const handleRunTests = useCallback(async () => {
    if (!_editorRef.current) {
      logger.warn("Editor ref is not available");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const code = _editorRef.current.getValue();

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
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      logger.error("Failed to run tests:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [slug, language, onTestResults]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    _editorRef.current = editor;

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

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      void handleRunTests();
    });
  };

  const handleEditorValidation = (markers: editor.IMarker[]) => {
    markers.forEach((marker) => {
      logger.info("onValidate:", marker.message);
    });
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage as Language);
  };

  const getCode = () => _editorRef.current?.getValue() ?? "";

  return {
    _editorRef,
    language,
    isSubmitting,
    error,
    handleEditorDidMount,
    handleEditorChange,
    handleEditorValidation,
    handleLanguageChange,
    handleRunTests,
    getCode,
  };
}
