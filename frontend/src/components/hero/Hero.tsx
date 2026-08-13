import { useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false);

  const isLoggedIn = Boolean(
    localStorage.getItem("token")
  );

  return (
    <section className="relative overflow-hidden py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[150px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">

        {/* Badge */}
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
          🚀 AI Powered Career Platform
        </span>

        {/* Heading */}
        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
          Build Your
          <span className="text-indigo-500"> Dream Career </span>
          With AI
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Get personalized career roadmaps, AI resume reviews,
          mock interviews, GitHub analysis, skill tracking,
          and career guidance—all in one intelligent platform.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-5">

          {/* Get Started */}
          <Link to={isLoggedIn ? "/dashboard" : "/login"}>
            <Button className="flex items-center gap-2">
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              <ArrowRight size={18} />
            </Button>
          </Link>

          {/* Watch Demo */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowDemo(true)}
            className="flex items-center gap-2"
          >
            <Play size={18} />
            Watch Demo
          </Button>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">

          <div>
            <h2 className="text-4xl font-bold text-white">
              15K+
            </h2>
            <p className="mt-2 text-gray-400">
              Students
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">
              300+
            </h2>
            <p className="mt-2 text-gray-400">
              Career Paths
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">
              98%
            </h2>
            <p className="mt-2 text-gray-400">
              Success Rate
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">
              24/7
            </h2>
            <p className="mt-2 text-gray-400">
              AI Mentor
            </p>
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 flex w-full justify-center">
          <HeroDashboard />
        </div>

      </div>

      {/* =====================================================
          WATCH DEMO MODAL
      ===================================================== */}
      {showDemo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="CareerPath AI demo"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowDemo(false)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              aria-label="Close demo"
            >
              <X size={20} />
            </button>

            {/* Local CareerPath AI Demo Video */}
            <div className="aspect-video w-full bg-black">
              <video
                className="h-full w-full object-contain"
                controls
                autoPlay
                playsInline
                preload="metadata"
              >
                <source
                  src="/careerpath-demo.mp4"
                  type="video/mp4"
                />
                Your browser does not support video playback.
              </video>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}