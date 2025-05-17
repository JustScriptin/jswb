import { z } from "zod";
import { ExerciseSchema, type Exercise } from "../types";
  
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
          "**Running Totals**: Perfect for calculating progressive sums"
        ],
        visualExample: `## Step-by-Step Visualization

\`\`\`js
[1, 2, 3].reduce((sum, num) => sum + num, 0)
\`\`\`

### Process:
\`\`\`
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
          "**Wrong Method**: Using \`forEach\` or \`map\` when you need a single result"
        ],
        tips: [
          "**Always Initialize**: Use \`0\` as initialValue for sums",
          "**Type Safety**: Consider input validation for non-numbers",
          "**Performance**: \`reduce\` is O(n) - perfect for large datasets"
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
          message: "Should add `[1, 2, 3]` to get `6`"
        },
        {
          input: [[5, 10, 15, 20]],
          expected: 50,
          message: "Should add `[5, 10, 15, 20]` to get `50`"
        },
        {
          input: [[]],
          expected: 0,
          message: "Should return `0` for an empty array"
        },
        {
          input: [[42]],
          expected: 42,
          message: "Should return `42` for array `[42]`"
        }
      ]
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
          "**Pricing**: Finding most expensive item in cart"
        ],
        visualExample: `## Visual Walkthrough

\`\`\`js
[5, 2, 9, 1].reduce((max, current) => Math.max(max, current))
\`\`\`

### Process:
\`\`\`
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
          "**Complex Logic**: Overthinking the comparison (use \`Math.max\`)"
        ],
        tips: [
          "**Use Math.max**: Cleaner than manual comparison",
          "**Type Check**: Validate input array contains numbers",
          "**Edge Cases**: Handle empty and single-element arrays first"
        ]
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
          message: "Should find maximum `9` in `[5, 2, 9, 1]`"
        },
        {
          input: [[1, 2, 3, 4, 5]],
          expected: 5,
          message: "Should find maximum `5` in `[1, 2, 3, 4, 5]`"
        },
        {
          input: [[]],
          expected: null,
          message: "Should return `null` for empty array `[]`"
        },
        {
          input: [[42]],
          expected: 42,
          message: "Should return `42` for single-element array `[42]`"
        }
      ]
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
          "**Data Analysis**: Preparing data for charts/graphs"
        ],
        visualExample: `## Visual Process

\`\`\`js
["a", "b", "a"].reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {})
\`\`\`

### Step-by-Step:
\`\`\`
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
          "**Type Issues**: Not handling mixed data types properly"
        ],
        tips: [
          "**Use Nullish Coalescing**: \`counts[item] ??= 0\` for cleaner initialization",
          "**Consider Map**: Use \`Map\` for non-string keys",
          "**Immutable Update**: Use spread operator for immutable updates if needed"
        ]
      },
      starterCode: `const solve = (items) => {
  // Use reduce to build an object of counts
  // Start with {} as initialValue
  return {}; // Replace with your logic
}`,
      testCases: [
        {
          input: [["a", "b", "a", "c", "b", "a"]],
          expected: { "a": 3, "b": 2, "c": 1 },
          message: "Should count `a: 3`, `b: 2`, `c: 1` correctly"
        },
        {
          input: [["x", "x", "x"]],
          expected: { "x": 3 },
          message: "Should count three `x`s as `{ x: 3 }`"
        },
        {
          input: [[]],
          expected: {},
          message: "Should return empty object `{}` for empty array"
        },
        {
          input: [["unique"]],
          expected: { "unique": 1 },
          message: "Should count single item as `{ unique: 1 }`"
        }
      ]
    }
]);
