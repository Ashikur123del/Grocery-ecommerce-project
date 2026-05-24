import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";

const Products = ({ product }) => {

  const categoryHighlights = {
    Fruits: "bg-orange-50 text-orange-600 border-orange-100/50",
    Dairy: "bg-blue-50 text-blue-600 border-blue-100/50",
    Bakery: "bg-amber-50 text-amber-700 border-amber-100/50",
    Vegetables: "bg-emerald-50 text-emerald-600 border-emerald-100/50",
    Cooking: "bg-rose-50 text-rose-600 border-rose-100/50",
    Seafood: "bg-cyan-50 text-cyan-600 border-cyan-100/50",
    Beverages: "bg-violet-50 text-violet-600 border-violet-100/50",
    Meat: "bg-red-50 text-red-600 border-red-100/50",
  };

  const tagStyle = categoryHighlights[product.category] || "bg-zinc-100 text-zinc-600 border-zinc-200";

  const percentOff = product.discount && product.discount > product.price
    ? Math.round(((product.discount - product.price) / product.discount) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      whileHover="hover"
      layout
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="w-full h-full"
    >
    
      <Card
        isPressable
        shadow="none"
        className="w-full h-full border border-zinc-200/50 bg-[#F9FAFB] hover:bg-white hover:border-emerald-500/30 hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 group"
      >
        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-[18px] bg-white border border-zinc-100 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
          
          {percentOff > 0 && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wider uppercase">
              {percentOff}% Off
            </span>
          )}

          <motion.div
            variants={{
              hover: { scale: 1.04, y: -2 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full h-full p-2 flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-[12px] pointer-events-none transition-transform duration-300"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="mt-4 flex-grow flex flex-col justify-between text-left px-0.5">
          <div className="mb-4">
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider mb-2 ${tagStyle}`}>
              {product.category}
            </span>

            <h3 className="text-base font-bold text-zinc-800 tracking-tight line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200">
              {product.name}
            </h3>
            <span className="text-xs font-medium text-zinc-400 block mt-0.5">
              {product.quantity || "1 unit"} <span className="text-zinc-300 mx-1">•</span> {product.brand}
            </span>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg font-black text-zinc-900">
                ${product.price}
              </span>
              {product.discount && (
                <span className="text-xs text-zinc-400 line-through font-medium">
                  ${product.discount}
                </span>
              )}
            </div>
          </div>

          <div className="w-full pt-1">
            <Button
              size="md"
              variant="flat"
              radius="xl"
              className="w-full bg-white border border-zinc-200 text-zinc-700 font-semibold transition-all duration-300 text-sm group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 shadow-sm"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Products;