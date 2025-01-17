/**
 * ------------------------------------------------------------------------
 *  1) CATEGORY_METHODS: One place to define valid categories and methods
 * ------------------------------------------------------------------------
 */
export const CATEGORY_METHODS = {
    array: ["reduce", "map", "filter", "forEach"] as const,
    map: ["set", "get", "has"] as const,
    object: ["keys", "values", "entries"] as const,
    set: ["add", "has", "delete"] as const
  } as const;
  
  
  /**
   * ------------------------------------------------------------------------
   *  2) Derived Types from CATEGORY_METHODS
   * ------------------------------------------------------------------------
   */
  export type CategoryName = keyof typeof CATEGORY_METHODS;
  
  export type MethodName<T extends CategoryName> = typeof CATEGORY_METHODS[T][number];
  
  export type Category<T extends CategoryName = CategoryName> = {
    name: T;
    method: MethodName<T>;
  };
  
  
  /**
   * ------------------------------------------------------------------------
   *  3) Basic Learning Exercise Types
   * ------------------------------------------------------------------------
   */
  export type TestCase = {
    input: unknown[];
    expected: unknown;
    message: string;
  };
  
  export type Challenge<T extends CategoryName = CategoryName> = {
    slug: string;
    title: string;
    description: string;
    category: Category<T>;
    starterCode: string;
    testCases: TestCase[];
  };
  
  
  /**
   * ------------------------------------------------------------------------
   *  4) EXERCISES: Learning examples for each method
   * ------------------------------------------------------------------------
   */
  export const EXERCISES: Challenge[] = [
    {
      slug: "reduce-product",
      title: "Understanding Array.reduce() with Products",
      description: `Learn how to use Array.prototype.reduce() to calculate products of numbers.
      
  Example:
  - Input: [2, 3, 4]
  - Output: 24
  
  Requirements:
  1. Use Array.prototype.reduce()
  2. Handle empty arrays by returning 1
  3. Handle single-element arrays by returning that number`,
      category: {
        name: "array",
        method: "reduce",
      },
      starterCode: `// Try using reduce to multiply all numbers in the array
const solve = (numbers) => {
  // Your code here
  return 0;
}`,
      testCases: [
        {
          input: [[2, 3, 4]],
          expected: 24,
          message: "Should multiply [2, 3, 4] to get 24"
        },
        {
          input: [[1, 2, 3, 4, 5]],
          expected: 120,
          message: "Should multiply [1, 2, 3, 4, 5] to get 120"
        },
        {
          input: [[]],
          expected: 1,
          message: "Should return 1 for an empty array"
        },
        {
          input: [[7]],
          expected: 7,
          message: "Should return the same number for a single-element array"
        }
      ]
    },
    {
      slug: "reduce-sentence",
      title: "Build a Sentence using reduce()",
      description: `Write a function that takes an array of words and builds a sentence string using Array.prototype.reduce().
      
  Example:
  - Input: ["Hello", "world", "!"]
  - Output: "Hello world !"
  
  Requirements:
  1. Use Array.prototype.reduce()
  2. Add a single space between words
  3. Handle empty arrays by returning an empty string
  4. No extra spaces at the start or end`,
      category: {
        name: "array",
        method: "reduce",
      },
      starterCode: `const solve = (words) => {
    // Your code here
    return "";
  }`,
      testCases: [
        {
          input: [["Hello", "world", "!"]],
          expected: "Hello world !",
          message: "Should join words with spaces"
        },
        {
          input: [["I", "love", "coding", "in", "TypeScript"]],
          expected: "I love coding in TypeScript",
          message: "Should handle longer sentences"
        },
        {
          input: [[]],
          expected: "",
          message: "Should return empty string for empty array"
        },
        {
          input: [["JavaScript"]],
          expected: "JavaScript",
          message: "Should return the word itself for single-word array"
        }
      ]
    }
  ];
  