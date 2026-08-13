import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Mail,
  Phone,
  Globe,
  Code2,
  RefreshCw,
  Loader2,
  Target,
  BookOpen,
  TrendingUp,
} from "lucide-react";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "../../components/sidebar/Sidebar";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

/* =========================================================
   TYPES
========================================================= */

interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface ResumeSections {
  summary: boolean;
  education: boolean;
  experience: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
}

interface CareerRecommendation {
  id: string;
  career: string;
  description: string;
  match: number;
  matchedSkills: string[];
  missingSkills: string[];
  totalRequiredSkills: number;
  matchedSkillCount: number;
}

interface SkillsGap {
  career: string;
  careerId: string;
  match: number;
  matched: string[];
  missing: string[];
}

interface ResumeAnalysis {
  name: string;

  contact: ContactInfo;

  skills: string[];

  sections: ResumeSections;

  atsScore: number;

  strengths: string[];

  improvements: string[];

  textLength: number;

  skillCount: number;

  careerRecommendations: CareerRecommendation[];

  skillsGap: SkillsGap | null;

  fileName: string;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Resume() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const abortControllerRef =
    useRef<AbortController | null>(null);

  const analysisInFlightRef =
    useRef(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [analysisStage, setAnalysisStage] =
    useState("Ready to analyze");

  /* =======================================================
     FILE SELECTION
  ======================================================= */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setAnalysis(null);

    if (
      file.type !== "application/pdf"
    ) {
      setSelectedFile(null);

      setError(
        "Please upload a PDF file only."
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setSelectedFile(null);

      setError(
        "File size must be less than 5 MB."
      );

      return;
    }

    setSelectedFile(file);
  };

  /* =======================================================
     ANALYZE RESUME
  ======================================================= */

  const handleAnalyze = async () => {
    if (
      analysisInFlightRef.current ||
      loading
    ) {
      return;
    }

    if (!selectedFile) {
      setError(
        "Please select a PDF resume first."
      );

      return;
    }

    analysisInFlightRef.current =
      true;

    setLoading(true);
    setError("");
    setAnalysis(null);

    setAnalysisStage(
      "Uploading resume..."
    );

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    try {
      const formData =
        new FormData();

      formData.append(
        "resume",
        selectedFile
      );

      console.log(
        "📄 Uploading:",
        selectedFile.name
      );

      console.log(
        "📦 Size:",
        `${(
          selectedFile.size /
          1024 /
          1024
        ).toFixed(2)} MB`
      );

      console.log(
        "🌐 API:",
        `${API_URL}/api/resume/analyze`
      );

      setAnalysisStage(
        "Reading your resume..."
      );

      const response =
        await fetch(
          `${API_URL}/api/resume/analyze`,
          {
            method: "POST",
            body: formData,
            signal: controller.signal,
          }
        );

      const text =
        await response.text();

      let data;

      try {
        data =
          JSON.parse(text);
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      console.log(
        "📥 Resume API response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Resume analysis failed."
        );
      }

      if (!data?.analysis) {
        throw new Error(
          "No resume analysis was returned."
        );
      }

      setAnalysisStage(
        "Calculating career matches..."
      );

      const completeAnalysis: ResumeAnalysis = {
        ...data.analysis,
        fileName:
          data.fileName ||
          selectedFile.name,
      };

      setAnalysis(
        completeAnalysis
      );

      setAnalysisStage(
        "Analysis completed."
      );

    } catch (err) {
      console.error(
        "❌ Resume analysis error:",
        err
      );

      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        setError(
          "Resume analysis was cancelled."
        );
      } else if (
        err instanceof Error
      ) {
        setError(
          err.message
        );
      } else {
        setError(
          "Something went wrong while analyzing the resume."
        );
      }

    } finally {
      abortControllerRef.current =
        null;

      analysisInFlightRef.current =
        false;

      setLoading(false);

      setAnalysisStage(
        "Ready to analyze"
      );
    }
  };

  /* =======================================================
     CANCEL
  ======================================================= */

