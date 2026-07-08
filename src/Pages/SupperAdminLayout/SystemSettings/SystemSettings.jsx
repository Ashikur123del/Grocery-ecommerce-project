import { useState } from "react";
import {
  HiCog,
  HiSearch,
  HiCheckCircle,
  HiXCircle,
  HiPencilAlt,
  HiSave,
  HiX,
  HiAdjustments,
  HiLockClosed,
} from "react-icons/hi";
import { toast } from "react-toastify";

const initialSettings = [
  {
    id: "SET-01",
    key: "Platform Commission Rate",
    value: "12",
    category: "Financial",
    description:
      "Global percentage deduction from each successful vendor transaction.",
  },
  {
    id: "SET-02",
    key: "Base Currency Node",
    value: "BDT (৳)",
    category: "Localization",
    description: "Default store currency rendered across checkout gateways.",
  },
  {
    id: "SET-03",
    key: "System Maintenance Mode",
    value: "Disabled",
    category: "Infrastructure",
    description:
      "Toggles global storefront visibility during critical hotfixes.",
  },
  {
    id: "SET-04",
    key: "Token Expiry Threshold",
    value: "168 Hours",
    category: "Security",
    description:
      "Session longevity lifespan for security authorization cookies.",
  },
];

const categoryBadges = {
  Financial: "bg-emerald-950/40 text-emerald-400 border-emerald-800/50",
  Localization: "bg-cyan-950/40 text-cyan-400 border-cyan-800/50",
  Infrastructure: "bg-amber-950/40 text-amber-400 border-amber-800/50",
  Security: "bg-purple-950/40 text-purple-400 border-purple-800/50",
};

const SystemSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSettingId, setEditingSettingId] = useState(null);

  const [editValue, setEditValue] = useState("");

  const startInlineEdit = (setting) => {
    setEditingSettingId(setting.id);
    setEditValue(setting.value);
  };

  const cancelInlineEdit = () => {
    setEditingSettingId(null);
  };

  const saveInlineEdit = (id) => {
    if (!editValue.trim()) {
      toast.error("Configuration value cannot be empty!");
      return;
    }

    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: editValue } : s)),
    );

    setEditingSettingId(null);
    toast.success("System variable updated globally!");
  };

  const filteredSettings = settings.filter(
    (s) =>
      s.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiCog className="text-indigo-400" /> System Environment Variables
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Configure global runtime configurations, tax rules, and
              infrastructure parameters instantly.
            </p>
          </div>

          <div className="text-xs font-mono bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-700/50 text-slate-400 flex items-center gap-1.5 self-start sm:self-center">
            <HiLockClosed className="text-amber-500" /> Active Layer: Production
          </div>
        </div>

        <div className="relative flex items-center bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
          <HiSearch className="absolute left-6 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Filter keys by configuration variable or infrastructure node category..."
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
                  <th className="py-4 px-6 w-[25%]">Configuration Key</th>
                  <th className="py-4 px-6 w-[15%]">Environment Domain</th>
                  <th className="py-4 px-6 w-[20%]">Active Parameter Value</th>
                  <th className="py-4 px-6 w-[30%]">
                    Variable Metadata & Impact
                  </th>
                  <th className="py-4 px-6 text-center w-[10%]">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {filteredSettings.length > 0 ? (
                  filteredSettings.map((setting) => {
                    const isEditing = editingSettingId === setting.id;

                    return (
                      <tr
                        key={setting.id}
                        className={`transition-all duration-150 ${
                          isEditing
                            ? "bg-slate-950/50 relative z-10 outline outline-2 outline-indigo-500 shadow-2xl"
                            : "hover:bg-slate-800/20"
                        }`}
                      >
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400 shadow-inner shrink-0">
                              <HiAdjustments size={18} />
                            </div>
                            <div>
                              <div className="font-bold text-white text-base transition-colors">
                                {setting.key}
                              </div>
                              <span className="font-mono text-[10px] text-slate-500">
                                {setting.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 align-middle">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide border ${categoryBadges[setting.category]}`}
                          >
                            {setting.category}
                          </span>
                        </td>

                        <td className="py-4 px-6 align-middle font-mono">
                          {isEditing ? (
                            setting.key === "System Maintenance Mode" ? (
                              <div className="relative w-full max-w-[180px]">
                                <div
                                  onClick={() =>
                                    setEditValue(
                                      editValue === "Enabled"
                                        ? "Disabled"
                                        : "Enabled",
                                    )
                                  }
                                  className="flex items-center justify-between bg-slate-950/70 border border-indigo-500/50 rounded px-3 py-1.5 cursor-pointer hover:border-indigo-400 transition-all select-none"
                                >
                                  <div className="flex items-center gap-2">
                                    {editValue === "Enabled" ? (
                                      <>
                                        <HiXCircle
                                          className="text-rose-500 shrink-0"
                                          size={18}
                                        />
                                        <span className="text-rose-400 font-bold text-sm">
                                          Enabled
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <HiCheckCircle
                                          className="text-emerald-500 shrink-0"
                                          size={18}
                                        />
                                        <span className="text-emerald-400 font-bold text-sm">
                                          Disabled
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <span className="text-[9px] text-slate-500 bg-slate-900 px-1 py-0.5 rounded border border-slate-800 uppercase font-mono">
                                    Toggle
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full bg-slate-950/70 border border-indigo-500/50 text-indigo-400 font-bold rounded px-2 py-1 text-sm focus:outline-none focus:border-indigo-500"
                              />
                            )
                          ) : (
                            <div className="flex items-center gap-2">
                              {setting.key === "System Maintenance Mode" &&
                                (setting.value === "Enabled" ? (
                                  <HiXCircle
                                    className="text-rose-500"
                                    size={18}
                                  />
                                ) : (
                                  <HiCheckCircle
                                    className="text-emerald-500"
                                    size={18}
                                  />
                                ))}
                              <span
                                className={`text-base font-bold ${
                                  setting.value === "Enabled"
                                    ? "text-rose-400"
                                    : "text-indigo-400"
                                }`}
                              >
                                {setting.key === "Platform Commission Rate"
                                  ? `৳ ${setting.value}%`
                                  : setting.value}
                              </span>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-6 align-middle text-slate-400 text-xs leading-relaxed">
                          {setting.description}
                        </td>

                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => saveInlineEdit(setting.id)}
                                  className="p-1.5 bg-emerald-950/40 hover:bg-emerald-600 border border-emerald-800 text-emerald-400 hover:text-white transition-colors rounded shadow-md"
                                  title="Commit Parameter Change"
                                >
                                  <HiSave size={16} />
                                </button>

                                <button
                                  onClick={cancelInlineEdit}
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors rounded"
                                  title="Drop State Changes"
                                >
                                  <HiX size={16} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => startInlineEdit(setting)}
                                className="p-1.5 bg-slate-800/50 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition-all rounded"
                                title="Override Dynamic Value"
                              >
                                <HiPencilAlt size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-slate-500 font-medium"
                    >
                      No matching environment settings found in live namespace.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 flex items-start gap-3 shadow-inner">
          <HiCheckCircle
            className="text-emerald-500 mt-0.5 shrink-0"
            size={20}
          />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 uppercase tracking-wider">
              Dynamic Cache Invalidation Protocol:
            </p>
            <p>
              Modifying variables updates the cluster registry in real-time.
              Make sure to audit dependency hooks before saving global
              configurations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
