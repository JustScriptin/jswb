import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-primary/10", {
  variants: {
    variant: {
      default: "",
      card: "border border-input",
      avatar: "rounded-full",
    },
    size: {
      default: "",
      sm: "h-4 w-16",
      md: "h-6 w-24",
      lg: "h-8 w-32",
      xl: "h-10 w-40",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, variant, size, ...props }: SkeletonProps) {
  return (
    <div
      data-component="Skeleton"
      className={cn(skeletonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
