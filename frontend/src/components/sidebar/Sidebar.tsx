import {
  Home as HomeIcon,
  LayoutDashboard,
  Bot,
  FileText,
  Map,
  BookOpen,
  GraduationCap,
  Award,
  BriefcaseBusiness,
  Bookmark,
  GitBranch,
  Mic,
  User,
  Settings,
  LogOut,
  Sparkles,
  X,
  Menu,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

const navigation = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "AI Mentor",
    path: "/mentor",
    icon: Bot,
  },
  {
    name: "Resume Analyzer",
    path: "/resume",
    icon: FileText,
  },
  {
    name: "Career Roadmap",
    path: "/roadmap",
    icon: Map,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: BookOpen,
  },
  {
    name: "My Learnings",
    path: "/my-learnings",
    icon: GraduationCap,
  },
  {
    name: "Certificates",
    path: "/certificates",
    icon: Award,
  },
  {
    name: "Job Opportunities",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Saved Jobs",
    path: "/saved-jobs",
    icon: Bookmark,
  },
  {
    name: "GitHub Insights",
    path: "/github",
    icon: GitBranch,
  },
  {
    name: "Mock Interview",
    path: "/interview",
    icon: Mic,
  },
];

const accountNavigation = [
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getUserName = () => {
    const raw = localStorage.getItem("user");

    if (!raw) {
      return "Learner";
    }

    try {
      const user = JSON.parse(raw);

      return user.name || user.email || "Learner";
    } catch {
      return "Learner";
    }
  };

  const userName = getUserName();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMobileOpen(false);
    navigate("/");
    window.location.reload();
  };

  const renderNavigationItem = (
    item: {
      name: string;
      path: string;
      icon: React.ComponentType<{
        size?: number;
        className?: string;
      }>;
    }
  ) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={({ isActive }) =>
          `
          group
          flex
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-sm
          font-medium
          transition-all
          duration-200
          ${
            isActive
              ? "bg-indigo-500/15 text-indigo-300"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }
          `
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={18}
              className={
                isActive
                  ? "text-indigo-400"
                  : "text-gray-500 group-hover:text-gray-300"
              }
            />

            <span>{item.name}</span>
          </>
        )}
      </NavLink>
    );
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}

      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <button
          type="button"
          onClick={() => {
            navigate("/");
            setMobileOpen(false);
          }}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15">
            <Sparkles
              size={20}
              className="text-indigo-400"
            />
          </div>

          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium text-indigo-400">
              CareerPath
            </p>

            <p className="text-lg font-bold text-white">
              AI
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
      </div>

      {/* User */}

      <div className="border-b border-white/10 px-5 py-4">
        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-xs text-gray-500">
            Signed in as
          </p>

          <p className="mt-1 truncate text-sm font-medium text-white">
            {userName}
          </p>
        </div>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(renderNavigationItem)}
        </nav>

        <p className="mb-3 mt-8 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
          Account
        </p>

        <nav className="space-y-1">
          {accountNavigation.map(renderNavigationItem)}
        </nav>
      </div>

      {/* Logout */}

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}

      <div className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#050816]/95 px-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15">
            <Sparkles
              size={18}
              className="text-indigo-400"
            />
          </div>

          <span className="font-semibold text-white">
            CareerPath AI
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-[#080b1a] lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[min(85vw,320px)]
          border-r
          border-white/10
          bg-[#080b1a]
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}