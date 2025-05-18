import { NextResponse } from "next/server";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import {
  LanguageSchema,
  TestResultSchema,
  type TestResult,
} from "@/features/codingChallenges/types";
import { z } from "zod";
import ivm from "isolated-vm";
import ts from "typescript";

const RequestBodySchema = z.object({
  code: z.string(),
  language: LanguageSchema,
});

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) : Promise<NextResponse> {
  let isolate: ivm.Isolate | undefined;

  try {
    // 1) Identify the exercise
    const { slug } = await params;
    const exercise = EXERCISES.find((ex) => ex.slug === slug);
    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    // 2) Parse user code and language
    const body = await request.json();
    const parsed = RequestBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.format() },
        { status: 400 }
      );
    }
    const { code, language } = parsed.data;

    // 3) If TypeScript, transpile to JavaScript
    let finalCode = code;
    if (language === "typescript") {
      const result = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ESNext,
          strict: true,
        },
        reportDiagnostics: true,
      });

      // Check for TypeScript compilation errors
      if (result.diagnostics?.length) {
        const messages = result.diagnostics.map((d) => {
          const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
          const pos = d.file?.getLineAndCharacterOfPosition(d.start ?? 0);
          const line = (pos?.line ?? 0) + 1;
          const col = (pos?.character ?? 0) + 1;
          return `TS Error at ${line}:${col} - ${msg}`;
        });
        return NextResponse.json(
          { error: messages.join("\n") },
          { status: 400 }
        );
      }

      finalCode = result.outputText;
    }

    // 4) Create an isolate + context
    isolate = new ivm.Isolate({ memoryLimit: 8 });
    const context = isolate.createContextSync();
    const jail = context.global;
    jail.setSync("global", jail.derefInto());

    // 5) Provide a snippet logger (sync callback) in the isolate
    jail.setSync(
      "myLog",
      new ivm.Callback(
        (...args: unknown[]) => console.log("[Isolate log]", ...args),
        { sync: true }
      )
    );

    // 6) Build snippet which:
    //    - loads user code (attaches solve => globalThis.solve)
    //    - runs tests
    //    - stores final { success, results } in globalThis.__myResult__
    const codeWithGlobal = `${finalCode}\nif (typeof solve === 'function') globalThis.solve = solve;\n`;
    const userCodeLiteral = JSON.stringify(codeWithGlobal);
    // Escape backticks to avoid breaking the template literal
    const testCasesLiteral = JSON.stringify(exercise.testCases).replace(/`/g, "\\`");

    const snippet = `
myLog("[snippet] Starting snippet...");

try {
  // Evaluate user code
  const userCodeString = ${userCodeLiteral};
  myLog("[snippet] userCodeString length:", userCodeString.length);
  new Function("globalThis", userCodeString)(globalThis);

  // Check for solve
  if (typeof globalThis.solve !== "function") {
    throw new Error("No solve() function found in user code.");
  }

  // Parse test cases
  const testCases = JSON.parse(\`${testCasesLiteral}\`);
  const results = [];

  myLog("[snippet] testCases length:", testCases.length);

  for (const [index, test] of testCases.entries()) {
    myLog("[snippet] Running test #", index + 1, "with input:", test.input);
    let output;
    try {
      output = globalThis.solve(...test.input);
    } catch (err) {
      results.push({ passed: false, message: test.message, error: String(err) });
      continue;
    }

    if (output === undefined) {
      results.push({
        passed: false,
        message: test.message,
        error: "Function returned undefined. Make sure you're returning a value."
      });
      continue;
    }

    // Compare JSON for objects/arrays
    const passed = JSON.stringify(output) === JSON.stringify(test.expected);
    results.push({
      passed,
      message: test.message,
      ...(passed
        ? {}
        : {
            error: \`Expected \${JSON.stringify(test.expected)}, but got \${JSON.stringify(output)}\`
          })
    });
  }

  myLog("[snippet] All tests completed. Storing final object in __myResult__");
  globalThis.__myResult__ = { success: true, results };
} catch (allErr) {
  myLog("[snippet] Snippet-level error:", String(allErr));
  globalThis.__myResult__ = { success: false, error: String(allErr) };
}
`;

    // 7) Compile + run snippet
    const script = isolate.compileScriptSync(snippet);
    script.runSync(context); // returns undefined (by design)

    // 8) Extract final object from globalThis.__myResult__
    const resultRef = jail.getSync("__myResult__");
    if (!resultRef) {
      return NextResponse.json(
        { error: "Snippet did not set final result" },
        { status: 500 }
      );
    }

    // copySync() to get a plain JS object in Node
    const rawResult = resultRef.copySync() as {
      success: boolean;
      results?: unknown;
      error?: string;
    };

    if (!rawResult.success) {
      return NextResponse.json(
        { error: rawResult.error || "Unknown error occurred" },
        { status: 500 }
      );
    }

    let results: TestResult[];
    try {
      results = TestResultSchema.array().parse(rawResult.results);
    } catch {
      return NextResponse.json(
        { error: "Invalid results format" },
        { status: 500 }
      );
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (err) {
    // Outer catch
    console.error("[api/exercises/run-tests] Outer catch error:", err);
    return NextResponse.json({ error: "Failed to run tests" }, { status: 500 });
  } finally {
    // 9) Dispose isolate
    isolate?.dispose();
  }
}
