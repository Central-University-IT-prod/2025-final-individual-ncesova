import WelcomeForm from "@/components/welcomePage/WelcomeForm";
import WelcomeText from "@/components/welcomePage/WelcomeText";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/welcome" });

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gradient-to-bl from-[#181818] via-[#396464] to-[#81fcfc] px-4">
      <WelcomeText />
      <WelcomeForm
        onSubmitCallback={() => {
          navigate({ to: "/" });
        }}
      />
    </div>
  );
}
