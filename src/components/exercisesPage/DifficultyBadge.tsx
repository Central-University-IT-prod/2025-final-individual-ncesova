import { cn } from "@/shared/lib/utils";
import { Star } from "lucide-react";

interface Props {
  difficulty: Difficulty;
  className?: string;
}

const styles = {
  easy: { stars: 1, color: "bg-easy" },
  medium: { stars: 2, color: "bg-medium" },
  hard: { stars: 3, color: "bg-hard" },
};

export default function DifficultyBadge({ difficulty, className }: Props) {
  const style = styles[difficulty];
  const keys = [...Array(style.stars).keys()];
  return (
    <div
      className={cn(
        style.color,
        "flex w-16 justify-between rounded-3xl p-1 text-center",
        className,
      )}
    >
      {keys.map((key) => (
        <Star size={16} key={key} />
      ))}
    </div>
  );
}
