/** @jest-environment node */
import { runIsolatedTests } from "@/features/codingChallenges/lib/runIsolatedTests";
import type { TestCase } from "@/features/codingChallenges/types";

const testCases: TestCase[] = [
  { input: [[1, 2, 3]], expected: 6, message: "adds numbers" },
];

describe("runIsolatedTests", () => {
  it("runs tests successfully", async () => {
    const code = "const solve = (nums) => nums.reduce((a,b) => a + b, 0);";
    const result = await runIsolatedTests({ code, testCases });
    expect(result).toEqual({
      success: true,
      results: [{ passed: true, message: "adds numbers" }],
    });
  });

  it("returns error when solve function is missing", async () => {
    const code = "const sum = (nums) => nums.reduce((a,b) => a + b, 0);";
    const result = await runIsolatedTests({ code, testCases });
    expect(result.success).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result.error).toMatch(/solve/);
  });

  it("returns error for invalid code", async () => {
    const code = "const solve = (n => n;";
    const result = await runIsolatedTests({ code, testCases });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/SyntaxError/);
  });

  it("captures errors thrown by solve", async () => {
    const code = "const solve = () => { throw new Error('boom'); };";
    const result = await runIsolatedTests({ code, testCases });
    expect(result.success).toBe(true);
    expect(result.results[0].passed).toBe(false);
    expect(result.results[0].error).toMatch(/boom/);
  });
});
