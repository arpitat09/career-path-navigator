import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <main className="min-h-screen lg:ml-72 flex justify-center">
        <Outlet />
      </main>

    </div>
  );
}