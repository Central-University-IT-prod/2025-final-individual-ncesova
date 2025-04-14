import { useTimer } from "react-timer-hook";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

interface RestTimerProps {
  duration: number;
  onComplete: () => void;
  onAdjustTime: (adjustment: number) => void;
}

export default function RestTimer({
  duration,
  onComplete,
  onAdjustTime,
}: RestTimerProps) {
  const isFirstRender = useRef(true);
  const expiryTimestamp = new Date();

  // Устанавливаем 60 секунд при первом рендере
  if (isFirstRender.current) {
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);
    isFirstRender.current = false;
  } else {
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + duration);
  }

  const { seconds, restart } = useTimer({
    expiryTimestamp,
    onExpire: onComplete,
    autoStart: true,
  });

  const handleAdjustTime = (adjustment: number) => {
    const newTime = Math.max(0, seconds + adjustment);
    onAdjustTime(adjustment);

    if (newTime === 0) {
      onComplete();
      return;
    }

    const newExpiryTimestamp = new Date();
    newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + newTime);
    restart(newExpiryTimestamp);
  };

  const progress = ((duration - seconds) / duration) * 100;

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl text-background">Отдых</h2>
      <div className="text-center text-4xl font-bold text-background">
        {seconds}с
      </div>
      <Progress value={progress} className="h-3" />
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAdjustTime(-10)}
          disabled={seconds <= 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAdjustTime(10)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
