import { useEffect, useState, useMemo } from "react";
import ProductCard from "../../Components/ProductCard";
import { 
  FiSearch, 
  FiX, 
  FiFilter, 
  FiSliders, 
  FiChevronDown, 
  FiChevronUp,
  FiStar,
  FiTag,
  FiPackage,
  FiTrendingUp,
  FiGrid,
  FiList,
  FiShoppingBag
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    color: true,
    stock: true
  });

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const prices = data.map(p => p.price);
        setPriceRange({
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesStock = inStockOnly ? p.inStock === true : true;
      const matchesMinPrice = minPrice !== "" ? p.price >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice !== "" ? p.price <= Number(maxPrice) : true;
      const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
      const matchesColor = selectedColor 
        ? p.color && Array.isArray(p.color) && p.color.includes(selectedColor)
        : true;
      const matchesRating = p.rating >= minRating;
      
      let matchesSearch = true;
      if (search) {
        const searchTerm = search.toLowerCase();
        if (searchBy === "name") {
          matchesSearch = p.name.toLowerCase().includes(searchTerm);
        } else if (searchBy === "brand") {
          matchesSearch = p.brand.toLowerCase().includes(searchTerm);
        } else if (searchBy === "category") {
          matchesSearch = p.category.toLowerCase().includes(searchTerm);
        } else {
          matchesSearch = 
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            (p.description && p.description.toLowerCase().includes(searchTerm));
        }
      }

      return matchesCategory && matchesStock && matchesMinPrice && matchesMaxPrice &&
             matchesBrand && matchesColor && matchesRating && matchesSearch;
    });

    switch (sortBy) {
      case "priceLowToHigh": filtered.sort((a, b) => a.price - b.price); break;
      case "priceHighToLow": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "popularity": filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)); break;
      case "discount": filtered.sort((a, b) => ((b.discount - b.price) || 0) - ((a.discount - a.price) || 0)); break;
      default: break;
    }

    return filtered;
  }, [products, selectedCategory, inStockOnly, minPrice, maxPrice, selectedBrand, 
      selectedColor, minRating, search, searchBy, sortBy]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setInStockOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand(null);
    setSelectedColor(null);
    setMinRating(0);
    setSearch("");
    setSearchBy("all");
    setSortBy("default");
  };

  const activeFilterCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (inStockOnly) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (selectedBrand) count++;
    if (selectedColor) count++;
    if (minRating > 0) count++;
    if (search) count++;
    if (sortBy !== "default") count++;
    return count;
  };

  const brands = useMemo(() => [...new Set(products.map(p => p.brand).filter(Boolean))], [products]);
  const colors = useMemo(() => [...new Set(products.flatMap(p => p.color || []))], [products]);
  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);

  const FilterSection = ({ title, icon: Icon, section, children }) => (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-2 font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="text-emerald-500" />
          <span>{title}</span>
        </div>
        {expandedSections[section] ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-600 font-semibold">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-emerald-600 text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2">
              <FiShoppingBag /> Shop Collection
            </span>
            <h1 className="text-3xl lg:text-5xl font-black text-gray-800 mt-2 mb-3">
              Find Your <span className="text-emerald-600">Perfect Product</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Discover our curated collection of high-quality products with amazing discounts
            </p>
          </motion.div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
        >
          <FiFilter className="text-xl" />
          {activeFilterCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount()}
            </span>
          )}
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`lg:w-80 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-4">
              
              {/* Search Section */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-200 p-3 pl-10 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                  <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                      <FiX />
                    </button>
                  )}
                </div>
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="w-full mt-2 border border-gray-200 p-2 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Search in all fields</option>
                  <option value="name">Search by name</option>
                  <option value="brand">Search by brand</option>
                  <option value="category">Search by category</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiTrendingUp /> Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-200 p-2.5 rounded-xl focus:outline-none focus:border-emerald-500 bg-gray-50"
                >
                  <option value="default">Default</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* Category Filter */}
              <FilterSection title="Categories" icon={FiTag} section="category">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      !selectedCategory ? "bg-emerald-50 text-emerald-600 font-semibold" : "hover:bg-gray-50"
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all flex justify-between ${
                        selectedCategory === cat ? "bg-emerald-50 text-emerald-600 font-semibold" : "hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-xs text-gray-400">{products.filter(p => p.category === cat).length}</span>
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Brand Filter */}
              <FilterSection title="Brands" icon={FiPackage} section="brand">
                <select
                  value={selectedBrand || ""}
                  onChange={(e) => setSelectedBrand(e.target.value || null)}
                  className="w-full border border-gray-200 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Price Range" icon={FiSliders} section="price">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={`Min $${priceRange.min}`}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-1/2 border border-gray-200 p-2 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      placeholder={`Max $${priceRange.max}`}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-1/2 border border-gray-200 p-2 rounded-lg text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={maxPrice || priceRange.max}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full"
                  />
                </div>
              </FilterSection>

              {/* Rating Filter */}
              <FilterSection title="Rating" icon={FiStar} section="rating">
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                        minRating === rating ? "bg-emerald-50 text-emerald-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={i < Math.floor(rating) ? "fill-yellow-400" : ""} />
                        ))}
                      </div>
                      <span className="text-sm">& up</span>
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Color Filter */}
              <FilterSection title="Colors" icon={FiTag} section="color">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColor(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      !selectedColor ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        selectedColor === c ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Stock Filter */}
              <FilterSection title="Availability" icon={FiPackage} section="stock">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm">In Stock Only</span>
                </label>
              </FilterSection>

              {/* Clear Filters */}
              {activeFilterCount() > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={clearAllFilters}
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Clear All Filters ({activeFilterCount()})
                </motion.button>
              )}
            </div>
          </motion.aside>

          {/* Products Section */}
          <main className="flex-grow">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {filteredProducts.length} Products Found
                </h2>
                <p className="text-sm text-gray-500">
                  Showing the best matches for you
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-2xl shadow-sm"
                >
                  <div className="text-8xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any products matching your criteria</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};
    
export default ProductList;