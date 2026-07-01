import { useState, useMemo } from "react";
import { MdAdd, MdEdit, MdDelete, MdSearch, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SUMMER2024",
      discountType: "percentage",
      discountValue: 15,
      minOrderAmount: 1000,
      maxDiscount: 500,
      usageLimit: 100,
      usageCount: 45,
      validFrom: "2024-06-01",
      validTo: "2024-08-31",
      status: "active",
      description: "Summer sale 15% off",
    },
    {
      id: 2,
      code: "FLAT200",
      discountType: "flat",
      discountValue: 200,
      minOrderAmount: 500,
      maxDiscount: 200,
      usageLimit: 200,
      usageCount: 120,
      validFrom: "2024-06-01",
      validTo: "2024-12-31",
      status: "active",
      description: "Flat ৳200 off on orders above ৳500",
    },
    {
      id: 3,
      code: "FIRST10",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 0,
      maxDiscount: 300,
      usageLimit: 50,
      usageCount: 50,
      validFrom: "2024-01-01",
      validTo: "2024-06-30",
      status: "expired",
      description: "First order 10% off",
    },
    {
      id: 4,
      code: "WELCOME250",
      discountType: "flat",
      discountValue: 250,
      minOrderAmount: 1500,
      maxDiscount: 250,
      usageLimit: 30,
      usageCount: 5,
      validFrom: "2024-06-15",
      validTo: "2024-07-31",
      status: "active",
      description: "Welcome new members - ৳250 off",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    usageLimit: "",
    validFrom: "",
    validTo: "",
    description: "",
  });

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchSearch = coupon.code.toLowerCase().includes(searchValue.toLowerCase());
      const matchStatus = filterStatus === "all" || coupon.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [coupons, searchValue, filterStatus]);

  const stats = useMemo(() => {
    const totalCoupons = coupons.length;
    const activeCoupons = coupons.filter((c) => c.status === "active").length;
    const totalUsage = coupons.reduce((sum, c) => sum + c.usageCount, 0);

    return { totalCoupons, activeCoupons, totalUsage };
  }, [coupons]);

  const handleAddCoupon = () => {
    if (!formData.code.trim() || !formData.discountValue) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (editingId) {
      setCoupons(
        coupons.map((c) =>
          c.id === editingId ? { ...c, ...formData } : c
        )
      );
      toast.success("Coupon updated successfully!");
    } else {
      const newCoupon = {
        id: Math.max(...coupons.map((c) => c.id), 0) + 1,
        ...formData,
        usageCount: 0,
        status: "active",
      };
      setCoupons([...coupons, newCoupon]);
      toast.success("Coupon created successfully!");
    }

    resetForm();
  };

  const handleEdit = (coupon) => {
    setFormData(coupon);
    setEditingId(coupon.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
      toast.success("Coupon deleted successfully!");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderAmount: "",
      maxDiscount: "",
      usageLimit: "",
      validFrom: "",
      validTo: "",
      description: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getUsagePercentage = (coupon) => {
    return coupon.usageLimit > 0 ? (coupon.usageCount / coupon.usageLimit) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Coupons</h1>
            <p className="text-slate-400">Create and manage discount coupons</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <MdAdd size={20} /> Create Coupon
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Coupons</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalCoupons}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Active</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.activeCoupons}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Usage</p>
            <p className="text-3xl font-bold text-purple-500 mt-2">{stats.totalUsage}</p>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-amber-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Edit Coupon" : "Create New Coupon"}
              </h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-white">
                <MdClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g., SUMMER2024"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Discount Type
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) =>
                    setFormData({ ...formData, discountType: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (৳)</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Discount Value *
                </label>
                <input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({ ...formData, discountValue: e.target.value })
                  }
                  placeholder="e.g., 15"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Min Order Amount
                </label>
                <input
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, minOrderAmount: e.target.value })
                  }
                  placeholder="e.g., 1000"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Max Discount
                </label>
                <input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDiscount: e.target.value })
                  }
                  placeholder="e.g., 500"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, usageLimit: e.target.value })
                  }
                  placeholder="e.g., 100"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Valid From</label>
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) =>
                    setFormData({ ...formData, validFrom: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Valid To</label>
                <input
                  type="date"
                  value={formData.validTo}
                  onChange={(e) =>
                    setFormData({ ...formData, validTo: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddCoupon}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                {editingId ? "Update Coupon" : "Create Coupon"}
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

        {/* Filters */}
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
                  placeholder="Search by coupon code..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg pl-12 pr-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Coupons</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coupons Grid */}
        {filteredCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-400 mb-2">{coupon.code}</h3>
                    <p className="text-slate-400 text-sm">{coupon.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      coupon.status === "active"
                        ? "bg-green-900 text-green-200"
                        : "bg-red-900 text-red-200"
                    }`}
                  >
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-400">Discount</p>
                    <p className="text-white font-semibold">
                      {coupon.discountValue}
                      {coupon.discountType === "percentage" ? "%" : " ৳"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Min Order</p>
                    <p className="text-white font-semibold">৳{coupon.minOrderAmount}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Valid Till</p>
                    <p className="text-white font-semibold">{coupon.validTo}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Max Discount</p>
                    <p className="text-white font-semibold">৳{coupon.maxDiscount}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-slate-400 text-xs">Usage</p>
                    <p className="text-white text-xs font-semibold">
                      {coupon.usageCount}/{coupon.usageLimit}
                    </p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(getUsagePercentage(coupon), 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MdEdit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MdDelete size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400 text-lg">No coupons found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;