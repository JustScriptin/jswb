import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ExercisePage({ params }: Props) {
  // Wait for params to be available before accessing slug
  const { slug } = await params;
  const exercise = EXERCISES.find((ex) => ex.slug === slug);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6">
        {/* Exercise Header */}
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{exercise.title}</h1>
          <Badge variant="outline" className="capitalize">
            {exercise.category.name} - {exercise.category.method}
          </Badge>
        </div>

        {/* Exercise Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{exercise.description}</div>
          </CardContent>
        </Card>

        {/* Code Editor Section - Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
            <CardDescription>
              Write your solution below. The tests will verify your implementation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* CodeEditor component will be added here */}
            <div className="h-[400px] bg-muted rounded-md p-4">
              <pre className="font-mono text-sm">{exercise.starterCode}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Test Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Test Cases</CardTitle>
            <CardDescription>
              Your solution will be tested against these cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exercise.testCases.map((test, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <p className="font-medium mb-2">Test {index + 1}</p>
                  <div className="grid gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Input: </span>
                      <code className="bg-muted px-1 py-0.5 rounded">
                        {JSON.stringify(test.input)}
                      </code>
                    </div>
                    <div>
                      <span className="font-semibold">Expected: </span>
                      <code className="bg-muted px-1 py-0.5 rounded">
                        {JSON.stringify(test.expected)}
                      </code>
                    </div>
                    <p className="text-muted-foreground">{test.message}</p>
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