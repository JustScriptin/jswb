import type { CategoryName } from "@/shared/types/exercise";

/**
 * Adapter to handle the transition from object-based categories to string-based categories
 * This helps components that still expect the old format with name and method properties
 */
export function getCategoryObject(category: CategoryName) {
  const methodMap: Record<CategoryName, string> = {
    arrays: "array methods",
    strings: "string methods",
    objects: "object methods",
    functions: "function techniques",
    algorithms: "algorithms",
    async: "async patterns",
  };

  // Return a proper CategoryObject with name, label and color properties
  return {
    name: category,
    label: methodMap[category] || category,
    color: category, // Color will be determined by the component based on category name
  };
}
