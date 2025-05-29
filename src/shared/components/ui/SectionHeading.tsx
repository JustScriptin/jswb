import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const sectionHeadingVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "font-semibold",
      subtle: "font-medium text-muted-foreground",
      large: "font-bold text-lg",
    },
    spacing: {
      default: "mb-2",
      tight: "mb-1",
      loose: "mb-4",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    spacing: "default",
  },
});

export type SectionHeadingProps = {
  icon: ReactNode;
  title: string;
  className?: string;
} & VariantProps<typeof sectionHeadingVariants>;

export function SectionHeading({
  icon,
  title,
  className,
  variant,
  spacing,
}: SectionHeadingProps) {
  return (
    <h3 className={cn(sectionHeadingVariants({ variant, spacing, className }))}>
      {icon}
      {title}
    </h3>
  );
}
SectionHeading.displayName = "SectionHeading";

export { sectionHeadingVariants };
