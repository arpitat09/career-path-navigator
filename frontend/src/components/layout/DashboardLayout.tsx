import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* =====================================================
          FIXED SIDEBAR
      ===================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN CONTENT

          The left margin makes room for the fixed sidebar.
          The top padding prevents content from touching the
          fixed top area on smaller screens.
      ===================================================== */}

      <main
        className="
          min-h-screen
          lg:ml-72
          bg-[#050816]
        "
      >

        <div className="min-h-screen w-full px-4 pb-10 pt-6 sm:px-6 lg:px-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
}