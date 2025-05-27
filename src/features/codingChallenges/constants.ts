// Category color mapping for exercise listings
import type { CategoryName, Language } from "@/features/codingChallenges/types";

type CategoryColorConfig = {
  bg: string;
  text: string;
  border: string;
};

// Ensure all CategoryName values have corresponding colors
export const categoryColors: Record<CategoryName, CategoryColorConfig> = {
  array: {
    bg: "bg-[oklch(93%_0.237_141)]",
    text: "text-[oklch(24%_0.237_143)]",
    border: "border-[oklch(85%_0.237_141)]",
  },
  object: {
    bg: "bg-[oklch(93%_0.237_214)]",
    text: "text-[oklch(40%_0.237_226)]",
    border: "border-[oklch(87%_0.237_213)]",
  },
  map: {
    bg: "bg-[oklch(95%_0.237_269)]",
    text: "text-[oklch(39%_0.237_273)]",
    border: "border-[oklch(92%_0.237_269)]",
  },
  set: {
    bg: "bg-[oklch(92%_0.237_34)]",
    text: "text-[oklch(34%_0.237_15)]",
    border: "border-[oklch(83%_0.237_32)]",
  },
} satisfies Record<CategoryName, CategoryColorConfig>;

// Compile-time check to ensure all categories have colors
const _exhaustiveCheck: Record<CategoryName, CategoryColorConfig> =
  categoryColors;

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
  // Write your solution here
}`;

export const MONACO_EDITOR_VERSION = "0.52.0";
export const MONACO_CDN_URL = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/min/vs`;
