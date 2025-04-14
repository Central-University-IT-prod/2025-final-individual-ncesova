type TrainingExercise = {
  trainingId: string;
  goal: number;
  quantity: number;
};

type Training = {
  id: string;
  name: string;
  exercises: TrainingExercise[];
};
