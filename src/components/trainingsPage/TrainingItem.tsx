import { useExercisesStore } from "@/model/exercises/exercisesStore";
import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTrainingsStore } from "@/model/trainings/trainingsStore";

interface Props {
  training: Training;
}

export default function TrainingItem({ training }: Props) {
  const exercises = useExercisesStore((state) => state.exercises);
  const removeTraining = useTrainingsStore((state) => state.removeTraining);

  const getExerciseById = (id: string) => {
    return exercises.find((ex) => ex.id === id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    removeTraining(training);
  };

  return (
    <Link
      to="/training/$id"
      params={{ id: training.id }}
      className="relative grid h-48 w-full grid-cols-5 overflow-hidden rounded-md bg-background"
    >
      <Button
        onClick={handleDelete}
        variant="destructive"
        size="icon"
        className="absolute right-2 top-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <div className="col-span-2 grid grid-rows-2">
        {training.exercises.slice(0, 2).map((exercise, index) => {
          const ex = getExerciseById(exercise.trainingId);
          return ex ? (
            <img
              key={`${training.id}-${exercise.trainingId}-${index}`}
              className="h-full w-full object-cover"
              src={ex.coverUrl}
              alt=""
            />
          ) : null;
        })}
      </div>
      <div className="col-span-3 flex flex-col p-2">
        <span className="text-xl font-bold text-foreground">
          {training.name}
        </span>
        <div className="flex-1">
          <span className="text-sm text-muted-foreground">Упражнения:</span>
          <ul className="mt-1 space-y-1">
            {training.exercises.map((exercise, index) => {
              const ex = getExerciseById(exercise.trainingId);
              return (
                <li
                  key={`${training.id}-${exercise.trainingId}-${index}`}
                  className="text-sm"
                >
                  {ex?.name} - {exercise.goal}{" "}
                  {ex?.goalType === "Время" ? "сек" : "раз"} ×{" "}
                  {exercise.quantity}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
}
