import { Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// ================= DASHBOARD PAGES =================
import Dashboard from "../pages/Dashboard";
import Mentor from "../pages/Mentor/Mentor";
import Resume from "../pages/Resume/Resume";
import Roadmap from "../pages/Roadmap/Roadmap";
import GitHub from "../pages/GitHub/GitHub";
import Interview from "../pages/Interview/Interview";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import CoursePayment from "../pages/CoursePayment/CoursePayment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import CourseLearning from "../pages/CourseLearning/CourseLearning";
import MyLearnings from "../pages/MyLearnings/MyLearnings";
import Certificates from "../pages/Certificates/Certificates";
import Jobs from "../pages/Jobs/Jobs";
import FinalAssessment from "../pages/FinalAssessment/FinalAssessment";

// ================= SAVED JOBS =================
import SavedJobs from "../pages/SavedJobs/SavedJobs";

// ================= LAYOUT / ROUTE GUARDS =================
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route path="/" element={<Home />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>


      {/* =====================================================
          PROTECTED ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          {/* ================= DASHBOARD ================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* ================= AI MENTOR ================= */}

          <Route
            path="/mentor"
            element={<Mentor />}
          />

          {/* ================= RESUME ================= */}

          <Route
            path="/resume"
            element={<Resume />}
          />

          {/* ================= CAREER ROADMAP ================= */}

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          {/* ================= COURSES ================= */}

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/courses/:courseId"
            element={<CourseDetails />}
          />

          <Route
            path="/courses/:courseId/payment"
            element={<CoursePayment />}
          />

          <Route
            path="/courses/:courseId/success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/courses/:courseId/learn"
            element={<CourseLearning />}
          />

          {/* ================= MY LEARNINGS ================= */}

          <Route
            path="/my-learnings"
            element={<MyLearnings />}
          />

          {/* ================= CERTIFICATES ================= */}

          <Route
            path="/certificates"
            element={<Certificates />}
          />

          {/* ================= JOB OPPORTUNITIES ================= */}

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          {/* ================= SAVED JOBS ================= */}

          <Route
            path="/saved-jobs"
            element={<SavedJobs />}
          />

          {/* ================= GITHUB INSIGHTS ================= */}

          <Route
            path="/github"
            element={<GitHub />}
          />

          {/* ================= MOCK INTERVIEW ================= */}

          <Route
            path="/interview"
            element={<Interview />}
          />

          {/* ================= PROFILE ================= */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* ================= SETTINGS ================= */}

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/courses/:courseId/assessment"
            element={<FinalAssessment />}
          />

        </Route>
      </Route>

    </Routes>
  );
}