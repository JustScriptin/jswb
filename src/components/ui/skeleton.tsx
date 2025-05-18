import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-component="Skeleton"
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}
Skeleton.displayName = "Skeleton";

export { Skeleton };
