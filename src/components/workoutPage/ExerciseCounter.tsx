import { Button } from "@/shared/components/ui/button";

interface ExerciseCounterProps {
  goal: number;
  onComplete: () => void;
}

export default function ExerciseCounter({
  goal,
  onComplete,
}: ExerciseCounterProps) {
  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-background">
        <div className="text-2xl">Цель</div>
        <div className="text-4xl font-bold">{goal} повторений</div>
      </div>
      <Button onClick={handleComplete} className="w-full">
        Завершить подход
      </Button>
    </div>
  );
}
