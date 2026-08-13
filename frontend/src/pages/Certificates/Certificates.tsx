import {
  Award,
  CalendarDays,
  Download,
  ExternalLink,
  GraduationCap,
  Hash,
  Printer,
  Sparkles,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  getCurrentUserId,
  getCurrentUserName,
} from "../../components/services/userScopedStorage";

type StoredCertificate = {
  courseId: string;
  courseTitle: string;
  userId: string;
  userName: string;
  completedAt: string;
  certificateId: string;
};

function getUserCertificates(): StoredCertificate[] {
  const userId = getCurrentUserId();

  if (!userId) return [];

  const certificates: StoredCertificate[] = [];
  const prefix = `certificate_${userId}_`;

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (!key || !key.startsWith(prefix)) {
      continue;
    }

    try {
      const raw = localStorage.getItem(key);

      if (!raw) continue;

      const parsed: unknown = JSON.parse(raw);

      if (
        parsed &&
        typeof parsed === "object" &&
        "courseId" in parsed &&
        "courseTitle" in parsed &&
        "userId" in parsed &&
        "userName" in parsed &&
        "completedAt" in parsed &&
        "certificateId" in parsed
      ) {
        const item = parsed as Record<string, unknown>;

        if (
          typeof item.courseId === "string" &&
          typeof item.courseTitle === "string" &&
          typeof item.userId === "string" &&
          typeof item.userName === "string" &&
          typeof item.completedAt === "string" &&
          typeof item.certificateId === "string"
        ) {
          certificates.push({
            courseId: item.courseId,
            courseTitle: item.courseTitle,
            userId: item.userId,
            userName: item.userName,
            completedAt: item.completedAt,
            certificateId: item.certificateId,
          });
        }
      }
    } catch {
      // Ignore malformed certificate entries.
    }
  }

  return certificates.sort(
    (first, second) =>
      new Date(second.completedAt).getTime() -
      new Date(first.completedAt).getTime()
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function createCertificateFileName(title: string) {
  return `${title
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()}-certificate.html`;
}

function downloadCertificate(certificate: StoredCertificate) {
  const html = `<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>${certificate.courseTitle} Certificate</title>
<style>
body{margin:0;background:#050816;font-family:Arial,sans-serif;color:#111827}
.page{width:1000px;max-width:calc(100% - 40px);margin:40px auto;background:white;border:12px solid #4f46e5;box-sizing:border-box;padding:70px;text-align:center}
.brand{font-size:20px;font-weight:700;color:#4f46e5;letter-spacing:1px}
.title{font-size:42px;margin:30px 0 10px}
.subtitle{font-size:18px;color:#6b7280}
.name{font-size:36px;margin:25px 0;color:#111827}
.course{font-size:26px;font-weight:700;color:#4f46e5}
.meta{margin-top:40px;color:#6b7280;line-height:1.8}
.id{font-size:13px;margin-top:25px;color:#9ca3af}
@media print{body{background:white}.page{margin:0;max-width:none;width:100%;min-height:100vh}}
</style>
</head>
<body>
<div class="page">
<div class="brand">CAREERPATH AI</div>
<div class="title">Certificate of Completion</div>
<div class="subtitle">This certificate is proudly presented to</div>
<div class="name">${certificate.userName}</div>
<div class="subtitle">for successfully completing</div>
<div class="course">${certificate.courseTitle}</div>
<div class="meta">Completed on ${formatDate(certificate.completedAt)}</div>
<div class="id">Certificate ID: ${certificate.certificateId}</div>
</div>
</body>
</html>`;

  const blob = new Blob([html], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = createCertificateFileName(
    certificate.courseTitle
  );

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}

function printCertificate(certificate: StoredCertificate) {
  const printWindow = window.open(
    "",
    "_blank",
    "width=1100,height=800"
  );

  if (!printWindow) {
    window.alert(
      "Please allow pop-ups to view the certificate."
    );
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${certificate.courseTitle} Certificate</title>
        <style>
          body {
            margin: 0;
            background: #f3f4f6;
            font-family: Arial, sans-serif;
          }
          .certificate {
            width: 1000px;
            max-width: calc(100% - 40px);
            min-height: 650px;
            margin: 40px auto;
            box-sizing: border-box;
            background: white;
            border: 12px solid #4f46e5;
            padding: 70px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .brand {
            color: #4f46e5;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
          }
          h1 {
            font-size: 44px;
            margin: 30px 0 10px;
          }
          .subtitle {
            color: #6b7280;
            font-size: 18px;
          }
          .name {
            font-size: 38px;
            font-weight: bold;
            margin: 25px 0;
          }
          .course {
            color: #4f46e5;
            font-size: 28px;
            font-weight: bold;
            margin-top: 15px;
          }
          .details {
            margin-top: 45px;
            color: #6b7280;
            line-height: 1.8;
          }
          .id {
            margin-top: 25px;
            color: #9ca3af;
            font-size: 13px;
          }
          @media print {
            body { background: white; }
            .certificate {
              margin: 0;
              width: 100%;
              max-width: none;
              min-height: 100vh;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="brand">CAREERPATH AI</div>
          <h1>Certificate of Completion</h1>
          <div class="subtitle">This certificate is proudly presented to</div>
          <div class="name">${certificate.userName}</div>
          <div class="subtitle">for successfully completing</div>
          <div class="course">${certificate.courseTitle}</div>
          <div class="details">
            Completed on ${formatDate(certificate.completedAt)}
          </div>
          <div class="id">
            Certificate ID: ${certificate.certificateId}
          </div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  window.setTimeout(() => {
    printWindow.print();
  }, 300);
}

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<StoredCertificate | null>(null);

  const certificates = useMemo(
    () => getUserCertificates(),
    []
  );

  const userName = getCurrentUserName();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#080b18] px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
              <Award
                size={23}
                className="text-yellow-400"
              />
            </div>

            <div>
              <p className="text-sm text-indigo-400">
                CareerPath AI
              </p>

              <h1 className="text-3xl font-bold">
                My Certificates
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-gray-400">
            All certificates earned by {userName} are
            stored here. Complete your courses to build
            your verified learning record.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-500">
              Total Certificates
            </p>

            <p className="mt-2 text-4xl font-bold">
              {certificates.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-500">
              Learning Status
            </p>

            <p className="mt-2 text-xl font-semibold text-emerald-400">
              {certificates.length
                ? "Courses Completed"
                : "Start Learning"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-500">
              Certificate Storage
            </p>

            <p className="mt-2 text-xl font-semibold text-indigo-400">
              Personal
            </p>
          </div>
        </section>

        {certificates.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-dashed border-white/10 bg-[#111827] p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
              <GraduationCap
                size={30}
                className="text-indigo-400"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No Certificates Yet
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              Complete all lessons in a purchased course
              to automatically earn your first CareerPath
              AI certificate.
            </p>
          </section>
        ) : (
          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Earned Certificates
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your completed courses and certificates.
                </p>
              </div>

              <Sparkles
                size={22}
                className="text-indigo-400"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {certificates.map((certificate) => (
                <article
                  key={certificate.certificateId}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]"
                >
                  <div className="border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-yellow-500/10 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                          Certificate of Completion
                        </p>

                        <h3 className="mt-3 text-2xl font-bold">
                          {certificate.courseTitle}
                        </h3>
                      </div>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">
                        <Award
                          size={25}
                          className="text-yellow-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InfoItem
                        icon={<GraduationCap size={17} />}
                        label="Student"
                        value={certificate.userName}
                      />

                      <InfoItem
                        icon={<CalendarDays size={17} />}
                        label="Completed"
                        value={formatDate(
                          certificate.completedAt
                        )}
                      />

                      <InfoItem
                        icon={<Hash size={17} />}
                        label="Certificate ID"
                        value={certificate.certificateId}
                      />

                      <InfoItem
                        icon={<Sparkles size={17} />}
                        label="Status"
                        value="Completed"
                      />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate(
                            certificate
                          )
                        }
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium hover:bg-indigo-500"
                      >
                        <ExternalLink size={16} />
                        View Certificate
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          printCertificate(
                            certificate
                          )
                        }
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                      >
                        <Printer size={16} />
                        Print / Save PDF
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          downloadCertificate(
                            certificate
                          )
                        }
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {selectedCertificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-6">
          <div className="w-full max-w-5xl">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setSelectedCertificate(null)
                }
                className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <div className="rounded-lg bg-white p-5 text-gray-900 shadow-2xl md:p-10">
              <div className="border-8 border-indigo-600 p-8 text-center md:p-16">
                <p className="text-sm font-bold tracking-[0.25em] text-indigo-600">
                  CAREERPATH AI
                </p>

                <h2 className="mt-8 text-4xl font-bold md:text-5xl">
                  Certificate of Completion
                </h2>

                <p className="mt-6 text-gray-500">
                  This certificate is proudly presented to
                </p>

                <h3 className="mt-5 text-3xl font-bold md:text-4xl">
                  {selectedCertificate.userName}
                </h3>

                <p className="mt-6 text-gray-500">
                  for successfully completing
                </p>

                <p className="mt-4 text-2xl font-bold text-indigo-600 md:text-3xl">
                  {selectedCertificate.courseTitle}
                </p>

                <div className="mt-12 grid gap-5 text-sm text-gray-500 md:grid-cols-2">
                  <div>
                    <p>Completion Date</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {formatDate(
                        selectedCertificate.completedAt
                      )}
                    </p>
                  </div>

                  <div>
                    <p>Certificate ID</p>
                    <p className="mt-1 break-all font-semibold text-gray-900">
                      {selectedCertificate.certificateId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  printCertificate(
                    selectedCertificate
                  )
                }
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-500"
              >
                <Printer size={17} />
                Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0b1120] p-4">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-2 break-words text-sm font-medium text-gray-200">
        {value}
      </p>
    </div>
  );
}