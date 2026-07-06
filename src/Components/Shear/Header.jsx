import { useState, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaChevronRight,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { useDisclosure } from "@heroui/use-disclosure";
import logo from "../../assets/logo.png";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { Drawers } from "../Modle/Drawers";
import { Link, useNavigate } from "react-router";
import { useWishlistStore } from "../../store/useWishlistStore";
import { LuArrowUpDown } from "react-icons/lu";
import { useCompareStore } from "../../store/compare";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Added state
  const { isOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const { wishlistItems } = useWishlistStore();
  const compareItems = useCompareStore((state) => state.compare);

  const logout = () => console.log("Logged out");

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const categories = [
    { name: "Fruits", link: "/products-category" },
    { name: "Dairy", link: "/product-list" },
    { name: "Bakery", link: "/products-category" },
    { name: "Cooking", link: "/product-list" },
    { name: "Seafood", link: "/products-category" },
    { name: "Beverages", link: "/product-list" },
    { name: "Meat", link: "/products-category" },
    { name: "Vegetables", link: "/product-list" }
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Shop", href: "/shop", hasDropdown: true,
      subItems: [
        { label: "Product List", href: "/product-list" },
        { label: "Cart", href: "/cart" },
        { label: "Checkout", href: "/checkout" },
      ],
    },
    // {
    //   label: "Store", href: "/store", hasDropdown: true,
    //   subItems: [
    //     { label: "Store List", href: "/storelist" },
    //     { label: "Store Details", href: "/storedetails" },
    //     { label: "Become a Vendor", href: "/becomevendor" },
    //   ],
    // },
    {
      label: "Pages", href: "/pages", hasDropdown: true,
      subItems: [
        { label: "About Us", href: "/about" },
        { label: "Product Category", href: "/products-category" },
        { label: "Product Brand", href: "/product-brand" },
        { label: "Cart View", href: "/cart" },
        { label: "Checkout", href: "/checkout" },
        { label: "Compare", href: "/compare" },
        // { label: "Wishlist", href: "/wishlist" },
        // { label: "My Account", href: "/my-accound" },
        { label: "Order Tracking", href: "/order-tracking" },
        { label: "Sign In", href: "/sign-in" },
        { label: "Sign Up", href: "/sign-up" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Return Policy", href: "/return-policy" },
        { label: "Payment successfully", href: "/ordersucces" },
        { label: "Payment Failed", href: "/payment-failed" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    { label: "Flash Deals", href: "/flash-deals" },
    {
      label: "Blog", href: "/blog", hasDropdown: true,
      subItems: [{ label: "Blog Classic", href: "/blog-classic" }],
    },
    { label: "Contact", href: "/contact" },
  ];
  
  const userMenuItems = [
    { label: "Dashboard", icon: MdDashboard, path: "/my-accound" },
    { label: "My Orders", icon: FaBoxOpen, path: "/my-accound/order-history" },
    { label: "My Account", icon: MdAccountCircle, path: "/my-accound/profile" },
    { label: "Wishlist", icon: FaHeart, path: "/my-accound/wishlist" },
  ];

  const handleMenuNavigate = (path) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout?.();
    setIsUserMenuOpen(false);
    navigate("/sign-in");
  };

  return (
    <>
      <header className={`w-full bg-white z-30 transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-lg py-2" : "relative border-b border-gray-100"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-700">
              <HiMenuAlt3 size={28} />
            </button>

            {isSticky && (
              <Link to="/"><img src={logo} alt="logo" className="w-10 sm:w-14 object-contain" /></Link>
            )}

            {!isSticky && (
              <div className="hidden lg:block relative group">
    
      <button className="bg-[#05a845] text-white px-5 py-3 rounded-t-md flex items-center gap-3 min-w-[230px]">
        <HiMenuAlt3 size={20} />
        <span className="font-semibold uppercase text-sm">Categories</span>
        <IoMdArrowDropdown size={18} className="ml-auto" />
      </button>
      <div className="absolute top-full left-0 w-full bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t-2 border-[#05a845]">
        <ul className="py-1">
          {categories.map((cat, i) => (
            <li key={i}>
              <Link 
                to={cat.link} 
                className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-[#05a845] hover:text-white transition-colors duration-200"
              >
                {cat.name} 
                <FaChevronRight size={10} className="text-gray-400 group-hover:text-white" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
            )}

            <NavLinks navLinks={navLinks} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />

            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer" onClick={() => navigate("/compare")}>
                <LuArrowUpDown size={22} />
                {compareItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00A859] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {compareItems.length}
                  </span>
                )}
              </div>

              <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
                <FaRegHeart size={22} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#05a845] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>

              <Drawers isOpen={isOpen} onOpenChange={onOpenChange} />

              {isSticky && (
                <div 
                  className="relative flex items-center gap-2 border-l pl-4 cursor-pointer"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-9 h-9 rounded-full border border-[#05a845] flex items-center justify-center text-[#05a845]">
                    <FiUser size={20} />
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-[10px] text-[#05a845] font-bold uppercase">Welcome</p>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">Ashikur</span>
                      <IoMdArrowDropdown />
                    </div>
                  </div>

                  {isUserMenuOpen && (
                    <div className="absolute top-full -right-20 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        {userMenuItems.map(({ label, icon: Icon, path }) => (
                          <button key={label} onClick={() => handleMenuNavigate(path)} className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3">
                            <Icon size={16} /> <span>{label}</span>
                          </button>
                        ))}
                        <div className="border-t border-gray-200 my-1"></div>
                        <button onClick={handleLogout} className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
                          <FaSignOutAlt size={16} /> <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} navLinks={navLinks} openSubMenu={openSubMenu} setOpenSubMenu={setOpenSubMenu} />
      {isSticky && <div className="h-20"></div>}
    </>
  );
};

export default Header;