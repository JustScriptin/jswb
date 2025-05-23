import type { ReactElement } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function NotFound(): ReactElement {
  return (
    <div
      data-component="ExerciseNotFound"
      className="container mx-auto py-8 px-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Exercise Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Sorry, the exercise you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/exercises" className="text-primary hover:underline">
            View all exercises
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
NotFound.displayName = "ExerciseNotFound";
