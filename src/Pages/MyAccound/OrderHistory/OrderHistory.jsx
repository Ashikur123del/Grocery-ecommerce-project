import { useMemo } from "react"
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";


const OrderHistory = () => {
      const orders = useMemo(
    () => [
      { id: "#7SHJFDYD4", date: "July 16, 2023", status: "Completed", amount: "$200" },
      { id: "#7SHJF6WER", date: "June 23, 2023", status: "Active", amount: "$60" },
      { id: "#7SHJF457G", date: "Aug 18, 2023", status: "Completed", amount: "$180" },
      { id: "#7SHJF5FKI", date: "June 22, 2023", status: "Completed", amount: "$140" },
      { id: "#7SHJF4707", date: "Jan 12, 2023", status: "Canceled", amount: "$80" },
    ],
    []
  );

    const getStatusColor = (status) => {
    const colorMap = {
      Completed: "text-green-600",
      Active: "text-blue-600",
      Canceled: "text-red-600",
    };
    return colorMap[status] || "text-gray-600";
  };

  const renderActionIcon = (status) => {
      if (status === "Active") {
        return (
          <BsTrash className="text-red-600 cursor-pointer transition-all duration-200 text-sm hover:scale-110" />
        );
      }
      return (
        <BsPencil className="text-amber-500 cursor-pointer transition-all duration-200 text-sm hover:scale-110" />
      );
    };
  

  return (
    <div className="p-4">
        <h2 className="text-2xl md:text-4xl py-4">Order History</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="min-w-[640px]">
                {/* Header */}
                <div className="grid grid-cols-5 gap-3 px-2 md:px-4 py-3 bg-amber-500 border-b border-gray-200 text-xs font-semibold text-white uppercase tracking-wider">
                  <div className="col-span-1">Order ID</div>
                  <div className="col-span-1">Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-right">Amount</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
        
                {/* Rows */}
                {orders.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-5 gap-3 px-2 md:px-4 py-3 items-center border-b border-gray-100 last:border-0 hover:bg-blue-50/40 transition-all duration-200 text-sm ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <div className="col-span-1 font-mono text-gray-900 text-xs font-medium tracking-tight">
                      {item.id}
                    </div>
                    <div className="col-span-1 text-gray-600 text-sm whitespace-nowrap">
                      {item.date}
                    </div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(item.status).replace('text-', 'bg-')}`}></span>
                        {item.status}
                      </span>
                    </div>
                    <div className="col-span-1 text-right font-semibold text-gray-900">
                      {item.amount}
                    </div>
                    <div className="col-span-1 flex items-center justify-end gap-3">
                      <button className="p-1  text-amber-500 hover:bg-amber-600-50 rounded-md transition-all duration-200 hover:scale-110">
                        <BsEye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200">
                        {renderActionIcon(item.status)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </div>
  )
}

export default OrderHistory