import { createFileRoute } from "@tanstack/react-router";
import Scaffold from "@/shared/components/Scaffold";
import ProfileForm from "@/components/profilePage/ProfileForm";
import ProfileStats from "@/components/profilePage/ProfileStats";
import AchievementsList from "@/components/achievements/AchievementsList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

export const Route = createFileRoute("/profile")({
  component: ProfileComponent,
});

function ProfileComponent() {
  return (
    <Scaffold title="Профиль" backButtonTo="/">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="info" className="flex-1">
            Информация
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex-1">
            Достижения
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="grid gap-4 md:grid-cols-2">
            <ProfileStats />
            <ProfileForm />
          </div>
        </TabsContent>
        <TabsContent value="achievements">
          <AchievementsList />
        </TabsContent>
      </Tabs>
    </Scaffold>
  );
}
