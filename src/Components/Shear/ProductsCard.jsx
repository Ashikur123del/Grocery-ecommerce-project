import { useState } from "react";
import { useNavigate } from "react-router"; 
import { useBoundStore } from "../../store/useBoundStore";
import { useCartStore } from "../../store/useCartStore"; 

const ProductsCard = () => {
  const navigate = useNavigate();
  const products = useBoundStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart); 

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter((p) => p.category === activeTab);

  const handleAddToCart = (product) => {
    addToCart(product, 1); 
    navigate("/product-list");    
  };

  return (
    <div className="container mx-auto py-14 px-4">
      {/* ক্যাটাগরি বাটন সেকশন */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 justify-end">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 ${
              activeTab === item 
                ? "bg-emerald-600 text-white" 
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 4).map((product) => (
          <div key={product.id} className="border rounded-2xl p-4 hover:shadow-xl transition-shadow bg-white flex flex-col gap-3">
            <img src={product.image} alt={product.name} className="h-48 w-full object-contain" />
            <h3 className="font-bold text-lg text-zinc-800">{product.name}</h3>
            
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-xl">${product.price}</span>
              <span className="text-zinc-400 line-through text-sm">${product.discount}</span>
            </div>
            <button 
              onClick={() => handleAddToCart(product)} 
              className="w-full py-2 border border-emerald-500 text-emerald-600 rounded-lg font-bold hover:bg-emerald-500 hover:text-white transition-colors"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsCard;