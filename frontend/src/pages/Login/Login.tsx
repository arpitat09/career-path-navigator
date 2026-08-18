import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Home as HomeIcon,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GoogleLogin from "../../components/common/GoogleLogin";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // NORMAL EMAIL/PASSWORD LOGIN
  // =====================================================

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Invalid email or password."
        );
      }

      // Save JWT
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
          picture: data.picture || "",
        })
      );

      // Navigate to dashboard
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Login error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN SUCCESS
  // =====================================================

  const handleGoogleSuccess = (data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      picture?: string;
    };
  }) => {
    console.log(
      "Google login successful:",
      data
    );

    setError("");

    // Save JWT
    localStorage.setItem(
      "token",
      data.token
    );

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        picture:
          data.user.picture || "",
      })
    );

    // Go to dashboard
    navigate("/dashboard", {
      replace: true,
    });
  };

  // =====================================================
  // GOOGLE LOGIN ERROR
  // =====================================================

  const handleGoogleError = (
    message: string
  ) => {
    console.error(
      "Google login error:",
      message
    );

    setError(message);
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
          z-50
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
          MAIN GRID
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
            Welcome back. Continue your
            AI-powered career journey and
            unlock personalized roadmaps,
            resume analysis, interview
            preparation, and career guidance.
          </p>
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

            {/* TITLE */}

            <h2 className="text-4xl font-bold">
              Welcome Back
            </h2>

            <p className="mt-3 text-gray-400">
              Sign in to your CareerPath AI account
            </p>

            {/* =================================================
                ERROR MESSAGE
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
                  leading-6
                  text-red-400
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                EMAIL/PASSWORD FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="mt-8"
            >

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="login-email"
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
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="
                      w-full
                      bg-transparent
                      px-3
                      py-4
                      text-white
                      outline-none
                      placeholder:text-gray-600
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="mt-6">
                <label
                  htmlFor="login-password"
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
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="
                      w-full
                      bg-transparent
                      px-3
                      py-4
                      text-white
                      outline-none
                      placeholder:text-gray-600
                    "
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
              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-6
                  py-4
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-indigo-600/20
                  transition
                  hover:bg-indigo-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading
                  ? "Logging in..."
                  : "Login"}

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            {/* =================================================
                OR
            ================================================= */}

            <div
              className="
                my-7
                flex
                items-center
                gap-4
              "
            >
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-gray-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* =================================================
                GOOGLE LOGIN
            ================================================= */}

            <div className="w-full">
              <GoogleLogin
                onSuccess={
                  handleGoogleSuccess
                }
                onError={
                  handleGoogleError
                }
              />
            </div>

            {/* =================================================
                SIGN UP
            ================================================= */}

            <p
              className="
                mt-8
                text-center
                text-sm
                text-gray-400
              "
            >
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="
                  font-medium
                  text-indigo-400
                  transition
                  hover:text-indigo-300
                "
              >
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}