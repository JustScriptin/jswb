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
    <div className="mb-4 sm:mb-8 text-center px-3 sm:px-0">
      <div className="flex flex-wrap justify-center gap-2 mb-3 sm:mb-4">
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
      <h1 className="scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl mb-3 sm:mb-4">
        {title}
      </h1>
      <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
        Learn and understand JavaScript methods through practical examples
      </p>
    </div>
  );
}

ExerciseTitle.displayName = "ExerciseTitle";
