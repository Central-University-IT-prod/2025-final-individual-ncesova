import { useTimer } from "react-timer-hook";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";

interface ExerciseTimerProps {
  duration: number;
  onComplete: () => void;
  onPause?: () => void;
}

export default function ExerciseTimer({
  duration,
  onComplete,
  onPause,
}: ExerciseTimerProps) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + duration);

  const { seconds, pause, resume, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: onComplete,
    autoStart: true,
  });

  const handlePause = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
    onPause?.();
  };

  const progress = ((duration - seconds) / duration) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center text-4xl font-bold text-background">
        {seconds}с
      </div>
      <Progress value={progress} className="h-3" />
      <Button onClick={handlePause} variant="outline">
        {isRunning ? "Пауза" : "Продолжить"}
      </Button>
    </div>
  );
}
