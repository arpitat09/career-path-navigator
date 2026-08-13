import {
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
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";


// ======================================================
// WORKSPACE NAVIGATION
// ======================================================

const navigation = [
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


  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });
  };


  // ====================================================
  // SIDEBAR UI
  // ====================================================

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        hidden
        h-screen
        w-72
        flex-col
        border-r
        border-white/10
        bg-[#080b18]
        lg:flex
      "
    >

      {/* ==================================================
          LOGO
      ================================================== */}

      <div className="border-b border-white/10 px-6 py-5">

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3"
        >

          {/* Logo Icon */}

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
            "
          >
            <Sparkles
              size={21}
              className="text-white"
            />
          </div>


          {/* Logo Text */}

          <div className="text-left">

            <h1 className="text-lg font-bold text-white">
              CareerPath AI
            </h1>

            <p className="text-xs text-gray-500">
              AI Career Platform
            </p>

          </div>

        </button>

      </div>


      {/* ==================================================
          SCROLLABLE NAVIGATION
      ================================================== */}

      <div className="flex-1 overflow-y-auto px-4 py-6">

        {/* =================================================
            WORKSPACE
        ================================================= */}

        <p
          className="
            mb-4
            px-3
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-gray-500
          "
        >
          Workspace
        </p>


        <nav className="space-y-1">

          {navigation.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}

                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    transition

                    ${
                      isActive
                        ? "bg-indigo-600/15 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }
                  `
                }
              >

                <Icon size={19} />

                <span>
                  {item.name}
                </span>

              </NavLink>
            );

          })}

        </nav>


        {/* =================================================
            ACCOUNT
        ================================================= */}

        <p
          className="
            mb-4
            mt-8
            px-3
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-gray-500
          "
        >
          Account
        </p>


        <nav className="space-y-1">

          {accountNavigation.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}

                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    transition

                    ${
                      isActive
                        ? "bg-indigo-600/15 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }
                  `
                }
              >

                <Icon size={19} />

                <span>
                  {item.name}
                </span>

              </NavLink>
            );

          })}

        </nav>

      </div>


      {/* ==================================================
          LOGOUT
      ================================================== */}

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
            px-3
            py-3
            text-sm
            text-gray-400
            transition
            hover:bg-red-500/10
            hover:text-red-400
          "
        >

          <LogOut size={19} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}