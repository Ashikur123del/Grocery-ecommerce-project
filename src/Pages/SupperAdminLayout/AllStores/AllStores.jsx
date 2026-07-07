
import { useState } from "react";
import { 
  HiSearch, 
  HiFilter, 
  HiCheckCircle, 
  HiXCircle, 
  HiEye, 
  HiOfficeBuilding, 
  HiBadgeCheck 
} from "react-icons/hi";

const initialStoresData = [
  { id: "STR-001", name: "Daily Bazar", owner: "Rahat Karim", email: "rahat@dailybazar.com", category: "Grocery", totalProducts: 342, totalSales: 245000, status: "Active", joinedDate: "12 Jan 2026" },
  { id: "STR-004", name: "Gadget Zone", owner: "Asif Rahman", email: "asif@gadgetzone.com", category: "Electronics", totalProducts: 120, totalSales: 198000, status: "Active", joinedDate: "28 Feb 2026" },
  { id: "STR-019", name: "Fashion Craft", owner: "Nusrat Jahan", email: "nusrat@fcraft.com", category: "Clothing", totalProducts: 512, totalSales: 165000, status: "Pending", joinedDate: "02 Jul 2026" },
  { id: "STR-008", name: "Organic Foods", owner: "Sajid Islam", email: "sajid@organic.com", category: "Grocery", totalProducts: 85, totalSales: 142000, status: "Active", joinedDate: "15 Mar 2026" },
  { id: "STR-022", name: "Apex Tech", owner: "Tanvir Ahmed", email: "tanvir@apex.com", category: "Electronics", totalProducts: 45, totalSales: 0, status: "Pending", joinedDate: "05 Jul 2026" },
  { id: "STR-011", name: "Chaldal Copy", owner: "Mizanur Rahman", email: "mizan@copy.com", category: "Grocery", totalProducts: 12, totalSales: 45000, status: "Blocked", joinedDate: "01 Dec 2025" },
];

const statusStyles = {
  Active: "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50",
  Pending: "bg-amber-950/40 text-amber-400 border border-amber-800/50",
  Blocked: "bg-rose-950/40 text-rose-400 border border-rose-800/50",
};

const AllStores = () => {
  const [stores, setStores] = useState(initialStoresData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setStores(prevStores =>
      prevStores.map(store =>
        store.id === id ? { ...store, status: newStatus } : store
      )
    );
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          store.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          store.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || store.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
      <div className="container mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <HiOfficeBuilding className="text-indigo-400" /> Store Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">Manage, approve, suspension and monitor all vendor storefronts live on the network.</p>
          </div>
          <div className="bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700 text-sm font-semibold">
            Total Live System Stores: <span className="text-indigo-400 font-extrabold">{stores.length}</span>
          </div>
        </div>

        {/* Search and Filters Controller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
          <div className="relative flex items-center col-span-2">
            <HiSearch className="absolute left-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Store Name, Owner, or Store ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-slate-200"
            />
          </div>

          <div className="relative flex items-center bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-300">
            <HiFilter className="text-indigo-400 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none w-full cursor-pointer"
            >
              <option value="All" className="bg-slate-800">All Statuses</option>
              <option value="Active" className="bg-slate-800">Active Only</option>
              <option value="Pending" className="bg-slate-800">Pending Approvals</option>
              <option value="Blocked" className="bg-slate-800">Blocked/Suspended</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-700/60 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/50 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700 tracking-wider">
                <tr>
                  <th className="py-4 px-5">Store Info</th>
                  <th className="py-4 px-5">Merchant / Owner</th>
                  <th className="py-4 px-5">Category</th>
                  <th className="py-4 px-5 text-center">Items</th>
                  <th className="py-4 px-5">Total Gross Sales</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40 text-slate-300">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <tr key={store.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-semibold text-white text-base flex items-center gap-1.5">
                          {store.name} 
                          {store.status === "Active" && <HiBadgeCheck className="text-blue-400" title="Verified Store" />}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{store.id} • Joined {store.joinedDate}</div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="font-medium text-slate-200">{store.owner}</div>
                        <div className="text-xs text-slate-500">{store.email}</div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="bg-slate-900/60 px-2.5 py-1 rounded-md text-xs border border-slate-700">
                          {store.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-center font-semibold text-slate-400">
                        {store.totalProducts}
                      </td>
                      <td className="py-4 px-5 font-bold text-emerald-400">
                        ৳{store.totalSales.toLocaleString()}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${statusStyles[store.status]}`}>
                          {store.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 bg-slate-700/50 hover:bg-slate-600 border border-slate-600 rounded text-slate-300 hover:text-white transition-colors" title="View Store Shop">
                            <HiEye size={16} />
                          </button>
                          {store.status !== "Active" && (
                            <button 
                              onClick={() => handleStatusChange(store.id, "Active")}
                              className="p-1.5 bg-emerald-950/60 hover:bg-emerald-600 border border-emerald-800 text-emerald-400 hover:text-white transition-colors rounded" 
                              title="Approve Store"
                            >
                              <HiCheckCircle size={16} />
                            </button>
                          )}

                          {store.status !== "Blocked" && (
                            <button 
                              onClick={() => handleStatusChange(store.id, "Blocked")}
                              className="p-1.5 bg-rose-950/60 hover:bg-rose-600 border border-rose-800 text-rose-400 hover:text-white transition-colors rounded" 
                              title="Block Store"
                            >
                              <HiXCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 font-medium">
                      No stores found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllStores;