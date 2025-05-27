import type { Exercise } from "@/features/codingChallenges/types";

// Exercise metadata without markdown content
// The actual content is stored in MDX files at content/exercises/[slug].mdx
export const EXERCISE_METADATA: Omit<Exercise, "description" | "education">[] =
  [
    {
      slug: "reduce-sum",
      title: "Sum Numbers with reduce()",
      category: {
        name: "array",
        method: "reduce",
      },
      starterCode: `const solve = (numbers) => {
  // Use array.reduce(...) here.
  // Provide 0 as initialValue, add each number to the accumulator, and return it.
  return 0; // Replace with your logic
}`,
      testCases: [
        {
          input: [[1, 2, 3]],
          expected: 6,
          message: "Should add `[1, 2, 3]` to get `6`",
        },
        {
          input: [[5, 10, 15, 20]],
          expected: 50,
          message: "Should add `[5, 10, 15, 20]` to get `50`",
        },
        {
          input: [[]],
          expected: 0,
          message: "Should return `0` for an empty array",
        },
        {
          input: [[42]],
          expected: 42,
          message: "Should return `42` for array `[42]`",
        },
        {
          input: [[-1, 1, -2, 2]],
          expected: 0,
          message: "Should sum positive and negative numbers",
        },
      ],
    },
    {
      slug: "reduce-max",
      title: "Find Maximum with reduce()",
      category: {
        name: "array",
        method: "reduce",
      },
      starterCode: `const solve = (numbers) => {
  // Handle empty array case first
  if (numbers.length === 0) return null;
  
  // Use reduce to find maximum
  return numbers[0]; // Replace with your logic
}`,
      testCases: [
        {
          input: [[5, 2, 9, 1]],
          expected: 9,
          message: "Should find maximum `9` in `[5, 2, 9, 1]`",
        },
        {
          input: [[1, 2, 3, 4, 5]],
          expected: 5,
          message: "Should find maximum `5` in `[1, 2, 3, 4, 5]`",
        },
        {
          input: [[]],
          expected: null,
          message: "Should return `null` for empty array `[]`",
        },
        {
          input: [[42]],
          expected: 42,
          message: "Should return `42` for single-element array `[42]`",
        },
        {
          input: [[-5, -2, -10]],
          expected: -2,
          message: "Should handle all negative values",
        },
      ],
    },
    {
      slug: "reduce-count",
      title: "Count Occurrences with reduce()",
      category: {
        name: "array",
        method: "reduce",
      },
      starterCode: `const solve = (items) => {
  // Use reduce to build an object of counts
  // Start with {} as initialValue
  return {}; // Replace with your logic
}`,
      testCases: [
        {
          input: [["a", "b", "a", "c", "b", "a"]],
          expected: { a: 3, b: 2, c: 1 },
          message: "Should count `a: 3`, `b: 2`, `c: 1` correctly",
        },
        {
          input: [["x", "x", "x"]],
          expected: { x: 3 },
          message: "Should count three `x`s as `{ x: 3 }`",
        },
        {
          input: [[]],
          expected: {},
          message: "Should return empty object `{}` for empty array",
        },
        {
          input: [["unique"]],
          expected: { unique: 1 },
          message: "Should count single item as `{ unique: 1 }`",
        },
        {
          input: [[1, 1, 2]],
          expected: { 1: 2, 2: 1 },
          message: "Should count numeric values",
        },
      ],
    },
    {
      slug: "filter-even",
      title: "Filter Even Numbers",
      category: {
        name: "array",
        method: "filter",
      },
      starterCode: `const solve = (numbers) => {
  // Return only even numbers
  return []; // Replace with your logic
}`,
      testCases: [
        {
          input: [[1, 2, 3, 4]],
          expected: [2, 4],
          message: "Should return [2, 4]",
        },
        {
          input: [[5, 7, 9]],
          expected: [],
          message: "Should return empty array when no evens",
        },
        {
          input: [[-2, -1, 0]],
          expected: [-2, 0],
          message: "Should handle negative numbers",
        },
        {
          input: [[0, 1]],
          expected: [0],
          message: "Should include zero",
        },
      ],
    },
    {
      slug: "map-square",
      title: "Square Numbers with map()",
      category: {
        name: "array",
        method: "map",
      },
      starterCode: `const solve = (numbers) => {
  // Return a new array of squared numbers
  return []; // Replace with your logic
}`,
      testCases: [
        {
          input: [[1, 2, 3]],
          expected: [1, 4, 9],
          message: "Should square each number",
        },
        {
          input: [[-1, 0, 2]],
          expected: [1, 0, 4],
          message: "Should handle negatives and zero",
        },
        {
          input: [[0, 5]],
          expected: [0, 25],
          message: "Should square zero and positives",
        },
        { input: [[]], expected: [], message: "Should handle empty arrays" },
      ],
    },
    {
      slug: "foreach-sum",
      title: "Sum with forEach()",
      category: {
        name: "array",
        method: "forEach",
      },
      starterCode: `const solve = (numbers) => {
  // Sum numbers using forEach
  return 0; // Replace with your logic
}`,
      testCases: [
        { input: [[1, 2, 3]], expected: 6, message: "Should sum 1,2,3 to 6" },
        {
          input: [[]],
          expected: 0,
          message: "Should return 0 for empty array",
        },
        { input: [[-1, 1]], expected: 0, message: "Should handle negatives" },
      ],
    },
    {
      slug: "object-keys",
      title: "Get Object Keys",
      category: {
        name: "object",
        method: "keys",
      },
      starterCode: `const solve = (obj) => {
  // Return array of keys
  return []; // Replace with your logic
}`,
      testCases: [
        {
          input: [{ a: 1, b: 2 }],
          expected: ["a", "b"],
          message: "Should list keys in order",
        },
        { input: [{}], expected: [], message: "Should return empty array" },
        {
          input: [{ foo: 42 }],
          expected: ["foo"],
          message: "Should handle single key",
        },
      ],
    },
  ];
