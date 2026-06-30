import { useState, useMemo } from "react";
import { MdSearch, MdExpandMore, MdExpandLess, MdCheckCircle, MdHourglassEmpty, MdLocalShipping, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customerName: "Ahmed Hassan",
      customerEmail: "ahmed@gmail.com",
      customerPhone: "01712345678",
      orderDate: "2024-06-20",
      totalAmount: 3450,
      status: "pending",
      items: [
        { name: "Organic Rice", quantity: 2, price: 400, unit: "kg" },
        { name: "Turmeric Powder", quantity: 1, price: 250, unit: "kg" },
      ],
      deliveryAddress: "123 Dhaka Street, Dhanmondi, Dhaka",
      paymentMethod: "Cash on Delivery",
    },
    {
      id: "ORD002",
      customerName: "Fatima Khan",
      customerEmail: "fatima@gmail.com",
      customerPhone: "01987654321",
      orderDate: "2024-06-19",
      totalAmount: 5200,
      status: "processing",
      items: [
        { name: "Basmati Rice Premium", quantity: 3, price: 600, unit: "kg" },
        { name: "Sunflower Oil", quantity: 2, price: 550, unit: "liter" },
      ],
      deliveryAddress: "456 Gulshan Avenue, Gulshan, Dhaka",
      paymentMethod: "Bkash",
    },
    {
      id: "ORD003",
      customerName: "Karim Ali",
      customerEmail: "karim@gmail.com",
      customerPhone: "01555555555",
      orderDate: "2024-06-18",
      totalAmount: 2100,
      status: "shipped",
      items: [
        { name: "Whole Wheat Flour", quantity: 5, price: 220, unit: "kg" },
      ],
      deliveryAddress: "789 Mirpur Road, Mirpur, Dhaka",
      paymentMethod: "Nagad",
    },
    {
      id: "ORD004",
      customerName: "Zara Amin",
      customerEmail: "zara@gmail.com",
      customerPhone: "01666666666",
      orderDate: "2024-06-17",
      totalAmount: 4800,
      status: "delivered",
      items: [
        { name: "Jaggery", quantity: 2, price: 380, unit: "kg" },
        { name: "Black Pepper", quantity: 1, price: 490, unit: "kg" },
        { name: "Sugar", quantity: 3, price: 160, unit: "kg" },
      ],
      deliveryAddress: "321 Banani Lane, Banani, Dhaka",
      paymentMethod: "Card",
    },
    {
      id: "ORD005",
      customerName: "Rahman Islam",
      customerEmail: "rahman@gmail.com",
      customerPhone: "01777777777",
      orderDate: "2024-06-16",
      totalAmount: 1950,
      status: "pending",
      items: [
        { name: "Lentils (Masoor Dal)", quantity: 3, price: 280, unit: "kg" },
      ],
      deliveryAddress: "654 Motijheel, Motijheel, Dhaka",
      paymentMethod: "Bkash",
    },
    {
      id: "ORD006",
      customerName: "Nida Khan",
      customerEmail: "nida@gmail.com",
      customerPhone: "01888888888",
      orderDate: "2024-06-15",
      totalAmount: 3700,
      status: "processing",
      items: [
        { name: "Milk Powder", quantity: 2, price: 580, unit: "kg" },
        { name: "Organic Rice", quantity: 1, price: 400, unit: "kg" },
      ],
      deliveryAddress: "987 Uttara, Uttara, Dhaka",
      paymentMethod: "Cash on Delivery",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchValue.toLowerCase());

      const matchStatus = filterStatus === "all" || order.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [orders, searchValue, filterStatus]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;

    return { totalOrders, totalRevenue, pending, delivered };
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success("Order status updated successfully!");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bgColor: "bg-yellow-900",
        textColor: "text-yellow-200",
        icon: MdHourglassEmpty,
        label: "Pending",
      },
      processing: {
        bgColor: "bg-blue-900",
        textColor: "text-blue-200",
        icon: MdCheckCircle,
        label: "Processing",
      },
      shipped: {
        bgColor: "bg-purple-900",
        textColor: "text-purple-200",
        icon: MdLocalShipping,
        label: "Shipped",
      },
      delivered: {
        bgColor: "bg-green-900",
        textColor: "text-green-200",
        icon: MdDone,
        label: "Delivered",
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}>
        <Icon size={14} /> {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
          <p className="text-slate-400">Manage and track customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Orders</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalOrders}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Revenue</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              ৳{stats.totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-yellow-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Pending</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.pending}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-green-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Delivered</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.delivered}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-4 top-3 text-slate-500 text-lg" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by Order ID or Customer name..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg pl-12 pr-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Order Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                {/* Order Header */}
                <div
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder?.id === order.id ? null : order
                    )
                  }
                  className="p-6 cursor-pointer flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-white font-semibold text-lg">{order.id}</p>
                        <p className="text-slate-400 text-sm">{order.customerName}</p>
                      </div>
                      <div className="hidden md:block">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right mr-4">
                    <p className="text-white font-semibold text-lg">
                      ৳{order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-sm">{order.orderDate}</p>
                  </div>

                  <div className="text-slate-400">
                    {expandedOrder?.id === order.id ? (
                      <MdExpandLess size={24} />
                    ) : (
                      <MdExpandMore size={24} />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder?.id === order.id && (
                  <div className="border-t border-slate-700 p-6 bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Customer Info */}
                      <div>
                        <h3 className="text-white font-semibold mb-4">Customer Information</h3>
                        <div className="space-y-2 text-slate-300 text-sm">
                          <p>
                            <span className="font-semibold text-white">Name:</span>{" "}
                            {order.customerName}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Email:</span>{" "}
                            {order.customerEmail}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Phone:</span>{" "}
                            {order.customerPhone}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Address:</span>{" "}
                            {order.deliveryAddress}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Payment:</span>{" "}
                            {order.paymentMethod}
                          </p>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div>
                        <h3 className="text-white font-semibold mb-4">Update Status</h3>
                        <div className="space-y-2">
                          {["pending", "processing", "shipped", "delivered"].map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
                                className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                  order.status === status
                                    ? "bg-amber-500 text-white"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                }`}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="text-white font-semibold mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-800 rounded-lg p-4 flex justify-between items-center"
                          >
                            <div>
                              <p className="text-white font-semibold">{item.name}</p>
                              <p className="text-slate-400 text-sm">
                                {item.quantity} {item.unit} @ ৳{item.price}/{item.unit}
                              </p>
                            </div>
                            <p className="text-amber-400 font-semibold">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-end">
                        <div className="text-right">
                          <p className="text-slate-400 text-sm mb-2">Order Total</p>
                          <p className="text-2xl font-bold text-amber-400">
                            ৳{order.totalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
              <p className="text-slate-400 text-lg">No orders found</p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;