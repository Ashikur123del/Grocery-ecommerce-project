import { Link, useLocation } from "react-router";
import { 
  HiViewGrid, HiShoppingBag, HiLogout,  
  HiChartBar, HiCreditCard, HiCog, HiGlobeAlt, HiUsers, 
  HiCollection, HiCash, HiShieldCheck 
} from "react-icons/hi";

export default function SuperAdminSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  const menuGroups = [
    {
      title: "Core Platform",
      items: [
        { path: "/supper-admin", name: "Dashboard", icon: <HiViewGrid size={22} /> },
        { path: "/supper-admin/analytics", name: "Platform Analytics", icon: <HiChartBar size={20} /> },
      ]
    },
    {
      title: "Store Management",
      items: [
        { path: "/supper-admin/stores", name: "All Stores", icon: <HiCollection size={20} /> },
        { path: "/supper-admin/pending-stores", name: "Pending Approvals", icon: <HiShieldCheck size={20} />, badge: 3 },
        { path: "/supper-admin/vendors", name: "Vendors Directory", icon: <HiUsers size={20} /> },
        { path: "/supper-admin/custom-domains", name: "Domain Requests", icon: <HiGlobeAlt size={20} />, badge: 2 },
      ]
    },
    {
      title: "SaaS Business & Billing",
      items: [
        { path: "/supper-admin/plans", name: "Subscription Plans", icon: <HiCreditCard size={20} /> },
        { path: "/supper-admin/payouts", name: "Vendor Payouts", icon: <HiCash size={20} />, badge: 5 },
        { path: "/supper-admin/transactions", name: "Global Sales Log", icon: <HiShoppingBag size={20} /> },
      ]
    },
    {
      title: "Configuration",
      items: [
        { path: "/supper-admin/settings", name: "System Settings", icon: <HiCog size={20} /> },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Containers */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto scrollbar-thin scrollbar scrollbar-thumb-amber-500 scrollbar-track-slate-800 bg-slate-950 text-white p-5 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Admin Branding / Profile */}
        <div className="flex flex-col items-center mb-8 flex-shrink-0 border-b border-slate-800 pb-5">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
              alt="Admin" 
              className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover" 
            />
            <div className="absolute bottom-0 right-0 bg-indigo-500 p-1.5 rounded-full border-2 border-slate-950">
              <HiShieldCheck size={14} className="text-white" />
            </div>
          </div>
          <h3 className="mt-3 font-bold text-lg text-slate-100">Super Admin</h3>
          <p className="text-indigo-400 text-xs font-semibold tracking-wide uppercase mt-1">Platform Owner</p>
        </div>

        {/* Dynamic Navigation */}
        <div className="flex-grow space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-3 px-3">
                {group.title}
              </p>
              {group.items.map((item) => {
                // চেক করা হচ্ছে কারেন্ট পাথ এবং লিংকের পাথ মিলছে কিনা
                // অথবা হোম ড্যাশবোর্ডের জন্য সাব-রুট (যেমন: /supper-admin/dashboard) হ্যান্ডেল করা
                const isActive = location.pathname === item.path || 
                  (item.path === "/supper-admin" && location.pathname === "/supper-admin/dashboard");
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => {
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 p-2.5 mb-1 rounded-lg transition-all ${
                      isActive 
                        ? "bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30" 
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                    }`}
                  >
                    {item.icon}
                    <span className="flex-grow text-sm">{item.name}</span>
                    {item.badge && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* System Logout */}
        <button className="flex items-center font-semibold justify-center gap-3 p-3 w-full text-white bg-slate-900 hover:bg-rose-600 transition-colors rounded-lg mt-6 flex-shrink-0 border border-slate-800 hover:border-transparent">
          <HiLogout size={20} /> Logout System
        </button>
      </aside>
    </>
  );
}