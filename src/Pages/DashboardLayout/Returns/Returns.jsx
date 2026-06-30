import { useState, useMemo } from "react";
import { MdSearch, MdExpandMore, MdExpandLess, } from "react-icons/md";
import { toast } from "react-toastify";

const Returns = () => {
  const [returns, setReturns] = useState([
    {
      id: "RET001",
      orderId: "ORD001",
      customerName: "Ahmed Hassan",
      productName: "Organic Rice",
      quantity: 1,
      unit: "kg",
      reason: "Damaged package",
      returnDate: "2024-06-20",
      status: "pending",
      refundAmount: 400,
      comments: "Package arrived with broken seal",
    },
    {
      id: "RET002",
      orderId: "ORD002",
      customerName: "Fatima Khan",
      productName: "Basmati Rice Premium",
      quantity: 2,
      unit: "kg",
      reason: "Quality issue",
      returnDate: "2024-06-19",
      status: "approved",
      refundAmount: 1200,
      comments: "Not as described",
    },
    {
      id: "RET003",
      orderId: "ORD003",
      customerName: "Karim Ali",
      productName: "Whole Wheat Flour",
      quantity: 5,
      unit: "kg",
      reason: "Expired product",
      returnDate: "2024-06-18",
      status: "processed",
      refundAmount: 1100,
      comments: "Expiry date too close",
    },
    {
      id: "RET004",
      orderId: "ORD004",
      customerName: "Zara Amin",
      productName: "Black Pepper",
      quantity: 1,
      unit: "kg",
      reason: "Changed mind",
      returnDate: "2024-06-17",
      status: "rejected",
      refundAmount: 0,
      comments: "Return window expired",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedReturn, setExpandedReturn] = useState(null);

  const filteredReturns = useMemo(() => {
    return returns.filter((ret) => {
      const matchSearch =
        ret.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        ret.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        ret.productName.toLowerCase().includes(searchValue.toLowerCase());

      const matchStatus = filterStatus === "all" || ret.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [returns, searchValue, filterStatus]);

  const stats = useMemo(() => {
    const totalReturns = returns.length;
    const totalRefunds = returns
      .filter((r) => r.status !== "rejected")
      .reduce((sum, r) => sum + r.refundAmount, 0);
    const pending = returns.filter((r) => r.status === "pending").length;
    const approved = returns.filter((r) => r.status === "approved").length;

    return { totalReturns, totalRefunds, pending, approved };
  }, [returns]);

  const handleStatusChange = (returnId, newStatus) => {
    setReturns(
      returns.map((ret) =>
        ret.id === returnId ? { ...ret, status: newStatus } : ret
      )
    );
    toast.success("Return status updated!");
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { bg: "bg-yellow-900", text: "text-yellow-200", label: "Pending" },
      approved: { bg: "bg-blue-900", text: "text-blue-200", label: "Approved" },
      processed: { bg: "bg-green-900", text: "text-green-200", label: "Processed" },
      rejected: { bg: "bg-red-900", text: "text-red-200", label: "Rejected" },
    };

    const c = config[status];
    return (
      <span className={`${c.bg} ${c.text} px-3 py-1 rounded-full text-xs font-semibold`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Returns & Refunds</h1>
          <p className="text-slate-400">Manage product returns and refunds</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Returns</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalReturns}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Refunds</p>
            <p className="text-3xl font-bold text-red-500 mt-2">
              ৳{stats.totalRefunds.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-yellow-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Pending</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.pending}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-green-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Approved</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.approved}</p>
          </div>
        </div>

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
                  placeholder="Search by Return ID, Customer, Product..."
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
                <option value="all">All Returns</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="processed">Processed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Returns List */}
        <div className="space-y-4">
          {filteredReturns.length > 0 ? (
            filteredReturns.map((ret) => (
              <div
                key={ret.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div
                  onClick={() =>
                    setExpandedReturn(expandedReturn?.id === ret.id ? null : ret)
                  }
                  className="p-6 cursor-pointer flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{ret.id}</p>
                    <p className="text-slate-400 text-sm">
                      {ret.customerName} • {ret.productName}
                    </p>
                  </div>

                  <div className="text-right mr-4">
                    <p className="text-white font-semibold">
                      ৳{ret.refundAmount.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-sm">{ret.returnDate}</p>
                  </div>

                  <div className="text-slate-400">
                    {expandedReturn?.id === ret.id ? (
                      <MdExpandLess size={24} />
                    ) : (
                      <MdExpandMore size={24} />
                    )}
                  </div>
                </div>

                {expandedReturn?.id === ret.id && (
                  <div className="border-t border-slate-700 p-6 bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-white font-semibold mb-4">Return Details</h3>
                        <div className="space-y-2 text-slate-300 text-sm">
                          <p>
                            <span className="font-semibold text-white">Return ID:</span> {ret.id}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Order ID:</span>{" "}
                            {ret.orderId}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Product:</span>{" "}
                            {ret.productName} ({ret.quantity} {ret.unit})
                          </p>
                          <p>
                            <span className="font-semibold text-white">Reason:</span>{" "}
                            {ret.reason}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Comments:</span>{" "}
                            {ret.comments}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-4">Update Status</h3>
                        <div className="space-y-2">
                          {["pending", "approved", "processed", "rejected"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(ret.id, status)}
                              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                ret.status === status
                                  ? "bg-amber-500 text-white"
                                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                      <div>{getStatusBadge(ret.status)}</div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">Refund Amount</p>
                        <p className="text-2xl font-bold text-amber-400">
                          ৳{ret.refundAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
              <p className="text-slate-400 text-lg">No returns found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Returns;