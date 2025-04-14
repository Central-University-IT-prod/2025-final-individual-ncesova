import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithoutRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

interface ExerciseEditFormProps {
  exercise: Exercise;
  callback: (exerciseId: string, exercise: Exercise) => void;
  onDelete?: (exerciseId: string) => void;
}

const ExerciseEditForm: FC<
  PropsWithoutRef<HTMLAttributes<HTMLDivElement> & ExerciseEditFormProps>
> = ({ exercise, callback, onDelete, className, ...props }) => {
  const [updatedExercise, setUpdatedExercise] = useState(exercise);
  const navigate = useNavigate();

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...updatedExercise.instruction];
    newInstructions[index] = value;
    setUpdatedExercise({ ...updatedExercise, instruction: newInstructions });
  };

  const addInstruction = () => {
    setUpdatedExercise({
      ...updatedExercise,
      instruction: [...updatedExercise.instruction, ""],
    });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = updatedExercise.instruction.filter(
      (_, i) => i !== index,
    );
    setUpdatedExercise({ ...updatedExercise, instruction: newInstructions });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(exercise.id);
      navigate({ to: "/exercises" });
    }
  };

  return (
    <div
      className={cn(
        "my-1 grid gap-4 rounded-md bg-background p-2 py-2 md:px-1 md:py-2",
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            value={updatedExercise.name}
            onChange={(e) =>
              setUpdatedExercise({ ...updatedExercise, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Видео URL</Label>
          <Input
            id="videoUrl"
            value={updatedExercise.videoUrl}
            onChange={(e) =>
              setUpdatedExercise({
                ...updatedExercise,
                videoUrl: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverUrl">Обложка URL</Label>
        <Input
          id="coverUrl"
          value={updatedExercise.coverUrl}
          onChange={(e) =>
            setUpdatedExercise({ ...updatedExercise, coverUrl: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          className="resize-none"
          value={updatedExercise.description}
          onChange={(e) =>
            setUpdatedExercise({
              ...updatedExercise,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Инструкции</Label>
          <Button variant="default" size="sm" onClick={addInstruction}>
            Добавить шаг
          </Button>
        </div>
        {updatedExercise.instruction.map((step, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={step}
              placeholder={`Шаг ${index + 1}`}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeInstruction(index)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Сложность</Label>
          <Select
            value={updatedExercise.difficulty}
            onValueChange={(value: Difficulty) =>
              setUpdatedExercise({ ...updatedExercise, difficulty: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Легко</SelectItem>
              <SelectItem value="medium">Средне</SelectItem>
              <SelectItem value="hard">Сложно</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Тип цели</Label>
          <Select
            value={updatedExercise.goalType}
            onValueChange={(value: GoalType) =>
              setUpdatedExercise({ ...updatedExercise, goalType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Повторения">Повторения</SelectItem>
              <SelectItem value="Время">Время</SelectItem>
              <SelectItem value="Вес">Вес</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Оборудование</Label>
        <div className="flex flex-wrap gap-4">
          {["Ничего", "Гантели", "Коврик", "Гиря", "Скамья"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={`equipment-${item}`}
                checked={updatedExercise.equipment.includes(item as Equipment)}
                onCheckedChange={(checked) => {
                  const newEquipment = checked
                    ? [...updatedExercise.equipment, item as Equipment]
                    : updatedExercise.equipment.filter((eq) => eq !== item);
                  setUpdatedExercise({
                    ...updatedExercise,
                    equipment: newEquipment,
                  });
                }}
              />
              <Label htmlFor={`equipment-${item}`}>{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Части тела</Label>
        <div className="flex flex-wrap gap-4">
          {["Ноги", "Ягодицы", "Пресс", "Руки", "Спина"].map((part) => (
            <div key={part} className="flex items-center space-x-2">
              <Checkbox
                id={`bodypart-${part}`}
                checked={updatedExercise.trains.includes(part as BodyPart)}
                onCheckedChange={(checked) => {
                  const newTrains = checked
                    ? [...updatedExercise.trains, part as BodyPart]
                    : updatedExercise.trains.filter((tr) => tr !== part);
                  setUpdatedExercise({ ...updatedExercise, trains: newTrains });
                }}
              />
              <Label htmlFor={`bodypart-${part}`}>{part}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => callback(updatedExercise.id, updatedExercise)}
          className="flex-1"
        >
          Сохранить изменения
        </Button>
        {onDelete && (
          <Button
            onClick={handleDelete}
            variant="destructive"
            size="icon"
            className="aspect-square"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExerciseEditForm;
