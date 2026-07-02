import {
  HiCurrencyDollar,
  HiShoppingBag,
  HiUsers,
  HiTrendingUp,
} from "react-icons/hi";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Sat", revenue: 4000, orders: 30 },
  { name: "Sun", revenue: 3000, orders: 25 },
  { name: "Mon", revenue: 5000, orders: 45 },
  { name: "Tue", revenue: 7000, orders: 60 },
  { name: "Wed", revenue: 4500, orders: 38 },
  { name: "Thu", revenue: 6500, orders: 55 },
  { name: "Fri", revenue: 8000, orders: 70 },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "Ahmed Hassan",
    amount: 3450,
    status: "Completed",
    date: "Jun 20",
  },
  {
    id: "ORD002",
    customer: "Fatima Khan",
    amount: 5200,
    status: "Processing",
    date: "Jun 19",
  },
  {
    id: "ORD003",
    customer: "Karim Ali",
    amount: 2100,
    status: "Shipped",
    date: "Jun 18",
  },
  {
    id: "ORD004",
    customer: "Zara Amin",
    amount: 4800,
    status: "Completed",
    date: "Jun 17",
  },
  {
    id: "ORD005",
    customer: "Rahman Islam",
    amount: 1950,
    status: "Pending",
    date: "Jun 16",
  },
];

const categoryData = [
  { name: "Grains", value: 35 },
  { name: "Spices", value: 18 },
  { name: "Oils", value: 22 },
  { name: "Dairy", value: 15 },
  { name: "Others", value: 10 },
];

const chartColors = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6"];

const statusColorMap = {
  Completed: "bg-green-900/30 text-green-400",
  Processing: "bg-blue-900/30 text-blue-400",
  Shipped: "bg-purple-900/30 text-purple-400",
  Pending: "bg-yellow-900/30 text-yellow-400",
};

const DashBoradOverview = () => {
  const totalRevenue = weeklyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = weeklyData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalOrders
    ? Math.round(totalRevenue / totalOrders)
    : 0;

  const stats = {
    totalRevenue,
    totalOrders,
    newCustomers: 482,
    avgOrderValue,
  };

  const getStatusColor = (status) =>
    statusColorMap[status] || "bg-gray-700/30 text-gray-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-400">
            Welcome back! Here's your business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-amber-500 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-white">
                  ৳{stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-2">
                  ↑ 12.5% from last week
                </p>
              </div>
              <div className="p-3 bg-amber-900/30 rounded-lg">
                <HiCurrencyDollar className="text-2xl text-amber-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalOrders.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-2">
                  ↑ 8.2% from last week
                </p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <HiShoppingBag className="text-2xl text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  New Customers
                </p>
                <p className="text-3xl font-bold text-white">
                  {stats.newCustomers}
                </p>
                <p className="text-green-400 text-sm mt-2">
                  ↑ 5.1% from last week
                </p>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <HiUsers className="text-2xl text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  Avg Order Value
                </p>
                <p className="text-3xl font-bold text-white">
                  ৳{stats.avgOrderValue.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-2">
                  ↑ 3.2% from last week
                </p>
              </div>
              <div className="p-3 bg-green-900/30 rounded-lg">
                <HiTrendingUp className="text-2xl text-green-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">
              Weekly Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={weeklyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                  }}
                  labelStyle={{ color: "#FACC15" }}
                />
                <Legend wrapperStyle={{ color: "#F3F4F6" }} />
                <Bar
                  dataKey="revenue"
                  fill="#F59E0B"
                  radius={[8, 8, 0, 0]}
                  name="Revenue (৳)"
                />
                <Bar
                  dataKey="orders"
                  fill="#3B82F6"
                  radius={[8, 8, 0, 0]}
                  name="Orders"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">
              Sales by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-700 hover:bg-slate-700/40 transition-all"
                    >
                      <td className="py-3 px-4 font-semibold text-amber-400">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {order.customer}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        ৳{order.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Today's Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Orders</span>
                  <span className="text-2xl font-bold text-white">45</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Revenue</span>
                  <span className="text-2xl font-bold text-white">
                    ৳8,000
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Customers</span>
                  <span className="text-2xl font-bold text-white">28</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/dashboard/add-product"
                  className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Add Product
                </Link>

                <Link
                  to="/dashboard/reports"
                  className="w-full flex justify-center items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  View Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoradOverview;