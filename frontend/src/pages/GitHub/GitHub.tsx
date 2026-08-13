import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Code2,
  ExternalLink,
  GitCommit,
  Lightbulb,
  Loader2,
  RefreshCw,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

import { useState } from "react";

type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
  homepage?: string | null;
  size: number;
  fork: boolean;
};

type ProjectSuggestion = {
  repo: GithubRepo;
  suggestions: string[];
  strengths: string[];
  score: number;
};

function unique(items: string[]) {
  return [...new Set(items)];
}

function buildProjectSuggestions(
  repo: GithubRepo
): ProjectSuggestion {
  const suggestions: string[] = [];
  const strengths: string[] = [];
  let score = 60;

  if (repo.description?.trim()) {
    strengths.push("Project has a description.");
    score += 5;
  } else {
    suggestions.push(
      "Add a clear README description explaining the problem, solution, and main features."
    );
  }

  if (repo.homepage) {
    strengths.push("Project has a live/demo link.");
    score += 8;
  } else {
    suggestions.push(
      "Add a live demo or deployed project link when possible."
    );
  }

  if (repo.topics && repo.topics.length > 0) {
    strengths.push("Repository uses GitHub topics.");
    score += 5;
  } else {
    suggestions.push(
      "Add GitHub topics such as the framework, language, domain, and project type."
    );
  }

  if (repo.stargazers_count > 0) {
    strengths.push(
      `Project has ${repo.stargazers_count} star${
        repo.stargazers_count === 1 ? "" : "s"
      }.`
    );
    score += 5;
  } else {
    suggestions.push(
      "Improve the project's presentation and share it in your portfolio so it can attract visibility."
    );
  }

  if (repo.language) {
    strengths.push(`${repo.language} detected as the primary language.`);
  } else {
    suggestions.push(
      "Add meaningful source files in a primary technology so the project's technical stack is clear."
    );
  }

  if (repo.forks_count === 0) {
    suggestions.push(
      "Add contribution guidance and setup instructions if you want others to use or contribute to the project."
    );
  }

  if (repo.open_issues_count > 0) {
    suggestions.push(
      `Review the ${repo.open_issues_count} open issue${
        repo.open_issues_count === 1 ? "" : "s"
      } and close, label, or document them.`
    );
  }

  if (repo.size < 50) {
    suggestions.push(
      "Consider adding tests, documentation, screenshots, or a small real-world feature if the project is intended for your portfolio."
    );
  }

  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(repo.pushed_at).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysSinceUpdate > 180) {
    suggestions.push(
      "The repository has not been updated recently. Refresh dependencies and add a meaningful improvement if the project is still relevant."
    );
  }

  return {
    repo,
    suggestions: unique(suggestions).slice(0, 5),
    strengths: unique(strengths),
    score: Math.min(score, 100),
  };
}

