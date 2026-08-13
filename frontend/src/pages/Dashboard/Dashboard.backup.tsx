import {
  TrendingUp,
  FileText,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070b18] text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-white/10 bg-[#070b18]/90 px-6 py-5 backdrop-blur-xl lg:px-10">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Welcome back
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Career Dashboard
            </h1>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            AI Active
          </div>

        </div>

      </header>


      {/* ================= CONTENT ================= */}

      <div className="px-6 py-8 lg:px-10">

        {/* ================= WELCOME ================= */}

        <section className="mb-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 to-purple-600/10 p-6">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 flex items-center gap-2 text-indigo-300">

                <Sparkles size={18} />

                <span className="text-sm font-medium">
                  AI Career Insights
                </span>

              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                Build your dream career step by step.
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                Track your progress, improve your skills,
                prepare for interviews, and stay on your
                personalized career roadmap.
              </p>

            </div>

            <Link
              to="/roadmap"
              className="flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
            >
              View Roadmap
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </section>


        {/* ================= STATS ================= */}

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Career Score */}

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-gray-400">
                Career Score
              </p>

              <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                <TrendingUp size={20} />
              </div>

            </div>

            <h3 className="mt-4 text-4xl font-bold">
              92%
            </h3>

            <p className="mt-2 text-sm text-green-400">
              +8% this month
            </p>

          </div>


          {/* Resume */}

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-gray-400">
                Resume Score
              </p>

              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <FileText size={20} />
              </div>

            </div>

            <h3 className="mt-4 text-4xl font-bold">
              88%
            </h3>

            <p className="mt-2 text-sm text-green-400">
              ATS Ready
            </p>

          </div>


          {/* Learning */}

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-gray-400">
                Learning Streak
              </p>

              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                <BookOpen size={20} />
              </div>

            </div>

            <h3 className="mt-4 text-4xl font-bold">
              18
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Days
            </p>

          </div>


          {/* Job Readiness */}

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

            <div className="flex items-center justify-between">

              <p className="text-sm text-gray-400">
                Job Readiness
              </p>

              <div className="rounded-lg bg-green-500/10 p-2 text-green-400">
                <Target size={20} />
              </div>

            </div>

            <h3 className="mt-4 text-4xl font-bold">
              76%
            </h3>

            <p className="mt-2 text-sm text-yellow-400">
              Keep improving
            </p>

          </div>

        </section>


        {/* ================= PROGRESS ================= */}

        <section className="mt-8 grid gap-6 xl:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 xl:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Career Progress
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your current learning progress
                </p>

              </div>

              <span className="text-sm font-medium text-indigo-400">
                68%
              </span>

            </div>


            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5">

              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: "68%" }}
              />

            </div>


            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-[#0b1120] p-5">

                <p className="text-sm text-gray-400">
                  Skills
                </p>

                <p className="mt-2 text-2xl font-bold">
                  18/25
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Skills completed
                </p>

              </div>


              <div className="rounded-2xl bg-[#0b1120] p-5">

                <p className="text-sm text-gray-400">
                  Projects
                </p>

                <p className="mt-2 text-2xl font-bold">
                  7/10
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Projects completed
                </p>

              </div>


              <div className="rounded-2xl bg-[#0b1120] p-5">

                <p className="text-sm text-gray-400">
                  Interviews
                </p>

                <p className="mt-2 text-2xl font-bold">
                  12
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Practice sessions
                </p>

              </div>

            </div>

          </div>


          {/* AI Recommendation */}

          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20">

                <Sparkles
                  size={22}
                  className="text-indigo-400"
                />

              </div>

              <div>

                <h2 className="font-bold">
                  AI Recommendation
                </h2>

                <p className="text-xs text-gray-500">
                  Personalized for you
                </p>

              </div>

            </div>


            <p className="mt-6 leading-7 text-gray-300">
              Your frontend skills are strong. Focus next
              on backend development and system design to
              improve your job readiness.
            </p>


            <Link
              to="/mentor"
              className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Ask AI Mentor
              <ArrowUpRight size={16} />
            </Link>

          </div>

        </section>


        {/* ================= RECENT ACTIVITY ================= */}

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest career activities
              </p>

            </div>

            <Clock
              size={20}
              className="text-gray-500"
            />

          </div>


          <div className="mt-6 space-y-4">

            {/* Activity 1 */}

            <div className="flex items-center gap-4 rounded-2xl bg-[#0b1120] p-4">

              <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                <CheckCircle size={20} />
              </div>

              <div className="flex-1">

                <p className="font-medium">
                  Completed React learning module
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  2 hours ago
                </p>

              </div>

            </div>


            {/* Activity 2 */}

            <div className="flex items-center gap-4 rounded-2xl bg-[#0b1120] p-4">

              <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                <FileText size={20} />
              </div>

              <div className="flex-1">

                <p className="font-medium">
                  Resume analyzed by AI
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Yesterday
                </p>

              </div>

            </div>


            {/* Activity 3 */}

            <div className="flex items-center gap-4 rounded-2xl bg-[#0b1120] p-4">

              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <Target size={20} />
              </div>

              <div className="flex-1">

                <p className="font-medium">
                  Completed mock interview
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  2 days ago
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}