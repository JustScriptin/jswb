import type { TestCase as SharedTestCase } from "@/shared/types/exercise";
import type { TestCase as PlatformTestCase } from "@/platform/types/exercise";
import { nodeLogger as logger } from "@/platform";

/**
 * Converts the new shared TestCase format to the platform TestCase format
 * needed by the isolated VM runner
 */
export function adaptTestCasesToPlatform(
  testCases: SharedTestCase[],
): PlatformTestCase[] {
  logger.info(
    "[adaptTestCasesToPlatform] Processing test cases:",
    testCases.length,
  );

  return testCases.map((testCase, index) => {
    logger.info(
      `[adaptTestCasesToPlatform] Processing test case #${index + 1}:`,
      testCase.name,
    );
    logger.info(`[adaptTestCasesToPlatform] Test code:`, testCase.testCode);

    const inputRegex = /solve\((.*?)\)/;
    const expectedRegex = /to(?:Be|Equal)\((.*?)\)/;

    const inputMatch = inputRegex.exec(testCase.testCode);
    const expectedMatch = expectedRegex.exec(testCase.testCode);

    logger.info(`[adaptTestCasesToPlatform] Input match:`, inputMatch?.[1]);
    logger.info(
      `[adaptTestCasesToPlatform] Expected match:`,
      expectedMatch?.[1],
    );

    const inputStr = inputMatch?.[1] ?? "[]";
    const expectedStr = expectedMatch?.[1] ?? testCase.expectedOutput;

    logger.info(
      `[adaptTestCasesToPlatform] Final expected string:`,
      expectedStr,
    );

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
      logger.info(`[adaptTestCasesToPlatform] Parsed input:`, input);
    } catch (error) {
      logger.info(`[adaptTestCasesToPlatform] Error parsing input:`, error);
      input = [inputStr]; // Fallback to treating the whole string as a single input
      logger.info(`[adaptTestCasesToPlatform] Using fallback input:`, input);
    }

    let expected: unknown;
    try {
      expected = JSON.parse(expectedStr ?? "null");
      logger.info(`[adaptTestCasesToPlatform] Parsed expected:`, expected);
    } catch (error) {
      logger.info(`[adaptTestCasesToPlatform] Error parsing expected:`, error);
      expected = expectedStr ?? ""; // Fallback to using the raw string
      logger.info(
        `[adaptTestCasesToPlatform] Using fallback expected:`,
        expected,
      );
    }

    if (typeof expected === "string") {
      const numericExpected = Number(expected);
      if (!isNaN(numericExpected)) {
        logger.info(
          `[adaptTestCasesToPlatform] Converting string to number:`,
          expected,
          "->",
          numericExpected,
        );
        expected = numericExpected;
      }
    }

    const result = {
      input,
      expected,
      message: testCase.name,
    };

    logger.info(`[adaptTestCasesToPlatform] Final test case:`, result);
    return result;
  });
}
