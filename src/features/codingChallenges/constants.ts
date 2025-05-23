// Category color mapping for exercise listings
import type { CategoryName } from "@/features/codingChallenges/types";

export const categoryColors: Record<
  CategoryName,
  { bg: string; text: string; border: string }
> = {
  array: {
    bg: "bg-[hsl(var(--category-array-bg))]",
    text: "text-[hsl(var(--category-array-text))]",
    border: "border-[hsl(var(--category-array-border))]",
  },
  object: {
    bg: "bg-[hsl(var(--category-object-bg))]",
    text: "text-[hsl(var(--category-object-text))]",
    border: "border-[hsl(var(--category-object-border))]",
  },
  map: {
    bg: "bg-[hsl(var(--category-map-bg))]",
    text: "text-[hsl(var(--category-map-text))]",
    border: "border-[hsl(var(--category-map-border))]",
  },
  set: {
    bg: "bg-[hsl(var(--category-set-bg))]",
    text: "text-[hsl(var(--category-set-text))]",
    border: "border-[hsl(var(--category-set-border))]",
  },
};

export const KEYBOARD_SHORTCUTS = [
  { key: "\u2318/Ctrl + Enter", description: "Run Tests" },
  { key: "\u2318/Ctrl + F", description: "Toggle Fullscreen" },
  { key: "\u2318/Ctrl + 1", description: "Switch to Instructions" },
  { key: "\u2318/Ctrl + 2", description: "Switch to Test Cases" },
  { key: "Esc", description: "Exit Fullscreen" },
] as const;

export type Shortcut = (typeof KEYBOARD_SHORTCUTS)[number];
