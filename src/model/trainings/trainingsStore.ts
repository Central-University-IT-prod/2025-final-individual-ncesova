import { create } from "zustand";
import { persist } from "zustand/middleware";
import initialTrainingsJson from "./initial_trainings.json";

interface TrainingsStore {
  trainings: Training[];
  addTraining: (training: Training) => void;
  updateTraining: (training: Training) => void;
  removeTraining: (training: Training) => void;
}

const inititialTrainings = initialTrainingsJson as Training[];

export const useTrainingsStore = create<TrainingsStore>()(
  persist(
    (set) => ({
      trainings: inititialTrainings,
      addTraining: (training: Training) =>
        set((state) => ({
          trainings: [...state.trainings, training],
        })),
      updateTraining: (training: Training) =>
        set((state) => ({
          trainings: state.trainings.map((t) =>
            t.id === training.id ? training : t,
          ),
        })),
      removeTraining: (training: Training) =>
        set((state) => ({
          trainings: state.trainings.filter((t) => t.id !== training.id),
        })),
    }),
    {
      name: "trainings-storage",
    },
  ),
);
