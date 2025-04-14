import { useExercisesStore } from "@/model/exercises/exercisesStore";
import { useTrainingsStore } from "@/model/trainings/trainingsStore";
import Scaffold from "@/shared/components/Scaffold";
import { Button } from "@/shared/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import TrainingForm from "@/components/trainingsPage/TrainingForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useState } from "react";
import { Play, Edit } from "lucide-react";

export const Route = createFileRoute("/training/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [editMode, setEditMode] = useState(false);
  const training = useTrainingsStore((store) =>
    store.trainings.find((t) => t.id === id),
  );
  const exercises = useExercisesStore((state) => state.exercises);
  const updateTraining = useTrainingsStore((state) => state.updateTraining);

  if (!training) {
    return (
      <Scaffold title="Тренировка не найдена" backButtonTo="/trainings">
        <div>Простите, ничего не найдено</div>
      </Scaffold>
    );
  }

  const handleUpdate = (updatedTraining: Training) => {
    updateTraining(updatedTraining);
    setEditMode(false);
  };

  const getExerciseById = (id: string) => {
    return exercises.find((ex) => ex.id === id);
  };

  return (
    <Scaffold title={training.name} backButtonTo="/trainings">
      <div className="flex gap-2">
        <Link to="/training/$id/workout" params={{ id: training.id }}>
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            Начать тренировку
          </Button>
        </Link>
        <Dialog open={editMode} onOpenChange={setEditMode}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Редактировать
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Редактировать тренировку</DialogTitle>
            </DialogHeader>
            <div className="flex h-[calc(80vh-8rem)] flex-col">
              <TrainingForm
                onSuccess={handleUpdate}
                initialTraining={training}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 space-y-4">
        {training.exercises.map((exercise, index) => {
          const ex = getExerciseById(exercise.trainingId);
          if (!ex) return null;

          return (
            <div
              key={`${exercise.trainingId}-${index}`}
              className="flex items-center gap-4 rounded-lg bg-background p-4"
            >
              <img
                src={ex.coverUrl}
                alt={ex.name}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{ex.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {exercise.goal} {ex.goalType === "Время" ? "сек" : "раз"} ×{" "}
                  {exercise.quantity} подходов
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Scaffold>
  );
}
