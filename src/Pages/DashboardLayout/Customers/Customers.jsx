import { useState, useMemo } from "react";
import { MdSearch, MdExpandMore, MdExpandLess, MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

const Customers = () => {
  const [customers,] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed@gmail.com",
      phone: "01712345678",
      joinDate: "2024-05-01",
      totalOrders: 3,
      totalSpent: 8500,
      address: "123 Dhaka Street, Dhanmondi, Dhaka",
      city: "Dhaka",
      status: "active",
      orders: ["ORD001", "ORD005", "ORD008"],
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima@gmail.com",
      phone: "01987654321",
      joinDate: "2024-04-15",
      totalOrders: 5,
      totalSpent: 15200,
      address: "456 Gulshan Avenue, Gulshan, Dhaka",
      city: "Gulshan",
      status: "active",
      orders: ["ORD002", "ORD006", "ORD009", "ORD012", "ORD014"],
    },
    {
      id: 3,
      name: "Karim Ali",
      email: "karim@gmail.com",
      phone: "01555555555",
      joinDate: "2024-03-20",
      totalOrders: 2,
      totalSpent: 4200,
      address: "789 Mirpur Road, Mirpur, Dhaka",
      city: "Mirpur",
      status: "active",
      orders: ["ORD003", "ORD010"],
    },
    {
      id: 4,
      name: "Zara Amin",
      email: "zara@gmail.com",
      phone: "01666666666",
      joinDate: "2024-02-10",
      totalOrders: 8,
      totalSpent: 24500,
      address: "321 Banani Lane, Banani, Dhaka",
      city: "Banani",
      status: "active",
      orders: ["ORD004", "ORD007", "ORD011", "ORD013", "ORD015", "ORD017", "ORD019", "ORD021"],
    },
    {
      id: 5,
      name: "Rahman Islam",
      email: "rahman@gmail.com",
      phone: "01777777777",
      joinDate: "2024-01-05",
      totalOrders: 1,
      totalSpent: 1950,
      address: "654 Motijheel, Motijheel, Dhaka",
      city: "Motijheel",
      status: "inactive",
      orders: ["ORD005"],
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchSearch =
        customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.phone.includes(searchValue);

      const matchStatus = filterStatus === "all" || customer.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [customers, searchValue, filterStatus]);

  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((c) => c.status === "active").length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

    return { totalCustomers, activeCustomers, totalRevenue, avgOrderValue };
  }, [customers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
          <p className="text-slate-400">Manage and view customer information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Customers</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalCustomers}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Active</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.activeCustomers}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Revenue</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">
              ৳{stats.totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Avg Order Value</p>
            <p className="text-3xl font-bold text-purple-500 mt-2">
              ৳{stats.avgOrderValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
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
                  placeholder="Search by name, email or phone..."
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
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div
                  onClick={() =>
                    setExpandedCustomer(
                      expandedCustomer?.id === customer.id ? null : customer
                    )
                  }
                  className="p-6 cursor-pointer flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{customer.name}</p>
                    <p className="text-slate-400 text-sm">
                      {customer.totalOrders} orders • ৳{customer.totalSpent.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right mr-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.status === "active"
                          ? "bg-green-900 text-green-200"
                          : "bg-gray-900 text-gray-200"
                      }`}
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </div>

                  <div className="text-slate-400">
                    {expandedCustomer?.id === customer.id ? (
                      <MdExpandLess size={24} />
                    ) : (
                      <MdExpandMore size={24} />
                    )}
                  </div>
                </div>

                {expandedCustomer?.id === customer.id && (
                  <div className="border-t border-slate-700 p-6 bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-white font-semibold mb-4">Contact Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-slate-300">
                            <MdEmail className="text-amber-500" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-300">
                            <MdPhone className="text-amber-500" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-300">
                            <MdLocationOn className="text-amber-500" />
                            <span>{customer.address}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-4">Customer Statistics</h3>
                        <div className="space-y-3 text-slate-300 text-sm">
                          <p>
                            <span className="font-semibold text-white">Member Since:</span>{" "}
                            {customer.joinDate}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Total Orders:</span>{" "}
                            {customer.totalOrders}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Total Spent:</span> ৳
                            {customer.totalSpent.toLocaleString()}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Avg Order:</span> ৳
                            {(customer.totalSpent / customer.totalOrders).toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-4">Recent Orders</h3>
                      <div className="flex flex-wrap gap-2">
                        {customer.orders.map((order) => (
                          <span
                            key={order}
                            className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {order}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
              <p className="text-slate-400 text-lg">No customers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;