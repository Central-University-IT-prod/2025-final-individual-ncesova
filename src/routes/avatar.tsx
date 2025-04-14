import AvatarPage from "@/components/avatar/AvatarPage";
import Scaffold from "@/shared/components/Scaffold";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/avatar")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Scaffold backButtonTo="/" title="Персонаж">
      <AvatarPage />
    </Scaffold>
  );
}
