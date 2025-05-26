import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ExerciseCard } from "@/features/codingChallenges";
import { EXERCISES, categoryColors } from "@/features/codingChallenges";

jest.mock("next-mdx-remote", () => ({
  MDXRemote: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  serialize: jest.fn(),
}));

jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));

describe("ExerciseCard", () => {
  it("links to the exercise page and shows title", () => {
    const exercise = EXERCISES[0]!;
    const colors = categoryColors[exercise.category.name];

    render(<ExerciseCard exercise={exercise} categoryColors={colors} />);
    expect(screen.getByText(exercise.title)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/exercises/${exercise.slug}`);
  });

  it("applies category colors correctly", () => {
    const exercise = EXERCISES[0]!;
    const colors = categoryColors[exercise.category.name];

    render(<ExerciseCard exercise={exercise} categoryColors={colors} />);

    const categoryBadge = screen.getByText(exercise.category.name);
    expect(categoryBadge).toBeInTheDocument();

    // Check that the badge has the expected classes
    expect(categoryBadge).toHaveClass("capitalize", "border-transparent");

    // Check that category-specific color classes are applied
    expect(categoryBadge.className).toContain(colors.bg.replace("bg-", ""));
    expect(categoryBadge.className).toContain(colors.text.replace("text-", ""));
  });

  it("displays exercise metadata correctly", () => {
    const exercise = EXERCISES[0]!;
    const colors = categoryColors[exercise.category.name];

    render(<ExerciseCard exercise={exercise} categoryColors={colors} />);

    // Check category and method badges
    expect(screen.getByText(exercise.category.name)).toBeInTheDocument();
    expect(screen.getByText(exercise.category.method)).toBeInTheDocument();

    // Check test cases count
    expect(
      screen.getByText(`${exercise.testCases.length} test cases`),
    ).toBeInTheDocument();
  });
});
