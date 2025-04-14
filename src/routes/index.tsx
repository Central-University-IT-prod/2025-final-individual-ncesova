import InformationBlock from "@/components/mainPage/InformationBlock";
import MainLink from "@/components/mainPage/MainLink";
import { useUserStore } from "@/model/user/userStore";
import Scaffold from "@/shared/components/Scaffold";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isFirstTime, height, weight } = useUserStore(
    (state) => state.bodyStats,
  );

  if (isFirstTime) {
    return <Navigate to="/welcome" />;
  }

  const weightText = weight ? `${weight} кг` : "Не указан";
  const heightText = height ? `${height} см` : "Не указан";

  return (
    <Scaffold title="Сводка">
      <div className="flex h-full flex-1 flex-col md:flex-row md:gap-6">
        <div className="flex max-h-[300px] min-w-[200px] gap-4 md:flex-col">
          <InformationBlock title="Вес" text={weightText} />
          <InformationBlock title="Рост" text={heightText} />
        </div>
        <div className="my-4 flex flex-1 flex-col gap-4 rounded-lg bg-foreground px-4 py-6 md:items-center">
          <MainLink to="/exercises" title="Упражнения" />
          <MainLink to="/trainings" title="Тренировки" />
          <MainLink to="/profile" title="Профиль" />
          <MainLink to="/avatar" title="Аватар" />
          <MainLink to="/shop" title="Магазин" />
        </div>
      </div>
    </Scaffold>
  );
}
