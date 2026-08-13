interface Props {
  text: string;
}

export default function Badge({ text }: Props) {
  return (
    <span className="inline-block px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-400 text-sm">
      {text}
    </span>
  );
}