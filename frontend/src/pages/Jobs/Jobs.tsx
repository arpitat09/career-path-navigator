import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

import {
  getSavedJobs,
  isJobSaved,
  saveJob,
  removeSavedJob,
} from "../../components/services/savedJobs";

/* =========================================================
   API
========================================================= */

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

/* =========================================================
   TYPES
========================================================= */

type WorkMode =
  | "On-site"
  | "Hybrid"
  | "Remote"
  | "Unknown";

type Experience =
  | "Fresher"
  | "0-1 years"
  | "1-2 years"
  | "2+ years"
  | "Unknown";

type Job = {
  id: string;
  company: string;
  role: string;
  stream: string;
  location: string;
  workMode: WorkMode;
  experience: Experience;
  posted: string;
  description: string;
  applyUrl: string;
  contractTime: string;
};

type ApiJob = {
  id?: string | number;
  title?: string;
  description?: string;

  company?: {
    display_name?: string;
  };

  location?: {
    display_name?: string;
    area?: string[];
  };

  category?: {
    label?: string;
    tag?: string;
  };

  redirect_url?: string;
  created?: string;
  contract_time?: string;

  latitude?: number;
  longitude?: number;

  salary_is_predicted?: string | number;
};

type ApiResponse = {
  count?: number;
  results?: ApiJob[];

  data?: {
    count?: number;
    results?: ApiJob[];
  };

  message?: string;
};

/* =========================================================
   FILTER OPTIONS
========================================================= */

const streamOptions = [
  "All Engineering Streams",
  "Computer Science / IT",
  "Computer Science / AI / ML",
  "Electronics / Electrical",
];

const locationOptions = [
  "All Locations",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Mumbai, Maharashtra",
  "Delhi NCR",
  "Remote",
];

const experienceOptions = [
  "All Experience",
  "Fresher",
  "0-1 years",
  "1-2 years",
  "2+ years",
];

const workModeOptions = [
  "All",
  "On-site",
  "Hybrid",
  "Remote",
];

/* =========================================================
   SAFE STRING
========================================================= */

