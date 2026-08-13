import {
  Map,
  CheckCircle,
  Circle,
  Lock,
  Sparkles,
  Clock,
  ArrowRight,
  PlayCircle,
  BookOpen,
  FileText,
  Code2,
  FolderGit2,
  X,
  ExternalLink,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  careerRoadmaps,
  careerDescriptions,
  careerNames,
  type LearningResource,
  type RoadmapStep,
} from "../../components/services/roadmap";

type ResourceType =
  | "video"
  | "course"
  | "documentation"
  | "practice"
  | "project";

const resourceGroups: {
  type: ResourceType;
  title: string;
  icon: typeof PlayCircle;
}[] = [
  {
    type: "video",
    title: "Video Lectures",
    icon: PlayCircle,
  },
  {
    type: "course",
    title: "Courses",
    icon: BookOpen,
  },
  {
    type: "documentation",
    title: "Documentation",
    icon: FileText,
  },
  {
    type: "practice",
    title: "Practice",
    icon: Code2,
  },
  {
    type: "project",
    title: "Projects",
    icon: FolderGit2,
  },
];

export default function Roadmap() {
  const [selectedStep, setSelectedStep] =
    useState<RoadmapStep | null>(null);

  const [selectedCareer, setSelectedCareer] =
    useState<string>("Full Stack Developer");

  const roadmapSteps =
    careerRoadmaps[selectedCareer] ??
    careerRoadmaps["Full Stack Developer"];

  /*
   * Current progress.
   *
   * Existing UI showed:
   * HTML/CSS      → completed
   * JavaScript    → completed
   * React         → current
   * Remaining     → upcoming
   */

  const completedSteps = 2;

  const currentStepNumber = 3;

  const progress = useMemo(() => {
    return Math.round(
      (completedSteps / roadmapSteps.length) * 100
    );
  }, [roadmapSteps.length]);

  const getStepStatus = (
    step: RoadmapStep
  ) => {
    if (step.number <= completedSteps) {
      return "completed";
    }

    if (
      step.number === currentStepNumber
    ) {
      return "current";
    }

    return "upcoming";
  };

  const getResourcesByType = (
    resources: LearningResource[],
    type: ResourceType
  ) => {
    return resources.filter(
      (resource) =>
        resource.type === type
    );
  };

  const openResource = (
    resource: LearningResource
  ) => {
    window.open(
      resource.url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-white/10 bg-[#080b18] px-6 py-5">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <Map
                size={24}
                className="text-indigo-400"
              />

              <h1 className="text-2xl font-bold">
                Career Roadmap
              </h1>

            </div>

            <p className="mt-1 text-sm text-gray-400">
              Your personalized path to becoming
              job-ready
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            AI Active

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* =================================================
            HERO
        ================================================== */}

        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-2 text-sm text-indigo-300">

                <Sparkles size={18} />

                Personalized for you

              </div>

              <h2 className="mt-3 text-3xl font-bold">
                {selectedCareer}
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                {careerDescriptions[selectedCareer]}
              </p>

            </div>


            {/* Progress */}

            <div className="rounded-2xl bg-[#111827] p-5">

              <p className="text-sm text-gray-400">
                Overall Progress
              </p>

              <p className="mt-2 text-3xl font-bold">
                {progress}%
              </p>

              <div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-xs text-gray-500">
                {completedSteps} of{" "}
                {roadmapSteps.length} stages
                completed
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            CAREER SELECTION
        ================================================== */}

        <section className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-6 md:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              Choose Your Career
            </h2>
            <p className="text-sm text-gray-400">
              Select a career to view its complete learning roadmap.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {careerNames.map((career) => {
              const active = selectedCareer === career;

              return (
                <button
                  key={career}
                  type="button"
                  onClick={() => {
                    setSelectedCareer(career);
                    setSelectedStep(null);
                  }}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-indigo-500 bg-indigo-500/15 text-white"
                      : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-indigo-500/40 hover:bg-indigo-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">
                      {career}
                    </span>

                    {active && (
                      <CheckCircle
                        size={18}
                        className="shrink-0 text-green-400"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {careerRoadmaps[career].length} roadmap stages
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <Link
            to={`/courses?career=${encodeURIComponent(selectedCareer)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
          >
            <BookOpen size={17} />
            View {selectedCareer} Courses
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* =================================================
            LEARNING PATH
        ================================================== */}

        <div className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Learning Path
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Learn, practice, and build projects
                at every stage
              </p>

            </div>

            <span className="text-sm text-gray-400">
              {roadmapSteps.length} Stages
            </span>

          </div>


          <div className="relative">

            {/* Vertical Line */}

            <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-white/10 md:block" />


            <div className="space-y-6">

              {roadmapSteps.map((step) => {

                const status =
                  getStepStatus(step);

                return (

                  <div
                    key={step.number}
                    className={`relative rounded-3xl border p-6 transition ${
                      status === "current"
                        ? "border-indigo-500/40 bg-indigo-500/10"
                        : status === "completed"
                        ? "border-green-500/20 bg-[#111827]"
                        : "border-white/10 bg-[#111827]"
                    }`}
                  >

                    <div className="flex flex-col gap-5 md:flex-row">

                      {/* =================================
                          NUMBER / STATUS
                      ================================== */}

                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0b1020]">

                        {status ===
                        "completed" ? (

                          <CheckCircle
                            size={25}
                            className="text-green-400"
                          />

                        ) : status ===
                          "current" ? (

                          <Circle
                            size={25}
                            className="fill-indigo-500 text-indigo-400"
                          />

                        ) : (

                          <Lock
                            size={22}
                            className="text-gray-500"
                          />

                        )}

                      </div>


                      {/* =================================
                          CONTENT
                      ================================== */}

                      <div className="flex-1">

                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                          <div>

                            <div className="flex flex-wrap items-center gap-3">

                              <span className="text-sm text-gray-500">
                                STEP{" "}
                                {step.number}
                              </span>


                              {status ===
                                "completed" && (

                                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                                  Completed
                                </span>

                              )}


                              {status ===
                                "current" && (

                                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                                  Current
                                </span>

                              )}


                              {status ===
                                "upcoming" && (

                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-500">
                                  Upcoming
                                </span>

                              )}

                            </div>


                            <h3 className="mt-2 text-xl font-bold">
                              {step.title}
                            </h3>

                          </div>


                          <div className="flex items-center gap-2 text-sm text-gray-400">

                            <Clock size={16} />

                            {step.duration}

                          </div>

                        </div>


                        <p className="mt-3 max-w-3xl leading-7 text-gray-400">
                          {step.description}
                        </p>


                        {/* Resource count */}

                        <div className="mt-4 flex flex-wrap gap-3">

                          {resourceGroups.map(
                            (group) => {

                              const count =
                                getResourcesByType(
                                  step.resources,
                                  group.type
                                ).length;

                              if (!count) {
                                return null;
                              }

                              const Icon =
                                group.icon;

                              return (

                                <span
                                  key={
                                    group.type
                                  }
                                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400"
                                >

                                  <Icon
                                    size={14}
                                  />

                                  {count}{" "}
                                  {group.title}

                                </span>

                              );

                            }
                          )}

                        </div>


                        {/* =================================
                            BUTTONS
                        ================================== */}

                        {status ===
                          "current" && (

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedStep(
                                step
                              )
                            }
                            className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
                          >

                            Continue Learning

                            <ArrowRight
                              size={17}
                            />

                          </button>

                        )}


                        {status ===
                          "completed" && (

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedStep(
                                step
                              )
                            }
                            className="mt-5 flex items-center gap-2 text-sm font-medium text-green-400 transition hover:text-green-300"
                          >

                            Review Stage

                            <ArrowRight
                              size={17}
                            />

                          </button>

                        )}


                        {status ===
                          "upcoming" && (

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedStep(
                                step
                              )
                            }
                            className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-400 transition hover:border-white/20 hover:text-white"
                          >

                            Preview Resources

                            <ArrowRight
                              size={17}
                            />

                          </button>

                        )}

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        </div>


        {/* =================================================
            AI RECOMMENDATION
        ================================================== */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">

              <Sparkles
                size={22}
                className="text-indigo-400"
              />

            </div>

            <div>

              <h3 className="text-xl font-bold">
                AI Roadmap Recommendation
              </h3>

              <p className="mt-2 leading-7 text-gray-400">
                You have completed your HTML,
                CSS, and JavaScript foundation.
                Your next priority should be
                strengthening React skills and
                building at least two real-world
                projects before moving into
                backend development.
              </p>

            </div>

          </div>

        </div>

      </main>


      {/* =====================================================
          RESOURCE MODAL
      ====================================================== */}

      {selectedStep && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedStep(null)
          }
        >

          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1020] shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* ===============================================
                MODAL HEADER
            ================================================ */}

            <div className="sticky top-0 z-10 border-b border-white/10 bg-[#0b1020]/95 p-6 backdrop-blur">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-sm text-indigo-400">
                    STEP{" "}
                    {selectedStep.number}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    {selectedStep.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Choose how you want to learn
                    this stage.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedStep(null)
                  }
                  className="rounded-xl p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >

                  <X size={22} />

                </button>

              </div>

            </div>


            {/* ===============================================
                RESOURCES
            ================================================ */}

            <div className="space-y-8 p-6">

              {resourceGroups.map(
                (group) => {

                  const resources =
                    getResourcesByType(
                      selectedStep.resources,
                      group.type
                    );

                  if (!resources.length) {
                    return null;
                  }

                  const Icon =
                    group.icon;

                  return (

                    <section
                      key={group.type}
                    >

                      <div className="mb-4 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">

                          <Icon
                            size={19}
                            className="text-indigo-400"
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold">
                            {group.title}
                          </h3>

                          <p className="text-xs text-gray-500">
                            {resources.length}{" "}
                            resource
                            {resources.length >
                            1
                              ? "s"
                              : ""}
                          </p>

                        </div>

                      </div>


                      <div className="grid gap-3 md:grid-cols-2">

                        {resources.map(
                          (resource) => (

                            <button
                              type="button"
                              key={
                                resource.title
                              }
                              onClick={() =>
                                openResource(
                                  resource
                                )
                              }
                              className="group flex w-full items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-indigo-500/30 hover:bg-indigo-500/5"
                            >

                              <div className="flex-1">

                                <h4 className="font-semibold text-white transition group-hover:text-indigo-300">
                                  {
                                    resource.title
                                  }
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                  {
                                    resource.description
                                  }
                                </p>

                              </div>


                              <ExternalLink
                                size={17}
                                className="mt-1 shrink-0 text-gray-500 transition group-hover:text-indigo-400"
                              />

                            </button>

                          )
                        )}

                      </div>

                    </section>

                  );

                }
              )}

            </div>


            {/* ===============================================
                MODAL FOOTER
            ================================================ */}

            <div className="border-t border-white/10 p-6">

              <button
                type="button"
                onClick={() =>
                  setSelectedStep(null)
                }
                className="w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
