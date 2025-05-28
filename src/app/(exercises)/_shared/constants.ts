// Category color mapping for exercise listings
import type { CategoryName } from "@/shared/types/exercise";

type CategoryColorConfig = {
  bg: string;
  text: string;
  border: string;
};

// Ensure all CategoryName values have corresponding colors
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
    bg: "bg-[oklch(92%_0.237_180)]",
    text: "text-[oklch(34%_0.237_180)]",
    border: "border-[oklch(83%_0.237_180)]",
  },
  async: {
    bg: "bg-[oklch(92%_0.237_300)]",
    text: "text-[oklch(34%_0.237_300)]",
    border: "border-[oklch(83%_0.237_300)]",
  },
} satisfies Record<CategoryName, CategoryColorConfig>;

// Compile-time check to ensure all categories have colors
const _exhaustiveCheck: Record<CategoryName, CategoryColorConfig> =
  categoryColors;

export { KEYBOARD_SHORTCUTS, type Shortcut } from "@/shared/constants/keyboard";
export {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  DEFAULT_CODE_TEMPLATE,
  MONACO_CDN_URL,
  MONACO_EDITOR_VERSION,
} from "@/shared/constants/editor";
