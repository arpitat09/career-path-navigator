import { Bot, User, Sparkles } from "lucide-react";
import Button from "../ui/Button";

export default function AiMentor() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>

            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
              AI CAREER MENTOR
            </span>

            <h2 className="mt-6 text-5xl font-bold text-white">
              Your Personal
              <br />
              Career Coach
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-400">
              Chat with an AI mentor that helps you choose the right career,
              prepare for interviews, improve your resume, and build a learning roadmap.
            </p>

            <Button className="mt-10">
              Start Chat
            </Button>

          </div>

          {/* Right */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <div className="flex items-start gap-4">

              <div className="rounded-full bg-indigo-500/20 p-3">
                <User className="text-indigo-400" />
              </div>

              <div className="rounded-2xl bg-[#111827] p-5">
                <p className="text-white">
                  How do I become a Full Stack Developer?
                </p>
              </div>

            </div>

            <div className="mt-8 flex items-start gap-4">

              <div className="rounded-full bg-green-500/20 p-3">
                <Bot className="text-green-400" />
              </div>

              <div className="rounded-2xl bg-[#111827] p-5">

                <p className="text-white">
                  Here's your personalized roadmap:
                </p>

                <ul className="mt-4 space-y-2 text-gray-300">
                  <li>✓ HTML & CSS</li>
                  <li>✓ JavaScript</li>
                  <li>✓ React.js</li>
                  <li>✓ Node.js</li>
                  <li>✓ MongoDB</li>
                  <li>✓ Build Portfolio Projects</li>
                </ul>

                <div className="mt-6 flex items-center gap-2 text-indigo-400">
                  <Sparkles size={18} />
                  AI Generated Response
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}