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
});
