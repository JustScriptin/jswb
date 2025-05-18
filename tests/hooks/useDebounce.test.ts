import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      {
        initialProps: { value: "a" },
      },
    );

    expect(result.current).toBe("a");

    rerender({ value: "b" });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    // still old value
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("b");
  });
});
