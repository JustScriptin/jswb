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
   *  3) Educational Content Type (as defined)
   * ------------------------------------------------------------------------
   */
  export type Education = {
    concept: string;
    explanation: string;
    useCases: string[];
    visualExample?: string;
    commonMistakes?: string[];
    tips?: string[];
  };
  
  /**
   * ------------------------------------------------------------------------
   *  4) Basic Learning Exercise Types
   * ------------------------------------------------------------------------
   */
  export type TestCase = {
    input: unknown[];
    expected: unknown;
    message: string;
  };
  
  export type Exercise<T extends CategoryName = CategoryName> = {
    slug: string;
    title: string;
    description: string;
    category: Category<T>;
    education: Education;
    starterCode: string;
    testCases: TestCase[];
  };
  
  /**
   * ------------------------------------------------------------------------
   *  5) EXERCISES: 
   *     Description -> only the exercise's goal, example, and requirements.
   *     Education -> thorough, beginner-friendly explanation of `reduce`.
   * ------------------------------------------------------------------------
   */
  export const EXERCISES: Exercise[] = [
    {
      slug: "reduce-sum",
      title: "Sum Numbers with reduce()",
      description: `
  Write a function that uses \`reduce\` to sum all numbers in an array.
  
  Example:
  - Input: [1, 2, 3]
  - Output: 6
  
  Requirements:
  1. Use Array.prototype.reduce()
  2. Return 0 if the array is empty
  3. Return the single value if the array has only one element
  `,
      category: {
        name: "array",
        method: "reduce",
      },
      education: {
        concept: "Summation with reduce()",
        explanation: `
  **What is \`reduce()\`?**
  
  \`reduce()\` is a built-in JavaScript method on arrays. It processes each element of your array in turn, 
  carrying along an "accumulator" that represents your ongoing result. The method looks like this:
  
  \`\`\`js
  array.reduce(function callback(accumulator, currentValue, currentIndex, array) {
    // Return the updated accumulator
  }, initialValue);
  \`\`\`
  
  - **accumulator**: A variable you keep updating with each element.
  - **currentValue**: The array element \`reduce\` is looking at during the current iteration.
  - **currentIndex**: The position of \`currentValue\` in the array (not always needed, but sometimes handy).
  - **array**: The entire array (useful if you need more context).
  - **initialValue** (optional): If you supply this, \`accumulator\` starts at this value. 
    If you don't, the first array element becomes your initial \`accumulator\`.
  
  **How to Sum with \`reduce()\`:**
  1. Provide an \`initialValue\` of \`0\`. This tells \`reduce\` to start counting from zero.
  2. In the callback, add \`currentValue\` to \`accumulator\`.
  3. Return the \`accumulator\` each time so it can carry that sum forward.
  4. After the last element, \`reduce\` returns the final total.
  
  This is simpler than writing a loop manually and makes it clear you're producing a *single* result from all elements.
  `,
        useCases: [
          "Calculating a total price in a shopping cart",
          "Adding scores or points in a game",
          "Summing any array of numbers for a single final value",
          "Quickly handling edge cases (empty array, single-element array)"
        ],
        visualExample: `
  [1, 2, 3].reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0)
  
  /*
  Iteration detail:
  - Start: accumulator = 0
  - 1st element (1): accumulator = 0 + 1 = 1
  - 2nd element (2): accumulator = 1 + 2 = 3
  - 3rd element (3): accumulator = 3 + 3 = 6
  Final = 6
  */
  `,
        commonMistakes: [
          "Forgetting to provide an initial value of 0 (leads to errors with empty arrays)",
          "Not returning the accumulator inside the callback, causing undefined behavior",
          "Trying to use forEach or map when the goal is a single combined result"
        ],
        tips: [
          "Always supply 0 as the initial value for summation to handle empty arrays gracefully",
          "Think about how to handle negative numbers or non-numerical data (e.g. parse or filter them out)",
          "Remember that \`reduce\` will only give you one final value"
        ]
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
          message: "Should add [1, 2, 3] to get 6"
        },
        {
          input: [[5, 10, 15, 20]],
          expected: 50,
          message: "Should add [5, 10, 15, 20] to get 50"
        },
        {
          input: [[]],
          expected: 0,
          message: "Should return 0 for an empty array"
        },
        {
          input: [[42]],
          expected: 42,
          message: "Should return the single value for a one-element array"
        }
      ]
    },
    {
      slug: "reduce-max",
      title: "Find Maximum with reduce()",
      description: `
  Write a function that uses \`reduce\` to find the largest number in an array.
  
  Example:
  - Input: [5, 2, 9, 1]
  - Output: 9
  
  Requirements:
  1. Use Array.prototype.reduce()
  2. If the array is empty, return null
  3. If there's only one element, return that element
  `,
      category: {
        name: "array",
        method: "reduce",
      },
      education: {
        concept: "Finding the Maximum with reduce()",
        explanation: `
  **How does \`reduce()\` work in general?**
  
  \`reduce\` runs a callback on each array element, updating an \`accumulator\` (some variable) along the way. 
  You can write the callback like this:
  
  \`\`\`js
  array.reduce(function callback(accumulator, currentValue, currentIndex, entireArray) {
    // logic to update accumulator
    return updatedAccumulator;
  }, initialValue);
  \`\`\`
  
  **Finding the Maximum**:
  1. If you don't supply an \`initialValue\`, the first array element becomes your accumulator.
  2. On each iteration, compare \`accumulator\` with \`currentValue\`.
  3. Keep whichever one is larger—this becomes the new \`accumulator\`.
  4. By the end, \`accumulator\` is the maximum.
  
  **Empty Arrays**: 
  - If there's no element to start with, you should return \`null\`.
  
  **One-Element Arrays**:
  - That element is the maximum by default.
  
  Thus, \`reduce\` can do more than summation; it can track *any* evolving condition, 
  like "What's the largest so far?" in a single pass.
  `,
        useCases: [
          "Finding the highest score in a list of game results",
          "Determining the largest file size from a directory listing",
          "Choosing the priciest product in an online store",
          "Adapting logic to find 'longest' string or 'oldest' date, etc."
        ],
        visualExample: `
  [5, 2, 9, 1].reduce(function(maxSoFar, currentValue) {
    return currentValue > maxSoFar ? currentValue : maxSoFar;
  })
  
  // Step by step (no explicit initialValue):
  // - 1st iteration: maxSoFar = 5 (first element)
  // - Compare 5 with 2 -> keep 5
  // - Compare 5 with 9 -> update to 9
  // - Compare 9 with 1 -> keep 9
  // Final: 9
  `,
        commonMistakes: [
          "Not accounting for empty arrays, resulting in an error if no initialValue is given",
          "Using 0 or a positive number as an initial value when the array might have negatives",
          "Forgetting to return the new max in the callback, leaving the accumulator unchanged"
        ],
        tips: [
          "Check if the array is empty first; if so, return null right away",
          "Consider using -Infinity as the initial value if you want to handle negative numbers robustly",
          "Reduce can do complex tasks; logic for the callback is entirely up to you"
        ]
      },
      starterCode: `const solve = (numbers) => {
    // 1. If empty, return null
    // 2. Otherwise, call reduce and keep track of the largest
    return null; // Replace with your logic
  }`,
      testCases: [
        {
          input: [[5, 2, 9, 1]],
          expected: 9,
          message: "Should find maximum in [5, 2, 9, 1] which is 9"
        },
        {
          input: [[1, 2, 3, 4, 5]],
          expected: 5,
          message: "Should find maximum in [1, 2, 3, 4, 5] which is 5"
        },
        {
          input: [[]],
          expected: null,
          message: "Should return null for an empty array"
        },
        {
          input: [[42]],
          expected: 42,
          message: "Should return the single element for a one-element array"
        }
      ]
    },
    {
      slug: "reduce-count",
      title: "Count Occurrences with reduce()",
      description: `
  Write a function that uses \`reduce\` to count how many times each value appears in an array.
  
  Example:
  - Input: ["a", "b", "a", "c", "b", "a"]
  - Output: { "a": 3, "b": 2, "c": 1 }
  
  Requirements:
  1. Use Array.prototype.reduce()
  2. Return an object with the counts
  3. If the array is empty, return an empty object
  `,
      category: {
        name: "array",
        method: "reduce",
      },
      education: {
        concept: "Constructing an Object with reduce()",
        explanation: `
  **General \`reduce\` Recap**:
  \`reduce\` takes a callback function that receives four parameters:
  \`\`\`js
  function callback(accumulator, currentValue, currentIndex, array) {
    // modify accumulator in some way
    return accumulator;
  }
  \`\`\`
  - \`accumulator\` here can be **anything**—a number, string, object, etc.
  
  **Counting Approach**:
  1. Provide an empty object (\`{}\`) as the \`initialValue\`. Then \`accumulator\` will be that object.
  2. During each iteration, use \`currentValue\` (the array element) as a key in \`accumulator\`.
  3. Increment the value stored at that key. If it doesn't exist yet, initialize it to 1.
  4. At the end, the \`accumulator\` is an object mapping each unique element to the number of occurrences.
  
  This lets you transform an array of items into a frequency count in **one single pass**.
  `,
        useCases: [
          "Tallying word counts in a list of words",
          "Summarizing categories (e.g. how many 'Fruit', 'Vegetable', etc.)",
          "Tracking how many times each user logs in (by user ID)",
          "Preparing data for histograms or pie charts"
        ],
        visualExample: `
  ["a", "b", "a"].reduce(function(acc, currentValue) {
    // If acc[currentValue] is undefined, set it to 0
    acc[currentValue] = (acc[currentValue] || 0) + 1;
    return acc;
  }, {})
  
  /*
  - Initial accumulator: {}
  - For "a": {} -> { a: 1 }
  - For "b": { a: 1 } -> { a: 1, b: 1 }
  - For "a": { a: 1, b: 1 } -> { a: 2, b: 1 }
  Result: { a: 2, b: 1 }
  */
  `,
        commonMistakes: [
          "Forgetting to return the accumulator object in the callback, causing it to be undefined",
          "Not initializing accumulator with {} (can't assign properties to undefined)",
          "Ignoring data type differences (e.g., string vs. number keys) if the array has mixed types"
        ],
        tips: [
          "Always return the updated accumulator each iteration so it persists for the next element",
          "Consider whether or not you need to handle case sensitivity (e.g. 'A' vs 'a')",
          "You can later use Object.keys/values/entries to iterate over the resulting counts"
        ]
      },
      starterCode: `const solve = (items) => {
    // 1. Provide {} as initialValue to reduce.
    // 2. For each item, increment the related key in the accumulator.
    // 3. Return the accumulator at the end.
    return {}; // Replace with your logic
  }`,
      testCases: [
        {
          input: [["a", "b", "a", "c", "b", "a"]],
          expected: { "a": 3, "b": 2, "c": 1 },
          message: "Should count occurrences correctly"
        },
        {
          input: [["x", "x", "x"]],
          expected: { "x": 3 },
          message: "Should handle repeated elements"
        },
        {
          input: [[]],
          expected: {},
          message: "Should return empty object for empty array"
        },
        {
          input: [["unique"]],
          expected: { "unique": 1 },
          message: "Should handle single element correctly"
        }
      ]
    }
  ];
  