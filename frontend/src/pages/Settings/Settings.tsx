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
  X,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

type SettingsData = {
  name: string;
  email: string;
  emailNotifications: boolean;
  careerUpdates: boolean;
  interviewReminders: boolean;
  darkMode: boolean;
};

const DEFAULT_SETTINGS: SettingsData = {
  name: "",
  email: "",
  emailNotifications: true,
  careerUpdates: true,
  interviewReminders: false,
  darkMode: true,
};

/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");

    if (!raw) {
      return null;
    }

    const user = JSON.parse(raw);

    if (!user || typeof user !== "object") {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

/* =========================================================
   USER ID
========================================================= */

function getUserId() {
  const user = getCurrentUser();

  return String(
    user?.id ||
      user?._id ||
      user?.email ||
      "guest"
  );
}

/* =========================================================
   SETTINGS KEY
========================================================= */

function getSettingsKey() {
  return `careerpath_settings_${getUserId()}`;
}

/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings(): SettingsData {
  const user = getCurrentUser();

  const fallback: SettingsData = {
    ...DEFAULT_SETTINGS,
    name:
      typeof user?.name === "string"
        ? user.name
        : "",
    email:
      typeof user?.email === "string"
        ? user.email
        : "",
  };

  try {
    const raw = localStorage.getItem(
      getSettingsKey()
    );

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return fallback;
    }

    return {
      ...fallback,
      ...parsed,
      name:
        typeof parsed.name === "string"
          ? parsed.name
          : fallback.name,
      email:
        typeof parsed.email === "string"
          ? parsed.email
          : fallback.email,
      emailNotifications:
        typeof parsed.emailNotifications ===
        "boolean"
          ? parsed.emailNotifications
          : fallback.emailNotifications,
      careerUpdates:
        typeof parsed.careerUpdates ===
        "boolean"
          ? parsed.careerUpdates
          : fallback.careerUpdates,
      interviewReminders:
        typeof parsed.interviewReminders ===
        "boolean"
          ? parsed.interviewReminders
          : fallback.interviewReminders,
      darkMode:
        typeof parsed.darkMode === "boolean"
          ? parsed.darkMode
          : fallback.darkMode,
    };
  } catch {
    return fallback;
  }
}

/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(darkMode: boolean) {
  const root =
    document.documentElement;

  const body = document.body;

  if (darkMode) {
    root.classList.remove(
      "careerpath-light"
    );

    root.classList.add(
      "careerpath-dark"
    );

    body.classList.remove(
      "careerpath-light"
    );

    body.classList.add(
      "careerpath-dark"
    );

    root.dataset.theme = "dark";
  } else {
    root.classList.remove(
      "careerpath-dark"
    );

    root.classList.add(
      "careerpath-light"
    );

    body.classList.remove(
      "careerpath-dark"
    );

    body.classList.add(
      "careerpath-light"
    );

    root.dataset.theme = "light";
  }
}

/* =========================================================
   SAVE SETTINGS
========================================================= */

function persistSettings(
  settings: SettingsData
) {
  localStorage.setItem(
    getSettingsKey(),
    JSON.stringify(settings)
  );

  const user = getCurrentUser();

  if (user) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: settings.name,
        email: settings.email,
      })
    );
  }

  applyTheme(settings.darkMode);
}

/* =========================================================
   SETTINGS COMPONENT
========================================================= */

