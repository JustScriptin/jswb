import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { ExerciseCard } from "../ExerciseCard"
import { EXERCISES } from "@/features/codingChallenges/data/exercisesData"

describe("ExerciseCard", () => {
  it("links to the exercise page and shows title", () => {
    const exercise = EXERCISES[0]!;
    render(<ExerciseCard exercise={exercise} />)
    expect(screen.getByText(exercise.title)).toBeInTheDocument()
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", `/exercises/${exercise.slug}`)
  })
})
