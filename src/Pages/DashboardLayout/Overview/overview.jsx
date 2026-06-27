import { Card, CardHeader } from "@heroui/react";  
import { HiCurrencyDollar, HiShoppingBag, HiUsers } from "react-icons/hi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const weeklyData = [
  { name: "Sat", revenue: 400, orders: 30 },
  { name: "Sun", revenue: 300, orders: 25 },
  { name: "Mon", revenue: 500, orders: 45 },
  { name: "Tue", revenue: 700, orders: 60 },
  { name: "Wed", revenue: 450, orders: 38 },
  { name: "Thu", revenue: 650, orders: 55 },
  { name: "Fri", revenue: 800, orders: 70 },
];

export default function Overview() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>

      {/* স্ট্যাটিস্টিক্স কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex gap-3 items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HiCurrencyDollar size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold">$54,230</p>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex gap-3 items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HiShoppingBag size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold">1,250</p>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex gap-3 items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HiUsers size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">New Customers</p>
              <p className="text-2xl font-bold">482</p>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* চার্ট কার্ড */}
      <Card className="shadow-md hover:shadow-lg transition-shadow p-4 h-96">
        <CardHeader className="font-bold text-slate-700">
          Weekly Performance (Revenue & Orders)
        </CardHeader>
        <Card.Content className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
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
              <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Content>
      </Card>
    </div>
  );
}