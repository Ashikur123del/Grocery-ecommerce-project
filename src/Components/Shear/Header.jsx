import { useState, useEffect } from "react";
import {
  FaRegHeart,
  FaChevronRight,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import logo from "../../assets/logo.webp";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { MdAccountCircle, MdDashboard } from "react-icons/md";

import { useDisclosure } from "@heroui/use-disclosure";
import { Drawers } from "../Modle/Drawers";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "Electronics & Gadgets",
    "Fashion & Clothing",
    "Health & Beauty",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Baby & Toys",
  ];

  const navLinks = [
    {
      label: "Home",
      href: "#",
      hasDropdown: true,
      subItems: ["Classic Home", "Fashion Home", "Electronic Home"],
    },
    {
      label: "Shop",
      href: "#",
      hasDropdown: true,
      subItems: ["Shop Grid", "Shop List", "Product Details"],
    },
    {
      label: "Stores",
      href: "#",
      hasDropdown: true,
      subItems: ["Store Directory", "Store Vendor"],
    },
    {
      label: "Pages",
      href: "#",
      hasDropdown: true,
      subItems: ["About Us", "FAQ", "Terms"],
    },
    { label: "Flash Deals", href: "#" },
    {
      label: "Blog",
      href: "#",
      hasDropdown: true,
      subItems: ["Blog Standard", "Blog Single"],
    },
    { label: "Contact", href: "#" },
  ];

  const handleUserAction = (actionId) => {
    console.log(`Selected action: ${actionId}`);
  };

  return (
    <>
      <header
        className={`w-full bg-white transition-all duration-300 z-10 ${isSticky ? "fixed top-0 left-0 shadow-lg py-2" : "relative border-b border-gray-100"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            <div className="block md:hidden items-center gap-2 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-700 hover:text-[#05a845] transition-colors p-1"
              >
                <HiMenuAlt3 size={28} />
              </button>
            </div>
            {isSticky ? (
              <div className="">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-9 h-9 sm:w-16 sm:h-16 object-contain cursor-pointer"
                />
              </div>
            ) : (
              ""
            )}

            {!isSticky && (
              <div className="hidden lg:block relative group flex-shrink-0">
                <button className="bg-[#05a845] text-white px-5 py-3 rounded-t-md flex items-center gap-3 min-w-[200px] xl:min-w-[230px]">
                  <HiMenuAlt3 size={20} />
                  <span className="font-semibold uppercase text-sm">
                    Categories
                  </span>
                  <IoMdArrowDropdown size={18} className="ml-auto" />
                </button>
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
                  <ul className="py-1">
                    {categories.map((cat, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-[#05a845] hover:text-white"
                        >
                          {cat}{" "}
                          <FaChevronRight size={10} className="text-gray-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <NavLinks
              navLinks={navLinks}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />

            <div className="flex items-center gap-2 sm:gap-4 xl:gap-5">
              <div className="flex relative cursor-pointer group">
                <BiTransfer
                  size={24}
                  className="text-gray-700 group-hover:text-[#05a845]"
                />
                <span className="absolute -top-2 -right-2 bg-[#05a845] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </div>

              <div className="relative cursor-pointer group">
                <FaRegHeart
                  size={22}
                  className="text-gray-700 group-hover:text-[#05a845]"
                />
                <span className="absolute -top-2 -right-2 bg-[#05a845] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  8
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Drawers isOpen={isOpen} onOpenChange={onOpenChange} />
              </div>

              {isSticky ? (
                <div className="flex items-center gap-2 border-l pl-2 sm:pl-4 border-gray-200 relative group cursor-pointer">
                  <div className="w-9 h-9 rounded-full border border-[#05a845] flex items-center justify-center text-[#05a845] group-hover:bg-[#05a845] group-hover:text-white transition-all duration-300">
                    <FiUser size={20} />
                  </div>

                  <div className="hidden xl:block leading-tight select-none">
                    <p className="font-bold text-[10px] text-[#05a845] uppercase">
                      Welcome
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#001e2b]">
                        Ashikur
                      </span>
                      <IoMdArrowDropdown className="text-gray-600 transition-transform group-hover:rotate-180" />
                    </div>
                  </div>

                  <div className="absolute top-full right-0 mt-3 w-52 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] origin-top-right translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <button
                        onClick={() => handleUserAction("dashboard")}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <MdDashboard size={18} className="text-[#05a845]" />{" "}
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleUserAction("orders")}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <FaBoxOpen size={16} className="text-[#05a845]" /> My
                        Orders
                      </button>
                      <button
                        onClick={() => handleUserAction("account")}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <MdAccountCircle size={18} className="text-[#05a845]" />{" "}
                        Account
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => handleUserAction("logout")}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <FaSignOutAlt size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navLinks={navLinks}
        openSubMenu={openSubMenu}
        setOpenSubMenu={setOpenSubMenu}
      />
      {isSticky && <div className="h-16 sm:h-20"></div>}
    </>
  );
};

export default Header;
