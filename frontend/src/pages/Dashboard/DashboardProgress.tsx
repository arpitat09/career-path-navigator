import { TrendingUp, Target } from "lucide-react";

const weeklyProgress = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 78 },
];

export default function DashboardProgress() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">

      {/* Weekly Progress */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:col-span-2">

        <div className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-3">
              <TrendingUp className="text-indigo-400" size={24} />

              <h2 className="text-xl font-semibold text-white">
                Weekly Progress
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Your learning activity this week
            </p>
          </div>

          <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
            +18%
          </span>

        </div>

        {/* Chart */}
        <div className="mt-10 flex h-64 items-end justify-between gap-3">

          {weeklyProgress.map((item) => (
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col items-center justify-end gap-3"
            >

              <div className="flex h-full w-full items-end">

                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-300 hover:from-indigo-500 hover:to-cyan-400"
                  style={{ height: `${item.value}%` }}
                />

              </div>

              <span className="text-xs text-gray-500">
                {item.day}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Goal Progress */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <div className="flex items-center gap-3">
          <Target className="text-purple-400" size={24} />

          <h2 className="text-xl font-semibold text-white">
            Career Goal
          </h2>
        </div>

        <p className="mt-3 text-sm text-gray-400">
          Full Stack Developer
        </p>

        {/* Circular-style score */}
        <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-indigo-500/20">

          <div className="text-center">
            <p className="text-4xl font-bold text-white">
              78%
            </p>

            <p className="text-xs text-gray-500">
              Complete
            </p>
          </div>

        </div>

        <div className="mt-8">

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              Progress
            </span>

            <span className="text-white">
              78 / 100
            </span>
          </div>

          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-2 w-[78%] rounded-full bg-indigo-500" />
          </div>

        </div>

      </div>

    </section>
  );
}