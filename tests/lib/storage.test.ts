import { getLocalStorageValue, setLocalStorageValue } from "@/lib/storage";

beforeEach(() => {
  localStorage.clear();
});

describe("getLocalStorageValue", () => {
  it("returns default when window is undefined", () => {
    const originalWindow = global.window;
    // @ts-expect-error temporary remove window
    delete global.window;
    const result = getLocalStorageValue("missing", 42);
    global.window = originalWindow;
    expect(result).toBe(42);
  });

  it("retrieves stored value", () => {
    localStorage.setItem("foo", JSON.stringify(5));
    expect(getLocalStorageValue("foo", 0)).toBe(5);
  });
});

describe("setLocalStorageValue", () => {
  it("saves value to localStorage", () => {
    setLocalStorageValue("bar", { a: 1 });
    expect(JSON.parse(localStorage.getItem("bar") ?? "{}")).toEqual({ a: 1 });
  });
});
