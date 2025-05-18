// Category color mapping for exercise listings
import type { CategoryName } from "./types";

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
