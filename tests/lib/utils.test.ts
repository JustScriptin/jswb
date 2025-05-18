import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("dedupes tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
