type Equipment = "Ничего" | "Гантели" | "Коврик" | "Гиря" | "Скамья";

type BodyPart = "Ноги" | "Ягодицы" | "Пресс" | "Руки" | "Спина";

type GoalType = "Повторения" | "Время" | "Вес";

type Difficulty = "easy" | "medium" | "hard";

type Exercise = {
  id: string;
  name: string;
  description: string;
  instruction: string[];
  coverUrl: string;
  videoUrl?: string;
  difficulty: Difficulty;
  equipment: Equipment[];
  trains: BodyPart[];
  goalType: GoalType;
  liked: boolean;
};
