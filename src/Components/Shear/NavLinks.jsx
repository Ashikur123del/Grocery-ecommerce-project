import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router";

const NavLinks = ({
  navLinks,
  activeDropdown,
  setActiveDropdown,
}) => {
  return (
    <nav className="hidden lg:flex items-center gap-6 h-full">
      {navLinks.map((link, index) => (
        <div
          key={index}
          className="relative h-full flex items-center"
          onMouseEnter={() => setActiveDropdown(index)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            to={link.href}
            className="text-[#333] hover:text-[#05a845] font-semibold text-[15px] flex items-center gap-1 py-7 transition-colors"
          >
            {link.label}

            {link.hasDropdown && (
              <IoMdArrowDropdown
                className={`transition-transform duration-300 ${
                  activeDropdown === index
                    ? "rotate-180 text-[#05a845]"
                    : ""
                }`}
              />
            )}
          </Link>

          {link.hasDropdown && (
            <div
              className={`absolute top-full left-0 w-56 bg-white shadow-2xl border-t-2 border-[#05a845] transition-all duration-300 z-50 ${
                activeDropdown === index
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-3"
              }`}
            >
              <ul className="py-2 max-h-96 overflow-y-auto">
                {link.subItems?.map((sub, idx) => (
                  <li key={idx}>
                    <Link
                      to={sub.href}
                      className="block px-5 py-3 text-sm text-gray-600 hover:bg-[#05a845] hover:text-white transition-all"
                    >
                      {sub.label}
                    </Link>
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