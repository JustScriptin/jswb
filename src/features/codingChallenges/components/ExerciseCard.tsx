import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/features/codingChallenges/types";
import type { categoryColors } from "@/features/codingChallenges/constants";

type CategoryColors = (typeof categoryColors)[keyof typeof categoryColors];

type ExerciseCardProps = {
  exercise: Exercise;
  categoryColors: CategoryColors;
};

export function ExerciseCard({ exercise, categoryColors }: ExerciseCardProps) {
  // Get first line of description for the card preview
  const previewDescription = exercise.description.split("\n")[0];

  return (
    <Link
      data-component="ExerciseCard"
      href={`/exercises/${exercise.slug}`}
      className="block transition-colors hover:bg-muted/50"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              className={cn(
                "capitalize border-transparent",
                categoryColors.bg,
                categoryColors.text,
              )}
            >
              {exercise.category.name}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {exercise.category.method}
            </Badge>
          </div>
          <CardTitle className="line-clamp-2">{exercise.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {previewDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {exercise.testCases.length} test cases
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
ExerciseCard.displayName = "ExerciseCard";
