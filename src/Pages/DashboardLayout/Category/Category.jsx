import { useState, useMemo } from "react";
import { MdEdit, MdDelete, MdAdd, MdClose, MdSearch } from "react-icons/md";

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Grains", description: "Rice, Wheat, and other grains", productCount: 3 },
    { id: 2, name: "Flour", description: "Various types of flour", productCount: 1 },
    { id: 3, name: "Pulses", description: "Lentils, beans, and pulses", productCount: 1 },
    { id: 4, name: "Oils", description: "Cooking oils and ghee", productCount: 1 },
    { id: 5, name: "Sweeteners", description: "Sugar, jaggery, honey", productCount: 2 },
    { id: 6, name: "Spices", description: "All types of spices", productCount: 2 },
    { id: 7, name: "Dairy", description: "Milk, yogurt, cheese", productCount: 1 },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Filter categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [categories, searchValue]);

  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      alert("Category name is required!");
      return;
    }

    if (editingId) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, ...formData } : cat
        )
      );
      alert("Category updated successfully!");
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        ...formData,
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
      alert("Category added successfully!");
    }

    resetForm();
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setEditingId(category.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
      alert("Category deleted successfully!");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
            <p className="text-slate-400">Manage product categories</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <MdAdd size={20} /> Add Category
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-amber-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Grains, Spices, Dairy"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of this category"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddCategory}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                {editingId ? "Update Category" : "Add Category"}
              </button>
              <button
                onClick={resetForm}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <MdSearch className="absolute left-4 top-3 text-slate-500 text-lg" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search categories..."
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg pl-12 pr-4 py-3 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{category.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg px-3 py-1">
                    <span className="text-amber-400 text-sm font-semibold">
                      {category.productCount} products
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MdEdit size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MdDelete size={18} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400 text-lg">No categories found</p>
            <button
              onClick={() => {
                setSearchValue("");
                resetForm();
                setShowForm(true);
              }}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Create First Category
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Categories</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">{categories.length}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Products</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Avg Products/Category</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;