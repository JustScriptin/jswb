/**
 * Shared category constants
 */
import type { CategoryName } from "@/shared/types/exercise";

export type { CategoryName } from "@/shared/types/exercise";

type CategoryColorConfig = {
  bg: string;
  text: string;
  border: string;
  hover: string;
  active: string;
  darkBg: string;
  darkText: string;
  darkBorder: string;
  darkHover: string;
  darkActive: string;
};

export const categoryColors: Record<CategoryName, CategoryColorConfig> = {
  arrays: {
    bg: "bg-[oklch(93%_0.237_141)]",
    text: "text-[oklch(24%_0.237_143)]",
    border: "border-[oklch(85%_0.237_141)]",
    hover: "hover:bg-[oklch(90%_0.237_141)]",
    active: "active:bg-[oklch(88%_0.237_141)]",
    darkBg: "dark:bg-[oklch(30%_0.237_143)]",
    darkText: "dark:text-[oklch(93%_0.237_141)]",
    darkBorder: "dark:border-[oklch(40%_0.237_143)]",
    darkHover: "dark:hover:bg-[oklch(35%_0.237_143)]",
    darkActive: "dark:active:bg-[oklch(25%_0.237_143)]",
  },
  objects: {
    bg: "bg-[oklch(93%_0.237_214)]",
    text: "text-[oklch(40%_0.237_226)]",
    border: "border-[oklch(87%_0.237_213)]",
    hover: "hover:bg-[oklch(90%_0.237_214)]",
    active: "active:bg-[oklch(88%_0.237_214)]",
    darkBg: "dark:bg-[oklch(30%_0.237_226)]",
    darkText: "dark:text-[oklch(93%_0.237_214)]",
    darkBorder: "dark:border-[oklch(40%_0.237_226)]",
    darkHover: "dark:hover:bg-[oklch(35%_0.237_226)]",
    darkActive: "dark:active:bg-[oklch(25%_0.237_226)]",
  },
  strings: {
    bg: "bg-[oklch(95%_0.237_269)]",
    text: "text-[oklch(39%_0.237_273)]",
    border: "border-[oklch(92%_0.237_269)]",
    hover: "hover:bg-[oklch(92%_0.237_269)]",
    active: "active:bg-[oklch(90%_0.237_269)]",
    darkBg: "dark:bg-[oklch(30%_0.237_273)]",
    darkText: "dark:text-[oklch(95%_0.237_269)]",
    darkBorder: "dark:border-[oklch(40%_0.237_273)]",
    darkHover: "dark:hover:bg-[oklch(35%_0.237_273)]",
    darkActive: "dark:active:bg-[oklch(25%_0.237_273)]",
  },
  functions: {
    bg: "bg-[oklch(92%_0.237_34)]",
    text: "text-[oklch(34%_0.237_15)]",
    border: "border-[oklch(83%_0.237_32)]",
    hover: "hover:bg-[oklch(89%_0.237_34)]",
    active: "active:bg-[oklch(87%_0.237_34)]",
    darkBg: "dark:bg-[oklch(30%_0.237_15)]",
    darkText: "dark:text-[oklch(92%_0.237_34)]",
    darkBorder: "dark:border-[oklch(40%_0.237_15)]",
    darkHover: "dark:hover:bg-[oklch(35%_0.237_15)]",
    darkActive: "dark:active:bg-[oklch(25%_0.237_15)]",
  },
  algorithms: {
    bg: "bg-[oklch(94%_0.237_180)]",
    text: "text-[oklch(35%_0.237_180)]",
    border: "border-[oklch(85%_0.237_180)]",
    hover: "hover:bg-[oklch(91%_0.237_180)]",
    active: "active:bg-[oklch(89%_0.237_180)]",
    darkBg: "dark:bg-[oklch(30%_0.237_180)]",
    darkText: "dark:text-[oklch(94%_0.237_180)]",
    darkBorder: "dark:border-[oklch(40%_0.237_180)]",
    darkHover: "dark:hover:bg-[oklch(35%_0.237_180)]",
    darkActive: "dark:active:bg-[oklch(25%_0.237_180)]",
  },
  async: {
    bg: "bg-[oklch(94%_0.237_320)]",
    text: "text-[oklch(35%_0.237_320)]",
    border: "border-[oklch(85%_0.237_320)]",
    hover: "hover:bg-[oklch(91%_0.237_320)]",
    active: "active:bg-[oklch(89%_0.237_320)]",
    darkBg: "dark:bg-[oklch(30%_0.237_320)]",
    darkText: "dark:text-[oklch(94%_0.237_320)]",
    darkBorder: "dark:border-[oklch(40%_0.237_320)]",
    darkHover: "dark:hover:bg-[oklch(35%_0.237_320)]",
    darkActive: "dark:active:bg-[oklch(25%_0.237_320)]",
  },
};

/**
 * Helper functions to get category colors in different formats
 */
export function getCategoryColorClasses(
  category: CategoryName,
  darkMode = false,
): string {
  const colors = categoryColors[category];
  if (darkMode) {
    return `${colors.darkBg} ${colors.darkText} ${colors.darkBorder}`;
  }
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

export function getCategoryHoverClasses(
  category: CategoryName,
  darkMode = false,
): string {
  const colors = categoryColors[category];
  if (darkMode) {
    return colors.darkHover;
  }
  return colors.hover;
}

export function getCategoryActiveClasses(
  category: CategoryName,
  darkMode = false,
): string {
  const colors = categoryColors[category];
  if (darkMode) {
    return colors.darkActive;
  }
  return colors.active;
}

export function getCategoryInteractiveClasses(category: CategoryName): string {
  const colors = categoryColors[category];
  return `${colors.bg} ${colors.text} ${colors.border} ${colors.hover} ${colors.active} 
          ${colors.darkBg} ${colors.darkText} ${colors.darkBorder} ${colors.darkHover} ${colors.darkActive}`;
}

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
