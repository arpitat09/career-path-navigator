import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <Sidebar />

      <main className="min-h-screen w-full bg-[#050816] lg:pl-72">
        <div className="min-h-screen w-full px-4 pb-8 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}