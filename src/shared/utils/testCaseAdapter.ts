import type { TestCase as SharedTestCase } from "@/shared/types/exercise";
import type { TestCase as PlatformTestCase } from "@/platform/types/exercise";

/**
 * Converts the new shared TestCase format to the platform TestCase format
 * needed by the isolated VM runner
 */
export function adaptTestCasesToPlatform(
  testCases: SharedTestCase[],
): PlatformTestCase[] {
  return testCases.map((testCase) => {
    const inputRegex = /solve\((.*?)\)/;
    const expectedRegex = /toEqual\((.*?)\)/;

    const inputMatch = inputRegex.exec(testCase.testCode);
    const expectedMatch = expectedRegex.exec(testCase.testCode);

    const inputStr = inputMatch?.[1] ?? "[]";
    const expectedStr = expectedMatch?.[1] ?? "undefined";

    let input: unknown[];
    try {
      if (inputStr.trim().startsWith("[") && inputStr.trim().endsWith("]")) {
        input = JSON.parse(inputStr);
      } else {
        input = inputStr.split(",").map((item) => {
          try {
            return JSON.parse(item.trim());
          } catch {
            return item.trim();
          }
        });
      }
    } catch {
      input = [inputStr]; // Fallback to treating the whole string as a single input
    }

    let expected: unknown;
    try {
      expected = JSON.parse(expectedStr);
    } catch {
      expected = expectedStr; // Fallback to using the raw string
    }

    return {
      input,
      expected,
      message: testCase.name,
    };
  });
}
