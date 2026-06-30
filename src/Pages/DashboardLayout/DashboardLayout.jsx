import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../Components/DashboardSidebar/Sidebar";
import DashboardNav from "../../Components/DashboardSidebar/DashboardNav";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <DashboardNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-2 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}