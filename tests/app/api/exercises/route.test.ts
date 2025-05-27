/** @jest-environment node */
/* eslint-disable boundaries/element-types */
import { GET } from "@/app/api/exercises/route";
import { EXERCISE_METADATA } from "@/features/codingChallenges/data/exerciseMetadata";

describe("GET /api/exercises", () => {
  it("returns all exercises", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage");
    const responseData = await response.json();
    expect(responseData).toEqual({ exercises: EXERCISE_METADATA });
  });
});
