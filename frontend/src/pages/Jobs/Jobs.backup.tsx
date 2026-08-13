import {
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

import { useMemo, useState } from "react";

type Job = {
  id: string;
  company: string;
  role: string;
  stream: string;
  location: string;
  workMode: "On-site" | "Hybrid" | "Remote";
  experience: "Fresher" | "0-1 years" | "1-2 years" | "2+ years";
  posted: string;
  description: string;
  applyUrl: string;
  howToApply: string;
};

const jobs: Job[] = [
  {
    id: "job-1",
    company: "Tata Consultancy Services",
    role: "Graduate Engineer Trainee",
    stream: "Computer Science / IT",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    experience: "Fresher",
    posted: "Recently listed",
    description:
      "Engineering graduate opportunity focused on software development, testing, and enterprise technology.",
    applyUrl: "https://www.tcs.com/careers",
    howToApply:
      "Open the official TCS careers page, search for the relevant graduate or engineering opening, and follow the official application instructions.",
  },
  {
    id: "job-2",
    company: "Infosys",
    role: "Systems Engineer",
    stream: "Computer Science / IT",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    experience: "Fresher",
    posted: "Recently listed",
    description:
      "Entry-level engineering role involving application development, programming, debugging, and technology delivery.",
    applyUrl: "https://www.infosys.com/careers/",
    howToApply:
      "Visit the official Infosys careers page, find the matching engineering role, review the eligibility requirements, and use the official application process.",
  },
  {
    id: "job-3",
    company: "Accenture",
    role: "Associate Software Engineer",
    stream: "Computer Science / IT",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    experience: "Fresher",
    posted: "Recently listed",
    description:
      "Entry-level software engineering opportunity covering development, testing, problem solving, and technology projects.",
    applyUrl: "https://www.accenture.com/in-en/careers",
    howToApply:
      "Use the official Accenture careers portal to search for Associate Software Engineer or graduate engineering openings and follow the listed application steps.",
  },
  {
    id: "job-4",
    company: "Wipro",
    role: "Project Engineer",
    stream: "Computer Science / IT",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    experience: "Fresher",
    posted: "Recently listed",
    description:
      "Graduate engineering role with opportunities across software development and technology services.",
    applyUrl: "https://careers.wipro.com/",
    howToApply:
      "Open Wipro Careers, search for graduate or project engineer openings, check eligibility, and apply through the official job listing.",
  },
  {
    id: "job-5",
    company: "Bosch",
    role: "Software Engineer",
    stream: "Computer Science / IT",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    experience: "0-1 years",
    posted: "Recently listed",
    description:
      "Software engineering opportunity within an engineering-focused technology environment.",
    applyUrl: "https://www.bosch.in/careers/",
    howToApply:
      "Visit the official Bosch careers page and search for software engineering roles matching your qualification and experience.",
  },
  {
    id: "job-6",
    company: "Siemens",
    role: "Graduate Engineer",
    stream: "Electronics / Electrical",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    experience: "Fresher",
    posted: "Recently listed",
    description:
      "Engineering graduate opportunity connected with industrial technology and engineering solutions.",
    applyUrl: "https://www.siemens.com/in/en/company/jobs.html",
    howToApply:
      "Open the official Siemens Jobs page, search for graduate engineering opportunities, verify eligibility, and follow the official application process.",
  },
  {
    id: "job-7",
    company: "Honeywell",
    role: "Graduate Engineer",
    stream: "Electronics / Electrical",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    experience: "Fresher",
    posted: "Recently listed",
    description:
      "Engineering role related to technology, automation, and industrial solutions.",
    applyUrl: "https://www.honeywell.com/us/en/careers",
    howToApply:
      "Use Honeywell's official careers page to search graduate engineering openings and apply through the specific job listing.",
  },
  {
    id: "job-8",
    company: "NVIDIA",
    role: "Software Engineer",
    stream: "Computer Science / AI / ML",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    experience: "0-1 years",
    posted: "Recently listed",
    description:
      "Software engineering opportunity suitable for candidates interested in systems, software, and computing technologies.",
    applyUrl: "https://www.nvidia.com/en-us/about-nvidia/careers/",
    howToApply:
      "Visit NVIDIA's official careers page, search Bengaluru software engineering positions, check the requirements, and apply through the official listing.",
  },
];

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

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [stream, setStream] = useState("All Engineering Streams");
  const [location, setLocation] = useState("All Locations");
  const [experience, setExperience] =
    useState("All Experience");
  const [workMode, setWorkMode] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.company.toLowerCase().includes(query) ||
        job.role.toLowerCase().includes(query) ||
        job.stream.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      const matchesStream =
        stream === "All Engineering Streams" ||
        job.stream === stream;

      const matchesLocation =
        location === "All Locations" ||
        job.location === location;

      const matchesExperience =
        experience === "All Experience" ||
        job.experience === experience;

      const matchesWorkMode =
        workMode === "All" ||
        job.workMode === workMode;

      return (
        matchesSearch &&
        matchesStream &&
        matchesLocation &&
        matchesExperience &&
        matchesWorkMode
      );
    });
  }, [
    search,
    stream,
    location,
    experience,
    workMode,
  ]);

  const clearFilters = () => {
    setSearch("");
    setStream("All Engineering Streams");
    setLocation("All Locations");
    setExperience("All Experience");
    setWorkMode("All");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
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
                Find engineering job openings and discover
                where and how to apply through the official
                company career pages.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={17}
                  className="text-indigo-400"
                />
                <span className="text-sm font-medium">
                  Engineering Jobs Only
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                No application submission inside CareerPath AI
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-3xl border border-white/10 bg-[#111827] p-5 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search company, role, skill, or location..."
                className="w-full rounded-xl border border-white/10 bg-[#0b1120] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters((current) => !current)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
            >
              Clear
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 md:grid-cols-2 lg:grid-cols-4">
              <FilterSelect
                label="Engineering Stream"
                value={stream}
                options={streamOptions}
                onChange={setStream}
              />

              <FilterSelect
                label="Location"
                value={location}
                options={locationOptions}
                onChange={setLocation}
              />

              <FilterSelect
                label="Experience"
                value={experience}
                options={experienceOptions}
                onChange={setExperience}
              />

              <FilterSelect
                label="Work Mode"
                value={workMode}
                options={[
                  "All",
                  "On-site",
                  "Hybrid",
                  "Remote",
                ]}
                onChange={setWorkMode}
              />
            </div>
          )}
        </section>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">
              Available Opportunities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredJobs.length} matching engineering{" "}
              {filteredJobs.length === 1
                ? "opening"
                : "openings"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Filter size={14} />
            Use filters to narrow the results
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <section className="mt-6 rounded-3xl border border-dashed border-white/10 bg-[#111827] p-12 text-center">
            <BriefcaseBusiness
              size={35}
              className="mx-auto text-gray-600"
            />

            <h3 className="mt-5 text-xl font-semibold">
              No matching opportunities
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
            >
              Reset Filters
            </button>
          </section>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-3xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                      <Building2
                        size={23}
                        className="text-indigo-400"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">
                        {job.role}
                      </h3>

                      <p className="mt-1 font-medium text-indigo-300">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    {job.experience}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Tag>{job.stream}</Tag>
                  <Tag>{job.workMode}</Tag>

                  <Tag>
                    <MapPin size={13} />
                    {job.location}
                  </Tag>

                  <Tag>
                    <CalendarDays size={13} />
                    {job.posted}
                  </Tag>
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-400">
                  {job.description}
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b1120] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    How to Apply
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {job.howToApply}
                  </p>
                </div>

                <div className="mt-5">
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                  >
                    View Official Opening
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <section className="mt-10 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
          <p className="text-sm font-semibold text-amber-300">
            Important
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Job availability can change. Always verify the
            current opening, eligibility, closing date, and
            application instructions on the company's official
            career page before applying.
          </p>
        </section>
      </main>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-gray-500">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Tag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
      {children}
    </span>
  );
}