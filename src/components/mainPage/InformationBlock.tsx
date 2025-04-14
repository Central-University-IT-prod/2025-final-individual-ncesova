interface Props {
  title: string;
  text: string;
}

export default function InformationBlock({ title, text }: Props) {
  return (
    <div className="grid aspect-square w-full max-w-[300px] grid-rows-2 rounded-xl bg-background p-3">
      <span className="text-xl font-bold">{title}</span>
      <div className="self-end text-4xl font-black">{text}</div>
    </div>
  );
}
