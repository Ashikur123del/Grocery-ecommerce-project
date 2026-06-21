import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { FaUserTie, FaShoppingCart, FaHeart, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import logo from "../../assets/logo.png";
import { useBoundStore } from "../../store/useBoundStore"; 

const MidHeader = () => {
  const navigate = useNavigate();
  
  const { products, fetchProducts } = useBoundStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

 
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);


  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(filtered.slice(0, 6)); 
    setShowResults(true);
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/best-products/${productId}`);
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div className="bg-white border-b border-gray-100 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-fit">
            <img src={logo} alt="Logo" className="w-24" />
          </div>
          <div className="flex-grow max-w-2xl relative px-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#f3f4f6] rounded-lg border border-gray-200 p-1 h-12 hover:border-[#05a845] transition-colors">
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
            {showResults && searchTerm.trim() !== "" && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-50">
                No products found.
              </div>
            )}
          </div>

          <div className="flex items-center gap-8 min-w-fit">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border-2 border-[#05a845] flex items-center justify-center text-[#05a845] hover:bg-[#05a845] hover:text-white transition-colors cursor-pointer">
                <LuPhoneCall size={20} />
              </div>
              <div className="leading-tight">
                <p className="text-[12px] text-[#05a845] font-bold uppercase">Hotline</p>
                <p className="text-[15px] font-bold text-[#001e2b]">01688667870</p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative group">
              <div className="w-11 h-11 rounded-full border-2 border-[#05a845] flex items-center justify-center text-[#05a845] group-hover:bg-[#05a845] group-hover:text-white transition-colors cursor-pointer">
                <FaUserTie size={20} />
              </div>
              <div className="flex items-center gap-2 px-2 py-2 transition-colors">
                <div className="">
                  <p className="font-bold text-sm text-[#05a845]">Welcome</p>
                  <span className="text-md font-semibold">Ashikur</span>
                </div>
                <IoMdArrowDropdown className="text-gray-600" />
              </div>
              <div className="absolute top-full -right-20 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3">
                    <MdDashboard size={16} />
                    <span>Dashboard</span>
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3">
                    <FaBoxOpen size={16} />
                    <span>My Orders</span>
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3">
                    <MdAccountCircle size={16} />
                    <span>My Account</span>
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3">
                    <FaHeart size={16} />
                    <span>Wishlist</span>
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-white hover:bg-[#05a845] transition-colors flex items-center gap-3">
                    <FaShoppingCart size={16} />
                    <span>Shopping Cart</span>
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
                    <FaSignOutAlt size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidHeader;