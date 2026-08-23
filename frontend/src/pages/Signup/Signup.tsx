import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Home as HomeIcon,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/auth/register`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Registration failed."
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
          picture:
            data.picture || "",
        })
      );

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">

      {/* BACK TO HOME */}
      <Link
        to="/"
        className="
          absolute
          left-4
          top-4
          z-30
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-[#080b18]/90
          px-3
          py-2
          text-xs
          text-gray-300
          shadow-lg
          backdrop-blur
          transition
          hover:bg-white/10
          hover:text-white
          sm:left-6
          sm:top-6
          sm:px-4
          sm:py-2.5
          sm:text-sm
        "
      >
        <HomeIcon size={16} />

        <span>
          Back to Home
        </span>
      </Link>

      {/* PAGE GRID */}
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE - DESKTOP ONLY */}
        <div
          className="
            hidden
            flex-col
            justify-center
            bg-gradient-to-br
            from-indigo-700
            to-purple-900
            p-10
            xl:p-16
            lg:flex
          "
        >
          <h1 className="text-4xl font-bold xl:text-5xl">
            CareerPath AI
          </h1>

          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-8
              text-indigo-100
              xl:mt-8
              xl:text-xl
              xl:leading-9
            "
          >
            Create your account and continue your
            AI-powered career journey. Unlock
            personalized roadmaps, resume analysis,
            interview preparation, GitHub insights,
            and career guidance.
          </p>

          <div className="mt-10 space-y-4 xl:mt-12">

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />

              <span className="text-indigo-100">
                Personalized Career Roadmaps
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />

              <span className="text-indigo-100">
                AI Resume Analysis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />

              <span className="text-indigo-100">
                Interview Preparation
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />

              <span className="text-indigo-100">
                Structured Technical Courses
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#050816]
            px-4
            pb-6
            pt-20
            sm:px-6
            sm:pb-8
            sm:pt-24
            lg:p-8
          "
        >

          {/* FORM CARD */}
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
              shadow-2xl
              backdrop-blur-xl
              sm:rounded-3xl
              sm:p-8
              md:p-10
            "
          >

            {/* TITLE */}
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-400 sm:mt-3 sm:text-base">
              Create your CareerPath AI account
            </p>

            {/* ERROR */}
            {error && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-400
                  sm:mt-6
                "
              >
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSignup}
              className="mt-6 sm:mt-8"
            >

              {/* NAME */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="
                    mb-2
                    block
                    text-sm
                    text-gray-300
                  "
                >
                  Name
                </label>

                <div
                  className="
                    flex
                    items-center
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    px-3
                    transition
                    focus-within:border-indigo-500/50
                    sm:px-4
                  "
                >
                  <User
                    size={18}
                    className="shrink-0 text-gray-500"
                  />

                  <input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      px-3
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      sm:py-4
                      sm:text-base
                    "
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="mt-5 sm:mt-6">
                <label
                  htmlFor="signup-email"
                  className="
                    mb-2
                    block
                    text-sm
                    text-gray-300
                  "
                >
                  Email
                </label>

                <div
                  className="
                    flex
                    items-center
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    px-3
                    transition
                    focus-within:border-indigo-500/50
                    sm:px-4
                  "
                >
                  <Mail
                    size={18}
                    className="shrink-0 text-gray-500"
                  />

                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      px-3
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      sm:py-4
                      sm:text-base
                    "
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-5 sm:mt-6">
                <label
                  htmlFor="signup-password"
                  className="
                    mb-2
                    block
                    text-sm
                    text-gray-300
                  "
                >
                  Password
                </label>

                <div
                  className="
                    flex
                    items-center
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    px-3
                    transition
                    focus-within:border-indigo-500/50
                    sm:px-4
                  "
                >
                  <Lock
                    size={18}
                    className="shrink-0 text-gray-500"
                  />

                  <input
                    id="signup-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      px-3
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      sm:py-4
                      sm:text-base
                    "
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="
                      shrink-0
                      text-gray-400
                      transition
                      hover:text-white
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* SIGNUP BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  sm:mt-8
                "
              >
                {loading
                  ? "Creating Account..."
                  : "Sign Up"}

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </Button>

              {/* LOGIN */}
              <p
                className="
                  mt-6
                  text-center
                  text-sm
                  text-gray-400
                  sm:mt-8
                  sm:text-base
                "
              >
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="
                    font-medium
                    text-indigo-400
                    transition
                    hover:text-indigo-300
                  "
                >
                  Login
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}