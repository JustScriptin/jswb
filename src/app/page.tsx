import type { ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home(): ReactElement {
  return (
    <section
      data-component="HomePage"
      className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        JavaScript Methods Learning
      </h1>
      <p className="text-lg text-muted-foreground">
        Practice essential JavaScript methods through short, interactive
        exercises.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/exercises">Browse Exercises</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/exercises">Start Now</Link>
        </Button>
      </div>
    </section>
  );
}
Home.displayName = "Home";
