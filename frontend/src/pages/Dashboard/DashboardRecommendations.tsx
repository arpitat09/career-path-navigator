import {
  Code2,
  Database,
  Brain,
  GitBranch,
  ArrowRight,
} from "lucide-react";

const recommendations = [
  {
    title: "Master React Hooks",
    description:
      "Strengthen your React skills by learning useEffect, useMemo, and custom hooks.",
    icon: Code2,
    progress: 65,
    level: "Intermediate",
  },
  {
    title: "Learn MongoDB",
    description:
      "Build stronger backend skills by learning MongoDB queries and database design.",
    icon: Database,
    progress: 40,
    level: "Beginner",
  },
  {
    title: "Practice DSA",
    description:
      "Improve your coding interview performance with arrays, strings, and trees.",
    icon: Brain,
    progress: 55,
    level: "Intermediate",
  },
  {
    title: "Improve GitHub Profile",
    description:
      "Add better project documentation and showcase your strongest repositories.",
    icon: GitBranch,
    progress: 72,
    level: "Recommended",
  },
];

export default function DashboardRecommendations() {
  return (
    <section>

      <div className="flex items-end justify-between">

        <div>
          <p className="text-sm font-medium text-indigo-400">
            AI RECOMMENDATIONS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Recommended For You
          </h2>

          <p className="mt-2 text-gray-400">
            Skills and activities that can improve your career readiness.
          </p>
        </div>

        <button className="hidden items-center gap-2 text-sm text-indigo-400 transition hover:text-indigo-300 md:flex">
          View All
          <ArrowRight size={16} />
        </button>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {recommendations.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-indigo-500/5"
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">

                    <Icon
                      size={24}
                      className="text-indigo-400"
                    />

                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>

                    <span className="text-xs text-indigo-400">
                      {item.level}
                    </span>
                  </div>

                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-600 transition group-hover:text-indigo-400"
                />

              </div>

              <p className="mt-5 text-sm leading-6 text-gray-400">
                {item.description}
              </p>

              <div className="mt-6">

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    Progress
                  </span>

                  <span className="text-gray-300">
                    {item.progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-white/10">

                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${item.progress}%` }}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}