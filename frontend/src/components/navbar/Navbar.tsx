import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-6">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#111827]/80 px-8 py-4 backdrop-blur-xl">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Career<span className="text-indigo-500">Path AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="#features"
              className="text-gray-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#roadmap"
              className="text-gray-300 transition hover:text-white"
            >
              Roadmap
            </a>

            <a
              href="#mentor"
              className="text-gray-300 transition hover:text-white"
            >
              AI Mentor
            </a>

            <a
              href="#pricing"
              className="text-gray-300 transition hover:text-white"
            >
              Pricing
            </a>

          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-4 lg:flex">

            <Link
              to="/login"
              className="text-gray-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to={
                localStorage.getItem("token")
                  ? "/dashboard"
                  : "/login"
              }
            >
              <Button>
                {localStorage.getItem("token")
                  ? "Dashboard"
                  : "Get Started"}
              </Button>
            </Link>

          </div>

        </div>

      </div>
    </header>
  );
}