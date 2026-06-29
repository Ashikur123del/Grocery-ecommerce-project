import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
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
import {  MdShoppingCart, MdPeople,  MdDoDisturb } from "react-icons/md";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("month");

  // Sales data by date
  const salesData = [
    { date: "Jun 1", sales: 4000, revenue: 2400, customers: 240 },
    { date: "Jun 5", sales: 3000, revenue: 1398, customers: 221 },
    { date: "Jun 10", sales: 2000, revenue: 9800, customers: 229 },
    { date: "Jun 15", sales: 2780, revenue: 3908, customers: 200 },
    { date: "Jun 20", sales: 1890, revenue: 4800, customers: 218 },
    { date: "Jun 25", sales: 2390, revenue: 3800, customers: 250 },
    { date: "Jun 30", sales: 3490, revenue: 4300, customers: 210 },
  ];

  // Top products
  const topProducts = [
    { name: "Organic Rice", sales: 245, revenue: 98000 },
    { name: "Basmati Rice", sales: 189, revenue: 113400 },
    { name: "Turmeric Powder", sales: 156, revenue: 39000 },
    { name: "Black Pepper", sales: 142, revenue: 69580 },
    { name: "Sunflower Oil", sales: 128, revenue: 70400 },
  ];

  // Revenue by category
  const revenueByCategory = [
    { name: "Grains", value: 245000 },
    { name: "Spices", value: 89000 },
    { name: "Oils", value: 105000 },
    { name: "Flour", value: 67000 },
    { name: "Dairy", value: 98000 },
    { name: "Others", value: 56000 },
  ];

  // Payment methods distribution
  const paymentMethods = [
    { name: "Bkash", value: 35 },
    { name: "Nagad", value: 28 },
    { name: "Card", value: 22 },
    { name: "Cash on Delivery", value: 15 },
  ];

  // Colors for charts
  const colors = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#EC4899"];

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
    const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
    const totalCustomers = 1256;
    const avgOrderValue = totalRevenue / totalSales;
    const conversionRate = 3.2;
    const productsSold = topProducts.reduce((sum, p) => sum + p.sales, 0);

    return {
      totalRevenue,
      totalSales,
      totalCustomers,
      avgOrderValue,
      conversionRate,
      productsSold,
    };
  }, [salesData, topProducts]);

  // Customer segments
  const customerSegments = [
    { segment: "New Customers", count: 124, percentage: 10 },
    { segment: "Returning", count: 567, percentage: 45 },
    { segment: "VIP", count: 89, percentage: 7 },
    { segment: "Inactive", count: 476, percentage: 38 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reports</h1>
          <p className="text-slate-400">Business insights and performance metrics</p>
        </div>

        {/* Date Range Filter */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {["week", "month", "quarter", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                dateRange === range
                  ? "bg-amber-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-amber-500">
                  ৳{kpis.totalRevenue.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-2">↑ 12.5% from last month</p>
              </div>
              <MdDoDisturb className="text-4xl text-amber-500/30" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-blue-500">
                  {kpis.totalSales.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-2">↑ 8.2% from last month</p>
              </div>
              <MdShoppingCart className="text-4xl text-blue-500/30" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                  Total Customers
                </p>
                <p className="text-3xl font-bold text-green-500">
                  {kpis.totalCustomers.toLocaleString()}
                </p>
                <p className="text-green-400 text-sm mt-2">↑ 5.1% from last month</p>
              </div>
              <MdPeople className="text-4xl text-green-500/30" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
              Avg Order Value
            </p>
            <p className="text-3xl font-bold text-purple-500">
              ৳{kpis.avgOrderValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
            <p className="text-green-400 text-sm mt-2">↑ 3.2% from last month</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
              Conversion Rate
            </p>
            <p className="text-3xl font-bold text-orange-500">{kpis.conversionRate}%</p>
            <p className="text-green-400 text-sm mt-2">↑ 0.8% from last month</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
              Products Sold
            </p>
            <p className="text-3xl font-bold text-pink-500">{kpis.productsSold.toLocaleString()}</p>
            <p className="text-green-400 text-sm mt-2">↑ 15.3% from last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales & Revenue Trend */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-6 text-lg">Sales & Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #475569" }}
                  labelStyle={{ color: "#F3F4F6" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ fill: "#F59E0B" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-6 text-lg">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #475569" }}
                  labelStyle={{ color: "#F3F4F6" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-6 text-lg">Top 5 Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #475569" }}
                  labelStyle={{ color: "#F3F4F6" }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#F59E0B" name="Units Sold" />
                <Bar dataKey="revenue" fill="#10B981" name="Revenue (৳)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-6 text-lg">Payment Methods</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #475569" }}
                  labelStyle={{ color: "#F3F4F6" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products Table */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 text-lg">Top Selling Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white text-sm">
                <thead className="border-b border-slate-600">
                  <tr>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-center py-3 px-4">Units</th>
                    <th className="text-right py-3 px-4">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, idx) => (
                    <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="text-center py-3 px-4">
                        <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                          {product.sales}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4 text-amber-400 font-semibold">
                        ৳{product.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 text-lg">Customer Segments</h3>
            <div className="space-y-4">
              {customerSegments.map((segment, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-slate-300 font-semibold">{segment.segment}</p>
                    <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded text-xs font-semibold">
                      {segment.count} ({segment.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        idx === 0
                          ? "bg-blue-500"
                          : idx === 1
                          ? "bg-green-500"
                          : idx === 2
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-6 text-lg">Key Metrics Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-2">Growth Rate</p>
              <p className="text-2xl font-bold text-green-500">↑ 12.5%</p>
              <p className="text-slate-500 text-xs mt-1">vs last month</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Return Rate</p>
              <p className="text-2xl font-bold text-orange-500">2.3%</p>
              <p className="text-slate-500 text-xs mt-1">Product returns</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-blue-500">4.7/5</p>
              <p className="text-slate-500 text-xs mt-1">Average rating</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Repeat Customer Rate</p>
              <p className="text-2xl font-bold text-purple-500">45%</p>
              <p className="text-slate-500 text-xs mt-1">Returning customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;