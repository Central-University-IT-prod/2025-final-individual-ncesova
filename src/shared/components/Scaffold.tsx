import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface Props {
  children: React.ReactNode;
  title: string;
  className?: string;
  backButtonTo?: string;
  backButtonFrom?: string;
}

export default function Scaffold({
  children,
  title,
  className,
  backButtonTo,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] from-[30%] via-[#396464] to-[#81fcfc]">
      <header className="z-10 flex w-full items-center gap-3 px-4 py-4">
        {backButtonTo && (
          <Link to={backButtonTo}>
            <ArrowLeft className="text-background" />
          </Link>
        )}
        <h2 className="text-5xl font-black text-background">{title}</h2>
      </header>
      <main className={cn("flex flex-col gap-3 px-4 pb-4", className)}>
        {children}
      </main>
    </div>
  );
}
