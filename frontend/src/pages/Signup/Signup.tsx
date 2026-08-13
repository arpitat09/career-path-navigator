import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // Save authentication information
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
        })
      );

      // Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden flex-col justify-center bg-gradient-to-br from-indigo-700 to-purple-900 p-16 lg:flex">

          <h1 className="text-5xl font-bold">
            CareerPath AI
          </h1>

          <p className="mt-8 text-xl leading-9 text-indigo-100">
            Create your account and continue your AI-powered career journey.
            Unlock personalized roadmaps, resume analysis, interview
            preparation, GitHub insights, and career guidance.
          </p>

        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-[#050816] p-8">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

            <h2 className="text-4xl font-bold">
              Create Account
            </h2>

            <p className="mt-3 text-gray-400">
              Create your CareerPath AI account
            </p>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup}>

              {/* Name */}
              <div className="mt-8">

                <label className="mb-2 block text-sm text-gray-300">
                  Name
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">

                  <User
                    size={18}
                    className="text-gray-500"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                  />

                </div>

              </div>

              {/* Email */}
              <div className="mt-6">

                <label className="mb-2 block text-sm text-gray-300">
                  Email
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">

                  <Mail
                    size={18}
                    className="text-gray-500"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="mt-6">

                <label className="mb-2 block text-sm text-gray-300">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">

                  <Lock
                    size={18}
                    className="text-gray-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center gap-2"
              >
                {loading ? "Creating Account..." : "Sign Up"}

                {!loading && <ArrowRight size={18} />}
              </Button>

              {/* Google */}
              <button
                type="button"
                className="mt-5 w-full rounded-xl border border-white/10 py-4 text-white transition hover:bg-white/10"
              >
                Continue with Google
              </button>

              {/* Login */}
              <p className="mt-8 text-center text-gray-400">
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
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