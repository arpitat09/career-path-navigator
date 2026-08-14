import {
  Brain,
  FileText,
  Route,
  Briefcase,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI Career Mentor",
    description:
      "Receive personalized career guidance based on your interests, strengths, and long-term goals.",
    path: "/mentor",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Analyze your resume using AI and improve your ATS score with smart suggestions.",
    path: "/resume",
  },
  {
    icon: Route,
    title: "Career Roadmaps",
    description:
      "Generate personalized learning roadmaps for your dream career.",
    path: "/roadmap",
  },
  {
    icon: FaGithub,
    title: "GitHub Insights",
    description:
      "Evaluate your repositories and identify missing skills recruiters expect.",
    path: "/github",
  },
  {
    icon: Briefcase,
    title: "Job Readiness",
    description:
      "Track interview preparation, coding progress, certifications, and overall career readiness.",
    path: "/interview",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description:
      "Practice technical and HR interviews with AI-generated questions and instant feedback.",
    path: "/interview",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADING */}

        <div className="text-center">

          <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            CAREER FEATURES
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Everything You Need
            <span className="text-indigo-500">
              {" "}To Build Your Career
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            CareerPath AI brings together intelligent career tools,
            personalized guidance, learning resources, and interview
            preparation in one platform.
          </p>

        </div>


        {/* FEATURE CARDS */}

        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-[#111827] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-[#141b2e]"
              >

                {/* ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white">

                  <Icon size={27} />

                </div>


                {/* TITLE */}

                <h3 className="mt-7 text-2xl font-bold text-white">
                  {feature.title}
                </h3>


                {/* DESCRIPTION */}

                <p className="mt-5 leading-8 text-gray-400">
                  {feature.description}
                </p>


                {/* LEARN MORE */}

                <Link
                  to={feature.path}
                  className="mt-8 flex w-fit items-center gap-2 font-medium text-indigo-400 transition-all duration-300 group-hover:gap-4 group-hover:text-indigo-300"
                >
                  Learn More

                  <ArrowRight size={18} />

                </Link>

              </div>
            );

          })}

        </div>

      </div>
    </section>
  );
}