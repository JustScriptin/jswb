import type { ReactElement } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Method Learning | JSW",
  description: "Learn and practice JavaScript methods through interactive exercises and examples.",
};

export default function ExercisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <div data-component="ExercisesLayout" className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
}
ExercisesLayout.displayName = "ExercisesLayout";
