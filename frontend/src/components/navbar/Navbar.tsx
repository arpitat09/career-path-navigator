import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#111827]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="shrink-0 text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl"
          >
            Career<span className="text-indigo-500">Path AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 xl:flex">
            <a
              href="#features"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#roadmap"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Roadmap
            </a>

            <a
              href="#mentor"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              AI Mentor
            </a>

            <a
              href="#pricing"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Pricing
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="text-sm text-gray-300 transition hover:text-white"
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </Link>

            <Link
              to={isLoggedIn ? "/dashboard" : "/signup"}
            >
              <Button>
                {isLoggedIn ? "Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-xl border border-white/10 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mt-4 border-t border-white/10 pt-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              <a
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Features
              </a>

              <a
                href="#roadmap"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Roadmap
              </a>

              <a
                href="#mentor"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                AI Mentor
              </a>

              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Pricing
              </a>

              <div className="my-2 border-t border-white/10" />

              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                {isLoggedIn ? "Dashboard" : "Login"}
              </Link>

              <Link
                to={isLoggedIn ? "/dashboard" : "/signup"}
                onClick={() => setMobileOpen(false)}
                className="w-full"
              >
                <Button className="w-full">
                  {isLoggedIn ? "Go to Dashboard" : "Get Started"}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}