  const handleCancelAnalysis = () => {
    abortControllerRef.current?.abort();
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    abortControllerRef.current?.abort();

    setSelectedFile(null);
    setAnalysis(null);
    setError("");
    setAnalysisStage(
      "Ready to analyze"
    );

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  /* =======================================================
     SCORE LABEL
  ======================================================= */

  const getScoreLabel = (
    score: number
  ) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 50) {
      return "Needs improvement";
    }

    return "Needs significant improvement";
  };

  /* =======================================================
     SCORE COLOR
  ======================================================= */

  const getScoreColor = (
    score: number
  ) => {
    if (score >= 85) {
      return "text-green-400";
    }

    if (score >= 70) {
      return "text-blue-400";
    }

    if (score >= 50) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  /* =======================================================
     RESUME SECTIONS
  ======================================================= */

  const sectionList = [
    {
      name: "Summary",
      key: "summary" as const,
      icon: FileText,
    },
    {
      name: "Education",
      key: "education" as const,
      icon: GraduationCap,
    },
    {
      name: "Experience",
      key: "experience" as const,
      icon: Briefcase,
    },
    {
      name: "Skills",
      key: "skills" as const,
      icon: Code2,
    },
    {
      name: "Projects",
      key: "projects" as const,
      icon: FolderGit2,
    },
    {
      name: "Certifications",
      key: "certifications" as const,
      icon: Award,
    },
  ];

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#070b18] text-white">

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <Sidebar />


      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="min-h-screen">

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            border-b
            border-white/10
            bg-[#070b18]/95
            backdrop-blur-xl
          "
        >

          <div
            className="
              mx-auto
              flex
              w-full
              max-w-5xl
              items-center
              gap-4
              px-6
              py-5
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-600/20
              "
            >

              <FileText
                size={23}
                className="text-indigo-400"
              />

            </div>


            <div className="min-w-0">

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                "
              >
                Resume Analyzer
              </h1>


              <p
                className="
                  mt-1
                  text-sm
                  text-gray-400
                "
              >
                Analyze your resume, check ATS
                readiness, and find suitable career paths.
              </p>

            </div>

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <div
          className="
            mx-auto
            w-full
            max-w-5xl
            px-6
            py-8
          "
        >

          {/* =================================================
              UPLOAD PAGE
          ================================================= */}

          {!analysis && (

            <section className="w-full">

              <div
                className="
                  w-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#0d1426]
                  shadow-2xl
                  shadow-black/20
                "
              >

                {/* =========================================
                    STEPS
                ========================================= */}

                <div
                  className="
                    border-b
                    border-white/10
                    bg-gradient-to-r
                    from-indigo-500/10
                    via-transparent
                    to-purple-500/10
                    px-5
                    py-4
                  "
                >

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      justify-center
                      gap-2
                      text-xs
                      text-gray-400
                    "
                  >

                    <span
                      className="
                        rounded-full
                        border
                        border-indigo-400/20
                        bg-indigo-400/10
                        px-3
                        py-1
                        text-indigo-300
                      "
                    >
                      1. Upload PDF
                    </span>

                    <span>→</span>

                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-1
                      "
                    >
                      2. Extract content
                    </span>

                    <span>→</span>

                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-1
                      "
                    >
                      3. Analyze resume
                    </span>

                  </div>

                </div>


                {/* =========================================
                    UPLOAD AREA
                ========================================= */}

                <div
                  className="
                    p-8
                    sm:p-10
                  "
                >

                  <div className="text-center">

                    <div
                      className="
                        mx-auto
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-2xl
                        bg-indigo-500/20
                      "
                    >

                      <Upload
                        size={35}
                        className="text-indigo-400"
                      />

                    </div>


                    <h2
                      className="
                        mt-6
                        text-3xl
                        font-bold
                      "
                    >
                      Upload Your Resume
                    </h2>


                    <p
                      className="
                        mx-auto
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-7
                        text-gray-400
                      "
                    >
                      Upload a PDF resume.
                      The system extracts the
                      resume content and checks
                      its structure, skills, ATS
                      score, and career matches.
                    </p>

                  </div>


                  {/* FILE INPUT */}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={
                      handleFileChange
                    }
                    className="hidden"
                  />


                  {/* UPLOAD BOX */}

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="
                      mt-8
                      w-full
                      rounded-2xl
                      border-2
                      border-dashed
                      border-white/10
                      bg-[#080e1d]
                      px-6
                      py-16
                      text-center
                      transition
                      hover:border-indigo-500/60
                      hover:bg-indigo-500/[0.03]
                    "
                  >

                    {selectedFile ? (

                      <>

                        <div
                          className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-green-500/10
                          "
                        >

                          <CheckCircle
                            size={30}
                            className="text-green-400"
                          />

                        </div>


                        <p
                          className="
                            mt-4
                            font-semibold
                          "
                        >
                          Resume selected
                        </p>


                        <p
                          className="
                            mt-2
                            break-all
                            text-sm
                            text-gray-400
                          "
                        >
                          {selectedFile.name}
                        </p>


                        <p
                          className="
                            mt-1
                            text-xs
                            text-gray-600
                          "
                        >
                          Click to choose a
                          different PDF
                        </p>

                      </>

                    ) : (

                      <>

                        <div
                          className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-indigo-500/10
                          "
                        >

                          <Upload
                            size={28}
                            className="text-indigo-400"
                          />

                        </div>


                        <p
                          className="
                            mt-4
                            font-semibold
                          "
                        >
                          Click to select your resume
                        </p>


                        <p
                          className="
                            mt-2
                            text-sm
                            text-gray-500
                          "
                        >
                          PDF only · Maximum 5 MB
                        </p>

                      </>

                    )}

                  </button>


                  {/* SELECTED FILE */}

                  {selectedFile && (

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        border
                        border-white/10
                        bg-[#0b1120]
                        px-5
                        py-4
                      "
                    >

                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >

                        <FileText
                          size={20}
                          className="
                            shrink-0
                            text-indigo-400
                          "
                        />


                        <div className="min-w-0">

                          <p
                            className="
                              truncate
                              text-sm
                              font-medium
                            "
                          >
                            {selectedFile.name}
                          </p>


                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            {(
                              selectedFile.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </p>

                        </div>

                      </div>


                      <button
                        type="button"
                        onClick={
                          handleReset
                        }
                        className="
                          shrink-0
                          text-sm
                          text-gray-400
                          hover:text-white
                        "
                      >
                        Remove
                      </button>

                    </div>

                  )}


                  {/* ERROR */}

                  {error && (

                    <div
                      className="
                        mt-5
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        p-4
                        text-sm
                        text-red-300
                      "
                    >

                      <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                      />

                      <p>
                        {error}
                      </p>

                    </div>

                  )}


                  {/* ANALYZE */}

                  <button
                    type="button"
                    onClick={
                      handleAnalyze
                    }
                    disabled={
                      !selectedFile ||
                      loading
                    }
                    className="
                      mt-6
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
                      shadow-lg
                      shadow-indigo-950/30
                      transition
                      hover:bg-indigo-500
                      disabled:cursor-not-allowed
                      disabled:bg-white/10
                      disabled:text-gray-500
                      disabled:shadow-none
                    "
                  >

                    {loading ? (

                      <>

                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        {analysisStage}

                      </>

                    ) : (

                      <>

                        <TrendingUp
                          size={20}
                        />

                        Analyze Resume

                      </>

                    )}

                  </button>


                  {/* LOADING */}

                  {loading && (

                    <div
                      className="
                        mt-4
                        rounded-2xl
                        border
                        border-indigo-500/20
                        bg-indigo-500/5
                        p-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          text-xs
                        "
                      >

                        <span
                          className="text-indigo-300"
                        >
                          {analysisStage}
                        </span>


                        <span
                          className="text-gray-500"
                        >
                          Resume Analyzer
                        </span>

                      </div>


                      <div
                        className="
                          mt-3
                          h-1.5
                          overflow-hidden
                          rounded-full
                          bg-white/5
                        "
                      >

                        <div
                          className="
                            h-full
                            w-1/3
                            animate-pulse
                            rounded-full
                            bg-indigo-500
                          "
                        />

                      </div>


                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >

                        <p
                          className="
                            text-xs
                            leading-5
                            text-gray-500
                          "
                        >
                          Extracting information
                          and calculating your
                          resume results.
                        </p>


                        <button
                          type="button"
                          onClick={
                            handleCancelAnalysis
                          }
                          className="
                            shrink-0
                            rounded-lg
                            border
                            border-white/10
                            px-3
                            py-2
                            text-xs
                            text-gray-400
                            hover:text-white
                          "
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            </section>

          )}


          {/* =================================================
              RESULTS
          ================================================= */}

          {analysis && (

            <section className="w-full">

              {/* RESULT HEADER */}

              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="min-w-0">

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Resume Analysis
                  </p>


                  <h2
                    className="
                      mt-1
                      truncate
                      text-2xl
                      font-bold
                    "
                  >
                    {analysis.name ||
                      analysis.fileName}
                  </h2>


                  <p
                    className="
                      mt-1
                      truncate
                      text-sm
                      text-gray-400
                    "
                  >
                    {analysis.fileName}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={
                    handleReset
                  }
                  className="
                    flex
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    px-5
                    py-3
                    text-sm
                    font-medium
                    transition
                    hover:bg-white/10
                  "
                >

                  <RefreshCw
                    size={17}
                  />

                  Analyze Another Resume

                </button>

              </div>


              {/* SCORE CARDS */}

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-3
                "
              >

                {/* ATS */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <p
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      ATS Score
                    </p>


                    <div
                      className="
                        rounded-lg
                        bg-indigo-500/10
                        p-2
                        text-indigo-400
                      "
                    >
                      <Target size={20} />
                    </div>

                  </div>


                  <h3
                    className={`
                      mt-4
                      text-4xl
                      font-bold
                      ${getScoreColor(
                        analysis.atsScore
                      )}
                    `}
                  >
                    {analysis.atsScore}%
                  </h3>


                  <p
                    className="
                      mt-2
                      text-sm
                      text-gray-400
                    "
                  >
                    {getScoreLabel(
                      analysis.atsScore
                    )}
                  </p>


                  <div
                    className="
                      mt-5
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white/5
                    "
                  >

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-indigo-500
                      "
                      style={{
                        width: `${Math.min(
                          Math.max(
                            analysis.atsScore,
                            0
                          ),
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>


                {/* SKILLS */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <p
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      Skills Detected
                    </p>


                    <div
                      className="
                        rounded-lg
                        bg-green-500/10
                        p-2
                        text-green-400
                      "
                    >
                      <Code2 size={20} />
                    </div>

                  </div>


                  <h3
                    className="
                      mt-4
                      text-4xl
                      font-bold
                      text-green-400
                    "
                  >
                    {analysis.skillCount}
                  </h3>


                  <p
                    className="
                      mt-2
                      text-sm
                      text-gray-400
                    "
                  >
                    Technical skills found
                  </p>

                </div>


                {/* CAREER */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <p
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      Best Career Match
                    </p>


                    <div
                      className="
                        rounded-lg
                        bg-purple-500/10
                        p-2
                        text-purple-400
                      "
                    >
                      <Briefcase size={20} />
                    </div>

                  </div>


                  {analysis.careerRecommendations?.[0] ? (

                    <>

                      <h3
                        className="
                          mt-4
                          text-4xl
                          font-bold
                          text-purple-400
                        "
                      >
                        {
                          analysis
                            .careerRecommendations[0]
                            .match
                        }%
                      </h3>


                      <p
                        className="
                          mt-2
                          font-medium
                          text-white
                        "
                      >
                        {
                          analysis
                            .careerRecommendations[0]
                            .career
                        }
                      </p>

                    </>

                  ) : (

                    <p
                      className="
                        mt-4
                        text-gray-500
                      "
                    >
                      No career match available.
                    </p>

                  )}

                </div>

              </div>


              {/* CONTACT */}

              <div
                className="
                  mt-8
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#111827]
                  p-6
                  sm:p-7
                "
              >

                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Contact Information
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Information detected from your resume
                </p>


                <div
                  className="
                    mt-6
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-4
                  "
                >

                  <ContactItem
                    icon={<Mail size={19} />}
                    label="Email"
                    value={
                      analysis.contact.email
                    }
                  />


                  <ContactItem
                    icon={<Phone size={19} />}
                    label="Phone"
                    value={
                      analysis.contact.phone
                    }
                  />


                  <ContactItem
                    icon={<Globe size={19} />}
                    label="LinkedIn"
                    value={
                      analysis.contact.linkedin
                    }
                  />


                  <ContactItem
                    icon={<Code2 size={19} />}
                    label="GitHub"
                    value={
                      analysis.contact.github
                    }
                  />

                </div>

              </div>


              {/* RESUME SECTIONS */}

              <div
                className="
                  mt-8
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#111827]
                  p-6
                  sm:p-7
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <FileText
                    size={23}
                    className="text-indigo-400"
                  />


                  <div>

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      Resume Sections
                    </h3>


                    <p
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Sections detected in your resume
                    </p>

                  </div>

                </div>


                <div
                  className="
                    mt-6
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                  "
                >

                  {sectionList.map(
                    (section) => {

                      const Icon =
                        section.icon;

                      const available =
                        analysis.sections[
                          section.key
                        ];

                      return (

                        <div
                          key={
                            section.key
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-white/5
                            p-4
                          "
                        >

                          <div
                            className={`
                              rounded-lg
                              p-2
                              ${
                                available
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-red-500/10 text-red-400"
                              }
                            `}
                          >
                            <Icon size={19} />
                          </div>


                          <div>

                            <p
                              className="
                                text-sm
                                font-medium
                              "
                            >
                              {section.name}
                            </p>


                            <p
                              className={`
                                text-xs
                                ${
                                  available
                                    ? "text-green-400"
                                    : "text-red-400"
                                }
                              `}
                            >
                              {available
                                ? "Detected"
                                : "Not detected"}
                            </p>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              </div>


              {/* STRENGTHS + IMPROVEMENTS */}

              <div
                className="
                  mt-8
                  grid
                  gap-8
                  lg:grid-cols-2
                "
              >

                {/* STRENGTHS */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-6
                    sm:p-7
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <CheckCircle
                      size={23}
                      className="text-green-400"
                    />


                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      Resume Strengths
                    </h3>

                  </div>


                  <div
                    className="
                      mt-6
                      space-y-4
                    "
                  >

                    {analysis.strengths?.length > 0 ? (

                      analysis.strengths.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                              flex
                              items-start
                              gap-3
                            "
                          >

                            <CheckCircle
                              size={18}
                              className="
                                mt-1
                                shrink-0
                                text-green-400
                              "
                            />


                            <p
                              className="
                                text-sm
                                leading-6
                                text-gray-300
                              "
                            >
                              {item}
                            </p>

                          </div>

                        )
                      )

                    ) : (

                      <p
                        className="text-gray-500"
                      >
                        No specific strengths were identified.
                      </p>

                    )}

                  </div>

                </div>


                {/* IMPROVEMENTS */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-6
                    sm:p-7
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <AlertCircle
                      size={23}
                      className="text-yellow-400"
                    />


                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      Areas to Improve
                    </h3>

                  </div>


                  <div
                    className="
                      mt-6
                      space-y-4
                    "
                  >

                    {analysis.improvements?.length > 0 ? (

                      analysis.improvements.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="
                              flex
                              items-start
                              gap-3
                            "
                          >

                            <AlertCircle
                              size={18}
                              className="
                                mt-1
                                shrink-0
                                text-yellow-400
                              "
                            />


                            <p
                              className="
                                text-sm
                                leading-6
                                text-gray-300
                              "
                            >
                              {item}
                            </p>

                          </div>

                        )
                      )

                    ) : (

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          text-green-400
                        "
                      >

                        <CheckCircle size={19} />

                        <p className="text-sm">
                          No major improvements were identified.
                        </p>

                      </div>

                    )}

                  </div>

                </div>

              </div>


              {/* DETECTED SKILLS */}

              <div
                className="
                  mt-8
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#111827]
                  p-6
                  sm:p-7
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Code2
                    size={23}
                    className="text-indigo-400"
                  />


                  <div>

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      Detected Skills
                    </h3>


                    <p
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Technical skills found in your resume
                    </p>

                  </div>

                </div>


                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-3
                  "
                >

                  {analysis.skills.length > 0 ? (

                    analysis.skills.map(
                      (
                        skill,
                        index
                      ) => (

                        <span
                          key={`${skill}-${index}`}
                          className="
                            rounded-full
                            border
                            border-indigo-500/20
                            bg-indigo-500/10
                            px-4
                            py-2
                            text-sm
                            text-indigo-300
                          "
                        >
                          {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p
                      className="text-gray-500"
                    >
                      No technical skills detected.
                    </p>

                  )}

                </div>

              </div>


              {/* CAREER RECOMMENDATIONS */}

              <div
                className="
                  mt-8
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#111827]
                  p-6
                  sm:p-7
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Briefcase
                    size={23}
                    className="text-purple-400"
                  />


                  <div>

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      Recommended Careers
                    </h3>


                    <p
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Career matches based on the
                      skills found in your resume
                    </p>

                  </div>

                </div>


                <div
                  className="
                    mt-6
                    space-y-5
                  "
                >

                  {analysis.careerRecommendations?.map(
                    (
                      career,
                      index
                    ) => (

                      <div
                        key={career.id}
                        className="
                          rounded-2xl
                          border
                          border-white/5
                          bg-white/[0.03]
                          p-5
                        "
                      >

                        <div
                          className="
                            flex
                            flex-col
                            justify-between
                            gap-4
                            sm:flex-row
                            sm:items-center
                          "
                        >

                          <div className="min-w-0">

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <span
                                className="
                                  flex
                                  h-8
                                  w-8
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-purple-500/10
                                  text-sm
                                  font-bold
                                  text-purple-400
                                "
                              >
                                {index + 1}
                              </span>


                              <h4
                                className="
                                  font-semibold
                                  text-white
                                "
                              >
                                {career.career}
                              </h4>

                            </div>


                            <p
                              className="
                                mt-2
                                text-sm
                                leading-6
                                text-gray-500
                              "
                            >
                              {career.description}
                            </p>

                          </div>


                          <div
                            className="
                              shrink-0
                              sm:text-right
                            "
                          >

                            <p
                              className={`
                                text-2xl
                                font-bold
                                ${getScoreColor(
                                  career.match
                                )}
                              `}
                            >
                              {career.match}%
                            </p>


                            <p
                              className="
                                text-xs
                                text-gray-500
                              "
                            >
                              skill match
                            </p>

                          </div>

                        </div>


                        <div
                          className="
                            mt-4
                            h-2
                            overflow-hidden
                            rounded-full
                            bg-white/5
                          "
                        >

                          <div
                            className="
                              h-full
                              rounded-full
                              bg-purple-500
                            "
                            style={{
                              width: `${career.match}%`,
                            }}
                          />

                        </div>


                        <div
                          className="
                            mt-4
                            flex
                            flex-wrap
                            gap-2
                          "
                        >

                          {career.matchedSkills
                            .slice(0, 8)
                            .map(
                              (
                                skill
                              ) => (

                                <span
                                  key={skill}
                                  className="
                                    rounded-full
                                    bg-green-500/10
                                    px-3
                                    py-1
                                    text-xs
                                    text-green-400
                                  "
                                >
                                  ✓ {skill}
                                </span>

                              )
                            )}

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* SKILLS GAP */}

              {analysis.skillsGap && (

                <div
                  className="
                    mt-8
                    grid
                    gap-8
                    lg:grid-cols-2
                  "
                >

                  {/* MATCHED */}

                  <div
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#111827]
                      p-6
                      sm:p-7
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <CheckCircle
                        size={23}
                        className="text-green-400"
                      />


                      <div>

                        <h3
                          className="
                            text-xl
                            font-bold
                          "
                        >
                          Skills You Already Have
                        </h3>


                        <p
                          className="
                            text-sm
                            text-gray-500
                          "
                        >
                          For{" "}
                          {
                            analysis.skillsGap
                              .career
                          }
                        </p>

                      </div>

                    </div>


                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                      "
                    >

                      {analysis.skillsGap.matched.map(
                        (
                          skill
                        ) => (

                          <span
                            key={skill}
                            className="
                              rounded-full
                              border
                              border-green-500/20
                              bg-green-500/10
                              px-4
                              py-2
                              text-sm
                              text-green-400
                            "
                          >
                            ✓ {skill}
                          </span>

                        )
                      )}

                    </div>

                  </div>


                  {/* MISSING */}

                  <div
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#111827]
                      p-6
                      sm:p-7
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <BookOpen
                        size={23}
                        className="text-yellow-400"
                      />


                      <div>

                        <h3
                          className="
                            text-xl
                            font-bold
                          "
                        >
                          Skills to Improve
                        </h3>


                        <p
                          className="
                            text-sm
                            text-gray-500
                          "
                        >
                          Skills that can improve
                          your match
                        </p>

                      </div>

                    </div>


                    <div
                      className="
                        mt-6
                        space-y-3
                      "
                    >

                      {analysis.skillsGap.missing.length > 0 ? (

                        analysis.skillsGap.missing.map(
                          (
                            skill
                          ) => (

                            <div
                              key={skill}
                              className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                bg-yellow-500/5
                                px-4
                                py-3
                              "
                            >

                              <span
                                className="
                                  text-sm
                                  text-gray-300
                                "
                              >
                                {skill}
                              </span>


                              <span
                                className="
                                  text-xs
                                  text-yellow-400
                                "
                              >
                                Learn
                              </span>

                            </div>

                          )
                        )

                      ) : (

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            text-green-400
                          "
                        >

                          <CheckCircle size={18} />

                          <span
                            className="text-sm"
                          >
                            You match all required
                            skills for this career.
                          </span>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              )}


              {/* FINAL MESSAGE */}

              <div
                className="
                  mt-8
                  rounded-3xl
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  p-6
                  sm:p-7
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-500/20
                    "
                  >

                    <TrendingUp
                      size={22}
                      className="text-indigo-400"
                    />

                  </div>


                  <div>

                    <h3
                      className="font-bold"
                    >
                      Resume Analysis Complete
                    </h3>


                    <p
                      className="
                        mt-2
                        text-sm
                        leading-7
                        text-gray-400
                      "
                    >
                      These results were calculated
                      from the contents of{" "}

                      <span className="text-gray-200">
                        {analysis.fileName}
                      </span>

                      . The career recommendations
                      are based on the technical skills
                      detected in your resume.
                    </p>

                  </div>

                </div>

              </div>

            </section>

          )}

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  const available =
    Boolean(value);

  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-3
        rounded-xl
        bg-white/5
        p-4
      "
    >

      <div
        className={`
          shrink-0
          rounded-lg
          p-2
          ${
            available
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }
        `}
      >
        {icon}
      </div>


      <div className="min-w-0">

        <p
          className="
            text-sm
            font-medium
          "
        >
          {label}
        </p>


        <p
          className={`
            mt-1
            truncate
            text-xs
            ${
              available
                ? "text-green-400"
                : "text-red-400"
            }
          `}
          title={
            value ||
            "Not detected"
          }
        >
          {value ||
            "Not detected"}
        </p>

      </div>

    </div>
  );
}