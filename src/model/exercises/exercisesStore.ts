import { create } from "zustand";
import exercises from "./default_exercises.json";
import { persist } from "zustand/middleware";

interface ExercisesStore {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  updateExerciseById: (exerciseId: string, exercise: Exercise) => void;
  removeExerciseById: (exerciseId: string) => void;
}

const initialExercisesState = exercises as Exercise[];

export const useExercisesStore = create<ExercisesStore>()(
  persist(
    (set) => ({
      exercises: initialExercisesState,
      addExercise: (exercise: Exercise) =>
        set((state) => ({
          exercises: [...state.exercises, exercise],
        })),
      updateExerciseById: (exerciseId: string, exercise: Exercise) =>
        set((state) => ({
          exercises: state.exercises.map((e) =>
            e.id === exerciseId ? exercise : e,
          ),
        })),
      removeExerciseById: (exerciseId: string) =>
        set((state) => ({
          exercises: state.exercises.filter((e) => e.id !== exerciseId),
        })),
    }),
    {
      name: "exercises-storage",
    },
  ),
);
