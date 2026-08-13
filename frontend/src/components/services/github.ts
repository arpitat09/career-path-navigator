export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubInsights {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  recentActivity: number;
  score: number;
}

const API = "https://api.github.com";

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error("GitHub user not found. Check the username and try again.");
    if (response.status === 403) throw new Error("GitHub API rate limit reached. Please wait and try again.");
    throw new Error(`GitHub request failed (${response.status}).`);
  }
  return response.json();
}

export async function getGitHubInsights(username: string): Promise<GitHubInsights> {
  const user = username.trim();
  if (!user) throw new Error("Please enter a GitHub username.");

  const profile = await githubFetch<GitHubProfile>(`${API}/users/${encodeURIComponent(user)}`);
  const repositories = await githubFetch<GitHubRepository[]>(`${API}/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`);
  const events = await githubFetch<unknown[]>(`${API}/users/${encodeURIComponent(user)}/events/public?per_page=100`);

  const languages: Record<string, number> = {};
  await Promise.all(repositories.slice(0, 20).map(async (repo) => {
    try {
      const data = await githubFetch<Record<string, number>>(`${API}/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo.name)}/languages`);
      Object.entries(data).forEach(([name, bytes]) => {
        languages[name] = (languages[name] || 0) + bytes;
      });
    } catch { /* keep profile usable if one language request fails */ }
  }));

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const score = Math.min(100, Math.round(
    Math.min(repositories.length * 2, 30) +
    Math.min(profile.followers, 20) +
    Math.min(totalStars * 2, 20) +
    Math.min(totalForks * 2, 15) +
    Math.min(events.length, 15)
  ));

  return { profile, repositories, languages, totalStars, totalForks, recentActivity: events.length, score };
}