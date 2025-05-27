import type { CodeEditorHandle } from "@/features/codingChallenges/components/CodeEditor";
import { logger } from "@/lib/logger";

export function useTestRunner(
  editorRef: React.RefObject<CodeEditorHandle | null>,
) {
  const runTests = async () => {
    // Guard against null ref
    if (!editorRef.current) {
      logger.warn("CodeEditor ref is not available");
      return;
    }

    try {
      await editorRef.current.runTests();
    } catch (error) {
      logger.error("Failed to run tests:", error);
      // Allow error to propagate to parent for handling
      throw error;
    }
  };

  return { runTests };
}
