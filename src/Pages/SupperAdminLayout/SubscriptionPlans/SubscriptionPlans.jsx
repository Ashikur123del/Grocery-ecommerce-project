import { useState } from "react";
import { 
  HiCurrencyDollar, 
  HiCheckCircle, 
  HiPlus, 
  HiPencilAlt, 
  HiTrash, 
  HiSearch, 
  HiLightningBolt, 
  HiShieldCheck, 
  HiBriefcase,
  HiSave,
  HiX,
  HiCash
} from "react-icons/hi";
import { toast } from "react-toastify";

const initialPlans = [
  { id: "PLN-2026-01", name: "Basic Starter", price: 6000, billing: "Monthly", activeVendors: 45, features: "50 Products, 1 Storefront, Standard Support", tier: "Starter" },
  { id: "PLN-2026-02", name: "Growth Pro", price: 3500, billing: "Monthly", activeVendors: 120, features: "Unlimited Products, 3 Storefronts, Premium Support", tier: "Pro" },
  { id: "PLN-2026-03", name: "Enterprise SaaS", price: 32000, billing: "Yearly", activeVendors: 18, features: "White-label Domain, Dedicated DB, Custom Gateway", tier: "Enterprise" },
];

const tierIcons = {
  Starter: <HiBriefcase className="text-slate-400" size={18} />,
  Pro: <HiLightningBolt className="text-amber-400" size={18} />,
  Enterprise: <HiShieldCheck className="text-indigo-400" size={18} />,
};

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPlanId, setEditingPlanId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    billing: "Monthly",
    tier: "Starter",
    features: ""
  });

  const startInlineEdit = (plan) => {
    setEditingPlanId(plan.id);
    setEditForm({
      name: plan.name,
      price: plan.price,
      billing: plan.billing,
      tier: plan.tier,
      features: plan.features
    });
  };
  
  const cancelInlineEdit = () => {
    setEditingPlanId(null);
  };

  const saveInlineEdit = (id) => {
    if (!editForm.name || !editForm.price) {
      toast.error("Please fill in the Package Name and Price!");
      return;
    }

    setPlans(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            name: editForm.name, 
            price: Number(editForm.price), 
            billing: editForm.billing, 
            tier: editForm.tier, 
            features: editForm.features 
          }
        : p
    ));
    
    setEditingPlanId(null);
    toast.success("Package details updated successfully!");
  };

  const handleAddNewEmptyRow = () => {
    const newId = `PLN-2026-${Math.floor(10 + Math.random() * 90)}`;
    const newBlankPlan = {
      id: newId,
      name: "New Package",
      price: 0,
      billing: "Monthly",
      activeVendors: 0,
      features: "Standard Platform Access",
      tier: "Starter"
    };
    setPlans(prev => [newBlankPlan, ...prev]);
    startInlineEdit(newBlankPlan);
  };

  const handleDeletePlan = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setPlans(prev => prev.filter(p => p.id !== id));
      if(editingPlanId === id) setEditingPlanId(null);
      toast.info("Package removed from ecosystem.");
    }
  };

  const filteredPlans = plans.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto space-y-6">
        
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiCurrencyDollar className="text-indigo-400" /> Subscription Framework
            </h1>
            <p className="text-sm text-slate-400 mt-1">Configure SaaS pricing layers instantly within the active datagrid rows.</p>
          </div>

          <button 
            onClick={handleAddNewEmptyRow}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md self-start sm:self-center"
          >
            <HiPlus size={16} /> Add Quick Row
          </button>
        </div>

        {/* Search Input Controller */}
        <div className="relative flex items-center bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
          <HiSearch className="absolute left-6 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search packages by Tier name or Plan level..."
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
                  <th className="py-4 px-6 w-[25%]">Package Identity</th>
                  <th className="py-4 px-6 w-[15%]">Pricing Strategy</th>
                  <th className="py-4 px-6 w-[15%]">Billing Cycle</th>
                  <th className="py-4 px-6 text-center w-[12%]">Active Enrolled</th>
                  <th className="py-4 px-6 w-[23%]">Core Guardrails & Features</th>
                  <th className="py-4 px-6 text-center w-[10%]">Data Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => {
                    const isEditing = editingPlanId === plan.id;
                    
                    return (
                      <tr 
                        key={plan.id} 
                        className={`transition-all duration-150 ${
                          isEditing 
                            ? "bg-slate-950/50 relative z-10 outline outline-2 outline-indigo-500 shadow-2xl" 
                            : "hover:bg-slate-800/20"
                        }`}
                      >
                
                        {/* 1. Package Name and Tier Dropdown */}
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center shadow-inner shrink-0">
                              {isEditing ? tierIcons[editForm.tier] : tierIcons[plan.tier]}
                            </div>
                            <div className="w-full">
                              {isEditing ? (
                                <div className="space-y-1.5 w-full">
                                  <input 
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    className="w-full bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1 text-sm text-white font-semibold focus:outline-none focus:border-indigo-500"
                                  />
                                  <select 
                                    value={editForm.tier}
                                    onChange={(e) => setEditForm({...editForm, tier: e.target.value})}
                                    className="w-full bg-slate-950/70 border border-slate-700 rounded px-2 py-1 text-xs text-slate-400 focus:outline-none cursor-pointer"
                                  >
                                    <option value="Starter">Starter Core Tier</option>
                                    <option value="Pro">Pro Advanced Tier</option>
                                    <option value="Enterprise">Enterprise SaaS Tier</option>
                                  </select>
                                </div>
                              ) : (
                                <>
                                  <div className="font-bold text-white text-base transition-colors">{plan.name}</div>
                                  <span className="font-mono text-[10px] text-slate-500">Ref: {plan.id}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 align-middle font-extrabold text-emerald-400 text-base">
                          {isEditing ? (
                            <div className="flex items-center gap-1 bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1">
                              <span className="text-slate-400 text-sm">৳</span>
                              <input 
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                                className="w-full bg-transparent text-emerald-400 font-extrabold focus:outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-0.5">
                              <HiCash size={18} className="text-emerald-400 shrink-0" /> ৳{plan.price.toLocaleString()}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 align-middle">
                          {isEditing ? (
                            <select 
                              value={editForm.billing}
                              onChange={(e) => setEditForm({...editForm, billing: e.target.value})}
                              className="w-full bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none cursor-pointer"
                            >
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </select>
                          ) : (
                            <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide border ${
                              plan.billing === "Yearly" 
                                ? "bg-cyan-950/40 text-cyan-400 border-cyan-800/50" 
                                : "bg-slate-900/50 text-slate-400 border-slate-700/50"
                            }`}>
                              {plan.billing}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 align-middle text-center">
                          <span className="font-semibold text-slate-300 text-sm bg-slate-950/40 px-3 py-1 rounded-full border border-slate-700/40 shadow-inner">
                            {plan.activeVendors} stores
                          </span>
                        </td>

                        <td className="py-4 px-6 align-middle">
                          {isEditing ? (
                            <input 
                              type="text"
                              value={editForm.features}
                              onChange={(e) => setEditForm({...editForm, features: e.target.value})}
                              className="w-full bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                              placeholder="Features info..."
                            />
                          ) : (
                            <div className="text-sm text-slate-400 truncate max-w-[240px]" title={plan.features}>
                              {plan.features}
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            {isEditing ? (
                              <>
                                <button 
                                  onClick={() => saveInlineEdit(plan.id)}
                                  className="p-1.5 bg-emerald-950/40 hover:bg-emerald-600 border border-emerald-800 text-emerald-400 hover:text-white transition-colors rounded shadow-md"
                                  title="Save"
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
                                  onClick={() => startInlineEdit(plan)}
                                  className="p-1.5 bg-slate-800/50 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition-all rounded"
                                  title="Edit"
                                >
                                  <HiPencilAlt size={15} />
                                </button>
              
                                <button 
                                  onClick={() => handleDeletePlan(plan.id, plan.name)}
                                  className="p-1.5 bg-rose-950/30 hover:bg-rose-600 border border-rose-900/50 text-rose-400 hover:text-white transition-colors rounded"
                                  title="Delete"
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
                      No matching packages localized in active workspace directory.
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
            <p className="font-bold text-slate-300 uppercase tracking-wider">Inline Grid Protocol:</p>
            <p>Row isolation (<span className="text-indigo-400 font-semibold">Indigo border highlight</span>) keeps active focus without full-screen modal overlays.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPlans;