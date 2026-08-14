import {
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../ui/Button";

export default function ResumePreview() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ================= LEFT ================= */}

          <div>

            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
              AI RESUME ANALYZER
            </span>

            <h2 className="mt-6 text-5xl font-bold text-white">
              Optimize Your Resume
              <br />
              With AI
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-400">
              Upload your resume and receive instant ATS analysis,
              skill gap detection, keyword suggestions, and
              personalized recommendations.
            </p>

            {/* ================= ANALYZE BUTTON ================= */}

            <Link
              to="/resume"
              className="inline-block"
            >
              <Button className="mt-10">
                Analyze Resume
              </Button>
            </Link>

          </div>


          {/* ================= RIGHT ================= */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <div className="flex items-center gap-3">

              <FileText className="text-indigo-400" />

              <h3 className="text-xl font-semibold text-white">
                Resume.pdf
              </h3>

            </div>


            {/* ================= SCORES ================= */}

            <div className="mt-8 space-y-6">

              {/* ATS SCORE */}

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-gray-400">
                    ATS Score
                  </span>

                  <span className="font-semibold text-white">
                    91%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-white/10">

                  <div className="h-3 w-[91%] rounded-full bg-green-500" />

                </div>

              </div>


              {/* SKILLS MATCH */}

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-gray-400">
                    Skills Match
                  </span>

                  <span className="font-semibold text-white">
                    87%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-white/10">

                  <div className="h-3 w-[87%] rounded-full bg-indigo-500" />

                </div>

              </div>


              {/* READABILITY */}

              <div>

                <div className="mb-2 flex justify-between">

                  <span className="text-gray-400">
                    Readability
                  </span>

                  <span className="font-semibold text-white">
                    95%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-white/10">

                  <div className="h-3 w-[95%] rounded-full bg-cyan-500" />

                </div>

              </div>

            </div>


            {/* ================= SUGGESTIONS ================= */}

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3 text-green-400">

                <CheckCircle2 size={20} />

                Add more React projects

              </div>


              <div className="flex items-center gap-3 text-green-400">

                <CheckCircle2 size={20} />

                Improve action verbs

              </div>


              <div className="flex items-center gap-3 text-green-400">

                <CheckCircle2 size={20} />

                Add measurable achievements

              </div>

            </div>


            {/* ================= AI MESSAGE ================= */}

            <div className="mt-10 flex items-center gap-3 rounded-2xl bg-indigo-500/10 p-4">

              <Sparkles className="text-indigo-400" />

              <p className="text-sm text-indigo-300">
                AI suggests adding more full-stack projects
                to improve recruiter visibility.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}