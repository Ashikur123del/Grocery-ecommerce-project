import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiDownload,
  HiFilter,
  HiUsers,
  HiCurrencyDollar,
  HiCube,
  HiCash,
} from "react-icons/hi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Legend,
} from "recharts";

const monthlyAnalyticsData = [
  {
    month: "Jan",
    grossSales: 45000,
    netCommission: 45000,
    newVendors: 12,
    activeUsers: 2400,
  },
  {
    month: "Feb",
    grossSales: 520000,
    netCommission: 52000,
    newVendors: 15,
    activeUsers: 2800,
  },
  {
    month: "Mar",
    grossSales: 610000,
    netCommission: 61000,
    newVendors: 18,
    activeUsers: 3500,
  },
  {
    month: "Apr",
    grossSales: 580000,
    netCommission: 58000,
    newVendors: 14,
    activeUsers: 3900,
  },
  {
    month: "May",
    grossSales: 710000,
    netCommission: 71000,
    newVendors: 22,
    activeUsers: 4800,
  },
  {
    month: "Jun",
    grossSales: 850000,
    netCommission: 85000,
    newVendors: 30,
    activeUsers: 5600,
  },
  {
    month: "Jul",
    grossSales: 920000,
    netCommission: 92000,
    newVendors: 25,
    activeUsers: 6200,
  },
];

const topVendors = [
  {
    id: "VND-001",
    name: "Daily Bazar",
    category: "Grocery",
    sales: 245000,
    commissionPaid: 24500,
    rating: 4.8,
  },
  {
    id: "VND-004",
    name: "Gadget Zone",
    category: "Electronics",
    sales: 198000,
    commissionPaid: 19800,
    rating: 4.6,
  },
  {
    id: "VND-012",
    name: "Fashion Craft",
    category: "Clothing",
    sales: 165000,
    commissionPaid: 16500,
    rating: 4.7,
  },
  {
    id: "VND-008",
    name: "Organic Foods",
    category: "Grocery",
    sales: 142000,
    commissionPaid: 14200,
    rating: 4.9,
  },
];

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7_months");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
      <div className="container mx-auto space-y-6">
        {/* Upper Action Bar & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Global Platform Analytics
            </h1>
            <p className="text-sm text-slate-400">
              Deep dive into multi-vendor sales, commission metrics, and system
              growth.
            </p>
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-300">
              <HiFilter className="text-indigo-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="3_months" className="bg-slate-800">
                  Last 3 Months
                </option>
                <option value="7_months" className="bg-slate-800">
                  Last 7 Months
                </option>
                <option value="12_months" className="bg-slate-800">
                  This Year (2026)
                </option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md">
              <HiDownload size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Analytics Mini-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/70 border border-slate-700/60 p-5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Avg. Order Value
              </p>
              <h3 className="text-2xl font-extrabold mt-1">৳১,৮৫০</h3>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 mt-1">
                <HiTrendingUp /> +4.3%{" "}
                <span className="text-slate-500 font-medium">
                  vs last month
                </span>
              </span>
            </div>
            <div className="p-3 bg-indigo-950/50 text-indigo-400 border border-indigo-800/30 rounded-xl">
              <HiCurrencyDollar size={22} />
            </div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/60 p-5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Platform Commission
              </p>
              <h3 className="text-2xl font-extrabold mt-1">৳৪,০৪,০০০</h3>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 mt-1">
                <HiTrendingUp /> +12.1%{" "}
                <span className="text-slate-500 font-medium">
                  total revenue
                </span>
              </span>
            </div>
            <div className="p-3 bg-emerald-950/50 text-emerald-400 border border-emerald-800/30 rounded-xl">
              <HiCash size={22} />
            </div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/60 p-5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                User Retention
              </p>
              <h3 className="text-2xl font-extrabold mt-1">৭৮.৪%</h3>
              <span className="flex items-center gap-1 text-xs font-bold text-rose-400 mt-1">
                <HiTrendingDown /> -১.২%{" "}
                <span className="text-slate-500 font-medium">churn rate</span>
              </span>
            </div>
            <div className="p-3 bg-cyan-950/50 text-cyan-400 border border-cyan-800/30 rounded-xl">
              <HiUsers size={22} />
            </div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/60 p-5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Products Live
              </p>
              <h3 className="text-2xl font-extrabold mt-1">১২,৪৫০</h3>
              <span className="text-xs text-amber-400 font-medium mt-2 block">
                Across all categories
              </span>
            </div>
            <div className="p-3 bg-amber-950/50 text-amber-400 border border-amber-800/30 rounded-xl">
              <HiCube size={22} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                Gross Sales vs Platform Commission
              </h2>
              <p className="text-xs text-slate-400">
                Comparing network GMV with your 10% marketplace cut.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={monthlyAnalyticsData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="grossSales"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#salesGrad)"
                  name="Total Shop Sales (৳)"
                />
                <Area
                  type="monotone"
                  dataKey="netCommission"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#commGrad)"
                  name="Admin Commission (৳)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Platform Adoption Rate</h2>
              <p className="text-xs text-slate-400">
                Monthly breakdown of newly registered vendors vs active
                customers.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart
                data={monthlyAnalyticsData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="newVendors"
                  barSize={20}
                  fill="#06B6D4"
                  radius={[4, 4, 0, 0]}
                  name="New Vendors onboarded"
                />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Monthly Active Customers"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Top Performing Vendors</h2>
            <p className="text-xs text-slate-400">
              Leaderboard of stores generating the highest platform volumes.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/40 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Vendor ID</th>
                  <th className="py-3 px-4">Store Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Total Sales</th>
                  <th className="py-3 px-4">Platform Commission (10%)</th>
                  <th className="py-3 px-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {topVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-indigo-400">
                      {vendor.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {vendor.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-900/80 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700">
                        {vendor.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-400">
                      ৳{vendor.sales.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-cyan-400">
                      ৳{vendor.commissionPaid.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-amber-400 font-bold">
                      <FaRegStar /> {vendor.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
