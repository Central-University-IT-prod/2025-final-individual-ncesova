import { Link } from "@tanstack/react-router";
import { MoveRight } from "lucide-react";

interface Props {
  to: string;
  title: string;
}

export default function MainLink({ to, title }: Props) {
  return (
    <Link
      to={to}
      className="flex w-full max-w-[800px] items-center justify-between rounded-sm bg-background px-4 py-2 text-2xl text-foreground"
    >
      <span className="font-black">{title}</span>
      <MoveRight className="h-10 w-10" />
    </Link>
  );
}
