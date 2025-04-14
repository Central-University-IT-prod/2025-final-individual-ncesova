import Logo from "@/shared/Logo";

export default function WelcomeText() {
  return (
    <div className="flex flex-col rounded-lg bg-background p-2">
      <h2 className="flex items-center gap-2">
        Добро пожаловать в <Logo />
      </h2>
      <p className="text-sm text-muted-foreground">
        Перед началом работы, пожалуйста, заполните несколько полей
      </p>
    </div>
  );
}
