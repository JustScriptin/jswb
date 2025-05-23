import ivm from "isolated-vm";
import { logger } from "@/lib/logger";
import {
  TestCase,
  TestResult,
  TestResultSchema,
} from "@/features/codingChallenges/types";

export type IsolatedTestResult =
  | { success: true; results: TestResult[] }
  | { success: false; error: string };

export type RunIsolatedTestsArgs = {
  code: string;
  testCases: TestCase[];
  memoryMb?: number;
};

export async function runIsolatedTests({
  code,
  testCases,
  memoryMb = Number(process.env.ISOLATE_MEMORY_MB ?? 8),
}: RunIsolatedTestsArgs): Promise<IsolatedTestResult> {
  const isolate = new ivm.Isolate({ memoryLimit: memoryMb });

  try {
    const context = isolate.createContextSync();
    const jail = context.global;
    jail.setSync("global", jail.derefInto());
    jail.setSync(
      "myLog",
      new ivm.Callback(
        (...args: unknown[]) => logger.info("[Isolate log]", ...args),
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
      const results = TestResultSchema.array().parse(rawResult.results);
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
  const codeWithGlobal = `${code}\nif (typeof solve === 'function') globalThis.solve = solve;\n`;
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
      output = globalThis.solve(...test.input);
    } catch (error) {
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

    const passed = JSON.stringify(output) === JSON.stringify(test.expected);
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
