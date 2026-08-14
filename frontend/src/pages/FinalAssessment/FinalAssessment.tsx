import {
  ArrowLeft,
  CircleAlert,
  GraduationCap,
  RotateCcw,
  Trophy,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useState } from "react";

import {
  getCourseById,
  type PracticeQuestion,
} from "../../components/services/courses";

import {
  getCurrentUserId,
  userCertificateKey,
  userProgressKey,
  userPurchaseKey,
} from "../../components/services/userScopedStorage";

type AssessmentQuestion =
  PracticeQuestion & {
    lessonTitle: string;
  };

type AssessmentResult = {
  courseId: string;
  courseTitle: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  completedAt: string;
};

const PASS_MARK = 70;
const NUMBER_OF_QUESTIONS = 10;

function getQuestions(
  courseId: string
): AssessmentQuestion[] {
  const course = getCourseById(courseId);

  if (!course) {
    return [];
  }

  const allQuestions: AssessmentQuestion[] = [];

  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      lesson.questions.forEach((question) => {
        allQuestions.push({
          ...question,
          lessonTitle: lesson.title,
        });
      });
    });
  });

  return allQuestions
    .sort(() => Math.random() - 0.5)
    .slice(
      0,
      Math.min(
        NUMBER_OF_QUESTIONS,
        allQuestions.length
      )
    );
}

