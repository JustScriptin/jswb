import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { EXERCISE_METADATA } from "@/features/codingChallenges/data/exerciseMetadata";
import { getExerciseContent } from "@/features/codingChallenges/services/exerciseContentService";
import { ExerciseClientMDX } from "@/features/codingChallenges/components/ExerciseClientMDX";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for each exercise page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exercise = EXERCISE_METADATA.find((ex) => ex.slug === slug);

  if (!exercise) {
    return {
      title: "Exercise Not Found",
    };
  }

  return {
    title: `${exercise.title} - Coding Exercise`,
    description: `Practice ${exercise.category.method} with this coding challenge`,
    openGraph: {
      title: `${exercise.title} - Coding Exercise`,
      description: `Practice ${exercise.category.method} with this coding challenge`,
      type: "article",
    },
  };
}

export default async function ExercisePage({
  params,
}: Props): Promise<ReactElement> {
  const { slug } = await params;

  // Get metadata
  const exerciseMetadata = EXERCISE_METADATA.find((ex) => ex.slug === slug);
  if (!exerciseMetadata) {
    notFound();
  }

  // Load MDX content
  const mdxContent = await getExerciseContent(slug);
  if (!mdxContent) {
    notFound();
  }

  return (
    <ExerciseClientMDX
      exerciseMetadata={exerciseMetadata}
      mdxContent={mdxContent}
    />
  );
}

ExercisePage.displayName = "ExercisePage";
