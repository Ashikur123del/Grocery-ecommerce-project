import { useState } from "react";
import {
  HiCreditCard,
  HiSearch,
  HiClock,
  HiCheck,
  HiX,
  HiRefresh,
  HiDownload,
  HiCash,
} from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

const initialPayouts = [
  {
    id: "POT-2026-883",
    vendor: "Apex Digital",
    amount: 45000,
    method: "Bkash (Merchant)",
    requestedAt: "12 Jan 2026",
    status: "Pending",
  },
  {
    id: "POT-2026-882",
    vendor: "Gadget BD",
    amount: 128000,
    method: "City Bank (BEFTN)",
    requestedAt: "28 Feb 2026",
    status: "Approved",
  },
  {
    id: "POT-2026-881",
    vendor: "StyleFest HQ",
    amount: 15500,
    method: "Nagad",
    requestedAt: "15 Mar 2026",
    status: "Rejected",
  },
];

const statusStyles = {
  Pending: "bg-amber-950/40 text-amber-400 border-amber-800/50",
  Approved: "bg-emerald-950/40 text-emerald-400 border-emerald-800/50",
  Rejected: "bg-rose-950/40 text-rose-400 border-rose-800/50",
};

const VendorPayouts = () => {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [searchTerm, setSearchTerm] = useState("");

  const [editingPayoutId, setEditingPayoutId] = useState(null);
  const [editStatus, setEditStatus] = useState("Pending");

  const startStatusEdit = (payout) => {
    setEditingPayoutId(payout.id);
    setEditStatus(payout.status);
  };

  const saveStatusEdit = (id) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: editStatus } : p)),
    );
    setEditingPayoutId(null);
  };

  const filteredPayouts = payouts.filter(
    (p) =>
      p.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiCreditCard className="text-indigo-400" /> Vendor Payouts Ledger
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Review vendor disbursement requests, audit payout logs, and
              transition gateway statuses.
            </p>
          </div>

          <button
            onClick={() => alert("Exporting master payout sheet...")}
            className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md self-start sm:self-center border border-slate-700"
          >
            <HiDownload size={16} /> Export CSV
          </button>
        </div>

        <div className="relative flex items-center bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
          <HiSearch className="absolute left-6 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions by Vendor name or Reference ID..."
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
                  <th className="py-4 px-6 w-[15%]">Disbursement Amount</th>
                  <th className="py-4 px-6 w-[20%]">Payment Channel</th>
                  <th className="py-4 px-6 w-[15%]">Request Timestamp</th>
                  <th className="py-4 px-6 text-center w-[15%]">
                    Gateway Status
                  </th>
                  <th className="py-4 px-6 text-center w-[10%]">
                    Data Controls
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {filteredPayouts.length > 0 ? (
                  filteredPayouts.map((payout) => {
                    const isEditing = editingPayoutId === payout.id;

                    return (
                      <tr
                        key={payout.id}
                        className={`transition-all duration-150 ${
                          isEditing
                            ? "bg-slate-950/50 relative z-10 outline outline-2 outline-indigo-500 shadow-2xl"
                            : "hover:bg-slate-800/20"
                        }`}
                      >
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400 text-lg font-black">
                              {payout.vendor.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white text-base transition-colors">
                                {payout.vendor}
                              </div>
                              <span className="font-mono text-[10px] text-slate-500">
                                Ref: {payout.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 align-middle font-extrabold text-emerald-400 text-base">
                          <span className="inline-flex items-center gap-0.5">
                            <HiCash
                              size={18}
                              className="text-emerald-400 shrink-0"
                            />{" "}
                            ৳{payout.amount.toLocaleString()}
                          </span>
                        </td>

                        <td className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {payout.method}
                        </td>

                        <td className="py-4 px-6 align-middle text-slate-500 text-xs font-mono">
                          {payout.requestedAt}
                        </td>

                        <td className="py-4 px-6 align-middle text-center">
                          {isEditing ? (
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              className="bg-slate-950/70 border border-indigo-500/50 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none cursor-pointer font-semibold shadow-inner mx-auto block"
                            >
                              <option value="Pending">
                                <MdAccessTime /> Pending
                              </option>
                              <option value="Approved">
                                <TiTickOutline /> Approved
                              </option>
                              <option value="Rejected">
                                <GrClose /> Rejected
                              </option>
                            </select>
                          ) : (
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide border ${statusStyles[payout.status]}`}
                            >
                              {payout.status === "Pending" && <MdAccessTime />}
                              {payout.status === "Approved" && (
                                <TiTickOutline />
                              )}
                              {payout.status === "Rejected" && <GrClose />}
                              {payout.status}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 align-middle text-center">
                          <div className="flex items-center justify-center gap-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => saveStatusEdit(payout.id)}
                                  className="p-1.5 bg-emerald-950/40 hover:bg-emerald-600 border border-emerald-800 text-emerald-400 hover:text-white transition-colors rounded shadow-md"
                                  title="Commit Status Update"
                                >
                                  <HiCheck size={16} />
                                </button>

                                <button
                                  onClick={() => setEditingPayoutId(null)}
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors rounded"
                                  title="Cancel State Transition"
                                >
                                  <HiX size={16} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => startStatusEdit(payout)}
                                className="p-1.5 bg-slate-800/50 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition-all rounded"
                                title="Modify Payout Status Inline"
                              >
                                <HiRefresh size={15} />
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
                      colSpan="6"
                      className="py-8 text-center text-slate-500 font-medium"
                    >
                      No matching payout logs localized in active directory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 flex items-start gap-3 shadow-inner">
          <HiClock className="text-amber-500 mt-0.5 shrink-0" size={20} />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 uppercase tracking-wider">
              Gateway Disbursement Protection Protocol:
            </p>
            <p>
              Moving a ledger line item to{" "}
              <span className="text-emerald-400 font-semibold">Approved</span>{" "}
              dispatches an API node to integrated digital wallet channels.
              Double-check destination merchant tokens prior to shifting states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPayouts;
