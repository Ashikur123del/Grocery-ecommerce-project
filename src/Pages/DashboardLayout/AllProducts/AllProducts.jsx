import { useState, useMemo } from "react";
import { MdEdit, MdDelete, MdSearch, MdAdd, MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    stock: "",
  });
  const itemsPerPage = 8;

  // Mock Products Data
  const [products, setProducts] = useState([
    {
      id: 1,
      sku: "SKU001",
      name: "Organic Rice",
      category: "Grains",
      brand: "PureGrow",
      price: 450,
      discountPrice: 400,
      stockQuantity: 150,
      unit: "kg",
      inStock: true,
      rating: 4.5,
      origin: "Bangladesh",
    },
    {
      id: 2,
      sku: "SKU002",
      name: "Whole Wheat Flour",
      category: "Flour",
      brand: "Golden",
      price: 250,
      discountPrice: 220,
      stockQuantity: 200,
      unit: "kg",
      inStock: true,
      rating: 4.2,
      origin: "Bangladesh",
    },
    {
      id: 3,
      sku: "SKU003",
      name: "Basmati Rice Premium",
      category: "Grains",
      brand: "Royal",
      price: 650,
      discountPrice: 600,
      stockQuantity: 5,
      unit: "kg",
      inStock: true,
      rating: 4.8,
      origin: "India",
    },
    {
      id: 4,
      sku: "SKU004",
      name: "Lentils (Masoor Dal)",
      category: "Pulses",
      brand: "PureGrow",
      price: 320,
      discountPrice: 280,
      stockQuantity: 0,
      unit: "kg",
      inStock: false,
      rating: 4.3,
      origin: "Bangladesh",
    },
    {
      id: 5,
      sku: "SKU005",
      name: "Sunflower Oil",
      category: "Oils",
      brand: "SunLight",
      price: 580,
      discountPrice: 550,
      stockQuantity: 80,
      unit: "liter",
      inStock: true,
      rating: 4.6,
      origin: "Bangladesh",
    },
    {
      id: 6,
      sku: "SKU006",
      name: "Sugar",
      category: "Sweeteners",
      brand: "Sweet",
      price: 180,
      discountPrice: 160,
      stockQuantity: 300,
      unit: "kg",
      inStock: true,
      rating: 4.1,
      origin: "Bangladesh",
    },
    {
      id: 7,
      sku: "SKU007",
      name: "Jaggery",
      category: "Sweeteners",
      brand: "Natural",
      price: 420,
      discountPrice: 380,
      stockQuantity: 45,
      unit: "kg",
      inStock: true,
      rating: 4.4,
      origin: "India",
    },
    {
      id: 8,
      sku: "SKU008",
      name: "Turmeric Powder",
      category: "Spices",
      brand: "SpiceKing",
      price: 280,
      discountPrice: 250,
      stockQuantity: 120,
      unit: "kg",
      inStock: true,
      rating: 4.7,
      origin: "India",
    },
    {
      id: 9,
      sku: "SKU009",
      name: "Black Pepper",
      category: "Spices",
      brand: "SpiceKing",
      price: 520,
      discountPrice: 490,
      stockQuantity: 60,
      unit: "kg",
      inStock: true,
      rating: 4.5,
      origin: "India",
    },
    {
      id: 10,
      sku: "SKU010",
      name: "Milk Powder",
      category: "Dairy",
      brand: "DairyBest",
      price: 620,
      discountPrice: 580,
      stockQuantity: 90,
      unit: "kg",
      inStock: true,
      rating: 4.3,
      origin: "Bangladesh",
    },
  ]);

  const searchValue = filters.search;
  const categoryValue = filters.category;
  const stockValue = filters.stock;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchValue.toLowerCase());

      const matchCategory = !categoryValue || product.category === categoryValue;

      const matchStock =
        !stockValue ||
        (stockValue === "inStock" && product.inStock) ||
        (stockValue === "outOfStock" && !product.inStock) ||
        (stockValue === "lowStock" && product.stockQuantity < 20 && product.stockQuantity > 0);

      return matchSearch && matchCategory && matchStock;
    });
  }, [products, searchValue, categoryValue, stockValue]);

  // Pagination
  const pages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({ ...product });
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSaveProduct = () => {
    if (selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? editFormData : p
        )
      );
    }
    setEditMode(false);
    setSelectedProduct(null);
    toast("Product updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedProduct(null);
    setEditFormData({});
  };

  const categories = [...new Set(products.map((p) => p.category))];

  // Generate pagination range with ellipsis
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithEllipsis = [];
    let l;

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithEllipsis.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithEllipsis.push("...");
        }
      }
      rangeWithEllipsis.push(i);
      l = i;
    });

    return rangeWithEllipsis;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-3 sm:p-4 md:p-6">
      <div className="p-2">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">All Products</h1>
            <p className="text-slate-400 text-sm sm:text-base">Manage your grocery inventory</p>
          </div>
          <Link to="/dashboard/add-product" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base">
              <MdAdd size={20} /> Add New Product
            </button>
          </Link>
        </div>

        {/* Edit Form */}
        {editMode && selectedProduct && (
          <div className="bg-slate-800 rounded-xl p-4 sm:p-6 mb-6 border border-amber-500">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Product</h2>
              <button
                onClick={handleCancelEdit}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">SKU (Read-only)</label>
                <input
                  disabled
                  value={editFormData.sku || ""}
                  className="w-full bg-slate-700 text-slate-500 border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Product Name</label>
                <input
                  value={editFormData.name || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Brand</label>
                <input
                  value={editFormData.brand || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, brand: e.target.value })
                  }
                  placeholder="Enter brand"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Category</label>
                <input
                  value={editFormData.category || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, category: e.target.value })
                  }
                  placeholder="Enter category"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Price</label>
                <input
                  type="number"
                  value={editFormData.price || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, price: Number(e.target.value) })
                  }
                  placeholder="Enter price"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Discount Price</label>
                <input
                  type="number"
                  value={editFormData.discountPrice || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      discountPrice: Number(e.target.value),
                    })
                  }
                  placeholder="Enter discount price"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Stock Quantity</label>
                <input
                  type="number"
                  value={editFormData.stockQuantity || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      stockQuantity: Number(e.target.value),
                    })
                  }
                  placeholder="Enter stock quantity"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Unit</label>
                <input
                  value={editFormData.unit || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, unit: e.target.value })
                  }
                  placeholder="e.g., kg, liter, piece"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  value={editFormData.rating || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      rating: Number(e.target.value),
                    })
                  }
                  placeholder="Enter rating (0-5)"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleSaveProduct}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-slate-800 rounded-xl p-4 sm:p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Search */}
            <div>
              <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base sm:text-lg" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => {
                    setFilters({ ...filters, search: e.target.value });
                    setPage(1);
                  }}
                  placeholder="Search by name, SKU or brand..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Category</label>
              <select
                value={filters.category}
                onChange={(e) => {
                  setFilters({ ...filters, category: e.target.value });
                  setPage(1);
                }}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:border-amber-500 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Stock Status</label>
              <select
                value={filters.stock}
                onChange={(e) => {
                  setFilters({ ...filters, stock: e.target.value });
                  setPage(1);
                }}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:border-amber-500 text-sm"
              >
                <option value="">All Stock</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm sm:text-base">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">SKU</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">Product</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap hidden sm:table-cell">Category</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap hidden md:table-cell">Brand</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">Price</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap hidden sm:table-cell">Stock</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap hidden lg:table-cell">Rating</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap hidden sm:table-cell">Status</th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-center text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-amber-400 font-mono text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{product.sku}</td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">{product.name}</td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 hidden sm:table-cell">
                        <span className="bg-slate-700 text-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden md:table-cell whitespace-nowrap">{product.brand}</td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex flex-col sm:flex-row sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm">
                          <span className="line-through text-slate-500 text-[9px] sm:text-xs">৳{product.price}</span>
                          <span className="font-bold text-amber-400 text-[10px] sm:text-xs md:text-sm">৳{product.discountPrice}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 hidden sm:table-cell">
                        <span
                          className={
                            product.stockQuantity === 0
                              ? "text-red-400 font-bold text-[10px] sm:text-xs md:text-sm"
                              : product.stockQuantity < 20
                              ? "text-yellow-400 font-bold text-[10px] sm:text-xs md:text-sm"
                              : "text-green-400 font-bold text-[10px] sm:text-xs md:text-sm"
                          }
                        >
                          {product.stockQuantity} {product.unit}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-yellow-400 font-semibold text-[10px] sm:text-xs md:text-sm hidden lg:table-cell whitespace-nowrap">
                        ⭐ {product.rating}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 hidden sm:table-cell">
                        <span
                          className={
                            product.inStock
                              ? "bg-green-900 text-green-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold whitespace-nowrap"
                              : "bg-red-900 text-red-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold whitespace-nowrap"
                          }
                        >
                          {product.inStock ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex gap-1 sm:gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <MdEdit className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <MdDelete className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-2 sm:px-4 md:px-6 py-6 sm:py-8 text-center text-slate-400 text-sm sm:text-base">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
            >
              <MdChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {getPaginationRange().map((item, index) =>
                item === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-2 sm:px-3 py-1 text-slate-400 text-sm sm:text-base">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item)}
                    className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                      page === item
                        ? "bg-amber-500 text-white font-semibold"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setPage(Math.min(pages, page + 1))}
              disabled={page === pages}
              className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
            >
              <MdChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;