/**
 * Content loader service for exercise MDX files
 * Handles file reading and MDX compilation
 */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { logger } from "@/platform/node/logger";

/**
 * Loads the raw MDX content for an exercise by slug
 */
export async function loadExerciseContent(slug: string): Promise<{
  content: string;
  frontmatter: Record<string, unknown>;
} | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "exercises",
      `${slug}.mdx`,
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);

    return { content, frontmatter };
  } catch (error) {
    logger.error(`Error loading exercise content for ${slug}:`, error);
    return null;
  }
}

/**
 * Gets all available exercise slugs from the content directory
 */
export async function getAllExerciseSlugs(): Promise<string[]> {
  try {
    const exercisesDir = path.join(process.cwd(), "content", "exercises");
    const files = await fs.readdir(exercisesDir);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    logger.error("Error getting exercise slugs:", error);
    return [];
  }
}
