/** @jest-environment node */
/* eslint-disable boundaries/element-types */
import { POST } from "@/app/api/exercises/[slug]/run-tests/route";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";

const successCode =
  "const solve = (numbers) => numbers.reduce((a,b) => a+b, 0);";

describe("POST /api/exercises/[slug]/run-tests", () => {
  it("runs tests successfully", async () => {
    const req = {
      json: async () => ({ code: successCode, language: "javascript" }),
    } as any;
    const res = await POST(req, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.results).toHaveLength(EXERCISES[0]!.testCases.length);
  });

  it("returns 404 for unknown exercise", async () => {
    const req = {
      json: async () => ({ code: successCode, language: "javascript" }),
    } as any;
    const res = await POST(req, { params: Promise.resolve({ slug: "nope" }) });
    expect(res.status).toBe(404);
  });

  it("validates request body", async () => {
    const req = { json: async () => ({}) } as any;
    const res = await POST(req, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(res.status).toBe(400);
  });

  it("transpiles TypeScript and runs tests", async () => {
    const tsCode = `const solve = (numbers: number[]): number => numbers.reduce((a, b) => a + b, 0);`;
    const req = {
      json: async () => ({ code: tsCode, language: "typescript" }),
    } as any;
    const res = await POST(req, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.results.every((r: { passed: boolean }) => r.passed)).toBe(true);
  });

  it("returns 400 for TypeScript compile errors", async () => {
    const tsErrorCode = `const solve = (numbers: number[]): number => {`;
    const req = {
      json: async () => ({ code: tsErrorCode, language: "typescript" }),
    } as any;
    const res = await POST(req, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("TS Error");
  });

  it("returns 500 when solve function is missing", async () => {
    const req = {
      json: async () => ({
        code: "const sum = (n) => n.reduce((a, b) => a + b, 0);",
        language: "javascript",
      }),
    } as any;
    const res = await POST(req, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/solve/);
  });

  it("includes errors in results when solve throws", async () => {
    const throwingCode = "const solve = () => { throw new Error('boom'); };";
    const req = {
      json: async () => ({ code: throwingCode, language: "javascript" }),
    } as any;
    const res = await POST(req, {
      params: Promise.resolve({ slug: "reduce-sum" }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.results.some((r: { passed: boolean }) => !r.passed)).toBe(true);
    expect(data.results[0].error).toMatch(/boom/);
  });
});
