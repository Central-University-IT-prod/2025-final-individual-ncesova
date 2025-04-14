import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import TrainingForm from "./TrainingForm";
import { useTrainingsStore } from "@/model/trainings/trainingsStore";

export default function AddTrainingButton() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const addTraining = useTrainingsStore((state) => state.addTraining);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSuccess = (training: Training) => {
    addTraining(training);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="gap-2">
            <Plus />
            Добавить тренировку
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="border-b">
            <DrawerTitle>Добавить новую тренировку</DrawerTitle>
          </DrawerHeader>
          <div className="flex h-[calc(100vh-10rem)] flex-col px-4">
            <TrainingForm onSuccess={handleSuccess} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus />
          Добавить тренировку
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[600px]">
        <DialogHeader className="border-b">
          <DialogTitle>Добавить новую тренировку</DialogTitle>
        </DialogHeader>
        <div className="flex h-[calc(80vh-8rem)] flex-col">
          <TrainingForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
