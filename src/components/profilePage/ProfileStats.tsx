import { useUserStore } from "@/model/user/userStore";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function ProfileStats() {
  const { points, workoutHistory, bodyStats } = useUserStore();
  const currentStreak = useUserStore((s) => s.currentStreak);

  const calculateAge = (birthDate: Date | null | string) => {
    if (!birthDate) return null;
    const birthDateObj =
      birthDate instanceof Date ? birthDate : new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const totalWorkouts = workoutHistory.length;
  const totalTime = workoutHistory.reduce(
    (acc, curr) => acc + curr.timeSpent,
    0,
  );
  const age = calculateAge(bodyStats.dateOfBirth);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md bg-background p-4">
        <h2 className="text-xl font-bold">Статистика</h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Очки</div>
            <div className="text-2xl font-bold">{points}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Тренировок</div>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              Время тренировок (мин)
            </div>
            <div className="text-2xl font-bold">
              {Math.round(totalTime / 60)}
            </div>
          </div>
          {age && (
            <div>
              <div className="text-sm text-muted-foreground">Возраст</div>
              <div className="text-2xl font-bold">{age}</div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md bg-background p-4">
        <h2 className="text-xl font-bold">История тренировок</h2>
        <div className="mt-4 h-[300px] space-y-2 overflow-y-auto pr-2">
          {workoutHistory
            .slice()
            .reverse()
            .map((workout, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div>
                  <div className="font-medium">
                    {format(new Date(workout.date), "d MMMM", { locale: ru })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(workout.timeSpent / 60)} мин •{" "}
                    {workout.totalReps} повторений
                  </div>
                </div>
                <div className="text-xl font-bold">+{workout.points}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="rounded-md bg-background p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <p className="font-semibold">Серия тренировок</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{currentStreak}</p>
              <p className="text-sm text-muted-foreground">
                {currentStreak === 1 ? "день" : "дней"} подряд
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
