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


  // =====================================================
  // SIGNUP
  // =====================================================

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");


    // -------------------------------
    // VALIDATION
    // -------------------------------

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


      // -------------------------------
      // API REQUEST
      // -------------------------------

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


      // -------------------------------
      // API ERROR
      // -------------------------------

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Registration failed."
        );
      }


      // -------------------------------
      // SAVE AUTH DATA
      // -------------------------------

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


      // -------------------------------
      // GO TO DASHBOARD
      // -------------------------------

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    } catch (err) {

      if (
        err instanceof Error
      ) {
        setError(
          err.message
        );
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
    <div className="relative min-h-screen bg-[#050816] text-white">


      {/* =================================================
          BACK TO HOME
      ================================================= */}

      <Link
        to="/"
        className="
          absolute
          left-6
          top-6
          z-30
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-[#080b18]
          px-4
          py-2.5
          text-sm
          text-gray-300
          shadow-lg
          transition
          hover:bg-white/10
          hover:text-white
        "
      >

        <HomeIcon size={17} />

        <span>
          Back to Home
        </span>

      </Link>


      {/* =================================================
          PAGE GRID
      ================================================= */}

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
            hidden
            flex-col
            justify-center
            bg-gradient-to-br
            from-indigo-700
            to-purple-900
            p-16
            lg:flex
          "
        >

          <h1 className="text-5xl font-bold">
            CareerPath AI
          </h1>


          <p
            className="
              mt-8
              max-w-xl
              text-xl
              leading-9
              text-indigo-100
            "
          >
            Create your account and
            continue your AI-powered
            career journey. Unlock
            personalized roadmaps,
            resume analysis, interview
            preparation, GitHub insights,
            and career guidance.
          </p>


          {/* SIMPLE JOURNEY */}

          <div className="mt-12 space-y-4">

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


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#050816]
            p-8
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-10
              shadow-2xl
              backdrop-blur-xl
            "
          >


            {/* =================================================
                TITLE
            ================================================= */}

            <h2 className="text-4xl font-bold">
              Create Account
            </h2>


            <p className="mt-3 text-gray-400">
              Create your CareerPath AI account
            </p>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>

            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSignup}
              className="mt-8"
            >


              {/* =================================================
                  NAME
              ================================================= */}

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
                    px-4
                    transition
                    focus-within:border-indigo-500/50
                  "
                >

                  <User
                    size={18}
                    className="text-gray-500"
                  />


                  <input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    placeholder="Enter your name"
                    className="
                      w-full
                      bg-transparent
                      px-3
                      py-4
                      text-white
                      outline-none
                      placeholder:text-gray-600
                    "
                    autoComplete="name"
                  />

                </div>

              </div>


              {/* =================================================
                  EMAIL
              ================================================= */}

              <div className="mt-6">

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
                    px-4
                    transition
                    focus-within:border-indigo-500/50
                  "
                >

                  <Mail
                    size={18}
                    className="text-gray-500"
                  />


                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="Enter your email"
                    className="
                      w-full
                      bg-transparent
                      px-3
                      py-4
                      text-white
                      outline-none
                      placeholder:text-gray-600
                    "
                    autoComplete="email"
                  />

                </div>

              </div>


              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div className="mt-6">

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
                    px-4
                    transition
                    focus-within:border-indigo-500/50
                  "
                >

                  <Lock
                    size={18}
                    className="text-gray-500"
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
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter password"
                    className="
                      w-full
                      bg-transparent
                      px-3
                      py-4
                      text-white
                      outline-none
                      placeholder:text-gray-600
                    "
                    autoComplete="new-password"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="
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


              {/* =================================================
                  SIGNUP BUTTON
              ================================================= */}

              <Button
                type="submit"
                disabled={loading}
                className="
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                "
              >

                {loading
                  ? "Creating Account..."
                  : "Sign Up"}


                {!loading && (
                  <ArrowRight
                    size={18}
                  />
                )}

              </Button>


              {/* =================================================
                  LOGIN
              ================================================= */}

              <p
                className="
                  mt-8
                  text-center
                  text-gray-400
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