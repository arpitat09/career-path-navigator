export type SavedJob = {
  id: string;
  company: string;
  role: string;
  location: string;
  stream: string;
  workMode: string;
  experience: string;
  posted: string;
  description: string;
  applyUrl: string;
  savedAt: string;
};

function getSavedJobsKey(): string | null {
  try {
    const rawUser = localStorage.getItem("user");

    if (!rawUser) {
      return null;
    }

    const user = JSON.parse(rawUser);

    const userId = user.id || user._id;

    if (!userId) {
      return null;
    }

    return `savedJobs_${String(userId)}`;
  } catch {
    return null;
  }
}

export function getSavedJobs(): SavedJob[] {
  const key = getSavedJobsKey();

  if (!key) {
    return [];
  }

  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isJobSaved(jobId: string): boolean {
  return getSavedJobs().some(
    (job) => String(job.id) === String(jobId)
  );
}

export function saveJob(
  job: Omit<SavedJob, "savedAt">
): void {
  const key = getSavedJobsKey();

  if (!key) {
    return;
  }

  const existingJobs = getSavedJobs();

  const alreadySaved = existingJobs.some(
    (item) => String(item.id) === String(job.id)
  );

  if (alreadySaved) {
    return;
  }

  const newJob: SavedJob = {
    ...job,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    key,
    JSON.stringify([
      newJob,
      ...existingJobs,
    ])
  );
}

export function removeSavedJob(
  jobId: string
): void {
  const key = getSavedJobsKey();

  if (!key) {
    return;
  }

  const updatedJobs = getSavedJobs().filter(
    (job) => String(job.id) !== String(jobId)
  );

  localStorage.setItem(
    key,
    JSON.stringify(updatedJobs)
  );
}

export function clearSavedJobs(): void {
  const key = getSavedJobsKey();

  if (!key) {
    return;
  }

  localStorage.removeItem(key);
}