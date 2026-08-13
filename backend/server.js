import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db.js";

import resumeRoutes from "./routes/resume.js";
import mentorRoutes from "./routes/mentor.js";
import authRoutes from "./routes/auth.js";
import jobsRoutes from "./routes/jobs.js";

dotenv.config();

const app = express();

/* =========================================================
   DATABASE
========================================================= */

connectDB().catch((error) => {
  console.error(
    "❌ Database connection failed:",
    error.message
  );

  process.exit(1);
});

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerPath AI backend is running.",
  });
});

/* =========================================================
   API TEST
========================================================= */

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerPath AI API is working.",
  });
});

/* =========================================================
   AUTHENTICATION

   Register:
   POST /api/auth/register

   Login:
   POST /api/auth/login

   Test:
   GET /api/auth/test
========================================================= */

app.use(
  "/api/auth",
  authRoutes
);

/* =========================================================
   RESUME ANALYZER
========================================================= */

app.use(
  "/api/resume",
  resumeRoutes
);

/* =========================================================
   AI MENTOR
   Gemini is used ONLY here
========================================================= */

app.use(
  "/api/mentor",
  mentorRoutes
);

/* =========================================================
   JOB OPPORTUNITIES
   Adzuna API
========================================================= */

app.use(
  "/api/jobs",
  jobsRoutes
);

/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(
  (err, req, res, next) => {
    console.error(
      "❌ Server error:",
      err
    );

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal server error.",
    });
  }
);

/* =========================================================
   START SERVER
========================================================= */

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      "========================================"
    );

    console.log(
      `🚀 Server running on port ${PORT}`
    );

    console.log(
      `🌐 http://localhost:${PORT}`
    );

    console.log(
      `🔐 Auth API: http://localhost:${PORT}/api/auth`
    );

    console.log(
      `📄 Resume API: http://localhost:${PORT}/api/resume`
    );

    console.log(
      `🤖 Mentor API: http://localhost:${PORT}/api/mentor`
    );

    console.log(
      `💼 Jobs API: http://localhost:${PORT}/api/jobs`
    );

    console.log(
      "========================================"
    );
  }
);