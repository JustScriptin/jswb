import { useCallback } from "react";
import type { CodeEditorHandle } from "@/features/codingChallenges/components/CodeEditor";

export function useTestRunner(
  editorRef: React.RefObject<CodeEditorHandle | null>,
) {
  // React 19 Performance: useCallback with proper dependencies to prevent unnecessary re-renders
  const runTests = useCallback(async () => {
    // Guard against null ref (React 19 best practice)
    if (!editorRef.current) {
      console.warn("CodeEditor ref is not available");
      return;
    }

    try {
      await editorRef.current.runTests();
    } catch (error) {
      console.error("Failed to run tests:", error);
      // Allow error to propagate to parent for handling
      throw error;
    }
  }, [editorRef]);

  return { runTests };
}
