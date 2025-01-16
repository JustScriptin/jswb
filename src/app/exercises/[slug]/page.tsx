import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseClient } from "@/app/exercises/[slug]/ExerciseClient";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="min-h-screen bg-background">
          {/* Header Skeleton */}
          <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-6 w-[2px]" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          </div>

          {/* Title Section Skeleton */}
          <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
            <div className="mb-8 text-center">
              <div className="flex justify-center space-x-2 mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>

            {/* Main Content Skeleton */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Panel */}
              <div>
                <Skeleton className="h-[600px] w-full rounded-lg" />
              </div>
              {/* Right Panel */}
              <div>
                <Skeleton className="h-[600px] w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ExerciseClient exercise={exercise} />
    </Suspense>
  );
}

