import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ExerciseCardMDX } from "@/app/(exercises)/exercises/components/ExerciseCardMDX";
import { EXERCISE_METADATA } from "@/shared/data/exerciseMetadata";
import { categoryColors as exerciseCategoryColors } from "@/app/(exercises)/_shared/constants";
import { getCategoryObject } from "@/shared/utils/categoryAdapter";

jest.mock("next-mdx-remote", () => ({
  MDXRemote: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  serialize: jest.fn(),
}));

jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));

describe("ExerciseCardMDX", () => {
  it("links to the exercise page and shows title", () => {
    const exerciseData = EXERCISE_METADATA[0]!;
    const exercise = {
      ...exerciseData,
      id: exerciseData.slug,
      tags: [],
      difficulty: "intermediate" as const,
    };
    const categoryObj = getCategoryObject(exercise.category);
    const colors = {
      ...exerciseCategoryColors[categoryObj.name],
      hover: "",
      active: "",
      darkBg: "",
      darkText: "",
      darkBorder: "",
      darkHover: "",
      darkActive: "",
    };

    render(<ExerciseCardMDX exercise={exercise} categoryColors={colors} />);
    expect(screen.getByText(exercise.title)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/exercises/${exercise.slug}`);
  });

  it("applies category colors correctly", () => {
    const exerciseData = EXERCISE_METADATA[0]!;
    const exercise = {
      ...exerciseData,
      id: exerciseData.slug,
      tags: [],
      difficulty: "intermediate" as const,
    };
    const categoryObj = getCategoryObject(exercise.category);
    const colors = {
      ...exerciseCategoryColors[categoryObj.name],
      hover: "",
      active: "",
      darkBg: "",
      darkText: "",
      darkBorder: "",
      darkHover: "",
      darkActive: "",
    };

    render(<ExerciseCardMDX exercise={exercise} categoryColors={colors} />);

    const categoryBadge = screen.getByText(categoryObj.name);
    expect(categoryBadge).toBeInTheDocument();

    // Check that the badge has the expected classes
    expect(categoryBadge).toHaveClass("capitalize", "border-transparent");

    // Check that category-specific color classes are applied
    expect(categoryBadge.className).toContain(colors.bg.replace("bg-", ""));
    expect(categoryBadge.className).toContain(colors.text.replace("text-", ""));
  });

  it("displays exercise metadata correctly", () => {
    const exerciseData = EXERCISE_METADATA[0]!;
    const exercise = {
      ...exerciseData,
      id: exerciseData.slug,
      tags: [],
      difficulty: "intermediate" as const,
    };
    const categoryObj = getCategoryObject(exercise.category);
    const colors = {
      ...exerciseCategoryColors[categoryObj.name],
      hover: "",
      active: "",
      darkBg: "",
      darkText: "",
      darkBorder: "",
      darkHover: "",
      darkActive: "",
    };

    render(<ExerciseCardMDX exercise={exercise} categoryColors={colors} />);

    // Check category and method badges
    expect(screen.getByText(categoryObj.name)).toBeInTheDocument();
    expect(screen.getByText(categoryObj.label)).toBeInTheDocument();

    // Check test cases count
    expect(
      screen.getByText(`${exercise.testCases.length} test cases`),
    ).toBeInTheDocument();
  });
});
