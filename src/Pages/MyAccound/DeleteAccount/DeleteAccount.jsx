"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi"; // মডাল বন্ধ করার ক্রস আইকন

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setPassword("");
    setIsConfirmed(false);
  };

  const handleDelete = () => {
    if (isConfirmed && password) {
      console.log("Account Deleting with password...", password);
      // এখানে ডিলিট API কল করতে পারেন
      handleClose();
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[200px] bg-slate-50 rounded-xl border border-slate-200 font-sans text-slate-700">
      <h3 className="text-lg font-bold text-slate-800 mb-2">Danger Zone</h3>
      <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back.</p>

      {/* ১. মডাল ওপেন করার মেইন বাটন */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow-sm active:scale-95"
      >
        Delete Account
      </button>

      {/* ২. পপআপ মডাল এবং ব্যাকড্রপ (শুধুমাত্র isOpen true হলে দেখাবে) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* ব্যাকড্রপ ব্লার এবং ডার্ক ইফেক্ট */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={handleClose} 
          />

          {/* মডাল ডায়ালগ বক্স (হুবহু ইমেজ অনুযায়ী ডিজাইন) */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[650px] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* ক্রস ট্রিপার বাটন ডান কোনায় */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
            >
              <FiX className="size-5" />
            </button>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* মডাল হেডার */}
              <div className="pt-6 px-6 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#1E293B]">Delete Your Account</h2>
              </div>

              {/* মডাল বডি */}
              <div className="p-6 space-y-5">
                
                {/* রেড ওয়ার্নিং বক্স */}
                <div className="bg-[#FFF5F5] border border-[#FEB2B2] p-4 rounded-md">
                  <h4 className="font-bold text-[#C53030] text-base mb-1.5">Warning!</h4>
                  <p className="text-[#C53030] text-sm leading-relaxed">
                    Deleting your account is permanent and cannot be undone. All your personal information, reviews, and saved addresses will be permanently removed.
                  </p>
                </div>

                {/* পাসওয়ার্ড ইনপুট ফিল্ড */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="del-password" className="text-sm font-medium text-slate-600">
                    Please enter your password to confirm deletion:
                  </label>
                  <input
                    id="del-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-slate-200 rounded-md outline-none focus:border-slate-400 focus:bg-white transition text-sm"
                  />
                </div>

                {/* কনফার্মেশন চেকবক্স */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="understand-check"
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500 accent-red-600 cursor-pointer"
                  />
                  <label htmlFor="understand-check" className="text-sm text-slate-600 select-none cursor-pointer">
                    I understand that this action cannot be undone
                  </label>
                </div>
              </div>

              {/* মডাল ফুটার বাটনস */}
              <div className="p-6 flex justify-between items-center bg-white border-t border-slate-100">
                {/* ক্যানসেল বাটন */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-[#0A191E] hover:bg-[#122830] text-white font-bold tracking-wider px-6 py-2.5 text-xs uppercase transition-colors"
                >
                  Cancel
                </button>

                {/* ডিলেট বাটন (কন্ডিশনাল ডিজাইন সহ) */}
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={!isConfirmed || !password}
                  className={`font-bold tracking-wider px-6 py-2.5 text-xs uppercase border transition-all
                    ${isConfirmed && password
                      ? "bg-white border-red-600 text-red-600 hover:bg-red-50 cursor-pointer active:scale-95"
                      : "bg-white border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                    }`}
                >
                  Delete My Account
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}