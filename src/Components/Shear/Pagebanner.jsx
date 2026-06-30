import { Link } from "react-router";
import { FaHome, FaChevronRight } from "react-icons/fa";
import BgImage from "../../assets/GB-1.jpg";

export default function PageBanner({
  title,
  breadcrumbs = [],
  overlay = "bg-[#000]/70",
  className = "",
}) {
  return (
    <div
      className={`relative w-full overflow-hidden py-10 md:py-20 px-4 ${className}`}
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          {title}
        </h1>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/90">
          <Link to="/" className="flex items-center gap-1.5 hover:underline">
            <FaHome />
            Home
          </Link>

          {breadcrumbs.map((item, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={item.label} className="flex items-center gap-2">
                <FaChevronRight className="text-xs text-white/70" />
                {item.to && !isLast ? (
                  <Link to={item.to} className="hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold">{item.label}</span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}