import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

interface WorkoutSummaryProps {
  result: WorkoutResult;
}

export default function WorkoutSummary({ result }: WorkoutSummaryProps) {
  const navigate = useNavigate();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-background">
        Тренировка завершена!
      </h2>

      <div className="space-y-4 rounded-lg bg-background p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              Время тренировки
            </div>
            <div className="text-xl font-bold">
              {formatTime(result.timeSpent)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              Всего повторений
            </div>
            <div className="text-xl font-bold">{result.totalReps}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              Пропущено упражнений
            </div>
            <div className="text-xl font-bold">{result.skippedExercises}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              Заработано очков
            </div>
            <div className="text-xl font-bold">{result.points}</div>
          </div>
        </div>
      </div>

      <Button onClick={() => navigate({ to: "/trainings" })} className="w-full">
        Завершить
      </Button>
    </div>
  );
}
