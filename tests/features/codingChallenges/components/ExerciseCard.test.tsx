import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ExerciseCard } from "@/features/codingChallenges";
import { EXERCISES } from "@/features/codingChallenges";

jest.mock("react-syntax-highlighter", () => ({ Prism: {} }));
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({}));
jest.mock("rehype-sanitize", () => ({}));
jest.mock("remark-gfm", () => ({}));
jest.mock("lucide-react", () => new Proxy({}, { get: () => () => <svg /> }));
jest.mock("react-markdown", () => (props: { children: React.ReactNode }) => (
  <div>{props.children}</div>
));
describe("ExerciseCard", () => {
  it("links to the exercise page and shows title", () => {
    const exercise = EXERCISES[0]!;
    render(<ExerciseCard exercise={exercise} />);
    expect(screen.getByText(exercise.title)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/exercises/${exercise.slug}`);
  });
});
