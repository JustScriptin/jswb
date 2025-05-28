/**
 * Shared exercise type definitions
 */
import { z } from "zod";

export const LANGUAGES = ["typescript", "javascript"] as const;
export type Language = (typeof LANGUAGES)[number];

export const CATEGORY_METHODS = {
  arrays: ["reduce", "map", "filter", "forEach"] as const,
  strings: ["split", "slice", "substring", "replace"] as const,
  objects: ["keys", "values", "entries"] as const,
  functions: ["bind", "call", "apply"] as const,
  algorithms: ["sorting", "searching", "recursion"] as const,
  async: ["Promises", "async/await", "setTimeout"] as const,
} as const;

export type CategoryName = keyof typeof CATEGORY_METHODS;

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export const LanguageSchema = z.enum(LANGUAGES);

export type Exercise = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CategoryName;
  difficulty: DifficultyLevel;
  tags: string[];
  starterCode?: string;
  solution?: string;
  testCases: TestCase[];
  education: {
    concept: string;
    explanation: string;
    useCases: string[];
  };
};

export type Category = {
  name: CategoryName;
  method: string;
};

export type TestCase = {
  id: string;
  name: string;
  testCode: string;
  expectedOutput?: string;
  isHidden?: boolean;
  input?: unknown[];
  expected?: unknown;
  message?: string;
};

export type TestResult = {
  passed: boolean;
  message: string;
  expected?: string;
  actual?: string;
  error?: string;
};

export const TestResultSchema = z.object({
  passed: z.boolean(),
  message: z.string(),
  expected: z.string().optional(),
  actual: z.string().optional(),
  error: z.string().optional(),
});
