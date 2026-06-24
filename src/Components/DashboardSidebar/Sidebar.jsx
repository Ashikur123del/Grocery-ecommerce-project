import { Link, useLocation } from "react-router";
import { HiViewGrid, HiUser, HiShoppingBag, HiLogout, HiX, HiDownload, HiLocationMarker, HiHeart, HiStar, HiLockClosed } from "react-icons/hi";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  const dashboardItems = [
    { path: "/dashboard/overview", name: "Overview", icon: <HiViewGrid size={22} /> },
    { path: "/dashboard/order-history", name: "Orders", icon: <HiShoppingBag size={22} /> },
    { path: "/dashboard/download", name: "Downloads", icon: <HiDownload size={22} /> },
    { path: "/dashboard/return", name: "Return Requests", icon: <HiX size={22} /> }, 
  ];

  const settingItems = [
    { path: "/dashboard/profile", name: "Personal Info", icon: <HiUser size={22} /> },
    { path: "/dashboard/address", name: "Address", icon: <HiLocationMarker size={22} /> },
    { path: "/dashboard/wishlist", name: "Wishlist", icon: <HiHeart size={22} /> },
    { path: "/dashboard/reviews", name: "Reviews", icon: <HiStar size={22} /> },
    { path: "/dashboard/password", name: "Change Password", icon: <HiLockClosed size={22} /> },
  ];

  return (
    <>
    
      {isSidebarOpen && (
        <div className="fixed inset-0  z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white p-5 flex flex-col transform transition-transform duration-300 overflow-y-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      
        <div className="flex flex-col items-center mb-8 flex-shrink-0">
          <div className="relative">
            <img src="https://i.pravatar.cc/100" alt="User" className="w-24 h-24 rounded-full border-4 border-slate-700" />
            <div className="absolute bottom-0 right-0 bg-slate-700 p-1 rounded-full border-2 border-slate-900">
               <HiUser size={14} />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-lg">Mr. Ariful Islam</h3>
          <p className="text-slate-400 text-sm">arifulislam@gmail.com</p>
        </div>

        <div className="flex-grow">
          <div className="mb-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Dashboard</p>
            {dashboardItems.map((item) => (
              <Link key={item.path} to={item.path} 
                className={`flex items-center gap-3 p-3 mb-1 rounded-lg transition-all ${location.pathname === item.path ? "bg-amber-500 text-white font-semibold" : "text-slate-300 hover:bg-slate-800"}`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mb-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Account Settings</p>
            {settingItems.map((item) => (
              <Link key={item.path} to={item.path} 
                className={`flex items-center gap-3 p-3 mb-1 rounded-lg transition-all ${location.pathname === item.path ? "bg-amber-500 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-3 p-3 w-full text-slate-300 hover:bg-slate-800 rounded-lg mt-4 flex-shrink-0">
          <HiLogout size={22} /> Logout
        </button>
      </div>
    </>
  );
}