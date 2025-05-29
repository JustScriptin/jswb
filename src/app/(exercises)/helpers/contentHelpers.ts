/**
 * Helper functions for content management
 * Bridges between UI components and _core services
 */
import { getExerciseContent, getAllExerciseSlugs } from "../_core/services";
import type { ExerciseMDXContent } from "@/shared/types/services";

/**
 * Gets the content for an exercise by slug
 */
export async function getExerciseContentBySlug(
  slug: string,
): Promise<ExerciseMDXContent | null> {
  return getExerciseContent(slug);
}

/**
 * Gets all available exercise slugs
 */
export async function getAllExercises(): Promise<string[]> {
  return getAllExerciseSlugs();
}
