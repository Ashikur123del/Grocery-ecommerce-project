import { HiSearch, HiBell, HiChevronDown } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function DashboardNav({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      
      {/* মেনু বাটন */}
      <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <IoMdMenu size={24} /> : <RxCross1 size={24} />}
      </button>
      
      {/* সার্চ বার - ছোট স্ক্রিনে hidden, মাঝারি স্ক্রিন থেকে block */}
      <div className="relative hidden md:block w-full max-w-sm mx-4">
        <HiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        
        {/* সার্চ আইকন মোবাইল ভিউয়ের জন্য (যদি প্রয়োজন হয়) */}
        <button className="md:hidden p-2">
          <HiSearch size={22} className="text-gray-600" />
        </button>

        {/* নোটিফিকেশন */}
        <div className="relative cursor-pointer">
          <HiBell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
        
        {/* ইউজার প্রোফাইল - নাম ছোট স্ক্রিনে hidden */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-gray-800">Thomas Anree</p>
            <p className="text-xs text-gray-500">UX Designer</p>
          </div>
          <img src="https://i.pravatar.cc/40" alt="User" className="w-9 h-9 rounded-full object-cover" />
          <HiChevronDown className="text-gray-500 hidden md:block" />
        </div>
      </div>
    </div>
  );
}