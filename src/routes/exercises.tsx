import ExerciseItem from "@/components/exercisesPage/ExerciseItem";
import { useExercisesStore } from "@/model/exercises/exercisesStore";
import Scaffold from "@/shared/components/Scaffold";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import AddExerciseButton from "@/components/exercisesPage/AddExerciseButton";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

export const Route = createFileRoute("/exercises")({
  component: RouteComponent,
});

function RouteComponent() {
  const exercises = useExercisesStore((store) => store.exercises);
  const [sortBy, setSortBy] = useState<string>("default");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState<BodyPart[]>([]);

  const getDifficultyValue = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
    }
  };

  const filteredAndSortedExercises = useMemo(() => {
    let result = [...exercises];

    // Apply equipment filter
    if (selectedEquipment.length > 0) {
      result = result.filter((ex) =>
        ex.equipment.some((eq) => selectedEquipment.includes(eq)),
      );
    }

    // Apply body parts filter
    if (selectedBodyParts.length > 0) {
      result = result.filter((ex) =>
        ex.trains.some((part) => selectedBodyParts.includes(part)),
      );
    }

    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case "difficulty":
          return (
            getDifficultyValue(a.difficulty) - getDifficultyValue(b.difficulty)
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [exercises, sortBy, selectedEquipment, selectedBodyParts]);

  const allEquipment: Equipment[] = [
    "Ничего",
    "Гантели",
    "Коврик",
    "Гиря",
    "Скамья",
  ];
  const allBodyParts: BodyPart[] = [
    "Ноги",
    "Ягодицы",
    "Пресс",
    "Руки",
    "Спина",
  ];

  return (
    <Scaffold backButtonTo="/" backButtonFrom="/exercises" title="Упражнения">
      <div className="space-y-4 rounded-md bg-background p-4">
        <div className="flex items-center gap-4">
          <span>Сортировать по</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Умолчанию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Умолчанию</SelectItem>
              <SelectItem value="difficulty">Сложности</SelectItem>
              <SelectItem value="name">Имени</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Оборудование</Label>
          <div className="flex flex-wrap gap-4">
            {allEquipment.map((equipment) => (
              <div key={equipment} className="flex items-center space-x-2">
                <Checkbox
                  id={`equipment-${equipment}`}
                  checked={selectedEquipment.includes(equipment)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedEquipment((prev) => [...prev, equipment]);
                    } else {
                      setSelectedEquipment((prev) =>
                        prev.filter((eq) => eq !== equipment),
                      );
                    }
                  }}
                />
                <Label htmlFor={`equipment-${equipment}`}>{equipment}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Части тела</Label>
          <div className="flex flex-wrap gap-4">
            {allBodyParts.map((part) => (
              <div key={part} className="flex items-center space-x-2">
                <Checkbox
                  id={`bodypart-${part}`}
                  checked={selectedBodyParts.includes(part)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBodyParts((prev) => [...prev, part]);
                    } else {
                      setSelectedBodyParts((prev) =>
                        prev.filter((p) => p !== part),
                      );
                    }
                  }}
                />
                <Label htmlFor={`bodypart-${part}`}>{part}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddExerciseButton />

      <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedExercises.map((exercise) => (
          <ExerciseItem exercise={exercise} key={exercise.id} />
        ))}
      </div>
    </Scaffold>
  );
}
