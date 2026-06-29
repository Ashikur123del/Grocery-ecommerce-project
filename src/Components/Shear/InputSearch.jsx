// components/InputSearch.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useBoundStore } from "../../store/useBoundStore";

function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const InputSearch = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useBoundStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const fetchInitialized = useRef(false);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);

  // Single useEffect for initialization and outside click handler
  useEffect(() => {
    // Initialize products fetch
    if (!fetchInitialized.current && products.length === 0) {
      fetchInitialized.current = true;
      setIsLoading(true);
      fetchProducts().finally(() => setIsLoading(false));
    }

    // Handle click outside to close results
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fetchProducts]);

  // Memoized search results
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
  }, [debouncedSearchTerm]);

  // Handle search submission
  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
      setSearchTerm("");
    }
  }, [searchTerm, navigate]);

  // Handle product click
  const handleProductClick = useCallback(
    (productId) => {
      navigate(`/best-products/${productId}`);
      setShowResults(false);
      setSearchTerm("");
    },
    [navigate]
  );

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  return (
    <div className="flex-grow max-w-2xl relative px-4" ref={searchRef}>
      {/* Search Input Container */}
      <div className="flex items-center bg-[#f3f4f6] rounded-lg border border-gray-200 p-1 h-12 hover:border-[#05a845] transition-colors">
        <input
          type="text"
          placeholder="Search your products..."
          className="flex-grow bg-transparent px-4 outline-none text-sm text-gray-700 placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchTerm.trim() !== "") setShowResults(true);
          }}
          aria-label="Search products"
          aria-expanded={showResults}
          aria-controls="search-results"
        />
        <button
          type="button"
          onClick={handleSearchSubmit}
          className="bg-[#05a845] text-white h-10 w-12 rounded-md hover:bg-[#048a39] active:bg-[#037a2f] transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Search"
        >
          <IoSearchOutline size={20} />
        </button>
      </div>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50"
          role="listbox"
        >
          {searchResults.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors text-left"
              role="option"
              aria-selected="false"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-10 h-10 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">${product.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results State */}
      {showResults &&
        debouncedSearchTerm.trim() !== "" &&
        searchResults.length === 0 &&
        !isLoading && (
          <div
            id="search-results"
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-50"
            role="status"
          >
            No products found.
          </div>
        )}

      {/* Loading State */}
      {showResults && isLoading && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-50"
          role="status"
        >
          Loading products...
        </div>
      )}
    </div>
  );
};

export default InputSearch;