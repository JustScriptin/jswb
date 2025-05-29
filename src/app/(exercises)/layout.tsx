import type { ReactElement } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Method Learning | JSW",
  description:
    "Learn and practice JavaScript methods through interactive exercises and examples.",
};

export default function ExercisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <div
      data-component="ExercisesLayout"
      className="min-h-screen bg-background"
    >
      <main className="py-0 px-0 sm:container sm:mx-auto sm:py-8 sm:px-4">
        {children}
      </main>
    </div>
  );
}
ExercisesLayout.displayName = "ExercisesLayout";
