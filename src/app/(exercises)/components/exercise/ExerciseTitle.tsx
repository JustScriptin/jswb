import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { CategoryName } from "@/shared/types/exercise";
import { categoryColors } from "@/shared/constants/categories";

type ExerciseTitleProps = {
  category: {
    name: CategoryName;
    method: string;
  };
  title: string;
};

export function ExerciseTitle({ category, title }: ExerciseTitleProps) {
  const colors = categoryColors[category.name];

  return (
    <div className="mb-8 text-center">
      <div className="flex justify-center space-x-2 mb-4">
        <Badge
          className={cn(
            "text-sm font-medium border-transparent",
            colors.bg,
            colors.text,
          )}
        >
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
