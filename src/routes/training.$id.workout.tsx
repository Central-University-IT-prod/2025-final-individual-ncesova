import { useExercisesStore } from "@/model/exercises/exercisesStore";
import { useTrainingsStore } from "@/model/trainings/trainingsStore";
import { useUserStore } from "@/model/user/userStore";
import Scaffold from "@/shared/components/Scaffold";
import { Button } from "@/shared/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import ExerciseTimer from "@/components/workoutPage/ExerciseTimer";
import ExerciseCounter from "@/components/workoutPage/ExerciseCounter";
import RestTimer from "@/components/workoutPage/RestTimer";
import WorkoutSummary from "@/components/workoutPage/WorkoutSummary";
import { useAvatarStore } from "@/model/avatar/avatarStore";
import { useAchievementsStore } from "@/model/achievements/achievementsStore";

export const Route = createFileRoute("/training/$id/workout")({
  component: WorkoutComponent,
});

const WORKOUT_SETTINGS: WorkoutSettings = {
  defaultRestTime: 60,
  pointsPerExercise: 10,
  pointsPerMinute: 1,
};

function WorkoutComponent() {
  const { id } = Route.useParams();
  const training = useTrainingsStore((s) =>
    s.trainings.find((t) => t.id === id),
  );
  const exercises = useExercisesStore((s) => s.exercises);
  const addWorkoutResult = useUserStore((s) => s.addWorkoutResult);
  const decreaseRandomStat = useAvatarStore((s) => s.decreaseRandomStat);

  const [state, setState] = useState<WorkoutState>({
    currentExerciseIndex: 0,
    timeSpent: 0,
    totalReps: 0,
    skippedExercises: 0,
    restTime: WORKOUT_SETTINGS.defaultRestTime,
    status: "exercise",
    points: 0,
  });
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const currentExercise = training?.exercises[state.currentExerciseIndex];
  const exercise = exercises.find((e) => e.id === currentExercise?.trainingId);

  const generateWorkoutResult = useCallback(
    (): WorkoutResult => ({
      trainingId: training?.id ?? "",
      date: new Date(),
      timeSpent: state.timeSpent,
      totalReps: state.totalReps,
      skippedExercises: state.skippedExercises,
      exercises: results,
      points: state.points,
    }),
    [training, state, results],
  );

  const handleWorkoutComplete = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: "completed",
      points:
        prev.points +
        Math.floor(prev.timeSpent / 60) * WORKOUT_SETTINGS.pointsPerMinute,
    }));

    // Simply decrease a random stat
    decreaseRandomStat();

    const result = generateWorkoutResult();
    addWorkoutResult(result);

    // Check for achievements
    const achievements = useAchievementsStore.getState().achievements;
    const unlockAchievement = useAchievementsStore.getState().unlockAchievement;

    // First workout achievement
    if (!achievements.find((a) => a.id === "first-workout")?.unlocked) {
      unlockAchievement("first-workout");
    }

    // Check workout streak
    const history = useUserStore.getState().workoutHistory;
    const lastSevenDays = history.filter(
      (w) => new Date(w.date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
    );

    if (lastSevenDays.length >= 3) {
      unlockAchievement("workout-streak-3");
    }
    if (lastSevenDays.length >= 7) {
      unlockAchievement("workout-streak-7");
    }
  }, [generateWorkoutResult, addWorkoutResult, decreaseRandomStat]);

  const handleExerciseComplete = useCallback(() => {
    if (!training || !currentExercise || !exercise) return;

    setResults((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        completed: true,
        ...(exercise.goalType === "Время"
          ? { timeSpent: currentExercise.goal }
          : { reps: currentExercise.goal }),
      },
    ]);

    if (state.currentExerciseIndex < training.exercises.length - 1) {
      setState((prev) => ({
        ...prev,
        status: "rest",
        points: prev.points + WORKOUT_SETTINGS.pointsPerExercise,
      }));
    } else {
      handleWorkoutComplete();
    }
  }, [
    training,
    currentExercise,
    exercise,
    state.currentExerciseIndex,
    handleWorkoutComplete,
  ]);

  const handleSkipExercise = useCallback(() => {
    if (!exercise) return;

    setResults((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        completed: false,
      },
    ]);

    setState((prev) => ({
      ...prev,
      skippedExercises: prev.skippedExercises + 1,
      currentExerciseIndex: prev.currentExerciseIndex + 1,
    }));
  }, [exercise]);

  const handleRestComplete = () => {
    setState((prev) => ({
      ...prev,
      currentExerciseIndex: prev.currentExerciseIndex + 1,
      status: "exercise",
    }));
  };

  const handleAdjustRestTime = (adjustment: number) => {
    setState((prev) => ({
      ...prev,
      restTime: Math.max(0, prev.restTime + adjustment),
    }));
  };

  useEffect(() => {
    if (state.status === "completed") {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      return;
    }

    const newTimer = setInterval(() => {
      setState((prev) => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);

    setTimer(newTimer);

    return () => {
      if (newTimer) {
        clearInterval(newTimer);
      }
    };
  }, [state.status]);

  useEffect(() => {
    if (state.status !== "completed" && (!currentExercise || !exercise)) {
      handleWorkoutComplete();
    }
  }, [state.currentExerciseIndex, state.status]);

  if (!training) return null;

  return (
    <Scaffold title={training.name}>
      <div className="space-y-6">
        {state.status === "exercise" && currentExercise && exercise && (
          <div>
            <h2 className="text-xl font-bold text-background">
              {exercise.name}
            </h2>

            <div className="mt-4 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
              {exercise.videoUrl ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <video
                    src={exercise.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ) : (
                <img
                  src={exercise.coverUrl}
                  alt=""
                  className="aspect-video w-full object-cover"
                />
              )}

              <div className="mt-4 lg:mt-0">
                {exercise.goalType === "Время" ? (
                  <ExerciseTimer
                    duration={currentExercise.goal}
                    onComplete={handleExerciseComplete}
                  />
                ) : (
                  <ExerciseCounter
                    goal={currentExercise.goal}
                    onComplete={handleExerciseComplete}
                  />
                )}

                <Button
                  onClick={handleSkipExercise}
                  variant="outline"
                  className="mt-4 w-full"
                >
                  Пропустить упражнение
                </Button>
              </div>
            </div>
          </div>
        )}

        {state.status === "rest" && (
          <div className="mx-auto max-w-lg">
            <RestTimer
              duration={state.restTime}
              onComplete={handleRestComplete}
              onAdjustTime={handleAdjustRestTime}
            />
          </div>
        )}

        {state.status === "completed" && (
          <div className="mx-auto max-w-lg">
            <WorkoutSummary result={generateWorkoutResult()} />
          </div>
        )}
      </div>
    </Scaffold>
  );
}
