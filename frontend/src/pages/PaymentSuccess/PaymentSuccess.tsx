import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

import { getCourseById } from "../../components/services/courses";

const PLATFORM_ID = "careerpath-platform";

const platformPlan = {
  id: PLATFORM_ID,
  title: "Complete Career Platform",
  description:
    "Complete CareerPath AI access with engineering courses, advanced career tools, mock interviews, GitHub insights and certificates.",
  price: 999,
  thumbnail:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
};

export default function PaymentSuccess() {
  const { courseId } = useParams();

  const isPlatformPlan =
    courseId === PLATFORM_ID;

  const normalCourse = useMemo(
    () =>
      !isPlatformPlan && courseId
        ? getCourseById(courseId)
        : undefined,
    [courseId, isPlatformPlan]
  );

  const product = isPlatformPlan
    ? platformPlan
    : normalCourse;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Course Not Found
          </h1>

          <Link
            to="/courses"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2
              size={58}
              className="text-green-400"
            />
          </div>

          <h1 className="mt-8 text-4xl font-bold">
            Payment Successful
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            {isPlatformPlan
              ? "Your Complete Career Platform access has been unlocked."
              : "Your course has been successfully unlocked."}
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-6 text-left">
            <div className="flex flex-col gap-5 sm:flex-row">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-32 w-full rounded-xl object-cover sm:w-48"
              />

              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-indigo-400">
                  {isPlatformPlan
                    ? "Plan Purchased"
                    : "Course Purchased"}
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {product.title}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Lifetime access.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Video lectures",
                "Written lessons",
                "Practice questions",
                "Certificates",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <CheckCircle2
                    size={17}
                    className="text-green-400"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-left">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-indigo-400"
            />

            <div>
              <p className="text-sm font-medium text-indigo-300">
                Demo Payment
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                This website currently uses a dummy payment
                system for demonstration purposes. No real
                payment was processed.
              </p>
            </div>
          </div>

          <Link
            to={
              isPlatformPlan
                ? "/dashboard"
                : `/courses/${product.id}/learn`
            }
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition hover:bg-indigo-500"
          >
            {isPlatformPlan
              ? "Go to Dashboard"
              : "Start Learning"}

            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}