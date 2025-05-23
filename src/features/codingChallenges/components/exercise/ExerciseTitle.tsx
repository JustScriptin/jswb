import { Badge } from "@/components/ui/badge";
import type { Category } from "@/features/codingChallenges/types";

type ExerciseTitleProps = {
  category: Category;
  title: string;
};

export function ExerciseTitle({ category, title }: ExerciseTitleProps) {
  return (
    <div className="mb-8 text-center">
      <div className="flex justify-center space-x-2 mb-4">
        <Badge variant="secondary" className="text-sm font-medium">
          {category.name}
        </Badge>
        <Badge variant="outline" className="text-sm font-medium">
          {category.method}
        </Badge>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground">
        Learn and understand JavaScript methods through practical examples
      </p>
    </div>
  );
}

ExerciseTitle.displayName = "ExerciseTitle";
