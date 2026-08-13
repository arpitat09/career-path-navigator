import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: Props) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-700 to-purple-900 p-16">
          <h1 className="text-5xl font-bold">CareerPath AI</h1>

          <p className="mt-8 text-xl leading-9 text-indigo-100">
            Discover careers, build skills, improve your resume,
            practice interviews, and get AI-powered guidance.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

            <h2 className="text-4xl font-bold">{title}</h2>

            <p className="mt-3 text-gray-400">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}