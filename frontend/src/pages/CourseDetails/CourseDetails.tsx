import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  PlayCircle,
  Star,
  Code2,
  FolderKanban,
  BookOpen,
  CreditCard,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import {
  getCourseById,
} from "../../components/services/courses";
import {
  userPurchaseKey,
} from "../../components/services/userScopedStorage";

export default function CourseDetails() {
  const { courseId } = useParams();

  const course = courseId
    ? getCourseById(courseId)
    : undefined;

  if (!course) {
    return (
      <div className="min-h-screen bg-[#050816] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-3xl font-bold">
            Course Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            The course you are looking for does not
            exist.
          </p>

          <Link
            to="/courses"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>

        </div>
      </div>
    );
  }

  const purchaseKey = userPurchaseKey(course.id);
  const purchased = purchaseKey
    ? localStorage.getItem(purchaseKey) === "true"
    : false;

  const averageRating =
    course.reviews.length > 0
      ? (
          course.reviews.reduce(
            (total, review) =>
              total + review.rating,
            0
          ) / course.reviews.length
        ).toFixed(1)
      : "New";

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Header */}

      <div className="border-b border-white/10 bg-[#080b18]">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>

        </div>

      </div>


      {/* Hero */}

      <section className="border-b border-white/10 bg-gradient-to-b from-[#10152b] to-[#050816]">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px]">

          {/* Left */}

          <div>

            <div className="mb-5 flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                {course.career}
              </span>

              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                {course.level}
              </span>

            </div>


            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              {course.title}
            </h1>


            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
              {course.description}
            </p>


            {/* Rating */}

            <div className="mt-6 flex flex-wrap items-center gap-5">

              <div className="flex items-center gap-2">

                <Star
                  size={19}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold">
                  {averageRating}
                </span>

                <span className="text-gray-500">
                  ({course.reviews.length} reviews)
                </span>

              </div>


              <div className="flex items-center gap-2 text-gray-400">

                <Clock size={18} />

                {course.duration}

              </div>


              <div className="flex items-center gap-2 text-gray-400">

                <BookOpen size={18} />

                {course.lessonsCount} lessons

              </div>

            </div>

          </div>


          {/* Purchase Card */}

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">

            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">

              <div className="mb-5">

                <p className="text-sm text-gray-500">
                  Course Price
                </p>

                <p className="mt-1 text-4xl font-bold">
                  ₹{course.price}
                </p>

              </div>


              {purchased ? (
                <>
                  <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
                    <CheckCircle2 size={16} />
                    Course purchased • Lifetime access unlocked
                  </div>

                  <Link
                    to={`/courses/${course.id}/learn`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-semibold transition hover:bg-emerald-500"
                  >
                    <BookOpen size={19} />
                    Continue Learning
                  </Link>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    Payment completed • No payment required again
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-5 flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-300">
                    <Lock size={16} />
                    Lessons are locked until purchase.
                  </div>

                  <Link
                    to={`/courses/${course.id}/payment`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-semibold transition hover:bg-indigo-500"
                  >
                    <CreditCard size={19} />
                    Buy Course — ₹{course.price}
                  </Link>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    Secure payment • Lifetime course access
                  </p>
                </>
              )}
            </div>

          </div>

        </div>

      </section>


      {/* Main Content */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

          {/* Main */}

          <div>


            {/* What You'll Learn */}

            <section>

              <h2 className="text-2xl font-bold">
                What you'll learn
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {course.whatYouLearn.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex gap-3"
                    >

                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-emerald-400"
                      />

                      <span className="text-gray-300">
                        {item}
                      </span>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* Course Content */}

            <section className="mt-14">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    Course Content
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {course.modulesCount} modules •{" "}
                    {course.lessonsCount} lessons •{" "}
                    {course.projectsCount} projects
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-4">

                {course.modules.map(
                  (module, moduleIndex) => (

                    <div
                      key={module.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]"
                    >

                      {/* Module Header */}

                      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">

                        <div className="flex items-center gap-4">

                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">

                            {moduleIndex + 1}

                          </div>

                          <div>

                            <h3 className="font-semibold">
                              {module.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              {module.lessons.length} lessons
                            </p>

                          </div>

                        </div>


                        <Lock
                          size={18}
                          className="text-gray-500"
                        />

                      </div>


                      {/* Lessons */}

                      <div>

                        {module.lessons.map(
                          (lesson, lessonIndex) => (

                            <div
                              key={lesson.id}
                              className="flex items-center justify-between border-b border-white/5 px-5 py-4 last:border-0"
                            >

                              <div className="flex min-w-0 items-center gap-3">

                                <PlayCircle
                                  size={18}
                                  className="shrink-0 text-indigo-400"
                                />

                                <div className="min-w-0">

                                  <p className="truncate text-sm text-gray-300">
                                    {lessonIndex + 1}.{" "}
                                    {lesson.title}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-600">
                                    {lesson.duration}
                                  </p>

                                </div>

                              </div>


                              <Lock
                                size={15}
                                className="shrink-0 text-gray-600"
                              />

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* Learning Format */}

            <section className="mt-14">

              <h2 className="text-2xl font-bold">
                Learning Format
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                  <PlayCircle
                    className="text-indigo-400"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold">
                    Video Lectures
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Follow structured video lessons
                    covering each topic step by step.
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                  <FileText
                    className="text-indigo-400"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold">
                    Written Lessons
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Read detailed explanations and
                    revision notes alongside each video.
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                  <Code2
                    className="text-indigo-400"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold">
                    Practice Questions
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Test your understanding with
                    topic-wise practice questions.
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                  <FolderKanban
                    className="text-indigo-400"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold">
                    Projects
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Apply what you learn through
                    practical projects.
                  </p>

                </div>

              </div>

            </section>


            {/* Reviews */}

            <section className="mt-14">

              <h2 className="text-2xl font-bold">
                Course Reviews
              </h2>

              {course.reviews.length === 0 ? (

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-8 text-center">

                  <Star
                    size={30}
                    className="mx-auto text-gray-600"
                  />

                  <h3 className="mt-4 font-semibold">
                    No reviews yet
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Be one of the first students to
                    review this course after completing
                    it.
                  </p>

                </div>

              ) : (

                <div className="mt-6 space-y-4">

                  {course.reviews.map(
                    (review) => (

                      <div
                        key={review.id}
                        className="rounded-2xl border border-white/10 bg-[#111827] p-6"
                      >

                        <div className="flex items-center justify-between">

                          <h3 className="font-semibold">
                            {review.name}
                          </h3>

                          <div className="flex">

                            {Array.from({
                              length: 5,
                            }).map((_, index) => (

                              <Star
                                key={index}
                                size={15}
                                className={
                                  index <
                                  review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }
                              />

                            ))}

                          </div>

                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-400">
                          {review.comment}
                        </p>

                      </div>

                    )
                  )}

                </div>

              )}

            </section>

          </div>


          {/* Right Summary */}

          <aside>

            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#111827] p-6">

              <h3 className="text-lg font-bold">
                This course includes
              </h3>


              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-3 text-sm text-gray-300">

                  <PlayCircle
                    size={18}
                    className="text-indigo-400"
                  />

                  Video lectures

                </div>


                <div className="flex items-center gap-3 text-sm text-gray-300">

                  <FileText
                    size={18}
                    className="text-indigo-400"
                  />

                  Written lessons

                </div>


                <div className="flex items-center gap-3 text-sm text-gray-300">

                  <Code2
                    size={18}
                    className="text-indigo-400"
                  />

                  Practice questions

                </div>


                <div className="flex items-center gap-3 text-sm text-gray-300">

                  <FolderKanban
                    size={18}
                    className="text-indigo-400"
                  />

                  {course.projectsCount} practical projects

                </div>


                <div className="flex items-center gap-3 text-sm text-gray-300">

                  <BookOpen
                    size={18}
                    className="text-indigo-400"
                  />

                  {course.lessonsCount} lessons

                </div>

              </div>


              <div className="my-6 border-t border-white/10" />


              {purchased ? (
                <>
                  <p className="text-sm text-emerald-400">
                    ✓ Purchased
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    Lifetime Access
                  </p>

                  <Link
                    to={`/courses/${course.id}/learn`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500"
                  >
                    <BookOpen size={18} />
                    Continue Learning
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    One-time payment
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    ₹{course.price}
                  </p>

                  <Link
                    to={`/courses/${course.id}/payment`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-500"
                  >
                    <CreditCard size={18} />
                    Purchase Course
                  </Link>
                </>
              )}

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}