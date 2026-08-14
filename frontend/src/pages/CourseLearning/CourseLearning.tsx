import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  PlayCircle,
  Send,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useEffect, useMemo, useState } from "react";

import {
  getCourseById,
} from "../../components/services/courses";

import {
  getCurrentUserId,
  userPurchaseKey,
  userProgressKey,
  userCertificateKey,
  getCurrentUserName,
} from "../../components/services/userScopedStorage";

export default function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courseId
    ? getCourseById(courseId)
    : undefined;

  const currentUserId = getCurrentUserId();

  const purchaseKey = course
    ? userPurchaseKey(course.id)
    : null;

  const progressKey = course
    ? userProgressKey(course.id)
    : null;

  const certificateKey = course
    ? userCertificateKey(course.id)
    : null;

  const purchased = useMemo(() => {
    if (!course) {
      return false;
    }

    return Boolean(
      purchaseKey &&
        localStorage.getItem(purchaseKey) === "true"
    );
  }, [course, purchaseKey]);

  const [selectedLessonId, setSelectedLessonId] =
    useState<string | null>(
      course?.modules[0]?.lessons[0]?.id ?? null
    );

  const [completedLessons, setCompletedLessons] =
    useState<string[]>(() => {
      if (!course) {
        return [];
      }

      const savedProgress = progressKey
        ? localStorage.getItem(progressKey)
        : null;

      if (!savedProgress) {
        return [];
      }

      try {
        const parsed = JSON.parse(savedProgress);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch {
        if (progressKey) {
          localStorage.removeItem(progressKey);
        }

        return [];
      }
    });

  const [openModules, setOpenModules] =
    useState<string[]>(
      course?.modules?.length
        ? [course.modules[0].id]
        : []
    );

  const [answers, setAnswers] =
    useState<Record<string, number>>({});

  const [submittedQuestions, setSubmittedQuestions] =
    useState<string[]>([]);

  const [message, setMessage] =
    useState("");

  /*
   * Check whether the user has purchased
   * the course.
   */
  useEffect(() => {
    if (!course) {
      return;
    }

    if (!currentUserId) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    if (!purchased) {
      navigate(
        `/courses/${course.id}`,
        {
          replace: true,
        }
      );

      return;
    }
  }, [
    course,
    currentUserId,
    navigate,
    purchased,
  ]);

  /*
   * Find currently selected lesson.
   */
  const selectedLesson = useMemo(() => {
    if (!course || !selectedLessonId) {
      return undefined;
    }

    for (const module of course.modules) {
      const lesson = module.lessons.find(
        (item) =>
          item.id === selectedLessonId
      );

      if (lesson) {
        return lesson;
      }
    }

    return undefined;
  }, [course, selectedLessonId]);

  /*
   * Total lessons.
   */
  const totalLessons =
    course?.lessonsCount ?? 0;

  /*
   * Course progress.
   */
  const progress =
    totalLessons > 0
      ? Math.round(
          (completedLessons.length /
            totalLessons) *
            100
        )
      : 0;

  /*
   * Toggle module.
   */
  const toggleModule = (
    moduleId: string
  ) => {
    setOpenModules((current) =>
      current.includes(moduleId)
        ? current.filter(
            (id) => id !== moduleId
          )
        : [
            ...current,
            moduleId,
          ]
    );
  };

  /*
   * Select lesson.
   */
  const selectLesson = (
    lessonId: string,
    moduleId: string
  ) => {
    setSelectedLessonId(lessonId);

    if (!openModules.includes(moduleId)) {
      setOpenModules((current) => [
        ...current,
        moduleId,
      ]);
    }

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * Mark lesson complete.
   */
  const markLessonComplete = () => {
    if (
      !selectedLesson ||
      completedLessons.includes(
        selectedLesson.id
      )
    ) {
      return;
    }

    const updated = [
      ...completedLessons,
      selectedLesson.id,
    ];

    setCompletedLessons(updated);

    if (progressKey) {
      localStorage.setItem(
        progressKey,
        JSON.stringify(updated)
      );
    }

    if (
      course &&
      updated.length >= totalLessons &&
      certificateKey
    ) {
      const existing =
        localStorage.getItem(
          certificateKey
        );

      if (!existing) {
        localStorage.setItem(
          certificateKey,
          JSON.stringify({
            courseId: course.id,
            courseTitle: course.title,
            userId: currentUserId,
            userName:
              getCurrentUserName(),
            completedAt:
              new Date().toISOString(),
            certificateId:
              `CPA-${course.id}-${currentUserId}-${Date.now()}`,
          })
        );
      }
    }

    setMessage(
      "Lesson completed successfully."
    );
  };

  /*
   * Submit practice question.
   */
  const submitQuestion = (
    questionId: string
  ) => {
    if (
      answers[questionId] === undefined
    ) {
      setMessage(
        "Please select an answer first."
      );

      return;
    }

    if (
      !selectedLesson ||
      submittedQuestions.includes(
        questionId
      )
    ) {
      return;
    }

    setSubmittedQuestions(
      (current) => [
        ...current,
        questionId,
      ]
    );

    setMessage(
      "Answer submitted. Check the explanation below."
    );
  };

  /*
   * Continue to final assessment.
   *
   * IMPORTANT:
   * This is the fix for the button that
   * previously did nothing.
   */
  const goToFinalAssessment = () => {
    if (!course) {
      return;
    }

    navigate(
      `/courses/${course.id}/assessment`
    );
  };

  if (!course || !purchased) {
    return (
      <div className="min-h-screen bg-[#050816]" />
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080b18]/95 backdrop-blur">

        <div className="flex h-16 items-center justify-between px-5">

          <div className="flex items-center gap-4">

            <Link
              to="/courses"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft size={17} />

              <span className="hidden sm:inline">
                Courses
              </span>
            </Link>

            <div className="h-5 w-px bg-white/10" />

            <div className="flex items-center gap-2">

              <BookOpen
                size={19}
                className="text-indigo-400"
              />

              <span className="max-w-[220px] truncate font-semibold">
                {course.title}
              </span>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">

              <p className="text-xs text-gray-500">
                Course Progress
              </p>

              <p className="text-sm font-semibold">
                {progress}%
              </p>

            </div>

            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

      </header>


      <div className="flex min-h-[calc(100vh-64px)]">

        {/* SIDEBAR */}

        <aside className="hidden w-80 shrink-0 overflow-y-auto border-r border-white/10 bg-[#080b18] lg:block">

          <div className="p-5">

            <div className="mb-6">

              <p className="text-xs uppercase tracking-wider text-gray-600">
                Course Content
              </p>

              <h2 className="mt-2 font-bold">
                {completedLessons.length} /{" "}
                {totalLessons} lessons
              </h2>

            </div>

            <div className="space-y-3">

              {course.modules.map(
                (
                  module,
                  moduleIndex
                ) => {

                  const isOpen =
                    openModules.includes(
                      module.id
                    );

                  return (
                    <div
                      key={module.id}
                      className="overflow-hidden rounded-xl border border-white/10"
                    >

                      {/* MODULE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleModule(
                            module.id
                          )
                        }
                        className="flex w-full items-center justify-between bg-white/[0.02] px-4 py-4 text-left hover:bg-white/[0.04]"
                      >

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-semibold text-indigo-400">
                            {moduleIndex + 1}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-medium">
                              {module.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-600">
                              {module.lessons.length} lessons
                            </p>

                          </div>

                        </div>

                        {isOpen ? (
                          <ChevronDown
                            size={16}
                            className="shrink-0 text-gray-500"
                          />
                        ) : (
                          <ChevronRight
                            size={16}
                            className="shrink-0 text-gray-500"
                          />
                        )}

                      </button>


                      {/* LESSONS */}

                      {isOpen && (

                        <div className="border-t border-white/10">

                          {module.lessons.map(
                            (
                              lesson,
                              lessonIndex
                            ) => {

                              const isSelected =
                                selectedLessonId ===
                                lesson.id;

                              const isComplete =
                                completedLessons.includes(
                                  lesson.id
                                );

                              return (
                                <button
                                  type="button"
                                  key={lesson.id}
                                  onClick={() =>
                                    selectLesson(
                                      lesson.id,
                                      module.id
                                    )
                                  }
                                  className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left last:border-0 ${
                                    isSelected
                                      ? "bg-indigo-500/10"
                                      : "hover:bg-white/[0.03]"
                                  }`}
                                >

                                  <div className="mt-0.5">

                                    {isComplete ? (
                                      <CheckCircle2
                                        size={17}
                                        className="text-green-400"
                                      />
                                    ) : (
                                      <PlayCircle
                                        size={17}
                                        className={
                                          isSelected
                                            ? "text-indigo-400"
                                            : "text-gray-600"
                                        }
                                      />
                                    )}

                                  </div>

                                  <div className="min-w-0 flex-1">

                                    <p
                                      className={`text-sm ${
                                        isSelected
                                          ? "text-indigo-300"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      {lessonIndex + 1}.{" "}
                                      {lesson.title}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-600">
                                      {lesson.duration}
                                    </p>

                                  </div>

                                </button>
                              );
                            }
                          )}

                        </div>

                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </aside>


        {/* MAIN */}

        <main className="min-w-0 flex-1">

          {selectedLesson && (

            <div className="mx-auto max-w-5xl px-5 py-8 md:px-8">

              {/* LESSON TITLE */}

              <div className="mb-7">

                <p className="text-sm text-indigo-400">
                  Current Lesson
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                  {selectedLesson.title}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  {selectedLesson.duration}
                </p>

              </div>


              {/* VIDEO */}

              <section>

                <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">

                  {selectedLesson.videoUrl ? (
                    <iframe
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  ) : (

                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">

                      <PlayCircle
                        size={54}
                        className="text-indigo-400"
                      />

                      <h2 className="mt-5 text-xl font-semibold">
                        Video Lecture
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                        The video lecture for this lesson
                        will be added here.
                      </p>

                    </div>

                  )}

                </div>

              </section>


              {/* WRITTEN LESSON */}

              <section className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">

                    <FileText
                      size={20}
                      className="text-indigo-400"
                    />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Written Lesson
                    </p>

                    <h2 className="font-bold">
                      {selectedLesson.title}
                    </h2>

                  </div>

                </div>

                <div className="mt-7 whitespace-pre-line text-[15px] leading-8 text-gray-300">
                  {selectedLesson.writtenContent}
                </div>

              </section>


              {/* PRACTICE */}

              <section className="mt-10">

                <div className="mb-6">

                  <p className="text-sm text-indigo-400">
                    Practice
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Test Your Understanding
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Answer the questions before moving
                    forward.
                  </p>

                </div>


                <div className="space-y-6">

                  {selectedLesson.questions.map(
                    (
                      question,
                      questionIndex
                    ) => {

                      const submitted =
                        submittedQuestions.includes(
                          question.id
                        );

                      const selectedAnswer =
                        answers[question.id];

                      const correct =
                        selectedAnswer ===
                        question.correctAnswer;

                      return (
                        <div
                          key={question.id}
                          className="rounded-2xl border border-white/10 bg-[#111827] p-6"
                        >

                          <div className="flex gap-3">

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-semibold text-indigo-400">
                              {questionIndex + 1}
                            </span>

                            <h3 className="pt-1 font-medium leading-6">
                              {question.question}
                            </h3>

                          </div>


                          <div className="mt-5 space-y-3">

                            {question.options.map(
                              (
                                option,
                                optionIndex
                              ) => {

                                const selected =
                                  selectedAnswer ===
                                  optionIndex;

                                const isCorrect =
                                  submitted &&
                                  optionIndex ===
                                    question.correctAnswer;

                                return (
                                  <button
                                    type="button"
                                    key={optionIndex}
                                    disabled={submitted}
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
                                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                                      isCorrect
                                        ? "border-green-500/40 bg-green-500/10 text-green-300"
                                        : selected
                                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                                        : "border-white/10 text-gray-300 hover:bg-white/[0.03]"
                                    }`}
                                  >

                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs">
                                      {String.fromCharCode(
                                        65 +
                                          optionIndex
                                      )}
                                    </span>

                                    <span>
                                      {option}
                                    </span>

                                  </button>
                                );
                              }
                            )}

                          </div>


                          {!submitted && (

                            <button
                              type="button"
                              onClick={() =>
                                submitQuestion(
                                  question.id
                                )
                              }
                              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
                            >

                              <Send size={15} />

                              Submit Answer

                            </button>

                          )}


                          {submitted && (

                            <div
                              className={`mt-5 rounded-xl border p-4 ${
                                correct
                                  ? "border-green-500/20 bg-green-500/5"
                                  : "border-red-500/20 bg-red-500/5"
                              }`}
                            >

                              <p
                                className={`text-sm font-medium ${
                                  correct
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {correct
                                  ? "Correct answer"
                                  : "Incorrect answer"}
                              </p>

                              <p className="mt-2 text-sm leading-6 text-gray-400">
                                {question.explanation}
                              </p>

                            </div>

                          )}

                        </div>
                      );
                    }
                  )}

                </div>

              </section>


              {/* COMPLETE LESSON */}

              <section className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h2 className="font-bold">
                      Finish this lesson
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Mark the lesson complete after
                      watching the lecture, reading the
                      material, and attempting the practice.
                    </p>

                  </div>


                  {completedLessons.includes(
                    selectedLesson.id
                  ) ? (

                    <div className="inline-flex items-center gap-2 rounded-xl bg-green-500/10 px-5 py-3 text-sm font-medium text-green-400">

                      <CheckCircle2
                        size={18}
                      />

                      Completed

                    </div>

                  ) : (

                    <button
                      type="button"
                      onClick={
                        markLessonComplete
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
                    >

                      <CheckCircle2
                        size={18}
                      />

                      Mark Lesson Complete

                    </button>

                  )}

                </div>

              </section>


              {/* MESSAGE */}

              {message && (

                <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 text-sm text-indigo-300">
                  {message}
                </div>

              )}


              {/* COURSE COMPLETE */}

              {progress === 100 && (

                <div className="mt-10 rounded-2xl border border-green-500/20 bg-green-500/5 p-7 text-center">

                  <CheckCircle2
                    size={48}
                    className="mx-auto text-green-400"
                  />

                  <h2 className="mt-4 text-2xl font-bold">
                    Course Completed
                  </h2>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-400">
                    You have completed every lesson in
                    this course. Your final assessment
                    is now available.
                  </p>

                  {/* FIXED BUTTON */}

                  <button
                    type="button"
                    onClick={
                      goToFinalAssessment
                    }
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-500"
                  >
                    Continue to Final Assessment
                  </button>

                </div>

              )}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}