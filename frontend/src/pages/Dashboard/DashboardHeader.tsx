import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <p className="text-indigo-400 font-medium">
          Welcome Back 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          Arpita
        </h1>

        <p className="mt-2 text-gray-400">
          Continue your journey toward becoming a Full Stack Developer.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center rounded-2xl border border-white/10 bg-[#111827] px-4 py-3">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 bg-transparent text-white placeholder:text-gray-500 outline-none"
          />

        </div>

        <button className="rounded-2xl border border-white/10 bg-[#111827] p-4 transition hover:border-indigo-500">

          <Bell size={20} />

        </button>

      </div>

    </header>
  );
}