import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { CategoryName } from "@/shared/types/exercise";
import { categoryColors } from "@/shared/constants/categories";

export type CategoryObject = {
  name: CategoryName;
  label: string;
  color: string;
};

export type ExerciseTitleProps = {
  category: CategoryObject;
  title: string;
};

export function ExerciseTitle({ category, title }: ExerciseTitleProps) {
  const { name, label } = category;
  const colorClass = categoryColors[name] || "bg-gray-100 text-gray-800";

  return (
    <div className="mb-6 flex flex-col gap-2" data-component="ExerciseTitle">
      <Badge
        className={cn(
          "w-fit text-xs font-medium uppercase tracking-wider",
          colorClass,
        )}
      >
        {label}
      </Badge>
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
    </div>
  );
}

ExerciseTitle.displayName = "ExerciseTitle";
