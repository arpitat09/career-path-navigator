import {
  Clock,
  Star,
  ArrowRight,
  PlayCircle,
  FileText,
  Code2,
  FolderKanban,
  Lock,
} from "lucide-react";

import { Link, useSearchParams } from "react-router-dom";

import {
  getCoursesByCareer,
} from "../../components/services/courses";

function getCurrentUserId(): string | null {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    return user?.id || user?._id || null;
  } catch {
    return null;
  }
}

function isPremiumUser(): boolean {
  const userId = getCurrentUserId();

  if (!userId) {
    return false;
  }

  return (
    localStorage.getItem(
      `careerpathPremium_${userId}`
    ) === "true"
  );
}

function isCoursePurchased(courseId: string): boolean {
  const userId = getCurrentUserId();

  /*
    Keep the existing user-scoped purchase key if your
    project already uses it.
  */
  if (userId) {
    const userScopedKey =
      `coursePurchased_${userId}_${courseId}`;

    if (
      localStorage.getItem(userScopedKey) === "true"
    ) {
      return true;
    }
  }

  /*
    Backward compatibility with the existing course
    purchase key used by the current project.
  */
  return (
    localStorage.getItem(
      `coursePurchased_${courseId}`
    ) === "true"
  );
}

export default function Courses() {
  const [searchParams] = useSearchParams();

  const requestedCareer =
    searchParams.get("career")?.trim();

  const validCareers = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Java Developer",
    "Data Analyst",
    "AI / ML Engineer",
    "UI / UX Designer",
  ];

  const career =
    requestedCareer &&
    validCareers.includes(requestedCareer)
      ? requestedCareer
      : "Full Stack Developer";

  const courses =
    getCoursesByCareer(career);

  const premium = isPremiumUser();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#080b18] px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-indigo-400">
            CareerPath AI
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {career} Courses
          </h1>

          <p className="mt-2 max-w-2xl text-gray-400">
            Build job-ready {career.toLowerCase()} skills
            through structured video lectures, written
            lessons, practice questions, assignments, and
            projects.
          </p>

          {/* Premium status */}
          <div className="mt-5">
            {premium ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Complete Platform Unlocked
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
                <Lock size={14} />
                Premium Courses
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Available Courses
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {premium
                ? "Your Complete Career Platform access is active. You can start learning from any course."
                : "These courses require Complete Career Platform access or an individual course purchase."}
            </p>
          </div>

          <span className="w-fit rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            {courses.length} Course
            {courses.length !== 1
              ? "s"
              : ""}
          </span>
        </div>

        {/* Course cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => {
            const purchased =
              isCoursePurchased(course.id);

            /*
              A platform premium user can access every course.
              An individually purchased course can also be accessed.
            */
            const hasAccess =
              premium || purchased;

            return (
              <div
                key={course.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition hover:border-indigo-500/30"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                    {hasAccess
                      ? premium
                        ? "Premium Unlocked"
                        : "Purchased"
                      : "Premium Course"}
                  </div>

                  {!hasAccess && (
                    <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur">
                      <Lock
                        size={17}
                        className="text-yellow-400"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {course.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-400">
                        <span>
                          {course.level}
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {course.duration}
                        </span>

                        <span>•</span>

                        <span>
                          {course.modulesCount} Modules
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs text-gray-500">
                        Course Price
                      </p>

                      <p className="text-2xl font-bold text-white">
                        ₹{course.price}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 leading-7 text-gray-400">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <PlayCircle
                        size={17}
                        className="text-indigo-400"
                      />
                      Video Lectures
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FileText
                        size={17}
                        className="text-indigo-400"
                      />
                      Written Lessons
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Code2
                        size={17}
                        className="text-indigo-400"
                      />
                      Practice Questions
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FolderKanban
                        size={17}
                        className="text-indigo-400"
                      />
                      Projects
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={17}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-medium">
                        {course.reviews.length
                          ? (
                              course.reviews.reduce(
                                (sum, review) =>
                                  sum + review.rating,
                                0
                              ) /
                              course.reviews.length
                            ).toFixed(1)
                          : "New"}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">
                      {course.reviews.length} review
                      {course.reviews.length !== 1
                        ? "s"
                        : ""}
                    </span>
                  </div>

                  {/* Access button */}
                  {hasAccess ? (
                    <Link
                      to={`/courses/${course.id}/learn`}
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium transition hover:bg-emerald-500"
                    >
                      Continue Learning
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <Link
                        to={`/courses/${course.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium transition hover:bg-white/10"
                      >
                        View Course
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        to="/courses/careerpath-platform/payment"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
                      >
                        <Lock size={17} />
                        Unlock Premium
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}