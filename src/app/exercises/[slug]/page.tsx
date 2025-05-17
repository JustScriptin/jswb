import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseClient } from "@/features/codingChallenges/components/ExerciseClient";

type Props = {
  params: {
    slug: string;
  };
};

// Generate metadata for each exercise page
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const exercise = EXERCISES.find((ex) => ex.slug === slug);

  if (!exercise) {
    return {
      title: "Exercise Not Found",
    };
  }

  return {
    title: `${exercise.title} - Coding Exercise`,
    description: exercise.description,
    openGraph: {
      title: `${exercise.title} - Coding Exercise`,
      description: exercise.description,
      type: "article",
    },
  };
}

export default async function ExercisePage({ params }: Props): Promise<ReactElement> {
  const { slug } = await params;
  const exercise = EXERCISES.find((ex) => ex.slug === slug);

  if (!exercise) {
    notFound();
  }

  return <ExerciseClient exercise={exercise} />;
}
ExercisePage.displayName = "ExercisePage";

