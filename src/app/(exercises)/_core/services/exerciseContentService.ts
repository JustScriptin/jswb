import { logger } from "@/platform/node/logger";
import type { ExerciseMDXContent } from "@/shared/types/services";
import {
  loadExerciseContent,
  getAllExerciseSlugs as getExerciseSlugs,
} from "./content/contentLoader";
import { parseExerciseContent } from "./content/contentParser";
import { compileMdxContent } from "./content/mdxCompiler";

/**
 * Gets the compiled MDX content for an exercise
 */
export async function getExerciseContent(
  slug: string,
): Promise<ExerciseMDXContent | null> {
  try {
    const rawContent = await loadExerciseContent(slug);
    if (!rawContent) {
      return null;
    }

    const { content, frontmatter } = rawContent;

    const {
      descriptionSource,
      educationSource,
      educationConcept,
      starterCode,
      testCases,
    } = parseExerciseContent(content);

    // Compile MDX content using our mdxCompiler service
    const descriptionContent = await compileMdxContent(descriptionSource);
    const educationContent = await compileMdxContent(educationSource);

    return {
      frontmatter: frontmatter as ExerciseMDXContent["frontmatter"],
      descriptionContent,
      educationContent,
      educationConcept: educationConcept ?? frontmatter.title,
      starterCode,
      testCases: testCases.map((test) => ({
        input:
          Array.isArray(test.input) && test.input.length > 0
            ? (test.input[0] as string)
            : "",
        expected: (test.expected as string) ?? "",
        description: test.message ?? "",
      })),
    };
  } catch (error) {
    logger.error(`Error loading exercise content for ${slug}:`, error);
    return null;
  }
}

/**
 * Gets all available exercise slugs
 */
export async function getAllExerciseSlugs(): Promise<string[]> {
  return getExerciseSlugs();
}
