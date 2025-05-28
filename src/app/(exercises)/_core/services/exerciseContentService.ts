import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/shared/lib/mdx-components";
import { logger } from "@/platform/node/logger";
import type { ExerciseMDXContent } from "@/shared/types/services";

export async function getExerciseContent(
  slug: string,
): Promise<ExerciseMDXContent | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "exercises",
      `${slug}.mdx`,
    );
    const fileContent = await fs.readFile(filePath, "utf-8");

    const { data: frontmatter, content } = matter(fileContent);

    // Split content into major sections based on ## headings
    const majorSections = content.split(/^## /m);

    // Extract description (everything before first ## heading)
    const descriptionSource = majorSections[0]?.trim() ?? "";

    // Find and extract the Education section
    let educationSource = "";
    let educationConcept = "";

    const educationSectionIndex = majorSections.findIndex((s) =>
      s.startsWith("Education"),
    );
    if (educationSectionIndex !== -1) {
      // Get everything from Education section until the next major section
      let educationText = "## " + (majorSections[educationSectionIndex] ?? "");

      // Find where the next major section starts (Starter Code)
      const starterCodeIndex = content.indexOf("## Starter Code");
      if (starterCodeIndex !== -1) {
        const educationStart = content.indexOf("## Education");
        educationText = content
          .substring(educationStart, starterCodeIndex)
          .trim();
      }

      // Remove the ## Education heading
      educationText = educationText.replace(/^## Education\s*\n+/, "");

      // Extract the first ### heading as the concept
      const conceptRegex = /^###\s+(.+?)(?:\n|$)/m;
      const conceptMatch = conceptRegex.exec(educationText);
      if (conceptMatch?.[1]) {
        educationConcept = conceptMatch[1];
      }

      educationSource = educationText;
    }

    // Extract starter code
    const starterCodeRegex =
      /## Starter Code\s*\n+```javascript\n([\s\S]*?)\n```/;
    const starterCodeMatch = starterCodeRegex.exec(content);
    const starterCode = starterCodeMatch?.[1] ?? "";

    // Extract test cases
    const testCasesSection = majorSections.find((s) =>
      s.startsWith("Test Cases"),
    );
    const testCases: ExerciseMDXContent["testCases"] = [];

    if (testCasesSection) {
      const testMatches = testCasesSection.matchAll(
        /### Test \d+\n\n- \*\*Input:\*\* `([^`]+)`\n- \*\*Expected:\*\* `([^`]+)`\n- \*\*Description:\*\* ([^\n]+)/g,
      );
      for (const match of testMatches) {
        if (match[1] && match[2] && match[3]) {
          testCases.push({
            input: match[1],
            expected: match[2],
            description: match[3],
          });
        }
      }
    }

    // Compile MDX content using RSC version with custom components
    const { content: descriptionContent } = await compileMDX({
      source: descriptionSource,
      options: {
        parseFrontmatter: false,
      },
      components: MDXComponents,
    });

    const { content: educationContent } = await compileMDX({
      source: educationSource,
      options: {
        parseFrontmatter: false,
      },
      components: MDXComponents,
    });

    return {
      frontmatter: frontmatter as ExerciseMDXContent["frontmatter"],
      descriptionContent,
      educationContent,
      educationConcept: educationConcept ?? frontmatter.title,
      starterCode,
      testCases,
    };
  } catch (error) {
    logger.error(`Error loading exercise content for ${slug}:`, error);
    return null;
  }
}

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
