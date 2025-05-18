import { Skeleton } from "@/components/ui/skeleton";

export function ExercisePageSkeleton() {
  return (
    <div
      data-component="ExercisePageSkeleton"
      className="min-h-screen bg-background"
    >
      {/* Header Skeleton */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-6 w-[2px]" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>

      {/* Title Section Skeleton */}
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="mb-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* Main Content Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel */}
          <div>
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
          {/* Right Panel */}
          <div>
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
ExercisePageSkeleton.displayName = "ExercisePageSkeleton";
