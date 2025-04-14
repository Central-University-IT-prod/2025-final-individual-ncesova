import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUserStore } from "@/model/user/userStore";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const updateLoginStreak = useUserStore((s) => s.updateLoginStreak);

  useEffect(() => {
    updateLoginStreak();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