function buildProfileSuggestions(
  profile: GithubProfile,
  repos: GithubRepo[]
) {
  const suggestions: string[] = [];
  const strengths: string[] = [];

  const portfolioRepos = repos.filter(
    (repo) => !repo.fork
  );

  if (!profile.bio?.trim()) {
    suggestions.push(
      "Add a concise GitHub bio that states your engineering branch, strongest technologies, and career goal."
    );
  } else {
    strengths.push("Your GitHub profile has a bio.");
  }

  if (profile.name?.trim()) {
    strengths.push("Your profile has a visible name.");
  } else {
    suggestions.push(
      "Add your real professional name to make the profile easier for recruiters to identify."
    );
  }

  if (profile.public_repos < 5) {
    suggestions.push(
      "Build and publish more meaningful engineering projects instead of relying only on small practice repositories."
    );
  } else {
    strengths.push(
      `You have ${profile.public_repos} public repositories.`
    );
  }

  if (portfolioRepos.length > 0) {
    strengths.push(
      `${portfolioRepos.length} non-fork project${
        portfolioRepos.length === 1 ? "" : "s"
      } can be showcased.`
    );
  }

  const missingReadmes = portfolioRepos.filter(
    (repo) => !repo.description?.trim()
  );

  if (missingReadmes.length > 0) {
    suggestions.push(
      `${missingReadmes.length} project${
        missingReadmes.length === 1 ? " is" : "s are"
      } missing a clear repository description.`
    );
  }

  const languages = unique(
    portfolioRepos
      .map((repo) => repo.language)
      .filter(
        (language): language is string =>
          Boolean(language)
      )
  );

  if (languages.length >= 3) {
    strengths.push(
      `Your repositories demonstrate ${languages.length} different technologies.`
    );
  } else {
    suggestions.push(
      "Show a broader engineering skill set through a few strong projects using relevant technologies."
    );
  }

  if (profile.followers < 10) {
    suggestions.push(
      "Grow your professional GitHub network by contributing to projects, following relevant engineers, and sharing useful work."
    );
  }

  suggestions.push(
    "Pin your 4–6 strongest projects and order them according to the engineering role you want."
  );

  suggestions.push(
    "Keep README files recruiter-friendly: problem, features, tech stack, architecture, setup steps, screenshots, demo link, and your contribution."
  );

  suggestions.push(
    "Add tests and CI where appropriate to demonstrate production engineering practices."
  );

  suggestions.push(
    "Use meaningful repository names and avoid leaving unfinished tutorial repositories as your main showcased projects."
  );

  return {
    suggestions: unique(suggestions),
    strengths: unique(strengths),
  };
}

