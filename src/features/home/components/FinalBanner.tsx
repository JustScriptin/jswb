import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalBanner() {
  return (
    <section
      data-component="FinalBanner"
      className="flex min-h-[480px] flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-background"
    >
      <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
        Ready to build muscle memory?
      </h2>
      <Button size="lg" className="text-lg" asChild>
        <Link href="/exercises">Start the Challenges</Link>
      </Button>
    </section>
  );
}
FinalBanner.displayName = "FinalBanner";
