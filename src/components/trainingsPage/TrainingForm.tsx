import { useExercisesStore } from "@/model/exercises/exercisesStore";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useState } from "react";
import { DialogClose } from "@/shared/components/ui/dialog";
import { useUserStore } from "@/model/user/userStore";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
  onSuccess?: (training: Training) => void;
  initialTraining?: Training;
}

const defaultTraining: Training = {
  id: crypto.randomUUID(),
  name: "",
  exercises: [],
};

// Simple formulas for exercise goals based on user parameters
const calculateGoal = (exercise: Exercise, weight: number): number => {
  switch (exercise.goalType) {
    case "Повторения":
      // Гарантируем минимальное значение 1
      return Math.max(1, Math.round(15 - exercise.difficulty.length * 3));
    case "Время":
      return 30; // 30 seconds default
    case "Вес":
      // 30-50% of user's weight depending on difficulty
      const percentage =
        exercise.difficulty === "easy"
          ? 0.3
          : exercise.difficulty === "medium"
            ? 0.4
            : 0.5;
      return Math.round(weight * percentage);
    default:
      return 10;
  }
};

const isHighLoad = (exercise: Exercise, goal: number): boolean => {
  switch (exercise.goalType) {
    case "Повторения":
      return goal > 30;
    case "Время":
      return goal > 120; // More than 2 minutes
    case "Вес":
      return goal > 100; // More than 100kg
    default:
      return false;
  }
};

export default function TrainingForm({ onSuccess, initialTraining }: Props) {
  const [training, setTraining] = useState<Training>(
    initialTraining || defaultTraining,
  );
  const [selectedBodyParts, setSelectedBodyParts] = useState<BodyPart[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const exercises = useExercisesStore((state) => state.exercises);
  const userWeight = useUserStore((state) => state.bodyStats.weight) || 70;

  const filteredExercises =
    selectedBodyParts.length > 0
      ? exercises.filter((ex) =>
          ex.trains.some((part) => selectedBodyParts.includes(part)),
        )
      : exercises;

  const handleAddExercise = (exerciseId: string) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (!exercise) return;

    const goal = calculateGoal(exercise, userWeight);

    setTraining((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          trainingId: exerciseId,
          goal,
          quantity: 3,
        },
      ],
    }));
  };

  const handleUpdateExercise = (
    index: number,
    field: keyof TrainingExercise,
    value: number,
  ) => {
    const exercise = exercises.find(
      (ex) => ex.id === training.exercises[index].trainingId,
    );
    if (!exercise) return;

    const newValue = Number(value);
    if (isHighLoad(exercise, newValue)) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, [field]: newValue } : ex,
      ),
    }));
  };

  const handleRemoveExercise = (index: number) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleAutoSelect = () => {
    if (selectedBodyParts.length === 0) return;

    const autoSelectedExercises = filteredExercises
      .slice(0, 3)
      .map((exercise) => ({
        trainingId: exercise.id,
        goal: calculateGoal(exercise, userWeight),
        quantity: 3,
      }));

    setTraining((prev) => ({
      ...prev,
      exercises: autoSelectedExercises,
    }));
  };

  const handleSubmit = () => {
    if (!training.name || training.exercises.length === 0) return;
    onSuccess?.(training);
  };

  const handleExerciseChange = (
    index: number,
    field: keyof TrainingExercise,
    value: string,
  ) => {
    const exercises = [...training.exercises];

    if (field === "goal" || field === "quantity") {
      // Гарантируем минимальное значение 1
      const numValue = Math.max(1, parseInt(value) || 1);
      exercises[index] = {
        ...exercises[index],
        [field]: numValue,
      };
    } else {
      exercises[index] = {
        ...exercises[index],
        [field]: value,
      };
    }

    setTraining((prev) => ({
      ...prev,
      exercises,
    }));
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <Label htmlFor="name">Название тренировки</Label>
        <Input
          id="name"
          value={training.name}
          onChange={(e) =>
            setTraining((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Введите название тренировки"
        />
      </div>

      <div>
        <Label>Выберите части тела для тренировки</Label>
        <div className="flex flex-wrap gap-2">
          {["Ноги", "Ягодицы", "Пресс", "Руки", "Спина"].map((part) => (
            <div key={part} className="flex items-center space-x-2">
              <Checkbox
                id={part}
                checked={selectedBodyParts.includes(part as BodyPart)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBodyParts((prev) => [...prev, part as BodyPart]);
                  } else {
                    setSelectedBodyParts((prev) =>
                      prev.filter((p) => p !== part),
                    );
                  }
                }}
              />
              <Label htmlFor={part}>{part}</Label>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          className="mt-2"
          onClick={handleAutoSelect}
          disabled={selectedBodyParts.length === 0}
        >
          Автоподбор упражнений
        </Button>
      </div>

      <div>
        <Label>Добавить упражнение</Label>
        <Select onValueChange={handleAddExercise}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите упражнение" />
          </SelectTrigger>
          <SelectContent>
            {filteredExercises.map((exercise) => (
              <SelectItem key={exercise.id} value={exercise.id}>
                {exercise.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showWarning && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Внимание! Указана слишком высокая нагрузка. Рекомендуется уменьшить
            количество повторений/время.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {training.exercises.map((trainingExercise, index) => {
          const exercise = exercises.find(
            (ex) => ex.id === trainingExercise.trainingId,
          );
          if (!exercise) return null;

          return (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <div className="flex-1">
                <div className="font-bold">{exercise.name}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>
                      {exercise.goalType === "Время"
                        ? "Время (сек)"
                        : exercise.goalType === "Вес"
                          ? "Вес (кг)"
                          : "Повторения"}
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={trainingExercise.goal.toString()}
                      onChange={(e) =>
                        handleExerciseChange(index, "goal", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Подходы</Label>
                    <Input
                      type="number"
                      min="1"
                      value={trainingExercise.quantity.toString()}
                      onChange={(e) =>
                        handleExerciseChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveExercise(index)}
              >
                Удалить
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline">Отмена</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={handleSubmit}
            disabled={!training.name || training.exercises.length === 0}
          >
            {initialTraining ? "Сохранить" : "Создать"}
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
