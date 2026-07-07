import { useState } from "react";
import { 
  HiClock, 
  HiCheck, 
  HiX, 
  HiIdentification, 
  HiDocumentText, 
  HiOfficeBuilding, 
  HiMail, 
  HiPhone 
} from "react-icons/hi";
import { toast } from "react-toastify";


const initialPendingStores = [
  { 
    id: "REQ-9921", 
    storeName: "Fashion Craft", 
    owner: "Nusrat Jahan", 
    email: "nusrat@fcraft.com", 
    phone: "01712345678", 
    category: "Clothing", 
    appliedDate: "Just now",
    nid: "4678912345",
    tradeLicense: "TR-2026-8891"
  },
  { 
    id: "REQ-9918", 
    storeName: "Apex Tech", 
    owner: "Tanvir Ahmed", 
    email: "tanvir@apex.com", 
    phone: "01898765432", 
    category: "Electronics", 
    appliedDate: "2 hours ago",
    nid: "1234567890",
    tradeLicense: "TR-2026-4412"
  },
  { 
    id: "REQ-9915", 
    storeName: "Medilink Pharmacy", 
    owner: "Dr. Ariful Islam", 
    email: "arif@medilink.com", 
    phone: "01555443322", 
    category: "Health & Beauty", 
    appliedDate: "Yesterday",
    nid: "9876543210",
    tradeLicense: "TR-2026-1105"
  },
];

const PendingApprovals = () => {
  const [pendingStores, setPendingStores] = useState(initialPendingStores);

  
  const handleApprove = (id, storeName) => {
    toast.success(`${storeName}has been successfully approved and activated!`);
    setPendingStores(prev => prev.filter(store => store.id !== id));
  };


  const handleReject = (id, storeName) => {
    const reason = prompt(`Enter rejection reason for ${storeName}:`);
    if (reason !== null) {
      toast.error(`Application for ${storeName} has been rejected.`);
      setPendingStores(prev => prev.filter(store => store.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
      <div className="container mx-auto space-y-6">
      
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiClock className="text-amber-400 animate-pulse" /> Pending Approvals
            </h1>
            <p className="text-sm text-slate-400 mt-1">Review merchant applications, verify legal documentation, and grant system access.</p>
          </div>
          <div className="bg-amber-950/40 text-amber-400 border border-amber-800/50 px-4 py-2 rounded-lg text-sm font-semibold">
            Awaiting Review: <span className="font-extrabold">{pendingStores.length} Applications</span>
          </div>
        </div>

        {pendingStores.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {pendingStores.map((store) => (
              <div 
                key={store.id} 
                className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-600 transition-all"
              >

                <div className="flex justify-between items-start border-b border-slate-700/50 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <HiOfficeBuilding className="text-indigo-400" size={20} />
                      {store.storeName}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Application ID: {store.id} • Applied {store.appliedDate}</p>
                  </div>
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-700 text-slate-300">
                    {store.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Merchant Contact</p>
                    <div className="font-semibold text-slate-200">{store.owner}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate"><HiMail size={14}/> {store.email}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400"><HiPhone size={14}/> {store.phone}</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Legal Documents</p>
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono">
                      <HiIdentification className="text-cyan-400" size={16} />
                      <div>
                        <span className="text-slate-500 block text-[10px]">NID / Passport</span>
                        <span className="text-slate-300">{store.nid}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono">
                      <HiDocumentText className="text-amber-400" size={16} />
                      <div>
                        <span className="text-slate-500 block text-[10px]">Trade License</span>
                        <span className="text-slate-300">{store.tradeLicense}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700/40">
                  <button 
                    onClick={() => handleReject(store.id, store.storeName)}
                    className="flex items-center gap-1.5 bg-rose-950/40 hover:bg-rose-600 border border-rose-800 text-rose-400 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                  >
                    <HiX size={14} /> Reject Request
                  </button>
                  <button 
                    onClick={() => handleApprove(store.id, store.storeName)}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md"
                  >
                    <HiCheck size={14} /> Approve & Activate
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/40 border border-slate-700/40 p-12 text-center rounded-xl">
            <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-inner">
              <HiCheck className="text-emerald-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Inbox Clean!</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">There are no pending vendor applications requiring approval at this moment.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PendingApprovals; 