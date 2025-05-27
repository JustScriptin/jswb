import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { categoryColors } from "@/features/codingChallenges/constants";
import type { Exercise } from "@/features/codingChallenges/types";
import { cn } from "@/lib/utils";

type CategoryColors = (typeof categoryColors)[keyof typeof categoryColors];

type ExerciseCardMDXProps = {
  exercise: Omit<Exercise, "description" | "education">;
  categoryColors: CategoryColors;
};

export function ExerciseCardMDX({
  exercise,
  categoryColors,
}: ExerciseCardMDXProps) {
  return (
    <Link
      data-component="ExerciseCardMDX"
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
            Practice {exercise.category.method} with this interactive coding
            challenge
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

ExerciseCardMDX.displayName = "ExerciseCardMDX";
