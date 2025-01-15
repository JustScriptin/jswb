import { NextResponse } from "next/server";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import ivm from "isolated-vm";

// Type for the expected request body
type RequestBody = {
  code: string;
};

// Type for test results
type TestResult = {
  passed: boolean;
  message: string;
  error?: string;
};

/**
 * POST /api/exercises/[slug]/run-tests
 * Runs submitted code against exercise test cases in an isolated VM
 */
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Initialize isolate outside try block so it's accessible in finally
  let isolate: ivm.Isolate | undefined;

  try {
    const { slug } = await params;
    // 1. Get the exercise and submitted code
    const exercise = EXERCISES.find((ex) => ex.slug === slug);
    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    const body = await request.json() as RequestBody;
    if (!body.code) {
      return NextResponse.json(
        { error: "No code submitted" },
        { status: 400 }
      );
    }

    // 2. Create an isolated environment
    isolate = new ivm.Isolate({ memoryLimit: 8 });
    const context = await isolate.createContext();

    // 3. Run each test case in isolation
    const results: TestResult[] = [];
    
    for (const test of exercise.testCases) {
      try {
        // Create a new context for each test to avoid state leakage
        const jail = context.global;
        await jail.set("global", jail.derefInto());

        // Prepare the test script that includes the user's code and test case
        const testScript = `
          ${body.code}
          
          // Run the test
          const result = solve(...${JSON.stringify(test.input)});
          const expected = ${JSON.stringify(test.expected)};
          
          // Compare using strict equality
          const passed = JSON.stringify(result) === JSON.stringify(expected);
          
          // Return the result
          ({ passed, actual: result });
        `;

        // Compile and run the test with a timeout
        const script = await isolate.compileScript(testScript);
        const result = await script.run(context, { timeout: 1000 });
        
        // Get the result and add it to our results array
        const { passed, actual } = result;
        results.push({
          passed,
          message: test.message,
          ...(passed ? {} : { 
            error: `Expected ${JSON.stringify(test.expected)}, but got ${JSON.stringify(actual)}`
          })
        });
      } catch (error) {
        // Handle any errors that occurred during test execution
        results.push({
          passed: false,
          message: test.message,
          error: error instanceof Error ? error.message : "Unknown error occurred"
        });
      }
    }

    // 4. Return the results
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    // Log the error internally but don't expose details to client
    console.error("[api/exercises/run-tests] Error:", error);
    
    return NextResponse.json(
      { error: "Failed to run tests" },
      { status: 500 }
    );
  } finally {
    // Ensure we dispose of the isolate to prevent memory leaks
    isolate?.dispose();
  }
} 