/**
 * Shared category constants
 */
import type { CategoryName } from "@/shared/types/exercise";

export type { CategoryName } from "@/shared/types/exercise";

type CategoryColorConfig = {
  bg: string;
  text: string;
  border: string;
};

export const categoryColors: Record<CategoryName, CategoryColorConfig> = {
  arrays: {
    bg: "bg-[oklch(93%_0.237_141)]",
    text: "text-[oklch(24%_0.237_143)]",
    border: "border-[oklch(85%_0.237_141)]",
  },
  objects: {
    bg: "bg-[oklch(93%_0.237_214)]",
    text: "text-[oklch(40%_0.237_226)]",
    border: "border-[oklch(87%_0.237_213)]",
  },
  strings: {
    bg: "bg-[oklch(95%_0.237_269)]",
    text: "text-[oklch(39%_0.237_273)]",
    border: "border-[oklch(92%_0.237_269)]",
  },
  functions: {
    bg: "bg-[oklch(92%_0.237_34)]",
    text: "text-[oklch(34%_0.237_15)]",
    border: "border-[oklch(83%_0.237_32)]",
  },
  algorithms: {
    bg: "bg-[oklch(94%_0.237_180)]",
    text: "text-[oklch(35%_0.237_180)]",
    border: "border-[oklch(85%_0.237_180)]",
  },
  async: {
    bg: "bg-[oklch(94%_0.237_320)]",
    text: "text-[oklch(35%_0.237_320)]",
    border: "border-[oklch(85%_0.237_320)]",
  },
};

export const CATEGORY_METHODS: Record<CategoryName, string[]> = {
  arrays: [
    "map()",
    "filter()",
    "reduce()",
    "forEach()",
    "find()",
    "some()",
    "every()",
    "includes()",
  ],
  strings: [
    "split()",
    "slice()",
    "substring()",
    "replace()",
    "match()",
    "trim()",
    "toLowerCase()",
    "toUpperCase()",
  ],
  objects: [
    "Object.keys()",
    "Object.values()",
    "Object.entries()",
    "Object.assign()",
    "Object.freeze()",
    "Object.seal()",
  ],
  functions: [
    "bind()",
    "call()",
    "apply()",
    "closures",
    "arrow functions",
    "higher-order functions",
  ],
  algorithms: [
    "sorting",
    "searching",
    "recursion",
    "dynamic programming",
    "greedy algorithms",
  ],
  async: [
    "Promises",
    "async/await",
    "setTimeout()",
    "fetch()",
    "event loop",
    "callbacks",
  ],
};
