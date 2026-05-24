import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const MobileMenu = ({ isOpen, setIsOpen, navLinks, openSubMenu, setOpenSubMenu }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
        
          <div className="flex items-center justify-between p-5 border-b bg-[#05a845] text-white">
            <span className="text-lg font-bold">Main Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-all">
              <FaTimes size={18} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-4 py-2">
            {navLinks.map((link, index) => (
              <div key={index} className="border-b border-gray-100 last:border-none">
                <div 
                  className="flex items-center justify-between py-4 cursor-pointer"
                  onClick={() => link.hasDropdown ? setOpenSubMenu(openSubMenu === index ? null : index) : setIsOpen(false)}
                >
                  <span className={`font-semibold text-sm transition-colors ${openSubMenu === index ? "text-[#05a845]" : "text-gray-700"}`}>
                    {link.label}
                  </span>
                  {link.hasDropdown && (
                    <span className={`text-xs p-1 rounded ${openSubMenu === index ? "bg-[#05a845]/10 text-[#05a845]" : "text-gray-400"}`}>
                      {openSubMenu === index ? <FaMinus /> : <FaPlus />}
                    </span>
                  )}
                </div>

                {link.hasDropdown && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubMenu === index ? "max-h-[400px] opacity-100 mb-2" : "max-h-0 opacity-0"}`}>
                    <ul className="bg-gray-50 rounded-lg py-1">
                      {link.subItems.map((sub, idx) => (
                        <li key={idx}>
                          <a href="#" className="block py-3 px-5 text-sm text-gray-600 hover:text-[#05a845] transition-colors">
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-5 border-t mt-auto bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#05a845] text-white flex items-center justify-center shadow-sm">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Hello, Guest</p>
                <button className="text-sm font-bold text-gray-800 hover:text-[#05a845]">Login / Register</button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;