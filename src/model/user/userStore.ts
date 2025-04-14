import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  bodyStats: BodyStats;
  points: number;
  workoutHistory: WorkoutResult[];
  lastLoginDate: Date | null;
  currentStreak: number;
  setBodyStats: (stats: Partial<BodyStats>) => void;
  addWorkoutResult: (result: WorkoutResult) => void;
  updateLoginStreak: () => void;
}

const initialBodyStats: BodyStats = {
  isFirstTime: true,
  name: null,
  sex: null,
  dateOfBirth: null,
  weight: null,
  height: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      bodyStats: initialBodyStats,
      points: 1000,
      workoutHistory: [],
      lastLoginDate: null,
      currentStreak: 0,
      setBodyStats: (stats) =>
        set((state) => ({
          bodyStats: { ...state.bodyStats, ...stats },
        })),
      addWorkoutResult: (result) =>
        set((state) => ({
          workoutHistory: [...state.workoutHistory, result],
          points: state.points + result.points,
        })),
      updateLoginStreak: () =>
        set((state) => {
          const today = new Date();
          const lastLogin = state.lastLoginDate
            ? new Date(state.lastLoginDate)
            : null;

          // Если это первый вход
          if (!lastLogin) {
            return {
              lastLoginDate: today,
              currentStreak: 1,
            };
          }

          // Проверяем, был ли последний вход вчера
          const isYesterday =
            today.getDate() - lastLogin.getDate() === 1 &&
            today.getMonth() === lastLogin.getMonth() &&
            today.getFullYear() === lastLogin.getFullYear();

          // Проверяем, был ли вход сегодня
          const isToday =
            today.getDate() === lastLogin.getDate() &&
            today.getMonth() === lastLogin.getMonth() &&
            today.getFullYear() === lastLogin.getFullYear();

          if (isYesterday) {
            // Если вход был вчера, увеличиваем streak
            return {
              lastLoginDate: today,
              currentStreak: state.currentStreak + 1,
            };
          } else if (isToday) {
            // Если вход был сегодня, не меняем streak
            return state;
          } else {
            // Если пропущен день, сбрасываем streak
            return {
              lastLoginDate: today,
              currentStreak: 1,
            };
          }
        }),
    }),
    {
      name: "user-storage",
    },
  ),
);
