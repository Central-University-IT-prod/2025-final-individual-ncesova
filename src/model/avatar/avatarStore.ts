import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAchievementsStore } from "@/model/achievements/achievementsStore";

interface AvatarStore {
  avatar: Avatar;
  setAvatar: (avatar: Avatar) => void;
  updateAvatar: (updates: Partial<Avatar>) => void;
  toggleAccessory: (accessoryId: string) => void;
  decreaseRandomStat: () => void;
}

const initialAvatar: Avatar = {
  skinColor: "#fffbeb",
  hairColor: "#020617",
  bottomColor: "#155e75",
  isTShirt: false,
  shoeColor: "#475569",
  topColor: "#eef2ff",
  fatPercent: 30, // Higher number => more fat
  handsMuscles: 30, // Higher number => less muscles
  legsMuscle: 30, // Higher number => less muscles
  accessories: [],
};

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set) => ({
      avatar: initialAvatar,
      setAvatar: (avatar) => set({ avatar }),
      updateAvatar: (updates) =>
        set((state) => {
          const newAvatar = state.avatar
            ? { ...state.avatar, ...updates }
            : { ...initialAvatar, ...updates };

          // Проверяем достижения
          const achievements = useAchievementsStore.getState().achievements;
          const unlockAchievement =
            useAchievementsStore.getState().unlockAchievement;

          // Проверка трансформации тела
          if (
            newAvatar.fatPercent === 0 &&
            !achievements.find((a) => a.id === "body-transformation")?.unlocked
          ) {
            unlockAchievement("body-transformation");
          }

          // Проверка мышц рук
          if (
            newAvatar.handsMuscles === 0 &&
            !achievements.find((a) => a.id === "muscle-builder")?.unlocked
          ) {
            unlockAchievement("muscle-builder");
          }

          // Проверка мышц ног
          if (
            newAvatar.legsMuscle === 0 &&
            !achievements.find((a) => a.id === "leg-day")?.unlocked
          ) {
            unlockAchievement("leg-day");
          }

          return { avatar: newAvatar };
        }),
      toggleAccessory: (accessoryId) =>
        set((state) => {
          if (!state.avatar) return { avatar: initialAvatar };

          const existingAccessoryIndex = state.avatar.accessories.findIndex(
            (acc) => acc.id === accessoryId,
          );

          const updatedAccessories =
            existingAccessoryIndex >= 0
              ? state.avatar.accessories.map((acc, index) =>
                  index === existingAccessoryIndex
                    ? { ...acc, isUsed: !acc.isUsed }
                    : acc,
                )
              : state.avatar.accessories;

          return {
            avatar: {
              ...state.avatar,
              accessories: updatedAccessories,
            },
          };
        }),
      decreaseRandomStat: () =>
        set((state) => {
          if (!state.avatar) return { avatar: initialAvatar };

          const stats = ["fatPercent", "handsMuscles", "legsMuscle"] as const;
          const randomStat = stats[Math.floor(Math.random() * stats.length)];

          console.log("Improving random stat:", randomStat);

          return {
            avatar: {
              ...state.avatar,
              [randomStat]: Math.max(0, (state.avatar[randomStat] || 30) - 3),
            },
          };
        }),
    }),
    {
      name: "avatar-storage",
    },
  ),
);
