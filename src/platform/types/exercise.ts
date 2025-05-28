/**
 * Platform-specific exercise types
 */

export type TestCase = {
  input: unknown[];
  expected: unknown;
  message: string;
};

export type TestResult = {
  passed: boolean;
  message: string;
  error?: string;
};

export type Language = "javascript" | "typescript" | "python";
