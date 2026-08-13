import {
  Award,
  BookOpen,
  Flame,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Career Score",
    value: "92%",
    icon: Award,
    color: "text-green-400",
  },
  {
    title: "Resume Score",
    value: "88%",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "Learning Streak",
    value: "18 Days",
    icon: Flame,
    color: "text-orange-400",
  },
  {
    title: "Courses Completed",
    value: "14",
    icon: BookOpen,
    color: "text-purple-400",
  },
];

export default function DashboardStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-indigo-500 hover:bg-indigo-500/10"
          >
            <div className="flex items-center justify-between">

              <Icon
                className={item.color}
                size={32}
              />

              <span className="text-4xl font-bold text-white">
                {item.value}
              </span>

            </div>

            <p className="mt-6 text-gray-400">
              {item.title}
            </p>

          </div>
        );
      })}

    </section>
  );
}