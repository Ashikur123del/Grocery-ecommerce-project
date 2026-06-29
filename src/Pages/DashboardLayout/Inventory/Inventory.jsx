import { useState, useMemo } from "react";
import { MdAdd, MdRemove, MdSearch, MdWarning, MdCheckCircle } from "react-icons/md";
import { toast } from "react-toastify";

const Inventory = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      sku: "SKU001",
      name: "Organic Rice",
      category: "Grains",
      stockQuantity: 150,
      unit: "kg",
      reorderLevel: 50,
      price: 400,
    },
    {
      id: 2,
      sku: "SKU002",
      name: "Whole Wheat Flour",
      category: "Flour",
      stockQuantity: 200,
      unit: "kg",
      reorderLevel: 50,
      price: 220,
    },
    {
      id: 3,
      sku: "SKU003",
      name: "Basmati Rice Premium",
      category: "Grains",
      stockQuantity: 5,
      unit: "kg",
      reorderLevel: 30,
      price: 600,
    },
    {
      id: 4,
      sku: "SKU004",
      name: "Lentils (Masoor Dal)",
      category: "Pulses",
      stockQuantity: 0,
      unit: "kg",
      reorderLevel: 40,
      price: 280,
    },
    {
      id: 5,
      sku: "SKU005",
      name: "Sunflower Oil",
      category: "Oils",
      stockQuantity: 80,
      unit: "liter",
      reorderLevel: 30,
      price: 550,
    },
    {
      id: 6,
      sku: "SKU006",
      name: "Sugar",
      category: "Sweeteners",
      stockQuantity: 300,
      unit: "kg",
      reorderLevel: 100,
      price: 160,
    },
    {
      id: 7,
      sku: "SKU007",
      name: "Jaggery",
      category: "Sweeteners",
      stockQuantity: 15,
      unit: "kg",
      reorderLevel: 20,
      price: 380,
    },
    {
      id: 8,
      sku: "SKU008",
      name: "Turmeric Powder",
      category: "Spices",
      stockQuantity: 120,
      unit: "kg",
      reorderLevel: 30,
      price: 250,
    },
    {
      id: 9,
      sku: "SKU009",
      name: "Black Pepper",
      category: "Spices",
      stockQuantity: 60,
      unit: "kg",
      reorderLevel: 25,
      price: 490,
    },
    {
      id: 10,
      sku: "SKU010",
      name: "Milk Powder",
      category: "Dairy",
      stockQuantity: 90,
      unit: "kg",
      reorderLevel: 40,
      price: 580,
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState("");

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchValue.toLowerCase());

      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "outOfStock" && product.stockQuantity === 0) ||
        (filterStatus === "lowStock" &&
          product.stockQuantity > 0 &&
          product.stockQuantity <= product.reorderLevel) ||
        (filterStatus === "inStock" &&
          product.stockQuantity > product.reorderLevel);

      return matchSearch && matchStatus;
    });
  }, [products, searchValue, filterStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    const outOfStock = products.filter((p) => p.stockQuantity === 0).length;
    const lowStock = products.filter(
      (p) => p.stockQuantity > 0 && p.stockQuantity <= p.reorderLevel
    ).length;
    const healthy = products.filter(
      (p) => p.stockQuantity > p.reorderLevel
    ).length;
    const totalValue = products.reduce(
      (sum, p) => sum + p.stockQuantity * p.price,
      0
    );

    return { outOfStock, lowStock, healthy, totalValue };
  }, [products]);

  const handleRestockClick = (product) => {
    setSelectedProduct(product);
    setRestockQuantity("");
    setShowRestockModal(true);
  };

  const handleRestock = () => {
    if (!restockQuantity || restockQuantity <= 0) {
      toast.error("Please enter a valid quantity!");
      return;
    }
 
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              stockQuantity: p.stockQuantity + parseInt(restockQuantity),
            }
          : p
      )
    );

    toast.success(
      `Added ${restockQuantity} ${selectedProduct.unit} of ${selectedProduct.name}`
    );
    setShowRestockModal(false);
    setSelectedProduct(null);
    setRestockQuantity("");
  };

  const handleReduce = (product, amount = 1) => {
    if (product.stockQuantity >= amount) {
      setProducts(
        products.map((p) =>
          p.id === product.id
            ? { ...p, stockQuantity: Math.max(0, p.stockQuantity - amount) }
            : p
        )
      );
      toast.error(`Reduced ${amount} ${product.unit} of ${product.name}`);
    } else {
      alert.warning("Not enough stock to reduce!");
    }
  };

  const getStatusBadge = (product) => {
    if (product.stockQuantity === 0) {
      return (
        <span className="bg-red-900 text-red-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <MdWarning size={14} /> Out of Stock
        </span>
      );
    } else if (product.stockQuantity <= product.reorderLevel) {
      return (
        <span className="bg-yellow-900 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <MdWarning size={14} /> Low Stock
        </span>
      );
    } else {
      return (
        <span className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <MdCheckCircle size={14} /> In Stock
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Inventory Management</h1>
          <p className="text-slate-400">Monitor and manage product stock levels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total SKUs</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{products.length}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-red-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Out of Stock</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{stats.outOfStock}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-yellow-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Low Stock</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.lowStock}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-green-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Healthy Stock</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.healthy}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-amber-700/30 md:col-span-4">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Inventory Value</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">৳{stats.totalValue.toLocaleString()}</p>
          </div>
        </div>

      
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-4 top-3 text-slate-500 text-lg" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by product name or SKU..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg pl-12 pr-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Stock Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Products</option>
                <option value="inStock">In Stock (Healthy)</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Product Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Current Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Reorder Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={`border-b border-slate-700 hover:bg-slate-700 transition-colors ${
                        product.stockQuantity === 0 ? "bg-red-950/20" : ""
                      } ${
                        product.stockQuantity > 0 &&
                        product.stockQuantity <= product.reorderLevel
                          ? "bg-yellow-950/20"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-amber-400 font-mono text-sm">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 font-semibold">{product.name}</td>
                      <td className="px-6 py-4 text-slate-300">{product.category}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-bold text-lg ${
                            product.stockQuantity === 0
                              ? "text-red-400"
                              : product.stockQuantity <= product.reorderLevel
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {product.stockQuantity} {product.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {product.reorderLevel} {product.unit}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(product)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleRestockClick(product)}
                            className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors"
                            title="Restock"
                          >
                            <MdAdd size={18} />
                          </button>
                          <button
                            onClick={() => handleReduce(product, 1)}
                            className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                            title="Reduce by 1"
                          >
                            <MdRemove size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showRestockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-amber-500 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              Restock: {selectedProduct.name}
            </h2>

            <div className="bg-slate-700 rounded-lg p-4 mb-6">
              <p className="text-slate-300 text-sm">Current Stock:</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">
                {selectedProduct.stockQuantity} {selectedProduct.unit}
              </p>
            </div>

            <div className="mb-6">
              <label className="text-white text-sm font-semibold mb-2 block">
                Quantity to Add
              </label>
              <input
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRestock}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Add Stock
              </button>
              <button
                onClick={() => {
                  setShowRestockModal(false);
                  setSelectedProduct(null);
                  setRestockQuantity("");
                }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;