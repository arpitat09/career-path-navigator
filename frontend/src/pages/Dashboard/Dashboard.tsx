import {
  TrendingUp, FileText, BookOpen, Target, Clock, CheckCircle,
  ArrowUpRight, Sparkles, Award, BriefcaseBusiness, GitBranch, Mic,
  User, MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  getCurrentUserId,
  getCurrentUserName,
} from "../../components/services/userScopedStorage";

type ProfileData = {
  name?: string;
  skills?: string[];
  education?: unknown[];
  projects?: unknown[];
  resumeName?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  certificates?: unknown[];
  preferredRoles?: string[];
  preferredLocation?: string;
  jobRolePreference?: string[];
};

type Certificate = {
  courseTitle: string;
  completedAt: string;
  certificateId: string;
};

function readProfile(): ProfileData {
  const keys = ["careerPathProfile","careerpath_profile","profile","userProfile"];
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const value: unknown = JSON.parse(raw);
      if (value && typeof value === "object") return value as ProfileData;
        } catch {
      continue;
    }
  }
  return {};
}

function getCertificates(): Certificate[] {
  const userId = getCurrentUserId();
  if (!userId) return [];
  const prefix = `certificate_${userId}_`;
  const result: Certificate[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(prefix)) continue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const value: unknown = JSON.parse(raw);
      if (!value || typeof value !== "object") continue;
      const item = value as Record<string, unknown>;
      if (
        typeof item.courseTitle === "string" &&
        typeof item.completedAt === "string" &&
        typeof item.certificateId === "string"
      ) {
        result.push({
          courseTitle: item.courseTitle,
          completedAt: item.completedAt,
          certificateId: item.certificateId,
        });
      }
        } catch {
      continue;
    }
  }
  return result.sort(
    (a, b) =>
      new Date(b.completedAt).getTime() -
      new Date(a.completedAt).getTime()
  );
}

