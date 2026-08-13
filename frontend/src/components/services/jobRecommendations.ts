export type CareerProfile = {
  role?: string;
  skills?: string[];
  preferredRoles?: string[];
  preferredLocations?: string[];
  location?: string;
};

/* =========================================================
   GET CURRENT USER ID
========================================================= */

function getCurrentUserId(): string {
  try {
    const rawUser = localStorage.getItem("user");

    if (!rawUser) {
      return "guest";
    }

    const user = JSON.parse(rawUser);

    return String(
      user?.id ||
        user?._id ||
        user?.email ||
        "guest"
    );
  } catch {
    return "guest";
  }
}


/* =========================================================
   LOAD CAREER PROFILE
========================================================= */

export function getCareerProfile(): CareerProfile | null {
  try {
    const userId = getCurrentUserId();

    const profileKey =
      `careerpath_profile_${userId}`;

    const raw =
      localStorage.getItem(profileKey);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return null;
    }

    return {
      role:
        typeof parsed.role === "string"
          ? parsed.role
          : "",

      skills:
        Array.isArray(parsed.skills)
          ? parsed.skills.filter(
              (
                item: unknown
              ): item is string =>
                typeof item === "string"
            )
          : [],

      preferredRoles:
        Array.isArray(
          parsed.preferredRoles
        )
          ? parsed.preferredRoles.filter(
              (
                item: unknown
              ): item is string =>
                typeof item === "string"
            )
          : [],

      preferredLocations:
        Array.isArray(
          parsed.preferredLocations
        )
          ? parsed.preferredLocations.filter(
              (
                item: unknown
              ): item is string =>
                typeof item === "string"
            )
          : [],

      location:
        typeof parsed.location === "string"
          ? parsed.location
          : "",
    };
  } catch {
    return null;
  }
}


/* =========================================================
   CALCULATE JOB MATCH SCORE
========================================================= */

export function calculateJobMatchScore(
  job: {
    role?: string;
    company?: string;
    location?: string;
    stream?: string;
    description?: string;
  },
  profile: CareerProfile | null
): number {
  if (!profile) {
    return 0;
  }

  let score = 0;

  const roleText =
    String(job.role || "").toLowerCase();

  const locationText =
    String(job.location || "").toLowerCase();

  const streamText =
    String(job.stream || "").toLowerCase();

  const descriptionText =
    String(job.description || "").toLowerCase();


  /* -------------------------------------------------------
     PREFERRED ROLES
  ------------------------------------------------------- */

  const preferredRoles =
    profile.preferredRoles || [];

  preferredRoles.forEach((role) => {
    const value =
      role.toLowerCase().trim();

    if (!value) {
      return;
    }

    if (
      roleText.includes(value) ||
      descriptionText.includes(value)
    ) {
      score += 35;
    }
  });


  /* -------------------------------------------------------
     CURRENT ROLE
  ------------------------------------------------------- */

  if (profile.role) {
    const value =
      profile.role.toLowerCase().trim();

    if (
      value &&
      (
        roleText.includes(value) ||
        descriptionText.includes(value)
      )
    ) {
      score += 20;
    }
  }


  /* -------------------------------------------------------
     PREFERRED LOCATIONS
  ------------------------------------------------------- */

  const preferredLocations =
    profile.preferredLocations || [];

  preferredLocations.forEach(
    (location) => {
      const value =
        location.toLowerCase().trim();

      if (!value) {
        return;
      }

      if (
        locationText.includes(value)
      ) {
        score += 20;
      }
    }
  );


  /* -------------------------------------------------------
     CURRENT LOCATION
  ------------------------------------------------------- */

  if (profile.location) {
    const value =
      profile.location
        .toLowerCase()
        .trim();

    if (
      value &&
      locationText.includes(value)
    ) {
      score += 15;
    }
  }


  /* -------------------------------------------------------
     SKILLS
  ------------------------------------------------------- */

  const skills =
    profile.skills || [];

  skills.forEach((skill) => {
    const value =
      skill.toLowerCase().trim();

    if (!value) {
      return;
    }

    if (
      roleText.includes(value) ||
      streamText.includes(value) ||
      descriptionText.includes(value)
    ) {
      score += 5;
    }
  });


  return Math.min(
    score,
    100
  );
}