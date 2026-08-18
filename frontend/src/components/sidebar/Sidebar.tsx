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
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";


// ======================================================
// WORKSPACE NAVIGATION
// ======================================================

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


// ======================================================
// ACCOUNT NAVIGATION
// ======================================================

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


// ======================================================
// SIDEBAR
// ======================================================

export default function Sidebar() {

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);


  // ====================================================
  // USER
  // ====================================================

  const getUserName = () => {

    const raw =
      localStorage.getItem("user");

    if (!raw) {
      return "Learner";
    }

    try {

      const user =
        JSON.parse(raw);

      return (
        user.name ||
        user.email ||
        "Learner"
      );

    } catch {

      return "Learner";

    }
  };


  const userName =
    getUserName();


  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  };


  // ====================================================
  // NAVIGATION ITEM
  // ====================================================

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

    const Icon =
      item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() =>
          setMobileOpen(false)
        }
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

            <span>
              {item.name}
            </span>

          </>
        )}

      </NavLink>
    );
  };


  // ====================================================
  // SIDEBAR CONTENT
  // ====================================================

  const sidebarContent = (
    <div className="flex h-full flex-col">

      {/* =================================================
          LOGO
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-5
          py-5
        "
      >

        <button
          type="button"
          onClick={() => {
            navigate("/");
            setMobileOpen(false);
          }}
          className="flex items-center gap-3"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15">

            <Sparkles
              size={20}
              className="text-indigo-400"
            />

          </div>

          <div className="text-left">

            <p className="text-sm font-medium text-indigo-400">
              CareerPath
            </p>

            <p className="text-lg font-bold text-white">
              AI
            </p>

          </div>

        </button>


        {/* MOBILE CLOSE */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(false)
          }
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
        >

          <X size={20} />

        </button>

      </div>


      {/* =================================================
          USER
      ================================================= */}

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


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
          Workspace
        </p>

        <nav className="space-y-1">

          {navigation.map(
            renderNavigationItem
          )}

        </nav>


        {/* ACCOUNT */}

        <div className="my-6 h-px bg-white/10" />

        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
          Account
        </p>

        <nav className="space-y-1">

          {accountNavigation.map(
            renderNavigationItem
          )}

        </nav>

      </div>


      {/* =================================================
          LOGOUT
      ================================================= */}

      <div className="border-t border-white/10 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-gray-400
            transition
            hover:bg-red-500/10
            hover:text-red-400
          "
        >

          <LogOut size={18} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </div>
  );


  return (
    <>

      {/* ==================================================
          MOBILE MENU BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        className="
          fixed
          left-4
          top-4
          z-[60]
          rounded-xl
          border
          border-white/10
          bg-[#080b18]
          px-3
          py-2
          text-sm
          text-gray-300
          shadow-lg
          lg:hidden
        "
      >

        Menu

      </button>


      {/* ==================================================
          DESKTOP SIDEBAR
      ================================================== */}

      <aside
        className="
          fixed
          bottom-0
          left-0
          top-0
          z-50
          hidden
          w-72
          border-r
          border-white/10
          bg-[#080b18]
          shadow-2xl
          lg:block
        "
      >

        {sidebarContent}

      </aside>


      {/* ==================================================
          MOBILE SIDEBAR
      ================================================== */}

      {mobileOpen && (

        <>

          {/* Overlay */}

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              fixed
              inset-0
              z-50
              bg-black/60
              backdrop-blur-sm
              lg:hidden
            "
          />


          <aside
            className="
              fixed
              bottom-0
              left-0
              top-0
              z-[55]
              w-72
              border-r
              border-white/10
              bg-[#080b18]
              shadow-2xl
              lg:hidden
            "
          >

            {sidebarContent}

          </aside>

        </>

      )}

    </>
  );
}