export default function GitHub() {
  const [githubUsername, setGithubUsername] =
    useState("");

  const [connected, setConnected] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [profile, setProfile] =
    useState<GithubProfile | null>(null);

  const [repos, setRepos] =
    useState<GithubRepo[]>([]);

  const [selectedProject, setSelectedProject] =
    useState<ProjectSuggestion | null>(null);

  const [showAllProjects, setShowAllProjects] =
    useState(false);

  const analyzeGithub = async () => {
    const username =
      githubUsername.trim().replace(/^@/, "");

    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const profileResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          username
        )}`
      );

      if (!profileResponse.ok) {
        if (profileResponse.status === 404) {
          throw new Error(
            "GitHub username was not found."
          );
        }

        if (profileResponse.status === 403) {
          throw new Error(
            "GitHub API rate limit reached. Please try again later."
          );
        }

        throw new Error(
          "Unable to load the GitHub profile."
        );
      }

      const profileData =
        (await profileResponse.json()) as GithubProfile;

      const reposResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          username
        )}/repos?per_page=100&sort=updated`
      );

      if (!reposResponse.ok) {
        throw new Error(
          "The profile loaded, but repositories could not be retrieved."
        );
      }

      const reposData =
        (await reposResponse.json()) as GithubRepo[];

      setProfile(profileData);
      setRepos(
        reposData.filter(
          (repo) => !repo.fork
        )
      );
      setConnected(true);
      setSelectedProject(null);
      setShowAllProjects(false);

      try {
        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const userId =
          user?.id || user?._id;

        if (userId) {
          localStorage.setItem(
            `githubUsername_${userId}`,
            username
          );
        }
      } catch {
        // GitHub analysis remains usable if localStorage fails.
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "GitHub analysis failed."
      );
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const changeAccount = () => {
    setConnected(false);
    setProfile(null);
    setRepos([]);
    setSelectedProject(null);
    setError("");
  };

  const profileAnalysis = profile
    ? buildProfileSuggestions(
        profile,
        repos
      )
    : null;

  const projectAnalyses = repos.map(
    buildProjectSuggestions
  );

  const displayedProjects =
    showAllProjects
      ? projectAnalyses
      : projectAnalyses.slice(0, 6);

  const totalStars = repos.reduce(
    (sum, repo) =>
      sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) =>
      sum + repo.forks_count,
    0
  );

  const averageProjectScore =
    projectAnalyses.length > 0
      ? Math.round(
          projectAnalyses.reduce(
            (sum, project) =>
              sum + project.score,
            0
          ) / projectAnalyses.length
        )
      : 0;

  const languages = unique(
    repos
      .map((repo) => repo.language)
      .filter(
        (language): language is string =>
          Boolean(language)
      )
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#080b18] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Code2
                size={25}
                className="text-indigo-400"
              />

              <h1 className="text-2xl font-bold">
                GitHub Insights
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-400">
              Analyze your GitHub profile, projects,
              technologies, and improvement areas.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Live GitHub Analysis
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {!connected ? (
          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Code2
                  size={32}
                  className="text-indigo-400"
                />
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                Connect Your GitHub
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                Enter your GitHub username to analyze
                your public repositories and receive
                personalized suggestions for improving
                your profile and projects.
              </p>

              <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(event) =>
                    setGithubUsername(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      analyzeGithub();
                    }
                  }}
                  placeholder="Enter GitHub username"
                  className="flex-1 rounded-xl border border-white/10 bg-[#111827] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={analyzeGithub}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-medium transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-5 flex max-w-xl items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-left text-sm text-red-300">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  {error}
                </div>
              )}

              <p className="mt-5 text-xs text-gray-600">
                Uses public GitHub profile and repository
                information. No GitHub password is requested.
              </p>
            </div>
          </div>
        ) : profile ? (
          <>
            {/* Profile header */}
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <img
                    src={profile.avatar_url}
                    alt={`${profile.login} avatar`}
                    className="h-20 w-20 rounded-full border border-white/10"
                  />

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">
                        @{profile.login}
                      </h2>

                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                        Connected
                      </span>
                    </div>

                    {profile.name && (
                      <p className="mt-1 text-gray-300">
                        {profile.name}
                      </p>
                    )}

                    <p className="mt-2 max-w-2xl text-sm text-gray-400">
                      {profile.bio ||
                        "No GitHub bio added yet."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
                  >
                    View GitHub
                    <ExternalLink size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={changeAccount}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
                  >
                    <RefreshCw size={16} />
                    Change Account
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard
                label="Repositories"
                value={repos.length}
                icon={<Code2 size={20} />}
              />

              <StatCard
                label="Followers"
                value={profile.followers}
                icon={<Code2 size={20} />}
              />

              <StatCard
                label="Stars"
                value={totalStars}
                icon={<Star size={20} />}
              />

              <StatCard
                label="Forks"
                value={totalForks}
                icon={<GitCommit size={20} />}
              />

              <StatCard
                label="Project Score"
                value={`${averageProjectScore}%`}
                icon={<TrendingUp size={20} />}
              />
            </div>

            {/* Profile suggestions */}
            <div className="mt-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">
                  <Sparkles
                    size={22}
                    className="text-indigo-400"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">
                    How to Improve Your GitHub Profile
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    These recommendations are generated from
                    the public profile and repositories that
                    were analyzed.
                  </p>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <RecommendationList
                      title="What you're doing well"
                      items={
                        profileAnalysis?.strengths || []
                      }
                      success
                    />

                    <RecommendationList
                      title="What to improve"
                      items={
                        profileAnalysis?.suggestions || []
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Technology overview */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
              <div className="flex items-center gap-3">
                <Code2
                  size={22}
                  className="text-indigo-400"
                />

                <h3 className="text-xl font-bold">
                  Technologies Detected
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {languages.length > 0 ? (
                  languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
                    >
                      {language}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No primary languages were detected.
                  </p>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="mt-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-2xl font-bold">
                    Your Projects
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Project-by-project suggestions to make
                    your repositories stronger for recruiters.
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  {projectAnalyses.length} projects analyzed
                </span>
              </div>

              {projectAnalyses.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-8 text-center">
                  <p className="text-gray-400">
                    No non-fork public repositories were found.
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Publish a few engineering projects to get
                    project-specific recommendations.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {displayedProjects.map(
                    (project) => (
                      <div
                        key={project.repo.id}
                        className="rounded-2xl border border-white/10 bg-[#111827] p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-bold">
                              {project.repo.name}
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                              {project.repo.description ||
                                "No repository description added."}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">
                            {project.score}%
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs">
                          {project.repo.language && (
                            <span className="rounded-full bg-white/5 px-3 py-1 text-gray-400">
                              {project.repo.language}
                            </span>
                          )}

                          <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-gray-400">
                            <Star size={12} />
                            {project.repo.stargazers_count}
                          </span>

                          <span className="rounded-full bg-white/5 px-3 py-1 text-gray-400">
                            {project.repo.forks_count} forks
                          </span>
                        </div>

                        <div className="mt-5">
                          <p className="text-sm font-semibold text-yellow-400">
                            Suggestions
                          </p>

                          <ul className="mt-3 space-y-2">
                            {project.suggestions
                              .slice(0, 3)
                              .map((suggestion) => (
                                <li
                                  key={suggestion}
                                  className="flex gap-2 text-sm leading-6 text-gray-400"
                                >
                                  <Lightbulb
                                    size={16}
                                    className="mt-1 shrink-0 text-yellow-400"
                                  />
                                  {suggestion}
                                </li>
                              ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProject(
                              project
                            )
                          }
                          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                        >
                          View full project analysis
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

              {projectAnalyses.length > 6 && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllProjects(
                        (current) => !current
                      )
                    }
                    className="rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-300 hover:bg-white/5"
                  >
                    {showAllProjects
                      ? "Show Fewer Projects"
                      : "Show All Projects"}
                  </button>
                </div>
              )}
            </div>

            {/* Project modal */}
            {selectedProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
                <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#111827] p-7 shadow-2xl">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-indigo-400">
                        Project Analysis
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">
                        {selectedProject.repo.name}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProject(null)
                      }
                      className="rounded-lg border border-white/10 px-3 py-2 text-gray-400 hover:bg-white/5"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/5 p-5">
                    <p className="text-sm text-gray-500">
                      Project readiness
                    </p>

                    <p className="mt-1 text-4xl font-bold text-indigo-300">
                      {selectedProject.score}%
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-green-400">
                      Strengths
                    </h4>

                    <ul className="mt-3 space-y-3">
                      {selectedProject.strengths.length > 0 ? (
                        selectedProject.strengths.map(
                          (item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm leading-6 text-gray-400"
                            >
                              <CheckCircle
                                size={17}
                                className="mt-1 shrink-0 text-green-400"
                              />
                              {item}
                            </li>
                          )
                        )
                      ) : (
                        <li className="text-sm text-gray-500">
                          No strong signals were detected yet.
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-7">
                    <h4 className="font-semibold text-yellow-400">
                      Recommended Improvements
                    </h4>

                    <ul className="mt-3 space-y-3">
                      {selectedProject.suggestions.map(
                        (item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-6 text-gray-400"
                          >
                            <Lightbulb
                              size={17}
                              className="mt-1 shrink-0 text-yellow-400"
                            />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <a
                    href={
                      selectedProject.repo.html_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
                  >
                    Open Repository
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {label}
        </p>

        <span className="text-indigo-400">
          {icon}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function RecommendationList({
  title,
  items,
  success = false,
}: {
  title: string;
  items: string[];
  success?: boolean;
}) {
  return (
    <div>
      <h4
        className={
          success
            ? "font-semibold text-green-400"
            : "font-semibold text-yellow-400"
        }
      >
        {title}
      </h4>

      <ul className="mt-3 space-y-3">
        {items.slice(0, 6).map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-6 text-gray-400"
          >
            {success ? (
              <CheckCircle
                size={16}
                className="mt-1 shrink-0 text-green-400"
              />
            ) : (
              <Lightbulb
                size={16}
                className="mt-1 shrink-0 text-yellow-400"
              />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}