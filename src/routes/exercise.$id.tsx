import ExerciseEditForm from "@/components/exercisePage/ExerciseEditForm";
import { useExercisesStore } from "@/model/exercises/exercisesStore";
import Scaffold from "@/shared/components/Scaffold";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exercise/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const exercise = useExercisesStore((store) =>
    store.exercises.find((ex) => ex.id === id),
  );
  const { updateExerciseById, removeExerciseById } = useExercisesStore();

  if (!exercise) {
    return (
      <Scaffold title={"Упражнение не найдено"} backButtonTo="/exercises">
        <div>Простите, ничего не найдено</div>
      </Scaffold>
    );
  }

  return (
    <Scaffold title={exercise?.name ?? "Ошибка"} backButtonTo="/exercises">
      <div className="grid md:grid-cols-2">
        <div className="flex aspect-video max-h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-white">
          <video
            src={exercise.videoUrl}
            autoPlay
            muted
            loop
            className="h-full"
          />
        </div>
        <div>
          <ExerciseEditForm
            exercise={exercise}
            callback={updateExerciseById}
            onDelete={removeExerciseById}
          />
        </div>
      </div>
    </Scaffold>
  );
}
