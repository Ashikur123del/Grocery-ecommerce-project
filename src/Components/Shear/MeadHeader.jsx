
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { FaUserTie, FaHeart, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuPhoneCall } from "react-icons/lu";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import logo from "../../assets/logo.png";
import { useBoundStore } from "../../store/useBoundStore";
import InputSearch from "./InputSearch"; 

const MidHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useBoundStore();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userMenuItems = [
    { label: "Dashboard", icon: MdDashboard, path: "/my-account" },
    { label: "My Orders", icon: FaBoxOpen, path: "/my-account/order-history" },
    { label: "My Account", icon: MdAccountCircle, path: "/my-account/profile" },
    { label: "Wishlist", icon: FaHeart, path: "/my-account/wishlist" },
  ];

  const handleMenuNavigate = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout?.();
    setShowUserMenu(false);
    navigate("/sign-in");
  };

  return (
    <div className="bg-white border-b border-gray-100 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-fit">
            <img src={logo} alt="Logo" className="w-24" />
          </div>

          <InputSearch />

          <div className="flex items-center gap-8 min-w-fit">
            <div className="flex items-center gap-3">
              <a
                href="tel:01688667870"
                className="w-11 h-11 rounded-full border-2 border-[#05a845] flex items-center justify-center text-[#05a845] hover:bg-[#05a845] hover:text-white transition-colors cursor-pointer"
                aria-label="Call hotline"
              >
                <LuPhoneCall size={20} />
              </a>
              <div className="leading-tight">
                <p className="text-[12px] text-[#05a845] font-bold uppercase">Hotline</p>
                <p className="text-[15px] font-bold text-[#001e2b]">01688667870</p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center gap-2 px-2 py-2 transition-colors"
                aria-expanded={showUserMenu}
                aria-haspopup="true"
              >
                <span className="w-11 h-11 rounded-full border-2 border-[#05a845] flex items-center justify-center text-[#05a845] hover:bg-[#05a845] hover:text-white transition-colors">
                  <FaUserTie size={20} />
                </span>
                <span>
                  <p className="font-bold text-sm text-[#05a845] text-left">Welcome</p>
                  <span className="text-md font-semibold">{user?.name ?? "Guest"}</span>
                </span>
                <IoMdArrowDropdown className="text-gray-600" />
              </button>

              {showUserMenu && (
                <div className="absolute top-full -right-20 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {userMenuItems.map(({ label, icon: Icon, path }) => (
                      <button
                        key={label}
                        onClick={() => handleMenuNavigate(path)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3"
                      >
                        <Icon size={16} />
                        <span>{label}</span>
                      </button>
                    ))}
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <FaSignOutAlt size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidHeader;