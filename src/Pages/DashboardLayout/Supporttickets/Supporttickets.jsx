import { useState, useMemo } from "react";
import { MdSearch, MdExpandMore, MdExpandLess, MdReply} from "react-icons/md";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: "TKT001",
      customerName: "Ahmed Hassan",
      customerEmail: "ahmed@gmail.com",
      subject: "Damaged Product Received",
      message: "I received damaged rice package. The seal was broken.",
      priority: "high",
      status: "open",
      category: "Product Quality",
      createdDate: "2024-06-20",
      lastReply: "2024-06-20",
      replies: [
        {
          author: "Support Team",
          message: "We apologize for the inconvenience. Please send us a photo of the damaged package.",
          date: "2024-06-20",
        },
      ],
    },
    {
      id: "TKT002",
      customerName: "Fatima Khan",
      customerEmail: "fatima@gmail.com",
      subject: "Delayed Delivery",
      message: "My order hasn't arrived yet. It's been 5 days.",
      priority: "medium",
      status: "in_progress",
      category: "Delivery",
      createdDate: "2024-06-19",
      lastReply: "2024-06-19",
      replies: [
        {
          author: "Support Team",
          message: "We're tracking your order. It's on the way.",
          date: "2024-06-19",
        },
      ],
    },
    {
      id: "TKT003",
      customerName: "Karim Ali",
      customerEmail: "karim@gmail.com",
      subject: "Payment Failed",
      message: "My Bkash payment failed but amount was deducted.",
      priority: "high",
      status: "open",
      category: "Payment Issue",
      createdDate: "2024-06-18",
      lastReply: "2024-06-18",
      replies: [],
    },
    {
      id: "TKT004",
      customerName: "Zara Amin",
      customerEmail: "zara@gmail.com",
      subject: "Wrong Item Received",
      message: "Received sugar instead of turmeric powder.",
      priority: "high",
      status: "resolved",
      category: "Order Error",
      createdDate: "2024-06-17",
      lastReply: "2024-06-19",
      replies: [
        {
          author: "Support Team",
          message: "We sent the correct item. Please return the wrong one.",
          date: "2024-06-18",
        },
        {
          author: "Ahmed Hassan",
          message: "Thanks, received the correct item.",
          date: "2024-06-19",
        },
      ],
    },
    {
      id: "TKT005",
      customerName: "Rahman Islam",
      customerEmail: "rahman@gmail.com",
      subject: "How to use coupon code?",
      message: "Can you explain how to apply a coupon code?",
      priority: "low",
      status: "resolved",
      category: "General Question",
      createdDate: "2024-06-16",
      lastReply: "2024-06-17",
      replies: [
        {
          author: "Support Team",
          message: "You can apply the code during checkout.",
          date: "2024-06-17",
        },
      ],
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchSearch =
        ticket.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchValue.toLowerCase());

      const matchStatus = filterStatus === "all" || ticket.status === filterStatus;
      const matchPriority = filterPriority === "all" || ticket.priority === filterPriority;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [tickets, searchValue, filterStatus, filterPriority]);

  const stats = useMemo(() => {
    const openCount = tickets.filter((t) => t.status === "open").length;
    const inProgressCount = tickets.filter((t) => t.status === "in_progress").length;
    const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

    return { openCount, inProgressCount, resolvedCount, totalCount: tickets.length };
  }, [tickets]);

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(
      tickets.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus } : t
      )
    );
    alert("Ticket status updated!");
  };

  const handleReply = (ticketId) => {
    if (!replyText.trim()) {
      alert("Please enter a reply message!");
      return;
    }

    setTickets(
      tickets.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            replies: [
              ...t.replies,
              {
                author: "Support Team",
                message: replyText,
                date: new Date().toISOString().split("T")[0],
              },
            ],
            lastReply: new Date().toISOString().split("T")[0],
          };
        }
        return t;
      })
    );
    setReplyText("");
    alert("Reply sent successfully!");
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-blue-900 text-blue-200",
      medium: "bg-yellow-900 text-yellow-200",
      high: "bg-red-900 text-red-200",
    };
    return colors[priority] || colors.low;
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-red-900 text-red-200",
      in_progress: "bg-yellow-900 text-yellow-200",
      resolved: "bg-green-900 text-green-200",
    };
    return colors[status] || colors.open;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Support Tickets</h1>
          <p className="text-slate-400">Manage customer support requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-semibold uppercase">Total Tickets</p>
            <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalCount}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-red-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Open</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{stats.openCount}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-yellow-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">In Progress</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.inProgressCount}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-green-700/30">
            <p className="text-slate-400 text-sm font-semibold uppercase">Resolved</p>
            <p className="text-3xl font-bold text-green-500 mt-2">{stats.resolvedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-4 top-3 text-slate-500 text-lg" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by Ticket ID, Customer..."
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg pl-12 pr-4 py-2 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div
                  onClick={() =>
                    setExpandedTicket(expandedTicket?.id === ticket.id ? null : ticket)
                  }
                  className="p-6 cursor-pointer flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-white font-semibold text-lg">{ticket.id}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white font-semibold">{ticket.subject}</p>
                    <p className="text-slate-400 text-sm">{ticket.customerName}</p>
                  </div>

                  <div className="text-right mr-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace("_", " ").toUpperCase()}
                    </span>
                    <p className="text-slate-400 text-sm">{ticket.createdDate}</p>
                  </div>

                  <div className="text-slate-400">
                    {expandedTicket?.id === ticket.id ? (
                      <MdExpandLess size={24} />
                    ) : (
                      <MdExpandMore size={24} />
                    )}
                  </div>
                </div>

                {expandedTicket?.id === ticket.id && (
                  <div className="border-t border-slate-700 p-6 bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-white font-semibold mb-4">Ticket Information</h3>
                        <div className="space-y-3 text-slate-300 text-sm">
                          <p>
                            <span className="font-semibold text-white">Ticket ID:</span> {ticket.id}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Customer:</span> {ticket.customerName}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Email:</span> {ticket.customerEmail}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Category:</span> {ticket.category}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Created:</span> {ticket.createdDate}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-4">Update Status</h3>
                        <div className="space-y-2">
                          {["open", "in_progress", "resolved"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(ticket.id, status)}
                              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                ticket.status === status
                                  ? "bg-amber-500 text-white"
                                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              }`}
                            >
                              {status.replace("_", " ").toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-4">Issue Description</h3>
                      <p className="text-slate-300 text-sm bg-slate-700/50 rounded-lg p-4">
                        {ticket.message}
                      </p>
                    </div>

                    {/* Conversation */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-4">Conversation</h3>
                      <div className="space-y-4">
                        {ticket.replies.length > 0 ? (
                          ticket.replies.map((reply, idx) => (
                            <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-amber-400">{reply.author}</p>
                                <p className="text-slate-400 text-xs">{reply.date}</p>
                              </div>
                              <p className="text-slate-300 text-sm">{reply.message}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-400 text-sm">No replies yet</p>
                        )}
                      </div>
                    </div>

                    {/* Reply Box */}
                    <div>
                      <h3 className="text-white font-semibold mb-4">Send Reply</h3>
                      <div className="space-y-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply here..."
                          rows={4}
                          className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                        />
                        <button
                          onClick={() => handleReply(ticket.id)}
                          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <MdReply size={18} /> Send Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
              <p className="text-slate-400 text-lg">No tickets found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;