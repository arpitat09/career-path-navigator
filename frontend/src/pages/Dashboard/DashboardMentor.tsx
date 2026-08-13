import {
  Bot,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function DashboardMentor() {
  return (
    <section className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-white/5 to-purple-500/10 p-8">

      <div className="grid items-center gap-8 lg:grid-cols-3">

        {/* Mentor Info */}
        <div className="lg:col-span-2">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20">

              <Bot
                size={30}
                className="text-indigo-400"
              />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-2xl font-bold text-white">
                  Your AI Career Mentor
                </h2>

                <Sparkles
                  size={18}
                  className="text-yellow-400"
                />

              </div>

              <p className="mt-1 text-sm text-gray-400">
                Personalized guidance based on your career goals.
              </p>

            </div>

          </div>

          {/* AI Message */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1120]/80 p-6">

            <p className="text-sm text-gray-400">
              AI Mentor
            </p>

            <p className="mt-3 leading-7 text-gray-200">
              You're making good progress. Your React skills are improving,
              but I'd recommend spending some time on backend development
              next. Learning Express.js and MongoDB will help close your
              current skill gap.
            </p>

          </div>

        </div>

        {/* Action */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-8 text-center">

          <MessageCircle
            size={36}
            className="text-indigo-400"
          />

          <h3 className="mt-4 text-lg font-semibold text-white">
            Need Career Advice?
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Ask your AI mentor anything about your career.
          </p>

          <button className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500">

            Open Mentor

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
}