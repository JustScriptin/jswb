import type { ReactElement } from "react";

import { notFound } from "next/navigation";

import { ExerciseClientMDX } from "../../components/ExerciseClientMDX";
import { EXERCISE_METADATA } from "@/shared/data/exerciseMetadata";
import { getExerciseContent } from "../../_core/services/exerciseContentService";
import { getCategoryObject } from "@/shared/utils/categoryAdapter";

import type { Metadata } from "next";

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
    description: `Practice ${getCategoryObject(exercise.category).name} with this coding challenge`,
    openGraph: {
      title: `${exercise.title} - Coding Exercise`,
      description: `Practice ${getCategoryObject(exercise.category).name} with this coding challenge`,
      type: "article",
    },
  };
}

export default async function ExercisePage({
  params,
}: Props): Promise<ReactElement> {
  const { slug } = await params;

  // Get metadata
  const exerciseData = EXERCISE_METADATA.find((ex) => ex.slug === slug);
  if (!exerciseData) {
    notFound();
  }

  const exerciseMetadata = {
    ...exerciseData,
    id: exerciseData.slug,
    tags: [],
    difficulty: "intermediate" as const,
  };

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
