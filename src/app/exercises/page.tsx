import { EXERCISES } from "@/features/codingChallenges/data/exercisesData";
import { ExerciseCard } from "@/features/codingChallenges/components/ExerciseCard";

export default function ExercisesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Coding Challenges</h1>
        <p className="text-muted-foreground">
          Practice your JavaScript array methods with these interactive challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXERCISES.map((exercise) => (
          <ExerciseCard 
            key={exercise.slug} 
            exercise={exercise} 
          />
        ))}
      </div>
    </div>
  );
} 