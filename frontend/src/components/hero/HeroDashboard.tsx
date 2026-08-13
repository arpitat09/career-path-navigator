export default function HeroDashboard() {
  return (
    <div className="mt-20 w-full max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Career Dashboard
          </h2>

          <p className="text-gray-400">
            AI Powered Career Insights
          </p>
        </div>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
          ● AI Active
        </span>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-[#111827] p-6">
          <h3 className="text-gray-400">
            Career Score
          </h3>

          <p className="mt-3 text-5xl font-bold text-white">
            92%
          </p>
        </div>

        <div className="rounded-2xl bg-[#111827] p-6">
          <h3 className="text-gray-400">
            Resume Score
          </h3>

          <p className="mt-3 text-5xl font-bold text-white">
            88%
          </p>
        </div>

        <div className="rounded-2xl bg-[#111827] p-6">
          <h3 className="text-gray-400">
            Learning Streak
          </h3>

          <p className="mt-3 text-5xl font-bold text-white">
            18 Days
          </p>
        </div>

      </div>

    </div>
  );
}