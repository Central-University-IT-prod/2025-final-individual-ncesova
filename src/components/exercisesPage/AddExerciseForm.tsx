import ExerciseEditForm from "../exercisePage/ExerciseEditForm";
import { useExercisesStore } from "@/model/exercises/exercisesStore";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

const defaultExercise: Exercise = {
  id: crypto.randomUUID(),
  name: "",
  description: "",
  instruction: [""],
  coverUrl: "",
  videoUrl: "",
  difficulty: "easy",
  equipment: [],
  trains: [],
  goalType: "Повторения",
  liked: false,
};

interface AddExerciseFormProps {
  onSuccess?: () => void;
}

export default function AddExerciseForm({ onSuccess }: AddExerciseFormProps) {
  const addExercise = useExercisesStore((state) => state.addExercise);
  const [exercise, setExercise] = useState(defaultExercise);

  const handleSubmit = () => {
    if (!exercise.name) return;
    addExercise(exercise);
    onSuccess?.();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <ExerciseEditForm
          exercise={exercise}
          callback={(_, updatedExercise) => {
            setExercise(updatedExercise);
          }}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2 border-t bg-background pt-4">
        <DialogClose asChild>
          <Button variant="outline">Отмена</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={handleSubmit} disabled={!exercise.name}>
            Создать
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
