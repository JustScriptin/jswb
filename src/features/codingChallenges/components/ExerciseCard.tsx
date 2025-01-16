import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Challenge } from "../data/exercisesData";

type CategoryColors = {
  bg: string;
  text: string;
  border: string;
};

type ExerciseCardProps = {
  exercise: Challenge;
  categoryColors?: CategoryColors;
};

export function ExerciseCard({ exercise, categoryColors }: ExerciseCardProps) {
  // Get first line of description for the card preview
  const previewDescription = exercise.description.split('\n')[0];

  return (
    <Link 
      href={`/exercises/${exercise.slug}`}
      className="block transition-colors hover:bg-muted/50"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant="secondary" 
              className={cn(
                "capitalize",
                categoryColors?.bg,
                categoryColors?.text,
                categoryColors?.border
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