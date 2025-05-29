/**
 * Content parser service for exercise MDX files
 * Extracts and structures content from MDX files
 */
import type { TestCase } from "@/shared/types/exercise";

/**
 * Extracts sections from MDX content
 */
export function parseExerciseContent(content: string): {
  descriptionSource: string;
  educationSource: string;
  educationConcept: string;
  starterCode: string;
  testCases: TestCase[];
} {
  const majorSections = content.split(/^## /m);

  const descriptionSource = majorSections[0]?.trim() ?? "";

  let educationSource = "";
  let educationConcept = "";

  const educationSectionIndex = majorSections.findIndex((s) =>
    s.startsWith("Education"),
  );
  if (educationSectionIndex !== -1) {
    let educationText = "## " + (majorSections[educationSectionIndex] ?? "");

    const starterCodeIndex = content.indexOf("## Starter Code");
    if (starterCodeIndex !== -1) {
      const educationStart = content.indexOf("## Education");
      educationText = content
        .substring(educationStart, starterCodeIndex)
        .trim();
    }

    educationText = educationText.replace(/^## Education\s*\n+/, "");

    const conceptRegex = /^###\s+(.+?)(?:\n|$)/m;
    const conceptMatch = conceptRegex.exec(educationText);
    if (conceptMatch?.[1]) {
      educationConcept = conceptMatch[1];
    }

    educationSource = educationText;
  }

  const starterCodeRegex =
    /## Starter Code\s*\n+```javascript\n([\s\S]*?)\n```/;
  const starterCodeMatch = starterCodeRegex.exec(content);
  const starterCode = starterCodeMatch?.[1] ?? "";

  const testCasesSection = majorSections.find((s) =>
    s.startsWith("Test Cases"),
  );
  const testCases: TestCase[] = [];

  if (testCasesSection) {
    const testMatches = testCasesSection.matchAll(
      /### Test \d+\n\n- \*\*Input:\*\* `([^`]+)`\n- \*\*Expected:\*\* `([^`]+)`\n- \*\*Description:\*\* ([^\n]+)/g,
    );
    for (const match of testMatches) {
      if (match[1] && match[2] && match[3]) {
        testCases.push({
          id: `test-${testCases.length + 1}`,
          name: `Test ${testCases.length + 1}`,
          input: [match[1]],
          expected: match[2],
          message: match[3],
          testCode: "",
        });
      }
    }
  }

  return {
    descriptionSource,
    educationSource,
    educationConcept,
    starterCode,
    testCases,
  };
}
