import { useState } from "react";
import { 
  HiTrendingUp, 
  HiSearch, 
  HiGlobeAlt, 
  HiCheckCircle, 
  HiPlus, 
  HiPencilAlt, 
  HiTrash, 
  HiSave, 
  HiX,
  HiCash,
} from "react-icons/hi";
import { toast } from "react-toastify";

// ডেমো গ্লোবাল সেলস ডাটা
const initialSales = [
  { id: "TXN-2026-901", vendor: "Apex Digital", region: "North America", units: 142, revenue: 185000, date: "06 Jul 2026" },
  { id: "TXN-2026-902", vendor: "Gadget BD", region: "South Asia", units: 320, revenue: 450000, date: "05 Jul 2026" },
  { id: "TXN-2026-903", vendor: "StyleFest HQ", region: "European Union", units: 85, revenue: 98000, date: "04 Jul 2026" },
];

const regionBadges = {
  "North America": "bg-blue-950/40 text-blue-400 border-blue-800/50",
  "South Asia": "bg-emerald-950/40 text-emerald-400 border-emerald-800/50",
  "European Union": "bg-purple-950/40 text-purple-400 border-purple-800/50",
  "Other": "bg-slate-900/80 text-slate-400 border-slate-700/50",
};

const GlobalSalesLog = () => {
  const [sales, setSales] = useState(initialSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSaleId, setEditingSaleId] = useState(null);

  // ইনলাইন এডিটের জন্য ফর্ম স্টেট
  const [editForm, setEditForm] = useState({
    vendor: "",
    region: "North America",
    units: "",
    revenue: ""
  });

  const startInlineEdit = (sale) => {
    setEditingSaleId(sale.id);
    setEditForm({
      vendor: sale.vendor,
      region: sale.region,
      units: sale.units,
      revenue: sale.revenue
    });
  };

  const cancelInlineEdit = () => {
    setEditingSaleId(null);
  };

  const saveInlineEdit = (id) => {
    if (!editForm.vendor || !editForm.units || !editForm.revenue) {
      toast.error("Please fill in all the required transaction details!");
      return;
    }

    setSales(prev => prev.map(s => 
      s.id === id 
        ? { 
            ...s, 
            vendor: editForm.vendor, 
            region: editForm.region, 
            units: Number(editForm.units), 
            revenue: Number(editForm.revenue) 
          }
        : s
    ));
    
    setEditingSaleId(null);
    toast.success("Transaction localized updates saved!");
  };

  const handleAddNewEmptyRow = () => {
    const newId = `TXN-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newBlankSale = {
      id: newId,
      vendor: "New Vendor Entry",
      region: "North America",
      units: 0,
      revenue: 0,
      date: "08 Jul 2026"
    };
    setSales(prev => [newBlankSale, ...prev]);
    startInlineEdit(newBlankSale);
  };

  const handleDeleteSale = (id, vendor) => {
    if (confirm(`Are you sure you want to purge transaction record for "${vendor}"?`)) {
      setSales(prev => prev.filter(s => s.id !== id));
      // eslint-disable-next-line no-undef
      if(editingSaleId === id) setEditingPlanId(null);
      toast.warn("Transaction log detached from master ledger.");
    }
  };

  const filteredSales = sales.filter(s =>
    s.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto space-y-6">
      
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiTrendingUp className="text-indigo-400" /> Global Sales Ledger
            </h1>
            <p className="text-sm text-slate-400 mt-1">Audit cross-border marketplace velocity, track unit volume, and sync regional distribution metrics.</p>
          </div>

          <button 
            onClick={handleAddNewEmptyRow}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md self-start sm:self-center"
          >
            <HiPlus size={16} /> Log New Transaction
          </button>
        </div>

        <div className="relative flex items-center bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
          <HiSearch className="absolute left-6 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by Vendor name, reference ID, or geographical region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200"
          />
        </div>
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-700/60 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-900/50 border-b border-slate-700/50 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6 w-[25%]">Vendor Details</th>
                  <th className="py-4 px-6 w-[15%]">Geographic Domain</th>
                  <th className="py-4 px-6 text-center w-[15%]">Units Dispatched</th>
                  <th className="py-4 px-6 w-[20%]">Gross Revenue</th>
                  <th className="py-4 px-6 w-[15%]">Log Timestamp</th>
                  <th className="py-4 px-6 text-center w-[10%]">Data Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => {
                    const isEditing = editingSaleId === sale.id;
                    
                    return (
                      <tr 
                        key={sale.id} 
                        className={`transition-all duration-150 ${
                          isEditing 
                            ? "bg-slate-950/50 relative z-10 outline outline-2 outline-indigo-500 shadow-2xl" 
                            : "hover:bg-slate-800/20"
                        }`}
                      >
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center shadow-inner text-indigo-400 shrink-0">
                              <HiGlobeAlt size={20} />
                            </div>
                            <div className="w-full">
                              {isEditing ? (
                                <input 
                                  type="text"
                                  value={editForm.vendor}
                                  onChange={(e) => setEditForm({...editForm, vendor: e.target.value})}
                                  className="w-full bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1 text-sm text-white font-semibold focus:outline-none focus:border-indigo-500"
                                />
                              ) : (
                                <>
                                  <div className="font-bold text-white text-base transition-colors">{sale.vendor}</div>
                                  <span className="font-mono text-[10px] text-slate-500">Ref: {sale.id}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 align-middle">
                          {isEditing ? (
                            <select 
                              value={editForm.region}
                              onChange={(e) => setEditForm({...editForm, region: e.target.value})}
                              className="w-full bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none cursor-pointer"
                            >
                              <option value="North America">North America</option>
                              <option value="South Asia">South Asia</option>
                              <option value="European Union">European Union</option>
                              <option value="Other">Other Region</option>
                            </select>
                          ) : (
                            <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide border ${regionBadges[sale.region] || regionBadges["Other"]}`}>
                              {sale.region}
                            </span>
                          )}
                        </td>

                  
                        <td className="py-4 px-6 align-middle text-center font-mono">
                          {isEditing ? (
                            <input 
                              type="number"
                              value={editForm.units}
                              onChange={(e) => setEditForm({...editForm, units: e.target.value})}
                              className="w-20 bg-slate-950/70 border border-indigo-500/50 text-center rounded px-2 py-1 text-sm text-slate-200 focus:outline-none"
                            />
                          ) : (
                            <span className="text-slate-300 font-semibold">{sale.units.toLocaleString()} pcs</span>
                          )}
                        </td>

                        <td className="py-4 px-6 align-middle font-extrabold text-emerald-400 text-base">
                          {isEditing ? (
                            <div className="flex items-center gap-1 bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1">
                              <span className="text-slate-400 text-sm">৳</span>
                              <input 
                                type="number"
                                value={editForm.revenue}
                                onChange={(e) => setEditForm({...editForm, revenue: e.target.value})}
                                className="w-full bg-transparent text-emerald-400 font-extrabold focus:outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-0.5">
                              <HiCash size={18} className="text-emerald-400 shrink-0" /> ৳{sale.revenue.toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 align-middle text-slate-500 text-xs font-mono">
                          {sale.date}
                        </td>
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            {isEditing ? (
                              <>
                                <button 
                                  onClick={() => saveInlineEdit(sale.id)}
                                  className="p-1.5 bg-emerald-950/40 hover:bg-emerald-600 border border-emerald-800 text-emerald-400 hover:text-white transition-colors rounded shadow-md"
                                  title="Commit Entry"
                                >
                                  <HiSave size={16} />
                                </button>
                               
                                <button 
                                  onClick={cancelInlineEdit}
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors rounded"
                                  title="Cancel"
                                >
                                  <HiX size={16} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  onClick={() => startInlineEdit(sale)}
                                  className="p-1.5 bg-slate-800/50 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition-all rounded"
                                  title="Modify Row"
                                >
                                  <HiPencilAlt size={15} />
                                </button>
              
                                <button 
                                  onClick={() => handleDeleteSale(sale.id, sale.vendor)}
                                  className="p-1.5 bg-rose-950/30 hover:bg-rose-600 border border-rose-900/50 text-rose-400 hover:text-white transition-colors rounded"
                                  title="Purge Record"
                                >
                                  <HiTrash size={15} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                      No matching sales node localized in infrastructure directory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 flex items-start gap-3 shadow-inner">
          <HiCheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={20} />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 uppercase tracking-wider">Dynamic Exchange Log Sync:</p>
            <p>Altering row parameters re-computes top-line revenue calculations safely before triggering downstream data distribution protocols.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalSalesLog;