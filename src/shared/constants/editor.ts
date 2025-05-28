/**
 * Shared editor constants
 */
import type { Language } from "@/shared/types/exercise";

export const SUPPORTED_LANGUAGES: Record<Language, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
} as const;

export const DEFAULT_LANGUAGE: Language = "typescript";

export const DEFAULT_CODE_TEMPLATE = `const solve = () => {
}`;

export const MONACO_EDITOR_VERSION = "0.52.0";
export const MONACO_CDN_URL = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/min/vs`;
