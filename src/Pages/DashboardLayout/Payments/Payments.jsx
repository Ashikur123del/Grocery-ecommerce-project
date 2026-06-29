import { useState, useMemo } from "react";
import { MdSearch, MdExpandMore, MdExpandLess, MdCheckCircle, MdHourglassEmpty, MdCancel } from "react-icons/md";

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: "PAY001",
      orderId: "ORD001",
      customerName: "Ahmed Hassan",
      amount: 3450,
      method: "Bkash",
      status: "completed",
      date: "2024-06-20",
      transactionId: "BKH123456789",
      notes: "Payment successful",
    },
    {
      id: "PAY002",
      orderId: "ORD002",
      customerName: "Fatima Khan",
      amount: 5200,
      method: "Nagad",
      status: "completed",
      date: "2024-06-19",
      transactionId: "NGD987654321",
      notes: "Verified",
    },
    {
      id: "PAY003",
      orderId: "ORD003",
      customerName: "Karim Ali",
      amount: 2100,
      method: "Cash on Delivery",
      status: "pending",
      date: "2024-06-18",
      transactionId: "COD-ORD003",
      notes: "Awaiting delivery",
    },
    {
      id: "PAY004",
      orderId: "ORD004",
      customerName: "Zara Amin",
      amount: 4800,
      method: "Card",
      status: "completed",
      date: "2024-06-17",
      transactionId: "CARD987654",
      notes: "Visa debit card",
    },
    {
      id: "PAY005",
      orderId: "ORD005",
      customerName: "Rahman Islam",
      amount: 1950,
      method: "Bkash",
      status: "failed",
      date: "2024-06-16",
      transactionId: "BKH111111111",
      notes: "Insufficient balance",
    },
    {
      id: "PAY006",
      orderId: "ORD006",
      customerName: "Nida Khan",
      amount: 3700,
      method: "Cash on Delivery",
      status: "pending",
      date: "2024-06-15",
      transactionId: "COD-ORD006",
      notes: "Scheduled for delivery",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [expandedPayment, setExpandedPayment] = useState(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchSearch =
        payment.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        payment.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchValue.toLowerCase());

      const matchStatus = filterStatus === "all" || payment.status === filterStatus;
      const matchMethod = filterMethod === "all" || payment.method === filterMethod;

      return matchSearch && matchStatus && matchMethod;
    });
  }, [payments, searchValue, filterStatus, filterMethod]);

  const stats = useMemo(() => {
    const totalPayments = payments.length;
    const completedAmount = payments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = payments
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);
    const failedCount = payments.filter((p) => p.status === "failed").length;

    return { totalPayments, completedAmount, pendingAmount, failedCount };
  }, [payments]);

  const paymentMethods = [
    ...new Set(payments.map((p) => p.method)),
  ];

  const handleStatusChange = (paymentId, newStatus) => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId ? { ...p, status: newStatus } : p
      )
    );
    alert("Payment status updated!");
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: {
        bg: "bg-green-900",
        text: "text-green-200",
        label: "Completed",
        icon: MdCheckCircle,
      },
      pending: {
        bg: "bg-yellow-900",
        text: "text-yellow-200",
        label: "Pending",
        icon: MdHourglassEmpty,
      },
      failed: {
        bg: "bg-red-900",
        text: "text-red-200",
        label: "Failed",
        icon: MdCancel,
      },
    };

    const c = config[status];
    const Icon = c.icon;

    return (
      <span className={`${c.bg} ${c.text} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}>
        <Icon size={14} /> {c.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Payments</h1>
          <p className="text-slate-400">Manage and track payment transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Payments</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalPayments}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-green-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Completed</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              ৳{stats.completedAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-yellow-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Pending</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              ৳{stats.pendingAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-red-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Failed</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{stats.failedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-4 top-3 text-slate-500 text-lg" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by ID, Customer, Order..."
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
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Method</label>
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Methods</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div
                  onClick={() =>
                    setExpandedPayment(
                      expandedPayment?.id === payment.id ? null : payment
                    )
                  }
                  className="p-6 cursor-pointer flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{payment.id}</p>
                    <p className="text-slate-400 text-sm">
                      {payment.customerName} • {payment.method}
                    </p>
                  </div>

                  <div className="text-right mr-4">
                    <p className="text-white font-semibold">
                      ৳{payment.amount.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-sm">{payment.date}</p>
                  </div>

                  <div className="text-slate-400">
                    {expandedPayment?.id === payment.id ? (
                      <MdExpandLess size={24} />
                    ) : (
                      <MdExpandMore size={24} />
                    )}
                  </div>
                </div>

                {expandedPayment?.id === payment.id && (
                  <div className="border-t border-slate-700 p-6 bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-white font-semibold mb-4">Payment Details</h3>
                        <div className="space-y-3 text-slate-300 text-sm">
                          <div>
                            <p className="font-semibold text-white">Payment ID</p>
                            <p>{payment.id}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-white">Order ID</p>
                            <p>{payment.orderId}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-white">Transaction ID</p>
                            <p className="font-mono">{payment.transactionId}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-white">Payment Method</p>
                            <p>{payment.method}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-white">Amount</p>
                            <p className="text-amber-400 font-semibold">
                              ৳{payment.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-4">Update Status</h3>
                        <div className="space-y-2 mb-6">
                          {["completed", "pending", "failed"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(payment.id, status)}
                              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                payment.status === status
                                  ? "bg-amber-500 text-white"
                                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>

                        <div>
                          <p className="text-white font-semibold mb-2">Current Status</p>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-white font-semibold mb-2">Notes</p>
                      <p className="text-slate-400 text-sm">{payment.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
              <p className="text-slate-400 text-lg">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;