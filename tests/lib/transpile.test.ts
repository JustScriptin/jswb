import { transpile } from "@/features/codingChallenges/lib/transpile";

describe("transpile", () => {
  it("returns original code for javascript", () => {
    const code = "const a = 1;";
    expect(transpile(code, "javascript")).toEqual({ code });
  });

  it("transpiles TypeScript to JavaScript", () => {
    const tsCode = "const add = (a: number, b: number): number => a + b;";
    const result = transpile(tsCode, "typescript");
    expect("code" in result).toBe(true);
    if ("code" in result) {
      expect(result.code).toContain("const add = (a, b) => a + b;");
    }
  });

  it("returns error for invalid TypeScript", () => {
    const badCode = "const add = (a: number): number => {";
    const result = transpile(badCode, "typescript");
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toContain("TS Error");
    }
  });
});
