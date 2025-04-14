import { useAchievementsStore } from "@/model/achievements/achievementsStore";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card";
import { cn } from "@/shared/lib/utils";

const rarityColors = {
  Обычная: "bg-gray-200",
  Необычная: "bg-blue-200",
  Редкая: "bg-purple-200",
  "Супер редкая": "bg-yellow-200",
} as const;

export default function AchievementsList() {
  const achievements = useAchievementsStore((s) => s.achievements);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <HoverCard key={achievement.id}>
          <HoverCardTrigger asChild>
            <div
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4",
                achievement.unlocked
                  ? rarityColors[achievement.rarity]
                  : "bg-gray-100 opacity-50",
              )}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.rarity}
                </p>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div>
              <p>{achievement.description}</p>
              {achievement.unlocked && achievement.date && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Получено: {new Date(achievement.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
