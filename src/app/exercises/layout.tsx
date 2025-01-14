import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding Challenges | JSW",
  description: "Practice your JavaScript array methods with interactive coding challenges.",
};

export default function ExercisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
} 