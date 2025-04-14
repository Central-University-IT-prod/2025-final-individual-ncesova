type BodyPartAvatar = "head" | "torso" | "legs";

type Accessory = {
  id: string;
  bodyPart: BodyPart;
  isUsed: boolean;
  // model: R3FModel;
};

type Avatar = {
  skinColor: string;
  hairColor: string;
  bottomColor: string;
  isTShirt: boolean;
  shoeColor: string;
  topColor: string;
  fatPercent: number;
  handsMuscles: number;
  legsMuscle: number;
  accessories: Accessory[];
};

type Rarity = "Обычная" | "Необычная" | "Редкая" | "Супер редкая";

type Achievement = {
  name: string;
  rarity: Rarity;
  icon: string;
};

type BodyStats = {
  isFirstTime: boolean;
  name: string | null;
  sex: "male" | "female" | null;
  dateOfBirth: Date | null;
  weight: number | null;
  height: number | null;
};

type Profile = {
  avatar: Avatar;
  goal: string;
  achievements: Achievement[];
  lastTrainings: Training[];
  bodyStats: BodyStats;
};

type User = {
  name: string;
  weight: number;
  points: number;
  workoutHistory: WorkoutResult[];
  profile: Profile;
};
