import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Code2,
  Briefcase,
  Award,
  Edit3,
  CheckCircle,
  Sparkles,
  GitBranch,
  FileText,
  Plus,
  X,
  Link2,
  Upload,
  ExternalLink,
  Trash2,
  Save,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string;
  link: string;
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  certificateId: string;
  link: string;
};

type Education = {
  degree: string;
  branch: string;
  college: string;
  years: string;
};

type ProfileData = {
  name: string;
  email: string;
  profileImage: string;
  location: string;
  branch: string;
  role: string;
  skills: string[];
  education: Education;
  projects: Project[];
  certificates: Certificate[];
  github: string;
  linkedin: string;
  portfolio: string;
  preferredRoles: string[];
  preferredLocations: string[];
  resumeName: string;
  resumeData: string;
};

const defaultProfile: ProfileData = {
  name: "",
  email: "",
  profileImage: "",
  location: "",
  branch: "Computer Science & Engineering",
  role: "Full Stack Developer",
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Git",
    "GitHub",
  ],
  education: {
    degree: "Bachelor of Engineering",
    branch: "Computer Science & Engineering",
    college: "Atria Institute of Technology",
    years: "2023 – 2027",
  },
  projects: [],
  certificates: [],
  github: "",
  linkedin: "",
  portfolio: "",
  preferredRoles: ["Software Engineer", "Full Stack Developer"],
  preferredLocations: ["Bengaluru"],
  resumeName: "",
  resumeData: "",
};

function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function getUserId() {
  const user = getCurrentUser();
  return String(user?.id || user?._id || user?.email || "guest");
}

function getProfileKey() {
  return `careerpath_profile_${getUserId()}`;
}

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

type StoredProject = {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  tech?: unknown;
  link?: unknown;
};

type StoredCertificate = {
  id?: unknown;
  title?: unknown;
  issuer?: unknown;
  date?: unknown;
  certificateId?: unknown;
  link?: unknown;
};

function loadProfile(): ProfileData {
  const user = getCurrentUser();

  const fallback: ProfileData = {
    ...defaultProfile,
    name: safeString(user?.name),
    email: safeString(user?.email),
    profileImage: safeString(user?.picture || user?.profileImage),
  };

  try {
    const saved = localStorage.getItem(getProfileKey());
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }

    return {
      ...fallback,
      ...parsed,
      name:
        typeof parsed.name === "string"
          ? parsed.name
          : fallback.name,
      email:
        typeof parsed.email === "string"
          ? parsed.email
          : fallback.email,
      profileImage:
        typeof parsed.profileImage === "string"
          ? parsed.profileImage
          : fallback.profileImage,
      skills: Array.isArray(parsed.skills)
        ? parsed.skills.filter(
            (item: unknown): item is string =>
              typeof item === "string"
          )
        : fallback.skills,
      education: {
        ...fallback.education,
        ...(parsed.education &&
        typeof parsed.education === "object"
          ? parsed.education
          : {}),
      },
      projects: Array.isArray(parsed.projects)
        ? parsed.projects.map((project: unknown) => {
            const item = (
              project &&
              typeof project === "object"
                ? project
                : {}
            ) as StoredProject;

            return {
              id:
                typeof item.id === "string"
                  ? item.id
                  : createId(),
              title: safeString(
                item.title,
                "Project"
              ),
              description: safeString(
                item.description
              ),
              tech: safeString(item.tech),
              link: safeString(item.link),
            };
          })
        : fallback.projects,
      certificates: Array.isArray(parsed.certificates)
        ? parsed.certificates.map(
            (certificate: unknown) => {
              const item = (
                certificate &&
                typeof certificate === "object"
                  ? certificate
                  : {}
              ) as StoredCertificate;

              return {
                id:
                  typeof item.id === "string"
                    ? item.id
                    : createId(),
                title: safeString(
                  item.title,
                  "Certificate"
                ),
                issuer: safeString(item.issuer),
                date: safeString(item.date),
                certificateId: safeString(
                  item.certificateId
                ),
                link: safeString(item.link),
              };
            }
          )
        : fallback.certificates,
      preferredRoles: Array.isArray(parsed.preferredRoles)
        ? parsed.preferredRoles.filter(
            (item: unknown): item is string =>
              typeof item === "string"
          )
        : fallback.preferredRoles,
      preferredLocations: Array.isArray(
        parsed.preferredLocations
      )
        ? parsed.preferredLocations.filter(
            (item: unknown): item is string =>
              typeof item === "string"
          )
        : fallback.preferredLocations,
      github: safeString(parsed.github),
      linkedin: safeString(parsed.linkedin),
      portfolio: safeString(parsed.portfolio),
      resumeName: safeString(parsed.resumeName),
      resumeData: safeString(parsed.resumeData),
      location: safeString(parsed.location),
      branch: safeString(
        parsed.branch,
        fallback.branch
      ),
      role: safeString(parsed.role, fallback.role),
    };
  } catch {
    return fallback;
  }
}

