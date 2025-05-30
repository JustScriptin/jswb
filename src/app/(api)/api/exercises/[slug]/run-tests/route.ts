import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { EXERCISE_METADATA } from "@/shared/data/exerciseMetadata";
import { runIsolatedTests } from "@/platform/node/isolated-vm/runIsolatedTests";
import { transpile } from "@/platform/node/transpiler/transpile";
import { LanguageSchema } from "@/shared/types/exercise";
import { adaptTestCasesToPlatform } from "@/shared/utils/testCaseAdapter";

const RequestBodySchema = z.object({
  code: z.string(),
  language: LanguageSchema,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await params;
  const exercise = EXERCISE_METADATA.find((ex) => ex.slug === slug);

  if (!exercise) {
    return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = RequestBodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.format() },
      { status: 400 },
    );
  }

  const { code, language } = parsed.data;
  const transpiled = transpile(code, language);

  if ("error" in transpiled) {
    return NextResponse.json({ error: transpiled.error }, { status: 400 });
  }

  console.log("[route] Transpiled TypeScript code:", transpiled.code);

  const adaptedTestCases = adaptTestCasesToPlatform(exercise.testCases);
  console.log(
    "[route] Adapted test cases:",
    JSON.stringify(adaptedTestCases, null, 2),
  );

  const result = runIsolatedTests({
    code: transpiled.code,
    testCases: adaptedTestCases,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  console.log("[route] Test results:", JSON.stringify(result.results, null, 2));
  console.log(
    "[route] All tests passed:",
    result.results.every((r) => r.passed),
  );

  return NextResponse.json({ results: result.results }, { status: 200 });
}
