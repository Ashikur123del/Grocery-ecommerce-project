import { HiDownload, HiHeart, HiLocationMarker, HiLockClosed, HiLogout, HiShoppingBag, HiStar, HiUser, HiViewGrid, HiX } from "react-icons/hi";
import { Link, Navigate, useLocation } from "react-router-dom";

const MyAccounds = () => {
 const location = useLocation();
  
  if (location.pathname === "/my-accound") {
    return <Navigate to="/my-accound/overview" replace />;
  }

  const dashboardItems = [
    { path: "/my-accound/overview", name: "Overview", icon: <HiViewGrid size={22} /> },
    { path: "/my-accound/order-history", name: "Orders", icon: <HiShoppingBag size={22} /> },
    { path: "/my-accound/download", name: "Downloads", icon: <HiDownload size={22} /> },
    { path: "/my-accound/return", name: "Return Requests", icon: <HiX size={22} /> }, 
  ];

  const settingItems = [
    { path: "/my-accound/profile", name: "Personal Info", icon: <HiUser size={22} /> },
    { path: "/my-accound/address", name: "Address", icon: <HiLocationMarker size={22} /> },
    { path: "/my-accound/wishlist", name: "Wishlist", icon: <HiHeart size={22} /> },
    { path: "/my-accound/reviews", name: "Reviews", icon: <HiStar size={22} /> },
    { path: "/my-accound/password", name: "Change Password", icon: <HiLockClosed size={22} /> },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hidden lg:block w-64">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img src="https://i.pravatar.cc/100" alt="User" className="w-24 h-24 rounded-full border-4 border-slate-100" />
          <div className="absolute bottom-0 right-0 bg-amber-500 p-1.5 rounded-full border-2 border-white text-white">
            <HiUser size={14} />
          </div>
        </div>
        <h3 className="mt-4 font-bold text-lg">Mr. Ariful Islam</h3>
        <p className="text-slate-500 text-sm">arifulislam@gmail.com</p>
      </div>

      <div className="flex-grow">
        {/* Dashboard Items */}
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 px-3">Dashboard</p>
          {dashboardItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === "/my-accound/overview" && location.pathname === "/my-accound");
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 mb-1 rounded-lg transition-all ${isActive ? "bg-amber-500 text-white font-semibold" : "text-slate-700 hover:bg-slate-100"}`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Settings Items */}
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 px-3">Account Settings</p>
          {settingItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 mb-1 rounded-lg transition-all ${isActive ? "bg-amber-500 text-white font-semibold" : "text-slate-700 hover:bg-slate-100"}`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <Link to="/sign-in" className="flex items-center gap-3 p-3 w-full text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg mt-4 transition-colors">
        <HiLogout size={22} /> Logout
      </Link>
    </div>
  );
};

export default MyAccounds;