function getLearningStats() {
  const userId = getCurrentUserId();
  if (!userId) return { lessons: 0, courses: 0 };
  const progressPrefix = `courseProgress_${userId}_`;
  const certificatePrefix = `certificate_${userId}_`;
  let lessons = 0;
  let courses = 0;
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (key.startsWith(progressPrefix)) {
      try {
        const raw = localStorage.getItem(key);
        const value: unknown = raw ? JSON.parse(raw) : [];
        if (Array.isArray(value)) lessons += value.length;
          } catch {
      continue;
    }
    }
    if (key.startsWith(certificatePrefix)) courses += 1;
  }
  return { lessons, courses };
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recently"
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export default function Dashboard() {
  const userName = getCurrentUserName();
  const profile = useMemo(() => readProfile(), []);
  const certificates = useMemo(() => getCertificates(), []);
  const learning = useMemo(() => getLearningStats(), []);

  const name = profile.name?.trim() || userName || "Learner";
  const profileChecks = [
    Boolean(profile.skills?.length),
    Boolean(profile.education?.length),
    Boolean(profile.resumeName),
    Boolean(profile.linkedin),
    Boolean(profile.github),
    Boolean(profile.portfolio),
    Boolean(profile.projects?.length),
    Boolean(profile.certificates?.length),
    Boolean(
      profile.preferredLocation ||
      profile.preferredRoles?.length ||
      profile.jobRolePreference?.length
    ),
  ];
  const profileCompletion = Math.round(
    (profileChecks.filter(Boolean).length / profileChecks.length) * 100
  );
  const learningProgress = learning.lessons > 0
    ? Math.min(learning.lessons * 10, 100)
    : 0;
  const careerScore = Math.min(
    Math.round(profileCompletion * 0.5 + learningProgress * 0.3 + Math.min(certificates.length * 10, 20)),
    100
  );
  const jobReadiness = Math.min(
    Math.round(profileCompletion * 0.5 + learningProgress * 0.3 + Math.min(certificates.length * 10, 20)),
    100
  );
  const role =
    profile.preferredRoles?.[0] ||
    profile.jobRolePreference?.[0] ||
    "your preferred engineering role";

  const recommendation =
    profileCompletion < 70
      ? "Complete your profile with your skills, education, resume, GitHub, projects, portfolio, and job preferences."
      : learningProgress < 50
        ? `Continue learning and practicing for ${role}. Completing more course lessons will improve your preparation.`
        : certificates.length === 0
          ? "Complete a course to earn your first CareerPath AI certificate."
          : `Your preparation for ${role} is progressing well. Keep learning, practicing interviews, improving GitHub, and checking engineering openings.`;

  const latest = certificates[0];

  return (
    <div className="min-h-screen bg-[#070b18] text-white">
      <header className="border-b border-white/10 bg-[#070b18]/90 px-6 py-5 backdrop-blur-xl lg:px-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Welcome back, {name}</p>
            <h1 className="mt-1 text-2xl font-bold">Career Dashboard</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-400" /> AI Active
          </div>
        </div>
      </header>

      <div className="px-6 py-8 lg:px-10">
        <section className="mb-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 to-purple-600/10 p-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-indigo-300">
                <Sparkles size={18} /><span className="text-sm font-medium">AI Career Insights</span>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Build your engineering career step by step.</h2>
              <p className="mt-3 max-w-2xl text-gray-400">
                Track your profile, learning, certificates, interviews, GitHub, and job opportunities from one dashboard.
              </p>
            </div>
            <Link to="/roadmap" className="flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500">
              View Roadmap <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <Stat title="Career Score" value={`${careerScore}%`} subtitle={profileCompletion >= 70 ? "Profile progressing" : "Complete your profile"} icon={<TrendingUp size={20} />} />
          <Stat title="Profile Completion" value={`${profileCompletion}%`} subtitle={profileCompletion === 100 ? "Profile complete" : "Keep adding details"} icon={<User size={20} />} />
          <Stat title="Certificates" value={String(certificates.length)} subtitle="Certificates earned" icon={<Award size={20} />} />
          <Stat title="Job Readiness" value={`${jobReadiness}%`} subtitle={jobReadiness >= 75 ? "Keep improving" : "Needs improvement"} icon={<Target size={20} />} />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Career Progress</h2>
                <p className="mt-1 text-sm text-gray-500">Based on your stored profile and learning activity</p>
              </div>
              <span className="text-sm font-medium text-indigo-400">{learningProgress}%</span>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${learningProgress}%` }} />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Progress title="Profile" value={`${profileCompletion}%`} text="Profile completed" />
              <Progress title="Courses" value={String(learning.courses)} text="Courses completed" />
              <Progress title="Certificates" value={String(certificates.length)} text="Certificates earned" />
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20"><Sparkles size={22} className="text-indigo-400" /></div>
              <div><h2 className="font-bold">AI Recommendation</h2><p className="text-xs text-gray-500">Based on your current progress</p></div>
            </div>
            <p className="mt-6 leading-7 text-gray-300">{recommendation}</p>
            <Link to="/mentor" className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300">Ask AI Mentor <ArrowUpRight size={16} /></Link>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <p className="mt-1 text-sm text-gray-500">Continue your career preparation from here.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Action to="/profile" icon={<User size={20} />} title="Complete Profile" text="Update skills, education, resume, and preferences." />
            <Action to="/resume" icon={<FileText size={20} />} title="Analyze Resume" text="Review and improve your resume." />
            <Action to="/github" icon={<GitBranch size={20} />} title="Improve GitHub" text="Review your GitHub profile and projects." />
            <Action to="/interview" icon={<Mic size={20} />} title="Practice Interview" text="Practice engineering and coding interviews." />
            <Action to="/jobs" icon={<BriefcaseBusiness size={20} />} title="Find Jobs" text="Explore engineering openings and official career pages." />
            <Action to="/certificates" icon={<Award size={20} />} title="View Certificates" text="View and print your earned certificates." />
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-center justify-between">
              <div><h2 className="text-xl font-bold">Profile Snapshot</h2><p className="mt-1 text-sm text-gray-500">Information available to CareerPath AI</p></div>
              <Link to="/profile" className="text-sm text-indigo-400 hover:text-indigo-300">Edit Profile</Link>
            </div>
            <div className="mt-6 space-y-4">
              <Row label="Preferred Role" value={role} />
              <Row label="Location" value={profile.preferredLocation || "Not added yet"} icon={<MapPin size={15} />} />
              <Row label="Skills" value={profile.skills?.length ? `${profile.skills.length} skills added` : "No skills added yet"} />
              <Row label="Resume" value={profile.resumeName || "No resume added yet"} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-center justify-between">
              <div><h2 className="text-xl font-bold">Latest Certificate</h2><p className="mt-1 text-sm text-gray-500">Your latest course achievement</p></div>
              <Award size={21} className="text-yellow-400" />
            </div>
            {latest ? (
              <div className="mt-6 rounded-2xl bg-[#0b1120] p-5">
                <p className="text-sm text-indigo-400">Certificate of Completion</p>
                <h3 className="mt-2 text-lg font-semibold">{latest.courseTitle}</h3>
                <p className="mt-2 text-sm text-gray-500">Completed {formatDate(latest.completedAt)}</p>
                <p className="mt-3 break-all text-xs text-gray-600">{latest.certificateId}</p>
                <Link to="/certificates" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300">View Certificates <ArrowUpRight size={15} /></Link>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-[#0b1120] p-5">
                <p className="font-medium">No certificate earned yet.</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">Complete all lessons in a purchased course to earn your first certificate.</p>
                <Link to="/courses" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300">Browse Courses <ArrowUpRight size={15} /></Link>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-xl font-bold">Continue Your Career Journey</h2><p className="mt-1 text-sm text-gray-500">Jump directly into the tools you need next.</p></div>
            <Clock size={20} className="text-gray-500" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Journey to="/courses" icon={<BookOpen size={20} />} title="Keep Learning" text="Build technical skills through structured courses." />
            <Journey to="/interview" icon={<Mic size={20} />} title="Practice" text="Test your technical and coding interview readiness." />
            <Journey to="/jobs" icon={<BriefcaseBusiness size={20} />} title="Explore Openings" text="Check engineering opportunities and official career pages." />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-xl font-bold">Recent Activity</h2><p className="mt-1 text-sm text-gray-500">Activity available from your current data.</p></div>
            <Clock size={20} className="text-gray-500" />
          </div>
          <div className="mt-6 space-y-4">
            {latest && <Activity icon={<Award size={20} />} title={`Earned ${latest.courseTitle} certificate`} detail={formatDate(latest.completedAt)} />}
            {learning.courses > 0 && <Activity icon={<CheckCircle size={20} />} title={`Completed ${learning.courses} course${learning.courses === 1 ? "" : "s"}`} detail="Learning progress detected" />}
            {profile.resumeName && <Activity icon={<FileText size={20} />} title="Resume added to profile" detail={profile.resumeName} />}
            {!latest && learning.courses === 0 && !profile.resumeName && <div className="rounded-2xl bg-[#0b1120] p-5 text-sm text-gray-500">Start using CareerPath AI features to build your activity history.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-[#111827] p-6"><div className="flex items-center justify-between"><p className="text-sm text-gray-400">{title}</p><div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">{icon}</div></div><h3 className="mt-4 text-4xl font-bold">{value}</h3><p className="mt-2 text-sm text-gray-500">{subtitle}</p></div>;
}
function Progress({ title, value, text }: { title: string; value: string; text: string }) {
  return <div className="rounded-2xl bg-[#0b1120] p-5"><p className="text-sm text-gray-400">{title}</p><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-gray-500">{text}</p></div>;
}
function Action({ to, icon, title, text }: { to: string; icon: React.ReactNode; title: string; text: string }) {
  return <Link to={to} className="group rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/30"><div className="flex items-start justify-between"><div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">{icon}</div><ArrowUpRight size={17} className="text-gray-600 group-hover:text-indigo-400" /></div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-500">{text}</p></Link>;
}
function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-4 rounded-xl bg-[#0b1120] px-4 py-3"><span className="text-sm text-gray-500">{label}</span><span className="flex max-w-[65%] items-center gap-1.5 text-right text-sm text-gray-300">{icon}{value}</span></div>;
}
function Journey({ to, icon, title, text }: { to: string; icon: React.ReactNode; title: string; text: string }) {
  return <Link to={to} className="rounded-2xl border border-white/10 bg-[#0b1120] p-5 hover:border-indigo-500/30"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">{icon}</div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-500">{text}</p></Link>;
}
function Activity({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <div className="flex items-center gap-4 rounded-2xl bg-[#0b1120] p-4"><div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">{icon}</div><div><p className="font-medium">{title}</p><p className="mt-1 text-sm text-gray-500">{detail}</p></div></div>;
}