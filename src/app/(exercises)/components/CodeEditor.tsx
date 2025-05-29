"use client";

import { forwardRef } from "react";
import { loader } from "@monaco-editor/react";
import { CodeEditorContainer } from "./editor/CodeEditorContainer";
import { MONACO_CDN_URL } from "@/shared/constants/editor";
import type { CodeEditorContainerProps } from "./editor/CodeEditorContainer";
import type { CodeEditorHandle } from "./CodeEditor.types";

// Monaco Editor Performance: Configure loader for optimal performance
// Only run this configuration once on the client side
if (typeof window !== "undefined") {
  loader.config({
    paths: {
      vs: MONACO_CDN_URL,
    },
  });
}

export type { CodeEditorHandle } from "./CodeEditor.types";
export type { CodeEditorContainerProps };

/**
 * CodeEditor component
 * Delegates to the container component for state management and business logic
 */
export const CodeEditor = forwardRef<
  CodeEditorHandle,
  CodeEditorContainerProps
>(function CodeEditor(props, ref) {
  return <CodeEditorContainer {...props} ref={ref} />;
});

CodeEditor.displayName = "CodeEditor";
