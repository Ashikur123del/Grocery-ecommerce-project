import { HiSearch, HiBell, HiChevronDown } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function DashboardNav({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b-3 border-amber-400">
      <button
        className="p-2 rounded-md hover:bg-slate-800 text-slate-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoMdMenu size={24} /> : <RxCross1 size={24} />}
      </button>

      <div className="relative hidden md:block w-full max-w-sm mx-4">
        <HiSearch
          className="absolute left-3 top-2.5 text-slate-500"
          size={20}
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-slate-800 text-slate-200 rounded-full outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-500 border border-slate-700"
        />
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="md:hidden p-2">
          <HiSearch size={22} className="text-slate-400" />
        </button>

        <div className="relative cursor-pointer">
          <HiBell
            size={22}
            className="text-slate-400 hover:text-white transition-colors"
          />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-slate-900"></span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-white">Thomas Anree</p>
            <p className="text-xs text-slate-400">UX Designer</p>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-9 h-9 rounded-full object-cover border border-slate-700"
          />
          <HiChevronDown className="text-slate-400 hidden md:block" />
        </div>
      </div>
    </div>
  );
}
