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
  Completed: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Pending: "bg-yellow-100 text-yellow-800",
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
    statusColorMap[status] || "bg-gray-100 text-gray-800";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600">
            Welcome back! Here's your business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 text-sm font-semibold uppercase mb-2">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  ৳{stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-2">
                  ↑ 12.5% from last week
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <HiCurrencyDollar className="text-2xl text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 text-sm font-semibold uppercase mb-2">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {stats.totalOrders.toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-2">
                  ↑ 8.2% from last week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <HiShoppingBag className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 text-sm font-semibold uppercase mb-2">
                  New Customers
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {stats.newCustomers}
                </p>
                <p className="text-green-600 text-sm mt-2">
                  ↑ 5.1% from last week
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <HiUsers className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 text-sm font-semibold uppercase mb-2">
                  Avg Order Value
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  ৳{stats.avgOrderValue.toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-2">
                  ↑ 3.2% from last week
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <HiTrendingUp className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Weekly Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={weeklyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  labelStyle={{ color: "#facc15" }}
                />
                <Legend />
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

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
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
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-semibold text-amber-600">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {order.customer}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        ৳{order.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Today's Performance */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Today's Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Orders</span>
                  <span className="text-2xl font-bold text-slate-800">45</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-600">Revenue</span>
                  <span className="text-2xl font-bold text-slate-800">
                    ৳8,000
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-600">Customers</span>
                  <span className="text-2xl font-bold text-slate-800">28</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/dashboard/add-order"
                  className="w-full flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Create New Order
                </Link>

                <Link
                  to="/dashboard/add-product"
                  className="w-full flex justify-center items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Add Product
                </Link>

                <Link
                  to="/dashboard/reports"
                  className="w-full flex justify-center items-center bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors"
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
