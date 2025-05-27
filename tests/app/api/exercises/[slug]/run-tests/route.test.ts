/** @jest-environment node */
/* eslint-disable boundaries/element-types */
import { POST } from "@/app/api/exercises/[slug]/run-tests/route";
import { EXERCISE_METADATA } from "@/features/codingChallenges/data/exerciseMetadata";

const successCode =
  "const solve = (numbers) => numbers.reduce((a,b) => a+b, 0);";

describe("POST /api/exercises/[slug]/run-tests", () => {
  it("runs tests successfully", async () => {
    const request = {
      json: async () => ({ code: successCode, language: "javascript" }),
    } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData.results).toHaveLength(
      EXERCISE_METADATA[0]!.testCases.length,
    );
  });

  it("returns 404 for unknown exercise", async () => {
    const request = {
      json: async () => ({ code: successCode, language: "javascript" }),
    } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "nope" }),
    });
    expect(response.status).toBe(404);
  });

  it("validates request body", async () => {
    const request = { json: async () => ({}) } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(response.status).toBe(400);
  });

  it("transpiles TypeScript and runs tests", async () => {
    const tsCode = `const solve = (numbers: number[]): number => numbers.reduce((a, b) => a + b, 0);`;
    const request = {
      json: async () => ({ code: tsCode, language: "typescript" }),
    } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(
      responseData.results.every(
        (result: { passed: boolean }) => result.passed,
      ),
    ).toBe(true);
  });

  it("returns 400 for TypeScript compile errors", async () => {
    const tsErrorCode = `const solve = (numbers: number[]): number => {`;
    const request = {
      json: async () => ({ code: tsErrorCode, language: "typescript" }),
    } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData.error).toContain("TS Error");
  });

  it("returns 500 when solve function is missing", async () => {
    const request = {
      json: async () => ({
        code: "const sum = (n) => n.reduce((a, b) => a + b, 0);",
        language: "javascript",
      }),
    } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toMatch(/solve/);
  });

  it("includes errors in results when solve throws", async () => {
    const throwingCode = "const solve = () => { throw new Error('boom'); };";
    const request = {
      json: async () => ({ code: throwingCode, language: "javascript" }),
    } as any;
    const response = await POST(request, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(
      responseData.results.some(
        (result: { passed: boolean }) => !result.passed,
      ),
    ).toBe(true);
    expect(responseData.results[0].error).toMatch(/boom/);
  });
});
