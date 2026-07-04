import { useState } from "react";
import {
  HiHeart,
  HiLocationMarker,
  HiLockClosed,
  HiLogout,
  HiShoppingBag,
  HiStar,
  HiUser,
  HiViewGrid,
  HiX,
  HiTicket,
  HiCreditCard,
  HiSupport,
} from "react-icons/hi";
import { Link, Navigate, useLocation, useResolvedPath } from "react-router";

const menuItems = [
  { path: "/my-accound/overview", name: "Dashboard", icon: <HiViewGrid size={22} /> },
  { path: "/my-accound/order-history", name: "My Orders", icon: <HiShoppingBag size={22} /> },
  { path: "/my-accound/wishlist", name: "Wishlist", icon: <HiHeart size={22} /> },
  { path: "/my-accound/promocoupon", name: "Promo / Coupon", icon: <HiTicket size={22} /> },
  { path: "/my-accound/payment", name: "Payments", icon: <HiCreditCard size={22} /> },
  { path: "/my-accound/reviews", name: "Reviews", icon: <HiStar size={22} /> },
  { path: "/my-accound/supportuser", name: "Support Ticket", icon: <HiSupport size={22} /> },
  { path: "/my-accound/profile", name: "Manage Profile", icon: <HiUser size={22} /> },
  { path: "/my-accound/managespecialday", name: "Manage Special Day", icon: <HiStar size={22} /> },
  { path: "/my-accound/becomeagent", name: "Become an Agent", icon: <HiUser size={22} /> },
  { path: "/my-accound/address", name: "Address", icon: <HiLocationMarker size={22} /> },
  { path: "/my-accound/password", name: "Change Password", icon: <HiLockClosed size={22} /> },
  { path: "/my-accound/delete-account", name: "Delete My Account", icon: <HiUser size={22} /> },
];


const NavLink = ({ item }) => {
  const resolved = useResolvedPath(item.path);
  const location = useLocation();
  const isActive =
    location.pathname === item.path ||
    (location.pathname.startsWith(resolved.pathname) && resolved.pathname !== "/my-accound");

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 p-3 mb-1 rounded-lg transition-all ${
        isActive
          ? "bg-amber-500 text-white font-semibold shadow-md"
          : "text-slate-700 hover:bg-slate-100 hover:text-amber-600"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.icon}
      <span>{item.name}</span>
    </Link>
  );
};

const MyAccounts = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (location.pathname === "/my-accound" || location.pathname === "/my-accound") {
    return <Navigate to="/my-accound/overview" replace />;
  }

  const user = {
    name: "Mr. Ariful Islam",
    email: "arifulislam@gmail.com",
    avatar: "https://i.pravatar.cc/100",
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden  left-4 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <HiX size={24} /> : <HiViewGrid size={24} />}
      </button>
      <aside
        className={`
          bg-white border-r border-gray-200 rounded-r-2xl p-3 
          h-screen 
          transition-transform duration-300 ease-in-out
          w-64  flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          <div className="flex flex-col items-center mb-2">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-amber-500 p-1.5 rounded-full border-2 border-white text-white">
                <HiUser size={14} />
              </div>
            </div>
            <h3 className="mt-2 font-bold text-lg text-slate-800">{user.name}</h3>
            <p className="text-slate-500 text-sm">{user.email}</p>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>
        </div>

        <button
          onClick={() => console.log("Logging out...")}
          className="flex items-center gap-3 p-3 w-full text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg  transition-colors"
        >
          <HiLogout size={22} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MyAccounts;