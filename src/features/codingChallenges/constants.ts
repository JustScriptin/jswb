// Category color mapping for exercise listings
import type { CategoryName } from "./types";

export const categoryColors: Record<
  CategoryName,
  { bg: string; text: string; border: string }
> = {
  array: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  object: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  map: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  set: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-200",
  },
};
