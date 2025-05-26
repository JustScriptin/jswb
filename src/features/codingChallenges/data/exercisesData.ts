import { z } from "zod";
import {
  ExerciseSchema,
  type Exercise,
} from "@/features/codingChallenges/types";

/**
 * ------------------------------------------------------------------------
 *  5) EXERCISES:
 *     Description -> only the exercise's goal, example, and requirements.
 *     Education -> thorough, beginner-friendly explanation of `reduce`.
 * ------------------------------------------------------------------------
 */
export const EXERCISES: Exercise[] = z.array(ExerciseSchema).parse([
  {
    slug: "reduce-sum",
    title: "Sum Numbers with reduce()",
    description: `# Sum Numbers with reduce()

### Problem
Write a function that uses \`reduce\` to sum all numbers in an array.

### Example
\`\`\`js
Input: [1, 2, 3]
Output: 6
\`\`\`

### Requirements
1. Use Array.prototype.reduce()
2. Return 0 if the array is empty
3. Return the single value if the array has only one element`,
    category: {
      name: "array",
      method: "reduce",
    },
    education: {
      concept: "Summation with reduce()",
      explanation: `# Understanding Array.reduce()

## What is \`reduce()\`?
\`reduce()\` is a built-in JavaScript method that transforms an array into a single value. Think of it as a way to "reduce" many values into one result.

## Syntax
\`\`\`js
array.reduce((accumulator, currentValue, index, array) => {
  // Return updated accumulator
}, initialValue);
\`\`\`

## Parameters Explained
- **accumulator**: The running result
- **currentValue**: Current element being processed
- **index**: Position of currentValue
- **array**: The array being processed
- **initialValue**: Starting value (optional)

## How Summation Works
1. Start with initialValue (0)
2. For each number:
   - Add it to accumulator
   - Pass result to next iteration
3. Return final sum

## Why Use reduce()?
- More declarative than loops
- Built-in error handling
- Chainable with other array methods`,
      useCases: [
        "**Shopping Cart Total**: \`cart.reduce((total, item) => total + item.price, 0)\`",
        "**Game Scoring**: \`scores.reduce((total, score) => total + score, 0)\`",
        "**Data Analysis**: \`measurements.reduce((sum, value) => sum + value, 0) / measurements.length\`",
        "**Running Totals**: Perfect for calculating progressive sums",
      ],
      visualExample: `## Step-by-Step Visualization

\`\`\`js
[1, 2, 3].reduce((sum, num) => sum + num, 0)
\`\`\`

### Process:
\`\`\`text
Initial state: sum = 0

First number (1):
   sum = 0 + 1 = 1

Second number (2):
   sum = 1 + 2 = 3

Third number (3):
   sum = 3 + 3 = 6

Result: 6
\`\`\``,
      commonMistakes: [
        "**No Initial Value**: \`numbers.reduce((sum, num) => sum + num)\` - Can fail on empty arrays",
        "**Missing Return**: \`numbers.reduce((sum, num) => { sum + num }, 0)\` - Forgot to return!",
        "**Wrong Method**: Using \`forEach\` or \`map\` when you need a single result",
      ],
      tips: [
        "**Always Initialize**: Use \`0\` as initialValue for sums",
        "**Type Safety**: Consider input validation for non-numbers",
        "**Performance**: \`reduce\` is O(n) - perfect for large datasets",
      ],
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
    description: `# Find Maximum with reduce()

### Problem
Write a function that uses \`reduce\` to find the largest number in an array.

### Example
\`\`\`js
Input: [5, 2, 9, 1]
Output: 9
\`\`\`

### Requirements
1. Use Array.prototype.reduce()
2. If the array is empty, return null
3. If there's only one element, return that element`,
    category: {
      name: "array",
      method: "reduce",
    },
    education: {
      concept: "Finding Maximum with reduce()",
      explanation: `# Finding Maximum with reduce()

## Core Concept
\`reduce()\` can track and update a "running maximum" as it processes each array element.

## How It Works
\`\`\`js
array.reduce((max, current) => {
  return current > max ? current : max;
});
\`\`\`

## Key Points
1. **No Initial Value Needed**
   - First element becomes initial maximum
   - Perfect for number comparisons

2. **Comparison Logic**
   - Each iteration compares current vs max
   - Larger value becomes new maximum

3. **Edge Cases**
   - Empty arrays need special handling
   - Single element is automatically maximum

## Why reduce() for Maximum?
- Single pass through array (O(n))
- Clean, functional approach
- Built-in array bounds handling`,
      useCases: [
        "**High Scores**: \`scores.reduce((max, score) => Math.max(max, score))\`",
        "**Peak Values**: Finding highest stock price, temperature, etc.",
        "**Dimensions**: Finding longest string, largest file, etc.",
        "**Pricing**: Finding most expensive item in cart",
      ],
      visualExample: `## Visual Walkthrough

\`\`\`js
[5, 2, 9, 1].reduce((max, current) => Math.max(max, current))
\`\`\`

### Process:
\`\`\`text
Start: max = 5 (first element)

Compare with 2:
   max = Math.max(5, 2) = 5

Compare with 9:
   max = Math.max(5, 9) = 9

Compare with 1:
   max = Math.max(9, 1) = 9

Result: 9
\`\`\``,
      commonMistakes: [
        "**Wrong Initial**: Using \`0\` as initialValue (fails with negative numbers)",
        "**Missing Null**: Not handling empty array case properly",
        "**Complex Logic**: Overthinking the comparison (use \`Math.max\`)",
      ],
      tips: [
        "**Use Math.max**: Cleaner than manual comparison",
        "**Type Check**: Validate input array contains numbers",
        "**Edge Cases**: Handle empty and single-element arrays first",
      ],
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
    description: `# Count Occurrences with reduce()

### Problem
Write a function that uses \`reduce\` to count how many times each value appears in an array.

### Example
\`\`\`js
Input: ["a", "b", "a", "c", "b", "a"]
Output: { "a": 3, "b": 2, "c": 1 }
\`\`\`

### Requirements
1. Use Array.prototype.reduce()
2. Return an object with the counts
3. If the array is empty, return an empty object`,
    category: {
      name: "array",
      method: "reduce",
    },
    education: {
      concept: "Building Objects with reduce()",
      explanation: `# Building Objects with reduce()

## Core Concept
\`reduce()\` can build complex objects by accumulating data in each iteration.

## Object Counting Pattern
\`\`\`js
array.reduce((counts, item) => {
  counts[item] = (counts[item] || 0) + 1;
  return counts;
}, {})
\`\`\`

## How It Works
1. **Start Empty**: Begin with \`{}\` as initialValue
2. **Update Counts**: For each item:
   - Get current count (or 0 if new)
   - Increment count by 1
   - Store back in accumulator
3. **Return Object**: Final accumulator has all counts

## Why This Pattern?
- Single pass through data
- Automatic key creation
- Memory efficient
- Easy to extend logic`,
      useCases: [
        "**Word Frequency**: \`words.reduce((freq, word) => ({ ...freq, [word]: (freq[word] || 0) + 1 }), {})\`",
        "**Tag Counting**: Analyzing most common categories/tags",
        "**User Activity**: Tracking action frequencies per user",
        "**Data Analysis**: Preparing data for charts/graphs",
      ],
      visualExample: `## Visual Process

\`\`\`js
["a", "b", "a"].reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {})
\`\`\`

### Step-by-Step:
\`\`\`text
Initial state: {}

Process "a":
   {} → { a: 1 }

Process "b":
   { a: 1 } → { a: 1, b: 1 }

Process "a":
   { a: 1, b: 1 } → { a: 2, b: 1 }

Result: { a: 2, b: 1 }
\`\`\``,
      commonMistakes: [
        "**Mutating Without Return**: Forgetting to return the accumulator",
        "**No Initial Value**: Not providing \`{}\` as initialValue",
        "**Type Issues**: Not handling mixed data types properly",
      ],
      tips: [
        "**Use Nullish Coalescing**: \`counts[item] ??= 0\` for cleaner initialization",
        "**Consider Map**: Use \`Map\` for non-string keys",
        "**Immutable Update**: Use spread operator for immutable updates if needed",
      ],
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
    description: `# Filter Even Numbers

### Problem
Return only the even numbers from an array using \`filter\`.

### Example
\`\`\`js
Input: [1, 2, 3, 4]
Output: [2, 4]
\`\`\`

### Requirements
1. Use Array.prototype.filter()
2. Return an empty array if there are no even numbers
3. Handle negative numbers properly`,
    category: {
      name: "array",
      method: "filter",
    },
    education: {
      concept: "Filtering with filter()",
      explanation: `# Using filter() for conditionals

The \`filter()\` method returns a new array containing elements that pass a test function.`,
      useCases: [
        "**Even Lists**: \`nums.filter(n => n % 2 === 0)\`",
        "**Search Results**: Filtering items matching a query",
        "**Cleanup**: Removing invalid values from data",
        "**Simple Validation**: Keeping entries that meet criteria",
      ],
      tips: [
        "Return a boolean from the callback",
        "Keep callbacks pure for predictability",
      ],
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
    description: `# Square Numbers with map()

### Problem
Create a new array containing the squares of each number using \`map()\`.

### Example
\`\`\`js
Input: [1, 2, 3]
Output: [1, 4, 9]
\`\`\`

### Requirements
1. Use Array.prototype.map()
2. The original array must not be modified
3. Support empty arrays`,
    category: {
      name: "array",
      method: "map",
    },
    education: {
      concept: "Transforming values with map()",
      explanation: `# Why map()

\`map()\` applies a function to each element and returns a new array of results.`,
      useCases: [
        "**Calculations**: Squaring numbers or adjusting prices",
        "**Formatting**: Converting objects to display formats",
        "**Normalization**: Ensuring data is consistent",
        "**Bulk Operations**: Applying the same change to many items",
      ],
      tips: [
        "Never mutate the input array",
        "Return the transformed value from the callback",
      ],
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
    description: `# Sum with forEach()

### Problem
Use \`forEach()\` to add all numbers in an array and return the total.

### Example
\`\`\`js
Input: [1, 2, 3]
Output: 6
\`\`\`

### Requirements
1. Use Array.prototype.forEach()
2. Do not use reduce()
3. Return 0 for empty array`,
    category: {
      name: "array",
      method: "forEach",
    },
    education: {
      concept: "Iterating with forEach()",
      explanation: `# forEach for accumulation

\`forEach\` runs a callback for each element. Use it to build up a value.`,
      useCases: [
        "**Logging**: console.log each value",
        "**Sums**: Add numbers to a running total",
        "**DOM Updates**: Apply changes to elements",
        "**Sequential Tasks**: Send requests in order",
      ],
      tips: [
        "Initialize variables before calling forEach()",
        "Keep the callback short and focused",
      ],
    },
    starterCode: `const solve = (numbers) => {
  // Sum numbers using forEach
  return 0; // Replace with your logic
}`,
    testCases: [
      { input: [[1, 2, 3]], expected: 6, message: "Should sum 1,2,3 to 6" },
      { input: [[]], expected: 0, message: "Should return 0 for empty array" },
      { input: [[-1, 1]], expected: 0, message: "Should handle negatives" },
    ],
  },
  {
    slug: "object-keys",
    title: "Get Object Keys",
    description: `# Get Object Keys

### Problem
Return an array of keys from an object using \`Object.keys()\`.

### Example
\`\`\`js
Input: { a: 1, b: 2 }
Output: ["a", "b"]
\`\`\`

### Requirements
1. Use Object.keys()
2. Keep key order intact
3. Return empty array for empty object`,
    category: {
      name: "object",
      method: "keys",
    },
    education: {
      concept: "Listing object keys",
      explanation: `# Why Object.keys()

Object.keys() returns an array of an object's own enumerable property names.`,
      useCases: [
        "**Iteration**: Loop over keys",
        "**Validation**: Check required fields",
        "**Transformation**: Convert object to entries",
        "**Debugging**: Inspect object structure",
      ],
      tips: [
        "Only enumerable properties are returned",
        "Order follows property insertion",
      ],
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
]);
