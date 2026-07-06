import {
  HiCurrencyDollar,
  HiShoppingBag,
  HiUsers,
  HiArrowSmUp,
  HiOfficeBuilding,
  HiRefresh
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

// প্ল্যাটফর্মের গ্লোবাল ডাটা (সুপার অ্যাডমিন পুরো ইকোসিস্টেমের হিসাব দেখবে)
const weeklyData = [
  { name: "Sat", revenue: 45000, orders: 320 },
  { name: "Sun", revenue: 38000, orders: 280 },
  { name: "Mon", revenue: 55000, orders: 410 },
  { name: "Tue", revenue: 72000, orders: 590 },
  { name: "Wed", revenue: 49000, orders: 360 },
  { name: "Thu", revenue: 68000, orders: 510 },
  { name: "Fri", revenue: 85000, orders: 680 },
];

const recentOrders = [
  { id: "ORD-9921", store: "Daily Bazar", amount: 3450, status: "Completed", date: "Just now" },
  { id: "ORD-9920", store: "Gadget Zone", amount: 12200, status: "Processing", date: "5 mins ago" },
  { id: "ORD-9919", store: "Organic Foods", amount: 1100, status: "Shipped", date: "12 mins ago" },
  { id: "ORD-9918", store: "Fashion Craft", amount: 4800, status: "Completed", date: "45 mins ago" },
  { id: "ORD-9917", store: "Grocer Direct", amount: 1950, status: "Pending", date: "1 hr ago" },
];

const categoryData = [
  { name: "Grocery Stores", value: 45 },
  { name: "Electronics", value: 20 },
  { name: "Fashion & Cloth", value: 18 },
  { name: "Health & Beauty", value: 12 },
  { name: "Others", value: 5 },
];

// ডার্ক ব্যাকগ্রাউন্ডের সাথে ম্যাচিং করা নিয়ন কালার প্যালেট
const chartColors = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#8B5CF6"];

const statusColorMap = {
  Completed: "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50",
  Processing: "bg-blue-950/40 text-blue-400 border border-blue-800/50",
  Shipped: "bg-purple-950/40 text-purple-400 border border-purple-800/50",
  Pending: "bg-amber-950/40 text-amber-400 border border-amber-800/50",
};

const AdminDashboard = () => {
  const totalRevenue = weeklyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = weeklyData.reduce((sum, d) => sum + d.orders, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Super Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Real-time SaaS network performance & global metrics.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border border-slate-600">
            <HiRefresh size={16} /> Refresh Data
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Network Sales */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border-l-4 border-indigo-500 border border-slate-700/60">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Network Revenue</p>
                <p className="text-2xl font-extrabold text-white">৳{totalRevenue.toLocaleString()}</p>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 mt-2">
                  <HiArrowSmUp /> +14.2% <span className="text-slate-500 font-medium">this week</span>
                </span>
              </div>
              <div className="p-3 bg-indigo-950/50 text-indigo-400 border border-indigo-800/30 rounded-xl">
                <HiCurrencyDollar size={24} />
              </div>
            </div>
          </div>

          {/* Total Network Orders */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border-l-4 border-cyan-500 border border-slate-700/60">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</p>
                <p className="text-2xl font-extrabold text-white">{totalOrders.toLocaleString()}</p>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 mt-2">
                  <HiArrowSmUp /> +8.7% <span className="text-slate-500 font-medium">this week</span>
                </span>
              </div>
              <div className="p-3 bg-cyan-950/50 text-cyan-400 border border-cyan-800/30 rounded-xl">
                <HiShoppingBag size={24} />
              </div>
            </div>
          </div>

          {/* Active Stores */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border-l-4 border-emerald-500 border border-slate-700/60">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Stores</p>
                <p className="text-2xl font-extrabold text-white">142</p>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 mt-2">
                  <HiArrowSmUp /> +3 <span className="text-slate-500 font-medium">today</span>
                </span>
              </div>
              <div className="p-3 bg-emerald-950/50 text-emerald-400 border border-emerald-800/30 rounded-xl">
                <HiOfficeBuilding size={24} />
              </div>
            </div>
          </div>

          {/* Registered Vendors */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border-l-4 border-amber-500 border border-slate-700/60">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Vendors</p>
                <p className="text-2xl font-extrabold text-white">186</p>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-medium mt-2">
                  Across 48 Districts
                </span>
              </div>
              <div className="p-3 bg-amber-950/50 text-amber-400 border border-amber-800/30 rounded-xl">
                <HiUsers size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Bar Chart */}
          <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Platform Revenue Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", color: "#fff", borderRadius: "8px", border: "1px solid #475569" }}
                  labelStyle={{ color: "#FACC15" }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} name="Gross Revenue (৳)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stores by Category (Pie Chart Component) */}
          <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Stores by Category</h2>
              <p className="text-xs text-slate-400 mb-6">Distribution of active shops across industries.</p>
            </div>

            {/* Chart Integration */}
            <div className="relative flex justify-center items-center h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={chartColors[index % chartColors.length]} 
                        stroke="#1e293b" 
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", border: "1px solid #334155" }} 
                    formatter={(value) => [`${value}%`, "Market Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute text-center pointer-events-none">
                <span className="block text-2xl font-extrabold text-white">142</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Stores</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-700/50">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: chartColors[index % chartColors.length] }}
                  />
                  <span className="text-slate-400 truncate">{item.name}</span>
                  <span className="text-white font-bold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Live Platform Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-750 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Origin Store</th>
                    <th className="py-3 px-4">Gross Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-slate-300">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-indigo-400">{order.id}</td>
                      <td className="py-3 px-4 font-medium text-white">{order.store}</td>
                      <td className="py-3 px-4 font-semibold">৳{order.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColorMap[order.status] || "bg-slate-700 text-slate-400"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">System Controls</h3>
              <p className="text-xs text-slate-400 mb-6">Global actions for ecosystem managers.</p>
              
              <div className="space-y-3">
                <Link to="/supper-admin/pending-stores" className="w-full flex items-center justify-between bg-slate-900/40 hover:bg-slate-700/50 border border-slate-700 hover:border-indigo-500 p-3 rounded-lg text-sm text-slate-300 hover:text-white transition-all font-medium group">
                  <span>Approve Pending Stores</span>
                  <span className="bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">3</span>
                </Link>

                <Link to="/supper-admin/payouts" className="w-full flex items-center justify-between bg-slate-900/40 hover:bg-slate-700/50 border border-slate-700 hover:border-indigo-500 p-3 rounded-lg text-sm text-slate-300 hover:text-white transition-all font-medium group">
                  <span>Process Vendor Payouts</span>
                  <span className="bg-indigo-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">5</span>
                </Link>
                
                <Link to="/supper-admin/custom-domains" className="w-full flex items-center justify-between bg-slate-900/40 hover:bg-slate-700/50 border border-slate-700 hover:border-indigo-500 p-3 rounded-lg text-sm text-slate-300 hover:text-white transition-all font-medium group">
                  <span>Domain Routing Requests</span>
                  <span className="bg-cyan-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">2</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/60 mt-6">
              <Link to="/supper-admin/settings" className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-lg transition-all shadow-md">
                Global System Settings
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;