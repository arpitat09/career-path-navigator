import {
  User,
  Bot,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../ui/Button";

export default function AiMentor() {
  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

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
              Chat with an AI mentor that helps you choose the right
              career, prepare for interviews, improve your resume,
              and build a learning roadmap.
            </p>


            {/* =================================================
                START CHAT BUTTON
            ================================================= */}

            <Link
              to="/mentor"
              className="inline-block"
            >
              <Button className="mt-10">
                Start Chat
              </Button>
            </Link>

          </div>


          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            {/* USER MESSAGE */}

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">

                <User
                  size={21}
                  className="text-indigo-400"
                />

              </div>


              <div className="rounded-2xl rounded-tl-md bg-[#111827] px-5 py-4">

                <p className="text-sm text-white">
                  How do I become a Full Stack Developer?
                </p>

              </div>

            </div>


            {/* AI RESPONSE */}

            <div className="mt-8 flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500/20">

                <Bot
                  size={21}
                  className="text-green-400"
                />

              </div>


              <div className="rounded-2xl rounded-tl-md bg-[#111827] px-5 py-5">

                <p className="text-sm font-medium text-white">
                  Here's your personalized roadmap:
                </p>


                <div className="mt-4 space-y-3 text-sm text-gray-300">

                  <p>
                    ✓ HTML & CSS
                  </p>

                  <p>
                    ✓ JavaScript
                  </p>

                  <p>
                    ✓ React.js
                  </p>

                  <p>
                    ✓ Node.js
                  </p>

                  <p>
                    ✓ MongoDB
                  </p>

                  <p>
                    ✓ Build Portfolio Projects
                  </p>

                </div>


                {/* AI LABEL */}

                <div className="mt-6 flex items-center gap-2 text-indigo-400">

                  <Sparkles size={17} />

                  <span className="text-sm">
                    AI Generated Response
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}