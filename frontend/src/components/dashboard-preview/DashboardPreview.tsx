import {
  TrendingUp,
  Trophy,
  BookOpen,
  Calendar,
  Target,
} from "lucide-react";

export default function DashboardPreview() {
  const stats = [
    {
      title: "Career Score",
      value: "92%",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Learning Streak",
      value: "18 Days",
      icon: Calendar,
      color: "text-orange-400",
    },
    {
      title: "Projects",
      value: "14",
      icon: BookOpen,
      color: "text-blue-400",
    },
    {
      title: "Interview Ready",
      value: "87%",
      icon: Trophy,
      color: "text-yellow-400",
    },
  ];

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
            STUDENT DASHBOARD
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Track Everything
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Monitor your learning progress, interview preparation,
            projects, and career readiness from one dashboard.
          </p>

        </div>

        <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-[#111827] p-6 transition hover:scale-105"
                >
                  <div className="flex items-center justify-between">

                    <Icon
                      className={item.color}
                      size={30}
                    />

                    <Target
                      className="text-gray-600"
                      size={18}
                    />

                  </div>

                  <h3 className="mt-6 text-gray-400">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-4xl font-bold text-white">
                    {item.value}
                  </p>

                </div>
              );
            })}

          </div>

          <div className="mt-12">

            <h3 className="text-xl font-semibold text-white">
              Weekly Progress
            </h3>

            <div className="mt-6 h-4 rounded-full bg-white/10">

              <div className="h-4 w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"></div>

            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-400">

              <span>78% Complete</span>

              <span>Goal: 100%</span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}