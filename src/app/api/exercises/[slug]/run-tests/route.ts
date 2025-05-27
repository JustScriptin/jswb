import { type NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { EXERCISE_METADATA } from "@/features/codingChallenges/data/exerciseMetadata";
import { runIsolatedTests } from "@/features/codingChallenges/lib/runIsolatedTests";
import { transpile } from "@/features/codingChallenges/lib/transpile";
import { LanguageSchema } from "@/features/codingChallenges/types";

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

  const result = await runIsolatedTests({
    code: transpiled.code,
    testCases: exercise.testCases,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ results: result.results }, { status: 200 });
}
