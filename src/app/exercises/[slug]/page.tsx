import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseClient } from "@/app/exercises/[slug]/ExerciseClient";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type Props = {
  params: {
    slug: string;
  };
};

// Generate metadata for each exercise page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
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

export default async function ExercisePage({ params }: Props) {
  const { slug } = await params;
  const exercise = EXERCISES.find((ex) => ex.slug === slug);

  if (!exercise) {
    notFound();
  }

  return (
    <Suspense 
      fallback={
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <ExerciseClient exercise={exercise} />
    </Suspense>
  );
}

