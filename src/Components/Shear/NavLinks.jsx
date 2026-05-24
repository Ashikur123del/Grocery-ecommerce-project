import { IoMdArrowDropdown } from "react-icons/io";

const NavLinks = ({ navLinks, activeDropdown, setActiveDropdown }) => {
  return (
    <nav className="hidden lg:flex items-center gap-4 xl:gap-7 h-full">
      {navLinks.map((link, index) => (
        <div 
          key={index} 
          className="relative group h-full flex items-center"
          onMouseEnter={() => setActiveDropdown(index)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <a href={link.href} className="text-[#333] hover:text-[#05a845] font-semibold text-[14px] xl:text-[15px] flex items-center gap-1 transition-colors py-7">
            {link.label}
            {link.hasDropdown && (
              <IoMdArrowDropdown className={`text-gray-400 transition-transform duration-300 ${activeDropdown === index ? "rotate-180 text-[#05a845]" : ""}`} />
            )}
          </a>
          
          {link.hasDropdown && (
            <div className={`absolute top-full left-0 w-52 bg-white shadow-2xl border-t-2 border-[#05a845] transition-all duration-300 z-[70] ${activeDropdown === index ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"}`}>
              <ul className="py-2">
                {link.subItems.map((sub, idx) => (
                  <li key={idx}>
                    <a href="#" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-[#05a845] hover:text-white transition-all">
                      {sub}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavLinks;