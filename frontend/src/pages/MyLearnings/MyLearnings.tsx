import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  courses,
  getCourseById,
} from "../../components/services/courses";

import {
  getCurrentUserId,
  userProgressKey,
  userPurchasedCoursesKey,
  userPurchaseKey,
} from "../../components/services/userScopedStorage";

function getPurchasedCourseIds(): string[] {
  const listKey = userPurchasedCoursesKey();

  if (!listKey) return [];

  try {
    const saved = localStorage.getItem(listKey);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          (id): id is string => typeof id === "string"
        );
      }
    }
  } catch {
    // Fall back to individual user-scoped purchase keys.
  }

  const userId = getCurrentUserId();

  if (!userId) return [];

  return courses
    .filter((course) => {
      const key = userPurchaseKey(course.id);
      return Boolean(
        key && localStorage.getItem(key) === "true"
      );
    })
    .map((course) => course.id);
}

function getProgress(courseId: string): number {
  const course = getCourseById(courseId);
  const progressKey = userProgressKey(courseId);

  if (!course || !progressKey || course.lessonsCount === 0) {
    return 0;
  }

  try {
    const saved = localStorage.getItem(progressKey);

    if (!saved) return 0;

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return 0;

    return Math.min(
      100,
      Math.round(
        (parsed.length / course.lessonsCount) * 100
      )
    );
  } catch {
    return 0;
  }
}

export default function MyLearnings() {
  const userId = getCurrentUserId();
  const purchasedIds = userId
    ? getPurchasedCourseIds()
    : [];

  const purchasedCourses = purchasedIds
    .map((id) => getCourseById(id))
    .filter((course): course is NonNullable<typeof course> => Boolean(course));

  return (
    <div className="min-h-screen w-full bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#080b18] px-6 py-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-indigo-400">CareerPath AI</p>

          <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold">
            <GraduationCap size={30} className="text-indigo-400" />
            My Learnings
          </h1>

          <p className="mt-2 max-w-2xl text-gray-400">
            Only courses purchased by your account are shown here.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {purchasedCourses.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center">
            <LockKeyhole size={42} className="mx-auto text-gray-500" />

            <h2 className="mt-5 text-2xl font-bold">
              No Courses Purchased Yet
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-gray-400">
              Courses purchased by other accounts are not visible here.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
            >
              Browse Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Your Courses</h2>
              <p className="mt-1 text-sm text-gray-400">
                {purchasedCourses.length} purchased course{
                  purchasedCourses.length !== 1 ? "s" : ""
                }
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {purchasedCourses.map((course) => {
                const progress = getProgress(course.id);
                const completed = progress === 100;

                return (
                  <article
                    key={course.id}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300 backdrop-blur">
                        <CheckCircle2 size={13} />
                        Purchased
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-xs text-indigo-400">
                        {course.career}
                      </p>

                      <div className="mt-1 flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-bold">
                          {course.title}
                        </h3>

                        {completed && (
                          <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="font-semibold">{progress}%</span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <p className="mt-2 text-xs text-gray-500">
                          {course.lessonsCount} total lessons
                        </p>
                      </div>

                      <Link
                        to={`/courses/${course.id}/learn`}
                        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium ${
                          completed
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                      >
                        <BookOpen size={18} />
                        {completed
                          ? "Review Course"
                          : progress > 0
                            ? "Continue Learning"
                            : "Start Learning"}
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}