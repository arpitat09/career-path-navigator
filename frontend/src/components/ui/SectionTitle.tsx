interface Props {
  title: string;
  subtitle: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}