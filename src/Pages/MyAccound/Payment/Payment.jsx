import { HiCreditCard, HiCalendar, HiTrendingUp } from "react-icons/hi";

const Payment = () => {
 
  const paymentHistory = [
    {
      date: "2026-07-02 04:30 PM",
      txnId: "TXN98327410",
      method: "bKash",
      amount: 1500,
      action: "Success",
    },
    {
      date: "2026-06-15 11:15 AM",
      txnId: "TXN12049382",
      method: "Nagad",
      amount: 2300,
      action: "Success",
    },
    {
      date: "2026-07-01 09:00 AM",
      txnId: "TXN55493021",
      method: "Rocket",
      amount: 500,
      action: "Success",
    },
    {
      date: "2026-02-10 02:45 PM",
      txnId: "TXN33029184",
      method: "Visa Card",
      amount: 5000,
      action: "Success",
    },
  ];

  
  const thisMonthSpent = paymentHistory
    .filter((item) => item.date.startsWith("2026-07"))
    .reduce((sum, item) => sum + item.amount, 0);

  const totalSpent = paymentHistory.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full text-slate-800">

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
        <h1 className="text-xl font-bold">Payments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl p-6 text-center flex flex-col items-center justify-center border border-white shadow-sm h-48">
          <div className="bg-blue-600 text-white p-3 rounded-full shadow-md mb-3">
            <HiCreditCard size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">{thisMonthSpent} BDT</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">This month spent</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 via-yellow-50 to-orange-100 rounded-2xl p-6 text-center flex flex-col items-center justify-center border border-white shadow-sm h-48">
          <div className="bg-teal-400 text-white p-3 rounded-full shadow-md mb-3">
            <HiCalendar size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">{totalSpent} BDT</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Last 6 month spent</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-100 rounded-2xl p-6 text-center flex flex-col items-center justify-center border border-white shadow-sm h-48">
          <div className="bg-orange-500 text-white p-3 rounded-full shadow-md mb-3">
            <HiTrendingUp size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">{totalSpent} BDT</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Total spent</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Payments history</h2>

        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-500 text-white">
                  <th className="p-4 font-bold text-sm tracking-wide">Date & time</th>
                  <th className="p-4 font-bold text-sm tracking-wide">TXN id</th>
                  <th className="p-4 font-bold text-sm tracking-wide text-center">Method</th>
                  <th className="p-4 font-bold text-sm tracking-wide text-center">Amount</th>
                  <th className="p-4 font-bold text-sm tracking-wide text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4">
                      <div className="bg-slate-50 rounded-lg p-3 text-center text-sm font-semibold text-slate-500 border border-slate-100">
                        No Payment Record Found
                      </div>
                    </td>
                  </tr>
                ) : (
                  paymentHistory.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-700">{row.date}</td>
                      <td className="p-4 text-sm text-slate-700 font-mono">{row.txnId}</td>
                      <td className="p-4 text-sm text-slate-700 text-center">
                        <span className="px-2 py-1 bg-green-500 text-xs font-medium text-white rounded-full">
                          {row.method}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-700 text-center">
                        {row.amount} ৳
                      </td>
                      <td className="p-4 text-sm text-center">
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                          {row.action}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;