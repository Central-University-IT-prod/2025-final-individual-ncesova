import DifficultyBadge from "@/components/exercisesPage/DifficultyBadge";
import { Link } from "@tanstack/react-router";

interface Props {
  exercise: Exercise;
}

export default function ExerciseItem({ exercise }: Props) {
  return (
    <Link
      from="/exercises"
      to={`/exercise/$id`}
      params={{ id: exercise.id }}
      className="grid h-48 w-full grid-cols-5 overflow-hidden rounded-md bg-background"
    >
      <div className="col-span-2 flex items-center">
        <img className="h-full object-cover" src={exercise.coverUrl} alt="" />
      </div>
      <div className="col-span-3 grid grid-rows-4">
        <div className="row-span-3">
          <div className="flex justify-between p-1">
            <span className="font-bold">{exercise.name}</span>
            <DifficultyBadge
              className="h-min"
              difficulty={exercise.difficulty}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <span>Тренирует:</span>
            <ul className="flex h-full w-full flex-wrap gap-1 overflow-x-auto px-1 pb-1">
              {exercise.trains.map((trains) => (
                <li
                  key={trains + exercise.id}
                  className="whitespace-nowrap rounded-sm bg-gray-400 p-1 text-xs"
                >
                  {trains}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span>Оборудование:</span>
            <ul className="flex gap-1 px-1">
              {exercise.equipment.map((equip) => (
                <li
                  key={equip + exercise.id}
                  className="rounded-sm bg-gray-400 p-1 text-xs"
                >
                  {equip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}
