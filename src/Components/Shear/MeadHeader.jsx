import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { FaUserTie, FaShoppingCart, FaHeart, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import logo from "../../assets/logo.png";
// import fallbackImg from "../../assets/placeholder.png"; 
import { useBoundStore } from "../../store/useBoundStore";

// ---- simple debounce hook (kept local so the file stays self-contained) ----
function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const MidHeader = () => {
  const navigate = useNavigate();

  const { products, fetchProducts, user, logout } = useBoundStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Memoized filtering — only recomputes when debounced term or products change
  const searchResults = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term))
      )
      .slice(0, 6);
  }, [debouncedSearchTerm, products]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowResults(debouncedSearchTerm.trim() !== "");
  }, [debouncedSearchTerm, searchResults]);

  // Close both dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        setShowResults(false);
      }
    },
    [searchTerm, navigate]
  );

  const handleProductClick = useCallback(
    (productId) => {
      navigate(`/best-products/${productId}`);
      setShowResults(false);
      setSearchTerm("");
    },
    [navigate]
  );

  // const handleImageError = (e) => {
  //   e.currentTarget.src = fallbackImg;
  // };

  const userMenuItems = [
    { label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { label: "My Orders", icon: FaBoxOpen, path: "/orders" },
    { label: "My Account", icon: MdAccountCircle, path: "/account" },
    { label: "Wishlist", icon: FaHeart, path: "/wishlist" },
    { label: "Shopping Cart", icon: FaShoppingCart, path: "/cart" },
  ];

  const handleMenuNavigate = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout?.();
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-gray-100 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-fit">
            <img src={logo} alt="Logo" className="w-24" />
          </div>

          <div className="flex-grow max-w-2xl relative px-4" ref={searchRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#f3f4f6] rounded-lg border border-gray-200 p-1 h-12 hover:border-[#05a845] transition-colors"
            >
              <input
                type="text"
                placeholder="Search your products..."
                className="flex-grow bg-transparent px-4 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim() !== "") setShowResults(true);
                }}
              />
              <button
                type="submit"
                className="bg-[#05a845] text-white h-10 w-12 rounded-md hover:bg-[#048a39] transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <IoSearchOutline size={20} />
              </button>
            </form>

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      
                      loading="lazy"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showResults && debouncedSearchTerm.trim() !== "" && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-50">
                No products found.
              </div>
            )}
          </div>

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