function createId() {
  return `${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] =
    useState<ProfileData>(loadProfile);

  const [skillInput, setSkillInput] =
    useState("");
  const [roleInput, setRoleInput] =
    useState("");
  const [locationInput, setLocationInput] =
    useState("");

  const [savedMessage, setSavedMessage] =
    useState("");

  const profileImageInput =
    useRef<HTMLInputElement>(null);

  const resumeInput =
    useRef<HTMLInputElement>(null);

  const [certificateDraft, setCertificateDraft] =
    useState<Certificate>({
      id: "",
      title: "",
      issuer: "",
      date: "",
      certificateId: "",
      link: "",
    });

  const [editingCertificateId, setEditingCertificateId] =
    useState<string | null>(null);

  const initials = useMemo(() => {
    const words = profile.name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) return "U";

    return words
      .slice(0, 2)
      .map((word) =>
        word[0].toUpperCase()
      )
      .join("");
  }, [profile.name]);

  const completion = useMemo(() => {
    const checks = [
      Boolean(profile.name.trim()),
      Boolean(profile.email.trim()),
      Boolean(profile.profileImage),
      Boolean(profile.location.trim()),
      Boolean(profile.branch.trim()),
      Boolean(profile.role.trim()),
      profile.skills.length > 0,
      Boolean(profile.education.degree.trim()),
      Boolean(profile.education.branch.trim()),
      Boolean(profile.education.college.trim()),
      Boolean(profile.education.years.trim()),
      profile.projects.length > 0,
      Boolean(profile.github.trim()),
      Boolean(profile.linkedin.trim()),
      Boolean(profile.portfolio.trim()),
      profile.preferredRoles.length > 0,
      profile.preferredLocations.length > 0,
      Boolean(profile.resumeName),
      profile.certificates.length > 0,
    ];

    return Math.round(
      (checks.filter(Boolean).length /
        checks.length) *
        100
    );
  }, [profile]);

  const updateProfile = <
    K extends keyof ProfileData
  >(
    field: K,
    value: ProfileData[K]
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateEducation = (
    field: keyof Education,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      education: {
        ...current.education,
        [field]: value,
      },
    }));
  };

  const saveProfile = () => {
    try {
      localStorage.setItem(
        getProfileKey(),
        JSON.stringify(profile)
      );

      const user = getCurrentUser();

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            name: profile.name,
            email: profile.email,
            picture:
              profile.profileImage ||
              user.picture ||
              "",
          })
        );
      }

      setEditing(false);
      setSavedMessage(
        "Profile saved successfully."
      );

      window.setTimeout(() => {
        setSavedMessage("");
      }, 2500);
    } catch {
      setSavedMessage(
        "Unable to save the profile. Your browser storage may be full."
      );
    }
  };

  const handleProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSavedMessage(
        "Please select an image file."
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSavedMessage(
        "Please choose an image smaller than 2 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateProfile(
          "profileImage",
          reader.result
        );
        setSavedMessage(
          "Profile image added. Click Save Profile to keep it."
        );
      }
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const removeProfileImage = () => {
    updateProfile("profileImage", "");
    setSavedMessage(
      "Profile image removed. Click Save Profile to keep the change."
    );
  };

  const handleResume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowed =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword";

    if (!allowed) {
      setSavedMessage(
        "Please upload a PDF or Word resume."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSavedMessage(
        "Please choose a resume smaller than 5 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;

      if (typeof result === "string") {
        setProfile((current) => ({
          ...current,
          resumeName: file.name,
          resumeData: result,
        }));

        setSavedMessage(
          "Resume added. Click Save Profile to keep it."
        );
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeResume = () => {
    setProfile((current) => ({
      ...current,
      resumeName: "",
      resumeData: "",
    }));

    setSavedMessage(
      "Resume removed. Click Save Profile to keep the change."
    );
  };

  const addItem = (
    value: string,
    field:
      | "skills"
      | "preferredRoles"
      | "preferredLocations"
  ) => {
    const cleaned = value.trim();

    if (!cleaned) return;

    setProfile((current) => {
      const existing = current[field];

      if (
        existing.some(
          (item) =>
            item.toLowerCase() ===
            cleaned.toLowerCase()
        )
      ) {
        return current;
      }

      return {
        ...current,
        [field]: [...existing, cleaned],
      };
    });
  };

  const removeItem = (
    value: string,
    field:
      | "skills"
      | "preferredRoles"
      | "preferredLocations"
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: current[field].filter(
        (item) => item !== value
      ),
    }));
  };

  const addProject = () => {
    setProfile((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: createId(),
          title: "",
          description: "",
          tech: "",
          link: "",
        },
      ],
    }));
  };

  const updateProject = (
    id: string,
    field: keyof Project,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      projects: current.projects.map(
        (project) =>
          project.id === id
            ? {
                ...project,
                [field]: value,
              }
            : project
      ),
    }));
  };

  const removeProject = (id: string) => {
    setProfile((current) => ({
      ...current,
      projects: current.projects.filter(
        (project) => project.id !== id
      ),
    }));
  };

  const startCertificateEdit = (
    certificate: Certificate
  ) => {
    setCertificateDraft(certificate);
    setEditingCertificateId(
      certificate.id
    );
  };

  const startCertificateAdd = () => {
    setCertificateDraft({
      id: createId(),
      title: "",
      issuer: "",
      date: "",
      certificateId: "",
      link: "",
    });

    setEditingCertificateId(null);
  };

  const saveCertificate = () => {
    if (!certificateDraft.title.trim()) {
      setSavedMessage(
        "Enter a certificate name first."
      );
      return;
    }

    setProfile((current) => {
      const exists = current.certificates.some(
        (certificate) =>
          certificate.id ===
          certificateDraft.id
      );

      return {
        ...current,
        certificates: exists
          ? current.certificates.map(
              (certificate) =>
                certificate.id ===
                certificateDraft.id
                  ? certificateDraft
                  : certificate
            )
          : [
              ...current.certificates,
              certificateDraft,
            ],
      };
    });

    setCertificateDraft({
      id: "",
      title: "",
      issuer: "",
      date: "",
      certificateId: "",
      link: "",
    });

    setEditingCertificateId(null);
  };

  const cancelCertificateEdit = () => {
    setCertificateDraft({
      id: "",
      title: "",
      issuer: "",
      date: "",
      certificateId: "",
      link: "",
    });

    setEditingCertificateId(null);
  };

  const removeCertificate = (
    id: string
  ) => {
    setProfile((current) => ({
      ...current,
      certificates:
        current.certificates.filter(
          (certificate) =>
            certificate.id !== id
        ),
    }));
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#080b18] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <User
                size={24}
                className="text-indigo-400"
              />

              <h1 className="text-2xl font-bold">
                My Profile
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-400">
              Manage your personal, academic,
              career, portfolio, and job information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (editing) {
                saveProfile();
              } else {
                setEditing(true);
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
          >
            {editing ? (
              <>
                <Save size={17} />
                Save Profile
              </>
            ) : (
              <>
                <Edit3 size={17} />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {savedMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            <CheckCircle size={17} />
            {savedMessage}
          </div>
        )}

        {/* Profile header */}
        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-indigo-500/20 text-3xl font-bold text-indigo-300">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              {editing && (
                <div className="flex flex-wrap justify-center gap-2">
                  <input
                    ref={profileImageInput}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImage}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      profileImageInput.current?.click()
                    }
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/5"
                  >
                    <Upload size={14} />
                    {profile.profileImage
                      ? "Change Photo"
                      : "Add Photo"}
                  </button>

                  {profile.profileImage && (
                    <button
                      type="button"
                      onClick={removeProfileImage}
                      className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1">
              {editing ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <ProfileInput
                    label="Full Name"
                    value={profile.name}
                    onChange={(value) =>
                      updateProfile(
                        "name",
                        value
                      )
                    }
                  />

                  <ProfileInput
                    label="Email"
                    value={profile.email}
                    type="email"
                    onChange={(value) =>
                      updateProfile(
                        "email",
                        value
                      )
                    }
                  />

                  <ProfileInput
                    label="Current Location"
                    value={profile.location}
                    onChange={(value) =>
                      updateProfile(
                        "location",
                        value
                      )
                    }
                  />

                  <ProfileInput
                    label="Engineering Branch"
                    value={profile.branch}
                    onChange={(value) =>
                      updateProfile(
                        "branch",
                        value
                      )
                    }
                  />

                  <ProfileInput
                    label="Target Career Role"
                    value={profile.role}
                    onChange={(value) =>
                      updateProfile(
                        "role",
                        value
                      )
                    }
                    className="md:col-span-2"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold">
                    {profile.name ||
                      "Your Name"}
                  </h2>

                  <p className="mt-2 text-lg text-indigo-400">
                    {profile.role ||
                      "Add your target role"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      {profile.email ||
                        "Add your email"}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {profile.location ||
                        "Add your location"}
                    </span>

                    <span className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      {profile.branch}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Profile completion */}
        <section className="mt-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-indigo-300">
                Profile Completion
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {completion}%
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-gray-400">
              A complete profile helps CareerPath AI
              provide better career roadmaps, job
              suggestions, interview preparation,
              and portfolio recommendations.
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{
                width: `${completion}%`,
              }}
            />
          </div>
        </section>

        {/* Summary */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <SummaryCard
            title="Skills"
            value={profile.skills.length}
            subtitle="Technical skills"
            icon={<Code2 size={20} />}
          />

          <SummaryCard
            title="Projects"
            value={profile.projects.length}
            subtitle="Portfolio projects"
            icon={<Briefcase size={20} />}
          />

          <SummaryCard
            title="Certificates"
            value={profile.certificates.length}
            subtitle="Certificates stored"
            icon={<Award size={20} />}
          />
        </section>

        {/* Social + portfolio links */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <SectionHeading
            icon={<Link2 size={22} />}
            title="Professional Links"
          />

          {editing ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <ProfileInput
                label="GitHub"
                placeholder="https://github.com/username"
                value={profile.github}
                onChange={(value) =>
                  updateProfile(
                    "github",
                    value
                  )
                }
              />

              <ProfileInput
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedin}
                onChange={(value) =>
                  updateProfile(
                    "linkedin",
                    value
                  )
                }
              />

              <ProfileInput
                label="Portfolio"
                placeholder="https://yourportfolio.com"
                value={profile.portfolio}
                onChange={(value) =>
                  updateProfile(
                    "portfolio",
                    value
                  )
                }
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <LinkCard
                label="GitHub"
                value={profile.github}
                icon={<GitBranch size={18} />}
              />

              <LinkCard
                label="LinkedIn"
                value={profile.linkedin}
                icon={<Link2 size={18} />}
              />

              <LinkCard
                label="Portfolio"
                value={profile.portfolio}
                icon={<ExternalLink size={18} />}
              />
            </div>
          )}
        </section>

        {/* Skills */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <SectionHeading
            icon={<Code2 size={22} />}
            title="Skills"
          />

          <div className="mt-6 flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
              >
                {skill}

                {editing && (
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(
                        skill,
                        "skills"
                      )
                    }
                    className="text-indigo-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
          </div>

          {editing && (
            <AddItemRow
              value={skillInput}
              placeholder="Add a skill"
              buttonText="Add Skill"
              onChange={setSkillInput}
              onAdd={() => {
                addItem(
                  skillInput,
                  "skills"
                );
                setSkillInput("");
              }}
            />
          )}
        </section>

        {/* Education */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <SectionHeading
            icon={<GraduationCap size={22} />}
            title="Education"
          />

          {editing ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ProfileInput
                label="Degree"
                value={profile.education.degree}
                onChange={(value) =>
                  updateEducation(
                    "degree",
                    value
                  )
                }
              />

              <ProfileInput
                label="Engineering Branch"
                value={profile.education.branch}
                onChange={(value) =>
                  updateEducation(
                    "branch",
                    value
                  )
                }
              />

              <ProfileInput
                label="College / University"
                value={
                  profile.education.college
                }
                onChange={(value) =>
                  updateEducation(
                    "college",
                    value
                  )
                }
              />

              <ProfileInput
                label="Years"
                value={profile.education.years}
                onChange={(value) =>
                  updateEducation(
                    "years",
                    value
                  )
                }
              />
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-[#0b1120] p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h3 className="text-lg font-semibold">
                    {profile.education.degree ||
                      "Add your degree"}
                  </h3>

                  <p className="mt-1 text-indigo-400">
                    {profile.education.branch}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {profile.education.college}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  {profile.education.years}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Job preferences */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <SectionHeading
            icon={<Briefcase size={22} />}
            title="Job Role Preferences"
          />

          <p className="mt-2 text-sm text-gray-500">
            These preferences can be used later to
            personalize the Job Opportunities section.
          </p>

          <PreferenceGroup
            title="Preferred Roles"
            items={profile.preferredRoles}
            editing={editing}
            inputValue={roleInput}
            placeholder="e.g. Backend Developer"
            onInputChange={setRoleInput}
            onAdd={() => {
              addItem(
                roleInput,
                "preferredRoles"
              );
              setRoleInput("");
            }}
            onRemove={(item) =>
              removeItem(
                item,
                "preferredRoles"
              )
            }
          />

          <PreferenceGroup
            title="Preferred Locations"
            items={profile.preferredLocations}
            editing={editing}
            inputValue={locationInput}
            placeholder="e.g. Bengaluru"
            onInputChange={setLocationInput}
            onAdd={() => {
              addItem(
                locationInput,
                "preferredLocations"
              );
              setLocationInput("");
            }}
            onRemove={(item) =>
              removeItem(
                item,
                "preferredLocations"
              )
            }
          />
        </section>

        {/* Resume */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <SectionHeading
            icon={<FileText size={22} />}
            title="Resume"
          />

          <div className="mt-6 rounded-2xl bg-[#0b1120] p-6">
            {profile.resumeName ? (
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <FileText size={21} />
                  </div>

                  <div>
                    <p className="font-medium">
                      {profile.resumeName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Saved to your profile
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.resumeData && (
                    <a
                      href={profile.resumeData}
                      download={profile.resumeName}
                      className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Download
                    </a>
                  )}

                  {editing && (
                    <button
                      type="button"
                      onClick={removeResume}
                      className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No resume added yet.
              </p>
            )}

            {editing && (
              <>
                <input
                  ref={resumeInput}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResume}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    resumeInput.current?.click()
                  }
                  className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
                >
                  <Upload size={17} />
                  {profile.resumeName
                    ? "Replace Resume"
                    : "Upload Resume"}
                </button>

                <p className="mt-2 text-xs text-gray-600">
                  PDF or Word document, maximum 5 MB.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <SectionHeading
              icon={<Briefcase size={22} />}
              title="Projects"
            />

            {editing && (
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-2 rounded-xl border border-indigo-500/30 px-4 py-2 text-sm text-indigo-300 hover:bg-indigo-500/10"
              >
                <Plus size={17} />
                Add Project
              </button>
            )}
          </div>

          {profile.projects.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#0b1120] p-6 text-sm text-gray-500">
              No projects added yet.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {profile.projects.map(
                (project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl bg-[#0b1120] p-5"
                  >
                    {editing ? (
                      <div className="space-y-4">
                        <ProfileInput
                          label="Project Name"
                          value={project.title}
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "title",
                              value
                            )
                          }
                        />

                        <label className="block">
                          <span className="mb-2 block text-xs text-gray-500">
                            Description
                          </span>

                          <textarea
                            value={
                              project.description
                            }
                            onChange={(event) =>
                              updateProject(
                                project.id,
                                "description",
                                event.target.value
                              )
                            }
                            rows={4}
                            className="w-full resize-none rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm outline-none focus:border-indigo-500"
                          />
                        </label>

                        <ProfileInput
                          label="Technologies"
                          value={project.tech}
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "tech",
                              value
                            )
                          }
                          placeholder="React, Node.js, MongoDB"
                        />

                        <ProfileInput
                          label="Project / Demo Link"
                          value={project.link}
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "link",
                              value
                            )
                          }
                          placeholder="https://..."
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeProject(
                              project.id
                            )
                          }
                          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                          Remove Project
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold">
                          {project.title ||
                            "Untitled Project"}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-400">
                          {project.description ||
                            "No description added."}
                        </p>

                        <p className="mt-4 text-xs text-indigo-400">
                          {project.tech ||
                            "Technologies not added"}
                        </p>

                        {project.link && (
                          <a
                            href={normalizeUrl(
                              project.link
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300"
                          >
                            View Project
                            <ExternalLink
                              size={15}
                            />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* Certificates */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <SectionHeading
              icon={
                <Award
                  size={22}
                  className="text-yellow-400"
                />
              }
              title="Certificates"
            />

            {editing && (
              <button
                type="button"
                onClick={startCertificateAdd}
                className="flex items-center gap-2 rounded-xl border border-yellow-500/30 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-500/10"
              >
                <Plus size={17} />
                Add Certificate
              </button>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Store certificates you have completed.
            Your dedicated Certificates page can use
            the same user-specific profile data.
          </p>

          {profile.certificates.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#0b1120] p-6 text-sm text-gray-500">
              No certificates added yet.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {profile.certificates.map(
                (certificate) => (
                  <div
                    key={certificate.id}
                    className="rounded-2xl bg-[#0b1120] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {certificate.title}
                        </h3>

                        {certificate.issuer && (
                          <p className="mt-1 text-sm text-indigo-400">
                            {certificate.issuer}
                          </p>
                        )}
                      </div>

                      <Award
                        size={20}
                        className="shrink-0 text-yellow-400"
                      />
                    </div>

                    <div className="mt-4 space-y-1 text-xs text-gray-500">
                      {certificate.date && (
                        <p>
                          Completed:{" "}
                          {certificate.date}
                        </p>
                      )}

                      {certificate.certificateId && (
                        <p>
                          Certificate ID:{" "}
                          {certificate.certificateId}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {certificate.link && (
                        <a
                          href={normalizeUrl(
                            certificate.link
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/5"
                        >
                          View Certificate
                          <ExternalLink size={14} />
                        </a>
                      )}

                      {editing && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              startCertificateEdit(
                                certificate
                              )
                            }
                            className="rounded-lg border border-indigo-500/20 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-500/10"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeCertificate(
                                certificate.id
                              )
                            }
                            className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {editing &&
            (editingCertificateId !== null ||
              certificateDraft.id) && (
              <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
                <h3 className="font-semibold text-yellow-300">
                  {editingCertificateId
                    ? "Edit Certificate"
                    : "Add Certificate"}
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <ProfileInput
                    label="Certificate Name"
                    value={
                      certificateDraft.title
                    }
                    onChange={(value) =>
                      setCertificateDraft(
                        (current) => ({
                          ...current,
                          title: value,
                        })
                      )
                    }
                  />

                  <ProfileInput
                    label="Issuer"
                    value={
                      certificateDraft.issuer
                    }
                    onChange={(value) =>
                      setCertificateDraft(
                        (current) => ({
                          ...current,
                          issuer: value,
                        })
                      )
                    }
                  />

                  <ProfileInput
                    label="Completion Date"
                    value={
                      certificateDraft.date
                    }
                    type="date"
                    onChange={(value) =>
                      setCertificateDraft(
                        (current) => ({
                          ...current,
                          date: value,
                        })
                      )
                    }
                  />

                  <ProfileInput
                    label="Certificate ID"
                    value={
                      certificateDraft.certificateId
                    }
                    onChange={(value) =>
                      setCertificateDraft(
                        (current) => ({
                          ...current,
                          certificateId: value,
                        })
                      )
                    }
                  />

                  <ProfileInput
                    label="Certificate Link"
                    value={
                      certificateDraft.link
                    }
                    placeholder="https://..."
                    onChange={(value) =>
                      setCertificateDraft(
                        (current) => ({
                          ...current,
                          link: value,
                        })
                      )
                    }
                    className="md:col-span-2"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={saveCertificate}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
                  >
                    <Save size={16} />
                    Save Certificate
                  </button>

                  <button
                    type="button"
                    onClick={
                      cancelCertificateEdit
                    }
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
        </section>

        {/* AI recommendation */}
        <section className="mt-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">
              <Sparkles
                size={22}
                className="text-indigo-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                AI Profile Recommendation
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                {completion >= 80
                  ? "Your profile is well completed. Keep your projects, resume, GitHub, portfolio, and certificates updated."
                  : "Complete your profile with your photo, education, skills, projects, resume, LinkedIn, GitHub, portfolio, certificates, and job preferences to get better career recommendations."}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs text-gray-500">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
      />
    </label>
  );
}

function AddItemRow({
  value,
  placeholder,
  buttonText,
  onChange,
  onAdd,
}: {
  value: string;
  placeholder: string;
  buttonText: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onAdd();
          }
        }}
        className="flex-1 rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm outline-none placeholder:text-gray-600 focus:border-indigo-500"
      />

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
      >
        <Plus size={16} />
        {buttonText}
      </button>
    </div>
  );
}

function PreferenceGroup({
  title,
  items,
  editing,
  inputValue,
  placeholder,
  onInputChange,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  editing: boolean;
  inputValue: string;
  placeholder: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (value: string) => void;
}) {
  return (
    <div className="mt-7">
      <h3 className="text-sm font-semibold text-gray-300">
        {title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
          >
            {item}

            {editing && (
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
      </div>

      {editing && (
        <AddItemRow
          value={inputValue}
          placeholder={placeholder}
          buttonText="Add"
          onChange={onInputChange}
          onAdd={onAdd}
        />
      )}
    </div>
  );
}

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-indigo-400">
        {icon}
      </span>

      <h2 className="text-xl font-bold">
        {title}
      </h2>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  textValue = false,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  textValue?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {title}
        </p>

        <span className="text-indigo-400">
          {icon}
        </span>
      </div>

      <p
        className={`mt-3 font-bold ${
          textValue
            ? "text-xl leading-7"
            : "text-4xl"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

function LinkCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  if (!value) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0b1120] p-4">
        <div className="flex items-center gap-2 text-gray-500">
          {icon}
          <span className="text-sm">
            {label}
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-600">
          Not added yet
        </p>
      </div>
    );
  }

  return (
    <a
      href={normalizeUrl(value)}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border border-white/10 bg-[#0b1120] p-4 transition hover:border-indigo-500/30 hover:bg-white/[0.02]"
    >
      <div className="flex items-center gap-2 text-indigo-400">
        {icon}
        <span className="text-sm font-medium">
          {label}
        </span>
        <ExternalLink
          size={13}
          className="ml-auto"
        />
      </div>

      <p className="mt-2 truncate text-xs text-gray-500">
        {value}
      </p>
    </a>
  );
}