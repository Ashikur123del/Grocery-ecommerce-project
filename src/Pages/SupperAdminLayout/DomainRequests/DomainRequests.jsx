import { useState } from "react";
import {
  HiGlobeAlt,
  HiCheckCircle,
  HiXCircle,
  HiRefresh,
  HiSearch,
  HiDatabase,
  HiArrowSmRight,
} from "react-icons/hi";
import { toast } from "react-toastify";

const initialDomainRequests = [
  {
    id: "DOM-771",
    storeName: "Daily Bazar",
    requestedDomain: "dailybazar.com.bd",
    currentStatus: "Pending",
    dnsConfigured: "Yes",
    requestedDate: "3 hours ago",
    ipTarget: "76.76.21.21",
  },
  {
    id: "DOM-768",
    storeName: "Gadget Zone",
    requestedDomain: "gadgetzone.shop",
    currentStatus: "Pending",
    dnsConfigured: "No",
    requestedDate: "Yesterday",
    ipTarget: "76.76.21.21",
  },
  {
    id: "DOM-755",
    storeName: "Organic Foods",
    requestedDomain: "organicfoods.net",
    currentStatus: "Connected",
    dnsConfigured: "Yes",
    requestedDate: "4 days ago",
    ipTarget: "76.76.21.21",
  },
  {
    id: "DOM-740",
    storeName: "Fashion Craft",
    requestedDomain: "fashioncraft.xyz",
    currentStatus: "Rejected",
    dnsConfigured: "No",
    requestedDate: "1 week ago",
    ipTarget: "76.76.21.21",
  },
];

const statusStyles = {
  Connected: "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50",
  Pending: "bg-amber-950/40 text-amber-400 border border-amber-800/50",
  Rejected: "bg-rose-950/40 text-rose-400 border border-rose-800/50",
};

const DomainRequests = () => {
  const [requests, setRequests] = useState(initialDomainRequests);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpdateStatus = (id, newStatus, domainName) => {
    toast.success(`Domain "${domainName}" status updated to ${newStatus}!`);
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, currentStatus: newStatus } : req,
      ),
    );
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.requestedDomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.storeName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
      <div className="container mx-auto space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2.5">
              <HiGlobeAlt className="text-indigo-400" /> Domain Routing Requests
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage custom domain mapping (CNAME/A Records) for enterprise
              vendor stores.
            </p>
          </div>
          <div className="bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700 text-sm font-semibold flex items-center gap-2">
            Server IP Target:{" "}
            <span className="text-cyan-400 font-mono">76.76.21.21</span>
          </div>
        </div>

        <div className="relative flex items-center bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
          <HiSearch className="absolute left-6 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by Requested Domain URL or Store Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-slate-200"
          />
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-700/60 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/50 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700 tracking-wider">
                <tr>
                  <th className="py-4 px-5">Origin Store</th>
                  <th className="py-4 px-5">Requested Custom Domain</th>
                  <th className="py-4 px-5">DNS Check (A Record)</th>
                  <th className="py-4 px-5">Requested Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-center">Routing Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40 text-slate-300">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="py-4 px-5 font-semibold text-white">
                        {req.storeName}
                        <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
                          ID: {req.id}
                        </span>
                      </td>

                      <td className="py-4 px-5 font-mono text-indigo-400 font-bold">
                        <a
                          href={`https://${req.requestedDomain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:underline"
                        >
                          {req.requestedDomain}{" "}
                          <HiArrowSmRight className="text-slate-500" />
                        </a>
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-full ${req.dnsConfigured === "Yes" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
                          />
                          <span className="text-xs text-slate-300">
                            {req.dnsConfigured === "Yes"
                              ? `Pointed to ${req.ipTarget}`
                              : "DNS Missing / Misconfigured"}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-5 text-xs text-slate-400">
                        {req.requestedDate}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${statusStyles[req.currentStatus]}`}
                        >
                          {req.currentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              toast.success(
                                `Re-checking live DNS records for ${req.requestedDomain}...`,
                              )
                            }
                            className="p-1.5 bg-slate-900/60 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors rounded"
                            title="Test DNS Connection Live"
                          >
                            <HiRefresh size={14} />
                          </button>

                          {req.currentStatus === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    req.id,
                                    "Connected",
                                    req.requestedDomain,
                                  )
                                }
                                className="p-1.5 bg-emerald-950/60 hover:bg-emerald-600 border border-emerald-800 text-emerald-400 hover:text-white transition-colors rounded"
                                title="Approve & Link Domain"
                              >
                                <HiCheckCircle size={15} />
                              </button>

                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    req.id,
                                    "Rejected",
                                    req.requestedDomain,
                                  )
                                }
                                className="p-1.5 bg-rose-950/60 hover:bg-rose-600 border border-rose-800 text-rose-400 hover:text-white transition-colors rounded"
                                title="Reject Domain Request"
                              >
                                <HiXCircle size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-8 text-center text-slate-500 font-medium"
                    >
                      No custom domain routing requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl flex items-start gap-3">
          <HiDatabase className="text-cyan-400 mt-0.5 shrink-0" size={20} />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-200 uppercase tracking-wider">
              Super Admin Technical Guide:
            </p>
            <p>
              For custom domains to work, vendors must configure their domain
              name registrar (Namecheap, GoDaddy) by adding an{" "}
              <span className="text-white font-mono bg-slate-900 px-1 py-0.5 rounded">
                A Record
              </span>{" "}
              pointing to your server IP{" "}
              <span className="text-cyan-400 font-mono">76.76.21.21</span>.
            </p>
            <p>
              Once DNS Check shows green, you can click{" "}
              <span className="text-white font-semibold">"Approve"</span> to
              inject the domain routing proxy in Vercel/Nginx reverse proxy
              server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainRequests;
