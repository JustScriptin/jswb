import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6">
        {/* Exercise Header Skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-64 bg-muted rounded animate-pulse" />
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        </div>

        {/* Description Card Skeleton */}
        <Card>
          <CardHeader>
            <div className="h-7 w-32 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Code Editor Skeleton */}
        <Card>
          <CardHeader>
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
            <div className="h-5 w-64 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>

        {/* Test Cases Skeleton */}
        <Card>
          <CardHeader>
            <div className="h-7 w-28 bg-muted rounded animate-pulse" />
            <div className="h-5 w-56 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg border">
                  <div className="space-y-3">
                    <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 