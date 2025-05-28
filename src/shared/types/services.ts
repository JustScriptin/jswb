/**
 * Shared service type definitions
 */
import type { ReactElement } from "react";

export type ExerciseMDXContent = {
  frontmatter: {
    title: string;
    slug: string;
    category: string;
    method: string;
  };
  descriptionContent: ReactElement;
  educationContent: ReactElement;
  educationConcept: string;
  starterCode: string;
  testCases: {
    input: string;
    expected: string;
    description: string;
  }[];
};
