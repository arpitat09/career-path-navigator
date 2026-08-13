// Removed unused Link import

import {
  Brain,
  FileText,
  Route,
  Briefcase,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

const features = [
  {
    icon: Brain,
    title: "AI Career Mentor",
    description:
      "Receive personalized career guidance based on your interests, strengths, and long-term goals.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Analyze your resume using AI and improve your ATS score with smart suggestions.",
  },
  {
    icon: Route,
    title: "Career Roadmaps",
    description:
      "Generate personalized learning roadmaps for your dream career.",
  },
  {
    icon: FaGithub,
    title: "GitHub Insights",
    description:
      "Evaluate your repositories and identify missing skills recruiters expect.",
  },
  {
    icon: Briefcase,
    title: "Job Readiness",
    description:
      "Track interview preparation, coding progress, certifications, and overall career readiness.",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description:
      "Practice technical and HR interviews with AI-generated questions and instant feedback.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">

          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
            FEATURES
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Everything You Need
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            A complete AI-powered platform to help you learn,
            build your portfolio, prepare for interviews,
            and become placement-ready.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500">

                  <Icon
                    size={30}
                    className="text-indigo-300 group-hover:text-white"
                  />

                </div>

                {/* Title */}
                <h3 className="mt-8 text-3xl font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-5 leading-8 text-gray-400">
                  {feature.description}
                </p>

                {/* Learn More */}
                <button className="mt-8 flex items-center gap-2 font-medium text-indigo-400 transition-all duration-300 group-hover:gap-4 group-hover:text-indigo-300">

                  Learn More

                  <ArrowRight size={18} />

                </button>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}