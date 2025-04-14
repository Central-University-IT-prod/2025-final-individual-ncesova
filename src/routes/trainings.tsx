import AddTrainingButton from "@/components/trainingsPage/AddTrainingButton";
import TrainingItem from "@/components/trainingsPage/TrainingItem";
import { useTrainingsStore } from "@/model/trainings/trainingsStore";
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

export const Route = createFileRoute("/trainings")({
  component: RouteComponent,
});

function RouteComponent() {
  const trainings = useTrainingsStore((store) => store.trainings);
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedTrainings = useMemo(() => {
    return [...trainings].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "exercises":
          return b.exercises.length - a.exercises.length;
        default:
          return 0;
      }
    });
  }, [trainings, sortBy]);

  return (
    <Scaffold title="Тренировки" backButtonTo="/" backButtonFrom="/trainings">
      <div className="flex w-full items-center justify-between gap-2 rounded-md bg-background p-2">
        <div className="flex items-center gap-2">
          <span>Сортировать по</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Умолчанию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Умолчанию</SelectItem>
              <SelectItem value="name">Имени</SelectItem>
              <SelectItem value="exercises">Количеству упражнений</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AddTrainingButton />
      <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTrainings.map((training) => (
          <TrainingItem training={training} key={training.name} />
        ))}
      </div>
    </Scaffold>
  );
}
