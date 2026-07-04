

import { useState } from "react";
import { HiTicket } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";

const PromoCoupon = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = "GBAPP10";

  // Coupon copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 second por reset hobe
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full text-slate-800">
      
      {/* Page Title Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
        <h1 className="text-xl font-bold">Promo or Coupon</h1>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Side: Available Coupon Container */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-slate-100">
            Available coupon
          </h2>
          
          {/* Coupon Card */}
          <div className="border border-slate-100 rounded-xl p-4 flex gap-4 items-start relative hover:shadow-md transition-shadow">
            
            {/* Ticket Icon Wrapper */}
            <div className="bg-blue-50 p-3 rounded-xl flex items-center justify-center text-blue-600">
              <HiTicket size={32} className="rotate-45" />
            </div>

            {/* Coupon Content Details */}
            <div className="flex-grow space-y-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">App First Order</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="font-semibold text-slate-600">Validity:</span> 31 July, 2026
                </p>
              </div>

              {/* Copyable Coupon Code Box */}
              <div className="flex items-center gap-2 max-w-max">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  <span>{couponCode}</span>
                  <MdContentCopy size={16} className="text-slate-500" />
                </button>
                {copied && (
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>
            </div>

            {/* Active Status Badge */}
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
              Active
            </span>
          </div>
        </div>

        {/* Right Side: Applied Coupon Container */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-slate-100">
            Applied coupon
          </h2>
          
          {/* Empty State Showcase */}
          <div className="bg-slate-50 rounded-xl p-4 text-center text-sm font-medium text-slate-600 border border-slate-100">
            No Coupons Applied
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromoCoupon;