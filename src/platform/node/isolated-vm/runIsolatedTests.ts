import ivm from "isolated-vm";
import { logger } from "@/platform/node/logger";
import type { TestCase, TestResult } from "@/platform/types/exercise";

export type IsolatedTestResult =
  | { success: true; results: TestResult[] }
  | { success: false; error: string };

export type RunIsolatedTestsArgs = {
  code: string;
  testCases: TestCase[];
  memoryMb?: number;
};

export function runIsolatedTests({
  code,
  testCases,
  memoryMb = Number(process.env.ISOLATE_MEMORY_MB ?? 8),
}: RunIsolatedTestsArgs): IsolatedTestResult {
  const isolate = new ivm.Isolate({ memoryLimit: memoryMb });

  try {
    const context = isolate.createContextSync();
    const jail = context.global;
    jail.setSync("global", jail.derefInto());
    jail.setSync(
      "myLog",
      new ivm.Callback(
        (...args: unknown[]) => {
          logger.info("[Isolate log]", ...args);
          return void 0;
        },
        {
          sync: true,
        },
      ),
    );

    const snippet = buildSnippet(code, testCases);
    const script = isolate.compileScriptSync(snippet);
    script.runSync(context);

    const resultRef = jail.getSync("__myResult__");
    if (!resultRef) {
      return { success: false, error: "Snippet did not set final result" };
    }

    const rawResult = resultRef.copySync() as {
      success: boolean;
      results?: unknown;
      error?: string;
    };

    if (!rawResult.success) {
      return {
        success: false,
        error: rawResult.error ?? "Unknown error occurred",
      };
    }

    try {
      const results = rawResult.results as TestResult[];
      return { success: true, results };
    } catch {
      return { success: false, error: "Invalid results format" };
    }
  } catch (error) {
    logger.error("[runIsolatedTests] Error:", error);
    return { success: false, error: "Failed to run snippet" };
  } finally {
    isolate.dispose();
  }
}

function buildSnippet(code: string, testCases: TestCase[]): string {
  const codeWithGlobal = `
${code}
if (typeof solve === 'function') {
  globalThis.solve = solve;
} else if (typeof exports !== 'undefined' && exports.solve) {
  globalThis.solve = exports.solve;
} else if (typeof module !== 'undefined' && module.exports && module.exports.solve) {
  globalThis.solve = module.exports.solve;
}
`;
  const userCodeLiteral = JSON.stringify(codeWithGlobal);
  const testCasesLiteral = JSON.stringify(testCases).replace(/`/g, "\\`");

  return `
myLog("[snippet] Starting snippet...");

try {
  const userCodeString = ${userCodeLiteral};
  myLog("[snippet] userCodeString length:", userCodeString.length);
  new Function("globalThis", userCodeString)(globalThis);

  if (typeof globalThis.solve !== "function") {
    throw new Error("No solve() function found in user code.");
  }

  const testCases = JSON.parse(\`${testCasesLiteral}\`);
  const results = [];

  myLog("[snippet] testCases length:", testCases.length);

  for (const [index, test] of testCases.entries()) {
    myLog("[snippet] Running test #", index + 1, "with input:", test.input);
    let output;
    try {
      const inputToUse = Array.isArray(test.input) && test.input.length === 1 && Array.isArray(test.input[0]) 
        ? test.input[0] 
        : test.input;
      
      if (Array.isArray(inputToUse) && inputToUse.length === 0) {
        output = globalThis.solve(inputToUse);
        myLog("[snippet] Using empty array as single argument");
      } 
      else if (Array.isArray(inputToUse) && !Array.isArray(inputToUse[0])) {
        output = globalThis.solve(inputToUse);
        myLog("[snippet] Using input as single argument:", inputToUse);
      }
      else {
        output = globalThis.solve(...inputToUse);
        myLog("[snippet] Spreading input:", inputToUse);
      }
    } catch (error) {
      myLog("[snippet] Error executing solve:", String(error));
      results.push({ passed: false, message: test.message, error: String(error) });
      continue;
    }

    if (output === undefined) {
      results.push({
        passed: false,
        message: test.message,
        error: "Function returned undefined. Make sure you're returning a value.",
      });
      continue;
    }

    myLog("[snippet] Test case expected:", test.expected, "type:", typeof test.expected);
    myLog("[snippet] Actual output:", output, "type:", typeof output);
    
    let passed = false;
    if (typeof output === 'number' && typeof test.expected === 'number') {
      passed = output === test.expected;
      myLog("[snippet] Number comparison:", output, "===", test.expected, "result:", passed);
    } else if (typeof output === 'number' && typeof test.expected === 'string') {
      const numExpected = Number(test.expected);
      passed = !isNaN(numExpected) && output === numExpected;
      myLog("[snippet] Number-string comparison:", output, "===", numExpected, "result:", passed);
    } else if (typeof output === 'string' && typeof test.expected === 'number') {
      const numOutput = Number(output);
      passed = !isNaN(numOutput) && numOutput === test.expected;
      myLog("[snippet] String-number comparison:", numOutput, "===", test.expected, "result:", passed);
    } else {
      const outputStr = JSON.stringify(output);
      const expectedStr = JSON.stringify(test.expected);
      passed = outputStr === expectedStr;
      myLog("[snippet] JSON comparison:", outputStr, "===", expectedStr, "result:", passed);
    }

    results.push({
      passed,
      message: test.message,
      ...(passed
        ? {}
        : { error: \`Expected \${JSON.stringify(test.expected)}, but got \${JSON.stringify(output)}\` }),
    });
  }

  myLog("[snippet] All tests completed. Storing final object in __myResult__");
  globalThis.__myResult__ = { success: true, results };
} catch (snippetError) {
  myLog("[snippet] Snippet-level error:", String(snippetError));
  globalThis.__myResult__ = { success: false, error: String(snippetError) };
}
`;
}
