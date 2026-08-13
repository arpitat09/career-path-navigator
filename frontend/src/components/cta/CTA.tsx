import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#050816] py-24"
    >

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">

        <div className="overflow-hidden rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent p-10 text-center md:p-16">

          {/* Icon */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">

            <Sparkles
              size={30}
              className="text-indigo-400"
            />

          </div>


          {/* Badge */}

          <span className="mt-8 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            START YOUR JOURNEY
          </span>


          {/* Heading */}

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Your Dream Career
            <span className="text-indigo-400">
              {" "}Starts Today
            </span>
          </h2>


          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Stop guessing what to learn next. Let CareerPath AI
            create a personalized career journey based on your
            skills, goals, and aspirations.
          </p>


          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 hover:shadow-indigo-500/30"
            >
              Get Started
              <ArrowRight size={19} />
            </button>


            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-gray-200 transition hover:bg-white/10 hover:text-white"
            >
              Already have an account?
            </button>

          </div>


          {/* Bottom Text */}

          <p className="mt-8 text-sm text-gray-600">
            Build skills. Create projects. Prepare for interviews.
            Get placement-ready.
          </p>

        </div>

      </div>

    </section>
  );
}