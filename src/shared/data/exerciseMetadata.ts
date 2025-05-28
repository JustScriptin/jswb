import type { Exercise, CategoryName } from "@/shared/types/exercise";

// Exercise metadata without markdown content
// The actual content is stored in MDX files at content/exercises/[slug].mdx
export const EXERCISE_METADATA: Omit<
  Exercise,
  "description" | "education" | "id" | "tags" | "difficulty"
>[] = [
  {
    slug: "reduce-sum",
    title: "Sum Numbers with reduce()",
    category: "arrays" as CategoryName,
    starterCode: `const solve = (numbers) => {
  // Use array.reduce(...) here.
  // Provide 0 as initialValue, add each number to the accumulator, and return it.
  return 0; // Replace with your logic
}`,
    testCases: [
      {
        id: "reduce-sum-1",
        name: "Basic sum",
        testCode: "expect(solve([1, 2, 3])).toBe(6)",
        expectedOutput: "6",
      },
      {
        id: "reduce-sum-2",
        name: "Larger numbers",
        testCode: "expect(solve([5, 10, 15, 20])).toBe(50)",
        expectedOutput: "50",
      },
      {
        id: "reduce-sum-3",
        name: "Empty array",
        testCode: "expect(solve([])).toBe(0)",
        expectedOutput: "0",
      },
      {
        id: "reduce-sum-4",
        name: "Single element",
        testCode: "expect(solve([42])).toBe(42)",
        expectedOutput: "42",
      },
      {
        id: "reduce-sum-5",
        name: "Positive and negative",
        testCode: "expect(solve([-1, 1, -2, 2])).toBe(0)",
        expectedOutput: "0",
      },
    ],
  },
  {
    slug: "reduce-max",
    title: "Find Maximum with reduce()",
    category: "arrays" as CategoryName,
    starterCode: `const solve = (numbers) => {
  // Handle empty array case first
  if (numbers.length === 0) return null;
  
  // Use reduce to find maximum
  return numbers[0]; // Replace with your logic
}`,
    testCases: [
      {
        id: "reduce-max-1",
        name: "Find maximum",
        testCode: "expect(solve([5, 2, 9, 1])).toBe(9)",
        expectedOutput: "9",
      },
      {
        id: "reduce-max-2",
        name: "Ascending order",
        testCode: "expect(solve([1, 2, 3, 4, 5])).toBe(5)",
        expectedOutput: "5",
      },
      {
        id: "reduce-max-3",
        name: "Empty array",
        testCode: "expect(solve([])).toBe(null)",
        expectedOutput: "null",
      },
      {
        id: "reduce-max-4",
        name: "Single element",
        testCode: "expect(solve([42])).toBe(42)",
        expectedOutput: "42",
      },
      {
        id: "reduce-max-5",
        name: "Negative values",
        testCode: "expect(solve([-5, -2, -10])).toBe(-2)",
        expectedOutput: "-2",
      },
    ],
  },
  {
    slug: "reduce-count",
    title: "Count Occurrences with reduce()",
    category: "arrays" as CategoryName,
    starterCode: `const solve = (items) => {
  // Use reduce to build an object of counts
  // Start with {} as initialValue
  return {}; // Replace with your logic
}`,
    testCases: [
      {
        id: "reduce-count-1",
        name: "Multiple items",
        testCode:
          "expect(solve(['a', 'b', 'a', 'c', 'b', 'a'])).toEqual({ a: 3, b: 2, c: 1 })",
        expectedOutput: "{ a: 3, b: 2, c: 1 }",
      },
      {
        id: "reduce-count-2",
        name: "Repeated items",
        testCode: "expect(solve(['x', 'x', 'x'])).toEqual({ x: 3 })",
        expectedOutput: "{ x: 3 }",
      },
      {
        id: "reduce-count-3",
        name: "Empty array",
        testCode: "expect(solve([])).toEqual({})",
        expectedOutput: "{}",
      },
      {
        id: "reduce-count-4",
        name: "Single item",
        testCode: "expect(solve(['unique'])).toEqual({ unique: 1 })",
        expectedOutput: "{ unique: 1 }",
      },
      {
        id: "reduce-count-5",
        name: "Numeric values",
        testCode: "expect(solve([1, 1, 2])).toEqual({ '1': 2, '2': 1 })",
        expectedOutput: "{ '1': 2, '2': 1 }",
      },
    ],
  },
  {
    slug: "filter-even",
    title: "Filter Even Numbers",
    category: "arrays" as CategoryName,
    starterCode: `const solve = (numbers) => {
  // Return only even numbers
  return []; // Replace with your logic
}`,
    testCases: [
      {
        id: "filter-even-1",
        name: "Basic filtering",
        testCode: "expect(solve([1, 2, 3, 4])).toEqual([2, 4])",
        expectedOutput: "[2, 4]",
      },
      {
        id: "filter-even-2",
        name: "No even numbers",
        testCode: "expect(solve([5, 7, 9])).toEqual([])",
        expectedOutput: "[]",
      },
      {
        id: "filter-even-3",
        name: "Negative numbers",
        testCode: "expect(solve([-2, -1, 0])).toEqual([-2, 0])",
        expectedOutput: "[-2, 0]",
      },
      {
        id: "filter-even-4",
        name: "Zero as even",
        testCode: "expect(solve([0, 1])).toEqual([0])",
        expectedOutput: "[0]",
      },
    ],
  },
  {
    slug: "map-square",
    title: "Square Numbers with map()",
    category: "arrays" as CategoryName,
    starterCode: `const solve = (numbers) => {
  // Return a new array of squared numbers
  return []; // Replace with your logic
}`,
    testCases: [
      {
        id: "map-square-1",
        name: "Basic squaring",
        testCode: "expect(solve([1, 2, 3])).toEqual([1, 4, 9])",
        expectedOutput: "[1, 4, 9]",
      },
      {
        id: "map-square-2",
        name: "Negatives and zero",
        testCode: "expect(solve([-1, 0, 2])).toEqual([1, 0, 4])",
        expectedOutput: "[1, 0, 4]",
      },
      {
        id: "map-square-3",
        name: "Zero and positives",
        testCode: "expect(solve([0, 5])).toEqual([0, 25])",
        expectedOutput: "[0, 25]",
      },
      {
        id: "map-square-4",
        name: "Empty array",
        testCode: "expect(solve([])).toEqual([])",
        expectedOutput: "[]",
      },
    ],
  },
  {
    slug: "foreach-sum",
    title: "Sum with forEach()",
    category: "arrays" as CategoryName,
    starterCode: `const solve = (numbers) => {
  // Sum numbers using forEach
  return 0; // Replace with your logic
}`,
    testCases: [
      {
        id: "foreach-sum-1",
        name: "Basic sum",
        testCode: "expect(solve([1, 2, 3])).toBe(6)",
        expectedOutput: "6",
      },
      {
        id: "foreach-sum-2",
        name: "Empty array",
        testCode: "expect(solve([])).toBe(0)",
        expectedOutput: "0",
      },
      {
        id: "foreach-sum-3",
        name: "Negatives",
        testCode: "expect(solve([-1, 1])).toBe(0)",
        expectedOutput: "0",
      },
    ],
  },
  {
    slug: "object-keys",
    title: "Get Object Keys",
    category: "objects" as CategoryName,
    starterCode: `const solve = (obj) => {
  // Return array of keys
  return []; // Replace with your logic
}`,
    testCases: [
      {
        id: "object-keys-1",
        name: "Multiple keys",
        testCode: "expect(solve({ a: 1, b: 2 })).toEqual(['a', 'b'])",
        expectedOutput: "['a', 'b']",
      },
      {
        id: "object-keys-2",
        name: "Empty object",
        testCode: "expect(solve({})).toEqual([])",
        expectedOutput: "[]",
      },
      {
        id: "object-keys-3",
        name: "Single key",
        testCode: "expect(solve({ foo: 42 })).toEqual(['foo'])",
        expectedOutput: "['foo']",
      },
    ],
  },
];
