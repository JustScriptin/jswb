import { notFound } from "next/navigation";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseClient } from "@/app/exercises/[slug]/ExerciseClient";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ExercisePage({ params }: Props) {
  const { slug } = await params;
  const exercise = EXERCISES.find((ex) => ex.slug === slug);

  if (!exercise) {
    notFound();
  }

  return <ExerciseClient exercise={exercise} />;
}

