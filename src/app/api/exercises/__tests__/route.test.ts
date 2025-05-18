/** @jest-environment node */
/* eslint-disable boundaries/element-types */
import { GET } from "../route"
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData"

describe("GET /api/exercises", () => {
  it("returns all exercises", async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    expect(res.headers.get("Cache-Control")).toContain("s-maxage")
    const data = await res.json()
    expect(data).toEqual({ exercises: EXERCISES })
  })
})
