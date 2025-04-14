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
import AddExerciseForm from "./AddExerciseForm";

export default function AddExerciseButton() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
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

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="gap-2">
            <Plus />
            Добавить упражнение
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="border-b">
            <DrawerTitle>Добавить новое упражнение</DrawerTitle>
          </DrawerHeader>
          <div className="flex h-[calc(100vh-10rem)] flex-col px-4">
            <AddExerciseForm onSuccess={() => setOpen(false)} />
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
          Добавить упражнение
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[600px]">
        <DialogHeader className="border-b">
          <DialogTitle>Добавить новое упражнение</DialogTitle>
        </DialogHeader>
        <div className="flex h-[calc(80vh-8rem)] flex-col">
          <AddExerciseForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
