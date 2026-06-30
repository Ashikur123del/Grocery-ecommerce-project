import { Link, useLocation } from "react-router-dom";
import { HiViewGrid, HiUser, HiShoppingBag, HiLogout, HiX, HiChartBar, HiCreditCard, HiCog, HiTicket, HiSupport, HiPhotograph, HiUsers, HiClipboardList, HiTag, HiPlusCircle } from "react-icons/hi";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  const menuGroups = [
    {
      title: "Dashboard",
      items: [
        { path: "/dashboard", name: "Overview", icon: <HiViewGrid size={22} /> },
      ]
    },
    {
      title: "Catalog",
      items: [
        { path: "/dashboard/add-product", name: "Add Product", icon: <HiPlusCircle size={20} /> },
        { path: "/dashboard/products", name: "All Products", icon: <HiShoppingBag size={20} /> },
        { path: "/dashboard/categories", name: "Categories", icon: <HiTag size={20} /> },
        { path: "/dashboard/inventory", name: "Inventory", icon: <HiClipboardList size={20} /> },
        { path: "/dashboard/media", name: "Media Library", icon: <HiPhotograph size={20} /> },
      ]
    },
    {
      title: "Sales & Customers",
      items: [
        { path: "/dashboard/orders", name: "Orders", icon: <HiShoppingBag size={20} />, badge: 5 },
        { path: "/dashboard/returns", name: "Returns", icon: <HiX size={20} />, badge: 2 },
        { path: "/dashboard/customers", name: "Customers", icon: <HiUsers size={20} /> },
        { path: "/dashboard/coupons", name: "Coupons", icon: <HiTicket size={20} /> },
        { path: "/dashboard/payments", name: "Payments", icon: <HiCreditCard size={20} /> },
      ]
    },
    {
      title: "System",
      items: [
        { path: "/dashboard/reports", name: "Analytics", icon: <HiChartBar size={20} /> },
        { path: "/dashboard/support", name: "Support Tickets", icon: <HiSupport size={20} />, badge: 8 },
        { path: "/dashboard/store-settings", name: "Store Settings", icon: <HiCog size={20} /> },
          {path: "/dashboard/unich", name: 'Unick'}
      ]
    }
  ];

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto scrollbar-thin scrollbar scrollbar-thumb-amber-500 scrollbar-track-slate-800 bg-slate-900 text-white p-5 flex flex-col transform transition-transform duration-300  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* User Info */}
        <div className="flex flex-col items-center mb-8 flex-shrink-0">
          <div className="relative">
            <img src="https://i.pravatar.cc/100" alt="User" className="w-24 h-24 rounded-full border-4 border-slate-700" />
            <div className="absolute bottom-0 right-0 bg-slate-700 p-1 rounded-full border-2 border-slate-900">
               <HiUser size={14} />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-lg">Mr. Ariful Islam</h3>
          <p className="text-slate-400 text-sm">arifulislam@gmail.com</p>
        </div>

        {/* Dynamic Menu Rendering */}
        <div className="flex-grow">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 px-3">{group.title}</p>
              {group.items.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex items-center gap-3 p-2 mb-1 rounded-lg transition-all ${location.pathname === item.path ? "bg-amber-500 text-white font-semibold" : "text-slate-300 hover:bg-slate-800"}`}
                >
                  {item.icon}
                  <span className="flex-grow">{item.name}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <button className="flex items-center gap-3 p-3 w-full text-slate-300 hover:bg-slate-800 rounded-lg mt-4 flex-shrink-0">
          <HiLogout size={22} /> Logout
        </button>
      </div>
    </>
  );
}