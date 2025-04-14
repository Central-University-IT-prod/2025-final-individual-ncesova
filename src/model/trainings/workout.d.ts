type WorkoutState = {
  currentExerciseIndex: number;
  timeSpent: number;
  totalReps: number;
  skippedExercises: number;
  restTime: number;
  status: "exercise" | "rest" | "completed";
  points: number;
};

type ExerciseResult = {
  exerciseId: string;
  completed: boolean;
  timeSpent?: number;
  reps?: number;
};

type WorkoutResult = {
  trainingId: string;
  date: Date;
  timeSpent: number;
  totalReps: number;
  skippedExercises: number;
  exercises: ExerciseResult[];
  points: number;
};

type WorkoutSettings = {
  defaultRestTime: number;
  pointsPerExercise: number;
  pointsPerMinute: number;
};
