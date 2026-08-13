import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  User,
  Lock,
  Mail,
  Save,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [careerUpdates, setCareerUpdates] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#080b18] px-6 py-5">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <SettingsIcon
                size={24}
                className="text-indigo-400"
              />

              <h1 className="text-2xl font-bold">
                Settings
              </h1>

            </div>

            <p className="mt-1 text-sm text-gray-400">
              Manage your account and application preferences
            </p>

          </div>

          {saved && (
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">

              <CheckCircle size={17} />

              Settings saved

            </div>
          )}

        </div>

      </div>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Account Settings */}
        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">

          <div className="flex items-center gap-3">

            <User
              size={22}
              className="text-indigo-400"
            />

            <div>
              <h2 className="text-xl font-bold">
                Account
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your account information
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">

            {/* Name */}
            <div>

              <label className="mb-2 block text-sm text-gray-400">
                Full Name
              </label>

              <div className="flex items-center rounded-xl border border-white/10 bg-[#0b1120] px-4">

                <User
                  size={18}
                  className="text-gray-500"
                />

                <input
                  type="text"
                  defaultValue="Arpita"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm text-gray-400">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-white/10 bg-[#0b1120] px-4">

                <Mail
                  size={18}
                  className="text-gray-500"
                />

                <input
                  type="email"
                  defaultValue="arpita@example.com"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none"
                />

              </div>

            </div>

          </div>

        </section>

        {/* Notifications */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">

          <div className="flex items-center gap-3">

            <Bell
              size={22}
              className="text-indigo-400"
            />

            <div>
              <h2 className="text-xl font-bold">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose what notifications you want to receive
              </p>
            </div>

          </div>

          <div className="mt-7 space-y-5">

            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-5 rounded-2xl bg-[#0b1120] p-5">

              <div>

                <h3 className="font-medium">
                  Email Notifications
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Receive important updates through email
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEmailNotifications(!emailNotifications)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  emailNotifications
                    ? "bg-indigo-600"
                    : "bg-gray-700"
                }`}
              >

                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

            {/* Career Updates */}
            <div className="flex items-center justify-between gap-5 rounded-2xl bg-[#0b1120] p-5">

              <div>

                <h3 className="font-medium">
                  Career Updates
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Get personalized career recommendations
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setCareerUpdates(!careerUpdates)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  careerUpdates
                    ? "bg-indigo-600"
                    : "bg-gray-700"
                }`}
              >

                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    careerUpdates
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

            {/* Interview Reminders */}
            <div className="flex items-center justify-between gap-5 rounded-2xl bg-[#0b1120] p-5">

              <div>

                <h3 className="font-medium">
                  Interview Reminders
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Receive reminders for mock interviews
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setInterviewReminders(!interviewReminders)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  interviewReminders
                    ? "bg-indigo-600"
                    : "bg-gray-700"
                }`}
              >

                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    interviewReminders
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

          </div>

        </section>

        {/* Appearance */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">

          <div className="flex items-center gap-3">

            <Palette
              size={22}
              className="text-purple-400"
            />

            <div>
              <h2 className="text-xl font-bold">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customize how CareerPath AI looks
              </p>
            </div>

          </div>

          <div className="mt-7 flex items-center justify-between rounded-2xl bg-[#0b1120] p-5">

            <div>

              <h3 className="font-medium">
                Dark Mode
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Use the dark interface across the platform
              </p>

            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-7 w-12 rounded-full transition ${
                darkMode
                  ? "bg-indigo-600"
                  : "bg-gray-700"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  darkMode
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        </section>

        {/* Security */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">

          <div className="flex items-center gap-3">

            <Shield
              size={22}
              className="text-green-400"
            />

            <div>
              <h2 className="text-xl font-bold">
                Security
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Protect your CareerPath AI account
              </p>
            </div>

          </div>

          <div className="mt-7 space-y-4">

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl bg-[#0b1120] p-5 text-left transition hover:bg-white/5"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-indigo-500/10 p-3">

                  <Lock
                    size={19}
                    className="text-indigo-400"
                  />

                </div>

                <div>

                  <h3 className="font-medium">
                    Change Password
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your account password
                  </p>

                </div>

              </div>

              <span className="text-sm text-indigo-400">
                Change
              </span>

            </button>

          </div>

        </section>

        {/* Save */}
        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-medium transition hover:bg-indigo-500"
          >

            <Save size={18} />

            Save Changes

          </button>

        </div>

      </main>

    </div>
  );
}