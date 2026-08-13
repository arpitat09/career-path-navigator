import { useState } from "react";
import {
  BriefcaseBusiness,
  ExternalLink,
  MapPin,
  CalendarDays,
  Trash2,
  Bookmark,
  Search,
} from "lucide-react";

import {
  getSavedJobs,
  removeSavedJob,
  type SavedJob,
} from "../../components/services/savedJobs";

export default function SavedJobs() {
  const [jobs, setJobs] = useState<SavedJob[]>(() => getSavedJobs());
  const [search, setSearch] = useState("");

  const handleRemove = (jobId: string) => {
    removeSavedJob(jobId);

    setJobs((current) =>
      current.filter((job) => String(job.id) !== String(jobId))
    );
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "Recently saved";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently saved";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      String(job.role || "")
        .toLowerCase()
        .includes(searchText) ||
      String(job.company || "")
        .toLowerCase()
        .includes(searchText) ||
      String(job.location || "")
        .toLowerCase()
        .includes(searchText) ||
      String(job.stream || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-[#080b18] px-6 py-8 text-white lg:px-10">
      {/* ================= HEADER ================= */}

      <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-indigo-400">
            <Bookmark size={16} />
            CareerPath AI
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Saved Jobs
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Keep track of job openings that you want to review or apply for
            later.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
          <Bookmark size={18} className="text-indigo-400" />

          <div>
            <p className="text-sm font-semibold text-white">
              {jobs.length} Saved
            </p>

            <p className="text-xs text-gray-400">
              Job opportunities
            </p>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      {jobs.length > 0 && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#111827] p-4">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search saved jobs by company, role, location..."
              className="w-full rounded-xl border border-white/10 bg-[#080b18] py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}

      {jobs.length === 0 && (
        <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#111827]">
          <div className="max-w-md px-6 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
              <Bookmark
                size={30}
                className="text-indigo-400"
              />
            </div>

            <h2 className="text-xl font-semibold text-white">
              No saved jobs yet
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              When you find an interesting job in Job Opportunities, click
              <span className="font-medium text-indigo-400">
                {" "}
                Save Job
              </span>
              . It will appear here for easy access later.
            </p>

            <a
              href="/jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              <BriefcaseBusiness size={17} />
              Find Jobs
            </a>
          </div>
        </div>
      )}

      {/* ================= NO SEARCH RESULTS ================= */}

      {jobs.length > 0 && filteredJobs.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-12 text-center">
          <Search
            size={30}
            className="mx-auto mb-4 text-gray-500"
          />

          <h2 className="text-lg font-semibold text-white">
            No matching saved jobs
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Try searching for a different company, role, or location.
          </p>
        </div>
      )}

      {/* ================= SAVED JOBS ================= */}

      {filteredJobs.length > 0 && (
        <>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Your Saved Opportunities
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"} found
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {filteredJobs.map((job) => (
              <div
                key={String(job.id)}
                className="group rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500/40"
              >
                {/* ================= JOB HEADER ================= */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                      <BriefcaseBusiness
                        size={22}
                        className="text-indigo-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold text-white">
                        {job.role || "Job Opportunity"}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-indigo-400">
                        {job.company || "Company not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                    Saved
                  </div>
                </div>

                {/* ================= JOB DETAILS ================= */}

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stream && (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                      {job.stream}
                    </span>
                  )}

                  {job.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                  )}

                  {job.workMode && (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                      {job.workMode}
                    </span>
                  )}

                  {job.experience && (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                      {job.experience}
                    </span>
                  )}

                  {job.posted && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                      <CalendarDays size={13} />
                      Posted {formatDate(job.posted)}
                    </span>
                  )}
                </div>

                {/* ================= DESCRIPTION ================= */}

                {job.description && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-[#0b1020] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Job Description
                    </p>

                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-400">
                      {job.description}
                    </p>
                  </div>
                )}

                {/* ================= SAVED DATE ================= */}

                <div className="mt-4 text-xs text-gray-600">
                  Saved on {formatDate(job.savedAt)}
                </div>

                {/* ================= ACTIONS ================= */}

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {job.applyUrl ? (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                      View Job Opening
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-700 px-4 py-3 text-sm font-semibold text-gray-400"
                    >
                      Opening Unavailable
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(String(job.id))}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}