export default function Settings() {
  const [settings, setSettings] =
    useState<SettingsData>(
      loadSettings
    );

  const [saved, setSaved] =
    useState(false);

  const [saveError, setSaveError] =
    useState("");

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  /* =======================================================
     APPLY SAVED THEME ON PAGE LOAD
  ======================================================= */

  useEffect(() => {
    applyTheme(settings.darkMode);
  }, []);

  /* =======================================================
     UPDATE SETTINGS
  ======================================================= */

  const updateSetting = <
    K extends keyof SettingsData
  >(
    key: K,
    value: SettingsData[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    if (key === "darkMode") {
      applyTheme(Boolean(value));
    }
  };

  /* =======================================================
     SAVE CHANGES
  ======================================================= */

  const handleSave = () => {
    try {
      setSaveError("");

      const cleanName =
        settings.name.trim();

      const cleanEmail =
        settings.email.trim().toLowerCase();

      if (!cleanName) {
        setSaveError(
          "Please enter your name."
        );
        return;
      }

      if (!cleanEmail) {
        setSaveError(
          "Please enter your email address."
        );
        return;
      }

      persistSettings({
        ...settings,
        name: cleanName,
        email: cleanEmail,
      });

      setSettings((current) => ({
        ...current,
        name: cleanName,
        email: cleanEmail,
      }));

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch {
      setSaveError(
        "Unable to save settings. Please try again."
      );
    }
  };

  /* =======================================================
     CHANGE PASSWORD
  ======================================================= */

  const handleChangePassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordMessage("");

    if (!currentPassword) {
      setPasswordError(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New passwords do not match."
      );
      return;
    }

    if (
      currentPassword === newPassword
    ) {
      setPasswordError(
        "New password must be different from your current password."
      );
      return;
    }

    const user = getCurrentUser();

    const token =
      user?.token ||
      localStorage.getItem("token");

    if (!token) {
      setPasswordError(
        "Your login session has expired. Please log in again."
      );
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to change password."
        );
      }

      setPasswordMessage(
        data?.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      window.setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordMessage("");
      }, 1800);
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Unable to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  /* =======================================================
     CLOSE PASSWORD MODAL
  ======================================================= */

  const closePasswordModal = () => {
    if (passwordLoading) {
      return;
    }

    setShowPasswordModal(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordError("");
    setPasswordMessage("");
  };

  return (
    <>
      <div className="min-h-screen bg-[#050816] text-white careerpath-settings-page">

        {/* =================================================
            HEADER
        ================================================= */}

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

                <CheckCircle
                  size={17}
                />

                Settings saved

              </div>
            )}

          </div>

        </div>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="mx-auto max-w-5xl px-6 py-10">

          {/* =================================================
              ACCOUNT
          ================================================= */}

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

              {/* NAME */}

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
                    value={settings.name}
                    onChange={(event) =>
                      updateSetting(
                        "name",
                        event.target.value
                      )
                    }
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                  />

                </div>

              </div>

              {/* EMAIL */}

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
                    value={settings.email}
                    onChange={(event) =>
                      updateSetting(
                        "email",
                        event.target.value
                      )
                    }
                    className="w-full bg-transparent px-3 py-4 text-white outline-none"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

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

              <ToggleRow
                title="Email Notifications"
                description="Receive important updates through email"
                enabled={
                  settings.emailNotifications
                }
                onToggle={() =>
                  updateSetting(
                    "emailNotifications",
                    !settings.emailNotifications
                  )
                }
              />

              <ToggleRow
                title="Career Updates"
                description="Get personalized career recommendations"
                enabled={
                  settings.careerUpdates
                }
                onToggle={() =>
                  updateSetting(
                    "careerUpdates",
                    !settings.careerUpdates
                  )
                }
              />

              <ToggleRow
                title="Interview Reminders"
                description="Receive reminders for mock interviews"
                enabled={
                  settings.interviewReminders
                }
                onToggle={() =>
                  updateSetting(
                    "interviewReminders",
                    !settings.interviewReminders
                  )
                }
              />

            </div>

          </section>

          {/* =================================================
              APPEARANCE
          ================================================= */}

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
                aria-label="Toggle dark mode"
                onClick={() =>
                  updateSetting(
                    "darkMode",
                    !settings.darkMode
                  )
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  settings.darkMode
                    ? "bg-indigo-600"
                    : "bg-gray-700"
                }`}
              >

                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    settings.darkMode
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

          </section>

          {/* =================================================
              SECURITY
          ================================================= */}

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

            <div className="mt-7">

              <button
                type="button"
                onClick={() =>
                  setShowPasswordModal(true)
                }
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

          {/* =================================================
              ERROR
          ================================================= */}

          {saveError && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">

              <AlertCircle
                size={18}
              />

              {saveError}

            </div>
          )}

          {/* =================================================
              SAVE
          ================================================= */}

          <div className="mt-8 flex justify-end">

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-medium transition hover:bg-indigo-500"
            >

              <Save
                size={18}
              />

              Save Changes

            </button>

          </div>

        </main>

      </div>

      {/* =====================================================
          PASSWORD MODAL
      ===================================================== */}

      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-7 shadow-2xl">

            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-indigo-500/10 p-3">

                    <Lock
                      size={20}
                      className="text-indigo-400"
                    />

                  </div>

                  <h2 className="text-xl font-bold">
                    Change Password
                  </h2>

                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Enter your current password and choose a new one.
                </p>

              </div>

              <button
                type="button"
                onClick={closePasswordModal}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
              >

                <X size={20} />

              </button>

            </div>

            <form
              onSubmit={
                handleChangePassword
              }
              className="mt-7 space-y-5"
            >

              <PasswordField
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={
                  showCurrentPassword
                }
                onToggle={() =>
                  setShowCurrentPassword(
                    (current) =>
                      !current
                  )
                }
              />

              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                visible={
                  showNewPassword
                }
                onToggle={() =>
                  setShowNewPassword(
                    (current) =>
                      !current
                  )
                }
              />

              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={
                  showConfirmPassword
                }
                onToggle={() =>
                  setShowConfirmPassword(
                    (current) =>
                      !current
                  )
                }
              />

              {passwordError && (
                <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">

                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {passwordError}
                  </span>

                </div>
              )}

              {passwordMessage && (
                <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-3 text-sm text-green-400">

                  <CheckCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {passwordMessage}
                  </span>

                </div>
              )}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={
                    closePasswordModal
                  }
                  disabled={
                    passwordLoading
                  }
                  className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    passwordLoading
                  }
                  className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {passwordLoading
                    ? "Updating..."
                    : "Update Password"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </>
  );
}

/* =========================================================
   TOGGLE ROW
========================================================= */

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl bg-[#0b1120] p-5">

      <div>

        <h3 className="font-medium">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

      <button
        type="button"
        aria-label={`Toggle ${title}`}
        onClick={onToggle}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-indigo-600"
            : "bg-gray-700"
        }`}
      >

        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm text-gray-400">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-white/10 bg-[#0b1120] px-4">

        <Lock
          size={17}
          className="shrink-0 text-gray-500"
        />

        <input
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="w-full bg-transparent px-3 py-3.5 text-white outline-none placeholder:text-gray-600"
          placeholder={`Enter ${label.toLowerCase()}`}
        />

        <button
          type="button"
          onClick={onToggle}
          className="text-gray-500 transition hover:text-white"
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
}