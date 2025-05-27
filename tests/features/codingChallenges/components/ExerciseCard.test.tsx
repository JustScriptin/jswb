import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ExerciseCardMDX } from "@/features/codingChallenges/components/ExerciseCardMDX";
import { EXERCISE_METADATA } from "@/features/codingChallenges/data/exerciseMetadata";
import { categoryColors } from "@/features/codingChallenges";

jest.mock("next-mdx-remote", () => ({
  MDXRemote: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  serialize: jest.fn(),
}));

jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));

describe("ExerciseCardMDX", () => {
  it("links to the exercise page and shows title", () => {
    const exercise = EXERCISE_METADATA[0]!;
    const colors = categoryColors[exercise.category.name];

    render(<ExerciseCardMDX exercise={exercise} categoryColors={colors} />);
    expect(screen.getByText(exercise.title)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/exercises/${exercise.slug}`);
  });

  it("applies category colors correctly", () => {
    const exercise = EXERCISE_METADATA[0]!;
    const colors = categoryColors[exercise.category.name];

    render(<ExerciseCardMDX exercise={exercise} categoryColors={colors} />);

    const categoryBadge = screen.getByText(exercise.category.name);
    expect(categoryBadge).toBeInTheDocument();

    // Check that the badge has the expected classes
    expect(categoryBadge).toHaveClass("capitalize", "border-transparent");

    // Check that category-specific color classes are applied
    expect(categoryBadge.className).toContain(colors.bg.replace("bg-", ""));
    expect(categoryBadge.className).toContain(colors.text.replace("text-", ""));
  });

  it("displays exercise metadata correctly", () => {
    const exercise = EXERCISE_METADATA[0]!;
    const colors = categoryColors[exercise.category.name];

    render(<ExerciseCardMDX exercise={exercise} categoryColors={colors} />);

    // Check category and method badges
    expect(screen.getByText(exercise.category.name)).toBeInTheDocument();
    expect(screen.getByText(exercise.category.method)).toBeInTheDocument();

    // Check test cases count
    expect(
      screen.getByText(`${exercise.testCases.length} test cases`),
    ).toBeInTheDocument();
  });
});
