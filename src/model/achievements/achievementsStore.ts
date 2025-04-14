import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Achievement = {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  icon: string;
  unlocked: boolean;
  date?: Date;
};

interface AchievementsStore {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
}

const initialAchievements: Achievement[] = [
  // Тренировки
  {
    id: "first-workout",
    name: "Первая тренировка",
    description: "Завершите свою первую тренировку",
    rarity: "Обычная",
    icon: "🎯",
    unlocked: false,
  },
  {
    id: "workout-streak-3",
    name: "Три дня подряд",
    description: "Тренируйтесь три дня подряд",
    rarity: "Необычная",
    icon: "🔥",
    unlocked: false,
  },
  {
    id: "workout-streak-7",
    name: "Неделя силы",
    description: "Тренируйтесь семь дней подряд",
    rarity: "Редкая",
    icon: "💪",
    unlocked: false,
  },
  // Покупки
  {
    id: "first-purchase",
    name: "Первая покупка",
    description: "Купите первый предмет в магазине",
    rarity: "Обычная",
    icon: "🛍️",
    unlocked: false,
  },
  {
    id: "fashion-lover",
    name: "Модник",
    description: "Купите 5 предметов одежды",
    rarity: "Необычная",
    icon: "👕",
    unlocked: false,
  },
  // Прогресс
  {
    id: "body-transformation",
    name: "Трансформация",
    description: "Достигните нулевого процента жира",
    rarity: "Супер редкая",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: "muscle-builder",
    name: "Строитель мышц",
    description: "Прокачайте мышцы рук до максимума",
    rarity: "Редкая",
    icon: "💪",
    unlocked: false,
  },
  {
    id: "leg-day",
    name: "Не пропускаем ног",
    description: "Прокачайте мышцы ног до максимума",
    rarity: "Редкая",
    icon: "🦵",
    unlocked: false,
  },
  // Новые достижения для тренировок
  {
    id: "workout-master",
    name: "Мастер тренировок",
    description: "Выполните 50 тренировок",
    rarity: "Супер редкая",
    icon: "🎖️",
    unlocked: false,
  },
  {
    id: "no-skip",
    name: "Без пропусков",
    description: "Завершите тренировку без пропуска упражнений",
    rarity: "Необычная",
    icon: "✨",
    unlocked: false,
  },

  // Достижения для упражнений
  {
    id: "exercise-explorer",
    name: "Исследователь",
    description: "Попробуйте 20 разных упражнений",
    rarity: "Редкая",
    icon: "🔍",
    unlocked: false,
  },

  // Достижения для прогресса
  {
    id: "weight-goal",
    name: "Цель достигнута",
    description: "Достигните целевого веса",
    rarity: "Редкая",
    icon: "⚖️",
    unlocked: false,
  },
];

export const useAchievementsStore = create<AchievementsStore>()(
  persist(
    (set) => ({
      achievements: initialAchievements,
      unlockAchievement: (id: string) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id
              ? { ...achievement, unlocked: true, date: new Date() }
              : achievement,
          ),
        })),
    }),
    {
      name: "achievements-storage",
    },
  ),
);
