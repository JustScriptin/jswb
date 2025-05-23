import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

export function SectionHeading({
  icon,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <h3 className={cn("font-semibold mb-2 flex items-center gap-2", className)}>
      {icon}
      {title}
    </h3>
  );
}
SectionHeading.displayName = "SectionHeading"; 