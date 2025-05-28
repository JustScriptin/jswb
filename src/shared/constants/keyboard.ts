/**
 * Shared keyboard shortcut constants
 */
import type { Language } from "@/shared/types/exercise";

export const KEYBOARD_SHORTCUTS = [
  { key: "\u2318/Ctrl + Enter", description: "Run Tests" },
  { key: "\u2318/Ctrl + F", description: "Toggle Fullscreen" },
  { key: "\u2318/Ctrl + 1", description: "Switch to Instructions" },
  { key: "\u2318/Ctrl + 2", description: "Switch to Test Cases" },
  { key: "Esc", description: "Exit Fullscreen" },
] as const;

export type Shortcut = (typeof KEYBOARD_SHORTCUTS)[number];

export const SUPPORTED_LANGUAGES: Record<Language, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
} as const;

export const DEFAULT_LANGUAGE: Language = "typescript";

export const DEFAULT_CODE_TEMPLATE = `const solve = () => {
}`;

export const MONACO_EDITOR_VERSION = "0.52.0";
export const MONACO_CDN_URL = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/min/vs`;
