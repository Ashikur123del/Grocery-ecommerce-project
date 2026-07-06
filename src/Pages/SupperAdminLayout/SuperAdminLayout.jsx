
import { Outlet } from 'react-router';

import { HiMenuAlt2, HiBell,  } from 'react-icons/hi';
import { useState } from 'react';
import SuperAdminSidebar from './SupperAdminSidebar/SupperAdminSidebar';

const SuperAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      
      <SuperAdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      <div className="flex-grow flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
        
    
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm">
          
          {/* বাম পাশ: মোবাইল মেনু বাটন */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden transition-colors"
              aria-label="Open Sidebar"
            >
              <HiMenuAlt2 size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
              Platform Control Center
            </h2>
          </div>

          {/* ডান পাশ: নোটিফিকেশন ও প্রোফাইল */}
          <div className="flex items-center gap-4">
            {/* নোটিফিকেশন বাটন */}
            <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-full relative transition-colors">
              <HiBell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-6 w-[1px] bg-slate-200"></div>

            {/* অ্যাডমিন প্রোফাইল ইনফো */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
                alt="Admin" 
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                  Ariful Islam
                </p>
                <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
                  Super Admin
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ৩. ডায়নামিক চাইল্ড পেজ রেন্ডার এরিয়া */}
        <main className="p-4 lg:p-6 flex-grow max-w-[1600px] w-full mx-auto">
          {/* এখানে রাউটারের চাইল্ড পেজগুলো (Overview, Stores, Payouts) অটোমেটিক লোড হবে */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;