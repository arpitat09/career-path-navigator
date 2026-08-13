import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

import {
  useCallback,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Button from "../../components/ui/Button";
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

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

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
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Login failed."
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

      // After login, return to the public home page.
      navigate("/", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Login error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * These callbacks are memoized so the GoogleLogin
   * component does not receive a new callback function
   * on every Login render.
   */
  const handleGoogleSuccess =
    useCallback(
      (data: {
        token: string;
        user: {
          id: string;
          name: string;
          email: string;
          picture?: string;
        };
      }) => {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setError("");

        navigate("/", {
          replace: true,
        });
      },
      [navigate]
    );

  const handleGoogleError =
    useCallback(
      (message: string) => {
        setError(message);
      },
      []
    );

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden flex-col justify-center bg-gradient-to-br from-indigo-700 to-purple-900 p-16 lg:flex">
          <h1 className="text-5xl font-bold">
            CareerPath AI
          </h1>

          <p className="mt-8 text-xl leading-9 text-indigo-100">
            Welcome back. Continue your
            AI-powered career journey and
            unlock personalized roadmaps,
            resume analysis, interview
            preparation, and career guidance.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

            <h2 className="text-4xl font-bold">
              Welcome Back
            </h2>

            <p className="mt-3 text-gray-400">
              Sign in to your account
            </p>

            {/* ERROR */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* EMAIL/PASSWORD LOGIN */}
            <form
              onSubmit={handleLogin}
            >

              {/* EMAIL */}
              <div className="mt-10">
                <label className="mb-2 block text-sm text-gray-300">
                  Email
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">

                  <Mail
                    className="text-gray-500"
                    size={18}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                    autoComplete="email"
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-6">

                <label className="mb-2 block text-sm text-gray-300">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">

                  <Lock
                    className="text-gray-500"
                    size={18}
                  />

                  <input
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
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="text-gray-400 hover:text-white"
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
              <Button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center gap-2"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </Button>

            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-500">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* SINGLE GOOGLE LOGIN COMPONENT */}
            <GoogleLogin
              onSuccess={
                handleGoogleSuccess
              }
              onError={
                handleGoogleError
              }
            />

            {/* SIGNUP */}
            <p className="mt-8 text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-400 hover:text-indigo-300"
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