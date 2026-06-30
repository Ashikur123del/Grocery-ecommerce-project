import { useEffect } from "react";
import { useBoundStore } from "../../store/useBoundStore";
import { FaUser, FaCalendarAlt, FaComments, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const OurNewsArticles = () => {
  const { fetchProducts, products } = useBoundStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const articles = products.slice(0, 4);

  return (
    <section className="py-6 md:py-20 px-6 bg-slate-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">Our News & Articles</h2>
            <div className="w-24 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
          </div>
          <button className="text-gray-600 hover:text-blue-600 flex items-center gap-2 font-semibold transition-all">
            View All <FaArrowRight size={16} />
          </button>
        </div>

        {/* Smart Glassmorphism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((item, index) => (
            <Link to="/product-list">
            <div 
              key={item.id || index} 
              className="group relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Glow */}
              <div className="relative overflow-hidden rounded-[1.5rem] mb-5">
                <img 
                  src={item.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500"} 
                  alt={item.name} 
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Meta */}
              <div className="flex justify-between text-[11px] text-gray-400 font-medium mb-3 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><FaUser /> Admin</span>
                <span className="flex items-center gap-1.5"><FaCalendarAlt /> July 25, 2025</span>
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-gray-900 text-lg mb-6 leading-snug group-hover:text-blue-700 transition-colors">
                {item.name}
              </h3>
              
              {/* Footer */}
              <div className="flex justify-between items-center text-sm font-bold text-gray-800 border-t border-gray-100 pt-4">
                <a href="#" className="hover:text-blue-600 transition-colors">Read More →</a>
                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <FaComments /> 15
                </span>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurNewsArticles;