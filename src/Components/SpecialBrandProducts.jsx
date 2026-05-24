
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiStar } from 'react-icons/fi';

const SpecialBrandProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProducts(data.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-emerald-600 font-bold">
        Loading Special Brands...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 md:px-12 py-16 select-none bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-800 tracking-tight">
          Our Special Brand Products
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        <div className="lg:col-span-4 rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden bg-[#FF6551] min-h-[400px] lg:min-h-full shadow-sm">
          <div className="text-left relative z-10 text-white">
            <h3 className="text-3xl font-black tracking-tight mb-2">
              Fruits and Vegetables
            </h3>
            <p className="text-white/90 text-sm font-medium">
              Get 50% Off on Selected Fruits and Vegetables
            </p>
            <button className="mt-6 group flex items-center gap-1.5 bg-white hover:bg-neutral-100 text-[#FF6551] px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-md">
              <span>Shop Now</span>
              <FiArrowUpRight className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div className="absolute left-0 bottom-0 w-full h-[50%] pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=60" 
              alt="Fresh Tomatoes and Peppers"
              className="w-full h-full object-cover object-bottom opacity-90 transform scale-105 origin-bottom"
            />
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => {
            const savings = product.discount && product.discount > product.price 
              ? (product.discount - product.price).toFixed(2) 
              : null;

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <Card
                  isPressable
                  shadow="none"
                  className="w-full flex flex-row items-center gap-4 bg-[#F8F9FA] hover:bg-white border border-neutral-200/40 hover:border-emerald-500/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.03)] rounded-[20px] p-4 relative transition-all duration-300 group"
                >
                  {savings && (
                    <span className="absolute top-2.5 right-2.5 z-10 bg-[#E25C4B] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm uppercase tracking-wider">
                      Save ${savings}
                    </span>
                  )}

                  <div className="w-24 h-24 flex-shrink-0 bg-white border border-neutral-100 rounded-xl overflow-hidden p-1.5 flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.01)]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-grow text-left space-y-1 pr-12">
                    <h4 className="text-sm font-bold text-zinc-800 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200">
                      {product.name}
                    </h4>
                  
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="text-xs fill-current" />
                      ))}
                    </div>

                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-base font-extrabold text-zinc-950">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discount && (
                        <span className="text-xs text-zinc-400 line-through font-medium">
                          ${product.discount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SpecialBrandProducts;