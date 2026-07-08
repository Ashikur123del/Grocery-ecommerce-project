import { useState } from "react";
import { 
  HiSearch, 
  HiMail, 
  HiPhone, 
  HiUserCircle, 
  HiCash, 
  HiOfficeBuilding, 
  HiChevronRight
} from "react-icons/hi";

const initialVendors = [
  { id: "VND-2026-01", name: "Rahat Karim", email: "rahat@dailybazar.com", phone: "01712345678", storesCount: 2, totalPayouts: 185000, district: "Dhaka", joinedDate: "12 Jan 2026" },
  { id: "VND-2026-04", name: "Asif Rahman", email: "asif@gadgetzone.com", phone: "01898765432", storesCount: 1, totalPayouts: 142000, district: "Chittagong", joinedDate: "28 Feb 2026" },
  { id: "VND-2026-08", name: "Sajid Islam", email: "sajid@organic.com", phone: "01555443322", storesCount: 1, totalPayouts: 98000, district: "Sylhet", joinedDate: "15 Mar 2026" },
  { id: "VND-2026-12", name: "Nusrat Jahan", email: "nusrat@fcraft.com", phone: "01911223344", storesCount: 3, totalPayouts: 215000, district: "Dhaka", joinedDate: "02 Jul 2026" },
  { id: "VND-2026-15", name: "Dr. Ariful Islam", email: "arif@medilink.com", phone: "01677889900", storesCount: 1, totalPayouts: 0, district: "Rajshahi", joinedDate: "07 Jul 2026" },
];

const VendorsDirectory = () => {
  const [vendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
      <div className="container mx-auto space-y-6">
        
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiUserCircle className="text-indigo-400" /> Vendors Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">Global merchant registry. View personal profiles, total stores owned, and lifetime platform payouts.</p>
          </div>
          <div className="bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700 text-sm font-semibold">
            Total Registered Merchants: <span className="text-indigo-400 font-extrabold">{vendors.length}</span>
          </div>
        </div>

        <div className="relative flex items-center bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
          <HiSearch className="absolute left-6 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by Merchant Name, Vendor ID, or Email Address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-slate-200"
          />
        </div>

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div 
                key={vendor.id} 
                className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg flex flex-col justify-between hover:border-slate-500 transition-all group"
              >
                <div>
      
                  <div className="flex items-center gap-3 border-b border-slate-700/50 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400 text-xl font-black">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{vendor.name}</h2>
                      <span className="text-xs text-slate-500 font-mono">{vendor.id}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-300 mb-5">
                    <div className="flex items-center gap-2 text-xs truncate">
                      <HiMail className="text-slate-500 shrink-0" size={16} />
                      <span className="text-slate-400">{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <HiPhone className="text-slate-500" size={16} />
                      <span className="text-slate-400">{vendor.phone}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      District Zone: <span className="text-slate-300 font-medium">{vendor.district}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-700/40 text-center">
                    <div className="border-r border-slate-700/40">
                      <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Owned Stores</span>
                      <span className="text-lg font-extrabold text-white flex items-center justify-center gap-1">
                        <HiOfficeBuilding size={16} className="text-cyan-400" /> {vendor.storesCount}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Total Payouts</span>
                      <span className="text-lg font-extrabold text-emerald-400 flex items-center justify-center gap-0.5">
                        <HiCash size={18} /> ৳{vendor.totalPayouts.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-500">
                  <span>Joined: {vendor.joinedDate}</span>
                  <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                    Manage Merchant <HiChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 font-medium">
            No merchant profiles found matching your search.
          </div>
        )}

      </div>
    </div>
  );
};

export default VendorsDirectory;