export default function FinalAssessment() {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const navigate = useNavigate();

  const course = courseId
    ? getCourseById(courseId)
    : undefined;

  const userId = getCurrentUserId();

  const purchaseKey = course
    ? userPurchaseKey(course.id)
    : null;

  const progressKey = course
    ? userProgressKey(course.id)
    : null;

  const certificateKey = course
    ? userCertificateKey(course.id)
    : null;

  const questions = course
  ? getQuestions(course.id)
  : [];

  const completedLessons = (() => {
  if (!progressKey) {
    return [];
  }

  try {
    const raw =
      localStorage.getItem(progressKey);

    if (!raw) {
      return [];
    }

    const parsed: unknown =
      JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
})();

  const purchased =
    Boolean(
      purchaseKey &&
        localStorage.getItem(
          purchaseKey
        ) === "true"
    );

  const courseCompleted =
    Boolean(
      course &&
        completedLessons.length >=
          course.lessonsCount
    );

  const [answers, setAnswers] =
    useState<Record<string, number>>(
      {}
    );

  const [submitted, setSubmitted] =
    useState(false);

  const [result, setResult] =
    useState<AssessmentResult | null>(
      null
    );

  const [error, setError] =
    useState("");

  /*
   * COURSE NOT FOUND
   */

  if (!course) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">

          <CircleAlert
            size={48}
            className="mx-auto text-red-400"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Course not found
          </h1>

          <p className="mt-2 text-gray-500">
            The requested course could
            not be found.
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold"
          >
            Back to Courses
          </Link>

        </div>
      </div>
    );
  }

  /*
   * LOGIN REQUIRED
   */

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">

          <CircleAlert
            size={48}
            className="mx-auto text-amber-400"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Login required
          </h1>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold"
          >
            Login
          </Link>

        </div>
      </div>
    );
  }

  /*
   * PURCHASE CHECK
   */

  if (!purchased) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">

          <CircleAlert
            size={48}
            className="mx-auto text-amber-400"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Course not purchased
          </h1>

          <p className="mt-3 text-gray-400">
            Purchase this course before
            attempting the final assessment.
          </p>

          <Link
            to={`/courses/${course.id}`}
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold"
          >
            View Course
          </Link>

        </div>
      </div>
    );
  }

  /*
   * COURSE COMPLETION CHECK
   */

  if (!courseCompleted) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">

          <CircleAlert
            size={48}
            className="mx-auto text-amber-400"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Complete the course first
          </h1>

          <p className="mt-3 text-gray-400">
            Complete all lessons before
            starting the final assessment.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {completedLessons.length} /{" "}
            {course.lessonsCount} lessons
            completed
          </p>

          <Link
            to={`/courses/${course.id}/learn`}
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold"
          >
            Continue Learning
          </Link>

        </div>
      </div>
    );
  }

  /*
   * SUBMIT
   */

  const submitAssessment = () => {
    setError("");

    const unanswered =
      questions.filter(
        (question) =>
          answers[question.id] ===
          undefined
      );

    if (unanswered.length > 0) {
      setError(
        `Please answer all ${questions.length} questions before submitting.`
      );

      return;
    }

    let correct = 0;

    questions.forEach((question) => {
      if (
        answers[question.id] ===
        question.correctAnswer
      ) {
        correct += 1;
      }
    });

    const score = Math.round(
      (correct / questions.length) *
        100
    );

    const passed =
      score >= PASS_MARK;

    const assessmentResult: AssessmentResult =
      {
        courseId: course.id,
        courseTitle: course.title,
        score,
        correct,
        total: questions.length,
        passed,
        completedAt:
          new Date().toISOString(),
      };

    localStorage.setItem(
      `assessment_${userId}_${course.id}`,
      JSON.stringify(
        assessmentResult
      )
    );

    if (
      passed &&
      certificateKey
    ) {
      localStorage.setItem(
        certificateKey,
        JSON.stringify({
          courseId: course.id,
          courseTitle: course.title,
          score,
          issuedAt:
            new Date().toISOString(),
        })
      );
    }

    setResult(
      assessmentResult
    );

    setSubmitted(true);
  };

  /*
   * RETAKE
   */

  const retake = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setError("");
  };

  /*
   * RESULT SCREEN
   */

  if (submitted && result) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">

        <header className="border-b border-white/10 bg-[#080b18]">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

            <Link
              to={`/courses/${course.id}/learn`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Course
            </Link>

            <div className="flex items-center gap-2 font-semibold">
              <GraduationCap
                size={20}
                className="text-indigo-400"
              />
              Final Assessment
            </div>

          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-16">

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-10 text-center">

            {result.passed ? (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">

                  <Trophy
                    size={42}
                    className="text-emerald-400"
                  />

                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  Assessment Passed
                </p>

                <h1 className="mt-3 text-5xl font-bold">
                  {result.score}%
                </h1>

                <p className="mt-4 text-gray-400">
                  You answered{" "}
                  {result.correct} out of{" "}
                  {result.total} questions
                  correctly.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/certificates"
                      )
                    }
                    className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-500"
                  >
                    View Certificate
                  </button>

                  <Link
                    to="/my-learnings"
                    className="rounded-xl border border-white/10 px-6 py-3 font-semibold hover:bg-white/5"
                  >
                    My Learnings
                  </Link>

                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">

                  <CircleAlert
                    size={42}
                    className="text-red-400"
                  />

                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-red-400">
                  Assessment Not Passed
                </p>

                <h1 className="mt-3 text-5xl font-bold">
                  {result.score}%
                </h1>

                <p className="mt-4 text-gray-400">
                  You need at least{" "}
                  {PASS_MARK}% to pass.
                </p>

                <button
                  type="button"
                  onClick={retake}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
                >
                  <RotateCcw
                    size={18}
                  />
                  Retake Assessment
                </button>
              </>
            )}

          </section>

        </main>
      </div>
    );
  }

  /*
   * ASSESSMENT PAGE
   */

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080b18]/95 backdrop-blur">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <Link
            to={`/courses/${course.id}/learn`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Course
          </Link>

          <div className="flex items-center gap-2 font-semibold">

            <GraduationCap
              size={20}
              className="text-indigo-400"
            />

            Final Assessment

          </div>

        </div>

      </header>


      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* TITLE */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

          <p className="text-sm text-indigo-400">
            {course.career}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {course.title}
          </h1>

          <p className="mt-3 text-gray-400">
            Test your knowledge of the
            concepts covered throughout
            this course.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-gray-500">
                Questions
              </p>

              <p className="mt-1 text-xl font-bold">
                {questions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-gray-500">
                Passing Score
              </p>

              <p className="mt-1 text-xl font-bold">
                {PASS_MARK}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-gray-500">
                Course Status
              </p>

              <p className="mt-1 text-xl font-bold text-emerald-400">
                Completed
              </p>
            </div>

          </div>

        </section>


        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
            {error}
          </div>
        )}


        {/* QUESTIONS */}

        <div className="mt-6 space-y-6">

          {questions.length === 0 ? (
            <section className="rounded-3xl border border-red-500/20 bg-[#111827] p-10 text-center">

              <CircleAlert
                size={42}
                className="mx-auto text-red-400"
              />

              <h2 className="mt-5 text-xl font-bold">
                No assessment questions found
              </h2>

              <p className="mt-2 text-gray-500">
                This course does not currently
                contain practice questions.
              </p>

            </section>
          ) : (
            questions.map(
              (question, index) => {

                const selected =
                  answers[question.id];

                return (
                  <section
                    key={question.id}
                    className="rounded-3xl border border-white/10 bg-[#111827] p-6"
                  >

                    <p className="text-xs font-medium text-indigo-400">
                      Question {index + 1}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {question.lessonTitle}
                    </p>

                    <h2 className="mt-4 text-lg font-semibold leading-7">
                      {question.question}
                    </h2>

                    <div className="mt-5 space-y-3">

                      {question.options.map(
                        (
                          option,
                          optionIndex
                        ) => {

                          const selectedOption =
                            selected ===
                            optionIndex;

                          return (
                            <button
                              key={
                                optionIndex
                              }
                              type="button"
                              onClick={() =>
                                setAnswers(
                                  (
                                    current
                                  ) => ({
                                    ...current,
                                    [question.id]:
                                      optionIndex,
                                  })
                                )
                              }
                              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                                selectedOption
                                  ? "border-indigo-500 bg-indigo-500/10"
                                  : "border-white/10 bg-white/[0.02] hover:border-indigo-500/40"
                              }`}
                            >

                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs">
                                {String.fromCharCode(
                                  65 +
                                    optionIndex
                                )}
                              </span>

                              <span className="leading-6">
                                {option}
                              </span>

                            </button>
                          );
                        }
                      )}

                    </div>

                  </section>
                );
              }
            )
          )}

        </div>


        {/* SUBMIT */}

        {questions.length > 0 && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="font-semibold">
                  Ready to submit?
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Answer all questions before
                  submitting.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  submitAssessment
                }
                className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold hover:bg-indigo-500"
              >
                Submit Assessment
              </button>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}