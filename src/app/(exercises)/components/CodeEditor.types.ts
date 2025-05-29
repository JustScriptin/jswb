/**
 * Type definitions for the CodeEditor component
 */

export type CodeEditorHandle = {
  /**
   * Runs tests for the current code
   */
  runTests: () => Promise<void>;

  /**
   * Gets the current code from the editor
   */
  getCode: () => string;
};