function safeString(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string"
    ? value.trim()
    : fallback;
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatPostedDate(
  value?: string
): string {
  if (!value) {
    return "Recently listed";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently listed";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   DETECT WORK MODE
========================================================= */

function detectWorkMode(
  job: ApiJob
): WorkMode {
  const text = [
    job.title,
    job.description,
    job.location?.display_name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("remote") ||
    text.includes("work from home") ||
    text.includes("wfh")
  ) {
    return "Remote";
  }

  if (
    text.includes("hybrid")
  ) {
    return "Hybrid";
  }

  if (
    text.includes("on-site") ||
    text.includes("onsite") ||
    text.includes("on site")
  ) {
    return "On-site";
  }

  return "Unknown";
}

/* =========================================================
   DETECT EXPERIENCE
========================================================= */

function detectExperience(
  job: ApiJob
): Experience {
  const text = [
    job.title,
    job.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("fresher") ||
    text.includes("graduate") ||
    text.includes("trainee") ||
    text.includes("entry level") ||
    text.includes("entry-level") ||
    text.includes("0 years")
  ) {
    return "Fresher";
  }

  if (
    text.includes("0-1 year") ||
    text.includes("0 to 1 year") ||
    text.includes("less than 1 year")
  ) {
    return "0-1 years";
  }

  if (
    text.includes("1-2 year") ||
    text.includes("1 to 2 year")
  ) {
    return "1-2 years";
  }

  if (
    text.includes("2+ year") ||
    text.includes("2 or more year") ||
    text.includes("3+ year") ||
    text.includes("4+ year") ||
    text.includes("5+ year")
  ) {
    return "2+ years";
  }

  return "Unknown";
}

/* =========================================================
   DETECT STREAM
========================================================= */

function detectStream(
  job: ApiJob
): string {
  const text = [
    job.title,
    job.description,
    job.category?.label,
    job.category?.tag,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("electronics") ||
    text.includes("electrical") ||
    text.includes("embedded") ||
    text.includes("vlsi") ||
    text.includes("hardware")
  ) {
    return "Electronics / Electrical";
  }

  if (
    text.includes("machine learning") ||
    text.includes("artificial intelligence") ||
    text.includes(" ai ") ||
    text.includes("data scientist") ||
    text.includes("deep learning") ||
    text.includes("ml engineer")
  ) {
    return "Computer Science / AI / ML";
  }

  return "Computer Science / IT";
}

/* =========================================================
   CONVERT API JOB
========================================================= */

function convertJob(
  item: ApiJob,
  index: number
): Job {
  const company =
    safeString(
      item.company?.display_name,
      "Company not specified"
    );

  const role =
    safeString(
      item.title,
      "Software Engineering Opportunity"
    );

  const location =
    safeString(
      item.location?.display_name,
      item.location?.area?.join(", ") ||
        "India"
    );

  const description =
    safeString(
      item.description,
      "Job description is available in the original job listing."
    );

  const id =
    item.id !== undefined
      ? String(item.id)
      : `adzuna-job-${index}-${Date.now()}`;

  return {
    id,

    company,

    role,

    stream: detectStream(item),

    location,

    workMode: detectWorkMode(item),

    experience: detectExperience(item),

    posted: formatPostedDate(
      item.created
    ),

    description,

    applyUrl:
      safeString(
        item.redirect_url
      ),

    contractTime:
      safeString(
        item.contract_time,
        ""
      ),
  };
}

/* =========================================================
   LOCATION MATCH
========================================================= */

function jobLocationMatches(
  jobLocation: string,
  selectedLocation: string
): boolean {
  if (
    selectedLocation ===
    "All Locations"
  ) {
    return true;
  }

  const jobText =
    jobLocation
      .toLowerCase()
      .trim();

  if (
    selectedLocation ===
    "Remote"
  ) {
    return (
      jobText.includes("remote") ||
      jobText.includes("work from home")
    );
  }

  const selectedCity =
    selectedLocation
      .split(",")[0]
      .trim()
      .toLowerCase();

  return jobText.includes(
    selectedCity
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Jobs() {
  const [search, setSearch] =
    useState("");

  const [stream, setStream] =
    useState(
      "All Engineering Streams"
    );

  const [location, setLocation] =
    useState(
      "All Locations"
    );

  const [experience, setExperience] =
    useState(
      "All Experience"
    );

  const [workMode, setWorkMode] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [jobs, setJobs] =
    useState<Job[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalJobs, setTotalJobs] =
    useState(0);

  const [savedJobIds, setSavedJobIds] =
    useState<string[]>(() =>
      getSavedJobs().map(
        (job) => String(job.id)
      )
    );

  /* =======================================================
     FETCH JOBS
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    const loadJobs =
      async (): Promise<void> => {
        setLoading(true);
        setError("");

        try {
          const params =
            new URLSearchParams();

          const searchTerm =
            search.trim();

          /*
           * SEARCH QUERY
           */

          if (searchTerm) {
            params.set(
              "what",
              searchTerm
            );
          } else if (
            stream ===
            "Computer Science / AI / ML"
          ) {
            params.set(
              "what",
              "software engineer AI machine learning"
            );
          } else if (
            stream ===
            "Electronics / Electrical"
          ) {
            params.set(
              "what",
              "electronics electrical engineer"
            );
          } else {
            params.set(
              "what",
              "software engineer"
            );
          }

          /*
           * LOCATION
           */

          if (
            location !==
              "All Locations" &&
            location !==
              "Remote"
          ) {
            params.set(
              "where",
              location
            );
          } else {
            params.set(
              "where",
              "India"
            );
          }

          /*
           * PAGINATION
           */

          params.set(
            "page",
            String(page)
          );

          const response =
            await fetch(
              `${API_URL}/api/jobs?${params.toString()}`,
              {
                method: "GET",
                signal:
                  controller.signal,
              }
            );

          let json: ApiResponse;

          try {
            json =
              (await response.json()) as ApiResponse;
          } catch {
            throw new Error(
              "The jobs API returned an invalid response."
            );
          }

          if (!response.ok) {
            throw new Error(
              json.message ||
                "Unable to fetch jobs."
            );
          }

          let results: ApiJob[] =
            [];

          let count = 0;

          /*
           * BACKEND MAY RETURN:
           *
           * {
           *   results: [],
           *   count: 123
           * }
           *
           * OR:
           *
           * {
           *   data: {
           *     results: [],
           *     count: 123
           *   }
           * }
           */

          if (
            Array.isArray(
              json.results
            )
          ) {
            results =
              json.results;

            count =
              typeof json.count ===
              "number"
                ? json.count
                : results.length;
          } else if (
            json.data &&
            Array.isArray(
              json.data.results
            )
          ) {
            results =
              json.data.results;

            count =
              typeof json.data.count ===
              "number"
                ? json.data.count
                : results.length;
          }

          if (
            controller.signal.aborted
          ) {
            return;
          }

          const converted =
            results.map(
              (
                item,
                index
              ) =>
                convertJob(
                  item,
                  index
                )
            );

          setJobs(
            converted
          );

          setTotalJobs(
            count
          );
        } catch (
          requestError
        ) {
          if (
            controller.signal.aborted
          ) {
            return;
          }

          console.error(
            "Jobs API error:",
            requestError
          );

          setJobs([]);

          setTotalJobs(0);

          if (
            requestError instanceof
            Error
          ) {
            setError(
              requestError.message
            );
          } else {
            setError(
              "Unable to fetch jobs."
            );
          }
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setLoading(
              false
            );
          }
        }
      };

    void loadJobs();

    return () => {
      controller.abort();
    };
  }, [
    search,
    stream,
    location,
    page,
  ]);

  /* =======================================================
     FILTER RESULTS
  ======================================================= */

  const filteredJobs =
    jobs.filter(
      (job) => {
        const query =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          !query ||
          job.company
            .toLowerCase()
            .includes(query) ||
          job.role
            .toLowerCase()
            .includes(query) ||
          job.stream
            .toLowerCase()
            .includes(query) ||
          job.location
            .toLowerCase()
            .includes(query) ||
          job.description
            .toLowerCase()
            .includes(query);

        const streamMatches =
          stream ===
            "All Engineering Streams" ||
          job.stream ===
            stream;

        const locationMatches =
          jobLocationMatches(
            job.location,
            location
          );

        const experienceMatches =
          experience ===
            "All Experience" ||
          job.experience ===
            experience;

        const workModeMatches =
          workMode ===
            "All" ||
          job.workMode ===
            workMode;

        return (
          matchesSearch &&
          streamMatches &&
          locationMatches &&
          experienceMatches &&
          workModeMatches
        );
      }
    );

  /* =======================================================
     SAVE / REMOVE JOB
  ======================================================= */

  const handleSaveJob = (
    job: Job
  ) => {
    const jobId =
      String(job.id);

    const alreadySaved =
      isJobSaved(jobId);

    if (alreadySaved) {
      removeSavedJob(
        jobId
      );

      setSavedJobIds(
        (current) =>
          current.filter(
            (id) =>
              id !== jobId
          )
      );

      return;
    }

    /*
     * saveJob() expects a job WITHOUT savedAt.
     * The service adds savedAt itself.
     */

    saveJob({
      id: jobId,
      company: job.company,
      role: job.role,
      location: job.location,
      stream: job.stream,
      workMode: job.workMode,
      experience: job.experience,
      posted: job.posted,
      description: job.description,
      applyUrl: job.applyUrl,
    });

    setSavedJobIds(
      (current) => [
        ...current,
        jobId,
      ]
    );
  };

  /* =======================================================
     SEARCH / FILTER HANDLERS
  ======================================================= */

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(
      event.target.value
    );

    setPage(1);
  };

  const handleStream = (
    value: string
  ) => {
    setStream(value);
    setPage(1);
  };

  const handleLocation = (
    value: string
  ) => {
    setLocation(value);
    setPage(1);
  };

  const handleExperience = (
    value: string
  ) => {
    setExperience(value);
    setPage(1);
  };

  const handleWorkMode = (
    value: string
  ) => {
    setWorkMode(value);
    setPage(1);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters =
    () => {
      setSearch("");

      setStream(
        "All Engineering Streams"
      );

      setLocation(
        "All Locations"
      );

      setExperience(
        "All Experience"
      );

      setWorkMode(
        "All"
      );

      setPage(1);
    };

  /* =======================================================
     PAGINATION
  ======================================================= */

  const previousPage =
    () => {
      setPage(
        (current) =>
          Math.max(
            1,
            current - 1
          )
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  const nextPage =
    () => {
      setPage(
        (current) =>
          current + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  const hasNextPage =
    totalJobs > 0
      ? page * 20 <
        totalJobs
      : filteredJobs.length > 0;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-white/10 bg-[#080b18] px-6 py-7">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-wrap items-center justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">

                  <BriefcaseBusiness
                    size={24}
                    className="text-indigo-400"
                  />

                </div>

                <div>

                  <p className="text-sm text-indigo-400">
                    CareerPath AI
                  </p>

                  <h1 className="text-3xl font-bold">
                    Job Opportunities
                  </h1>

                </div>

              </div>

              <p className="mt-4 max-w-2xl text-gray-400">
                Find engineering job
                openings and discover
                where and how to apply
                through live job listings.
              </p>

            </div>

            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={17}
                  className="text-indigo-400"
                />

                <span className="text-sm font-medium">
                  Live Job Search
                </span>

              </div>

              <p className="mt-1 text-xs text-gray-500">
                Powered through
                CareerPath AI
              </p>

            </div>

          </div>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* ================= SEARCH ================= */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-5 md:p-6">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={search}
                onChange={
                  handleSearch
                }
                placeholder="Search company, role, skill, or location..."
                className="w-full rounded-xl border border-white/10 bg-[#0b1120] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
              />

            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (current) =>
                    !current
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5"
            >

              <SlidersHorizontal
                size={17}
              />

              Filters

            </button>

            <button
              type="button"
              onClick={
                clearFilters
              }
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Clear
            </button>

          </div>

          {/* ================= FILTERS ================= */}

          {showFilters && (
            <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 md:grid-cols-2 lg:grid-cols-4">

              <FilterSelect
                label="Engineering Stream"
                value={stream}
                options={
                  streamOptions
                }
                onChange={
                  handleStream
                }
              />

              <FilterSelect
                label="Location"
                value={location}
                options={
                  locationOptions
                }
                onChange={
                  handleLocation
                }
              />

              <FilterSelect
                label="Experience"
                value={
                  experience
                }
                options={
                  experienceOptions
                }
                onChange={
                  handleExperience
                }
              />

              <FilterSelect
                label="Work Mode"
                value={workMode}
                options={
                  workModeOptions
                }
                onChange={
                  handleWorkMode
                }
              />

            </div>
          )}

        </section>

        {/* ================= RESULTS HEADER ================= */}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-3">

          <div>

            <h2 className="text-2xl font-bold">
              Available Opportunities
            </h2>

            <p className="mt-1 text-sm text-gray-500">

              {loading
                ? "Searching for jobs..."
                : `${filteredJobs.length} matching ${
                    filteredJobs.length ===
                    1
                      ? "opening"
                      : "openings"
                  }`}

              {!loading &&
                totalJobs > 0 && (
                  <>
                    {" "}
                    •{" "}
                    {totalJobs.toLocaleString(
                      "en-IN"
                    )}{" "}
                    total results
                  </>
                )}

            </p>

          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">

            <Filter
              size={14}
            />

            Live job listings

          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <section className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

            <p className="text-lg font-semibold text-red-400">
              Unable to load jobs
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {error}
            </p>

            <p className="mt-3 text-xs text-gray-600">
              Make sure the CareerPath AI
              backend is running on port
              5000.
            </p>

          </section>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-12 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-indigo-500" />

            <p className="mt-5 text-gray-400">
              Finding the latest
              engineering opportunities...
            </p>

          </section>
        )}

        {/* ================= NO RESULTS ================= */}

        {!loading &&
          !error &&
          filteredJobs.length ===
            0 && (
            <section className="mt-6 rounded-3xl border border-dashed border-white/10 bg-[#111827] p-12 text-center">

              <BriefcaseBusiness
                size={35}
                className="mx-auto text-gray-600"
              />

              <h3 className="mt-5 text-xl font-semibold">
                No matching opportunities
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your
                search or filters.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
              >
                Reset Filters
              </button>

            </section>
          )}

        {/* ================= JOB CARDS ================= */}

        {!loading &&
          !error &&
          filteredJobs.length >
            0 && (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">

              {filteredJobs.map(
                (job) => {
                  const saved =
                    savedJobIds.includes(
                      String(
                        job.id
                      )
                    );

                  return (
                    <article
                      key={job.id}
                      className={`rounded-3xl border bg-[#111827] p-6 transition ${
                        saved
                          ? "border-indigo-500/40"
                          : "border-white/10 hover:border-indigo-500/30"
                      }`}
                    >

                      {/* JOB HEADER */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex min-w-0 gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">

                            <Building2
                              size={23}
                              className="text-indigo-400"
                            />

                          </div>

                          <div className="min-w-0">

                            <h3 className="text-xl font-bold">
                              {
                                job.role
                              }
                            </h3>

                            <p className="mt-1 font-medium text-indigo-300">
                              {
                                job.company
                              }
                            </p>

                          </div>

                        </div>

                        {job.experience !==
                          "Unknown" && (
                          <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            {
                              job.experience
                            }
                          </span>
                        )}

                      </div>

                      {/* TAGS */}

                      <div className="mt-5 flex flex-wrap gap-2">

                        <Tag>
                          {
                            job.stream
                          }
                        </Tag>

                        {job.workMode !==
                          "Unknown" && (
                          <Tag>
                            {
                              job.workMode
                            }
                          </Tag>
                        )}

                        <Tag>

                          <MapPin
                            size={13}
                          />

                          {
                            job.location
                          }

                        </Tag>

                        <Tag>

                          <CalendarDays
                            size={13}
                          />

                          {
                            job.posted
                          }

                        </Tag>

                      </div>

                      {/* CONTRACT */}

                      {job.contractTime && (
                        <div className="mt-4">

                          <span className="rounded-full bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                            {
                              job.contractTime
                            }
                          </span>

                        </div>
                      )}

                      {/* DESCRIPTION */}

                      <p className="mt-5 line-clamp-4 text-sm leading-7 text-gray-400">
                        {
                          job.description
                        }
                      </p>

                      {/* HOW TO APPLY */}

                      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b1120] p-4">

                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          How to Apply
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                          Open the job
                          listing, check
                          the eligibility
                          requirements,
                          and follow the
                          application
                          instructions
                          provided there.
                        </p>

                      </div>

                      {/* SAVE BUTTON */}

                      <button
                        type="button"
                        onClick={() =>
                          handleSaveJob(
                            job
                          )
                        }
                        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                          saved
                            ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >

                        <Bookmark
                          size={17}
                          fill={
                            saved
                              ? "currentColor"
                              : "none"
                          }
                        />

                        {saved
                          ? "Saved Job"
                          : "Save Job"}

                      </button>

                      {/* OPEN JOB */}

                      {job.applyUrl ? (
                        <a
                          href={
                            job.applyUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >

                          View Job Opening

                          <ExternalLink
                            size={16}
                          />

                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-700 px-5 py-3 text-sm font-semibold text-gray-400"
                        >
                          Opening Unavailable
                        </button>
                      )}

                    </article>
                  );
                }
              )}

            </div>
          )}

        {/* ================= PAGINATION ================= */}

        {!loading &&
          !error &&
          filteredJobs.length >
            0 && (
            <div className="mt-8 flex items-center justify-center gap-4">

              <button
                type="button"
                disabled={
                  page <= 1
                }
                onClick={
                  previousPage
                }
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-xl bg-white/5 px-5 py-3 text-sm text-gray-400">
                Page {page}
              </span>

              <button
                type="button"
                disabled={
                  !hasNextPage
                }
                onClick={
                  nextPage
                }
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>

            </div>
          )}

        {/* ================= NOTICE ================= */}

        <section className="mt-10 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">

          <p className="text-sm font-semibold text-amber-300">
            Important
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Job availability can change.
            Always verify the current
            opening, eligibility,
            closing date, and
            application instructions
            on the original job listing
            before applying.
          </p>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-medium text-gray-500">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

      </select>

    </label>
  );
}

/* =========================================================
   TAG
========================================================= */

function Tag({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
      {children}
    </span>
  );
}