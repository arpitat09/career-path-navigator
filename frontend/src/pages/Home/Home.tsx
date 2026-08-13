import { Check } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Trusted from "../../components/trusted/Trusted";
import Features from "../../components/features/Features";
import RoadmapPreview from "../../components/roadmap-preview/RoadmapPreview";
import ResumePreview from "../../components/resume-preview";
import Testimonials from "../../components/testimonials/Testimonials";
import AiMentor from "../../components/ai-mentor";
import DashboardPreview from "../../components/dashboard-preview";
import CTA from "../../components/cta/CTA";
import Footer from "../../components/footer/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#030712] text-white">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <DashboardPreview />
      <RoadmapPreview />
      <ResumePreview />
      <AiMentor />
      <Testimonials />

      {/* =====================================================
          PRICING
      ===================================================== */}
      <section
        id="pricing"
        className="relative scroll-mt-32 px-6 py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
              PRICING
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Simple & Accessible
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Start for free or unlock the complete CareerPath AI
              platform with one simple purchase.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
            {/* FREE PLAN */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <p className="text-sm font-medium text-gray-400">
                FREE
              </p>

              <h3 className="mt-4 text-3xl font-bold text-white">
                Career Starter
              </h3>

              <p className="mt-3 text-gray-400">
                Start exploring your career journey with the
                essential CareerPath AI tools.
              </p>

              <div className="mt-8">
                <span className="text-5xl font-bold text-white">
                  ₹0
                </span>
                <span className="ml-2 text-gray-500">
                  / forever
                </span>
              </div>

              <div className="my-8 h-px bg-white/10" />

              <div className="space-y-4">
                {[
                  "AI Career Mentor",
                  "Resume Analyzer",
                  "Career Roadmaps",
                  "Interview Preparation",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check
                      size={18}
                      className="text-emerald-400"
                    />
                    <span className="text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/dashboard"
                className="mt-8 block rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10"
              >
                Get Started
              </Link>
            </div>

            {/* PAID PLAN */}
            <div className="relative rounded-3xl border border-indigo-500/40 bg-indigo-500/10 p-8 shadow-[0_0_40px_rgba(99,102,241,0.12)]">
              <div className="absolute right-6 top-6 rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white">
                RECOMMENDED
              </div>

              <p className="text-sm font-medium text-indigo-300">
                CAREERPATH AI
              </p>

              <h3 className="mt-4 text-3xl font-bold text-white">
                Complete Career Platform
              </h3>

              <p className="mt-3 max-w-md text-gray-400">
                Unlock the complete set of tools designed to help
                engineering students become placement-ready.
              </p>

              <div className="mt-8">
                <span className="text-5xl font-bold text-white">
                  ₹999
                </span>
                <span className="ml-2 text-gray-500">
                  / lifetime
                </span>
              </div>

              <div className="my-8 h-px bg-white/10" />

              <div className="space-y-4">
                {[
                  "AI Career Mentor",
                  "Advanced Resume Analysis",
                  "Career Matching",
                  "Personalized Roadmaps",
                  "GitHub Insights",
                  "Mock Interview Preparation",
                  "Engineering Courses",
                  "Course Certificates",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check
                      size={18}
                      className="text-emerald-400"
                    />
                    <span className="text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/courses/careerpath-platform/payment"
                className="mt-8 block rounded-xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                Choose Complete Platform
              </Link>

              <p className="mt-3 text-center text-xs text-gray-500">
                Demo checkout — no real payment is processed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}